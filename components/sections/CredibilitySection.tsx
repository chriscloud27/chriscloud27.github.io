const stats = [
  {
    value: '13+',
    label: 'Years designing and operating enterprise and SaaS cloud systems',
  },
  {
    value: '1,000s',
    label: 'Architectures supporting thousands of engineers on global platforms',
  },
  {
    value: '90%',
    label: 'Operational automation achieved on prior production platforms',
  },
  {
    value: 'Multi',
    label: 'Cloud architecture excellence awards across industry programs',
  },
]

export default function CredibilitySection() {
  return (
    <section id="credibility" className="bg-deep-blue py-[120px] relative">
      {/* brand: cyan top divider line */}
      <div aria-hidden="true" className="s-top" />

      <div className="wrap">
        {/* Section header — centred */}
        <div className="text-center max-w-[560px] mx-auto mb-20">
          <p className="eyebrow justify-center">Credibility</p>
          <h2>
            Built on real systems.{' '}
            <em>Real scale.</em>
          </h2>
        </div>

        {/* Stats grid — divider lines form a table-like structure */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-white/[0.07]">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="p-12 border-r border-b border-white/[0.07]"
            >
              {/* brand: Syne display weight for large stat values */}
              <span className="font-display font-bold text-[clamp(40px,5vw,56px)] text-electric-cyan block leading-none mb-4">
                {stat.value}
              </span>
              <p className="font-mono text-[11px] font-light leading-[1.65] tracking-[0.04em] text-grey-mid m-0">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Authority footnote */}
        <p className="font-mono text-[11px] tracking-[0.08em] uppercase text-grey-700 text-center mt-12">
          Authority grounded in real systems. Real scale. Real responsibility.
        </p>
      </div>
    </section>
  )
}
