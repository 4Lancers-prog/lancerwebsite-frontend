import { motion } from 'motion/react'
import { services } from '@/data/services'
import { site } from '@/data/site'

/**
 * Hero visual built from the logo itself: the four-point mark sits at the
 * centre and each of its four arrows points to one of the four services.
 */
const positions = [
  'left-1/2 top-0 -translate-x-1/2 -translate-y-1/2',
  'right-0 top-1/2 translate-x-1/4 -translate-y-1/2',
  'left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2',
  'left-0 top-1/2 -translate-x-1/4 -translate-y-1/2',
]

export function BrandOrbit() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[30rem]">
      {/* rotating diamond rings */}
      <div aria-hidden className="absolute inset-[6%] rotate-45 rounded-[2.5rem] border border-border-strong" />
      <div aria-hidden className="absolute inset-[18%] animate-spin-slow">
        <div className="h-full w-full rotate-45 rounded-[2rem] border border-dashed border-primary/40" />
      </div>
      <div aria-hidden className="absolute inset-[30%] rounded-full bg-primary/25 blur-3xl animate-pulse-soft" />

      {/* axis lines */}
      <div aria-hidden className="absolute left-1/2 top-[6%] bottom-[6%] w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-primary/50 to-transparent" />
      <div aria-hidden className="absolute top-1/2 left-[6%] right-[6%] h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      <motion.img
        src={site.logo.mark}
        alt="4lancers mark"
        width={256}
        height={254}
        fetchPriority="high"
        className="absolute left-1/2 top-1/2 w-[46%] -translate-x-1/2 -translate-y-1/2 drop-shadow-[0_0_40px_color-mix(in_oklab,var(--color-primary)_45%,transparent)]"
        initial={{ scale: 0.6, opacity: 0, rotate: -45 }}
        animate={{ scale: 1, opacity: 1, rotate: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      />

      {services.map((s, i) => (
        <motion.a
          key={s.slug}
          href={s.href}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8 + i * 0.12, duration: 0.5 }}
          className={`absolute ${positions[i]} flex items-center gap-2 rounded-full border border-border-strong bg-surface/90 px-3 py-2 text-xs font-medium text-foreground shadow-card backdrop-blur transition-colors hover:border-primary hover:text-accent sm:px-4 sm:text-sm`}
        >
          <s.icon className="size-4 text-primary" aria-hidden />
          {s.shortName}
        </motion.a>
      ))}
    </div>
  )
}
