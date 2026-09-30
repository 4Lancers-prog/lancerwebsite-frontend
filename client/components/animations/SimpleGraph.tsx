import { motion } from 'motion/react'

/**
 * Conceptual Understand → Build → Grow curve. Intentionally has NO numbers:
 * it illustrates the approach, not a business statistic.
 */
export function SimpleGraph({ labels }: { labels: [string, string, string] }) {
  const points = [
    { x: 60, y: 210 },
    { x: 300, y: 150 },
    { x: 540, y: 50 },
  ]
  return (
    <svg viewBox="0 0 600 260" className="h-auto w-full" role="img" aria-label={`${labels.join(', then ')} — conceptual illustration`}>
      <defs>
        <linearGradient id="g-line" x1="0" x2="1">
          <stop offset="0" stopColor="var(--color-primary)" />
          <stop offset="1" stopColor="var(--color-accent)" />
        </linearGradient>
        <linearGradient id="g-area" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--color-primary)" stopOpacity="0.35" />
          <stop offset="1" stopColor="var(--color-primary)" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[60, 110, 160, 210].map((y) => (
        <line key={y} x1="30" x2="570" y1={y} y2={y} stroke="var(--color-border)" strokeDasharray="4 6" />
      ))}
      <motion.path
        d="M60 210 C 170 205, 220 160, 300 150 S 450 90, 540 50 L540 240 L60 240 Z"
        fill="url(#g-area)"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.8 }}
      />
      <motion.path
        d="M60 210 C 170 205, 220 160, 300 150 S 450 90, 540 50"
        fill="none"
        stroke="url(#g-line)"
        strokeWidth="3.5"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
      />
      {points.map((p, i) => (
        <motion.g
          key={i}
          initial={{ opacity: 0, scale: 0.4 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 + i * 0.5, type: 'spring', stiffness: 260, damping: 18 }}
          style={{ transformOrigin: `${p.x}px ${p.y}px` }}
        >
          <rect x={p.x - 9} y={p.y - 9} width="18" height="18" transform={`rotate(45 ${p.x} ${p.y})`} fill="var(--color-background)" stroke="var(--color-accent)" strokeWidth="2.5" />
          <text x={p.x} y={p.y - 22} textAnchor="middle" fill="var(--color-foreground)" fontSize="17" fontFamily="var(--font-display)" fontWeight="600">
            {labels[i]}
          </text>
        </motion.g>
      ))}
    </svg>
  )
}
