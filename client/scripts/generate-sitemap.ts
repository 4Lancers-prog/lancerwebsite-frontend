/**
 * Generates public/sitemap.xml and public/robots.txt from data/seo.ts.
 * Runs automatically before `npm run build`. Set PUBLIC_ENV__SITE_URL for your domain.
 */
import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { seoPages } from '../data/seo'

const SITE = (process.env.PUBLIC_ENV__SITE_URL || 'https://www.4lancers.com').replace(/\/$/, '')
const today = new Date().toISOString().slice(0, 10)
const pub = (f: string) => fileURLToPath(new URL(`../public/${f}`, import.meta.url))

const urls = Object.values(seoPages)
  .map(
    (p) => `  <url>
    <loc>${SITE}${p.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${'changefreq' in p ? p.changefreq : 'monthly'}</changefreq>
    <priority>${p.priority ?? 0.5}</priority>
  </url>`,
  )
  .join('\n')

writeFileSync(pub('sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`)
writeFileSync(pub('robots.txt'), `User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: ${SITE}/sitemap.xml\n`)
console.log(`✓ sitemap.xml (${Object.keys(seoPages).length} URLs) + robots.txt → ${SITE}`)
