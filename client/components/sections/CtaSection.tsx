import { ArrowUpRight, Mail } from 'lucide-react'
import { Container } from '@/components/ui/primitives'
import { Button } from '@/components/ui/Button'
import { MagneticButton } from '@/components/animations/MagneticButton'
import { Reveal, TextReveal } from '@/components/animations/TextReveal'
import { site } from '@/data/site'

export function CtaSection({
  title = 'Have a Business Problem to Solve?',
  lead = 'Start a conversation. Tell us what is slowing your business down — we will tell you honestly how technology can help, and what it would take.',
}: {
  title?: string
  lead?: string
}) {
  return (
    <section className="relative py-20 sm:py-28">
      <Container>
        <div className="relative overflow-hidden rounded-[2rem] border border-primary/30 bg-surface px-6 py-16 text-center sm:px-12 sm:py-24">
          <div aria-hidden className="absolute inset-0 bg-grid opacity-50 mask-radial" />
          <div aria-hidden className="absolute -top-32 left-1/2 h-72 w-[42rem] -translate-x-1/2 rounded-full bg-primary/30 blur-[100px]" />
          <img
            src={site.logo.mark}
            alt=""
            aria-hidden
            loading="lazy"
            width={256}
            height={254}
            className="pointer-events-none absolute -right-16 -bottom-16 w-64 rotate-12 opacity-[0.07] sm:w-96"
          />
          <div className="relative mx-auto max-w-3xl">
            <h2 className="text-3xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
              <TextReveal text={title} />
            </h2>
            <Reveal delay={0.15}>
              <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">{lead}</p>
            </Reveal>
            <Reveal delay={0.25} className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <MagneticButton>
                <Button href="/contact" size="lg">
                  Start a Conversation
                  <ArrowUpRight className="size-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
                </Button>
              </MagneticButton>
              <Button href={`mailto:${site.contact.email}`} variant="secondary" size="lg">
                <Mail className="size-4" aria-hidden /> {site.contact.email}
              </Button>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  )
}
