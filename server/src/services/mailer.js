import nodemailer from 'nodemailer'
import { env } from '../config/env.js'
import { logger } from '../config/logger.js'

const enabled = Boolean(env.SMTP_HOST && env.LEAD_NOTIFY_TO)

const transporter = enabled
  ? nodemailer.createTransport({
      host: env.SMTP_HOST,
      port: env.SMTP_PORT,
      secure: env.SMTP_SECURE,
      auth: env.SMTP_USER ? { user: env.SMTP_USER, pass: env.SMTP_PASS } : undefined,
    })
  : null

const esc = (s = '') => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c])

/** Fire-and-forget internal notification. Never blocks or fails the API response. */
export async function notifyNewLead(lead) {
  if (!enabled) {
    logger.info({ leadId: lead.id }, 'SMTP not configured — skipping lead email')
    return
  }
  const rows = [
    ['Name', lead.name],
    ['Company', lead.company],
    ['Email', lead.email],
    ['Phone', lead.phone],
    ['Website', lead.website],
    ['Service', lead.service],
    ['Requirement', lead.solutionType],
    ['Budget', lead.budget],
    ['Timeline', lead.timeline],
    ...[...(lead.details?.entries?.() ?? [])].map(([k, v]) => [`• ${k}`, v]),
  ].filter(([, v]) => v)

  const html = `
  <div style="font-family:system-ui,sans-serif;max-width:640px">
    <h2 style="color:#5b7cb1;margin:0 0 16px">New enquiry — ${esc(lead.service)}</h2>
    <table cellpadding="6" style="border-collapse:collapse;width:100%;font-size:14px">
      ${rows.map(([k, v]) => `<tr><td style="color:#667;width:140px;vertical-align:top">${esc(k)}</td><td>${esc(v)}</td></tr>`).join('')}
    </table>
    <h3 style="margin:24px 0 8px">Message</h3>
    <p style="white-space:pre-wrap;font-size:14px;line-height:1.6">${esc(lead.message)}</p>
    <p style="color:#999;font-size:12px">Lead ID: ${esc(lead.id)}</p>
  </div>`

  try {
    await transporter.sendMail({
      from: env.MAIL_FROM || env.SMTP_USER,
      to: env.LEAD_NOTIFY_TO,
      replyTo: lead.email,
      subject: `New enquiry: ${lead.name}${lead.company ? ` (${lead.company})` : ''} — ${lead.service}`,
      html,
    })
    logger.info({ leadId: lead.id }, 'Lead notification sent')
  } catch (err) {
    logger.error({ err, leadId: lead.id }, 'Lead notification failed')
  }
}
