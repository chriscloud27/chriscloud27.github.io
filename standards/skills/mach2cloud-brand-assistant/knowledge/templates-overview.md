# MaCh2.Cloud Templates & Content Mapping
*Source: `content/output files/MaCh2_BrandBook.html` v1.0, March 2026 (Chapters 09, 11–13) + repo structure*

This repo has no DAM/CELUM-style asset library — "templates" here means existing components/patterns to reuse, and content categories to map new copy into.

---

## Website

| Content type | Where it lives |
|---|---|
| Section components | `components/sections/*` |
| Copy strings | `messages/en.json` (+ other locale files) — use `t.rich('key')` for text with `<highlight>`/`<strong>` tags, never plain `t()` for rich text |
| Rich-text tag styling | Defined globally in `i18n/request.ts` via `defaultTranslationValues` |
| Hero copy (locked) | See `CLAUDE.md` "Hero Copy" section — do not change without explicit instruction |
| Site structure / routes | `docs/SITE-CONTENT-OUTLINE.md` — consult before adding routes or reorganizing content |

Layout: Hero uses Pitch 01 (Deep Blue background), 12-col/80px gutters/1440px max grid, Syne + Space Grotesk + JetBrains Mono.

## Proposals & Slides

- Layout root: `app/slides/layout.tsx`
- Cover: Deep Tech Blue background, dark-variant logo
- Body slides: White background, Graphite body text
- Accents: Electric Cyan for highlights only — never as a dominant fill
- Opening line for proposal-style decks: BrandBook Pitch 06 ("Proposal Document")

## LinkedIn

| Element | Spec |
|---|---|
| Banner | Deep Tech Blue background + Electric Cyan accent |
| Headline | 160-char pitch (BrandBook Pitch 02) |
| About section opening | BrandBook Pitch 03 |
| Posts | Map each post to one of the 5 Content Pillars below |

## Blog / Long-form Content — Content Pillars

Every piece of content should map to one pillar:

1. **AI-Native Architecture** — inference at scale, latency vs. cost tradeoffs, data pipelines, scaling AI beyond prototype
2. **Cloud Cost Architecture** — cost visibility as design, preventing cost drift, aligning infra with revenue
3. **Scalable Platform Foundations** — platform engineering principles, automation-driven infra, internal developer experience
4. **Reliability by Design** — designing for failure, production resilience, observability, eliminating bottlenecks
5. **Architecture & Growth Alignment** — engineering vs. system structure, when to evolve architecture, avoiding premature complexity

Signature framework to reference where relevant: **WAF++** (open-source Well-Architected Framework extension).

---

## Product Portfolio (for product/service copy)

Progression: **Audit → Blueprint → Enablement → Fractional**

| Product | Focus |
|---|---|
| 01 — Architecture Audit | Diagnostic: architecture assessment, risk evaluation, improvement roadmap |
| 02 — Architecture Blueprint | Design: architecture diagrams, platform blueprint, cost optimization strategy, implementation roadmap |
| 03 — Architecture Enablement & Engineering Guidance | Reviews, hands-on support, enablement sessions |
| 04 — Fractional AI-Native Cloud & Platform Architect | Ongoing leadership, architecture reviews, platform evolution |

## Ideal Customer Profile (for audience calibration)

Series A–B SaaS, 10–80 engineers / 20–300 total employees, past the build-fast phase and confronting its architectural cost. Buyers: CTO, Technical Co-Founder, VP Engineering, Head of Platform. See `content/input files/selling-icp.md` for full detail.
