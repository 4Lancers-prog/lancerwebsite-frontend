import { z } from 'zod'
import { LEAD_STATUSES } from '../models/Lead.js'

/** Keep in sync with client/data/contact.ts */
export const SOLUTION_TYPES = ['ai-automation', 'whatsapp', 'voice-agent', 'crm', 'erp', 'software', 'website', 'application', 'custom', 'not-sure']

const SERVICE_BY_TYPE = {
  'ai-automation': 'AI Automation',
  whatsapp: 'AI Automation',
  'voice-agent': 'AI Automation',
  crm: 'Software Development',
  erp: 'Software Development',
  software: 'Software Development',
  website: 'Website Development',
  application: 'Application Development',
  custom: 'Custom',
  'not-sure': 'Not sure',
}

const opt = (max) => z.string().trim().max(max).optional().or(z.literal('')).transform((v) => v || undefined)

/** Server-side validation is mandatory — never trust the client. */
export const createLeadSchema = z
  .object({
    name: z.string().trim().min(2).max(80),
    company: opt(120),
    email: z.string().trim().toLowerCase().email().max(160),
    phone: opt(20).refine((v) => !v || /^[+\d\s()-]{6,20}$/.test(v), 'Invalid phone number'),
    website: opt(200),
    solutionType: z.enum(SOLUTION_TYPES),
    budget: opt(40),
    timeline: opt(40),
    message: z.string().trim().min(20).max(4000),
    details: z
      .record(z.string().regex(/^[a-zA-Z]{1,30}$/), z.string().trim().max(500))
      .optional()
      .refine((d) => !d || Object.keys(d).length <= 10, 'Too many details'),
    consent: z.literal(true),
    company_url: z.string().max(0).optional(), // honeypot
  })
  .transform(({ consent: _c, company_url: _h, ...rest }) => ({ ...rest, service: SERVICE_BY_TYPE[rest.solutionType] }))

export const updateLeadSchema = z.object({
  status: z.enum(LEAD_STATUSES).optional(),
  note: z.string().trim().min(1).max(2000).optional(),
})

export const listLeadsQuery = z.object({
  status: z.enum(LEAD_STATUSES).optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
})
