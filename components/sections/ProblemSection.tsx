const painPoints = [
  {
    number: '01',
    headline: '"We\'re firefighting instead of building."',
    body:
      'Engineering cycles that should go toward product are consumed by maintenance, incidents, and platform fragility. Every sprint, the same recurring issues. The backlog grows — and the team never catches up.',
  },
  {
    number: '02',
    headline: 'Cloud costs growing faster than revenue.',
    body:
      'The bill arrives and no one can explain where it went. Infrastructure decisions made under delivery pressure are now running at full cost — with no visibility, no unit economics, and no model to control it.',
  },
  {
    number: '03',
    headline: 'AI that works in staging but breaks under production load.',
    body:
      'The demo runs clean. Production is a different story. Fragile integrations, latency spikes, and silent failures compound under real traffic. The gap between prototype and production-grade never closes.',
  },
]

export default function ProblemSection() {
  return (
    <section id="problem" className="bg-deep-blue py-[120px] relative">
      {/* brand: cyan top divider line */}
      <div aria-hidden="true" className="s-top" />

      <div className="wrap">
        {/* Section header */}
        <div className="max-w-[600px] mb-[72px]">
          <p className="eyebrow" style={{ color: 'var(--cyan)' }}>The problem</p>
          <h2 className="text-white mb-0">
            What happens when architecture{' '}
            <em className="text-electric-cyan italic">can&apos;t keep up</em>
          </h2>
        </div>

        {/* Pain point cards — reuse portfolio compact card style */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[2px]">
          {painPoints.map((point) => (
            <div
              key={point.number}
              className="case-compact overflow-visible"
            >
              <div className="case-compact-hd">
                <span className="case-num">{point.number}</span>
              </div>
              <h3 className="case-compact-title !leading-[1.4]">{point.headline}</h3>
              <p className="col-txt m-0">{point.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
