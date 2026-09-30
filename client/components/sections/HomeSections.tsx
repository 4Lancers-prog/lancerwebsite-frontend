import { ArrowRight, ArrowUpRight, Quote } from 'lucide-react'
import { motion } from 'motion/react'
import { hero, problemSolution, whyUs, capabilities } from '@/data/home'
import { services } from '@/data/services'
import { featuredProjects } from '@/data/projects'
import { site } from '@/data/site'
import { Button } from '@/components/ui/Button'
import { Container, Eyebrow, Heading, IconBox, Section } from '@/components/ui/primitives'
import { ThreeDTextReveal } from '@/components/animations/ThreeDTextReveal'
import { MagneticButton } from '@/components/animations/MagneticButton'
import { Reveal } from '@/components/animations/TextReveal'
import { Spotlight } from '@/components/animations/Spotlight'
import { SkewedCarousel } from '@/components/animations/SkewedCarousel'
import { SimpleGraph } from '@/components/animations/SimpleGraph'
import { ServiceCard, ProjectCard } from '@/components/cards/Cards'
import { BrandOrbit } from './BrandOrbit'
import { ProjectComparison } from './BeforeAfterVisuals'

/* 02 — HERO */
export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-28 pb-16 sm:pt-36 lg:min-h-dvh lg:pt-32 lg:pb-24 lg:flex lg:items-center">
      <Spotlight />
      <div aria-hidden className="absolute inset-0 bg-grid opacity-50 mask-radial" />
      <Container className="relative grid items-center gap-14 lg:grid-cols-[1.25fr_1fr]">
        <div>
          <Reveal>
            <Eyebrow>{hero.eyebrow}</Eyebrow>
          </Reveal>
          <ThreeDTextReveal
            lines={hero.titleLines}
            highlight={2}
            className="mt-7 text-[2.6rem] font-semibold leading-[1.02] sm:text-6xl lg:text-7xl xl:text-[4.75rem]"
          />
          <Reveal delay={0.6}>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted sm:text-xl">{hero.lead}</p>
          </Reveal>
          <Reveal delay={0.75} className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <MagneticButton>
              <Button href={hero.primaryCta.href} size="lg" className="w-full sm:w-auto">
                {hero.primaryCta.label}
                <ArrowUpRight className="size-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
              </Button>
            </MagneticButton>
            <Button href={hero.secondaryCta.href} variant="secondary" size="lg">
              {hero.secondaryCta.label}
              <ArrowRight className="size-4" aria-hidden />
            </Button>
          </Reveal>
        </div>
        <div className="px-8 sm:px-12 lg:px-4">
          <BrandOrbit />
        </div>
      </Container>
    </section>
  )
}

/* 03 — SERVICES */
export function ServicesSection() {
  return (
    <Section id="services" className="scroll-mt-16">
      <Container>
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <Heading
            eyebrow="What we build"
            title={
              <>
                Four ways we turn business problems into <span className="text-gradient">working technology.</span>
              </>
            }
          />
          <p className="max-w-sm text-muted">From a single WhatsApp workflow to a complete ERP — specialised automation and full business software, built on your requirements.</p>
        </div>
        <div className="mt-14 grid gap-5 sm:grid-cols-2">
          {services.map((s, i) => (
            <Reveal key={s.slug} delay={i * 0.08} className="h-full">
              <ServiceCard service={s} index={i} />
            </Reveal>
          ))}
        </div>
      </Container>
      <SkewedCarousel items={capabilities} className="mt-16" />
    </Section>
  )
}

/* 04 — PROBLEM → SOLUTION */
export function ProblemSolutionSection() {
  return (
    <Section className="overflow-hidden">
      <Container className="grid items-center gap-14 lg:grid-cols-2">
        <div>
          <Heading eyebrow="Our approach" title={problemSolution.title} lead={problemSolution.statement} />
          <div className="mt-10 grid gap-4">
            {problemSolution.stages.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.1}>
                <div className="flex gap-5 rounded-2xl border border-border bg-surface/60 p-5">
                  <IconBox>
                    <s.icon className="size-5" aria-hidden />
                  </IconBox>
                  <div>
                    <h3 className="text-lg font-semibold">
                      <span className="mr-2 text-primary">{String(i + 1).padStart(2, '0')}</span>
                      {s.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{s.description}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
        <Reveal className="relative">
          <div className="relative rounded-[2rem] border border-border bg-surface p-6 shadow-card sm:p-10">
            <div aria-hidden className="absolute inset-0 rounded-[2rem] bg-grid opacity-30 mask-radial" />
            <p className="relative mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-muted-2">How value compounds</p>
            <div className="relative">
              <SimpleGraph labels={['Understand', 'Build', 'Grow']} />
            </div>
            <figure className="relative mt-6 flex gap-4 border-t border-border pt-6">
              <Quote className="size-6 shrink-0 text-primary" aria-hidden />
              <blockquote className="font-display text-lg leading-snug text-foreground sm:text-xl">{site.coreMessage}</blockquote>
            </figure>
          </div>
        </Reveal>
      </Container>
    </Section>
  )
}

/* 05 — WHY 4LANCERS */
export function WhyUsSection() {
  return (
    <Section className="bg-surface/30">
      <Container>
        <Heading align="center" eyebrow="Why 4lancers" title="A technology partner that starts with your business." />
        <div className="mt-14 grid gap-px overflow-hidden rounded-card border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {whyUs.map((w, i) => (
            <Reveal key={w.title} delay={i * 0.08} className="h-full">
              <motion.div whileHover={{ y: -4 }} className="group relative flex h-full flex-col bg-background p-8 transition-colors hover:bg-surface">
                <span aria-hidden className="absolute inset-x-0 top-0 h-px scale-x-0 bg-gradient-to-r from-transparent via-primary to-transparent transition-transform duration-500 group-hover:scale-x-100" />
                <IconBox>
                  <w.icon className="size-5" aria-hidden />
                </IconBox>
                <h3 className="mt-6 text-xl font-semibold">{w.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{w.description}</p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  )
}

/* 06 — SELECTED WORK */
export function SelectedWorkSection() {
  const showcase = featuredProjects.find((p) => p.comparison)
  return (
    <Section>
      <Container>
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <Heading eyebrow="Selected work" title="Real problems. Working solutions." />
          <Button href="/work" variant="secondary">
            All case studies <ArrowRight className="size-4" aria-hidden />
          </Button>
        </div>

        {showcase?.comparison && (
          <Reveal className="mt-14 grid items-center gap-10 lg:grid-cols-[1.4fr_1fr]">
            <ProjectComparison kind={showcase.comparison} />
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-2">Before → After</p>
              <h3 className="mt-4 text-2xl font-semibold sm:text-3xl">{showcase.title}</h3>
              <p className="mt-4 leading-relaxed text-muted">{showcase.challenge}</p>
              <a href={`/work#${showcase.slug}`} className="mt-6 inline-flex items-center gap-2 font-medium text-accent hover:underline">
                Read the case study <ArrowUpRight className="size-4" aria-hidden />
              </a>
            </div>
          </Reveal>
        )}

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.08} className="h-full">
              <ProjectCard project={p} index={i} />
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  )
}
