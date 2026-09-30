import { Container } from '@/components/ui/primitives'
import { PageHero } from './PageHero'

export type LegalSection = { heading: string; body: string[] }

export function LegalPage({ title, updated, intro, sections, path }: { title: string; updated: string; intro: string; sections: LegalSection[]; path: string }) {
  return (
    <>
      <PageHero eyebrow={`Last updated · ${updated}`} title={title} lead={intro} breadcrumbs={[{ name: title, path }]} />
      <Container className="grid gap-12 pb-24 lg:grid-cols-[16rem_1fr]">
        <nav aria-label="On this page" className="hidden lg:block">
          <ol className="sticky top-28 space-y-2 border-l border-border text-sm">
            {sections.map((s, i) => (
              <li key={s.heading}>
                <a href={`#s${i + 1}`} className="-ml-px block border-l border-transparent pl-4 text-muted hover:border-primary hover:text-foreground">
                  {s.heading}
                </a>
              </li>
            ))}
          </ol>
        </nav>
        <div className="max-w-3xl space-y-12">
          {sections.map((s, i) => (
            <section key={s.heading} id={`s${i + 1}`} className="scroll-mt-28">
              <h2 className="text-2xl font-semibold">
                <span className="mr-3 text-primary">{String(i + 1).padStart(2, '0')}</span>
                {s.heading}
              </h2>
              <div className="mt-4 space-y-4 leading-relaxed text-muted">
                {s.body.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </Container>
    </>
  )
}
