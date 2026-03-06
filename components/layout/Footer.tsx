import Link from 'next/link'
import { getLocale } from 'next-intl/server'

export default async function Footer() {
  const locale = await getLocale()

  function localeHref(path: string) {
    return `/${locale}${path === '/' ? '' : path}`
  }

  return (
    <footer style={{ background: 'var(--blue)', borderTop: '1px solid rgba(0,229,255,.08)' }}>
      <div className="wrap">
        <div className="foot-inner">
          <Link href={localeHref('/')} className="foot-logo">
            MaCh2<span style={{ color: 'var(--cyan)' }}>Cloud</span>
          </Link>

          <span
            style={{
              fontFamily: 'var(--mono)',
              fontSize: '10px',
              letterSpacing: '.1em',
              textTransform: 'uppercase',
              color: 'var(--g700)',
            }}
          >
            AI-Native Cloud Architecture
          </span>

          <ul className="foot-links">
            <li><a href={localeHref('/#services')}>Services</a></li>
            <li><a href={localeHref('/#how-it-works')}>How It Works</a></li>
            <li><Link href={localeHref('/about')}>About</Link></li>
            <li><a href={localeHref('/#connect')}>Contact</a></li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
