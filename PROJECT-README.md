**PROJECT README**

# SEO & Content

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

## Platform Compass Security

The Platform Compass (`/[locale]/compass`) is an interactive terminal-based assessment. It collects 14 scored answers across 5 WAF2p pillars and returns a personalized readiness tier. The scoring and tier logic are company IP and must not be exposed in the client JS bundle.

### Client / server split

| Layer                                                 | What lives here                                                                                                     | Rationale                             |
| ----------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- | ------------------------------------- |
| **Client** (`components/compass/CompassTerminal.tsx`) | Questions, hints, answer labels, UI state machine, input validation                                                 | Visible to users — acceptable         |
| **Server** (`app/api/compass/score/route.ts`)         | `toNum()`, `stageWeight()`, `calcResults()`, tier thresholds (`≤2.2`, `≤3.5`), tier labels/messages/recommendations | Company IP — never shipped to browser |

### Request flow

1. Terminal collects all answers into an `answers` object (client memory only)
2. On final submit, `showDone()` POSTs `{ ...answers }` to `/api/compass/score`
3. Server validates the payload shape, runs scoring, returns `{ tier, label, message, recommendation, highGap, lowSov, aiLevel, aiInfra }`
4. Terminal renders the result — no raw scores or thresholds are ever returned to the client

### Security notes

- **No auth** on the endpoint — it is intentionally public (assessment tool)
- **Server-side validation** rejects payloads missing any of q1–q14 or with an invalid stage value (400 response)
- **XSS:** terminal output uses `textContent` exclusively — user input cannot inject HTML
- **No persistence** — answers exist only in browser memory during the session; nothing is stored server-side by this route (report delivery is handled separately out-of-band)
- If rate limiting becomes necessary, add it at the Cloudflare/middleware layer — do not add it to the route handler itself

---

## Pre-Commit Checks

The `.husky/pre-commit` hook runs the following checks **in order**:

1. **Prettier formatting** — Auto-fixes without prompts, stages changes
2. **TypeScript type check** — Validates types with `tsc --noEmit`
3. **Dependency audit** — Checks for security vulnerabilities
4. **Spellcheck** — Validates spelling in docs and content
5. **Build verification** — Runs full `npm run build`

### When commits FAIL (abort):

- ❌ **TypeScript type errors** — `tsc --noEmit` finds issues
- ❌ **Build failure** — `npm run build` fails

### When commits PASS with WARNINGS (non-blocking):

- ⚠️ **Prettier auto-fix fails** — Logs warning but continues
- ⚠️ **Dependency audit issues** — Logs warning but continues
- ⚠️ **Spellcheck failures** — Logs but never blocks (`|| true`)

### Skipped checks:

- ~~**lint-staged**~~ — Disabled to reduce friction

### Notes:

- **No interactive prompts** — All checks run silently, output to console
- **Spellcheck:** `npx cspell \"content/**\" \"docs/**\" || true`
- **Audit level:** Moderate (`--audit-level=moderate`)
- **Build:** Full Next.js build with all validation included
