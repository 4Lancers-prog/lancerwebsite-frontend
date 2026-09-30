import { Check, Search, Wrench, Cpu, Sparkles, Target } from 'lucide-react'
import { seoPages } from '@/data/seo'
import { projects } from '@/data/projects'
import { services } from '@/data/services'
import { Seo } from '@/components/seo/Seo'
import { PageHero } from '@/components/sections/PageHero'
import { CtaSection } from '@/components/sections/CtaSection'
import { ProjectComparison } from '@/components/sections/BeforeAfterVisuals'
import { Badge, Container, Section } from '@/components/ui/primitives'
import { Reveal } from '@/components/animations/TextReveal'
import { cn } from '@/lib/utils'

function Block({ icon: Icon, title, children }: { icon: typeof Check; title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-muted-2">
        <Icon className="size-4 text-primary" aria-hidden /> {title}
      </h3>
      <div className="mt-3">{children}</div>
    </div>
  )
}

const List = ({ items, tone = 'muted' }: { items: string[]; tone?: 'muted' | 'strong' }) => (
  <ul className="space-y-2">
    {items.map((i) => (
      <li key={i} className={cn('flex gap-2.5 text-sm leading-relaxed', tone === 'strong' ? 'text-foreground' : 'text-muted')}>
        <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
        {i}
      </li>
    ))}
  </ul>
)

export default function Page() {
  return (
    <>
      <Seo page={seoPages.work} breadcrumbs={[{ name: 'Work', path: '/work' }]} />
      <PageHero
        eyebrow="Work & case studies"
        title="Business problems, solved with the right technology."
        lead="Each case study follows the same thread: the business context, the challenge, how we analysed it, what we built — and what changed."
        breadcrumbs={[{ name: 'Work', path: '/work' }]}
      >
        <nav aria-label="Case studies" className="mt-10 flex flex-wrap gap-2">
          {projects.map((p) => (
            <a key={p.slug} href={`#${p.slug}`} className="rounded-full border border-border-strong bg-surface/60 px-4 py-2 text-sm text-muted transition-colors hover:border-primary hover:text-foreground">
              {p.title}
            </a>
          ))}
        </nav>
      </PageHero>

      <Section className="pt-0 sm:pt-0 lg:pt-0">
        <Container className="space-y-10">
          {projects.map((p, idx) => (
            <Reveal key={p.slug}>
              <article id={p.slug} className="scroll-mt-28 overflow-hidden rounded-[1.75rem] border border-border bg-surface/60">
                <header className="border-b border-border p-6 sm:p-10">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-display text-sm text-primary">Case {String(idx + 1).padStart(2, '0')}</span>
                    <Badge>{p.industry}</Badge>
                    {services
                      .filter((s) => p.services.includes(s.slug))
                      .map((s) => (
                        <a key={s.slug} href={s.href}>
                          <Badge className="hover:border-primary hover:text-accent">{s.name}</Badge>
                        </a>
                      ))}
                  </div>
                  <h2 className="mt-5 text-2xl font-semibold sm:text-4xl">{p.title}</h2>
                  <p className="mt-3 max-w-3xl leading-relaxed text-muted">{p.context}</p>
                </header>

                <div className={cn('grid gap-10 p-6 sm:p-10', p.comparison && 'lg:grid-cols-[1fr_1.1fr]')}>
                  <div className="space-y-8">
                    <Block icon={Target} title="The challenge & its impact">
                      <p className="leading-relaxed text-foreground">{p.challenge}</p>
                      <p className="mt-2 text-sm leading-relaxed text-muted">{p.impact}</p>
                    </Block>
                    <Block icon={Search} title="How we analysed it">
                      <List items={p.analysis} />
                    </Block>
                    <Block icon={Wrench} title="Solution & implementation">
                      <List items={p.solution} tone="strong" />
                    </Block>
                  </div>

                  <div className="space-y-8">
                    {p.comparison && (
                      <div>
                        <ProjectComparison kind={p.comparison} />
                        <p className="mt-2 text-xs text-muted-2">Illustration of the process before and after. Drag or use arrow keys to compare.</p>
                      </div>
                    )}
                    <Block icon={Cpu} title="Technology">
                      <ul className="flex flex-wrap gap-2">
                        {p.technology.map((t) => (
                          <li key={t} className="rounded-md bg-surface-2 px-2.5 py-1 text-xs text-foreground">
                            {t}
                          </li>
                        ))}
                      </ul>
                    </Block>
                    <div className="rounded-2xl border border-primary/30 bg-primary-soft p-6">
                      <Block icon={Sparkles} title="What changed for the business">
                        <List items={p.whatChanged} tone="strong" />
                        {p.verifiedOutcome && <p className="mt-4 font-display text-lg text-accent">{p.verifiedOutcome}</p>}
                      </Block>
                    </div>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </Container>
      </Section>

      <CtaSection title="Your business could be the next case study." />
    </>
  )
}
