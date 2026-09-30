import type { ReactNode } from 'react'
import { ChevronRight } from 'lucide-react'
import { Container, Eyebrow } from '@/components/ui/primitives'
import { Spotlight } from '@/components/animations/Spotlight'
import { TextReveal, Reveal } from '@/components/animations/TextReveal'

type Crumb = { name: string; path: string }

/** Hero used on all inner pages — real <h1>, breadcrumbs, ambient brand light. */
export function PageHero({
  eyebrow,
  title,
  lead,
  breadcrumbs,
  children,
  aside,
}: {
  eyebrow?: string
  title: string
  lead?: string
  breadcrumbs?: Crumb[]
  children?: ReactNode
  aside?: ReactNode
}) {
  return (
    <section className="relative overflow-hidden pt-32 pb-16 sm:pt-40 sm:pb-24">
      <Spotlight />
      <div aria-hidden className="absolute inset-0 bg-grid opacity-40 mask-radial" />
      <Container className="relative">
        {breadcrumbs && (
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-1.5 text-xs text-muted-2">
              <li>
                <a href="/" className="hover:text-foreground">
                  Home
                </a>
              </li>
              {breadcrumbs.map((c, i) => (
                <li key={c.path} className="flex items-center gap-1.5">
                  <ChevronRight className="size-3" aria-hidden />
                  {i === breadcrumbs.length - 1 ? (
                    <span aria-current="page" className="text-muted">
                      {c.name}
                    </span>
                  ) : (
                    <a href={c.path} className="hover:text-foreground">
                      {c.name}
                    </a>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}
        <div className={aside ? 'grid items-center gap-12 lg:grid-cols-[1.25fr_1fr]' : ''}>
          <div className="max-w-4xl">
            {eyebrow && (
              <Reveal>
                <Eyebrow className="mb-6">{eyebrow}</Eyebrow>
              </Reveal>
            )}
            <h1 className="text-4xl font-semibold leading-[1.05] sm:text-5xl lg:text-6xl xl:text-7xl">
              <TextReveal text={title} />
            </h1>
            {lead && (
              <Reveal delay={0.2}>
                <p className="mt-7 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">{lead}</p>
              </Reveal>
            )}
            {children && <Reveal delay={0.3}>{children}</Reveal>}
          </div>
          {aside && <Reveal delay={0.25}>{aside}</Reveal>}
        </div>
      </Container>
    </section>
  )
}
