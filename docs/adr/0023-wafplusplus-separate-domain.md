Title: ADR-0023: WAF++ as a Separate Open-Source Domain and Intellectual Property Asset

Status: accepted

Date: 2026-04-22

## Context

The WAF++ framework (an extension of the AWS Well-Architected Framework) is a core intellectual property asset developed by Christian Weber. Two hosting strategies were considered:

**Option A — Host WAF++ content on mach2.cloud:** Simpler — one domain, one deployment. WAF++ pages live under `mach2.cloud/waf2p/`. No separate domain or deployment pipeline. Content is not independently citable.

**Option B — Separate domain `wafplusplus.dev` with open-source identity:** WAF++ gets its own domain and presence, enabling it to be cited independently in AI search results, linked from external sources without going through the personal brand domain, and developed as an open-source framework with its own GitHub repository and community footprint. `mach2.cloud` references it as a `sameAs` authority signal in structured data.

Option B was chosen because independently citable intellectual property has more authority in AI and traditional search than content hosted within a personal brand site. A named, versioned framework can be referenced in conference talks, blog posts, and third-party content — amplifying both the framework and the personal brand. The `wafplusplus.dev` domain is listed in `SITE_CONFIG.seo.person.sameAs` and `SITE_CONFIG.seo.organization.sameAs`, making it a structured data authority link from `mach2.cloud`.

A WAF++ section also exists at `mach2.cloud/en/waf2p/` as a product entry point — this does not duplicate the framework; it serves as the commercial context for the WAF++ methodology within the service offering.

## Decision

WAF++ is maintained as a separate domain (`wafplusplus.dev`) with independent open-source identity. `mach2.cloud` references it as a `sameAs` authority link in structured data and as an explicit service link in `llms.txt`. The two domains are complementary, not competing.

## Consequences

- Content published at `wafplusplus.dev` is not managed in this repository. Changes to the WAF++ framework do not trigger a `mach2.cloud` deploy.
- The `wafplusplus.dev` URL in `SITE_CONFIG.seo.person.sameAs` and `organization.sameAs` must remain correct — if the domain changes, update `lib/site-config.ts` and `public/llms.txt`.
- SEO and GEO strategies for `wafplusplus.dev` are managed separately from this repo's monitoring workflows.
- The WAF++ section at `mach2.cloud/en/waf2p/` is a commercial landing page — it should link to `wafplusplus.dev` as the canonical framework reference rather than replicate framework content.
