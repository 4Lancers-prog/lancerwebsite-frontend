import { motion, useMotionValue, useSpring } from 'motion/react'
import type { ReactNode, PointerEvent } from 'react'
import { useFinePointer } from '@/lib/useMedia'

/** Wrap any CTA to give it a gentle magnetic pull on desktop. */
export function MagneticButton({ children, strength = 0.3 }: { children: ReactNode; strength?: number }) {
  const fine = useFinePointer()
  const x = useSpring(useMotionValue(0), { stiffness: 250, damping: 18 })
  const y = useSpring(useMotionValue(0), { stiffness: 250, damping: 18 })
  const move = (e: PointerEvent<HTMLDivElement>) => {
    if (!fine) return
    const r = e.currentTarget.getBoundingClientRect()
    x.set((e.clientX - r.left - r.width / 2) * strength)
    y.set((e.clientY - r.top - r.height / 2) * strength)
  }
  return (
    <motion.div
      className="inline-block"
      style={{ x, y }}
      onPointerMove={move}
      onPointerLeave={() => {
        x.set(0)
        y.set(0)
      }}
    >
      {children}
    </motion.div>
  )
}
