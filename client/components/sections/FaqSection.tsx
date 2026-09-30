import type { Faq } from '@/data/types'
import { Container, Heading, Section } from '@/components/ui/primitives'
import { Accordion } from '@/components/ui/Accordion'
import { Reveal } from '@/components/animations/TextReveal'

export function FaqSection({ faqs, title = 'Frequently asked questions' }: { faqs: Faq[]; title?: string }) {
  return (
    <Section>
      <Container className="grid gap-12 lg:grid-cols-[1fr_1.6fr]">
        <Heading eyebrow="FAQ" title={title} lead="Straight answers to what clients usually ask us first. Anything else — just ask." />
        <Reveal>
          <Accordion items={faqs} />
        </Reveal>
      </Container>
    </Section>
  )
}
