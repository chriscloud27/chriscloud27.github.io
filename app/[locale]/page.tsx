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
import { SITE_CONFIG } from "@/lib/site-config";

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

  const { person, organization, siteUrl } = SITE_CONFIG.seo;
  const pageUrl = buildCanonical(`/${locale}`);

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: person.name,
    url: siteUrl,
    image: person.image,
    jobTitle: "AI‑Native Cloud & Platform Architect",
    description:
      "Principal AI‑Native Cloud & Platform Architect helping Series A–B B2B SaaS companies design platform architectures that scale safely.",
    sameAs: person.sameAs,
    knowsAbout: [
      "AI‑Native Cloud & Platform Architecture",
      "Platform engineering",
      "Series A–B SaaS scaling",
      "Cloud cost optimization",
      "WAF++ framework",
      "Terraform",
      "AWS",
      "Engineering velocity",
    ],
    worksFor: {
      "@type": "Organization",
      name: organization.name,
      url: organization.url,
    },
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "MaCh2.Cloud — AI‑Native Cloud & Platform Architect",
    url: pageUrl,
    description:
      "Series A–B B2B SaaS companies move fast — until the foundation built to get there starts breaking under the weight of growth. MaCh2.Cloud designs AI‑Native Cloud & Platform Architectures that eliminate technical debt and restore engineering velocity.",
    datePublished: "2024-01-01",
    dateModified: "2026-04-21",
    inLanguage: locale,
    author: { "@type": "Person", name: person.name },
    publisher: {
      "@type": "Organization",
      name: organization.name,
      url: organization.url,
    },
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", ".hero-sub"],
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is an AI-Native Cloud & Platform Architect?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "An AI-Native Cloud & Platform Architect designs cloud infrastructure and platform systems purpose-built for AI workloads, developer velocity, and scalable SaaS growth — addressing inference cost, failure blast radius, and platform engineering for AI-first products.",
        },
      },
      {
        "@type": "Question",
        name: "What does MaCh2.Cloud offer?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "MaCh2.Cloud offers Architecture Diagnosis, Architecture Blueprint, Platform Enablement, and Fractional Principal Architect engagements for Series A–B B2B SaaS companies whose platform needs structural improvement to support growth.",
        },
      },
      {
        "@type": "Question",
        name: "Who is MaCh2.Cloud for?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Series A and Series B B2B SaaS companies whose platform was built for speed and now needs architectural improvement to reduce cloud costs, eliminate technical debt, and restore engineering velocity.",
        },
      },
    ],
  };

  const definedTermSchema = {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    name: "WAF++",
    alternateName: "Well-Architected Framework Plus Plus",
    description:
      "Open-source extension of the AWS Well-Architected Framework, purpose-built for AI-native SaaS platforms. Adds inference cost modeling, AI workload scaling patterns, and platform engineering pillars missing from the standard framework.",
    url: "https://wafplusplus.dev",
    inDefinedTermSet: {
      "@type": "DefinedTermSet",
      name: "Platform Engineering Glossary",
      url: siteUrl,
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
          "30-minute structured call to identify your platform's architectural gaps. No pitch.",
        url: "https://mach2.cloud/en/diagnosis",
        position: 1,
      },
      {
        "@type": "SiteNavigationElement",
        name: "Blog",
        description:
          "Insights on AI‑Native Cloud & Platform Architecture and scaling Series A–B SaaS platforms.",
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
        name: "WAF++ Framework",
        description:
          "The Well-Architected Framework for Platform Engineering — design principles for AI-native platforms.",
        url: "https://wafplusplus.dev",
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSchema) }}
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
