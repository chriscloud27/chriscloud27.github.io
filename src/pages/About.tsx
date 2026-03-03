import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Nav from '../components/Nav'
import Footer from '../components/Footer'

export default function About() {
  useEffect(() => {
    document.title = 'About — Christian Weber · AI-Native Cloud Architect'
  }, [])

  return (
    <>
      <Nav />
      <main style={{ paddingTop: 'var(--nav)' }}>
        <section style={{ padding: '80px 0 120px', minHeight: '80vh' }}>
          <div className="wrap">
            <div className="eyebrow">About</div>
            <h1>
              Christian Weber<br />
              <em>AI-Native Cloud Architect</em>
            </h1>
            <p className="hero-sub" style={{ marginTop: '24px' }}>
              I help <strong>Seed–Series C SaaS CTOs and engineering leaders</strong> build
              scalable SaaS infrastructure for growth-stage velocity.
            </p>
            <p style={{ fontSize: '15px', fontWeight: 300, lineHeight: 1.75, color: 'var(--g500)', maxWidth: '680px', marginBottom: '32px' }}>
              With 13+ years of experience designing enterprise cloud systems across AWS, Azure,
              and GCP, I specialise in cloud-agnostic, security-first platform foundations that
              give engineering teams clarity, speed, and cost predictability.
            </p>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <a
                href="https://calendly.com/chriscloud-weber/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-p"
              >
                Get in touch
              </a>
              <Link to="/#portfolio" className="btn btn-g">See My Work</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
