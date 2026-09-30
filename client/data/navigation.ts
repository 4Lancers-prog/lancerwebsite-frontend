import type { NavItem } from './types'
import { services } from './services'

export const mainNav: NavItem[] = [
   { label: 'Home', href: '/' },
  {
    label: 'Services',
    href: '/services/ai-automation',
    children: services.map((s) => ({ label: s.name, href: s.href, description: s.tagline })),
  },
  { label: 'Solutions', href: '/solutions' },
  { label: 'Work', href: '/work' },
  { label: 'Process', href: '/process' },
  { label: 'About', href: '/about' },
]

export const footerNav: { title: string; items: NavItem[] }[] = [
  { title: 'Services', items: services.map((s) => ({ label: s.name, href: s.href })) },
  {
    title: 'Company',
    items: [
      { label: 'About', href: '/about' },
      { label: 'Solutions', href: '/solutions' },
      { label: 'Work', href: '/work' },
      { label: 'Process', href: '/process' },
      { label: 'Start a Project', href: '/contact' },
    ],
  },
  {
    title: 'Legal',
    items: [
      { label: 'Privacy Policy', href: '/privacy-policy' },
      { label: 'Terms & Conditions', href: '/terms' },
    ],
  },
]
