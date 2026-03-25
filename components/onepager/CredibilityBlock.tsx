type CaseCard = {
  title: string;
  description: string;
};

type CredibilityBlockProps = {
  eyebrow: string;
  heading: string;
  headingEmphasis: string;
  subline: string;
  cards: CaseCard[];
  portfolioCopy: string;
  portfolioCta: string;
  portfolioHref: string;
};

export default function CredibilityBlock({
  eyebrow,
  heading,
  headingEmphasis,
  subline,
  cards,
  portfolioCopy,
  portfolioCta,
  portfolioHref,
}: CredibilityBlockProps) {
  return (
    <section
      id="track-record"
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

        {/* 2×2 card grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-14">
          {cards.map((card) => (
            <div
              key={card.title}
              className="p-6 rounded-card"
              style={{
                background: "#F4F6F9",
                border: "1px solid #D0D8E4",
              }}
            >
              <h3 className="text-[16px] font-semibold text-graphite mb-3">
                {card.title}
              </h3>
              <p className="font-body text-[13px] font-light leading-[1.7] text-grey-text">
                {card.description}
              </p>
            </div>
          ))}
        </div>

        {/* Portfolio CTA block */}
        <div
          className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-6"
          style={{ borderColor: "#D0D8E4" }}
        >
          <p className="font-body text-[14px] text-grey-text flex-1">
            {portfolioCopy}
          </p>
          <a
            href={portfolioHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.07em] uppercase no-underline rounded-btn transition-all duration-200 px-[26px] py-[13px] border border-electric-cyan text-electric-cyan hover:bg-electric-cyan hover:text-deep-blue"
          >
            {portfolioCta}
          </a>
        </div>

        {/* TESTIMONIAL — replace this block when client confirms publication */}
        {/* <div className="border border-dashed border-cyan-500/20 rounded p-6 text-center">
          <p className="font-mono text-xs text-cyan-500/40 tracking-widest uppercase">
            {"// Client testimonial — pending confirmation for publication"}
          </p>
        </div> */}
      </div>
    </section>
  );
}
