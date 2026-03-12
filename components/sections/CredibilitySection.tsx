import StatsGrid from '@/components/sections/StatsGrid'

export default function CredibilitySection() {
  return (
    <section id="credibility" className="bg-deep-blue py-[120px] relative">
      {/* brand: cyan top divider line */}
      <div aria-hidden="true" className="s-top" />

      <div className="wrap">
        {/* Stats grid */}
        <StatsGrid />
      </div>
    </section>
  )
}
