import type { SeoPage } from './types'

export const seoPages = {
  home: {
    path: '/',
    title: 'AI Automation & Software Development Company | 4lancers',
    description:
      'We build technology that solves real business problems — AI automation, WhatsApp bots, AI voice agents, custom CRM & ERP software, websites and applications.',
    keywords: ['AI automation services', 'custom software development', 'custom automation solutions'],
    priority: 1,
    changefreq: 'weekly',
  },
  about: {
    path: '/about',
    title: 'About 4lancers | Technology Built Around Your Business',
    description:
      'A technology and automation partner that understands business problems first, then builds the AI, software and applications to solve them.',
    priority: 0.7,
  },
  aiAutomation: {
    path: '/services/ai-automation',
    title: 'AI Automation, WhatsApp Bots & Voice Agents | 4lancers',
    description:
      'WhatsApp automation, WhatsApp bot development, AI chatbots, AI voice agents, AI agents and business process automation built around your workflows.',
    keywords: ['AI automation services', 'WhatsApp automation', 'WhatsApp bot development', 'AI chatbot development', 'AI voice agent development', 'AI agent development', 'business process automation'],
    priority: 0.9,
  },
  software: {
    path: '/services/software-development',
    title: 'Custom Software, CRM & ERP Development | 4lancers',
    description:
      'Custom CRM development, ERP development and business management software — HRMS, inventory, billing, portals and dashboards designed around your processes.',
    keywords: ['custom software development', 'CRM development', 'ERP development', 'business management software', 'custom ERP software', 'custom CRM software', 'software integration', 'API integration'],
    priority: 0.9,
  },
  website: {
    path: '/services/website-development',
    title: 'Website Development Services | 4lancers',
    description:
      'Fast, SEO-ready and responsive website development for businesses, startups and e-commerce — built to earn trust and generate enquiries.',
    keywords: ['website development'],
    priority: 0.9,
  },
  application: {
    path: '/services/application-development',
    title: 'Application Development Services | 4lancers',
    description:
      'Web application development, mobile application development and SaaS development — from product discovery to production launch.',
    keywords: ['web application development', 'mobile application development', 'SaaS development'],
    priority: 0.9,
  },
  solutions: {
    path: '/solutions',
    title: 'Business Technology & Automation Solutions | 4lancers',
    description:
      'Industry challenges mapped to practical solutions — automation, custom software and applications for startups, retail, real estate, education, healthcare, logistics and manufacturing.',
    priority: 0.8,
  },
  process: {
    path: '/process',
    title: 'Our Process: Discover to Improve | 4lancers',
    description:
      'How we deliver technology projects: Discover, Analyze, Strategize, Design, Build, Test, Launch and Improve.',
    priority: 0.6,
  },
  work: {
    path: '/work',
    title: 'AI, Software & Automation Case Studies | 4lancers',
    description:
      'How we turn business problems into working technology — the challenge, our analysis, the solution architecture and what changed for the business.',
    priority: 0.8,
  },
  contact: {
    path: '/contact',
    title: 'Contact 4lancers | Start Your Technology Project',
    description:
      'Tell us about the business problem you want to solve. We reply with clear next steps — usually within one business day.',
    priority: 0.8,
  },
  privacy: {
    path: '/privacy-policy',
    title: 'Privacy Policy | 4lancers',
    description: 'How 4lancers collects, uses and protects the information you share with us.',
    priority: 0.2,
    changefreq: 'yearly',
  },
  terms: {
    path: '/terms',
    title: 'Terms & Conditions | 4lancers',
    description: 'The terms that govern the use of the 4lancers website and services.',
    priority: 0.2,
    changefreq: 'yearly',
  },
} satisfies Record<string, SeoPage>

export type SeoKey = keyof typeof seoPages
