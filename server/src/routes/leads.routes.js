import { Router } from 'express'
import rateLimit from 'express-rate-limit'
import { createLead, listLeads, getLead, updateLead } from '../controllers/leads.controller.js'
import { validate, requireAdmin } from '../middleware/index.js'
import { createLeadSchema, updateLeadSchema, listLeadsQuery } from '../validation/lead.schema.js'

const router = Router()

/** Tight limit on public submissions: 5 per 15 minutes per IP. */
const submitLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: { error: { code: 'RATE_LIMITED', message: 'Too many submissions. Please try again in a few minutes or email us directly.' } },
})

/** Honeypot: bots that fill the hidden field get a fake success and nothing is stored. */
const honeypot = (req, res, next) => (req.body?.company_url ? res.status(201).json({ ok: true, message: 'Thank you — we will get back to you shortly.' }) : next())

// Public
router.post('/', submitLimiter, honeypot, validate(createLeadSchema), createLead)

// Admin (x-admin-key header) — lead status management
router.get('/', requireAdmin, validate(listLeadsQuery, 'query'), listLeads)
router.get('/:id', requireAdmin, getLead)
router.patch('/:id', requireAdmin, validate(updateLeadSchema), updateLead)

export default router
