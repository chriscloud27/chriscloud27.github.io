const stats = [
  {
    value: '13+',
    label: 'Years designing and operating enterprise and SaaS cloud systems',
  },
  {
    value: '1,000s',
    label: 'Architectures supporting thousands of engineers on global platforms',
  },
  {
    value: '90%',
    label: 'Operational automation achieved on prior production platforms',
  },
  {
    value: 'Multi',
    label: 'Cloud architecture excellence awards across industry programs',
  },
]

export default function CredibilitySection() {
  return (
    <section
      id="credibility"
      style={{ background: 'var(--blue)', padding: '120px 0', position: 'relative' }}
    >
      <div className="s-top" />
      <div className="wrap">
        {/* Section header */}
        <div style={{ textAlign: 'center', maxWidth: '560px', margin: '0 auto 80px' }}>
          <p className="eyebrow" style={{ justifyContent: 'center' }}>
            Credibility
          </p>
          <h2>
            Built on real systems.{' '}
            <em>Real scale.</em>
          </h2>
        </div>

        {/* Stats grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            borderTop: '1px solid rgba(255,255,255,.07)',
          }}
        >
          {stats.map((stat, idx) => (
            <div
              key={idx}
              style={{
                padding: '48px 32px',
                borderRight: '1px solid rgba(255,255,255,.07)',
                borderBottom: '1px solid rgba(255,255,255,.07)',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--serif)',
                  fontSize: 'clamp(40px, 5vw, 56px)',
                  color: 'var(--cyan)',
                  display: 'block',
                  lineHeight: 1,
                  marginBottom: '16px',
                }}
              >
                {stat.value}
              </span>
              <p
                style={{
                  fontFamily: 'var(--mono)',
                  fontSize: '11px',
                  fontWeight: 300,
                  lineHeight: 1.65,
                  letterSpacing: '.04em',
                  color: 'var(--g500)',
                  margin: 0,
                }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Authority note */}
        <p
          style={{
            fontFamily: 'var(--mono)',
            fontSize: '11px',
            letterSpacing: '.08em',
            textTransform: 'uppercase',
            color: 'var(--g700)',
            textAlign: 'center',
            marginTop: '48px',
          }}
        >
          Authority grounded in real systems. Real scale. Real responsibility.
        </p>
      </div>
    </section>
  )
}
