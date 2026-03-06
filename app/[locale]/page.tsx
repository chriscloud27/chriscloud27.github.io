import HeroSection from '@/components/sections/HeroSection'
import ProblemSection from '@/components/sections/ProblemSection'
import ServicesSection from '@/components/sections/ServicesSection'
import HowItWorksSection from '@/components/sections/HowItWorksSection'
import CredibilitySection from '@/components/sections/CredibilitySection'
import CtaSection from '@/components/sections/CtaSection'

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <ProblemSection />
      <ServicesSection />
      <HowItWorksSection />
      <CredibilitySection />
      <CtaSection />
    </main>
  )
}
