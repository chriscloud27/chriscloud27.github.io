import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Link from "next/link";
import Image from "next/image";
// import Experience from '@/components/sections/Experience'
import CoreValues from "@/components/sections/CoreValues";
import { buildCanonical, buildCanonicalAndAlternates } from "@/lib/seo";
import { getGlobalSettings } from "@/lib/settings";
import { ABOUT_KEYWORDS } from "@/lib/keywords";
import Portfolio from "@/components/sections/Portfolio";
import FeaturedCredentials from "@/components/sections/FeaturedCredentials";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  const settings = getGlobalSettings(locale);
  const title = `${t("eyebrow")} — ${settings.siteName}`;
  const description = t.raw("description").replace(/<[^>]*>/g, "");
  const i18n = buildCanonicalAndAlternates("/about", locale);
  const ogImage = settings.defaultSeo?.shareImage;

  return {
    title,
    description,
    keywords: ABOUT_KEYWORDS,
    openGraph: {
      type: "website",
      url: buildCanonical(`/${locale}/about`),
      title,
      description,
      images: ogImage
        ? [
            {
              url: ogImage.url,
              width: ogImage.width,
              height: ogImage.height,
              alt: ogImage.alternativeText ?? settings.siteName,
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogImage ? [ogImage.url] : undefined,
    },
    ...i18n,
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "about" });

  return (
    <main className="pt-16">
      {/* Hero — brand: pt-16 = 64px nav offset */}
      <section className="py-20">
        <div className="wrap">
          <div className="grid gap-10 items-start lg:grid-cols-[minmax(0,1fr)_320px]">
            <div>
              <div className="eyebrow">{t("eyebrow")}</div>
              <h1>
                Christian Weber
                <br />
                <em>AI-Native Cloud Architect</em>
              </h1>
              <p className="hero-sub mt-6">
                {t.rich("sub", {
                  highlight: (c) => (
                    <span className="text-electric-cyan">{c}</span>
                  ),
                })}
              </p>
              {/* brand: max-w-text caps prose at 680px per token */}
              <p className="font-body text-[15px] font-light leading-[1.75] text-grey-mid max-w-text mb-8">
                {t.rich("description", {
                  highlight: (c) => (
                    <span className="text-electric-cyan">{c}</span>
                  ),
                })}
              </p>
              <div className="flex gap-3 flex-wrap">
                <Link
                  href={`/${locale}/diagnosis#book-diagnosis-call`}
                  className="btn btn-p"
                >
                  {t("cta")}
                </Link>
                <Link href={`/${locale}/#portfolio`} className="btn btn-g">
                  {t("ctaSecondary")}
                </Link>
              </div>
            </div>

            <div className="relative w-full max-w-[320px] lg:ml-auto">
              <Image
                src="/img/Chris.png"
                alt="Christian Weber"
                width={320}
                height={400}
                priority
                className="w-full h-auto object-cover rounded-card border border-white/[0.1]"
              />
              <div className="absolute bottom-4 left-[-12px] bg-[var(--blue-mid)] border border-electric-cyan/25 rounded px-3 py-2">
                <span className="block font-mono text-[9px] tracking-[0.1em] uppercase text-electric-cyan mb-1">
                  Available
                </span>
                <span className="font-body text-[13px] text-white">
                  Remote - US / EU
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <Experience /> */}
      <Portfolio />
      <FeaturedCredentials />
      <CoreValues />
    </main>
  );
}
