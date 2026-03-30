import Link from "next/link";

interface PageHeroProps {
  eyebrow: string;
  headline: string;
  sub: string;
  body?: string;
  ctaPrimary: { label: string; href: string };
  ctaSecondary?: { label: string; href: string };
}

export default function PageHero({
  eyebrow,
  headline,
  sub,
  body,
  ctaPrimary,
  ctaSecondary,
}: PageHeroProps) {
  return (
    <section className="bg-deep-blue relative overflow-hidden">
      <div aria-hidden="true" className="grid-overlay" />

      <div className="wrap relative z-10 py-20 lg:py-28">
        <p className="eyebrow mb-6">{eyebrow}</p>

        <h1 className="font-display text-[clamp(2rem,5vw,3.25rem)] font-bold italic leading-[1.15] text-white mb-4 max-w-[760px]">
          {headline}
        </h1>

        <p className="font-mono text-[15px] text-electric-cyan leading-[1.6] max-w-[600px] mb-4">
          {sub}
        </p>

        {body && (
          <p className="font-body text-[15px] font-light leading-[1.75] text-grey-mid max-w-[600px] mb-8">
            {body}
          </p>
        )}

        <div className="hero-btns mt-6">
          <Link href={ctaPrimary.href} className="btn btn-p">
            {ctaPrimary.label}
          </Link>
          {ctaSecondary && (
            <Link href={ctaSecondary.href} className="btn btn-g">
              {ctaSecondary.label}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
