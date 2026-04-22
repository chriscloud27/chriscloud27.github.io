# ADR Index

This folder is the canonical home for Architecture Decision Records (ADRs) in this repo.

## Purpose

Use ADRs for decision-level architecture records only. Each ADR captures one decision that affects the repo's architecture, core platform choices, or repo-wide patterns.

Use [`0000-template.md`](0000-template.md) as the starting point for every new ADR.

Broader architecture narrative belongs in [`../MULTI-PROJECT-SETUP.md`](../MULTI-PROJECT-SETUP.md). Use that document for system context that spans multiple decisions.

## When to write an ADR

Write an ADR when a decision:

- Changes or establishes the overall architecture
- Chooses between major technologies or platforms
- Establishes a pattern that future code must follow repo-wide
- Rejects a plausible alternative that needs to stay documented
- Would be confusing or surprising to a new contributor without context

Do not write an ADR for:

- Implementation details
- Bug fixes
- Obvious code-level decisions

## Numbering and status

- Use the next available four-digit number: `0001-...`, `0002-...`, `0003-...`
- Keep one file per decision
- Use one of these status values only: `proposed`, `accepted`, `deprecated`, `superseded by ADR-XXXX`
- Cross-reference related ADRs when one decision depends on another

## Writing rules

- Keep the structure fixed: Title, Status, Date, Context, Decision, Consequences
- Make the Decision section one clear statement in active voice
- Put trade-offs, constraints, and follow-up impact in Consequences
- If comparing alternatives, keep the option framing inside Context

## ADR List

### Stack

| ADR                                           | Title                                                          | Status   |
| --------------------------------------------- | -------------------------------------------------------------- | -------- |
| [0000](0000-template.md)                      | Template                                                       | —        |
| [0001](0001-nextjs-app-router.md)             | Next.js 15 with App Router as the Core Framework               | accepted |
| [0002](0002-typescript.md)                    | TypeScript as the Primary Language for All Application Code    | accepted |
| [0003](0003-tailwind-brand-tokens-shadcn.md)  | Tailwind CSS Brand Token System with shadcn/ui Component Layer | accepted |
| [0004](0004-react-query-client-data-layer.md) | React Query as Client-Side Data Layer for Static Export        | accepted |
| [0005](0005-mdx-slide-content.md)             | MDX for Slide Deck Content Authoring                           | accepted |

### Deployment

| ADR                                                       | Title                                                               | Status   |
| --------------------------------------------------------- | ------------------------------------------------------------------- | -------- |
| [0006](0006-static-export-github-pages.md)                | Static HTML Export Deployed to GitHub Pages                         | accepted |
| [0007](0007-github-actions-locale-redirect-generation.md) | GitHub Actions Generates Root Locale Redirect at Deploy Time        | accepted |
| [0008](0008-cloudflare-proxy-security-headers.md)         | Cloudflare Proxy as the Deferred Solution for HTTP Security Headers | accepted |

### Routing & Content

| ADR                                            | Title                                                                | Status   |
| ---------------------------------------------- | -------------------------------------------------------------------- | -------- |
| [0009](0009-internationalization-next-intl.md) | Internationalization via next-intl with Always-Prefix Locale Routing | accepted |
| [0010](0010-notion-blog-cms.md)                | Notion as Sole Blog Content Source with Build-Time Asset Sync        | accepted |

### Application Architecture

| ADR                                               | Title                                                                | Status   |
| ------------------------------------------------- | -------------------------------------------------------------------- | -------- |
| [0011](0011-compass-scoring-engine-pure-js.md)    | Platform Compass as a Framework-Agnostic Pure-JS Scoring Engine      | accepted |
| [0012](0012-seo-structured-data-single-source.md) | SEO and Structured Data Sourced Exclusively from SITE_CONFIG         | accepted |
| [0013](0013-google-consent-mode-v2.md)            | Google Consent Mode V2 with Default-Deny and Custom Event Opt-In     | accepted |
| [0014](0014-programmatic-sitemap-robots.md)       | Programmatic Sitemap and Robots with Explicit AI Crawler Allowlist   | accepted |
| [0015](0015-email-safe-report-generation.md)      | Email-Safe Report Generation with Inline Styles Only                 | accepted |
| [0016](0016-rich-text-i18n-tags.md)               | Rich Text Translation Tags via defaultTranslationValues in next-intl | accepted |
| [0017](0017-keyword-strategy-centralized.md)      | Keyword Strategy Centralized in lib/keywords.ts                      | accepted |

### SEO / GEO

| ADR                                           | Title                                                              | Status   |
| --------------------------------------------- | ------------------------------------------------------------------ | -------- |
| [0018](0018-llms-txt-ai-indexing.md)          | llms.txt for AI Engine Indexing and Citation Permission            | accepted |
| [0019](0019-geo-parallel-strategy.md)         | Generative Engine Optimization (GEO) as a Parallel Strategy to SEO | accepted |
| [0020](0020-sovp-audit-framework.md)          | SOVP Audit Framework as the SEO Health Evaluation Standard         | accepted |
| [0021](0021-seo-report-artifact-structure.md) | Timestamped SEO Report Artifacts with Stable Baseline              | accepted |

### Monitoring & Multi-Project

| ADR                                         | Title                                                                  | Status   |
| ------------------------------------------- | ---------------------------------------------------------------------- | -------- |
| [0022](0022-n8n-monitoring-backbone.md)     | n8n as the SEO/GEO Monitoring Automation Backbone                      | accepted |
| [0023](0023-wafplusplus-separate-domain.md) | WAF++ as a Separate Open-Source Domain and Intellectual Property Asset | accepted |

## Historical note

Some older decision context still lives in docs such as `docs/MIGRATION-SUMMARY.md` and `memory/MEMORY.md`. Do not treat those as ADRs unless they are explicitly promoted into this folder.
