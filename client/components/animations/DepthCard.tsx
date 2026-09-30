import { motion, useMotionTemplate, useMotionValue, useSpring } from 'motion/react'
import type { ReactNode, PointerEvent } from 'react'
import { useFinePointer } from '@/lib/useMedia'
import { cn } from '@/lib/utils'

/**
 * Subtle 3D perspective tilt + cursor spotlight.
 * Automatically becomes a flat card on touch devices / reduced motion.
 */
export function DepthCard({ children, className, intensity = 8 }: { children: ReactNode; className?: string; intensity?: number }) {
  const fine = useFinePointer()
  const rx = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 })
  const ry = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 })
  const mx = useMotionValue(50)
  const my = useMotionValue(50)
  const spotlight = useMotionTemplate`radial-gradient(420px circle at ${mx}% ${my}%, color-mix(in oklab, var(--color-primary) 22%, transparent), transparent 60%)`

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!fine) return
    const r = e.currentTarget.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width
    const py = (e.clientY - r.top) / r.height
    ry.set((px - 0.5) * intensity * 2)
    rx.set(-(py - 0.5) * intensity * 2)
    mx.set(px * 100)
    my.set(py * 100)
  }
  const reset = () => {
    rx.set(0)
    ry.set(0)
  }

  return (
    <div className="[perspective:1200px] h-full">
      <motion.div
        onPointerMove={onMove}
        onPointerLeave={reset}
        style={fine ? { rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d' } : undefined}
        className={cn(
          'group relative h-full overflow-hidden rounded-card border border-border bg-surface/70 shadow-card transition-colors duration-300 hover:border-primary/50',
          className,
        )}
      >
        {fine && (
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{ background: spotlight }}
          />
        )}
        <div className="relative h-full">{children}</div>
      </motion.div>
    </div>
  )
}
