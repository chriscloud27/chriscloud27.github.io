import { routing, type Locale } from "@/i18n/routing";
import { getGlobalSettings } from "@/lib/settings";

function withTrailingSlash(path: string): string {
  return path.endsWith("/") ? path : `${path}/`;
}

export function getBaseUrl(): string {
  const settings = getGlobalSettings(routing.defaultLocale);
  return (settings.siteUrl ?? "https://mach2.cloud").replace(/\/$/, "");
}

export function buildCanonical(path: string): string {
  if (path.startsWith("http")) return path;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${getBaseUrl()}${withTrailingSlash(normalized)}`;
}

export function buildI18nAlternates(routeKey: string): Record<string, string> {
  const normalizedRoute = routeKey === "/" ? "" : routeKey;

  const languages = routing.locales.reduce<Record<string, string>>(
    (acc, locale) => {
      acc[locale] = buildCanonical(`/${locale}${normalizedRoute}`);
      return acc;
    },
    {},
  );

  languages["x-default"] = buildCanonical(
    `/${routing.defaultLocale}${normalizedRoute}`,
  );

  return languages;
}

export function buildCanonicalAndAlternates(routeKey: string, locale: string) {
  const normalizedRoute = routeKey === "/" ? "" : routeKey;
  const safeLocale = routing.locales.includes(locale as Locale)
    ? (locale as Locale)
    : routing.defaultLocale;

  return {
    alternates: {
      canonical: buildCanonical(`/${safeLocale}${normalizedRoute}`),
      languages: buildI18nAlternates(routeKey),
    },
  };
}
