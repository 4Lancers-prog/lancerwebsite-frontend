import type { LegalSection } from '@/components/sections/LegalPage'
import { site } from './site'

/** ⚠️ Template legal copy — have it reviewed by your legal advisor before launch. */
export const LEGAL_UPDATED = 'September 2026'

export const privacySections: LegalSection[] = [
  {
    heading: 'Who we are',
    body: [
      `This policy explains how ${site.legalName} ("4lancers", "we", "us") collects, uses and protects personal information when you visit ${site.url} or contact us about our services.`,
    ],
  },
  {
    heading: 'Information we collect',
    body: [
      'Information you give us: when you submit our contact form or email us, we collect your name, company, email address, phone number, website and the details you share about your project, budget and timeline.',
      'Technical information: like most websites, our servers may record basic technical data such as IP address, browser type and pages visited, for security and to keep the site working properly.',
    ],
  },
  {
    heading: 'How we use your information',
    body: [
      'To respond to your enquiry, understand your requirements and prepare proposals.',
      'To deliver and support services you engage us for, and to communicate about them.',
      'To protect our website against spam, abuse and security threats.',
      'We do not sell your personal information, and we do not use it for unrelated marketing without your consent.',
    ],
  },
  {
    heading: 'Legal basis & consent',
    body: [
      'We process enquiry information with your consent, which you give when submitting the contact form, and where necessary to take steps at your request before entering into a contract. We aim to comply with the Digital Personal Data Protection Act, 2023 (India) and other applicable laws.',
    ],
  },
  {
    heading: 'Sharing',
    body: [
      'We share information only with service providers who help us operate — for example hosting, database and email providers — under appropriate confidentiality and security obligations, or when required by law.',
    ],
  },
  {
    heading: 'Retention & security',
    body: [
      'We keep enquiry data only as long as needed for the purposes above, or as required by law. We use reasonable technical and organisational measures — encrypted connections, access controls and secure hosting — to protect it.',
    ],
  },
  {
    heading: 'Your rights',
    body: [
      `You can ask to access, correct or delete the personal information we hold about you, or withdraw your consent, by emailing ${site.contact.email}. We will respond within a reasonable time.`,
    ],
  },
  {
    heading: 'Cookies',
    body: ['This website does not use advertising cookies. If we add analytics in future, we will update this policy and, where required, ask for your consent.'],
  },
  {
    heading: 'Changes & contact',
    body: [`We may update this policy from time to time; the date at the top shows the latest version. Questions? Email ${site.contact.email}.`],
  },
]

export const termsSections: LegalSection[] = [
  { heading: 'Acceptance', body: [`By using ${site.url} you agree to these terms. If you do not agree, please do not use the website.`] },
  {
    heading: 'Use of the website',
    body: ['You may browse the website for lawful purposes. You must not attempt to disrupt it, gain unauthorised access, submit spam or malicious content, or misuse the contact form.'],
  },
  {
    heading: 'Information on this website',
    body: [
      'Content on this website is provided for general information about our services. It is not a binding offer. Case studies describe our approach and work; scope, pricing, timelines and deliverables for any engagement are defined only in a separate written proposal or agreement.',
    ],
  },
  {
    heading: 'Intellectual property',
    body: [
      `The website, its design, text, graphics and the 4lancers name and logo belong to ${site.legalName} unless stated otherwise. You may not copy or reuse them without written permission. Ownership of software built for clients is governed by the respective client agreement.`,
    ],
  },
  { heading: 'Third-party links', body: ['The website may link to third-party sites. We are not responsible for their content or practices.'] },
  {
    heading: 'Limitation of liability',
    body: ['The website is provided "as is". To the extent permitted by law, we are not liable for any indirect or consequential loss arising from use of the website.'],
  },
  { heading: 'Governing law', body: ['These terms are governed by the laws of India. Courts at the location of our registered office shall have jurisdiction.'] },
  { heading: 'Contact', body: [`Questions about these terms can be sent to ${site.contact.email}.`] },
]
