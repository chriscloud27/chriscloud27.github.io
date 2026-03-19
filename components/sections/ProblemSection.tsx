const painPoints = [
  {
    headline: "AI features work in demos but fail in production",
    body: "Inference latency, scaling and cost dynamics weren't part of the architecture.",
  },
  {
    headline: "Cloud costs growing faster than revenue",
    body: "No clear AI / Cloud usage cost model tied to business value.",
  },
  {
    headline: "Architectural bottlenecks slowing delivery",
    body: "Teams wait on infrastructure instead of shipping features.",
  },
  {
    headline: "Over-engineered or under-engineered foundations",
    body: "Either premature complexity or technical debt stalling growth.",
  },
  {
    headline: "Fragmented platform strategy",
    body: "No clear system direction as teams scale and re-architecture risk are almost programmed. You know the current path won't scale another 12 months.",
  },
  {
    headline: "Your platform isn't investor-ready",
    body: "VCs at Series B and beyond aren't just evaluating your product — they're evaluating your technical foundation.",
  },
];

export default function ProblemSection() {
  return (
    <section id="problem" className="bg-deep-blue py-[120px] relative">
      <div aria-hidden="true" className="s-top" />

      <div className="wrap">
        <div className="max-w-[600px] mb-[72px]">
          <p className="eyebrow">The Problem</p>
          <h2>
            What happens when architecture <em>can&apos;t keep up</em>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {painPoints.map((point) => (
            <div
              key={point.headline}
              className="flex flex-col gap-3 rounded-xl p-6 border-l-2 transition-all duration-300 hover:border-electric-cyan/60"
              style={{
                background: "rgba(0,229,255,0.025)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderLeft: "2px solid rgba(0,229,255,0.35)",
              }}
            >
              <h3
                className="text-[15px] font-semibold leading-snug m-0"
                style={{ color: "var(--white)", fontFamily: "var(--body)" }}
              >
                {point.headline}
              </h3>
              <p
                className="text-[13px] font-light leading-[1.65] m-0"
                style={{ color: "var(--g500)" }}
              >
                {point.body}
              </p>
            </div>
          ))}
        </div>

        <p
          className="text-center italic mt-12 text-[14px]"
          style={{ color: "rgba(255,255,255,0.38)" }}
        >
          These aren&apos;t engineering failures — they&apos;re architectural
          gaps.
        </p>
      </div>
    </section>
  );
}
