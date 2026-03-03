import type { CaseStudy } from '../../types'

const CASES: CaseStudy[] = [
  {
    num: 'Case 01',
    title: 'Cloud Infrastructure Powering Enterprise Development at Scale',
    client: 'Capgemini × Microsoft',
    href: '/cases/case-01-capgemini-kubernetes',
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
    href: '/cases/case-02-aws-autonomous-driving',
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
    href: '/cases/case-03-enterprise-saas-optimization',
    situation:
      'SaaS company experiencing declining sales efficiency due to platform performance issues and operational complexity. International rollout stalling. Cloud cost growing faster than revenue with no clear cost model.',
    outcome:
      'Sales efficiency improved following optimisation and international rollout. Cloud cost aligned to revenue. Engineering team unblocked for continued product development.',
    metric: '<strong style="color:var(--cyan)">+40% Sales Efficiency</strong><br/><strong style="color:var(--cyan)">-30% Cloud Cost</strong><br/>✓ Multi-region enabled',
    tags: ['Architecture Audit', 'Cost Optimisation', 'International Rollout'],
  },
  {
    num: 'Case 04',
    title: 'BaaS Platform — Seed Startup to Production',
    client: 'Seed Stage SaaS',
    href: '/cases/case-04-baas-seed-startup',
    situation:
      'Seed-stage SaaS startup needed to move prototype to production-grade backend infrastructure fast — 5-engineer team, no budget for over-engineering, but no tolerance for architectural debt that would block Series A scaling.',
    outcome:
      'Time-to-market significantly accelerated. Developer experience and team autonomy improved. Platform foundation built to scale beyond seed stage — not just to ship the first version.',
    metric: '✓ 10 weeks to production<br/>✓ $1.8K monthly cost<br/>✓ 10x scalability headroom',
    tags: ['AWS Amplify', 'BaaS', 'Startup Architecture'],
  },
]

const PROCESS_STEPS = [
  { n: '01', title: 'Discovery Call', desc: '30 min. Map your platform, team, and where growth is creating friction.' },
  { n: '02', title: 'Architecture Assessment', desc: 'Audit current state, identify risks, surface what needs to change and why.' },
  { n: '03', title: 'Blueprint & Roadmap', desc: 'Clear architecture design with a prioritised plan your engineers can execute.' },
  { n: '04', title: 'Enablement & Build', desc: 'Hands-on guidance through implementation — reviews, decisions, unblocking.' },
  { n: '05', title: 'Continuous Evolution', desc: 'Ongoing advisory keeps the platform ahead of growth, not catching up to it.' },
]

export default function Portfolio() {
  return (
    <section id="portfolio">
      <div className="s-top" />
      <div className="wrap">

        <div className="port-top reveal">
          <div>
            <div className="eyebrow">Portfolio</div>
            <h2>Architecture<br /><em>that shipped.</em></h2>
          </div>
          <p className="s-sub">
            Real outcomes. <strong>Each case reflects the same approach:</strong> understand
            the business pressure, design the right system foundation, enable the team to own
            it independently.
          </p>
        </div>

        {/* Process */}
        <div className="process reveal">
          <div className="proc-label">// How We Work Together</div>
          <div className="proc-steps">
            {PROCESS_STEPS.map((step) => (
              <div key={step.n} className="pstep">
                <div className="pstep-n">{step.n}</div>
                <div>
                  <div className="pstep-t">{step.title}</div>
                  <div className="pstep-d">{step.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Case Studies */}
        <div className="cases">
          {CASES.map((c) => (
            <a key={c.num} href={c.href} className="case reveal">
              <div className="case-hd">
                <div>
                  <span className="case-num">{c.num}</span>
                  <h3>{c.title}</h3>
                </div>
                <span className="case-client">{c.client}</span>
              </div>
              <div className="case-cols">
                <div className="case-col">
                  <div className="col-lbl">Situation</div>
                  <p className="col-txt">{c.situation}</p>
                </div>
                <div className="case-col">
                  <div className="col-lbl">Outcome</div>
                  <p
                    className="col-txt"
                    dangerouslySetInnerHTML={{ __html: c.outcome }}
                  />
                  <div
                    className="col-metric"
                    dangerouslySetInnerHTML={{ __html: c.metric }}
                  />
                </div>
              </div>
              <div className="case-ft">
                <div className="tags">
                  {c.tags.map((tag) => <span key={tag} className="tag">{tag}</span>)}
                </div>
                <span className="btn-more">More</span>
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  )
}
