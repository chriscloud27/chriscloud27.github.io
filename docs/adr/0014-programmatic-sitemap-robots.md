Title: ADR-0014: Programmatic Sitemap and Robots with Explicit AI Crawler Allowlist

Status: accepted

Date: 2026-04-22

## Context

The site needs a sitemap that covers all locale × route combinations, including dynamically-discovered blog slugs from Notion. It also needs a robots policy that handles three distinct cases: production (allow all legitimate crawlers), Vercel preview (block all indexing), and local development (block all indexing).

Additionally, the site is positioned as an AI-native consulting brand and benefits from being indexed by AI-powered search engines. The default `user-agent: *` rule allows general crawlers, but some AI crawlers (e.g. GPTBot, ClaudeBot, PerplexityBot) were historically blocked by site-specific rules at other sites, creating ambiguity about whether explicit allowlisting is needed.

Two approaches for robots were considered:

**Option A — Single `user-agent: *` rule:** Allows all crawlers with one rule. Simpler but does not communicate explicit intent about AI indexing — future maintainers might inadvertently add a blanket block.

**Option B — Explicit per-crawler allowlist:** Lists each AI crawler by name with an explicit `allow: /` rule after the general rule. Communicates deliberate policy, survives accidental `user-agent: *` disallow changes, and is visible to crawlers as intentional.

Option B was chosen as a deliberate brand positioning decision — AI discoverability is a first-class concern for this site.

Both `app/sitemap.ts` and `app/robots.ts` use `export const dynamic = "force-static"` to ensure they are pre-rendered at build time and not treated as dynamic route handlers.

## Decision

We use `app/sitemap.ts` and `app/robots.ts` with `force-static` to generate the sitemap and robots files at build time. The robots file explicitly allowlists AI crawlers (GPTBot, ChatGPT-User, ClaudeBot, anthropic-ai, PerplexityBot) in addition to the general `user-agent: *` allow rule. Non-production origins (`VERCEL_ENV === "preview"` or non-`mach2.cloud` hosts) disallow all crawlers.

## Consequences

- The sitemap must enumerate all routes × locales at build time — it cannot defer to runtime for blog slug discovery. The Notion blog fetch must complete successfully during build for the sitemap to be accurate.
- Adding a new locale (see ADR-0009) requires no changes to sitemap logic — the locale loop is driven by the `routing.locales` array.
- Adding a new AI crawler to the allowlist requires updating `app/robots.ts` manually — there is no auto-detection.
- The `isProductionHost()` check in `app/robots.ts` and `app/sitemap.ts` uses the `NEXT_PUBLIC_SITE_URL` env var (via `getBaseUrl()` from `lib/seo.ts`) — this env var must be set correctly in CI.
