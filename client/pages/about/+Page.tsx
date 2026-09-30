import { ArrowUpRight, Handshake, Microscope, ShieldCheck, Sparkles, MessagesSquare, Layers } from 'lucide-react'
import { seoPages } from '@/data/seo'
import { site } from '@/data/site'
import { services } from '@/data/services'
import { whyUs } from '@/data/home'
import { Seo } from '@/components/seo/Seo'
import { PageHero } from '@/components/sections/PageHero'
import { CtaSection } from '@/components/sections/CtaSection'
import { Container, Heading, IconBox, Section } from '@/components/ui/primitives'
import { Reveal } from '@/components/animations/TextReveal'
import { DepthCard } from '@/components/animations/DepthCard'
import { ImageReveal } from '@/components/animations/Spotlight'

const principles = [
  { icon: Microscope, title: 'Problem before technology', description: 'We ask how your business works before we suggest anything to build. Sometimes the answer is smaller than you expect — we will say so.' },
  { icon: Layers, title: 'Built around you', description: 'Your workflows, users and constraints shape the solution. We do not bend your business around a template.' },
  { icon: ShieldCheck, title: 'Quality as a default', description: 'Security, testing, documentation and maintainable code are part of every build — not line items to cut.' },
  { icon: MessagesSquare, title: 'Clear communication', description: 'Plain language, visible progress and honest timelines. You always know what is being built and why.' },
  { icon: Handshake, title: 'Real collaboration', description: 'We work as an extension of your team — reviewing, demoing and refining together through every stage.' },
  { icon: Sparkles, title: 'Honest claims', description: 'No inflated promises or invented numbers. We show what we built and what changed, and let the work speak.' },
]

export default function Page() {
  return (
    <>
      <Seo page={seoPages.about} breadcrumbs={[{ name: 'About', path: '/about' }]} />
      <PageHero
        eyebrow="About 4lancers"
        title="A technology partner that understands the business first."
        lead="4lancers designs and builds AI automation, business software, websites and applications. But the work always starts in the same place: understanding the problem your business actually needs solved."
        breadcrumbs={[{ name: 'About', path: '/about' }]}
      />

      <Section className="pt-0 sm:pt-0 lg:pt-0">
        <Container className="grid items-center gap-14 lg:grid-cols-2">
          <ImageReveal className="relative aspect-square rounded-[1.5rem] border border-border bg-surface">
            <div aria-hidden className="absolute inset-0 bg-grid opacity-40 mask-radial" />
            <div aria-hidden className="absolute inset-1/4 rounded-full bg-primary/25 blur-3xl" />
            <img src={site.logo.full} alt="4lancers logo" width={640} height={572} loading="lazy" className="absolute inset-0 m-auto w-3/5" />
          </ImageReveal>
          <div>
            <Heading eyebrow="Why the name" title="Four directions. One partner." />
            <Reveal delay={0.1}>
              <div className="mt-6 space-y-5 leading-relaxed text-muted">
                <p>
                  Our mark points in four directions — and so does our work: <strong className="text-foreground">AI automation</strong>,{' '}
                  <strong className="text-foreground">software development</strong>, <strong className="text-foreground">website development</strong> and{' '}
                  <strong className="text-foreground">application development</strong>. Different disciplines, one centre: your business.
                </p>
                <p>
                  Most businesses do not need more software. They need the <em>right</em> software — a WhatsApp flow that answers customers instantly, a CRM that matches how their sales team sells, an
                  ERP that mirrors their factory floor, or an app their customers genuinely use.
                </p>
                <p className="font-display text-xl text-foreground">{site.coreMessage}</p>
              </div>
            </Reveal>
            <ul className="mt-8 grid grid-cols-2 gap-3">
              {services.map((s) => (
                <li key={s.slug}>
                  <a href={s.href} className="flex items-center gap-2 rounded-xl border border-border bg-surface/60 px-4 py-3 text-sm transition-colors hover:border-primary/50">
                    <s.icon className="size-4 text-primary" aria-hidden /> {s.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      <Section className="bg-surface/30">
        <Container>
          <Heading align="center" eyebrow="How we work" title="Principles we do not compromise on" />
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {principles.map((p, i) => (
              <Reveal key={p.title} delay={(i % 3) * 0.08} className="h-full">
                <DepthCard intensity={5}>
                  <div className="p-7">
                    <IconBox>
                      <p.icon className="size-5" aria-hidden />
                    </IconBox>
                    <h3 className="mt-6 text-xl font-semibold">{p.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{p.description}</p>
                  </div>
                </DepthCard>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <Heading eyebrow="Positioning" title="What makes the difference" lead="A technology and automation partner — not a template shop and not a body-shop." />
          <div className="grid gap-4 sm:grid-cols-2">
            {whyUs.map((w) => (
              <div key={w.title} className="rounded-2xl border border-border bg-surface/60 p-6">
                <w.icon className="size-5 text-primary" aria-hidden />
                <h3 className="mt-4 font-semibold">{w.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{w.description}</p>
              </div>
            ))}
            <a href="/process" className="group flex items-center justify-between rounded-2xl border border-primary/40 bg-primary-soft p-6 sm:col-span-2">
              <span className="font-display text-lg">See our 8-step delivery process</span>
              <ArrowUpRight className="size-5 text-accent transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
            </a>
          </div>
        </Container>
      </Section>

      <CtaSection />
    </>
  )
}
