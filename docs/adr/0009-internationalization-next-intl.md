Title: ADR-0009: Internationalization via next-intl with Always-Prefix Locale Routing

Status: accepted

Date: 2026-04-22

## Context

The site targets a multilingual audience (English, German, Spanish). Three i18n approaches were considered:

**Option A — Manual routing with `accept-language` middleware:** Custom middleware reads the `Accept-Language` header and redirects. Clean but incompatible with `output: "export"` (no middleware at runtime).

**Option B — next-intl with `localePrefix: "as-needed"`:** Hides the default locale from URLs (`/en/about` becomes `/about`). Simpler URLs but creates canonical URL ambiguity and complicates sitemap/hreflang generation.

**Option C — next-intl with `localePrefix: "always"`:** Every route is explicitly locale-prefixed (`/en/`, `/de/`, `/es/`). Unambiguous canonical URLs, clean hreflang alternates, and predictable sitemap generation. Required on static export since there is no runtime middleware to infer locale from the root path.

Because the deployment is a static export (ADR-0006), middleware-based locale detection is unavailable. A JavaScript redirect in the root `index.html` reads `navigator.language` at runtime and redirects to the matching locale prefix. A `<noscript>` meta-refresh fallback targets `/en/`.

## Decision

We use `next-intl` with `localePrefix: "always"` and three locales (`en`, `de`, `es`; default `en`). The root path performs a client-side browser-language redirect; all content routes are locale-prefixed.

## Consequences

- Every internal link must include the locale prefix — use `next-intl`'s `Link` and `usePathname` helpers, never bare `<a>` tags.
- Sitemap generation must enumerate all three locales × all routes, including blog slugs.
- Adding a fourth locale requires updating `i18n/routing.ts`, all `messages/*.json` files, and the browser-language redirect script.
- `localeDetection: true` in `routing.ts` enables next-intl's own negotiation on the server; the JS redirect handles the static-export edge case.
- New layouts and pages under `app/[locale]/` must use async function signatures and `await params` (Next.js 15 requirement) — `params: Promise<{ locale: string }>`.
