const services = [
  {
    name: 'Architecture Audit',
    purpose: 'Establish architectural clarity and identify risks, inefficiencies, and scaling constraints.',
    outcomes: [
      'Clear understanding of current platform architecture',
      'Identification of scalability, reliability, and cost risks',
      'Prioritized roadmap for architectural evolution',
    ],
  },
  {
    name: 'Architecture Blueprint',
    purpose: 'Design a scalable, production-ready platform architecture aligned with product and business growth.',
    outcomes: [
      'Clear and scalable Cloud and platform architecture',
      'Architecture optimized for reliability, scalability, and cost efficiency',
      'Engineering teams enabled to implement with confidence',
    ],
  },
  {
    name: 'Enablement & Guidance',
    purpose: 'Enable engineering teams to build, operate, and evolve platform architecture correctly.',
    outcomes: [
      'Faster and safer infrastructure and platform implementation',
      'Reduced architectural risk during scaling phases',
      'Engineering teams enabled to operate independently',
    ],
  },
  {
    name: 'Fractional Architect',
    purpose: 'Continuous architectural leadership and platform evolution support without a full-time hire.',
    outcomes: [
      'Architectural leadership aligned with business and product strategy',
      'Scalable and continuously evolving platform architecture',
      'Engineering teams supported with architectural clarity',
    ],
  },
]

export default function ServicesSection() {
  return (
    <section id="services" className="bg-deep-blue py-[120px] relative">
      {/* brand: cyan top divider line */}
      <div aria-hidden="true" className="s-top" />

      <div className="wrap">
        {/* Section header */}
        <div className="max-w-[560px] mb-[72px]">
          <p className="eyebrow">Services</p>
          <h2>How I work with you</h2>
        </div>

        {/* Service cards — dark card variant per brand surface rules */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[2px]">
          {services.map((service, idx) => (
            <div
              key={service.name}
              className="bg-electric-cyan/[0.03] border border-white/[0.07] rounded-card p-9 flex flex-col gap-5"
            >
              {/* brand: mono index label */}
              <span className="font-mono text-[11px] tracking-[0.12em] text-electric-cyan">
                0{idx + 1}
              </span>

              {/* brand: Syne for all card headings */}
              <h3 className="font-display text-[17px] font-bold text-white leading-[1.3] m-0">
                {service.name}
              </h3>

              {/* Purpose */}
              <p className="font-body text-[13.5px] font-light leading-[1.7] text-grey-mid m-0 border-b border-white/[0.06] pb-5">
                {service.purpose}
              </p>

              {/* Outcomes list */}
              <ul className="list-none m-0 p-0 flex flex-col gap-[10px]">
                {service.outcomes.map((outcome) => (
                  <li key={outcome} className="font-body text-[13px] font-light leading-[1.6] text-grey-300 pl-4 relative">
                    {/* brand: electric-cyan bullet */}
                    <span
                      aria-hidden="true"
                      className="absolute left-0 top-[6px] w-[5px] h-[5px] rounded-full bg-electric-cyan block"
                    />
                    {outcome}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
