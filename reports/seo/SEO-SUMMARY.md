# SEO Summary

## Executive Summary

This site uses Next.js metadata APIs to generate canonical URLs, locale alternates, Open Graph/Twitter metadata, robots rules, and sitemap entries for static and dynamic pages. Keyword strategy is centralized in `lib/keywords.ts` and applied per route in each page's `generateMetadata()` function.

## Where To Add Keywords

- Global keyword sets: `lib/keywords.ts`
- Page-level assignment:
- Blog listing: `app/[locale]/blog/page.tsx` -> `keywords: BLOG_KEYWORDS`
- Blog article: `app/[locale]/blog/[slug]/page.tsx` -> merge post tags + `GLOBAL_KEYWORDS`
- Additional routes (home/about/waf2p/cases): set `keywords` inside each route's `generateMetadata()` return object.

## How Blog Article Keywords Are Set

In `app/[locale]/blog/[slug]/page.tsx`, article metadata keywords are built as:
`[...new Set([...post.tags, ...GLOBAL_KEYWORDS])]`

- `post.tags` come from Notion `Tags` multi-select in `lib/notion.ts`.
- `GLOBAL_KEYWORDS` are shared strategic terms from `lib/keywords.ts`.
- `Set` removes duplicates before output.

## How Sitemap Is Built

`app/sitemap.ts` generates entries by:

1. Iterating all locales from `i18n/routing.ts`
2. Adding static routes (`/`, `/about`, `/blog`, `/waf2p`)
3. Adding case-study slugs from `CASE_SLUGS`
4. Fetching dynamic blog slugs via `getBlogSlugs()`
5. Emitting canonical URLs via `buildCanonical()`
6. Setting `changeFrequency` and `priority` per route type

`export const dynamic = 'force-static'` ensures compatibility with static export mode.

## How It Works Is Noted

- Product/process "How It Works" section lives in: `components/sections/HowItWorksSection.tsx`
- Homepage structure guidance referencing "How It Works" lives in: `CLAUDE.md`
- Marketing text keys around workflow/process labels live in: `messages/en.json`

## How Search Engines Are Projected To React

Expected behavior:

- Production domain can be indexed and crawled (`robots.ts` allows `/` and provides sitemap).
- Preview or non-production hosts are blocked from indexing (`disallow: '/'`).
- Canonical plus hreflang alternates should reduce duplicate-content ambiguity across locales.
- Sitemap provides broad URL discovery for static and dynamic blog pages.
- Meta keywords are a weak ranking signal today; title, description, internal linking, content quality, and crawlability have higher impact.

## Security Precautions And Hints

- `robots.txt` is not access control; sensitive endpoints must be protected server-side.
- Keep private/admin paths out of sitemap.
- Continue blocking preview deployments from indexing.
- Validate that canonical host remains `https://mach2.cloud` to avoid host drift.
- Ensure structured data content is trusted and sanitized before injection.
- Avoid leaking secrets in metadata, JSON-LD, or static content.

## Further Recommendations

1. Keep this file updated whenever metadata, robots, sitemap, locales, or canonical logic changes.
2. Add a short "SEO architecture" section in `README.md` linking to this summary.
3. Add smoke checks for metadata generation, canonical tags, and sitemap URL coverage.
4. Add Google Search Console and Bing Webmaster verification and monitor index coverage.
5. Expand `Article` JSON-LD where possible (publisher URL, author URL, `sameAs`).
6. Maintain a keyword-to-page map to avoid cannibalization between blog and service pages.
7. Ensure all localized pages have reciprocal alternates and stable canonical patterns.

## Monitoring & Automated Checks

- Quick-check script: `scripts/check-seo.mjs` — a lightweight Node script that:
  - fetches URLs (from sitemap or explicit list),
  - validates presence of `title`, `meta[name="description"]`, `link[rel="canonical"]`, `meta[name="keywords"]`, Open Graph/Twitter tags and JSON-LD,
  - writes a timestamped snapshot and machine report under `reports/seo/<ISO-timestamp>/`,
  - can compare against an existing baseline `reports/seo/baseline/seo-baseline.json` to surface applied changes.

- Run locally (Node 18+):

  ```bash
  node scripts/check-seo.mjs --sitemap=https://mach2.cloud/sitemap.xml --max=40
  node scripts/check-seo.mjs --urls=https://mach2.cloud/,https://mach2.cloud/blog --baseline=reports/seo/baseline/seo-baseline.json
  node scripts/check-seo.mjs --sitemap=https://mach2.cloud/sitemap.xml --keywords-file=lib/keywords.ts
  ```

- How to accept a snapshot as baseline:

  ```bash
  cp reports/seo/<timestamp>/seo-snapshot.json reports/seo/baseline/seo-baseline.json
  ```

- CI recommendation: run `node scripts/check-seo.mjs` on PRs or nightly and upload the `reports/seo/<timestamp>/` folder as the artifact. For simpler automation, copy the latest run to `reports/seo/latest/` or maintain `reports/seo/baseline/` for the persistent baseline file.

- Interpreting the report: the human-readable output highlights `OK / WARN / ERROR` per URL, lists missing metadata, and shows diffs vs the baseline. The `seo-report.json` contains a machine-friendly summary useful for dashboards and alerts.

- Migration note: legacy root SEO JSON artifacts were moved to `reports/seo/migrated-root/`; new generated outputs should only be written under `reports/seo/`.
