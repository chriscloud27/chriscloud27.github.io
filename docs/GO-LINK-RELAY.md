# Go-Link Relay System

## Executive Summary

`/go/*` is a lightweight link relay layer on `mach2.cloud`. It replaces direct destination URLs in external content (LinkedIn posts, slides, emails) with short, owned, trackable links. All UTM attribution parameters appended at share time are forwarded transparently to the destination — enabling per-post, per-campaign analytics without modifying the destination URLs or the registry.

---

## Architecture

```
Share URL                          mach2.cloud                    Destination
──────────────────────────────────────────────────────────────────────────────
mach2.cloud/go/geo-validator  →   app/go/[slug]/page.tsx   →   engine.litzki-systems.org/...
  ?utm_content=p1               (inline JS reads ?utm_content=p1
                                 and appends to destination)
```

### Components

| File                             | Role                                                          |
| -------------------------------- | ------------------------------------------------------------- |
| `lib/go-links.ts`                | Registry — single source of truth: `slug → destination URL`   |
| `app/go/[slug]/page.tsx`         | Relay page — statically generated per slug at build time      |
| `app/go/layout.tsx`              | Minimal layout — provides `<html>`/`<body>` for go pages only |
| `docs/adr/0024-go-link-relay.md` | Architecture decision record                                  |

### Why not `async redirects()` in `next.config.ts`?

This project uses `output: "export"` (static export to GitHub Pages). `redirects()` in `next.config.ts` requires a live Node.js server — it is silently ignored in static export mode. See ADR-0024 for the full decision record.

---

## How It Works

1. **Build time** — `generateStaticParams()` reads all slugs from `lib/go-links.ts` and generates one static HTML file per slug: `out/go/geo-validator/index.html`, etc.

2. **Request time** — Browser loads the static page. An inline synchronous `<script>` runs before DOM paint:

   ```js
   var dest = "https://engine.litzki-systems.org/...";
   var qs = window.location.search; // e.g. "?utm_content=p1"
   window.location.replace(dest + qs);
   ```

3. **Forwarding** — The full query string (UTMs, any other params) is appended to the destination URL. The browser issues a standard navigation to the final destination.

4. **No-JS fallback** — `<noscript><meta http-equiv="refresh">` redirects to the bare destination (without UTMs). Edge case, acceptable trade-off.

---

## Adding a New Go-Link

Edit `lib/go-links.ts` and add one line:

```ts
export const GO_LINKS: Record<string, string> = {
  "geo-validator": "https://engine.litzki-systems.org/...",
  "my-new-link": "https://example.com/target", // ← add here
};
```

Then redeploy. The new slug is live at `mach2.cloud/go/my-new-link`.

---

## UTM Tracking: Registry vs. Share-Time

### Option A — UTMs in the registry (NOT recommended for campaign tracking)

```ts
"geo-validator": "https://engine.litzki-systems.org/...?utm_source=linkedin"
```

All uses of `/go/geo-validator` share the same UTM. You cannot distinguish P1 from P5. Analytics shows one data point for the entire slug.

### Option B — UTMs appended at share time (recommended)

```
/go/geo-validator?utm_source=linkedin&utm_medium=social&utm_campaign=geo-series&utm_content=p1
/go/geo-validator?utm_source=linkedin&utm_medium=social&utm_campaign=geo-series&utm_content=p2
```

Each post gets its own unique UTM. Analytics shows per-post attribution. The registry stays clean — bare destination URLs only.

**Rule:** keep the registry as bare destination URLs. Add UTMs at post/share time.

---

## LinkedIn GEO Series — Ready-to-Use Links

These are the P1–P5 share URLs for the GEO Validator series:

```
P1 → mach2.cloud/go/geo-validator?utm_source=linkedin&utm_medium=social&utm_campaign=geo-series&utm_content=p1-provocation

P2 → mach2.cloud/go/geo-validator?utm_source=linkedin&utm_medium=social&utm_campaign=geo-series&utm_content=p2-war-story

P3 → mach2.cloud/go/geo-validator?utm_source=linkedin&utm_medium=social&utm_campaign=geo-series&utm_content=p3-hot-take

P4 → mach2.cloud/go/geo-validator?utm_source=linkedin&utm_medium=social&utm_campaign=geo-series&utm_content=p4-220-params

P5 → mach2.cloud/go/geo-validator?utm_source=linkedin&utm_medium=social&utm_campaign=geo-series&utm_content=p5-lighthouse
```

All five point to the same `/go/geo-validator` slug. Attribution is tracked per `utm_content` value.

---

## Current Registry

| Slug                | Destination                                     |
| ------------------- | ----------------------------------------------- |
| `/go/geo-validator` | `engine.litzki-systems.org/...` (GEO Validator) |
| `/go/sovp-audit`    | `litzki-systems.com/sovp-full-validator`        |
| `/go/waf2p`         | `waf2p.dev/`                                    |
| `/go/wafpass`       | `waf2p.dev/wafpass/`                            |

---

## Upgrade Path: Cloudflare Redirect Rules

Once the Cloudflare proxy is active (ADR-0008), go-links can be upgraded to edge-level redirects with zero code changes in this repo:

1. Cloudflare Dashboard → your zone → **Rules → Redirect Rules**
2. Add a rule per slug:
   - **Field:** URI Path
   - **Operator:** equals
   - **Value:** `/go/geo-validator`
   - **Type:** Dynamic redirect
   - **Expression:** `concat("https://engine.litzki-systems.org/...", http.request.uri.query != "" ? concat("?", http.request.uri.query) : "")`
   - **Preserve query string:** ✅ enabled
   - **Status code:** 307

Benefits of the CF upgrade: no page flash, HTTP-level redirect (no JS), faster perceived navigation, visible in server-side analytics. The static relay pages (`app/go/`) remain deployed as a fallback and can be kept or removed.

---

## Security

- Destinations are hardcoded in `lib/go-links.ts` — not user-supplied. Open-redirect vulnerabilities are eliminated by design.
- Unknown slugs return Next.js 404 (via `notFound()`).
- The relay pages carry no GTM, no cookies, no consent layer — they redirect before any tracking context loads.
