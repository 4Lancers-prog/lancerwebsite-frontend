import { ArrowRight, ArrowUpRight, CircleAlert, MessageCircle, Globe, Phone, Mail, BrainCircuit, ShieldCheck, Database, Users, LayoutDashboard, UserRound } from 'lucide-react'
import type { Service } from '@/data/types'
import { getProject } from '@/data/projects'
import { services } from '@/data/services'
import { Button } from '@/components/ui/Button'
import { Badge, Container, Heading, IconBox, Section } from '@/components/ui/primitives'
import { DepthCard } from '@/components/animations/DepthCard'
import { Reveal } from '@/components/animations/TextReveal'
import { SpeedingText } from '@/components/animations/SpeedingText'
import { ProjectCard } from '@/components/cards/Cards'
import { PageHero } from './PageHero'
import { FaqSection } from './FaqSection'
import { CtaSection } from './CtaSection'

function HeroAside({ service }: { service: Service }) {
  return (
    <div className="relative rounded-card border border-border bg-surface/80 p-6 shadow-card backdrop-blur sm:p-8">
      <div className="flex items-center gap-3">
        <IconBox>
          <service.icon className="size-5" aria-hidden />
        </IconBox>
        <p className="font-display text-lg font-medium">{service.offeringsTitle}</p>
      </div>
      <ul className="mt-6 grid gap-2">
        {service.offerings.slice(0, 6).map((o) => (
          <li key={o.title} className="flex items-center gap-3 rounded-xl border border-border bg-background/60 px-4 py-3 text-sm">
            <o.icon className="size-4 text-primary" aria-hidden />
            {o.title}
          </li>
        ))}
      </ul>
      {service.offerings.length > 6 && <p className="mt-4 text-xs text-muted-2">+ {service.offerings.length - 6} more below</p>}
    </div>
  )
}

/** Conceptual automation architecture: channels → AI layer → your systems, with human hand-off. */
function AutomationArchitecture() {
  const col = 'flex flex-col gap-3'
  const node = 'flex items-center gap-3 rounded-xl border border-border bg-background/70 px-4 py-3 text-sm'
  return (
    <Section className="bg-surface/30">
      <Container>
        <Heading
          eyebrow="How it fits together"
          title="Automation architecture, simplified"
          lead="Every automation we build follows the same principle: meet customers on their channel, let AI handle the routine, and keep your systems and your team in the loop."
        />
        <Reveal className="mt-14 grid items-stretch gap-4 lg:grid-cols-[1fr_auto_1.2fr_auto_1fr]">
          <div className={col}>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-2">Channels</p>
            {[
              [MessageCircle, 'WhatsApp'],
              [Globe, 'Website chat'],
              [Phone, 'Phone calls'],
              [Mail, 'Email & forms'],
            ].map(([I, t]) => {
              const Icon = I as typeof Mail
              return (
                <div key={t as string} className={node}>
                  <Icon className="size-4 text-primary" aria-hidden /> {t as string}
                </div>
              )
            })}
          </div>
          <ArrowRight className="mx-auto hidden size-6 self-center text-primary lg:block" aria-hidden />
          <div className="flex flex-col justify-center gap-3 rounded-card border border-primary/40 bg-primary-soft p-6 shadow-glow">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">AI layer</p>
            <div className={node}>
              <BrainCircuit className="size-4 text-accent" aria-hidden /> Bot / voice agent / AI agent
            </div>
            <div className={node}>
              <ShieldCheck className="size-4 text-accent" aria-hidden /> Guardrails, rules & approvals
            </div>
            <div className={`${node} border-dashed`}>
              <UserRound className="size-4 text-accent" aria-hidden /> Human hand-off with context
            </div>
          </div>
          <ArrowRight className="mx-auto hidden size-6 self-center text-primary lg:block" aria-hidden />
          <div className={col}>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-2">Your systems</p>
            {[
              [Users, 'CRM'],
              [Database, 'ERP / database'],
              [LayoutDashboard, 'Dashboards & reports'],
              [Mail, 'Team notifications'],
            ].map(([I, t]) => {
              const Icon = I as typeof Mail
              return (
                <div key={t as string} className={node}>
                  <Icon className="size-4 text-primary" aria-hidden /> {t as string}
                </div>
              )
            })}
          </div>
        </Reveal>
      </Container>
    </Section>
  )
}

export function ServicePage({ service }: { service: Service }) {
  const related = service.relatedProjects.map(getProject).filter((p) => p !== undefined)
  const others = services.filter((s) => s.slug !== service.slug)

  return (
    <>
      <PageHero
        eyebrow={service.name}
        title={service.heroTitle}
        lead={service.heroLead}
        breadcrumbs={[{ name: service.name, path: service.href }]}
        aside={<HeroAside service={service} />}
      >
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Button href="/contact" size="lg">
            Discuss your requirement <ArrowUpRight className="size-5" aria-hidden />
          </Button>
          <Button href="#offerings" variant="secondary" size="lg">
            See what we build
          </Button>
        </div>
      </PageHero>

      {/* Problems */}
      <Section className="pt-8 sm:pt-12 lg:pt-16">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <Heading eyebrow="The problem" title={service.problemsTitle} />
          <ul className="grid gap-3">
            {service.problems.map((p, i) => (
              <Reveal key={p} delay={i * 0.06}>
                <li className="flex gap-4 rounded-2xl border border-border bg-surface/60 p-5">
                  <CircleAlert className="mt-0.5 size-5 shrink-0 text-legacy-accent" aria-hidden />
                  <span className="leading-relaxed text-foreground">{p}</span>
                </li>
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>

      <SpeedingText words={['BUILD', 'AUTOMATE', 'SCALE']} />

      {/* Offerings */}
      <Section id="offerings" className="scroll-mt-16">
        <Container>
          <Heading
            eyebrow="Solutions"
            title={service.offeringsTitle}
            lead="If what you need does not fit a standard category, we analyse the workflow, users and goals, then build the software specifically around your business."
          />
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {service.offerings.map((o, i) => (
              <Reveal key={o.title} delay={(i % 3) * 0.08} className="h-full">
                <DepthCard intensity={5}>
                  <div className="p-7">
                    <IconBox>
                      <o.icon className="size-5" aria-hidden />
                    </IconBox>
                    <h3 className="mt-6 text-xl font-semibold">{o.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{o.description}</p>
                  </div>
                </DepthCard>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {service.slug === 'ai-automation' && <AutomationArchitecture />}

      {/* Workflow examples */}
      <Section>
        <Container>
          <Heading eyebrow="In practice" title="Example workflows" lead="Illustrative flows showing how the pieces connect in a real business." />
          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            {service.workflows.map((w) => (
              <Reveal key={w.title} className={service.workflows.length % 2 && w === service.workflows.at(-1) ? 'lg:col-span-2' : ''}>
                <div className="h-full rounded-card border border-border bg-surface/60 p-7 sm:p-8">
                  <h3 className="text-xl font-semibold">{w.title}</h3>
                  <ol className="relative mt-7 space-y-5 border-l border-dashed border-primary/40 pl-7">
                    {w.steps.map((s, i) => (
                      <li key={s} className="relative text-sm leading-relaxed text-muted">
                        <span className="absolute -left-[2.2rem] top-0 flex size-5 rotate-45 items-center justify-center border border-primary bg-background">
                          <span className="-rotate-45 text-[10px] font-semibold text-accent">{i + 1}</span>
                        </span>
                        <span className="text-foreground">{s}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Considerations + stack */}
      <Section className="bg-surface/30">
        <Container>
          <Heading eyebrow="Quality & security" title={service.considerationsTitle} />
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {service.considerations.map((c, i) => (
              <Reveal key={c.title} delay={i * 0.06} className="h-full">
                <div className="h-full rounded-card border border-border bg-background p-6">
                  <span className="block h-0.5 w-8 bg-primary" aria-hidden />
                  <h3 className="mt-5 text-lg font-semibold">{c.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{c.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="mt-14">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-2">Technology we work with</p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {service.stack.map((t) => (
                <li key={t}>
                  <Badge className="px-4 py-2 text-sm text-foreground">{t}</Badge>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      {/* Related case studies */}
      {related.length > 0 && (
        <Section>
          <Container>
            <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
              <Heading eyebrow="Case studies" title="Related work" />
              <Button href="/work" variant="secondary">
                All case studies <ArrowRight className="size-4" aria-hidden />
              </Button>
            </div>
            <div className="mt-12 grid gap-5 md:grid-cols-2">
              {related.map((p, i) => (
                <ProjectCard key={p.slug} project={p} index={i} />
              ))}
            </div>
          </Container>
        </Section>
      )}

      <FaqSection faqs={service.faqs} title={`${service.name} — questions`} />

      {/* Cross-links */}
      <Section className="pt-0 sm:pt-0 lg:pt-0">
        <Container>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-2">Other services</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {others.map((s) => (
              <a key={s.slug} href={s.href} className="group flex items-center justify-between rounded-2xl border border-border bg-surface/60 p-5 transition-colors hover:border-primary/50">
                <span className="flex items-center gap-3">
                  <s.icon className="size-5 text-primary" aria-hidden />
                  <span className="font-medium">{s.name}</span>
                </span>
                <ArrowUpRight className="size-4 text-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent" aria-hidden />
              </a>
            ))}
          </div>
        </Container>
      </Section>

      <CtaSection />
    </>
  )
}
