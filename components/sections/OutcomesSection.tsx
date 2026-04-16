const OUTCOMES = [
  {
    id: "01",
    headline: "Engineers ship features, not infrastructure tickets",
    body: "Deliver customer value faster with stable platform foundations",
  },
  {
    id: "02",
    headline: "Revenue scales without architectural rewrites",
    body: "Scale product and revenue without architectural bottlenecks",
  },
  {
    id: "03",
    headline: "AI that holds in production",
    body: "Integrate AI capabilities reliably into core products",
  },
  {
    id: "04",
    headline: "Cost that stays predictable",
    body: "Maintain predictable cloud cost as business grows",
  },
  {
    id: "05",
    headline: "No more full rewrites",
    body: "Reduce long-term re-architecture risk",
  },
  {
    id: "06",
    headline: "A platform that evolves",
    body: "Enable continuous platform evolution",
  },
];

export default function OutcomesSection() {
  return (
    <section
      id="outcomes"
      className="relative overflow-hidden"
      style={{ background: "var(--blue)" }}
    >
      {/* Cyan dot grid overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(0,229,255,0.045) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Cyan top divider */}
      <div className="s-top" aria-hidden="true" />

      <div className="wrap relative py-[120px]">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-[80px] lg:gap-[100px] items-start">
          {/* Left — sticky statement */}
          <div className="lg:sticky lg:top-[100px]">
            <p className="eyebrow">Outcomes</p>

            <h2 className="mb-6">What a fixed foundation makes possible.</h2>

            <p
              className="font-body text-[15px] font-light leading-[1.78] mb-10"
              style={{ color: "var(--g300)" }}
            >
              Most architectural problems are invisible until they&apos;re
              expensive. By the time they surface in missed sprints, rising
              cloud bills, or a failed due diligence, the cost of fixing them
              has multiplied. The right foundation removes the problems that
              haven&apos;t appeared yet.
            </p>
          </div>

          {/* Right — outcome list */}
          <div>
            {OUTCOMES.map((item, i) => (
              <div
                key={item.id}
                className="group flex gap-5 py-[28px] items-start"
                style={{
                  borderBottom:
                    i < OUTCOMES.length - 1
                      ? "1px solid rgba(255,255,255,0.06)"
                      : "none",
                }}
              >
                {/* Check indicator */}
                <div
                  className="mt-[3px] flex-shrink-0 w-[22px] h-[22px] rounded-full flex items-center justify-center"
                  style={{
                    background: "rgba(0,229,255,0.08)",
                    border: "1px solid rgba(0,229,255,0.22)",
                  }}
                >
                  <svg
                    width="10"
                    height="8"
                    viewBox="0 0 10 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      d="M1 4L3.5 6.5L9 1"
                      stroke="var(--cyan)"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>

                {/* Text */}
                <div>
                  <p
                    className="font-semibold text-[16px] leading-[1.3] mb-1 m-0 transition-colors duration-200 group-hover:text-electric-cyan"
                    style={{
                      color: "var(--white)",
                      fontFamily: "var(--display)",
                    }}
                  >
                    {item.headline}
                  </p>
                  <p
                    className="font-body text-[13px] font-light leading-[1.65] m-0"
                    style={{ color: "var(--g500)" }}
                  >
                    {item.body}
                  </p>
                </div>

                {/* Mono ID — right-aligned */}
                <span
                  className="ml-auto pl-4 font-mono text-[10px] tracking-[0.08em] flex-shrink-0 mt-[4px]"
                  style={{ color: "rgba(255,255,255,0.12)" }}
                >
                  {item.id}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
