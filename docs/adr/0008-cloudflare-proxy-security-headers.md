Title: ADR-0008: Cloudflare Proxy as the Deferred Solution for HTTP Security Headers

Status: accepted

Date: 2026-04-22

## Context

GitHub Pages does not support custom HTTP response headers. Headers required for security compliance — `X-Frame-Options`, `Content-Security-Policy`, `Permissions-Policy`, `Referrer-Policy`, and `Strict-Transport-Security` — cannot be set from any file in this repository. Only HSTS is provided automatically by GitHub Pages via its TLS termination.

This is a known platform constraint, not an oversight. It was identified in the SOVP audit (SECURITY-HEADERS dimension: 14%, well below the 90% target).

Three mitigation options were evaluated:

**Option A — `<meta http-equiv>` tags:** Partial coverage. CSP and Referrer-Policy can be set this way. `X-Frame-Options`, `HSTS`, and `Permissions-Policy` cannot be set via `<meta>` tags — they require HTTP headers. This was implemented as a temporary measure.

**Option B — Migrate to Cloudflare Pages:** Move the entire deployment from GitHub Pages to Cloudflare Pages. Supports a `_headers` file for custom HTTP response headers. Requires a new CI pipeline. Medium effort, full header coverage.

**Option C — Add Cloudflare proxy in front of GitHub Pages (recommended):** Point the `mach2.cloud` DNS records through Cloudflare (orange-cloud proxy mode). Add security headers via Cloudflare Transform Rules. Zero migration required — GitHub Pages remains the host. Free tier is sufficient. `~30 minutes of setup.

Option C was chosen as the recommended path because it requires no migration, adds full HTTP header coverage, and optionally adds CDN caching, DDoS protection, and Web Analytics on top of the existing GitHub Pages deployment.

## Decision

Security headers beyond what `<meta http-equiv>` can deliver are deferred to a Cloudflare proxy layer in front of GitHub Pages. This is a known architectural gap, not a bug. The recommended resolution is enabling Cloudflare proxy mode (orange-cloud DNS) with Transform Rules for `X-Frame-Options`, `Content-Security-Policy`, `Permissions-Policy`, `Referrer-Policy`, and `Permissions-Policy`.

## Consequences

- The SOVP SECURITY-HEADERS score will remain at 14% until Cloudflare proxy is enabled. This is an accepted temporary state.
- Enabling Cloudflare proxy requires a DNS change at the domain registrar — it is not a code change in this repository.
- Once Cloudflare proxy is active, `<meta http-equiv>` tags in `app/[locale]/layout.tsx` for CSP and Referrer-Policy may become redundant — review for conflicts.
- Cloudflare proxy also affects caching behavior and may require cache-busting rules for `sitemap.xml` and `robots.txt` to ensure freshness after deploy.
- If the deployment is ever migrated from GitHub Pages to Cloudflare Pages (Option B), remove this ADR's "deferred" status and document the migration in a new ADR.
