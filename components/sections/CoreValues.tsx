export default function CoreValues() {
  const values = [
    {
      title: 'Intelligent',
      description:
        'We think systematically about tradeoffs. Every architecture decision is reasoned, documented, and optimized for your specific constraints — not generic best practices.'
    },
    {
      title: 'Sovereign',
      description:
        'Your infrastructure serves your business, not vice versa. We design cloud-agnostic architectures that give you optionality and prevent lock-in to single vendors.'
    },
    {
      title: 'Trustworthy',
      description:
        'Security and compliance are non-negotiable. We architect with defense-in-depth, audit trails, and zero-trust principles built in from day one.'
    },
    {
      title: 'Platform',
      description:
        'Great infrastructure enables product velocity. We build platforms that scale with your team, not against it — enabling engineers to move faster and ship with confidence.'
    },
    {
      title: 'Speed',
      description:
        'Slow infrastructure kills startups. We deliver rapid time-to-market without cutting corners on reliability, security, or long-term scalability.'
    }
  ]

  return (
    <section className="bg-deep-blue-mid py-20 pb-[120px]">
      <div className="wrap">
        <h2 className="mb-5">
          Built to <em>accelerate</em>
          <br />
          what matters.
        </h2>
        {/* brand: max-w-text caps prose at 680px */}
        <p className="font-body text-[15px] font-light leading-[1.75] text-grey-mid max-w-text mb-[60px]">
          MaCh2.Cloud embodies five core values that guide every architectural decision and partnership. These principles define who we are and how we deliver impact.
        </p>

        {/* brand: dark card variant with electric-cyan top accent */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[3px]">
          {values.map((value) => (
            <div
              key={value.title}
              className="value-card bg-electric-cyan/[0.02] border border-white/[0.06] border-t-[3px] border-t-electric-cyan rounded-btn p-8 transition-all duration-200"
            >
              {/* brand: Syne for value titles */}
              <h3 className="font-display text-[24px] font-bold text-white mb-4">
                {value.title}
              </h3>
              <p className="font-body text-[14px] font-light leading-[1.72] text-grey-mid m-0">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
