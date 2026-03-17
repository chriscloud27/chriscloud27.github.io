import Link from 'next/link'

const MicrosoftLogo = () => (
  <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" className="w-14 h-14">
    <rect width="40" height="40" fill="white" rx="3" />
    <g transform="translate(6, 8)">
      <rect x="0" y="0" width="6" height="6" fill="#05a6f0" />
      <rect x="10" y="0" width="6" height="6" fill="#7fba00" />
      <rect x="0" y="10" width="6" height="6" fill="#f25022" />
      <rect x="10" y="10" width="6" height="6" fill="#ffb900" />
    </g>
  </svg>
)

const AwsLogo = () => (
  <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" className="w-14 h-14">
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
)

export default function FeaturedCredentials() {
  return (
    <section
      id="featured-credentials"
      className="relative py-[120px]"
      style={{ background: 'var(--blue-mid)' }}
    >
      <div className="s-top" aria-hidden="true" />

      <div className="wrap">
        <div className="max-w-[600px] mb-[72px]">
          <p className="eyebrow">Verified Credentials</p>
          <h2>
            Published work. <em>Awarded platforms.</em>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-[2px]">
          {/* Panel 1 — Microsoft Whitepaper */}
          <div className="flex flex-col gap-7 rounded-xl border border-white/[0.07] bg-electric-cyan/[0.025] p-10 transition-all duration-300 hover:border-electric-cyan/30 hover:bg-electric-cyan/[0.04]">
            <div className="flex items-center justify-between">
              <MicrosoftLogo />
              <span className="tag">Published 2023</span>
            </div>

            <p className="font-mono text-[10px] tracking-[0.1em] uppercase text-electric-cyan/50 -mb-4">
              Microsoft + Capgemini
            </p>

            <h3 className="m-0 leading-[1.3] text-white">Function Apps vs Kubernetes</h3>

            <p className="font-body m-0 text-[14px] font-light leading-[1.72] text-grey-mid">
              Executive architecture guidance comparing serverless and container orchestration
              strategies for scalable cloud platforms. Co-authored with Microsoft and Capgemini —
              covering trade-offs in operational complexity, cost, and scale.
            </p>

            <div className="mt-auto pt-2">
              <Link href="/en/whitepaper" className="ach-btn">
                Download Whitepaper →
              </Link>
            </div>
          </div>

          {/* Panel 2 — AWS Global Partner Award */}
          <div className="flex flex-col gap-7 rounded-xl border border-white/[0.07] bg-electric-cyan/[0.025] p-10 transition-all duration-300 hover:border-electric-cyan/30 hover:bg-electric-cyan/[0.04]">
            <div className="flex items-center justify-between">
              <AwsLogo />
              <span className="tag">Award Winner</span>
            </div>

            <p className="font-mono text-[10px] tracking-[0.1em] uppercase text-electric-cyan/50 -mb-4">
              AWS Global Partner Award
            </p>

            <h3 className="m-0 leading-[1.3] text-white">Autonomous Driving Cloud Platform</h3>

            <p className="font-body m-0 text-[14px] font-light leading-[1.72] text-grey-mid">
              Contributed to the award-winning cloud platform powering autonomous vehicle
              development — a mission-critical system supporting{' '}
              <strong className="font-medium text-electric-cyan">1,700 engineers</strong> globally.
              Multi-region orchestration, fault-tolerant architecture, and precision cost modeling
              at enterprise scale.
            </p>

            <div className="mt-auto border-t border-white/[0.06] pt-5">
              <p className="font-mono mb-1 text-[11px] tracking-[0.08em] uppercase text-electric-cyan/50">
                AWS Cost Optimization
              </p>
              <p className="font-body m-0 text-[13px] font-light leading-[1.6] text-grey-mid">
                Hands-on AWS pricing architecture — unit economics, reserved capacity strategy,
                and FinOps governance at platform scale.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
