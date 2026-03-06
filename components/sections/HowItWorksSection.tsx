const steps = [
  {
    number: '01',
    name: 'Audit',
    description:
      'We map your current architecture, identify risk areas, and produce a prioritized improvement roadmap with clear next steps.',
  },
  {
    number: '02',
    name: 'Blueprint',
    description:
      'We design the target architecture — scalable, cost-efficient, and precisely aligned with your growth stage and product direction.',
  },
  {
    number: '03',
    name: 'Enablement',
    description:
      'We guide your engineering team through implementation with hands-on architectural support and decision frameworks.',
  },
  {
    number: '04',
    name: 'Fractional',
    description:
      'Ongoing architectural leadership ensures your platform evolves with the business — without the cost of a full-time hire.',
  },
]

export default function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      style={{ background: '#fff', padding: '120px 0', position: 'relative' }}
    >
      <div className="wrap">
        {/* Section header */}
        <div style={{ maxWidth: '560px', marginBottom: '80px' }}>
          <p className="eyebrow" style={{ color: 'var(--cyan)' }}>
            Process
          </p>
          <h2 style={{ color: 'var(--blue)', marginBottom: 0 }}>
            From chaos to{' '}
            <em style={{ color: 'var(--cyan)', fontStyle: 'italic' }}>clarity</em>
          </h2>
        </div>

        {/* Desktop: horizontal step flow | Mobile: vertical */}
        <div className="hiw-steps">
          {steps.map((step, idx) => (
            <div key={step.number} className="hiw-step">
              {/* Connector line (not shown on last step) */}
              {idx < steps.length - 1 && (
                <div className="hiw-connector" aria-hidden="true" />
              )}

              {/* Step number circle */}
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  background: idx % 2 === 0 ? 'var(--cyan)' : 'transparent',
                  border: idx % 2 === 0 ? 'none' : '1.5px solid var(--cyan)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'var(--mono)',
                  fontSize: '13px',
                  fontWeight: 500,
                  color: idx % 2 === 0 ? 'var(--blue)' : 'var(--cyan)',
                  flexShrink: 0,
                  marginBottom: '20px',
                }}
              >
                {step.number}
              </div>

              <h3
                style={{
                  fontFamily: 'var(--body)',
                  fontSize: '16px',
                  fontWeight: 600,
                  color: 'var(--blue)',
                  marginBottom: '10px',
                  lineHeight: 1.2,
                }}
              >
                {step.name}
              </h3>
              <p
                style={{
                  fontSize: '13.5px',
                  fontWeight: 300,
                  lineHeight: 1.72,
                  color: '#4a5a72',
                  margin: 0,
                }}
              >
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <style>{`
          .hiw-steps {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 0;
            position: relative;
          }
          .hiw-steps::before {
            content: '';
            position: absolute;
            top: 24px;
            left: calc(48px / 2);
            right: calc(48px / 2);
            height: 1px;
            background: linear-gradient(90deg, var(--cyan), rgba(0,229,255,.2));
            z-index: 0;
          }
          .hiw-step {
            position: relative;
            z-index: 1;
            padding: 0 24px 0 0;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
          }
          @media (max-width: 768px) {
            .hiw-steps {
              grid-template-columns: 1fr;
              gap: 0;
            }
            .hiw-steps::before {
              top: 24px;
              left: 24px;
              right: auto;
              width: 1px;
              height: calc(100% - 48px);
              background: linear-gradient(180deg, var(--cyan), rgba(0,229,255,.1));
            }
            .hiw-step {
              flex-direction: row;
              align-items: flex-start;
              gap: 20px;
              padding: 0 0 40px 0;
            }
            .hiw-step > div:first-child {
              margin-bottom: 0 !important;
              flex-shrink: 0;
            }
          }
        `}</style>
      </div>
    </section>
  )
}
