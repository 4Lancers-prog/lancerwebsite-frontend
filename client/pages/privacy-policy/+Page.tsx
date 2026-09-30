import { seoPages } from '@/data/seo'
import { privacySections, LEGAL_UPDATED } from '@/data/legal'
import { Seo } from '@/components/seo/Seo'
import { LegalPage } from '@/components/sections/LegalPage'

export default function Page() {
  return (
    <>
      <Seo page={seoPages.privacy} breadcrumbs={[{ name: 'Privacy Policy', path: '/privacy-policy' }]} />
      <LegalPage
        title="Privacy Policy"
        path="/privacy-policy"
        updated={LEGAL_UPDATED}
        intro="Your trust matters. Here is exactly what we collect, why, and how we protect it."
        sections={privacySections}
      />
    </>
  )
}
