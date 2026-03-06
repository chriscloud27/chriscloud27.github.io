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
    <section
      id="problem"
      style={{ background: '#fff', padding: '120px 0', position: 'relative' }}
    >
      <div className="s-top" style={{ background: 'linear-gradient(90deg, transparent, rgba(0,229,255,.1), transparent)' }} />
      <div className="wrap">
        {/* Section title */}
        <div style={{ maxWidth: '600px', marginBottom: '72px' }}>
          <p className="eyebrow" style={{ color: 'var(--cyan)' }}>
            The problem
          </p>
          <h2 style={{ color: 'var(--blue)', marginBottom: '0' }}>
            What happens when architecture{' '}
            <em style={{ color: 'var(--cyan)', fontStyle: 'italic' }}>
              can&apos;t keep up
            </em>
          </h2>
        </div>

        {/* Pain point cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2px',
          }}
        >
          {painPoints.map((point) => (
            <div
              key={point.number}
              style={{
                background: '#fff',
                border: '1px solid rgba(11,31,58,.08)',
                borderRadius: '8px',
                padding: '40px 32px',
                borderTop: '3px solid var(--cyan)',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--mono)',
                  fontSize: '11px',
                  letterSpacing: '.12em',
                  color: 'var(--cyan)',
                  display: 'block',
                  marginBottom: '20px',
                }}
              >
                {point.number}
              </span>
              <h3
                style={{
                  fontFamily: 'var(--body)',
                  fontSize: '18px',
                  fontWeight: 600,
                  color: 'var(--blue)',
                  lineHeight: 1.3,
                  marginBottom: '16px',
                }}
              >
                {point.headline}
              </h3>
              <p
                style={{
                  fontSize: '14px',
                  fontWeight: 300,
                  lineHeight: 1.75,
                  color: '#4a5a72',
                  margin: 0,
                }}
              >
                {point.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
