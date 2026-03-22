import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import WhitepaperForm from "@/components/WhitepaperForm";
import { buildCanonical, buildCanonicalAndAlternates } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: "AI-Native Cloud Architecture Whitepaper — MaCh2.Cloud",
    description:
      "Download the AI-Native Cloud Architecture whitepaper. Practical frameworks for Series A–B SaaS companies outgrowing their foundation.",
    openGraph: {
      title: "AI-Native Cloud Architecture Whitepaper — MaCh2.Cloud",
      description:
        "Practical frameworks for Series A–B SaaS companies outgrowing their foundation.",
      url: buildCanonical(`/${locale}/whitepaper`),
    },
    ...buildCanonicalAndAlternates("/whitepaper", locale),
  };
}

export default async function WhitepaperPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="bg-deep-blue min-h-screen pt-16">
      <section className="relative overflow-hidden">
        <div aria-hidden="true" className="grid-overlay" />

        <div className="wrap relative z-10 py-20">
          {/* Eyebrow */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-8">
            <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-electric-cyan">
              Whitepaper
            </span>
            <span className="font-mono text-[10px] text-electric-cyan/40">
              ·
            </span>
            <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-electric-cyan">
              AI-Native Cloud Architecture
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-display text-[clamp(2rem,5vw,3.25rem)] font-bold italic leading-[1.15] text-white mb-5 max-w-[760px]">
            The architecture patterns that{" "}
            <span className="not-italic text-electric-cyan">
              survive growth.
            </span>
          </h1>

          {/* Sub */}
          <p className="font-body text-[15px] font-light leading-[1.7] text-grey-mid max-w-[560px] mb-14">
            Frameworks used by Series A–B SaaS companies to eliminate technical
            debt, reduce cloud spend, and make AI features production-ready —
            without stopping to rewrite everything.
          </p>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-electric-cyan/60 via-electric-cyan/20 to-transparent mb-16" />

          {/* Form card */}
          <div className="max-w-[520px]">
            <p className="font-mono text-[11px] tracking-[0.12em] uppercase text-grey-mid mb-8">
              Enter your details to receive the whitepaper
            </p>
            <WhitepaperForm />
          </div>
        </div>
      </section>
    </main>
  );
}
