Title: ADR-0012: SEO and Structured Data Sourced Exclusively from SITE_CONFIG

Status: accepted

Date: 2026-04-22

## Context

The site requires consistent structured data (schema.org `Person`, `Organization`, `WebSite`), canonical URLs, OG image references, and `sameAs` social profile URLs across all locales and all pages. Without a central source of truth, these values risk diverging across layout files, individual page metadata, and structured data scripts.

Two approaches were considered:

**Option A — Per-page metadata declarations:** Each page and layout declares its own canonical URL, OG values, and schema.org JSON-LD independently. Flexible but produces duplication and drift — a social profile URL change requires hunting down every occurrence.

**Option B — Single config object as source of truth:** All canonical SEO values live in one exported constant (`SITE_CONFIG` in `lib/site-config.ts`). Layouts and metadata builders (`lib/seo.ts`) derive all values from this object. No URL or identity value is hardcoded outside this file.

The site is a personal brand with stable identity data (name, job title, social profiles, logo) that changes rarely but must be consistent everywhere. Option B eliminates the class of bugs where `sameAs` URLs are partially updated.

## Decision

All canonical SEO values — site URL, person identity, organization identity, social profile URLs (`sameAs`), consent cookie names, and GTM ID — are declared once in `SITE_CONFIG` in `lib/site-config.ts`. All metadata generation, schema.org JSON-LD, and structured data scripts must read from this config; no hardcoding elsewhere.

## Consequences

- Adding or changing a social profile URL requires one edit in `lib/site-config.ts` — it propagates automatically to all schema.org output, OG tags, and canonical links.
- `lib/seo.ts` functions are the only place that should translate `SITE_CONFIG` values into Next.js `Metadata` objects or JSON-LD strings.
- Locale-specific canonical URLs are derived by combining `SITE_CONFIG.seo.siteUrl` with the locale prefix — do not hardcode locale-specific canonical URLs in page files.
- `SITE_CONFIG.gtmId` is the single GTM container reference — do not duplicate it in environment variables or inline scripts.
- `SITE_CONFIG.seo.consent.eventName` is the contract between `app/[locale]/layout.tsx` (consent mode script) and `components/CookieConsent.tsx` (event dispatch) — changing it requires updating both files simultaneously.
