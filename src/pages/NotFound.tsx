import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Nav from '../components/Nav'
import Footer from '../components/Footer'

export default function NotFound() {
  useEffect(() => {
    document.title = '404 — Page Not Found · MaCh2.cloud'
  }, [])

  return (
    <>
      <Nav />
      <main style={{ paddingTop: 'var(--nav)', minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
        <div className="wrap" style={{ textAlign: 'center', padding: '80px var(--pad)' }}>
          <span style={{ fontFamily: 'var(--mono)', fontSize: '11px', letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--cyan)', display: 'block', marginBottom: '24px' }}>
            404 — Not Found
          </span>
          <h1 style={{ marginBottom: '20px' }}>
            This page<br /><em>doesn't exist.</em>
          </h1>
          <p style={{ fontSize: '16px', fontWeight: 300, color: 'var(--g500)', marginBottom: '36px' }}>
            The page you're looking for has moved or never existed.
          </p>
          <Link to="/" className="btn btn-p">
            Back to Home
          </Link>
        </div>
      </main>
      <Footer />
    </>
  )
}
