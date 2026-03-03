import Link from 'next/link'
import { getTranslations, getLocale } from 'next-intl/server'

export default async function Footer() {
  const t = await getTranslations('footer')
  const locale = await getLocale()

  return (
    <footer>
      <div className="wrap">
        <div className="foot-inner">
          <span className="foot-logo">MaCh2.cloud</span>
          <span className="foot-copy">
            © {new Date().getFullYear()} {t('copy')}
          </span>
          <ul className="foot-links">
            <li>
              <a
                href="https://www.linkedin.com/in/christian-weber-0591/"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
            </li>
            <li>
              <a
                href="https://github.com/chriscloud27"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            </li>
            <li>
              <Link href={`/${locale}/blog`}>Blog</Link>
            </li>
            <li>
              <a
                href="https://calendly.com/chriscloud-weber/30min"
                target="_blank"
                rel="noopener noreferrer"
              >
                Calendly
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
