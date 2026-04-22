# MaCh2.Cloud — Project Instructions

## Brand Identity

- Name: MaCh2.Cloud
- Role: AI‑Native Cloud & Platform Architect for B2B SaaS
- Target: Series A–B SaaS companies — past early chaos, not yet enterprise
- Tone: Calm. Precise. Direct. No hype. No jargon. System-first.

## Brand Colors

- Deep Tech Blue: #0B1F3A (primary background, hero, footer)
- Electric Cyan: #00E5FF (accents, highlights, hover states)
- Graphite: #1A1A1A (body text, secondary backgrounds)
- White: #FFFFFF (content backgrounds, space)

## Typography

- Primary: Inter or IBM Plex Sans
- Mono accents: JetBrains Mono (technical elements only)
- Style: Minimalist. Technical. No decorative fonts.

## Design Reference

- Aesthetic: Stripe, Linear, Vercel, Supabase, OpenAI
- No gradients, no playful shapes, no marketing visuals
- Lots of whitespace, clean lines, structured layouts
- Architecture diagrams preferred over stock photos

## Hero Copy (locked — do not change)

- Eyebrow: AI‑Native Cloud & Platform Architect
- Headline line 1: You survived early chaos.
- Headline line 2: Now your architecture
- Headline line 3 (Electric Cyan #00E5FF): is the chaos.
- Subheadline: Series A and B SaaS companies move fast — until the foundation built to get there starts breaking under the weight of growth. I design AI‑Native Cloud & Platform Architectures that eliminate the technical debt compounding in your platform, so your engineering team ships faster instead of firefighting what already exists.
- Proof line: Architectures built to survive growth — not to be replaced by it.
- Primary CTA: Architecture Diagnosis
- Secondary CTA: See How It Works

## Stack

- Next.js / React
- Tailwind CSS with custom brand color tokens
- No external UI libraries unless strictly necessary
- Mobile responsive on all sections

## Brand Reference Files

Full brand strategy, ICP, value proposition, and product packages are in `/brand` — read before writing any copy or making positioning decisions.

- `/brand/selling-personal-brand.md` — identity, positioning, brand essence
- `/brand/selling-value-proposition.md` — differentiators, message themes, credibility
- `/brand/selling-icp.md` — ideal customer profile, buyer psychology, triggers
- `/brand/selling-Product-Packages.md` — 4 products and engagement philosophy
- `/brand/selling-personal-brand-colors.md` — full color system and usage rules
- `/brand/doing-positioning.md` — authority path, cert roadmap, WAF++ framework

## Site Content & Architecture

**Reference:** `docs/SITE-CONTENT-OUTLINE.md`

- Multi-locale routing: `app/[locale]/` with i18n via `next-intl`
- Content sources: `messages/*.json` (i18n), Notion API (blog), hardcoded (cases, WAF++)
- Homepage sections: modular components in `components/sections/`
- Navigation: multi-level routes (home, about, blog, cases, WAF++)

Consult this document before modifying site structure, routes, or content organization.

## SEO Workflow

- Runbook: `reports/seo/SEO-SUMMARY.md`
- Audit findings & fix plan: `docs/SOVP-AUDIT-FIXES.md`
- Checker script: `scripts/check-seo.mjs`
- Reports: `reports/seo/<ISO-timestamp>/`
- Baseline: `reports/seo/baseline/seo-baseline.json`
- Rule: do not create root-level SEO artifacts (`seo-snapshot.json`, `seo-report.json`, `seo-baseline.json`)
- Rule: if SEO paths change, update both `reports/seo/SEO-SUMMARY.md` and `README.md`
- Rule: sameAs URLs are the single source of truth in `lib/site-config.ts` under `SITE_CONFIG.seo` — do not hardcode them elsewhere

## Platform Compass Webhook Test

- Script: `scripts/test-compass-webhook.mjs`
- Target: `https://flow.mach2.cloud/webhook/compass`
- Purpose: validate end-to-end webhook processing with realistic payloads (answers + scoring + both HTML reports)

**Run after:** edits to `compassEngine.js`, `compassReports.js`, or `CompassTerminal.tsx` — and before any Compass deployment.

**Commands:**

- `node scripts/test-compass-webhook.mjs --dry-run` — all tiers, no HTTP call
- `node scripts/test-compass-webhook.mjs --tier fragile` — live, one tier
- `node scripts/test-compass-webhook.mjs` — live, all tiers

## Internationalization (next-intl)

- All user-facing text lives in `messages/en.json` (and other locale files)
- Rich text tags configured globally in `i18n/request.ts` via `defaultTranslationValues`
- Available tags: `<highlight>` (Electric Cyan text), `<strong>` (semibold white text)
- Rule: wrap styled words/phrases in these tags in the JSON
- Rule: use `t.rich('key')` for any field with rich text tags — plain `t()` will not render them

## Architectural Decision Records (ADRs)

ADRs live in [`docs/adr/`](docs/adr/). Use [`docs/adr/0000-template.md`](docs/adr/0000-template.md) as the starting point.

Broader architecture context lives in [`docs/MULTI-PROJECT-SETUP.md`](docs/MULTI-PROJECT-SETUP.md). Use that document for narrative system context and use ADRs for individual architecture decisions.

### When to write an ADR

Write a new ADR when a decision:

- Changes or establishes the overall architecture (routing, auth, storage, tenancy model)
- Chooses between technologies or platforms (e.g. Firebase vs Supabase)
- Establishes a pattern that all future code must follow (e.g. RLS on every table)
- Would be confusing or surprising to a new developer without context
- Explicitly rejects a reasonable alternative — document why

Do **not** write an ADR for:

- Implementation details (which component to use, how to name a variable)
- Bug fixes
- Decisions that are obvious from reading the code

### Numbering

Use the next available four-digit number: `0005-title.md`, `0006-title.md`, etc.

### Status values

- `proposed` — under discussion
- `accepted` — decided and active
- `deprecated` — no longer relevant
- `superseded by ADR-XXXX` — replaced by a newer decision

### Writing style

- Use the fixed template sections only: Title, Status, Date, Context, Decision, Consequences
- Keep the Decision section to one clear active-voice statement
- Use Consequences for trade-offs, constraints, and follow-up impact
- If useful, compare Option A vs Option B inside Context before stating the final decision
