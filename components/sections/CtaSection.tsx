export default function CtaSection() {
  return (
    <section
      id="cta"
      style={{
        background: 'var(--blue)',
        padding: '120px 0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle grid */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          backgroundImage:
            'linear-gradient(rgba(0,229,255,.022) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,.022) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />
      <div className="s-top" />

      <div className="wrap" style={{ position: 'relative', zIndex: 1 }}>
        <div
          style={{
            maxWidth: '600px',
            margin: '0 auto',
            textAlign: 'center',
          }}
        >
          <h2 style={{ marginBottom: '20px' }}>
            Your platform should{' '}
            <em>accelerate growth.</em>
          </h2>
          <p
            style={{
              fontSize: '16px',
              fontWeight: 300,
              lineHeight: 1.75,
              color: 'var(--g500)',
              marginBottom: '40px',
            }}
          >
            Start with an architecture audit — clarity before commitment.
          </p>
          <a
            href="https://calendly.com/chriscloud-weber/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-p"
          >
            Diagnose Your Architecture
          </a>
        </div>
      </div>
    </section>
  )
}
