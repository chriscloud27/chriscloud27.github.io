import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { getGlobalSettings } from "@/lib/settings";
import { buildCanonical, buildCanonicalAndAlternates } from "@/lib/seo";
import { SITE_CONFIG } from "@/lib/site-config";
import { Providers } from "@/lib/providers";
import RevealObserver from "@/components/RevealObserver";
import Header from "@/components/layout/Header";
import Connect from "@/components/sections/Connect";
import Footer from "@/components/layout/Footer";
import CookieConsent from "@/components/CookieConsent";

// Google Consent Mode V2 defaults — all denied except security_storage.
// Must run before GTM so GA never fires without explicit consent.
const consentInitScript = `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('consent', 'default', {
  'ad_storage': 'denied',
  'analytics_storage': 'denied',
  'ad_user_data': 'denied',
  'ad_personalization': 'denied',
  'functionality_storage': 'denied',
  'personalization_storage': 'denied',
  'security_storage': 'granted',
  'wait_for_update': 500
});
document.addEventListener('mach2_consent_update', function(e) {
  var detail = e.detail || {};
  dataLayer.push({
    event: 'update_consent',
    analytics_storage: detail.analytics_storage,
    ad_storage: detail.ad_storage,
    ad_user_data: detail.ad_user_data,
    ad_personalization: detail.ad_personalization,
    functionality_storage: detail.functionality_storage,
    personalization_storage: detail.personalization_storage
  });
  gtag('consent', 'update', {
    'analytics_storage': detail.analytics_storage,
    'ad_storage': detail.ad_storage,
    'ad_user_data': detail.ad_user_data,
    'ad_personalization': detail.ad_personalization,
    'functionality_storage': detail.functionality_storage,
    'personalization_storage': detail.personalization_storage
  });
});
`.trim();

const gtmScript = `
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${SITE_CONFIG.gtmId}');
`.trim();

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const safeLocale = hasLocale(routing.locales, locale)
    ? locale
    : routing.defaultLocale;
  const settings = getGlobalSettings(safeLocale);
  const i18n = buildCanonicalAndAlternates("/", safeLocale);
  const ogImage = settings.defaultSeo?.shareImage;

  const ogImages = ogImage
    ? [
        {
          url: ogImage.url,
          width: ogImage.width,
          height: ogImage.height,
          alt: ogImage.alternativeText ?? settings.siteName,
        },
      ]
    : [
        {
          url: "/og/default.png",
          width: 1200,
          height: 627,
          alt: "MaCh2.Cloud — AI‑Native Cloud & Platform Architecture for Series A–B SaaS",
        },
      ];

  return {
    metadataBase: new URL(settings.siteUrl ?? "https://mach2.cloud"),
    title: {
      default: settings.defaultSeo?.metaTitle ?? settings.siteName,
      template: `%s | ${settings.siteName}`,
    },
    description:
      settings.defaultSeo?.metaDescription ?? settings.siteDescription,
    icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
    openGraph: {
      type: "website",
      url: buildCanonical(`/${safeLocale}`),
      siteName: settings.siteName,
      title: settings.defaultSeo?.metaTitle ?? settings.siteName,
      description:
        settings.defaultSeo?.metaDescription ?? settings.siteDescription,
      images: ogImages,
    },
    twitter: {
      card: "summary_large_image",
      title: settings.defaultSeo?.metaTitle ?? settings.siteName,
      description:
        settings.defaultSeo?.metaDescription ?? settings.siteDescription,
      images: [ogImages[0].url],
    },
    robots: { index: true, follow: true },
    ...i18n,
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();
  const settings = getGlobalSettings(locale);

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: settings.siteName,
    url: settings.siteUrl,
    description: settings.siteDescription,
    inLanguage: locale,
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: settings.siteName,
    url: settings.siteUrl,
    logo: buildCanonical("/img/mach2-logo-light.svg"),
  };

  return (
    <html lang={locale}>
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <head>
        {/* Security headers via meta — GitHub Pages does not support HTTP headers.
            X-Frame-Options, HSTS, and Permissions-Policy require a CDN (Cloudflare). */}
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta name="referrer" content="strict-origin-when-cross-origin" />
        <meta
          httpEquiv="Content-Security-Policy"
          content="default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://*.google-analytics.com https://www.googletagmanager.com https://flow.mach2.cloud; frame-src https://www.googletagmanager.com; object-src 'none';"
        />
        {/* Consent Mode V2 defaults must run before GTM */}
        <script dangerouslySetInnerHTML={{ __html: consentInitScript }} />
        {/* Google Tag Manager */}
        <script dangerouslySetInnerHTML={{ __html: gtmScript }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Space+Grotesk:wght@300;400;500&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${SITE_CONFIG.gtmId}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <NextIntlClientProvider messages={messages}>
          <Providers>
            <Header />
            {children}
            <Connect />
            <Footer />
            <RevealObserver />
            <CookieConsent />
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
