# Christian Weber — AI‑Native Cloud & Platform Architect

**Helping Series A–B SaaS teams eliminate architectural debt before it blocks scale**

> The platform that got your company here was built to move fast.

It was never designed to scale.
AI features demo perfectly and silently degrade under real load. Cloud costs climb with no model explaining why. Engineers wait on infrastructure instead of shipping product.
These aren't engineering failures. They're architectural gaps. And the longer they stay invisible, the more expensive they get.

## What I Do

I work with CTOs and technical founders at Series A-B B2B SaaS companies to get architectural clarity at the moment it matters most before it becomes the reason a faster competitor wins.
My work sits at the intersection most companies can't staff internally: strategic architecture direction and hands-on system design, together.

**The engagement model:**

| Stage                                                                    | What happens                                                                                                                  |
| ------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------- |
| [Architecture Diagnosis Call](https://cal.com/mach2cloud/diagnosis-call) | 60-minute structured diagnostic. You leave with clarity on what's actually driving the problem regardless of what comes next. |
| Architecture Audit                                                       | Deep analysis of your current platform against the WAF++ framework. Clear picture of risk, cost, and velocity impact.         |
| Blueprint & System Design                                                | A concrete architecture design your team can execute without external dependency.                                             |
| Engineering Enablement                                                   | Hands-on guidance through implementation — decisions, reviews, unblocking.                                                    |
| Fractional Principal Architect                                           | Ongoing architecture leadership without the cost or ramp time of a full-time hire.                                            |

The Diagnosis Call is the only entry point. Every engagement starts there.

## WAF++ Framework

WAF++ is an open-source extension of the AWS Well-Architected Framework, purpose-built for AI-native, cloud-agnostic SaaS platforms.

It addresses what the standard framework doesn't: inference cost modeling, AI workload scaling patterns, failure blast radius design, and platform architecture for systems where AI is a first-class citizen, not a feature add-on.

**→ [WAF++.dev](https://WAF++.dev)**

## Where This Applies

The architectural moment I work with happens after one of these:

- A production incident that exposed a structural failure, not just a bug
- A board or investor conversation where infrastructure scalability was questioned
- An engineering planning session where 30–40% of cycles are going to firefighting
- A decision to integrate AI features that surfaced how fragile the existing platform is
- A cloud bill conversation where no one could explain where the cost was going

If any of these have happened in the last quarter, the problem is already named. The question is what to do about it.

## Core Expertise

**Cloud Platform Architecture**
AWS, Azure, GCP — cloud selection driven by business fit, not lock-in. Scalable platform design from prototype to Series B+. Environments supporting thousands of engineers.

**AI-Native Systems**
Platform foundations designed for AI workloads from the start. Inference latency, cost-per-call, scaling patterns, and failure modes designed in, not retrofitted.

**Platform Engineering**
Kubernetes platform architecture (AKS, EKS). Infrastructure-as-Code (Terraform, CDK). CI/CD and platform automation. 90%+ operational automation on production platforms.

**Architecture Enablement**
Engineering teams enabled to own and evolve architecture independently. The goal is always capability, not dependency.

## Selected Experience

**MaCh2.Cloud** — Principal AI‑Native Cloud & Platform Architect _(2022–Present)_
Fractional architecture leadership for Series A–B SaaS companies. Creator of WAF++.

**Capgemini** — Enterprise & Cloud Architect _(2020–2023)_
Azure and AWS cloud platforms (landing zones) supporting 1,700 and 2,500 developers respectively. 90% automated AWS platform with CDK/Python. AWS Global Partner Award 2023.

**BARMER** — Cloud Architect _(2019–2020)_
Public cloud infrastructure for online services. AWS CloudFormation automation to 80% cost efficiency on app cloud hosting.

**BWI GmbH** — IT Architect _(2015–2019)_
Container platform service design for the German Federal IT infrastructure. CloudLab service enabling independent software and hardware evaluation across hundreds of applications.

## Technology Stack

![AWS](https://img.shields.io/badge/AWS-orange?style=for-the-badge&logo=amazonaws&logoColor=white)
![Azure](https://img.shields.io/badge/Azure-%230078D4?style=for-the-badge&logo=microsoftazure&logoColor=white)
![GCP](https://img.shields.io/badge/GCP-%234285F4?style=for-the-badge&logo=googlecloud&logoColor=white)
![Kubernetes](https://img.shields.io/badge/Kubernetes-%23326CE5?style=for-the-badge&logo=kubernetes&logoColor=white)
![Terraform](https://img.shields.io/badge/Terraform-%23844FBA?style=for-the-badge&logo=terraform&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-%232496ED?style=for-the-badge&logo=docker&logoColor=white)
![GitHub CI](https://img.shields.io/badge/GitHub%20CI-%23181717?style=for-the-badge&logo=github&logoColor=white)

## SEO / GEO

The site targets both traditional search engines (Google, Bing) and generative AI engines (ChatGPT, Perplexity, Claude, Gemini) through structured data, explicit crawler permissions, and AI-readable content declarations.

### What is implemented

- **JSON-LD schemas** — Person, WebSite, Organization on the homepage; Article on all blog posts
- **AI crawler permissions** — `robots.txt` explicitly allows GPTBot, ClaudeBot, PerplexityBot
- **`public/llms.txt`** — machine declaration file for AI model indexing ([llmstxt.org](https://llmstxt.org))
- **Notion-driven blog metadata** — metaDescription (155 chars), dateModified, tags, related articles
- **Keyword strategy** — centralized in `lib/keywords.ts`, applied per route via `generateMetadata()`
- **Sitemap** — dynamic, includes all locales × routes; submitted to Google Search Console

### SOVP Audit Status (2026-04-21)

| Layer                 | Score | Target | Key gap                                                  |
| --------------------- | ----- | ------ | -------------------------------------------------------- |
| Signal Discovery (AI) | 35%   | 100%   | D2/D3/D4 all 0% — llms.txt, citability, sameAs URLs      |
| Security Headers      | 14%   | ≥ 90%  | GitHub Pages has no header support — requires Cloudflare |
| Schema                | 50%   | ≥ 90%  | Missing WebPage, FAQPage, DefinedTerm, datePublished     |
| Performance / Mobile  | 42%   | ≥ 90%  | Static export constraint; no WebP auto-conversion        |
| META / Links / SSL    | 100%  | ≥ 90%  | ✅                                                       |

Full findings, root causes, and fix plan: **[docs/SOVP-AUDIT-FIXES.md](docs/SOVP-AUDIT-FIXES.md)**

### Monitoring

Run the local SEO checker against the live sitemap:

```bash
node scripts/check-seo.mjs --sitemap=https://mach2.cloud/sitemap.xml --max=40
```

Detailed runbook: [reports/seo/SEO-SUMMARY.md](reports/seo/SEO-SUMMARY.md)

---

## Architecture Decision Records

This repo uses lightweight ADRs for architecture-level decisions.

- ADR policy and rules: [CLAUDE.md](CLAUDE.md)
- ADR index and canonical folder: [docs/adr/README.md](docs/adr/README.md)
- ADR template: [docs/adr/0000-template.md](docs/adr/0000-template.md)
- Broader architecture context: [docs/MULTI-PROJECT-SETUP.md](docs/MULTI-PROJECT-SETUP.md)

Use ADRs only for decision-level architecture changes, one file per decision, with the fixed structure Title, Status, Date, Context, Decision, Consequences.

Based on the CLAUDE.md in this repo, write an ADR when a decision:

- Changes or establishes the overall architecture (routing, auth, storage, tenancy model)
- Chooses between technologies or platforms (e.g. Firebase vs Supabase)
- Establishes a pattern that all future code must follow (e.g. RLS on every table)
- Would be confusing or surprising to a new developer without context
- Explicitly rejects a reasonable alternative — document why

Do not write one for:

- Implementation details (which component to use, how to name a variable)
- Bug fixes
- Decisions that are obvious from reading the code

---

## Platform Compass

The [Platform Compass](https://mach2.cloud/en/compass) is a 14-question terminal-style assessment that scores a prospect's platform readiness across five blocks (Foundations, Reliability, AI Maturity, Cloud Sovereignty, Team AI Usage) and returns a tier (`fragile`, `scaling`, `accelerating`) with a personalised report via n8n webhook.

### Webhook test script

**File:** `scripts/test-compass-webhook.mjs`

**What it does:** Scores three pre-built sample answer sets (one per tier), builds the full HTML email reports via `compassReports.js`, then POSTs the identical JSON payload that `CompassTerminal.tsx` sends after a live assessment — including `answers`, `result`, `simple_report_html`, and `advanced_report_html`.

**Why it exists:** End-to-end verification without going through the browser UI. Lets you confirm the n8n webhook receives and processes the payload correctly after changing the scoring engine, report templates, or webhook URL — without needing a real respondent.

**When to run it:**

- After any change to `lib/compassEngine.js` or `lib/compassReports.js`
- After changing the `WEBHOOK_URL` constant in `CompassTerminal.tsx`
- When debugging n8n workflow failures (dry-run first, then live)
- Before deploying a new report template to production

```bash
# Dry-run all three tiers — no HTTP call, prints full payload + report sizes
node scripts/test-compass-webhook.mjs --dry-run

# Send a single tier to the live webhook
node scripts/test-compass-webhook.mjs --tier fragile
node scripts/test-compass-webhook.mjs --tier scaling
node scripts/test-compass-webhook.mjs --tier accelerating

# Send all three tiers in sequence
node scripts/test-compass-webhook.mjs
```

---

## Connect

- **Website:** [mach2.cloud](https://mach2.cloud)
- **LinkedIn:** [linkedin.com/in/christian-weber-0591](https://linkedin.com/in/christian-weber-0591)
- **WAF++ Framework:** [WAF++.dev](https://WAF++.dev)
- **Architecture Diagnosis Call:** [cal.com/mach2cloud/diagnosis-call](https://cal.com/mach2cloud/diagnosis-call)

---

_Cloud-agnostic by principle. AI-native by design. US · Europe · South America. EST-anchored._
