# 🔎 SEO & Content
> Find the `/reports/seo/SEO-SUMMARY.md` for more details.

This site uses **Next.js metadata APIs** to generate canonical URLs, locale alternates (hreflang), Open Graph/Twitter cards, robots rules, and sitemaps for static and dynamic pages.

## Strategy

Keyword strategy is centralized in `lib/keywords.ts` and applied per route:

- **Global keywords**: `lib/keywords.ts`
- **Page-level keywords**: Each route's `generateMetadata()` function
  - Blog listing: `app/[locale]/blog/page.tsx` → `keywords: BLOG_KEYWORDS`
  - Blog articles: `app/[locale]/blog/[slug]/page.tsx` → merge post tags + `GLOBAL_KEYWORDS`
  - Other routes (home/about/waf2p/cases): set `keywords` in each route's metadata
- **Blog article deduplication**: Keywords are built as `[...new Set([...post.tags, ...GLOBAL_KEYWORDS])]` to avoid duplicates

## Tools & Workflows

**Quick-check script**: `scripts/check-seo.mjs` (Node 18+)  
Lightweight checker that fetches URLs, validates metadata presence (title, description, canonical, keywords, OG/Twitter tags, JSON-LD), and generates reports.

**Run locally:**
```bash
# Check entire sitemap
node scripts/check-seo.mjs --sitemap=https://mach2.cloud/sitemap.xml --max=40

# Check specific URLs with baseline comparison
node scripts/check-seo.mjs --urls=https://mach2.cloud/,https://mach2.cloud/blog \
  --baseline=reports/seo/baseline/seo-baseline.json

# Include keyword file reference
node scripts/check-seo.mjs --sitemap=https://mach2.cloud/sitemap.xml --keywords-file=lib/keywords.ts
```

**Set new baseline after review:**
```bash
cp reports/seo/<timestamp>/seo-snapshot.json reports/seo/baseline/seo-baseline.json
```

**CI integration** (recommended):  
Run script on PRs or nightly; save `reports/seo/<timestamp>/` as artifact for audit trail. Baseline is persistent at `reports/seo/baseline/seo-baseline.json`.

## Reporting

Output includes:
- **Human-readable summary**: `OK / WARN / ERROR` per URL, missing metadata, diffs vs baseline
- **Machine report**: `seo-report.json` with structured metadata for dashboards and alerts
- **Snapshot**: `seo-snapshot.json` with full metadata snapshot for baseline updates or diffs

**Output locations:**
- Timestamped runs: `reports/seo/<ISO-timestamp>/seo-snapshot.json` and `seo-report.json`
- Active baseline: `reports/seo/baseline/seo-baseline.json`
- Legacy artifacts: `reports/seo/migrated-root/` (historical reference)

## File Structure

```
reports/seo/
├── baseline/                              # Persistent baseline for comparisons
│   └── seo-baseline.json
├── <ISO-timestamp>/                       # Timestamped run outputs (multiple)
│   ├── seo-snapshot.json                 # Full metadata snapshot
│   └── seo-report.json                   # Structured report with diffs
├── migrated-root/                         # Legacy root artifacts (archived)
│   ├── seo-baseline.json
│   ├── seo-snapshot.json
│   ├── seo-report.json
│   └── scripts/                           # Old script artifacts
└── SEO-SUMMARY.md                         # Canonical SEO documentation
```

## Further Notes

- **Sitemap generation**: `app/sitemap.ts` iterates locales, adds static routes, fetches dynamic blog slugs via `getBlogSlugs()`, and emits canonical URLs with `changeFrequency` and `priority` per route type
- **Robots rules**: Production domain indexed; preview/non-production blocked
- **Security**: `robots.txt` is not access control; sensitive endpoints must be protected server-side; avoid leaking secrets in metadata or JSON-LD
- **Canonical stability**: Maintain `https://mach2.cloud` as canonical host to avoid drift
- **Documentation**: Update this section + `reports/seo/SEO-SUMMARY.md` when metadata, robots, sitemap, or canonical logic changes

---
