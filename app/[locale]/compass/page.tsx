import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { buildCanonical, buildCanonicalAndAlternates } from "@/lib/seo";
import CompassTerminal from "@/components/compass/CompassTerminal";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const title = "Platform Compass · MaCh2.Cloud";
  const description =
    "AI-Native Platform Readiness Assessment. Find your architectural heading in ~5 minutes.";

  return {
    title,
    description,
    openGraph: {
      type: "website",
      url: buildCanonical(`/${locale}/compass`),
      title,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    ...buildCanonicalAndAlternates("/compass", locale),
  };
}

const META_PILLS = ["~5 minutes", "WAF2p aligned", "report in 24h"];

export default async function CompassPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="bg-deep-blue min-h-screen pt-16">
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="py-20 text-center">
        <div className="wrap max-w-[720px]">
          <p className="font-mono text-[11px] tracking-[0.12em] uppercase text-electric-cyan mb-5">
            Platform Compass · MaCh2.Cloud
          </p>

          <h1 className="font-display text-[clamp(1.75rem,4.5vw,3rem)] font-light leading-[1.15] tracking-[-0.02em] text-white mb-5">
            Flying fast in the{" "}
            <em className="not-italic text-electric-cyan font-medium">
              wrong direction<br></br>
            </em>{" "}
            leads to a crash
          </h1>

          <p className="font-body text-[15px] font-light leading-[1.7] text-grey-mid max-w-[540px] mx-auto mb-8">
            Discover your architectural archetype in minutes. A rapid,
            structured assessment based on industry best-practice frameworks.
            Personalised report within 24 hours.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6">
            {META_PILLS.map((pill) => (
              <span
                key={pill}
                className="flex items-center gap-2 font-mono text-[11px] text-grey-mid tracking-[0.06em]"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-electric-cyan/50 flex-shrink-0" />
                {pill}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Terminal ─────────────────────────────────────────────────── */}
      <section className="pb-20">
        <div className="wrap max-w-[820px] pt-8">
          <CompassTerminal />
        </div>
      </section>
    </main>
  );
}
