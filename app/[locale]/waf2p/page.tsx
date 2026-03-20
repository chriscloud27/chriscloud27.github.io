import type { Metadata } from "next";
import Image from "next/image";
import { WafpassLink } from "@/components/waf2p/WafpassLink";
import Link from "next/link";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { buildCanonical, buildCanonicalAndAlternates } from "@/lib/seo";
import { getGlobalSettings } from "@/lib/settings";
import { WAF2P_KEYWORDS } from "@/lib/keywords";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "waf2p" });
  const settings = getGlobalSettings(locale);
  const title = t("metaTitle");
  const description = t("metaDescription");
  const i18n = buildCanonicalAndAlternates("/waf2p", locale);
  const ogImage = settings.defaultSeo?.shareImage;

  return {
    title,
    description,
    keywords: WAF2P_KEYWORDS,
    openGraph: {
      type: "website",
      url: buildCanonical(`/${locale}/waf2p`),
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

const PILLARS = [
  { key: "pillar1", number: "01" },
  { key: "pillar2", number: "02" },
  { key: "pillar3", number: "03" },
  { key: "pillar4", number: "04" },
  { key: "pillar5", number: "05" },
  { key: "pillar6", number: "06" },
  { key: "pillar7", number: "07" },
] as const;

export default async function Waf2pPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "waf2p" });

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: buildCanonical(`/${locale}`),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "WAF++",
        item: buildCanonical(`/${locale}/waf2p`),
      },
    ],
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "WAF++",
    description: t("metaDescription"),
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Cloud",
    url: "https://waf2p.dev",
    publisher: {
      "@type": "Organization",
      name: "WAF++ Community",
      url: "https://waf2p.dev",
    },
  };

  return (
    <main className="pt-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />

      {/* Hero */}
      <section className="py-20">
        <div className="wrap">
          <div className="eyebrow">{t("eyebrow")}</div>
          <h1>
            {t("h1Part1")}
            <br />
            <em>{t("h1Emphasis")}</em>
          </h1>
          <p className="hero-sub mt-6">
            {t.rich("sub", {
              strong: (chunks) => (
                <strong className="font-semibold text-white">{chunks}</strong>
              ),
            })}
          </p>
        </div>
      </section>

      {/* What + Why */}
      <section className="py-16 border-t border-white/[0.06]">
        <div className="wrap">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="text-[1.4rem] font-display font-bold mb-4">
                {t("what")}
              </h2>
              <p className="font-body text-[15px] font-light leading-[1.75] text-grey-mid">
                {t("whatDesc")}
              </p>
            </div>
            <div>
              <h2 className="text-[1.4rem] font-display font-bold mb-4">
                {t("why")}
              </h2>
              <p className="font-body text-[15px] font-light leading-[1.75] text-grey-mid">
                {t("whyDesc")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Six Pillars */}
      <section className="py-16 border-t border-white/[0.06]">
        <div className="wrap">
          <h2 className="text-[1.6rem] font-display font-bold mb-10">
            {t("pillars")}
          </h2>
          <div className="grid gap-[3px] sm:grid-cols-2 lg:grid-cols-3">
            {PILLARS.map(({ key, number }) => (
              <div
                key={key}
                className="group reveal on bg-electric-cyan/[0.02] border border-white/[0.08] rounded-card p-7 hover:border-electric-cyan/30 hover:bg-electric-cyan/[0.04] transition-all duration-200"
              >
                <span className="font-mono text-[11px] tracking-[0.08em] text-electric-cyan block mb-3">
                  {number}
                </span>
                <h3 className="text-[1.05rem] font-display font-bold mb-2 group-hover:text-electric-cyan transition-colors duration-200">
                  {t(`${key}` as Parameters<typeof t>[0])}
                </h3>
                <p className="font-body text-[13px] font-light leading-[1.72] text-grey-mid">
                  {t(`${key}Desc` as Parameters<typeof t>[0])}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WAFPass */}
      <section className="py-16 border-t border-white/[0.06]">
        <div className="wrap">
          {/* Header + Image */}
          <div className="flex flex-col lg:flex-row gap-10 mb-10 items-start">
            <div className="lg:flex-1">
              <span className="font-mono text-[11px] tracking-[0.08em] text-electric-cyan/60 uppercase block mb-3">
                CLI Tool
              </span>
              <h2 className="text-[1.6rem] font-display font-bold mb-4">
                WAFPass
              </h2>
              <p className="font-body text-[15px] font-light leading-[1.75] text-grey-mid">
                WAFPass is the official CLI for the WAF++ Framework — an
                automated compliance checker that validates your Terraform
                infrastructure against the seven pillars: security, cost,
                performance, reliability, operations, sustainability, and
                sovereignty.
              </p>
              <br></br>
              <p className="font-body text-[14px] font-light leading-[1.75] text-grey-mid mb-6">
                <span className="text-white font-semibold">
                  PASS – Platform · Architecture · Strategy · Standards
                </span>
                <br />
                WAFPass applies four PASS perspectives as automated checks
                against your infrastructure — making compliance decisions
                traceable, repeatable, and auditable across any cloud.
              </p>
            </div>
            <div className="lg:w-[420px] shrink-0 rounded-card overflow-hidden border border-white/[0.08]">
              <Image
                src="/img/wafpass-report.png"
                alt="WAFPass compliance report output"
                width={840}
                height={560}
                className="w-full h-auto"
              />
            </div>
          </div>

          {/* PASS acronym grid */}
          <div className="mb-10">
            <div className="grid gap-[3px] sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  label: "Platform",
                  desc: "Validates baseline platform controls — tagging strategies, resource configuration, and account-level guardrails — automatically.",
                },
                {
                  label: "Strategy",
                  desc: "Enforces governance and cost policies as code — so strategic decisions hold over time and across teams.",
                },
                {
                  label: "Architecture",
                  desc: "Checks network topology, data residency, and sovereignty requirements against provider-neutral WAF++ controls.",
                },
                {
                  label: "Standards",
                  desc: "Applies zero-trust and security controls directly to Terraform — with clear PASS, FAIL, and SKIP outcomes for every check.",
                },
              ].map(({ label, desc }) => (
                <div
                  key={label}
                  className="bg-electric-cyan/[0.02] border border-white/[0.08] rounded-card p-6 hover:border-electric-cyan/20 transition-all duration-200"
                >
                  <span className="font-mono text-[11px] tracking-[0.08em] text-electric-cyan block mb-2 uppercase">
                    {label}
                  </span>
                  <p className="font-body text-[13px] font-light leading-[1.72] text-grey-mid">
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Terminal command box */}
          <div className="mb-8 rounded-card overflow-hidden border border-white/[0.08]">
            <div className="bg-white/[0.04] border-b border-white/[0.08] px-4 py-2.5 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
              <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
              <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
              <span className="font-mono text-[11px] text-grey-mid ml-2 tracking-wide">
                terminal
              </span>
            </div>
            <div className="bg-[#0a0f1a] px-6 py-5">
              <div className="flex items-start gap-3">
                <span className="font-mono text-[13px] text-electric-cyan/60 select-none mt-px">
                  $
                </span>
                <code className="font-mono text-[13px] text-electric-cyan leading-relaxed break-all">
                  wafpass check ./infrastructure/ --pillar sovereign --severity
                  critical
                </code>
              </div>
            </div>
          </div>

          {/* CTA link */}
          <WafpassLink />
        </div>
      </section>

      {/* Project links */}
      <section className="py-16 border-t border-white/[0.06]">
        <div className="wrap">
          <div className="grid gap-[3px] sm:grid-cols-2">
            <a
              href="https://waf2p.dev/saeulen/"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative bg-electric-cyan/[0.02] border border-white/[0.08] rounded-card p-7 hover:border-electric-cyan/30 hover:bg-electric-cyan/[0.04] transition-all duration-200"
            >
              <span className="font-mono text-[11px] tracking-[0.08em] text-electric-cyan/60 block mb-3 uppercase">
                Framework
              </span>
              <span className="block text-[1rem] font-display font-bold text-white mb-1 group-hover:text-electric-cyan transition-colors duration-200">
                Explore WAF++ Framework
              </span>
              <span className="font-mono text-[12px] text-grey-mid">
                waf2p.dev/saeulen
              </span>
              <svg
                className="absolute bottom-7 right-7 w-4 h-4 text-electric-cyan/40 group-hover:text-electric-cyan group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M7 17L17 7M17 7H7M17 7v10"
                />
              </svg>
            </a>
            <a
              href="https://waf2p.dev/cloud/2025/11/25/waf-ein-neuer-ansatz/"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative bg-electric-cyan/[0.02] border border-white/[0.08] rounded-card p-7 hover:border-electric-cyan/30 hover:bg-electric-cyan/[0.04] transition-all duration-200"
            >
              <span className="font-mono text-[11px] tracking-[0.08em] text-electric-cyan/60 block mb-3 uppercase">
                Blog Article
              </span>
              <span className="block text-[1rem] font-display font-bold text-white mb-1 group-hover:text-electric-cyan transition-colors duration-200">
                WAF++ — A New Approach
              </span>
              <span className="font-mono text-[12px] text-grey-mid">
                waf2p.dev/cloud
              </span>
              <svg
                className="absolute bottom-7 right-7 w-4 h-4 text-electric-cyan/40 group-hover:text-electric-cyan group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M7 17L17 7M17 7H7M17 7v10"
                />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 border-t border-white/[0.06]">
        <div className="wrap text-center">
          <div className="flex gap-3 justify-center flex-wrap">
            <Link href="/en/diagnosis" className="btn btn-p">
              {t("cta")}
            </Link>
            <Link href={`/${locale}/#portfolio`} className="btn btn-g">
              {t("ctaSecondary")}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
