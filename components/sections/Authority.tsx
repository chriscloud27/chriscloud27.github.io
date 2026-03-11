import { getTranslations } from 'next-intl/server'

const ACHIEVEMENTS = [
  {
    icon: (
      <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" className="logo-icon ms-logo">
        <rect width="40" height="40" fill="white" rx="3" />
        <g transform="translate(6, 8)">
          <rect x="0" y="0" width="6" height="6" fill="#05a6f0" />
          <rect x="10" y="0" width="6" height="6" fill="#7fba00" />
          <rect x="0" y="10" width="6" height="6" fill="#f25022" />
          <rect x="10" y="10" width="6" height="6" fill="#ffb900" />
        </g>
      </svg>
    ),
    titleKey: 'Published with Microsoft',
    desc: 'Executive architecture guidance on scalable Kubernetes and microservice platforms (Microsoft + Capgemini)',
    btnLabelKey: 'downloadWhitepaper' as const,
    btnHref:
      'https://prod.ucwe.capgemini.com/de-de/wp-content/uploads/sites/8/2023/11/function-apps-versus-kubernetes.pdf',
  },
  {
    icon: (
      <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" className="logo-icon aws-logo">
        <rect width="40" height="40" fill="white" rx="3" />
        <g transform="translate(4, 10)">
          <text x="0" y="10" fontFamily="Arial, sans-serif" fontSize="8" fontWeight="bold" fill="#232f3e">
            aws
          </text>
          <path
            d="M 0 14 Q 8 16 16 14"
            stroke="#ff9900"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
        </g>
      </svg>
    ),
    titleKey: 'AWS Global Partner Award',
    desc: (
      <>
        Contributed to award-winning cloud platform for autonomous driving (
        <strong>1,700 developers</strong>)
      </>
    ),
  },
  {
    icon: '📊',
    titleKey: 'Enterprise platform rollout',
    desc: (
      <>
        Improved sales efficiency <strong>40%</strong> through platform optimization and
        international rollout
      </>
    ),
  },
  {
    icon: '🌐',
    titleKey: 'Global engineering platforms',
    desc: (
      <>
        Led architecture for Azure platforms supporting <strong>2,500+ developers</strong>
      </>
    ),
  },
  {
    icon: '⚡',
    titleKey: 'Backend as a Service platform rollout',
    desc: 'Led AWS Amplify architecture and rollout, accelerating time-to-market for Seed Startup and improving developer experience',
  },
  {
    icon: '📐',
    titleKey: 'WAF++ — Open Framework Contributor',
    desc: (
      <>
        WAF++ participant and contributor — applying the open-source seven-pillar framework for{' '}
        <strong>sovereign, vendor-neutral cloud architecture</strong> across every engagement.
      </>
    ),
  },
]

export default async function Authority() {
  const t = await getTranslations('authority')

  return (
    <section id="authority">
      <div className="s-top" />
      <div className="wrap">
        <div className="auth-top reveal">
          <h2>
            Proven Architecture at <em>Enterprise Scale</em>
          </h2>
          <p className="auth-subtitle">
            My work has enabled platforms supporting thousands of engineers, mission-critical
            workloads, and globally distributed systems.
          </p>
        </div>

        <div className="achievements">
          {ACHIEVEMENTS.map((a, i) => (
            <div key={i} className="achievement reveal">
              <span className="ach-icon">{typeof a.icon === 'string' ? a.icon : a.icon}</span>
              <div className="ach-title">{a.titleKey}</div>
              <p className="ach-desc">{a.desc}</p>
              {a.btnLabelKey && a.btnHref && (
                <a
                  href={a.btnHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ach-btn"
                >
                  {t(a.btnLabelKey)}
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
