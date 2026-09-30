/**
 * Global site configuration.
 * ⚠️ Replace the contact values below with the real 4lancers details before launch.
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
    email: 'hello@4lancers.com',
    phone: '' as string, // e.g. '+91 98xxxxxxx'
    whatsapp: '' as string, // digits only with country code, e.g. '9198xxxxxxxx'
    address: '' as string, // e.g. 'Bengaluru, Karnataka, India'
    hours: 'Mon – Sat · 10:00 – 19:00 IST',
  },
  social: {
    linkedin: '' as string,
    instagram: '' as string,
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
