Title: ADR-0024: Go-Link Relay System for Forwarding and UTM Tracking

Status: accepted

Date: 2026-04-22

## Context

Marketing and content distribution requires short, memorable, owned links that:

1. Can be shared publicly without exposing or hardcoding destination URLs in content
2. Support UTM parameter forwarding for per-post attribution (LinkedIn series, campaigns)
3. Remain under the mach2.cloud domain for brand consistency and trust

Two implementation approaches were evaluated:

**Option A — `async redirects()` in `next.config.ts`:**  
Native Next.js redirect config with HTTP 307 responses. Clean, zero-JS, server-authoritative.  
**Rejected** — `next.config.ts` uses `output: "export"` (static export to GitHub Pages). `redirects()`, `rewrites()`, and `headers()` in next.config.ts are server-only features; they are silently ignored in static export mode. No HTTP redirect would be issued.

**Option B — Static relay page (`app/go/[slug]/page.tsx`):**  
A statically generated page per slug. An inline synchronous script reads `window.location.search` at runtime and calls `window.location.replace(destination + qs)`, forwarding all query params (UTMs) to the destination. `generateStaticParams()` enumerates all slugs from a central registry at build time.  
**Chosen** — works with static export, forwards UTMs, adds no runtime dependencies.

**Option C — Cloudflare Redirect Rules (upgrade path):**  
Edge-level redirect via Cloudflare Transform Rules with "Preserve query string" enabled. Zero page flash, no JS dependency, analytically clean HTTP 301/302.  
**Deferred** — requires Cloudflare proxy to be active (see ADR-0008). Can be added as a zero-code-change overlay on top of Option B once CF proxy is enabled. Option B remains valid concurrently.

## Decision

A static relay page system is implemented under `app/go/[slug]/page.tsx`. All slug-to-destination mappings live in `lib/go-links.ts` as the single source of truth. UTM query parameters appended at share time are forwarded transparently to the destination. Cloudflare Redirect Rules (Option C) are the documented upgrade path once the CF proxy layer is active.

## Consequences

- Adding a new go-link requires one line in `lib/go-links.ts` and a rebuild/redeploy.
- UTM params must be appended at share time (e.g. `/go/geo-validator?utm_content=p1`). Adding UTMs inside the registry config would apply them to ALL uses of a slug, preventing per-post attribution — this is intentional by design.
- There is a brief page flash (~100ms) before the JS redirect fires. Acceptable for link relay use cases. Eliminated once Cloudflare Redirect Rules are configured.
- The no-JS fallback uses `<meta http-equiv="refresh">` in the page body pointing to the bare destination (without UTMs) — edge case, acceptable trade-off.
- `app/go/` sits at root app level, outside `app/[locale]/`, and uses its own minimal layout. It does not carry header, footer, GTM, or i18n context — intentional for a relay page.
- All destination URLs are hardcoded in `lib/go-links.ts` (not user-supplied), eliminating open-redirect vulnerabilities.
