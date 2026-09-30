import { seoPages } from '@/data/seo'
import { speedingWords } from '@/data/home'
import { Seo } from '@/components/seo/Seo'
import { HeroSection, ServicesSection, ProblemSolutionSection, WhyUsSection, SelectedWorkSection } from '@/components/sections/HomeSections'
import { SpeedingText } from '@/components/animations/SpeedingText'
import { CtaSection } from '@/components/sections/CtaSection'

/** Homepage — 7 sections per blueprint: Header → Hero → Services → Problem/Solution → Why → Work → CTA + Footer */
export default function Page() {
  return (
    <>
      <Seo page={seoPages.home} />
      <HeroSection />
      <SpeedingText words={speedingWords} />
      <ServicesSection />
      <ProblemSolutionSection />
      <WhyUsSection />
      <SelectedWorkSection />
      <CtaSection />
    </>
  )
}
