import { motion, useScroll, useSpring } from 'motion/react'
import { useRef } from 'react'
import { seoPages } from '@/data/seo'
import { processSteps } from '@/data/process'
import { Seo } from '@/components/seo/Seo'
import { PageHero } from '@/components/sections/PageHero'
import { CtaSection } from '@/components/sections/CtaSection'
import { Container, Section } from '@/components/ui/primitives'
import { Reveal } from '@/components/animations/TextReveal'
import { SpeedingText } from '@/components/animations/SpeedingText'
import { ProcessCard } from '@/components/cards/Cards'
import { cn } from '@/lib/utils'

export default function Page() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 60%'] })
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })

  return (
    <>
      <Seo page={seoPages.process} breadcrumbs={[{ name: 'Process', path: '/process' }]} />
      <PageHero
        eyebrow="Our process"
        title="Discover → Analyze → Design → Build → Test → Launch → Improve"
        lead="A clear, collaborative process that turns a business problem into dependable technology — with visible progress and no surprises."
        breadcrumbs={[{ name: 'Process', path: '/process' }]}
      />

      <Section className="pt-0 sm:pt-0 lg:pt-0">
        <Container>
          <div ref={ref} className="relative mx-auto max-w-5xl">
            {/* timeline spine */}
            <div aria-hidden className="absolute left-5 top-0 bottom-0 w-px bg-border md:left-1/2">
              <motion.div style={{ scaleY }} className="h-full w-full origin-top bg-gradient-to-b from-primary to-accent" />
            </div>
            <ol className="space-y-10 md:space-y-14">
              {processSteps.map((s, i) => (
                <li key={s.no} className={cn('relative grid gap-6 pl-14 md:grid-cols-2 md:pl-0', i % 2 && 'md:[&>div]:col-start-2')}>
                  <span aria-hidden className="absolute left-5 top-8 z-10 size-4 -translate-x-1/2 rotate-45 border-2 border-primary bg-background md:left-1/2" />
                  <Reveal className={cn(i % 2 ? 'md:pl-12' : 'md:pr-12')} y={30}>
                    <ProcessCard step={s} />
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </Section>

      <SpeedingText words={['DISCOVER', 'ANALYZE', 'STRATEGIZE', 'DESIGN', 'BUILD', 'TEST', 'LAUNCH', 'IMPROVE']} />
      <CtaSection title="Ready for step 01?" lead="Discovery starts with a conversation about your business — not a sales pitch. Tell us what you are trying to fix." />
    </>
  )
}
