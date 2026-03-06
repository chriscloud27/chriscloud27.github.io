export default function CoreValues() {
  const values = [
    {
      title: 'Intelligent',
      description:
        'We think systematically about tradeoffs. Every architecture decision is reasoned, documented, and optimized for your specific constraints — not generic best practices.'
    },
    {
      title: 'Sovereign',
      description:
        'Your infrastructure serves your business, not vice versa. We design cloud-agnostic architectures that give you optionality and prevent lock-in to single vendors.'
    },
    {
      title: 'Trustworthy',
      description:
        'Security and compliance are non-negotiable. We architect with defense-in-depth, audit trails, and zero-trust principles built in from day one.'
    },
    {
      title: 'Platform',
      description:
        'Great infrastructure enables product velocity. We build platforms that scale with your team, not against it — enabling engineers to move faster and ship with confidence.'
    },
    {
      title: 'Speed',
      description:
        'Slow infrastructure kills startups. We deliver rapid time-to-market without cutting corners on reliability, security, or long-term scalability.'
    }
  ]

  return (
    <section style={{ padding: '80px 0 120px', background: 'var(--blue-mid)' }}>
      <div className="wrap">
        <h2 style={{ marginBottom: '20px' }}>
          Built to <em>accelerate</em>
          <br />
          what matters.
        </h2>
        <p
          style={{
            fontSize: '15px',
            fontWeight: 300,
            lineHeight: 1.75,
            color: 'var(--g500)',
            maxWidth: '680px',
            marginBottom: '60px'
          }}
        >
          MaCh2.Cloud embodies five core values that guide every architectural decision and partnership. These principles define who we are and how we deliver impact.
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '3px'
          }}
        >
          {values.map((value) => (
            <div
              key={value.title}
              className="reveal value-card"
              style={{
                background: 'rgba(255,255,255,.02)',
                border: '1px solid rgba(255,255,255,.06)',
                borderTop: '3px solid var(--cyan)',
                borderRadius: '8px',
                padding: '32px 24px',
                transition: 'border-color .25s, transform .2s'
              }}
            >
              <h3
                style={{
                  fontSize: '24px',
                  fontFamily: 'var(--serif)',
                  color: 'var(--white)',
                  marginBottom: '16px',
                  fontWeight: 400
                }}
              >
                {value.title}
              </h3>
              <p
                style={{
                  fontSize: '14px',
                  fontWeight: 300,
                  lineHeight: 1.72,
                  color: 'var(--g500)',
                  margin: 0
                }}
              >
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
