import { useEffect, useState } from 'react'
import { Mail, Phone, MessageCircle, Clock, MapPin } from 'lucide-react'
import { seoPages } from '@/data/seo'
import { site } from '@/data/site'
import { requirements, type RequirementValue } from '@/data/contact'
import { Seo } from '@/components/seo/Seo'
import { PageHero } from '@/components/sections/PageHero'
import { ContactForm } from '@/components/forms/ContactForm'
import { Container, Section } from '@/components/ui/primitives'
import { Reveal } from '@/components/animations/TextReveal'

const nextSteps = [
  ['We read your enquiry', 'A real person reviews your requirement — no auto-generated proposals.'],
  ['A short discovery call', 'We ask about your business, users and constraints to understand the actual problem.'],
  ['A clear recommendation', 'You get the approach, scope, timeline and estimate — or honest advice if you do not need us.'],
] as const

export default function Page() {
  const [preset, setPreset] = useState<RequirementValue | undefined>()
  useEffect(() => {
    const t = new URLSearchParams(window.location.search).get('type')
    if (t && requirements.some((r) => r.value === t)) setPreset(t as RequirementValue)
  }, [])

  return (
    <>
      <Seo page={seoPages.contact} breadcrumbs={[{ name: 'Contact', path: '/contact' }]} />
      <PageHero
        eyebrow="Start a project"
        title="Tell us what your business needs to fix."
        lead="No long enterprise forms. Share the problem in your own words — we will come back with clear next steps."
        breadcrumbs={[{ name: 'Contact', path: '/contact' }]}
      />
      <Section className="pt-0 sm:pt-0 lg:pt-0">
        <Container className="grid gap-10 lg:grid-cols-[1.6fr_1fr]">
          <Reveal>
            <ContactForm defaultRequirement={preset} />
          </Reveal>
          <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-card border border-border bg-surface/60 p-7">
              <h2 className="font-display text-xl font-semibold">What happens next</h2>
              <ol className="mt-6 space-y-6">
                {nextSteps.map(([t, d], i) => (
                  <li key={t} className="flex gap-4">
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-primary/50 bg-primary-soft text-sm font-semibold text-accent">{i + 1}</span>
                    <div>
                      <p className="font-medium">{t}</p>
                      <p className="mt-1 text-sm leading-relaxed text-muted">{d}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
            <div className="rounded-card border border-border bg-surface/60 p-7">
              <h2 className="font-display text-xl font-semibold">Prefer to talk directly?</h2>
              <ul className="mt-5 space-y-4 text-sm">
                <li>
                  <a href={`mailto:${site.contact.email}`} className="flex items-center gap-3 hover:text-accent">
                    <Mail className="size-4 text-primary" aria-hidden /> {site.contact.email}
                  </a>
                </li>
                {site.contact.phone && (
                  <li>
                    <a href={`tel:${site.contact.phone.replace(/\s/g, '')}`} className="flex items-center gap-3 hover:text-accent">
                      <Phone className="size-4 text-primary" aria-hidden /> {site.contact.phone}
                    </a>
                  </li>
                )}
                {site.contact.whatsapp && (
                  <li>
                    <a href={`https://wa.me/${site.contact.whatsapp}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-accent">
                      <MessageCircle className="size-4 text-primary" aria-hidden /> Chat on WhatsApp
                    </a>
                  </li>
                )}
                {site.contact.address && (
                  <li className="flex items-center gap-3 text-muted">
                    <MapPin className="size-4 text-primary" aria-hidden /> {site.contact.address}
                  </li>
                )}
                <li className="flex items-center gap-3 text-muted">
                  <Clock className="size-4 text-primary" aria-hidden /> {site.contact.hours}
                </li>
              </ul>
            </div>
          </aside>
        </Container>
      </Section>
    </>
  )
}
