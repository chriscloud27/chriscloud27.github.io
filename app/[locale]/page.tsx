import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import HeroSection from "@/components/sections/HeroSection";
import ProblemSection from "@/components/sections/ProblemSection";
import ServicesSection from "@/components/sections/ServicesSection";
import CredibilitySection from "@/components/sections/CredibilitySection";
import CtaSection from "@/components/sections/CtaSection";
import OutcomesSection from "@/components/sections/OutcomesSection";
import { getGlobalSettings } from "@/lib/settings";
import { buildCanonical, buildCanonicalAndAlternates } from "@/lib/seo";
import { HOME_KEYWORDS } from "@/lib/keywords";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const settings = getGlobalSettings(locale);
  const i18n = buildCanonicalAndAlternates("/", locale);
  const ogImage = settings.defaultSeo?.shareImage;

  return {
    title: settings.defaultSeo?.metaTitle ?? settings.siteName,
    description:
      settings.defaultSeo?.metaDescription ?? settings.siteDescription,
    keywords: HOME_KEYWORDS,
    openGraph: {
      type: "website",
      url: buildCanonical(`/${locale}`),
      title: settings.defaultSeo?.metaTitle ?? settings.siteName,
      description:
        settings.defaultSeo?.metaDescription ?? settings.siteDescription,
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
      title: settings.defaultSeo?.metaTitle ?? settings.siteName,
      description:
        settings.defaultSeo?.metaDescription ?? settings.siteDescription,
      images: ogImage ? [ogImage.url] : undefined,
    },
    ...i18n,
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main>
      <HeroSection />
      <ProblemSection />
      <ServicesSection />
      <OutcomesSection />
      <CtaSection />
      <CredibilitySection />
    </main>
  );
}
