# GitHub Pages Migration - Completed ✅

## Build Status

✅ **Static export build successful** (24 pages generated)

## What Was Changed

### 1. Configuration Files

- ✅ **next.config.ts** - Added `output: 'export'`, `trailingSlash: true`, `images: { unoptimized: true }`
- ✅ **i18n/routing.ts** - Removed French locale (now: en, de, es)
- ✅ **package.json** - Added `"preview": "npx serve out"` script

### 2. Runtime Blockers Removed

- ✅ **middleware.ts** - Deleted (incompatible with static export)
- ✅ **app/api/** - Deleted entire directory (API routes incompatible)
- ✅ **messages/fr.json** - Deleted French translations

### 3. Pages Fixed for Static Export

All pages updated to pass `locale` via params instead of using headers:

- ✅ **app/[locale]/layout.tsx** - Fixed `getMessages({ locale })`
- ✅ **app/[locale]/blog/page.tsx** - Fixed getTranslations pattern
- ✅ **app/[locale]/blog/[slug]/page.tsx** - Fixed getTranslations pattern
- ✅ **app/[locale]/about/page.tsx** - Fixed getTranslations pattern
- ✅ **app/[locale]/cases/[slug]/page.tsx** - Fixed getTranslations pattern
- ✅ **app/[locale]/WAF++/page.tsx** - Fixed getTranslations pattern

### 4. Output Directory Structure

Generated files now live in `/out`:

```
out/
├── en/
│   ├── index.html
│   ├── about/index.html
│   ├── blog/index.html
│   ├── blog/[slug]/index.html
│   ├── cases/index.html
│   ├── cases/[slug]/index.html
│   └── WAF++/index.html
├── de/
│   └── (same structure)
├── es/
│   └── (same structure)
├── sitemap.xml
└── robots.txt
```

---

## Why This Matters

### Before (React Server Components + Headers)

- **Pages required a server** — you couldn't host on static GitHub Pages
- **Dynamic routing via middleware** — relied on runtime request headers
- **Next.js API routes** — needed backend, incompatible with static export

### After (Static Export)

- **Pure HTML + CSS + JS** — no server needed
- **Static routing** — all pages pre-generated at build time
- **GitHub Pages compatible** — deploy to any static CDN
- **Ultra-fast** — no server latency, full CDN caching

---

## Deployment Workflow

### Local Build

```bash
npm run build
# Output: /out (24 static HTML pages + assets)
```

### GitHub Pages Deploy

```bash
git push origin main
# GitHub Actions runs: npm run build
# Deploys /out to github.com/chriscloud27/chriscloud27.github.io
```

---

## Known Limitations of Static Export

✅ **Supported:**

- Static pages (all your routes)
- Dynamic routes via slug-based generation
- Locale switching (all locales pre-generated)
- Metadata APIs (SEO tags)
- Image optimization warnings are safe (images still load)

❌ **Not Supported (removed):**

- Server-side middleware
- API routes (`/api/*`)
- Server-only database queries
- Dynamic request headers

---

## Testing Locally

### Build & Preview

```bash
npm run build           # Generate /out
npm run preview         # Serve /out locally on http://localhost:3000
```

### Verify All Routes

Visit in browser:

- http://localhost:3000/en/
- http://localhost:3000/de/
- http://localhost:3000/en/blog/
- http://localhost:3000/en/cases/
- http://localhost:3000/en/WAF++/

All should render without errors.

---

## What Wasn't Changed

- ✅ **Blog system** — Still powered by Notion API (fetched at build time)
- ✅ **i18n** — Still using next-intl (messages pre-compiled into HTML)
- ✅ **SEO** — Metadata still in place (sitemap, robots, canonical, OG tags)
- ✅ **Components** — All React components work in static export mode
- ✅ **Styling** — Tailwind CSS works as expected

---

## Migration Date

**March 2026**

---

## Architecture Decisions & Constraints

Decisions made during and after the migration that are not obvious from the code.

### Locale redirect strategy

GitHub Pages has no server-side routing. The `/` root redirect to `/en/` is handled by a custom `out/index.html` injected during the build step (`.github/workflows/deploy.yml`). It uses client-side JS to detect `navigator.language` and redirect to the matching locale, with `/en/` as the default fallback.

### `vercel.json` is a legacy artifact

A `vercel.json` file exists at the repo root but is **not used** by the GitHub Pages deployment. The CI pipeline (`actions/deploy-pages@v4`) ignores it entirely. It was present before the migration and contains only a redirect rule that is superseded by the client-side locale detection above. It can be removed safely.

### Security headers cannot be set from this repo

GitHub Pages does not support custom HTTP response headers. Headers like `X-Frame-Options`, `Content-Security-Policy`, `Referrer-Policy`, and `Permissions-Policy` **cannot be injected** via any file in this repository. The only options are:

- **Cloudflare proxy** (recommended) — DNS change only; headers set in Cloudflare Transform Rules
- **`<meta http-equiv>` tags** — partial coverage; does not cover `X-Frame-Options`, `HSTS`, or `Permissions-Policy`

This is documented as the primary blocker in the SOVP audit (SICHERHEITS-HEADER: 14%). See `docs/SOVP-AUDIT-FIXES.md`.

### Images are not auto-converted to WebP

`images: { unoptimized: true }` is required for static export. Next.js image optimization runs server-side and is incompatible with `output: "export"`. Images must be pre-converted to WebP/AVIF manually before committing. The `next/image` component still provides lazy loading and correct sizing attributes.

### Cookie consent naming

The consent cookie is `mach2_consent` and the GTM dataLayer event is `mach2_consent_update`. Both are wired in `components/CookieConsent.tsx` and `app/[locale]/layout.tsx`. The old names (`fairup_consent`, `fairup_consent_update`) were renamed in April 2026 and must not be reintroduced.

### `overflow-x: clip` instead of `overflow-x: hidden`

`globals.css` uses `overflow-x: clip` on both `html` and `body` — not `hidden`. The distinction matters: `overflow-x: hidden` creates a **scroll container** on the body, which causes `position: fixed` elements (cookie banner, modals) to anchor to the body's scroll container rather than the true viewport. On mobile, when body content is wider than the viewport, fixed elements can appear off-screen. `overflow-x: clip` clips paint without creating a scroll container, so `position: fixed` always anchors to the real viewport. Changed April 2026.

### Cookie banner implementation constraints

`components/CookieConsent.tsx` uses three non-obvious techniques required for correct mobile behavior:

- `style={{ transform: "translateZ(0)" }}` — forces the element onto its own GPU compositing layer, ensuring `position: fixed` anchors to the visual viewport on mobile browsers
- `paddingBottom: "max(1rem, env(safe-area-inset-bottom))"` — prevents buttons from being hidden behind the iOS home indicator
- A full-viewport backdrop `div` (`fixed inset-0 z-[9998] pointer-events: none`) renders behind the banner to dim content and signal that a decision is required

The banner uses `z-[9999]` to guarantee it is always above all other page elements.

### Notion API is build-time only

The Notion API (`lib/notion.ts`) is called exclusively during `npm run export` to fetch blog posts. There is no runtime API access — the result is baked into static HTML. Secrets (`NOTION_TOKEN`, `NOTION_BLOG_DATABASE_ID`) are GitHub Actions secrets and are not available at runtime.
