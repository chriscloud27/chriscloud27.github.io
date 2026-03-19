const steps = [
  {
    number: "01",
    name: "Audit",
    description:
      "We map your current architecture, identify risk areas, and produce a prioritized improvement roadmap with clear next steps.",
  },
  {
    number: "02",
    name: "Blueprint",
    description:
      "We design the target architecture — scalable, cost-efficient, and precisely aligned with your growth stage and product direction.",
  },
  {
    number: "03",
    name: "Enablement",
    description:
      "We guide your engineering team through implementation with hands-on architectural support and decision frameworks.",
  },
  {
    number: "04",
    name: "Fractional",
    description:
      "Ongoing architectural leadership ensures your platform evolves with the business — without the cost of a full-time hire.",
  },
];

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="bg-white py-[120px] relative">
      <div className="wrap">
        {/* Section header */}
        <div className="max-w-[560px] mb-20">
          <p className="eyebrow" style={{ color: "var(--cyan)" }}>
            Process
          </p>
          <h2 className="text-deep-blue mb-0">
            From chaos to <em className="text-electric-cyan italic">clarity</em>
          </h2>
        </div>

        {/* Step flow — .hiw-steps / .hiw-step CSS in globals.css
            brand: horizontal connector line uses ::before — cannot be Tailwind */}
        <div className="hiw-steps">
          {steps.map((step, idx) => (
            <div key={step.number} className="hiw-step">
              {/* Step number circle — alternating filled / outlined */}
              <div
                className={[
                  "w-12 h-12 rounded-full flex items-center justify-center",
                  "font-mono text-[13px] font-medium flex-shrink-0 mb-5",
                  idx % 2 === 0
                    ? "bg-electric-cyan text-deep-blue"
                    : "bg-transparent text-electric-cyan border border-electric-cyan",
                ].join(" ")}
              >
                {step.number}
              </div>

              {/* brand: Syne for step name headings */}
              <h3 className="font-display text-[16px] font-bold text-deep-blue mb-[10px] leading-[1.2]">
                {step.name}
              </h3>

              <p className="font-body text-[13.5px] font-light leading-[1.72] text-grey-700 m-0">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
