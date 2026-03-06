import Image from 'next/image'

export default function HeroSection() {
  return (
    <section
      id="hero"
      style={{
        minHeight: '100vh',
        paddingTop: 'var(--nav)',
        background: 'var(--blue)',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {/* Subtle grid overlay */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          backgroundImage:
            'linear-gradient(rgba(0,229,255,.027) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,.027) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />
      {/* Cyan top accent line */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 'var(--nav)',
          left: 0,
          right: 0,
          height: '2px',
          background: 'linear-gradient(90deg, var(--cyan), rgba(0,229,255,0) 55%)',
        }}
      />

      <div className="wrap" style={{ position: 'relative', zIndex: 1, width: '100%' }}>
        <div className="hgrid">
          {/* Left: copy */}
          <div>
            <p className="eyebrow">AI-NATIVE CLOUD ARCHITECT</p>

            <h1>
              You survived early chaos. Now your architecture{' '}
              <em>is the chaos.</em>
            </h1>

            <p className="hero-sub">
              Series A and B SaaS companies move fast — until the foundation built to get
              there starts breaking under the weight of growth. I design AI-native cloud
              architectures that eliminate the technical debt compounding in your platform,
              so your engineering team ships faster instead of firefighting what already
              exists.
            </p>

            <p
              style={{
                fontFamily: 'var(--mono)',
                fontSize: '11px',
                letterSpacing: '.1em',
                textTransform: 'uppercase',
                color: 'var(--g500)',
                marginBottom: '40px',
              }}
            >
              Architectures built to survive growth — not to be replaced by it.
            </p>

            <div className="hero-btns">
              <a
                href="https://calendly.com/chriscloud-weber/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-p"
              >
                Diagnose Your Architecture
              </a>
              <a href="#how-it-works" className="btn btn-g">
                See How It Works
              </a>
            </div>
          </div>

          {/* Right: profile photo */}
          <div className="hphoto">
            <Image
              src="https://mach2.cloud/assets/img/Chris.png"
              alt="Christian Weber — AI-Native Cloud Architect"
              width={272}
              height={340}
              priority
              style={{
                width: '100%',
                height: 'auto',
                objectFit: 'cover',
                borderRadius: '6px',
                filter: 'grayscale(15%)',
              }}
            />
            <div className="pbadge">
              <span className="pb-l">Available</span>
              <span className="pb-v">Remote · US / EU</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
