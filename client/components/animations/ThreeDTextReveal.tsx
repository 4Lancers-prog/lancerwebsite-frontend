import { motion } from 'motion/react'
import { cn } from '@/lib/utils'

/**
 * 3D headline reveal. Renders a real <h1> (SEO-safe) whose words flip up in 3D.
 * `highlight` = index of the line to render with the brand gradient.
 */
export function ThreeDTextReveal({ lines, highlight, className }: { lines: string[]; highlight?: number; className?: string }) {
  let wordIndex = 0
  return (
    <h1 className={cn('[perspective:900px]', className)}>
      {lines.map((line, li) => (
        <span key={li} className="block">
          {line.split(' ').map((word, wi) => {
            const i = wordIndex++
            return (
              <span key={wi} className="inline-block [transform-style:preserve-3d]">
                <motion.span
                  className={cn('inline-block origin-[50%_100%_-0.4em]', li === highlight && 'text-gradient')}
                  initial={{ rotateX: -95, opacity: 0, y: '0.3em' }}
                  animate={{ rotateX: 0, opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, delay: 0.15 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                >
                  {word}
                </motion.span>
                {' '}
              </span>
            )
          })}
        </span>
      ))}
    </h1>
  )
}
