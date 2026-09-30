import type { LucideIcon } from 'lucide-react'

export type NavItem = { label: string; href: string; description?: string; children?: NavItem[] }

export type Faq = { q: string; a: string }

export type Offering = { title: string; description: string; icon: LucideIcon }

export type WorkflowExample = { title: string; steps: string[] }

export type ServiceSlug =
  | 'ai-automation'
  | 'software-development'
  | 'website-development'
  | 'application-development'

export type Service = {
  slug: ServiceSlug
  href: string
  icon: LucideIcon
  name: string
  shortName: string
  tagline: string
  summary: string
  heroTitle: string
  heroLead: string
  problemsTitle: string
  problems: string[]
  offeringsTitle: string
  offerings: Offering[]
  workflows: WorkflowExample[]
  considerationsTitle: string
  considerations: { title: string; description: string }[]
  stack: string[]
  faqs: Faq[]
  relatedProjects: string[]
}

export type Solution = {
  slug: string
  industry: string
  icon: LucideIcon
  intro: string
  challenges: string[]
  solutions: string[]
  workflow: string[]
  services: ServiceSlug[]
  relatedProject?: string
}

export type Project = {
  slug: string
  title: string
  context: string
  industry: string
  services: ServiceSlug[]
  challenge: string
  impact: string
  analysis: string[]
  solution: string[]
  technology: string[]
  whatChanged: string[]
  /** Only add a measurable outcome once it is verified with the client. */
  verifiedOutcome?: string
  /** Before/after visual key rendered by the ComparisonSlider. */
  comparison?: 'workflow' | 'support' | 'website'
  featured: boolean
}

export type ProcessStep = { no: string; title: string; description: string; deliverables: string[]; icon: LucideIcon }

export type SeoPage = {
  path: string
  title: string
  description: string
  keywords?: string[]
  changefreq?: 'weekly' | 'monthly' | 'yearly'
  priority?: number
}
