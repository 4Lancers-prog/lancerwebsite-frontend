import type { Project } from './types'

/**
 * ⚠️ CASE STUDIES
 * These are representative engagements written WITHOUT client names or numbers,
 * following the blueprint rule: "Never invent metrics or outcomes."
 * Before launch, replace each entry with a real, client-approved project and
 * only fill `verifiedOutcome` with a result you can prove.
 */
export const projects: Project[] = [
  {
    slug: 'whatsapp-lead-automation',
    title: 'WhatsApp lead handling & CRM automation',
    context: 'A multi-location services business receiving enquiries from ads, the website and walk-ins.',
    industry: 'Services / Real Estate',
    services: ['ai-automation', 'software-development'],
    challenge:
      'Enquiries arrived on WhatsApp, calls and forms and were tracked by hand. Responses were slow outside office hours, and follow-ups depended on individual executives.',
    impact: 'Leads went cold before anyone replied, and management had no reliable view of the pipeline.',
    analysis: [
      'Mapped every lead source and how each enquiry was handled today',
      'Identified the questions the team answered repeatedly',
      'Defined qualification rules and hand-off points to sales',
    ],
    solution: [
      'WhatsApp Business API bot for instant replies and qualification',
      'Leads created automatically in a custom CRM with source tracking',
      'Rule-based assignment, reminders and scheduled follow-up messages',
      'Dashboard for pipeline, response status and team activity',
    ],
    technology: ['WhatsApp Business API', 'Node.js', 'Express', 'MongoDB', 'React'],
    whatChanged: [
      'Every enquiry gets an immediate, consistent first response',
      'Follow-ups run on a schedule instead of relying on memory',
      'Management sees the full pipeline in one place',
    ],
    comparison: 'workflow',
    featured: true,
  },
  {
    slug: 'ai-voice-support',
    title: 'Multilingual AI voice agent for inbound calls',
    context: 'A customer-facing business whose phone lines were busy with routine questions and bookings.',
    industry: 'Customer Service',
    services: ['ai-automation', 'application-development'],
    challenge:
      'Staff spent most of the day on repetitive calls — timings, status checks and bookings — in several languages, and calls were missed at peak times.',
    impact: 'Missed calls meant missed business, and skilled staff were tied up on routine questions.',
    analysis: [
      'Categorised call types by frequency and complexity',
      'Assessed speech-to-text and voice options for the languages required',
      'Defined what the agent may answer, and when it must transfer',
    ],
    solution: [
      'AI voice agent handling FAQs, status checks and appointment booking',
      'Language detection with responses in the caller’s language',
      'Warm transfer to staff with a call summary',
      'Call logs and summaries pushed to the business system',
    ],
    technology: ['LLM', 'Speech-to-text', 'Text-to-speech', 'Telephony API', 'Node.js'],
    whatChanged: [
      'Routine calls are answered at any hour',
      'Staff focus on calls that genuinely need a person',
      'Every call leaves a searchable summary',
    ],
    comparison: 'support',
    featured: true,
  },
  {
    slug: 'factory-operations-erp',
    title: 'Factory operations & production management system',
    context: 'A manufacturing unit tracking orders, materials and production stages on paper and spreadsheets.',
    industry: 'Manufacturing',
    services: ['software-development', 'application-development'],
    challenge:
      'Order status lived in registers and phone calls to the floor. Inventory mismatches delayed production, and management could not see bottlenecks until they became problems.',
    impact: 'Planning was reactive, and customers waited for answers the business did not have to hand.',
    analysis: [
      'Walked through each production stage with supervisors',
      'Documented roles, approvals and data captured at every step',
      'Prioritised modules by how much manual work they removed',
    ],
    solution: [
      'Custom production-stage tracking with role-based access',
      'Inventory and material requirement management',
      'Order tracking and dispatch module',
      'Management dashboard with live status and alerts',
    ],
    technology: ['React', 'Vite', 'Node.js', 'Express', 'MongoDB', 'AWS'],
    whatChanged: [
      'One source of truth for orders, materials and stages',
      'Supervisors update status from the floor instead of on paper',
      'Management sees bottlenecks as they form',
    ],
    featured: true,
  },
  {
    slug: 'business-website-rebuild',
    title: 'Business website rebuild for clarity and enquiries',
    context: 'An established company with an outdated website that did not reflect its capabilities.',
    industry: 'Professional Services',
    services: ['website-development'],
    challenge:
      'The old site was slow on mobile, hard to update and did not explain the company’s services clearly — so it generated few meaningful enquiries.',
    impact: 'The website undersold the business to every prospect who visited it.',
    analysis: ['Reviewed audience, services and existing search visibility', 'Rebuilt the sitemap around what customers look for', 'Planned redirects to protect existing rankings'],
    solution: ['New content structure and design system', 'Server-rendered, mobile-first build', 'SEO metadata, sitemap and structured data', 'Enquiry form connected to the team’s inbox and CRM'],
    technology: ['React', 'Vike', 'Tailwind CSS', 'Node.js'],
    whatChanged: ['Clear service pages that answer customer questions', 'Fast, responsive experience on every device', 'Enquiries reach the right person automatically'],
    comparison: 'website',
    featured: false,
  },
]

export const featuredProjects = projects.filter((p) => p.featured).slice(0, 3)
export const getProject = (slug: string) => projects.find((p) => p.slug === slug)
