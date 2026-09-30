import type { ReactNode } from 'react'
import '@/styles/global.css'
import { SiteLayout } from '@/components/layout/SiteLayout'

export default function Layout({ children }: { children: ReactNode }) {
  return <SiteLayout>{children}</SiteLayout>
}
