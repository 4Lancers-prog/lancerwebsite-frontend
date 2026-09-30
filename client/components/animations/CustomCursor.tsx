import { motion, useMotionValue, useSpring } from 'motion/react'
import { useEffect, useState } from 'react'
import { useFinePointer } from '@/lib/useMedia'

/**
 * Global enhanced cursor: precise dot + trailing diamond ring that grows over
 * interactive elements. Only mounts on fine pointers without reduced motion.
 */
export function CustomCursor() {
  const enabled = useFinePointer()
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const rx = useSpring(x, { stiffness: 350, damping: 30, mass: 0.5 })
  const ry = useSpring(y, { stiffness: 350, damping: 30, mass: 0.5 })
  const [hover, setHover] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!enabled) return
    document.documentElement.classList.add('has-custom-cursor')
    const move = (e: PointerEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      setVisible(true)
      const t = e.target as HTMLElement | null
      setHover(!!t?.closest('a, button, [role="button"], summary, label, input[type="range"]'))
    }
    const leave = () => setVisible(false)
    window.addEventListener('pointermove', move, { passive: true })
    document.addEventListener('pointerleave', leave)
    return () => {
      document.documentElement.classList.remove('has-custom-cursor')
      window.removeEventListener('pointermove', move)
      document.removeEventListener('pointerleave', leave)
    }
  }, [enabled, x, y])

  if (!enabled) return null
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[100]" style={{ opacity: visible ? 1 : 0 }}>
      <motion.div
        className="absolute left-0 top-0 rotate-45 border border-accent/70 transition-[width,height,background-color] duration-200"
        style={{
          x: rx,
          y: ry,
          translateX: '-50%',
          translateY: '-50%',
          width: hover ? 44 : 26,
          height: hover ? 44 : 26,
          backgroundColor: hover ? 'color-mix(in oklab, var(--color-primary) 18%, transparent)' : 'transparent',
        }}
      />
      <motion.div className="absolute left-0 top-0 size-1.5 rounded-full bg-foreground" style={{ x, y, translateX: '-50%', translateY: '-50%' }} />
    </div>
  )
}
