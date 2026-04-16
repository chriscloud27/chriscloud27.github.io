const STATS = [
  {
    value: "13",
    suffix: "+",
    label: "Years designing and operating enterprise and SaaS cloud systems",
  },
  {
    value: "5k",
    suffix: "+",
    label:
      "Engineers supported on global platforms and cloud-native architectures",
  },
  {
    value: "90",
    suffix: "%",
    label:
      "Operational automation achieved on prior production-scale platforms",
  },
  {
    value: "0",
    suffix: "%",
    label: "Architectural rewrites on systems designed with WAF2p from day one",
  },
] as const;

type StatItem = {
  value: string;
  suffix: string;
  label: string;
};

type StatsGridProps = {
  showHeader?: boolean;
  portfolioButton?: boolean;
};

export default function StatsGrid({
  showHeader = true,
  portfolioButton = false,
}: StatsGridProps) {
  return (
    <>
      {showHeader && (
        <div className="text-center max-w-[560px] mx-auto mb-20">
          <p className="eyebrow justify-center">Stats</p>
          <h2>
            Built on real systems. <em>Real scale.</em>
          </h2>
        </div>
      )}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-[1px] bg-white/[0.06] border border-white/[0.06] rounded-lg overflow-hidden">
        {STATS.map((stat: StatItem) => (
          <div
            key={stat.label}
            className="bg-electric-cyan/[0.02] px-9 py-10 hover:bg-electric-cyan/[0.04] transition-colors duration-200"
          >
            <p className="font-display text-[3rem] font-bold text-white leading-none mb-2.5 tracking-tight">
              {stat.value}
              <span className="text-electric-cyan">{stat.suffix}</span>
            </p>
            <p className="font-body text-[13px] font-light text-grey-mid leading-[1.5] m-0">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
      {/* Authority footnote + optional portfolio button */}
      <div className="flex items-center justify-between mt-12 gap-6">
        <p className="font-mono text-[11px] tracking-[0.08em] uppercase text-grey-700">
          Real systems. Real scale. Real responsibility.
        </p>
        {portfolioButton && (
          <a
            href="https://www.linkedin.com/in/christian-weber-0591/details/projects/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.07em] uppercase no-underline rounded-btn transition-all duration-200 px-[26px] py-[13px] border border-electric-cyan text-electric-cyan hover:bg-electric-cyan hover:text-deep-blue"
          >
            View Full Project Portfolio →
          </a>
        )}
      </div>
    </>
  );
}
