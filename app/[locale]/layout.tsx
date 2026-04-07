import type { Metadata } from "next";
import Script from "next/script";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { getGlobalSettings } from "@/lib/settings";
import { buildCanonical } from "@/lib/seo";
import { Providers } from "@/lib/providers";
import RevealObserver from "@/components/RevealObserver";
import Header from "@/components/layout/Header";
import Connect from "@/components/sections/Connect";
import Footer from "@/components/layout/Footer";

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
  const ogImage = settings.defaultSeo?.shareImage;

  // Fallback to default OG image
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
    icons: {
      icon: "/favicon.svg",
      shortcut: "/favicon.svg",
    },
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
    robots: {
      index: true,
      follow: true,
    },
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* brand: Syne (display), Space Grotesk (body), JetBrains Mono (labels/code) */}
        <link
          href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Space+Grotesk:wght@300;400;500&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
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
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XHTWQW1HMY"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XHTWQW1HMY');
          `}
        </Script>
        <NextIntlClientProvider messages={messages}>
          <Providers>
            <Header />
            {children}
            <Connect />
            <Footer />
            <RevealObserver />
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
