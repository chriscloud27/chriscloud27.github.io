const services = [
  {
    name: 'Architecture Audit',
    purpose: 'Establish architectural clarity and identify risks, inefficiencies, and scaling constraints.',
    outcomes: [
      'Clear understanding of current platform architecture',
      'Identification of scalability, reliability, and cost risks',
      'Prioritized roadmap for architectural evolution',
    ],
  },
  {
    name: 'Architecture Blueprint',
    purpose: 'Design a scalable, production-ready platform architecture aligned with product and business growth.',
    outcomes: [
      'Clear and scalable Cloud and platform architecture',
      'Architecture optimized for reliability, scalability, and cost efficiency',
      'Engineering teams enabled to implement with confidence',
    ],
  },
  {
    name: 'Enablement & Guidance',
    purpose: 'Enable engineering teams to build, operate, and evolve platform architecture correctly.',
    outcomes: [
      'Faster and safer infrastructure and platform implementation',
      'Reduced architectural risk during scaling phases',
      'Engineering teams enabled to operate independently',
    ],
  },
  {
    name: 'Fractional Architect',
    purpose: 'Continuous architectural leadership and platform evolution support without a full-time hire.',
    outcomes: [
      'Architectural leadership aligned with business and product strategy',
      'Scalable and continuously evolving platform architecture',
      'Engineering teams supported with architectural clarity',
    ],
  },
]

export default function ServicesSection() {
  return (
    <section
      id="services"
      style={{ background: 'var(--blue)', padding: '120px 0', position: 'relative' }}
    >
      <div className="s-top" />
      <div className="wrap">
        {/* Section header */}
        <div style={{ maxWidth: '560px', marginBottom: '72px' }}>
          <p className="eyebrow">Services</p>
          <h2>How I work with you</h2>
        </div>

        {/* Service cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '2px',
          }}
        >
          {services.map((service, idx) => (
            <div
              key={service.name}
              style={{
                background: 'rgba(255,255,255,.03)',
                border: '1px solid rgba(255,255,255,.07)',
                borderRadius: '8px',
                padding: '36px 28px',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
              }}
            >
              {/* Index */}
              <span
                style={{
                  fontFamily: 'var(--mono)',
                  fontSize: '11px',
                  letterSpacing: '.12em',
                  color: 'var(--cyan)',
                }}
              >
                0{idx + 1}
              </span>

              {/* Name */}
              <h3
                style={{
                  fontFamily: 'var(--body)',
                  fontSize: '17px',
                  fontWeight: 600,
                  color: '#fff',
                  lineHeight: 1.3,
                  margin: 0,
                }}
              >
                {service.name}
              </h3>

              {/* Purpose */}
              <p
                style={{
                  fontSize: '13.5px',
                  fontWeight: 300,
                  lineHeight: 1.7,
                  color: 'var(--g500)',
                  margin: 0,
                  borderBottom: '1px solid rgba(255,255,255,.06)',
                  paddingBottom: '20px',
                }}
              >
                {service.purpose}
              </p>

              {/* Outcomes */}
              <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {service.outcomes.map((outcome) => (
                  <li
                    key={outcome}
                    style={{
                      fontSize: '13px',
                      fontWeight: 300,
                      lineHeight: 1.6,
                      color: 'var(--g300)',
                      paddingLeft: '16px',
                      position: 'relative',
                    }}
                  >
                    <span
                      aria-hidden="true"
                      style={{
                        position: 'absolute',
                        left: 0,
                        top: '6px',
                        width: '5px',
                        height: '5px',
                        borderRadius: '50%',
                        background: 'var(--cyan)',
                        display: 'block',
                        flexShrink: 0,
                      }}
                    />
                    {outcome}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
