# MaCh2.Cloud Assets Map
*Repo: chriscloud27.github.io — no external DAM; everything lives in this repository.*

---

## Primary Sources

| What | Path |
|---|---|
| Full Brand Book (v1.0, March 2026) | `content/output files/MaCh2_BrandBook.html` |
| Brand strategy raw material (identity, ICP, value prop, product packages) | `content/input files/selling-*.md` |
| Positioning / authority roadmap | `content/input files/doing-positioning.md` |
| Locked hero copy, brand colours, typography, workflow rules | `CLAUDE.md` (project root) |
| Site structure & content architecture | `docs/SITE-CONTENT-OUTLINE.md` |

Note: `CLAUDE.md` references a `/brand` directory for these files — the files actually live under `content/input files/`. Flag this if asked to fix stale paths.

---

## Design Tokens in Code

| What | Path |
|---|---|
| Font setup (Syne, Space Grotesk, JetBrains Mono) | `app/[locale]/layout.tsx`, `app/slides/layout.tsx` |
| Colour/spacing/radius tokens (extended palette, source of truth) | `tailwind.config.js` |
| Global CSS / CSS custom properties | `app/globals.css` |
| Site-wide config (SEO, `sameAs` URLs — single source of truth) | `lib/site-config.ts` |
| Logo assets (dark/light/favicon) | `public/img/mach2-logo-dark.svg`, `mach2-logo-light.svg`, `mach2-favicon.svg` |

**Note**: `tailwind.config.js`/`app/globals.css` define a larger colour palette (9 brand tokens + error/success) than the BrandBook's official "4 colours" — see `brand-basics.md` for the full extended list. Treat the code as authoritative for what's already shipped; treat the BrandBook as authoritative for new marketing/narrative material.

**Rule** (from `CLAUDE.md`): `sameAs` URLs live only in `lib/site-config.ts` under `SITE_CONFIG.seo` — never hardcode them elsewhere.

---

## i18n / Copy

| What | Path |
|---|---|
| English strings | `messages/en.json` |
| Other locales | `messages/*.json` |
| Rich-text tag definitions (`<highlight>`, `<strong>`) | `i18n/request.ts` |

Use `t.rich('key')` for any copy containing `<highlight>`/`<strong>` — plain `t()` will not render the tags.

---

## Quick "Where Do I Find…?" Reference

| I need… | Go to |
|---|---|
| Exact colour/type values | `knowledge/brand-basics.md` in this skill, or BrandBook Chapters 04–05 |
| Tone/voice rules, key messages | `knowledge/brand-voice.md`, or BrandBook Chapters 07–08, 14 |
| Logo spec | `knowledge/logo-usage.md`, or BrandBook Chapter 03 |
| Spacing/grid/imagery rules | `knowledge/visual-style.md`, or BrandBook Chapter 06, 13–14 |
| Which component/pattern for a content type | `knowledge/templates-overview.md` |
| ICP / product portfolio detail | `content/input files/selling-icp.md`, `selling-Product-Packages.md` |
| Site routing/structure before adding pages | `docs/SITE-CONTENT-OUTLINE.md` |
| SEO rules and reports | `reports/seo/SEO-SUMMARY.md`, `docs/SOVP-AUDIT-FIXES.md` (per `CLAUDE.md`) |
