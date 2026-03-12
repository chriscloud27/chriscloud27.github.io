import { getTranslations, getLocale } from 'next-intl/server'

interface CaseStudy {
  num: string
  title: string
  client: string
  slug: string
  situation: string
  outcome: string
  metric: string
  tags: string[]
}

const CASES: CaseStudy[] = [
  {
    num: 'Case 01',
    title: 'Cloud Infrastructure Powering Enterprise Development at Scale',
    client: 'Capgemini × Microsoft',
    slug: 'case-01-capgemini-kubernetes',
    situation:
      'Global engineering organisation needed a unified Kubernetes platform supporting thousands of developers across distributed teams — without operational bottlenecks or sacrificing security and governance at scale.',
    outcome:
      'Platform scaled to <strong>2,500 developers</strong>. Provisioning friction eliminated. Architecture guidance published externally as the enterprise reference model for Kubernetes platform design at scale.',
    metric: '✓ Zero provisioning bottlenecks<br/>✓ Published reference model',
    tags: ['Azure Kubernetes', 'Multi-Tenancy', 'Platform Engineering'],
  },
  {
    num: 'Case 02',
    title: 'Award-Winning Cloud Platform — Autonomous Driving',
    client: 'AWS · Automotive',
    slug: 'case-02-aws-autonomous-driving',
    situation:
      'Autonomous vehicle development demands extreme data volumes, processing speed, and strict compliance across 1,700 engineers in distributed teams — without slowing development velocity.',
    outcome:
      'Platform enabled <strong>1,700 engineers</strong> with no delivery bottlenecks. Recognised with the <strong>AWS Global Partner Award</strong> for outstanding cloud platform delivery.',
    metric: '✓ 10,000+ GPU hours/month<br/>✓ AWS Partner Award',
    tags: ['AWS', 'Data Pipelines', 'Reliability Engineering'],
  },
  {
    num: 'Case 03',
    title: 'Platform Optimisation — 40% Sales Efficiency Improvement',
    client: 'Enterprise SaaS',
    slug: 'case-03-enterprise-saas-optimization',
    situation:
      'SaaS company experiencing declining sales efficiency due to platform performance issues and operational complexity. International rollout stalling. Cloud cost growing faster than revenue with no clear cost model.',
    outcome:
      'Sales efficiency improved following optimisation and international rollout. Cloud cost aligned to revenue. Engineering team unblocked for continued product development.',
    metric:
      '<strong style="color:var(--cyan)">+40% Sales Efficiency</strong><br/><strong style="color:var(--cyan)">-30% Cloud Cost</strong><br/>✓ Multi-region enabled',
    tags: ['Architecture Audit', 'Cost Optimisation', 'International Rollout'],
  },
  {
    num: 'Case 04',
    title: 'BaaS Platform — Seed Startup to Production',
    client: 'Seed Stage SaaS',
    slug: 'case-04-baas-seed-startup',
    situation:
      'Seed-stage SaaS startup needed to move prototype to production-grade backend infrastructure fast — 5-engineer team, no budget for over-engineering, but no tolerance for architectural debt that would block Series A scaling.',
    outcome:
      'Time-to-market significantly accelerated. Developer experience and team autonomy improved. Platform foundation built to scale beyond seed stage — not just to ship the first version.',
    metric: '✓ 10 weeks to production<br/>✓ $1.8K monthly cost<br/>✓ 10x scalability headroom',
    tags: ['AWS Amplify', 'BaaS', 'Startup Architecture'],
  },
]

export default async function Portfolio() {
  const t = await getTranslations('portfolio')
  const [featured, ...compact] = CASES

  return (
    <section id="portfolio">
      <div className="s-top" />
      <div className="wrap">
        <div className="port-top">
          <div>
            <div className="eyebrow">{t('eyebrow')}</div>
            <h2>
              Architecture
              <br />
              <em>that shipped.</em>
            </h2>
          </div>
          <p className="s-sub">
            Real outcomes. <strong>Each case reflects the same approach:</strong> understand
            the business pressure, design the right system foundation, enable the team to own
            it independently.
          </p>
        </div>

        {/* Featured case */}
        <div className="cases">
          <div className="case case--featured">
            <div className="case-hd">
              <div>
                <span className="case-num">{featured.num}</span>
                <h3>{featured.title}</h3>
              </div>
              <span className="case-client">{featured.client}</span>
            </div>
            <div className="case-cols">
              <div className="case-col">
                <div className="col-lbl">{t('situation')}</div>
                <p className="col-txt">{featured.situation}</p>
              </div>
              <div className="case-col">
                <div className="col-lbl">{t('outcome')}</div>
                <p
                  className="col-txt"
                  dangerouslySetInnerHTML={{ __html: featured.outcome }}
                />
                <div
                  className="col-metric"
                  dangerouslySetInnerHTML={{ __html: featured.metric }}
                />
              </div>
            </div>
            <div className="case-ft">
              <div className="tags">
                {featured.tags.map((tag) => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
              {/* <span className="btn-more">{t('more')}</span> */}
            </div>
          </div>
        </div>

        {/* Compact 3-up grid */}
        <div className="cases-compact">
          {compact.map((c) => (
            <div key={c.num} className="case-compact">
              <div className="case-compact-hd">
                <span className="case-num">{c.num}</span>
                <span className="case-client case-client--compact">{c.client}</span>
              </div>
              <h3 className="case-compact-title">{c.title}</h3>
              <div
                className="case-compact-metric"
                dangerouslySetInnerHTML={{ __html: c.metric }}
              />
              <div className="case-compact-ft">
                <div className="tags">
                  {c.tags.map((tag) => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
