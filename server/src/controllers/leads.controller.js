import { Lead } from '../models/Lead.js'
import { AppError } from '../middleware/index.js'
import { notifyNewLead } from '../services/mailer.js'

export async function createLead(req, res) {
  const lead = await Lead.create({
    ...req.body,
    meta: {
      ip: req.ip,
      userAgent: req.get('user-agent')?.slice(0, 300),
      referrer: req.get('referer')?.slice(0, 300),
    },
  })
  req.log.info({ leadId: lead.id, service: lead.service }, 'Lead created')
  notifyNewLead(lead) // intentionally not awaited
  res.status(201).json({ ok: true, id: lead.id, message: 'Thank you — we will get back to you shortly.' })
}

export async function listLeads(req, res) {
  const { status, page, limit } = req.validatedQuery
  const filter = status ? { status } : {}
  const [items, total] = await Promise.all([
    Lead.find(filter).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit).select('-meta').lean(),
    Lead.countDocuments(filter),
  ])
  res.json({ items, page, limit, total, pages: Math.ceil(total / limit) })
}

export async function getLead(req, res) {
  const lead = await Lead.findById(req.params.id).lean()
  if (!lead) throw new AppError(404, 'NOT_FOUND', 'Lead not found')
  res.json(lead)
}

export async function updateLead(req, res) {
  const { status, note } = req.body
  const update = {}
  if (status) update.$set = { status }
  if (note) update.$push = { notes: { text: note } }
  if (!Object.keys(update).length) throw new AppError(400, 'NOTHING_TO_UPDATE', 'Provide status and/or note')
  const lead = await Lead.findByIdAndUpdate(req.params.id, update, { new: true, runValidators: true }).lean()
  if (!lead) throw new AppError(404, 'NOT_FOUND', 'Lead not found')
  res.json(lead)
}
