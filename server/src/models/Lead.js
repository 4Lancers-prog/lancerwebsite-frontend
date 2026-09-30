import mongoose from 'mongoose'

export const LEAD_STATUSES = ['new', 'contacted', 'qualified', 'proposal', 'won', 'lost', 'spam']

const leadSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 80 },
    company: { type: String, trim: true, maxlength: 120 },
    email: { type: String, required: true, trim: true, lowercase: true, maxlength: 160, index: true },
    phone: { type: String, trim: true, maxlength: 20 },
    website: { type: String, trim: true, maxlength: 200 },
    service: { type: String, required: true, trim: true },
    solutionType: { type: String, required: true, trim: true },
    budget: { type: String, trim: true },
    timeline: { type: String, trim: true },
    message: { type: String, required: true, trim: true, maxlength: 4000 },
    details: { type: Map, of: String, default: {} },
    status: { type: String, enum: LEAD_STATUSES, default: 'new', index: true },
    notes: [{ text: { type: String, maxlength: 2000 }, createdAt: { type: Date, default: Date.now } }],
    meta: {
      ip: String,
      userAgent: String,
      referrer: String,
    },
  },
  { timestamps: true },
)

leadSchema.index({ createdAt: -1 })

export const Lead = mongoose.model('Lead', leadSchema)
