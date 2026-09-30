import vikeReact from 'vike-react/config'
import type { Config } from 'vike/types'

export default {
  server: true,
  extends: [vikeReact],
  // Static-site generation: every route is pre-rendered to HTML at build time.
  prerender: true,
  lang: 'en',
  favicon: '/favicon.png',
  title: '4lancers',
  description: 'AI automation, custom software, websites and applications built around your business.',
} satisfies Config
