/**
 * Global site configuration.
 * Real 4lancers contact details live here and are used site-wide (footer, contact page, CTA, SEO).
 * Anything left as an empty string is simply hidden in the UI.
 */
export const site = {
  name: '4lancers',
  legalName: '4lancers',
  url: (import.meta.env.PUBLIC_ENV__SITE_URL as string | undefined) || 'https://www.4lancers.com',
  tagline: 'We build technology around your business.',
  description:
    'AI automation, WhatsApp bots, AI voice agents, custom CRM & ERP software, websites and applications — engineered around how your business actually works.',
  coreMessage:
    "We don't force businesses into generic software. We build technology around their processes, goals and requirements.",
  contact: {
    email: 'contact@4lancers.com',
    phone: '+91 83105 75411' as string,
    whatsapp: '918310575411' as string, // digits only with country code
    address: '' as string, // e.g. 'Bengaluru, Karnataka, India'
    hours: 'Mon – Sat · 10:00 – 19:00 IST',
  },
  social: {
    facebook: 'https://www.facebook.com/profile.php?id=61594942109874' as string,
    instagram: 'https://www.instagram.com/4.lancers/' as string,
    linkedin: '' as string,
    x: '' as string,
    github: '' as string,
  },
  logo: {
    mark: '/logo-mark.png',
    word: '/logo-word.png',
    full: '/logo-full.png',
    og: '/og-image.jpg',
  },
  apiBase: (import.meta.env.PUBLIC_ENV__API_URL as string | undefined) || '/api',
} as const
