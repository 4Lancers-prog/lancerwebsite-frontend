/**
 * Contact form options. Keep values in sync with server/src/validation/lead.schema.js
 */
export const requirements = [
  { value: 'ai-automation', label: 'AI Automation', service: 'AI Automation' },
  { value: 'whatsapp', label: 'WhatsApp Automation / Bot', service: 'AI Automation' },
  { value: 'voice-agent', label: 'AI Voice Agent', service: 'AI Automation' },
  { value: 'crm', label: 'CRM', service: 'Software Development' },
  { value: 'erp', label: 'ERP', service: 'Software Development' },
  { value: 'software', label: 'Custom Software', service: 'Software Development' },
  { value: 'website', label: 'Website', service: 'Website Development' },
  { value: 'application', label: 'Web / Mobile Application', service: 'Application Development' },
  { value: 'custom', label: 'Something custom', service: 'Custom' },
  { value: 'not-sure', label: 'Not sure yet', service: 'Not sure' },
] as const

export type RequirementValue = (typeof requirements)[number]['value']

export const budgets = ['Under ₹1 lakh', '₹1 – 3 lakh', '₹3 – 7 lakh', '₹7 – 15 lakh', '₹15 lakh +', 'Not decided yet'] as const
export const timelines = ['As soon as possible', 'Within 1 month', '1 – 3 months', '3 – 6 months', 'Just exploring'] as const

type FollowUp = { id: string; label: string; options?: string[]; placeholder?: string }

/** Dynamic follow-up questions shown based on the selected requirement. */
export const followUps: Partial<Record<RequirementValue, FollowUp[]>> = {
  'ai-automation': [
    { id: 'process', label: 'Which process takes the most manual effort today?', placeholder: 'e.g. lead follow-ups, invoice entry, support replies' },
    { id: 'tools', label: 'Which tools does your team use now?', placeholder: 'e.g. Excel, Zoho, Tally, Google Sheets' },
  ],
  whatsapp: [
    { id: 'waApi', label: 'Do you already use the WhatsApp Business API?', options: ['Yes', 'No', 'Not sure'] },
    { id: 'useCase', label: 'Main use case', options: ['Lead handling', 'Customer support', 'Bookings', 'Notifications / updates', 'Internal workflows'] },
  ],
  'voice-agent': [
    { id: 'callType', label: 'Inbound or outbound calls?', options: ['Inbound', 'Outbound', 'Both'] },
    { id: 'languages', label: 'Languages needed', placeholder: 'e.g. English, Hindi, Kannada' },
  ],
  crm: [
    { id: 'teamSize', label: 'How many people will use it?', options: ['1 – 5', '6 – 20', '21 – 100', '100 +'] },
    { id: 'current', label: 'What do you use today?', placeholder: 'e.g. spreadsheets, an existing CRM' },
  ],
  erp: [
    { id: 'modules', label: 'Which areas should it cover?', placeholder: 'e.g. inventory, production, purchase, billing' },
    { id: 'teamSize', label: 'How many users?', options: ['1 – 10', '11 – 50', '51 – 200', '200 +'] },
  ],
  software: [{ id: 'users', label: 'Who will use the software?', placeholder: 'e.g. internal team, customers, vendors' }],
  website: [
    { id: 'siteType', label: 'Type of website', options: ['Business / corporate', 'Startup / landing page', 'E-commerce', 'Custom platform'] },
    { id: 'existing', label: 'Current website (if any)', placeholder: 'https://' },
  ],
  application: [
    { id: 'platform', label: 'Platform', options: ['Web', 'Android', 'iOS', 'Android + iOS', 'Web + Mobile'] },
    { id: 'stage', label: 'Where are you now?', options: ['Just an idea', 'Designs ready', 'Existing app to improve'] },
  ],
}
