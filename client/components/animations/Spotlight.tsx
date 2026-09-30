import { motion } from 'motion/react'
import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

/** Soft brand-coloured ambient light used behind hero / CTA sections. */
export function Spotlight({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)}>
      <div className="absolute -top-40 left-1/2 h-[36rem] w-[60rem] -translate-x-1/2 rounded-full bg-primary/20 blur-[120px]" />
      <div className="absolute top-16 -right-24 h-72 w-72 rounded-full bg-accent/10 blur-[100px] animate-pulse-soft" />
    </div>
  )
}

/** Clip-path reveal for images / visual panels. */
export function ImageReveal({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      className={cn('overflow-hidden', className)}
      initial={{ clipPath: 'inset(12% 12% 12% 12% round 24px)', opacity: 0 }}
      whileInView={{ clipPath: 'inset(0% 0% 0% 0% round 20px)', opacity: 1 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
