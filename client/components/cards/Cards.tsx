import { ArrowUpRight, Check } from 'lucide-react'
import type { Project, ProcessStep, Service, Solution } from '@/data/types'
import { services } from '@/data/services'
import { DepthCard } from '@/components/animations/DepthCard'
import { Badge, IconBox } from '@/components/ui/primitives'
import { cn } from '@/lib/utils'

export function ServiceCard({ service, index }: { service: Service; index: number }) {
  return (
    <DepthCard>
      <a href={service.href} className="flex h-full flex-col p-7 sm:p-8">
        <div className="flex items-start justify-between">
          <IconBox className="size-13">
            <service.icon className="size-6" aria-hidden />
          </IconBox>
          <span className="font-display text-sm text-muted-2">0{index + 1}</span>
        </div>
        <h3 className="mt-8 text-2xl font-semibold">{service.name}</h3>
        <p className="mt-3 flex-1 leading-relaxed text-muted">{service.summary}</p>
        <span className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-accent">
          Explore {service.shortName.toLowerCase()}
          <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" aria-hidden />
        </span>
      </a>
    </DepthCard>
  )
}

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <DepthCard intensity={5}>
      <a href={`/work#${project.slug}`} className="flex h-full flex-col p-7 sm:p-8">
        <div className="flex items-center justify-between gap-3">
          <Badge>{project.industry}</Badge>
          <span className="font-display text-4xl font-semibold text-border-strong transition-colors group-hover:text-primary">0{index + 1}</span>
        </div>
        <h3 className="mt-8 text-xl font-semibold leading-snug sm:text-2xl">{project.title}</h3>
        <p className="mt-4 text-sm leading-relaxed text-muted">
          <span className="font-medium text-foreground">Problem — </span>
          {project.challenge}
        </p>
        <ul className="mt-6 space-y-2">
          {project.whatChanged.slice(0, 2).map((w) => (
            <li key={w} className="flex gap-2.5 text-sm text-foreground">
              <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
              {w}
            </li>
          ))}
        </ul>
        <div className="mt-auto flex flex-wrap gap-2 pt-8">
          {project.technology.slice(0, 4).map((t) => (
            <span key={t} className="rounded-md bg-surface-2 px-2 py-1 text-xs text-muted">
              {t}
            </span>
          ))}
        </div>
      </a>
    </DepthCard>
  )
}

export function SolutionCard({ solution }: { solution: Solution }) {
  const related = services.filter((s) => solution.services.includes(s.slug))
  return (
    <DepthCard intensity={4}>
      <article id={solution.slug} className="flex h-full scroll-mt-28 flex-col p-7 sm:p-8">
        <div className="flex items-center gap-4">
          <IconBox>
            <solution.icon className="size-5" aria-hidden />
          </IconBox>
          <h3 className="text-2xl font-semibold">{solution.industry}</h3>
        </div>
        <p className="mt-5 leading-relaxed text-muted">{solution.intro}</p>

        <div className="mt-7 grid gap-6 sm:grid-cols-2">
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-2">Common challenges</h4>
            <ul className="mt-3 space-y-2">
              {solution.challenges.map((c) => (
                <li key={c} className="flex gap-2 text-sm text-muted">
                  <span className="mt-2 size-1.5 shrink-0 rotate-45 bg-legacy-accent" aria-hidden />
                  {c}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-2">What we build</h4>
            <ul className="mt-3 space-y-2">
              {solution.solutions.map((c) => (
                <li key={c} className="flex gap-2 text-sm text-foreground">
                  <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-7">
          <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-2">Example workflow</h4>
          <ol className="mt-3 flex flex-wrap items-center gap-2">
            {solution.workflow.map((w, i) => (
              <li key={w} className="flex items-center gap-2 text-xs">
                <span className="rounded-full border border-primary/40 bg-primary-soft px-3 py-1.5 text-accent">{w}</span>
                {i < solution.workflow.length - 1 && <span className="text-muted-2" aria-hidden>→</span>}
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-border pt-6 mt-8 text-sm">
          {related.map((s) => (
            <a key={s.slug} href={s.href} className="inline-flex items-center gap-1 text-muted hover:text-accent">
              {s.name} <ArrowUpRight className="size-3.5" aria-hidden />
            </a>
          ))}
          {solution.relatedProject && (
            <a href={`/work#${solution.relatedProject}`} className="inline-flex items-center gap-1 font-medium text-accent">
              Related case study <ArrowUpRight className="size-3.5" aria-hidden />
            </a>
          )}
        </div>
      </article>
    </DepthCard>
  )
}

export function ProcessCard({ step, compact }: { step: ProcessStep; compact?: boolean }) {
  return (
    <div className={cn('group relative h-full rounded-card border border-border bg-surface/70 p-6 transition-colors hover:border-primary/50', !compact && 'sm:p-8')}>
      <div className="flex items-center justify-between">
        <IconBox>
          <step.icon className="size-5" aria-hidden />
        </IconBox>
        <span className="font-display text-3xl font-semibold text-border-strong transition-colors group-hover:text-primary">{step.no}</span>
      </div>
      <h3 className="mt-6 text-xl font-semibold">{step.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{step.description}</p>
      {!compact && (
        <ul className="mt-5 flex flex-wrap gap-2">
          {step.deliverables.map((d) => (
            <li key={d} className="rounded-md bg-surface-2 px-2 py-1 text-xs text-muted">
              {d}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
