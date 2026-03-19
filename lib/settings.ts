import { routing, type Locale } from "@/i18n/routing";

export interface GlobalSettings {
  siteName: string;
  siteDescription?: string;
  siteUrl?: string;
  defaultSeo?: {
    metaTitle: string;
    metaDescription: string;
    shareImage?: {
      url: string;
      width: number;
      height: number;
      alternativeText?: string;
    };
  };
}

const BASE_SETTINGS: GlobalSettings = {
  siteName: "MaCh2.Cloud",
  siteDescription:
    "AI-native cloud architecture for B2B SaaS teams scaling from early traction to enterprise-grade reliability.",
  siteUrl: "https://mach2.cloud",
  defaultSeo: {
    metaTitle: "MaCh2.Cloud — AI-Native Cloud Architect",
    metaDescription:
      "AI-native cloud architecture for Series A-B SaaS teams: production-ready platforms, cost control, and faster delivery without rewrites.",
    shareImage: {
      url: "/img/LinkedIn-banner.jpg",
      width: 1200,
      height: 630,
      alternativeText: "MaCh2.Cloud — AI-Native Cloud Architect",
    },
  },
};

const LOCALE_OVERRIDES: Partial<Record<Locale, Partial<GlobalSettings>>> = {
  en: {},
  de: {},
  es: {},
};

export function getGlobalSettings(locale: string): GlobalSettings {
  const safeLocale = routing.locales.includes(locale as Locale)
    ? (locale as Locale)
    : routing.defaultLocale;

  const override = LOCALE_OVERRIDES[safeLocale];
  const baseSeo = BASE_SETTINGS.defaultSeo;
  const overrideSeo = override?.defaultSeo;

  return {
    ...BASE_SETTINGS,
    ...override,
    defaultSeo: {
      metaTitle:
        overrideSeo?.metaTitle ?? baseSeo?.metaTitle ?? BASE_SETTINGS.siteName,
      metaDescription:
        overrideSeo?.metaDescription ??
        baseSeo?.metaDescription ??
        BASE_SETTINGS.siteDescription ??
        "",
      shareImage: overrideSeo?.shareImage ?? baseSeo?.shareImage,
    },
  };
}
