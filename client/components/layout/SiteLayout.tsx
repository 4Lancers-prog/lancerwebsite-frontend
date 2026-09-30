import type { ReactNode } from 'react'
import { MotionConfig } from 'motion/react'
import { Toaster } from 'sonner'
import { Header } from './Header'
import { Footer } from './Footer'
import { CustomCursor } from '@/components/animations/CustomCursor'

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <div className="relative flex min-h-dvh flex-col overflow-x-clip">
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </div>
      <CustomCursor />
      <Toaster theme="dark" position="bottom-right" richColors closeButton />
    </MotionConfig>
  )
}
