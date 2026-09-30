import { motion, useScroll, useSpring, useTransform, useVelocity } from 'motion/react'
import { Fragment } from 'react'

/** Transition band: words race across and skew with scroll velocity. */
export function SpeedingText({ words }: { words: string[] }) {
  const { scrollY } = useScroll()
  const velocity = useVelocity(scrollY)
  const smooth = useSpring(velocity, { damping: 50, stiffness: 300 })
  const skew = useTransform(smooth, [-2000, 0, 2000], [12, 0, -12], { clamp: true })

  const seq = [...words, ...words]
  return (
    <div className="relative overflow-hidden border-y border-border bg-surface/40 py-6 sm:py-8" aria-label={words.join(' • ')} role="img">
      <motion.div style={{ skewX: skew }} className="flex w-max animate-marquee items-center gap-8 will-change-transform">
        {[0, 1].map((k) => (
          <div key={k} className="flex items-center gap-8" aria-hidden>
            {seq.map((w, i) => (
              <Fragment key={i}>
                <span
                  className={
                    i % 2
                      ? 'font-display text-5xl font-bold tracking-tight text-transparent [-webkit-text-stroke:1.5px_var(--color-border-strong)] sm:text-7xl'
                      : 'font-display text-5xl font-bold tracking-tight text-foreground sm:text-7xl'
                  }
                >
                  {w}
                </span>
                <span className="size-3 rotate-45 bg-primary sm:size-4" />
              </Fragment>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  )
}
