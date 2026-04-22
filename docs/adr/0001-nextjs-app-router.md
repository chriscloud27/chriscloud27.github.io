Title: ADR-0001: Next.js 15 with App Router as the Core Framework

Status: accepted

Date: 2026-04-22

## Context

The site is a personal brand and consulting practice site for a solo operator. It needs multi-locale routing, a good SEO/metadata API, TypeScript support, and a build pipeline that can produce static HTML (GitHub Pages deployment target). Three frameworks were considered:

**Option A — Gatsby:** Static-site generator with GraphQL data layer. Strong plugin ecosystem for static content. No built-in i18n routing. GraphQL is overhead for a site of this complexity. Community momentum has declined since 2023.

**Option B — Astro:** Excellent static output, island architecture for minimal JavaScript, strong performance defaults. i18n support requires manual setup. Not a React-first framework — component ecosystem is smaller and Tailwind/shadcn/ui integration requires more work. Limited App Router-style file-based routing conventions.

**Option C — Next.js 15 with App Router:** First-class React Server Components, file-based routing with layouts, excellent `next-intl` integration for multilingual routing, built-in metadata API for SEO, MDX support via `@next/mdx`, and `output: "export"` for static HTML generation. TypeScript-first. Largest ecosystem for the component and tooling choices in this stack (shadcn/ui, Tailwind, TanStack Query).

Next.js App Router was chosen over the Pages Router because App Router provides React Server Components (fetch at build time per component, not per page), co-located layouts, and cleaner async data loading patterns that align with the static export model. The Pages Router's `getStaticProps` approach is more verbose and is in maintenance mode.

## Decision

We use Next.js 15 with the App Router as the core framework. All routes live under `app/[locale]/`. Server Components handle build-time data fetching; Client Components handle interactivity.

## Consequences

- All dynamic route segments (`[locale]`, `[slug]`) use async function signatures with `params: Promise<{ ... }>` (Next.js 15 requirement) — see ADR-0009.
- `output: "export"` in `next.config.ts` constrains the framework to static export mode — no server-side runtime, no middleware, no API routes (see ADR-0006).
- App Router conventions must be followed for all new routes: layout files in `app/[locale]/`, `page.tsx` for leaf routes, `generateStaticParams` for dynamic segments.
- Next.js version upgrades (especially major versions) may change async params behavior or App Router conventions — review upgrade notes before bumping.
- Switching to Astro or another framework would require rewriting all routing, i18n setup, and metadata generation — the framework choice is a high-switching-cost decision.
