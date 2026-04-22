Title: ADR-0006: Static HTML Export Deployed to GitHub Pages

Status: accepted

Date: 2026-04-22

## Context

The site is a personal/professional brand site for a solo operator. It has no per-request server-side logic requirements — all content is either static, fetched at build time from Notion, or handled client-side. Two deployment targets were considered:

**Option A — Vercel (Next.js runtime):** Supports full SSR, middleware-based locale redirect, image optimisation, and incremental static regeneration. Requires a paid plan for commercial domains and ongoing vendor dependency.

**Option B — GitHub Pages (static export):** Free, version-controlled deployment via GitHub Actions. Requires `output: "export"`, disables image optimisation (`images.unoptimized: true`), forbids server-side API routes (only edge/external webhooks work), and requires a client-side JavaScript redirect for locale detection at the root path.

The site's content model is compatible with static export: blog posts are fetched from Notion at build time, the Compass scoring feature is a client-side form posting to an external webhook, and no route requires runtime database reads.

## Decision

We use `output: "export"` in `next.config.ts` to pre-render all routes to static HTML at build time and deploy the `out/` directory to GitHub Pages via a GitHub Actions workflow.

## Consequences

- Next.js middleware cannot run — locale detection must be implemented via a JavaScript redirect in the root `index.html`.
- Image optimisation is disabled; all images must be pre-optimised before committing or downloading.
- No server-side API routes are possible. External webhooks (e.g. n8n at `flow.mach2.cloud`) must handle any server-side logic.
- `trailingSlash: true` is required to ensure GitHub Pages serves `page/index.html` correctly for nested routes.
- The GitHub Actions deploy workflow must run `sync:notion-assets` before `next build` to cache Notion-hosted blog images locally.
- Switching to Vercel in future would unlock middleware redirects, image optimisation, and ISR — but the current constraints are acceptable for the site's scale.
