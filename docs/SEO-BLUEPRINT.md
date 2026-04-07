# SEO Setup Blueprint (Copy to Another Project)

This setup uses native Next.js App Router SEO with metadata APIs and custom helpers.

## 1. Installation

No dedicated SEO package is required.

Required:
- `next` (App Router)

Optional for multilingual SEO:
- `next-intl`

## 2. Core Architecture

Implement SEO in these layers:

1. Global SEO config (titles, descriptions, site URL)
2. Canonical and hreflang helper utilities
3. Layout-level metadata via `generateMetadata`
4. Page-level metadata via `generateMetadata`
5. JSON-LD structured data
6. Technical SEO routes (`sitemap.ts`, `robots.ts`)

## 3. Global SEO Config

Create `src/lib/settings.ts` (or equivalent) with locale-aware defaults:
- `siteName`
- `siteDescription`
- `siteUrl`
- `defaultSeo.metaTitle`
- `defaultSeo.metaDescription`
- optional share image

Example shape:

```ts
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
```

## 4. Canonical and hreflang Helpers

Create `src/lib/seo.ts` with:
- `getBaseUrl()`
- `buildCanonical(path)`
- `buildI18nAlternates(routeKey)`
- `buildCanonicalAndAlternates(routeKey)`

Minimal example:

```ts
export function getBaseUrl() {
  return "https://example.com";
}

export function buildCanonical(path: string) {
  if (path.startsWith("http")) return path;
  return getBaseUrl().replace(/\/$/, "") + (path.startsWith("/") ? path : `/${path}`);
}

export function buildCanonicalAndAlternates(routeKey: string) {
  const languages = {
    en: buildCanonical(`/en${routeKey === "/" ? "" : routeKey}`),
    de: buildCanonical(`/de${routeKey === "/" ? "" : routeKey}`),
    "x-default": buildCanonical(`/en${routeKey === "/" ? "" : routeKey}`)
  };

  return {
    alternates: {
      canonical: languages.en,
      languages
    }
  };
}
```

## 5. Layout-Level Metadata (Global)

In `src/app/[locale]/layout.tsx`:
- add `generateMetadata(...)`
- load global settings
- set defaults (`title`, `description`, icons, OG image)
- merge canonical and hreflang
- inject site JSON-LD

Example:

```ts
export async function generateMetadata({ params }) {
  const { locale } = await params;
  const settings = await getGlobalSettings(locale);
  const i18n = buildCanonicalAndAlternates("/");

  return {
    title: settings.defaultSeo?.metaTitle ?? settings.siteName,
    description: settings.defaultSeo?.metaDescription,
    ...i18n
  };
}
```

## 6. Page-Level Metadata

Add `generateMetadata` on key pages:
- home
- blog listing
- blog details
- pricing/contact/about

Include:
- page title and description
- Open Graph
- Twitter
- canonical and hreflang

For blog detail pages:
- canonical must include locale and slug
- use `openGraph.type = 'article'`
- include content fallbacks

## 7. JSON-LD Structured Data

Inject JSON-LD via script tags:

```tsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaObject) }}
/>
```

Recommended schemas:
- `WebSite`
- `Organization` or `SoftwareApplication`
- `Article`
- `BreadcrumbList`
- `FAQPage` (if applicable)

## 8. Technical SEO Routes

Create:
- `src/app/sitemap.ts`
- `src/app/robots.ts`

Sitemap:
- include static and dynamic URLs
- set `lastModified`, `changeFrequency`, `priority`

Robots:
- allow production domain crawling
- block staging/dev/preview
- disallow internal paths (`/api`, admin/private)
- include sitemap URL

## 9. i18n Route Mapping

Centralize localized pathnames (for example `src/i18n/routing.ts`) to keep canonical and hreflang consistent with real routes.

## 10. On-Page SEO Rules

Per page:
- one clear `h1`
- descriptive image `alt` text
- internal links to key conversion pages
- metadata matches page intent and keywords

## 11. Validation Checklist

1. Verify canonical tags
2. Verify hreflang alternates
3. Validate `/sitemap.xml`
4. Validate `/robots.txt`
5. Test JSON-LD in Google Rich Results Test
6. Check SERP snippet lengths
7. Verify social previews (Open Graph/Twitter)

## 12. Quick Copy Checklist

- [ ] Add locale SEO defaults (`settings.ts`)
- [ ] Add SEO helper (`seo.ts`)
- [ ] Add layout `generateMetadata`
- [ ] Add page `generateMetadata`
- [ ] Add JSON-LD scripts
- [ ] Add `sitemap.ts` and `robots.ts`
- [ ] Validate with Google tools and Search Console
