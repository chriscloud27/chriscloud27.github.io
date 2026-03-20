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

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Christian Weber",
    url: "https://mach2.cloud",
    jobTitle: "AI-Native Cloud Architect",
    description:
      "Principal AI-Native Cloud Architect helping Series A–B B2B SaaS companies design platform architectures that scale safely.",
    sameAs: [
      "https://linkedin.com/in/christian-weber-0591",
      "https://github.com/chriscloud27",
      "https://waf2p.dev",
    ],
    knowsAbout: [
      "AI-native cloud architecture",
      "Platform engineering",
      "Series A–B SaaS scaling",
      "Cloud cost optimization",
      "WAF2p framework",
      "Terraform",
      "AWS",
      "Engineering velocity",
    ],
    worksFor: {
      "@type": "Organization",
      name: "MaCh2.Cloud",
      url: "https://mach2.cloud",
    },
  };

  const webSiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url: "https://mach2.cloud",
    name: "MaCh2.Cloud",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://mach2.cloud/blog?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
    hasPart: [
      {
        "@type": "SiteNavigationElement",
        name: "Architecture Diagnosis Call",
        description:
          "60-minute structured call to identify your platform's architectural gaps. No pitch.",
        url: "https://mach2.cloud/en/diagnosis",
        position: 1,
      },
      {
        "@type": "SiteNavigationElement",
        name: "Blog",
        description:
          "Insights on AI-native cloud architecture and scaling Series A–B SaaS platforms.",
        url: "https://mach2.cloud/blog",
        position: 2,
      },
      {
        "@type": "SiteNavigationElement",
        name: "Services",
        description:
          "Architecture Audit, Blueprint, Enablement, and Fractional Architect engagements.",
        url: "https://mach2.cloud/en/services",
        position: 3,
      },
      {
        "@type": "SiteNavigationElement",
        name: "WAF2p Framework",
        description:
          "The Well-Architected Framework for Platform Engineering — design principles for AI-native platforms.",
        url: "https://waf2p.dev",
        position: 4,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
      />
      <main>
        <HeroSection />
        <ProblemSection />
        <ServicesSection />
        <OutcomesSection />
        <CtaSection />
        <CredibilitySection />
      </main>
    </>
  );
}
