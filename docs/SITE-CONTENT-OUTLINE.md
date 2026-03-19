# Site Content Architecture

## AI-Native Cloud Architecture for SaaS CTOs

**Target Audience:** SaaS CTOs, Technical Founders, VP Engineering  
**Conversion Goal:** Book a 30-minute architectural clarity call  
**Platform:** Next.js 14 + Next.intl (multi-locale, static export)  
**Tech Stack:** React 18, TypeScript, Tailwind CSS, Next.js App Router

---

## 🏗️ Current Site Structure

**Framework:** `app/[locale]/` directory structure with i18n routing  
**Locales:** English (en), German (de), Spanish (es)  
**Content:** Messages in `messages/en.json`, `messages/de.json`, `messages/es.json`  
**Styling:** Tailwind CSS with custom brand colors and component system

### URL Routes

| Route           | Component                            | Purpose                 | Content Source                         |
| --------------- | ------------------------------------ | ----------------------- | -------------------------------------- |
| `/`             | `app/[locale]/page.tsx`              | Homepage (all sections) | `messages/*.json` + component sections |
| `/about`        | `app/[locale]/about/page.tsx`        | About / Bio page        | `messages/*.json`                      |
| `/blog`         | `app/[locale]/blog/page.tsx`         | Blog listing            | `messages/*.json` + Notion DB          |
| `/blog/[slug]`  | `app/[locale]/blog/[slug]/page.tsx`  | Individual blog post    | Notion API (`lib/notion.ts`)           |
| `/cases`        | `app/[locale]/cases/page.tsx`        | Case studies            | Hardcoded case slugs + component       |
| `/cases/[slug]` | `app/[locale]/cases/[slug]/page.tsx` | Individual case study   | Hardcoded case details                 |
| `/waf2p`        | `app/[locale]/waf2p/page.tsx`        | WAF2p Framework         | Dedicated page component               |

---

## 📐 Homepage Section Architecture

**File:** `app/[locale]/page.tsx`  
**Components Location:** `components/sections/`

| Section          | Component                | Purpose                | Content Keys                        |
| ---------------- | ------------------------ | ---------------------- | ----------------------------------- |
| **Hero**         | `HeroSection.tsx`        | Hook + Value Prop      | `hero_headline`, `hero_subheadline` |
| **Problem**      | `ProblemSection.tsx`     | Pain Recognition       | `problem_*`                         |
| **How It Works** | `HowItWorksSection.tsx`  | Process Overview       | `how_it_works_*`                    |
| **Services**     | `ServicesSection.tsx`    | Offerings              | `service_*`                         |
| **Portfolio**    | `Portfolio.tsx`          | Case Studies / Results | `portfolio_*`                       |
| **Authority**    | `Authority.tsx`          | Trust & Credentials    | `authority_*`                       |
| **Credibility**  | `CredibilitySection.tsx` | Stats & Social Proof   | `credibility_*`                     |
| **CTA**          | `CtaSection.tsx`         | Final Conversion       | `cta_heading`, `cta_description`    |

**Layout Components:**

- `Header.tsx` — Sticky navigation with locale switcher
- `Nav.tsx` — Desktop navigation links
- `MobileNav.tsx` — Mobile hamburger menu
- `Footer.tsx` — Footer with links and info

---

## 📝 Navigation & Layout

**Header (Sticky):**

- MaCh2.Cloud logo (left)
- Nav links: Home → About → Blog → Cases → WAF2p
- Locale switcher (en/de/es)
- CTA button: "Book Clarity Call" (Calendly link)

**Mobile:**

- Hamburger menu with slide-out navigation
- CTA button remains visible/accessible
- Locale switcher in mobile menu

---

## 🗂️ Content Organization

### Messages (i18n) — `messages/*.json`

International content organized by locale:

- `messages/en.json` — English
- `messages/de.json` — German
- `messages/es.json` — Spanish

Content keys structured by component/section:

```json
{
  "hero_headline": "...",
  "hero_subheadline": "...",
  "problem_title": "...",
  "service_1_title": "...",
  "authority_heading": "..."
}
```

**Rich text support:**

- Tags: `<highlight>` (Electric Cyan), `<strong>` (bold white)
- Usage: Wrap styled phrases in JSON, render with `t.rich('key')` (not plain `t()`)
- Config: Configured globally in `i18n/request.ts` via `defaultTranslationValues`

### Blog System

**Source:** Notion database  
**Location:** `lib/notion.ts` (API functions)  
**Rendering:** `app/[locale]/blog/[slug]/page.tsx` fetches and renders post HTML

**Metadata:**

- Title, slug, publication date, tags (from Notion multi-select)
- Keywords: Merged from `post.tags` + `GLOBAL_KEYWORDS` (lib/keywords.ts)
- Deduplication: `[...new Set([...post.tags, ...GLOBAL_KEYWORDS])]`

**Dynamic blog URLs:** Fetched via `getBlogSlugs()` function for sitemap generation

### Case Studies

**Location:** Hardcoded case metadata  
**Currently:** 4 case studies (Capgemini K8s, AWS Autonomous Driving, Enterprise SaaS Optimization, BaaS Seed Startup)  
**Component:** `app/[locale]/cases/[slug]/page.tsx` (renders case details)  
**Fallback:** Static HTML at `public/cases/case-*.html` (for compatibility)

### WAF2p Framework

**File:** `app/[locale]/waf2p/page.tsx`  
**Purpose:** Dedicated framework explainer page (separate from homepage)  
**Content:** Framework methodology, steps, components, visual walkthrough

---

## 🎨 Brand & Design

**Colors:** Defined in `CLAUDE.md` and Tailwind config

- Deep Tech Blue: `#0B1F3A` (primary background)
- Electric Cyan: `#00E5FF` (accents, highlights)
- Graphite: `#1A1A1A` (body text)
- White: `#FFFFFF` (content backgrounds)

**Typography:**

- Primary: Inter or IBM Plex Sans
- Mono accents: JetBrains Mono
- Style: Minimalist, technical, no decorative fonts

**Design Reference:** Stripe, Linear, Vercel, Supabase  
(Clean lines, lots of whitespace, structured layouts, no gratuitous gradients)

---

## 🔍 SEO & Metadata

**Canonical SEO docs:** See [README.md § SEO & Content](../README.md#-seo--content)

**Key files:**

- `lib/keywords.ts` — Centralized keyword sets (GLOBAL, BLOG, etc.)
- `lib/seo.ts` — SEO helper functions
- `app/sitemap.ts` — Sitemap generation (all locales, routes, blogs)
- `app/robots.ts` — robots.txt rules (production vs preview)
- `scripts/check-seo.mjs` — Metadata validation script
- Reports: `reports/seo/` (baseline, timestamped runs, legacy artifacts)

---

## 📊 Content Mapping (Deprecated → Current)

**Old GitHub Pages approach:**

- Standalone HTML/CSS/JS files
- Single-page focus
- Content in Markdown files in `content/input files/`

**Current Next.js approach:**

- Multi-locale, dynamic routing
- Component-driven sections
- Content in `messages/*.json` (i18n) + Notion (blog) + code (cases, waf2p)
- Styling: Tailwind CSS via `components/` and `app/globals.css`

---

## ✅ Content Update Workflow

When updating site content:

1. **Homepage sections:** Edit corresponding key(s) in `messages/en.json` (and de.json, es.json for translations)
2. **Blog:** Add/edit posts directly in Notion (title, slug, tags, content)
3. **Case studies:** Update hardcoded case data or component logic in `cases/[slug]/`
4. **Brand colors/fonts:** Update Tailwind config and component styling
5. **Navigation:** Update `i18n/routing.ts` and `Header.tsx` / `Nav.tsx` if adding new routes
6. **Keywords:** Add global or section-specific keywords to `lib/keywords.ts`

**After content updates:**

- Run `npm run build` to test static export
- Run `node scripts/check-seo.mjs --max=20` to validate metadata
- Commit to feature branch and push to PR

---

## 🚀 Deployment

**Platform:** GitHub Pages (via GitHub Actions)  
**Build:** `npm run build` → Static HTML export (Next.js static export mode)  
**Source:** Pushes to `main` branch trigger deployment

See `.github/workflows/` for CI/CD configuration.

---

## 💡 File Structure Reference

```
app/
├── [locale]/
│   ├── page.tsx                 # Homepage
│   ├── layout.tsx               # Locale layout wrapper
│   ├── about/page.tsx           # About page
│   ├── blog/
│   │   ├── page.tsx             # Blog listing
│   │   └── [slug]/page.tsx      # Individual blog post
│   ├── cases/
│   │   ├── page.tsx             # Cases listing
│   │   └── [slug]/page.tsx      # Individual case
│   └── waf2p/page.tsx           # WAF2p framework page
├── layout.tsx                    # Root layout
├── robots.ts                     # robots.txt generation
└── sitemap.ts                    # Sitemap generation

components/
├── sections/                      # Homepage sections
│   ├── HeroSection.tsx
│   ├── ProblemSection.tsx
│   ├── HowItWorksSection.tsx
│   ├── ServicesSection.tsx
│   ├── Portfolio.tsx
│   ├── Authority.tsx
│   ├── CredibilitySection.tsx
│   └── CtaSection.tsx
├── layout/
│   ├── Header.tsx
│   ├── Nav.tsx
│   ├── MobileNav.tsx
│   └── Footer.tsx
├── ui/                           # Reusable UI components
│   ├── button.tsx
│   ├── input.tsx
│   ├── label.tsx
│   ├── textarea.tsx
│   └── badge.tsx
└── ContactForm.tsx

messages/
├── en.json                        # English content keys
├── de.json                        # German content keys
└── es.json                        # Spanish content keys

lib/
├── keywords.ts                    # SEO keyword sets
├── seo.ts                         # SEO helper functions
├── notion.ts                      # Notion API integration
├── providers.tsx                  # React context providers
├── utils.ts                       # Utility functions
└── settings.ts                    # Config & constants

i18n/
├── request.ts                     # i18n config + rich text setup
└── routing.ts                     # Locale routing config

public/
├── cases/                         # Static HTML fallbacks
└── img/                           # Images & assets

scripts/
└── check-seo.mjs                  # SEO metadata checker

reports/
└── seo/                           # SEO reports & baseline
    ├── baseline/seo-baseline.json
    ├── <ISO-timestamp>/           # Timestamped runs
    ├── migrated-root/             # Legacy artifacts
    └── SEO-SUMMARY.md             # SEO canonical docs
```

---

## 🎯 Next Steps for Content Updates

- [ ] Validate content keys in `messages/en.json` match component bindings
- [ ] Review homepage section CTAs align with Calendly booking link
- [ ] Ensure blog articles are tagged consistently in Notion
- [ ] Test multi-locale rendering (en/de/es) for all pages
- [ ] Validate SEO metadata across all routes via `check-seo.mjs`
- [ ] Monitor blog engagement and refine keyword strategy in `lib/keywords.ts`

---

**Last Updated:** March 2026  
**Status:** Current — Next.js 14 + Next.intl architecture  
**Ownership:** Site architecture and content strategy documentation

This document is referenced by `CLAUDE.md` and should be consulted when making structural or content changes to the site.
