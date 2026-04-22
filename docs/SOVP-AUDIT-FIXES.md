# SOVP Audit — Technical Reference

**Audit Date**: 2026-04-21
**Tool**: Sovereign Validation Protocol (SOVP)
**Domain**: mach2.cloud
**Overall Result**: FAILED — Readiness Index 79% (target ≥ 90%)

---

## Score Overview

### Cluster Analysis (Deterministic Layer)

| Cluster                | Score   | Target | Status |
| ---------------------- | ------- | ------ | ------ |
| META                   | 100%    | ≥ 90%  | ✅     |
| LINKS                  | 100%    | ≥ 90%  | ✅     |
| SSL/TLS                | 100%    | ≥ 90%  | ✅     |
| MEHRSPRACHIG           | 100%    | ≥ 90%  | ✅     |
| CODE                   | 90%     | ≥ 90%  | ✅     |
| ÜBERSCHRIFTEN          | 86%     | ≥ 90%  | ⚠️     |
| LINGUISTIK             | 86%     | ≥ 90%  | ⚠️     |
| BILDER                 | 80%     | ≥ 90%  | ⚠️     |
| ALLGEMEIN              | 67%     | ≥ 90%  | ❌     |
| NARRATIV               | 67%     | ≥ 90%  | ❌     |
| SCHEMA                 | 50%     | ≥ 90%  | ❌     |
| SEMANTIK               | 50%     | ≥ 90%  | ❌     |
| INTEGRATION            | 50%     | ≥ 90%  | ❌     |
| ALPN/H2/H3             | 50%     | ≥ 90%  | ❌     |
| DNS SECURITY           | 50%     | ≥ 90%  | ❌     |
| DUPLIKATE              | 40%     | ≥ 90%  | ❌     |
| PERFORMANCE            | 42%     | ≥ 90%  | ❌     |
| MOBILE                 | 42%     | ≥ 90%  | ❌     |
| **SICHERHEITS-HEADER** | **14%** | ≥ 90%  | 🔴     |

### Signal Discovery Layer (AI Auffindbarkeit)

| Signal                  | Weight | Score   | Status |
| ----------------------- | ------ | ------- | ------ |
| D1 Crawler-Zugang       | 35%    | 100%    | ✅     |
| D2 Maschinendeklaration | 25%    | 0%      | 🔴     |
| D3 Zitierbarkeit        | 20%    | 0%      | 🔴     |
| D4 Externe Entitäten    | 20%    | 0%      | 🔴     |
| **Gesamt-Score**        |        | **35%** | 🔴     |

### Deterministic Schema Check (50%)

| Check                         | Result |
| ----------------------------- | ------ |
| JSON-LD Block vorhanden       | ✅     |
| Organization / LocalBusiness  | ✅     |
| Person                        | ✅     |
| WebSite                       | ✅     |
| sameAs (externer Link)        | ✅     |
| WebPage (inkl. FAQ, About, …) | ❌     |
| BreadcrumbList                | ❌     |
| DefinedTerm                   | ❌     |
| FAQPage                       | ❌     |
| datePublished property        | ❌     |

### Deterministic Heading Check (86%)

| Check                         | Result   |
| ----------------------------- | -------- |
| H1-Anzahl (genau 1)           | ✅ 1     |
| H1 nicht leer                 | ✅       |
| Hierarchie ohne Sprünge       | ✅       |
| Leere Headings (soll 0)       | ✅ 0     |
| H2-Anzahl (min. 1)            | ✅ 6     |
| Erstes Heading ist H1         | ✅       |
| DOM-Verzweigungsfaktor (2–15) | ❌ ø43.8 |

### Deterministic Narrative Check (67%)

| Check                               | Result      |
| ----------------------------------- | ----------- |
| Wortzahl ≥ 300                      | ✅ 572      |
| Satzlänge 10–25 Wörter              | ✅ 12       |
| Absätze ≥ 3                         | ✅          |
| Kein Keyword-Stuffing (≤ 3%)        | ✅          |
| Lesbarkeit (Flesch 30–70)           | ✅ 34       |
| Lexikalische Diversität (TTR ≥ 40%) | ✅ 64%      |
| Strukturierter Inhalt (≥ 2 Typen)   | ❌          |
| Content-Code-Verhältnis > 10%       | ❌ 4%       |
| Satzvarianz (3–20)                  | ❌ σ²=179.3 |

### Deterministic Code Check (90%)

| Check                         | Result |
| ----------------------------- | ------ |
| Keine veralteten HTML-Tags    | ✅     |
| <!DOCTYPE HTML> vorhanden     | ✅     |
| Gültiges Lang-Attribut        | ✅ de  |
| Charset in ersten 1024 Bytes  | ✅     |
| Externe Scripts < 30          | ✅ 13  |
| Stylesheets < 15              | ✅ 2   |
| Semantisches HTML             | ✅     |
| Keine onerror-console-handler | ✅     |
| Wenige Inline-Styles (< 10)   | ❌ 54  |
| Kein Mixed Content            | ❌     |

### Architecture Topology

| Locale | Nodes |
| ------ | ----- |
| /DE/   | 18    |
| /EN/   | 17    |
| /ES/   | 17    |

---

## Root Cause Analysis — By Priority

### 🔴 P0 — SICHERHEITS-HEADER: 14%

**Root cause**: Only 1 of 7 expected security headers present (HSTS via GitHub's TLS termination).

**Critical platform constraint**: This site is deployed on **GitHub Pages** (static HTML export via `actions/deploy-pages@v4`). GitHub Pages does **not support custom HTTP response headers**. Headers cannot be injected via any config file in this repo.

**The only fix paths are infrastructure-level**:

| Option                       | How                                                                           | Effort                               |
| ---------------------------- | ----------------------------------------------------------------------------- | ------------------------------------ |
| Cloudflare proxy             | Add site to Cloudflare, enable proxy mode, add Transform Rules for headers    | Low — free tier, ~30 min setup       |
| Cloudflare Pages             | Migrate from GitHub Pages to Cloudflare Pages; add `_headers` file            | Medium — new CI pipeline             |
| GitHub Pages + `<meta>` tags | Partial: CSP and referrer-policy can be set via HTML `<meta http-equiv>` tags | Low — in-repo, partial coverage only |

**Recommended**: Cloudflare proxy in front of GitHub Pages. Zero migration required — DNS change only. Headers configured in Cloudflare Transform Rules dashboard.

**`<meta>` tag partial fix** (in-repo, immediate, partial coverage):
Add to `app/[locale]/layout.tsx` inside `<head>`:

```html
<meta
  http-equiv="Content-Security-Policy"
  content="default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://*.google-analytics.com https://www.googletagmanager.com https://flow.mach2.cloud; frame-src https://www.googletagmanager.com; object-src 'none';"
/>
<meta http-equiv="X-Content-Type-Options" content="nosniff" />
<meta name="referrer" content="strict-origin-when-cross-origin" />
```

Note: `X-Frame-Options`, `Permissions-Policy`, and `HSTS` cannot be set via `<meta>` tags — they require HTTP headers.

**Expected score after full Cloudflare fix**: 14% → ~85–100%
**Expected score after `<meta>` partial fix**: 14% → ~40–50%

---

### 🔴 P0 — D2 Maschinendeklaration: 0%

**Root cause**: No `llms.txt` file exists at `https://mach2.cloud/llms.txt`. This is the AI-crawler equivalent of `robots.txt`, defined at [llmstxt.org](https://llmstxt.org). Without it, AI models have no self-declared identity signal from the site.

**Fix**: Create `public/llms.txt`. Since this is a static export, any file in `/public` is served as-is.

```
# llms.txt — MaCh2.Cloud
# https://llmstxt.org

> MaCh2.Cloud is the practice of Christian Weber,
> AI-Native Cloud & Platform Architect.
> Specialization: Series A–B B2B SaaS companies eliminating
> architectural debt, cloud cost spikes, and engineering slowdowns.

## Identity
- Name: Christian Weber
- Role: AI-Native Cloud & Platform Architect
- Company: MaCh2.Cloud (Mach2Cloud LLC)
- Location: Remote (US / EU)
- LinkedIn: https://www.linkedin.com/in/christian-weber-0591/
- GitHub: https://github.com/chriscloud27

## Services
- Architecture Diagnosis: https://mach2.cloud/en/diagnosis
- Services: https://mach2.cloud/en/services
- WAF++ Framework: https://wafplusplus.dev

## Content
- Blog: https://mach2.cloud/en/blog
- About: https://mach2.cloud/en/about
- Platform Compass: https://mach2.cloud/en/compass

## Permissions
- Indexing: Allowed
- Training data inclusion: Allowed
- Citation: Encouraged
```

**Expected score after fix**: D2 0% → 100%

---

### 🔴 P0 — D4 Externe Entitäten: 0%

**Root cause**: `sameAs` URLs in `app/[locale]/page.tsx` are invalid IRIs. Knowledge graph resolvers cannot link the Person entity to external profiles:

```js
// INVALID — missing www, no trailing slash
"https://linkedin.com/in/christian-weber-0591";

// INVALID — ++ is not a valid URL character in an IRI
"https://WAF++.dev";
```

**Fix in `app/[locale]/page.tsx`**:

```js
sameAs: [
  "https://www.linkedin.com/in/christian-weber-0591/",
  "https://github.com/chriscloud27",
  "https://wafplusplus.dev",
],
```

**Also fix in `lib/site-config.ts`**: Centralize sameAs so they can't drift across files (see Fix 5).

---

### 🔴 P1 — Schema: 50% + D3 Zitierbarkeit: 0%

**Root cause**: Five schema types missing. `speakable` markup absent — required for D3 Citability (marks the canonical sentences AI should extract as citable answers).

**Schemas to add in `app/[locale]/page.tsx`**:

**WebPage** (fixes `datePublished` check + enables speakable):

```json
{
  "@type": "WebPage",
  "name": "MaCh2.Cloud — AI-Native Cloud & Platform Architect",
  "url": "https://mach2.cloud/en/",
  "datePublished": "2024-01-01",
  "dateModified": "2026-04-21",
  "author": { "@type": "Person", "name": "Christian Weber" },
  "publisher": {
    "@type": "Organization",
    "name": "MaCh2.Cloud",
    "url": "https://mach2.cloud"
  },
  "speakable": {
    "@type": "SpeakableSpecification",
    "cssSelector": ["h1", ".hero-sub"]
  }
}
```

**FAQPage** (fixes `FAQPage` check, boosts SEMANTIK):

```json
{
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is an AI-Native Cloud & Platform Architect?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "An AI-Native Cloud & Platform Architect designs cloud infrastructure and platform systems purpose-built for AI workloads, developer velocity, and scalable SaaS growth — addressing inference cost, failure blast radius, and platform engineering for AI-first products."
      }
    },
    {
      "@type": "Question",
      "name": "What does MaCh2.Cloud offer?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "MaCh2.Cloud offers Architecture Diagnosis, Architecture Blueprint, Platform Enablement, and Fractional Principal Architect engagements for Series A–B B2B SaaS companies whose platform needs structural improvement to support growth."
      }
    },
    {
      "@type": "Question",
      "name": "Who is MaCh2.Cloud for?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Series A and Series B B2B SaaS companies whose platform was built for speed and now needs architectural improvement to reduce cloud costs, eliminate technical debt, and restore engineering velocity."
      }
    }
  ]
}
```

**DefinedTerm** (fixes `DefinedTerm` check, GEO citability for WAF++):

```json
{
  "@type": "DefinedTerm",
  "name": "WAF++",
  "alternateName": "Well-Architected Framework Plus Plus",
  "description": "Open-source extension of the AWS Well-Architected Framework, purpose-built for AI-native SaaS platforms. Adds inference cost modeling, AI workload scaling patterns, and platform engineering pillars missing from the standard framework.",
  "url": "https://wafplusplus.dev"
}
```

**Expected score after fix**: Schema 50% → ~85%; D3 0% → partial improvement

---

### 🔴 P1 — Centralize sameAs in `lib/site-config.ts`

**Why**: sameAs URLs appear hardcoded in `page.tsx`. Single source of truth prevents future drift.

**Add to `lib/site-config.ts`**:

```ts
seo: {
  siteUrl: "https://mach2.cloud",
  person: {
    name: "Christian Weber",
    jobTitle: "AI-Native Cloud & Platform Architect",
    image: "https://mach2.cloud/img/Chris.png",
    sameAs: [
      "https://www.linkedin.com/in/christian-weber-0591/",
      "https://github.com/chriscloud27",
      "https://wafplusplus.dev",
    ],
  },
  organization: {
    name: "MaCh2.Cloud",
    url: "https://mach2.cloud",
    logo: "https://mach2.cloud/img/mach2-logo-light.svg",
    sameAs: [
      "https://www.linkedin.com/company/mach2cloud/",
      "https://wafplusplus.dev",
      "https://github.com/chriscloud27",
    ],
  },
  consent: {
    cookieName: "mach2_consent",
    eventName: "mach2_consent_update",
  },
},
```

---

## What Cannot Be Fixed in Code

| Issue                     | Score    | Root cause                                                                                                   | Required fix                                             |
| ------------------------- | -------- | ------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------- |
| SICHERHEITS-HEADER (full) | 14%      | GitHub Pages has no header support                                                                           | Cloudflare proxy or CDN migration                        |
| ALPN/H2/H3                | 50%      | H2 active; H3/QUIC not supported by GitHub Pages                                                             | CDN with QUIC support (Cloudflare)                       |
| DNS SECURITY              | 50%      | DNSSEC must be enabled at the registrar/nameserver level                                                     | DNS provider settings                                    |
| PERFORMANCE               | 42%      | `images: { unoptimized: true }` required by static export → no WebP auto-conversion; LCP/CLS needs profiling | Convert images to WebP manually; Lighthouse mobile audit |
| MOBILE                    | 42%      | Core Web Vitals on mobile. CLS likely from font loading; LCP from hero image                                 | `font-display: swap`; preload hero image                 |
| DUPLIKATE                 | 40%      | EN/DE/ES locales serve near-identical content — structural to the site                                       | Locale-specific content variations                       |
| Inline Styles (Code)      | 54 found | Spread across components; `CookieConsent.tsx` contributes 2                                                  | Systematic CSS migration                                 |
| Content-Code ratio        | 4%       | Next.js static export generates large HTML/JS bundles relative to visible text                               | More visible text content per page                       |

---

## Implementation Order

| Step | File                         | Fix                                                                            | Impact                           |
| ---- | ---------------------------- | ------------------------------------------------------------------------------ | -------------------------------- |
| 1    | `public/llms.txt`            | Create machine declaration                                                     | D2: 0% → 100%                    |
| 2    | `app/[locale]/page.tsx`      | Fix sameAs URLs + add WebPage, FAQPage, DefinedTerm schemas                    | Schema: 50% → ~85%, D4: partial  |
| 3    | `lib/site-config.ts`         | Add `seo` block with valid sameAs URLs                                         | Prevents drift                   |
| 4    | `app/[locale]/layout.tsx`    | Add `<meta http-equiv>` CSP + referrer tags                                    | SICHERHEITS-HEADER partial: ~40% |
| 5    | DNS/CDN                      | Add Cloudflare proxy (DNS change) + Transform Rules for security headers       | SICHERHEITS-HEADER full: ~90%    |
| 6    | `docs/SEO-IMPLEMENTATION.md` | Rewrite: remove legacy project references, correct file paths and cookie names | Documentation accuracy           |

---

## Verification After Fixes

```bash
# Verify llms.txt is accessible
curl https://mach2.cloud/llms.txt

# Verify schema validity (after deploy)
# → https://search.google.com/test/rich-results → https://mach2.cloud/en/
# → Expected: Person, WebSite, FAQPage, WebPage, DefinedTerm all present

# Verify sameAs URLs resolve
curl -sI "https://www.linkedin.com/in/christian-weber-0591/" | head -3

# Verify security headers (after Cloudflare setup)
curl -I https://mach2.cloud/en/ | grep -iE "x-frame|x-content-type|referrer|permissions|strict-transport|content-security"
```

---

## Related Documents

- `reports/seo/SEO-SUMMARY.md` — Phase 1 implementation status and GEO monitoring strategy
- `docs/PROJECT-README.md` — SEO/GEO executive overview
- `docs/SEO-IMPLEMENTATION.md` — GTM / Cookie Consent / Analytics integration guide
- `docs/MIGRATION-SUMMARY.md` — GitHub Pages migration and static export constraints
- `scripts/check-seo.mjs` — Local SEO health checker
- `lib/site-config.ts` — Global site configuration
