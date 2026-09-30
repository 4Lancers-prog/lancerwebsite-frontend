import { seoPages } from '@/data/seo'
import { solutions } from '@/data/solutions'
import { Seo } from '@/components/seo/Seo'
import { PageHero } from '@/components/sections/PageHero'
import { CtaSection } from '@/components/sections/CtaSection'
import { Container, Section } from '@/components/ui/primitives'
import { Reveal } from '@/components/animations/TextReveal'
import { SolutionCard } from '@/components/cards/Cards'

export default function Page() {
  return (
    <>
      <Seo page={seoPages.solutions} breadcrumbs={[{ name: 'Solutions', path: '/solutions' }]} />
      <PageHero
        eyebrow="Solutions by industry"
        title="Business problems first. Technology second."
        lead="Every industry has its own bottlenecks. Here is how common challenges map to practical automation, software and applications — and what a working flow looks like."
        breadcrumbs={[{ name: 'Solutions', path: '/solutions' }]}
      >
        <nav aria-label="Industries" className="mt-10 flex flex-wrap gap-2">
          {solutions.map((s) => (
            <a key={s.slug} href={`#${s.slug}`} className="flex items-center gap-2 rounded-full border border-border-strong bg-surface/60 px-4 py-2 text-sm text-muted transition-colors hover:border-primary hover:text-foreground">
              <s.icon className="size-4 text-primary" aria-hidden />
              {s.industry}
            </a>
          ))}
        </nav>
      </PageHero>

      <Section className="pt-0 sm:pt-0 lg:pt-0">
        <Container className="grid gap-5 lg:grid-cols-2">
          {solutions.map((s, i) => (
            <Reveal key={s.slug} delay={(i % 2) * 0.08} className="h-full">
              <SolutionCard solution={s} />
            </Reveal>
          ))}
        </Container>
      </Section>

      <CtaSection title="Don't see your industry?" lead="The method is the same everywhere: understand the workflow, find the bottleneck, build what fits. Tell us how your business runs." />
    </>
  )
}
