import Link from "next/link";

type OutcomeItem = {
  title: string;
  description: string;
};

type DiagnosisOutcomesProps = {
  locale: string;
  eyebrow: string;
  heading: string;
  headingEmphasis: string;
  subline: string;
  outcomes: OutcomeItem[];
  infoBox: string;
  infoBoxEmphasis: string;
  ctaText: string;
};

export default function DiagnosisOutcomes({
  locale,
  eyebrow,
  heading,
  headingEmphasis,
  subline,
  outcomes,
  infoBox,
  infoBoxEmphasis,
  ctaText,
}: DiagnosisOutcomesProps) {
  return (
    <section
      id="diagnosis-outcomes"
      className="bg-white py-20 lg:py-[120px] relative"
    >
      <div className="wrap">
        <div className="max-w-[640px] mb-[72px]">
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="text-graphite">
            {heading} <em>{headingEmphasis}</em>
          </h2>
          <p className="font-body text-base font-light leading-[1.75] text-grey-text max-w-[560px] mt-5">
            {subline}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-12">
          {outcomes.map((item) => (
            <div
              key={item.title}
              className="flex gap-4 p-6 rounded-card"
              style={{
                background: "#F4F6F9",
                border: "1px solid #D0D8E4",
              }}
            >
              <span className="flex-shrink-0 font-mono text-[15px] font-semibold text-electric-cyan mt-0.5">
                →
              </span>
              <div>
                <p className="font-body text-[15px] font-semibold text-graphite leading-snug mb-2">
                  {item.title}
                </p>
                <p className="font-body text-[13px] font-light leading-[1.65] text-grey-text">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Info box — dark bg, cyan left border */}
        <div
          className="rounded-card p-7 mb-10"
          style={{
            background: "#0B1F3A",
            borderLeft: "3px solid #00E5FF",
          }}
        >
          <p className="font-body text-[14px] font-light leading-[1.85] text-grey-mid">
            {infoBox}{" "}
            <strong className="font-semibold text-white">
              {infoBoxEmphasis}
            </strong>
          </p>
        </div>

        <Link
          href={`/${locale}/diagnosis`}
          className="font-mono text-[12px] tracking-[0.08em] uppercase text-electric-cyan hover:text-white transition-colors duration-200 no-underline"
        >
          {ctaText}
        </Link>
      </div>
    </section>
  );
}
