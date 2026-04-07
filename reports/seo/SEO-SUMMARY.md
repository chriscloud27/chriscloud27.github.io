# SEO/GEO Implementation Summary & Strategy

**Last Updated**: March 20, 2026
**Status**: Live (Phase 1 implementation complete, monitoring live)
**Baseline Test**: Week 0 (baseline established, Phase 2 monitoring begins Week 1)

---

## Executive Summary

MaCh2.Cloud implements comprehensive SEO and GEO (Generative Engine Optimization) strategies targeting both traditional search engines (Google, Bing) and AI search engines (ChatGPT, Perplexity, Claude, Gemini).

### Phase 1 Implementation (Complete ✅)

**Search Engine Signals**:

- ✅ Next.js metadata APIs generating canonical URLs, locale alternates, OpenGraph/Twitter tags
- ✅ JSON-LD schemas: Person (Christian Weber), WebSite (with SiteNavigationElement), Article (all blog posts)
- ✅ robots.txt with explicit allow rules for GPTBot, ClaudeBot, PerplexityBot, Googlebot, Bingbot
- ✅ Dynamic sitemap including 63 URLs (8 static routes × 3 locales, 4 case studies × 3 locales, ~12 blog articles × 3 locales)
- ✅ Blog metadata: metaDescription (155 chars, pain-first), dateModified, internalLinks for topical clusters
- ✅ OG image fallback (1200×627px branded image)
- ✅ Related articles component for internal linking

### Phase 1 Baseline Test Results (Week 0 - March 20, 2026)

| Engine         | Query                     | Result            | Quote                                                |
| -------------- | ------------------------- | ----------------- | ---------------------------------------------------- |
| **Claude**     | "Who is Christian Weber?" | ❌ Not indexed    | No mach2.cloud presence yet                          |
| **ChatGPT**    | "Who is Christian Weber?" | ❌ Not verifiable | "Not a known public figure"                          |
| **Perplexity** | "Who is Christian Weber?" | ✅ Appearing      | "MaCh2.Cloud — AI‑Native Cloud & Platform Architect" |
| **Perplexity** | "What is WAF++?"          | ✅ Appearing      | mach2.cloud cited as source                          |

**Key Finding**: Perplexity is indexing mach2.cloud content, but Claude and ChatGPT have no indexed data yet. This is expected at Week 0 — full indexing typically requires 2–6 weeks.

### Expected Phase 2 Milestone (Week 6, April 3, 2026)

By Week 6, expect:

- ✅ Google: 100% blog articles indexed, 30–100 organic clicks/mo
- ✅ Bing: Discovered and indexed, secondary traffic source
- ✅ Perplexity: Continued citations, mach2.cloud as established source
- ✅ ChatGPT/Claude: Starting to index and cite mach2.cloud
- ✅ Gemini: Articles appearing in responses

---

## Architecture

### 1. Metadata & Canonical URLs

**Files**: `app/[locale]/layout.tsx`, `app/[locale]/page.tsx`, core pages

**Structure**:

```
Root Layout (app/[locale]/layout.tsx)
├─ Global metadata (title, description, OG image fallback)
├─ Person schema (Christian Weber expertise, credentials)
├─ WebSite schema (SiteNavigationElement for sitelinks)
├─ AI crawler allow rules (robots.txt)
└─ Google Analytics
    │
    ├─ Homepage (app/[locale]/page.tsx)
    │  └─ Dynamic metadata + all schemas
    │
    ├─ Blog Index (app/[locale]/blog/page.tsx)
    │  └─ Blog keywords + performance tracking
    │
    ├─ Blog Articles (app/[locale]/blog/[slug]/page.tsx)
    │  ├─ metaDescription (from Notion)
    │  ├─ dateModified (from Notion)
    │  ├─ Article JSON-LD schema
    │  └─ Related articles component
    │
    └─ Other Routes (diagnosis, services, WAF++, etc.)
       └─ Unique metadata per route
```

### 2. JSON-LD Schemas (GEO Foundation)

**Person Schema** (Homepage):

```json
{
  "@type": "Person",
  "name": "Christian Weber",
  "url": "https://mach2.cloud",
  "jobTitle": "AI‑Native Cloud & Platform Architect",
  "sameAs": ["linkedin.com/in/christian-weber-0591", "github.com/chriscloud27", "WAF++.dev"],
  "knowsAbout": ["AI-native architecture", "Platform engineering", "Series A–B SaaS scaling", ...]
}
```

**WebSite Schema** (Homepage with Sitelinks):

```json
{
  "@type": "WebSite",
  "hasPart": [
    { "name": "Architecture Diagnosis Call", "url": "...", "position": 1 },
    { "name": "Blog", "url": "...", "position": 2 },
    { "name": "Services", "url": "...", "position": 3 },
    { "name": "WAF++ Framework", "url": "...", "position": 4 }
  ]
}
```

**Article Schema** (All Blog Posts):

```json
{
  "@type": "Article",
  "headline": "{{ post.title }}",
  "description": "{{ post.metaDescription }}",
  "datePublished": "{{ post.date }}",
  "dateModified": "{{ post.dateModified }}",
  "author": { "name": "Christian Weber" },
  "keywords": "{{ post.tags.join(', ') }}",
  "mainEntity": "{{ canonical_url }}"
}
```

### 3. Robots.txt & Crawlers

**File**: `app/robots.ts`

**Rules**:

```
User-agent: *
Allow: /
Disallow: /api, /admin, /private

User-agent: GPTBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

Sitemap: https://mach2.cloud/sitemap.xml
```

**Impact**: Explicitly allows 5 major crawlers (2 traditional + 3 AI). Signals active permission for training data inclusion.

### 4. Sitemap Generation

**File**: `app/sitemap.ts`

**Generation**:

1. Iterates all locales (en, de, es)
2. Static routes: /, /about, /blog, /services, /services/agentic-team-focal, /diagnosis, /WAF++, /whitepaper (8 per locale = 24)
3. Case studies: 4 case studies × 3 locales = 12
4. Blog articles: ~12 articles × 3 locales = 36
5. **Total**: ~72 URLs

**Priorities**:

- Homepage: 1.0 (weekly)
- /WAF++: 0.9 (monthly)
- /services: 0.85 (monthly)
- /blog: 0.8 (monthly)
- Blog articles: 0.8 (monthly)
- /about: 0.7 (monthly)
- Cases: 0.6 (monthly)

### 5. Blog Article Data Model

**Notion Integration** (`lib/notion.ts`):

```
Blog Post Fields:
├─ slug (unique URL identifier)
├─ title (H1, exact match with meta title)
├─ metaDescription (NEW: 155 chars, pain-first)
├─ date (publishedTime)
├─ dateModified (NEW: ISO date for freshness)
├─ excerpt (fallback to metaDescription)
├─ tags/keywords (existing multi_select → Article schema keywords)
├─ cover_image (og:image)
├─ published (boolean filter)
├─ internalLinks (NEW: relation to 2-3 related articles)
└─ blocks (rendered HTML content)
```

---

## Process

### Content Creation Workflow

```
1. WRITE ARTICLE (in Notion)
   ├─ Set Title (becomes H1, meta title)
   ├─ Set Slug (URL-friendly)
   ├─ Set Date (publishedTime)
   ├─ Write Excerpt
   ├─ Add Tags (5-8 keywords)
   ├─ Set MetaDescription (155 chars, pain-first)
   ├─ Set CoverImage (og:image)
   └─ Set DateModified (if updating)
   └─ Set RelatedArticles (link 2-3 similar posts)

2. PUBLISH (mark Published = true)

3. BUILD & DEPLOY
   ├─ `npm run build` (generates sitemap, routes)
   └─ Deploy to Vercel/production

4. REQUEST INDEXING (Google Search Console)
   ├─ URL Inspection → Request Indexing
   └─ Wait 24-72 hours for Google decision

5. MONITOR (Automated via n8n/Apps Script)
   ├─ Daily: Check coverage (indexed vs crawled)
   ├─ Weekly: Performance report (clicks, impressions)
   └─ Monthly: GEO baseline test (ask AI engines)
```

### Monitoring Automation

**Two automation options**:

**Option A: Google Apps Script** (Free, easiest)

- Daily 8 AM: Pull GSC coverage data
- Daily 8 AM: Validate Article schemas
- Weekly Fri 5 PM: Generate performance report
- Monthly 1st: Trigger manual GEO tests

**Option B: n8n Workflows** (Self-hosted or cloud, most flexible)

- 4 complete workflows (see `N8N_AUTOMATION.md`)
- Google Sheets storage
- Email alerts
- Advanced trending analysis

**Where to start**: Option A this week, upgrade to Option B by Week 2.

### GEO Verification Protocol

**Week 0 (Baseline)**: Establish baseline — ask all AI engines

```
ChatGPT: "Who is Christian Weber, AI‑Native Cloud & Platform Architect?"
Perplexity: "What is the WAF++ framework?"
Claude: "Who helps Series A SaaS scale cloud architecture?"
Gemini: "What is AI‑Native Cloud & Platform Architecture?"
```

Record: Does mach2.cloud appear? In what position? What quote?

**Week 6**: Re-test all engines

- Compare results to Week 0
- Expect more consistent citations

**Week 12**: Final verification

- Full data from Google Search Console + all AI engines
- Proof that GEO implementation is working

---

## Related Documents

**Implementation Guides**:

- `N8N_AUTOMATION.md` — 4 complete n8n workflows (copy-paste JSON)
- `SEARCH_ENGINE_MONITORING.md` — Bing setup, n8n connection options
- `SEO_MONITORING_SETUP.md` — Quick checklist, action items
- `VERIFICATION_CHECKLIST.md` — Schema validation steps
- `A5_CMO_SEO_GEO_AGENT_BRIEF.md` — AI agent mission + success metrics
- `MONITORING_MASTER_REFERENCE.md` — One-page overview

**Code Files**:

- `app/sitemap.ts` — Sitemap generation (updated to include diagnosis, whitepaper, agentic-team-focal)
- `app/robots.ts` — Robots.txt with AI crawler allow rules
- `app/[locale]/layout.tsx` — Global metadata + OG fallback
- `app/[locale]/page.tsx` — Homepage schemas (Person, WebSite, SiteNavigationElement)
- `app/[locale]/blog/[slug]/page.tsx` — Blog article metadata + Article schema
- `lib/notion.ts` — Extract metaDescription, dateModified, internalLinks from Notion
- `components/blog/RelatedArticles.tsx` — Internal linking component
- `scripts/check-seo.mjs` — SEO validation script (existing)

**Monitoring Resources**:

- Google Search Console: https://console.google.com/webmasters
- Bing Webmaster Tools: https://bing.com/webmasters (NEW — add today)
- Google Sheets: For tracking (Date, Indexed, Crawled, Errors, Clicks)
- n8n: For automation (self-hosted or https://n8n.cloud)

---

## Action Items for A5-CMO Agent

### Immediate (This Week)

- [ ] **Set up daily monitoring**: Choose automation path (Apps Script or n8n)
  - **Owner**: You (or delegate to ops)
  - **Time**: 30 min setup, then automated
  - **Deliverable**: Google Sheet with daily data flowing in

- [ ] **Add Bing Webmaster Tools**:
  - Go to: https://bing.com/webmasters
  - Add site: mach2.cloud
  - Verify ownership
  - Submit sitemap
  - **Owner**: You
  - **Time**: 5 min
  - **Deliverable**: Bing now crawling mach2.cloud

- [ ] **Create tracking spreadsheet**:
  - Columns: Date, Indexed, Crawled, Errors, Clicks, Impressions, Avg CTR, Avg Position, Status
  - **Owner**: You
  - **Time**: 5 min
  - **Deliverable**: Historical data collection starts today

### Week 1–2

- [ ] **Request indexing in Google Search Console**:
  - URL Inspection → https://mach2.cloud/en/
  - Request Indexing
  - Repeat for 3–4 blog articles
  - **Owner**: You
  - **Time**: 10 min
  - **Deliverable**: Google queues crawl, indexing decision in 24–72 hrs

- [ ] **Backfill Notion metadata**:
  - Add 3 new properties: MetaDescription, DateModified, RelatedArticles
  - For each blog article:
    - MetaDescription: 155 chars, pain-first (e.g., "Series A SaaS teams struggling with cloud cost? Here's why...")
    - Tags: 5–8 keywords (reuse existing Tags field)
    - RelatedArticles: Link 2–3 topically related articles
  - **Owner**: Content team
  - **Time**: 1–2 hours
  - **Deliverable**: Article metadata complete for all 12 posts

- [ ] **Validate schemas**:
  - https://search.google.com/test/rich-results → test homepage
  - https://validator.schema.org → test one blog article
  - **Owner**: You
  - **Time**: 10 min
  - **Deliverable**: Confirm all schemas parse without errors

### Week 3–4

- [ ] **Monitor coverage moving week**:
  - Check Google Search Console daily
  - Homepage should be Indexed (appears within 2–3 days)
  - Articles should move from Crawled → Indexed (takes 1–3 weeks)
  - **Owner**: Automated (you just check)
  - **Deliverable**: Coverage milestone: 50%+ blog URLs indexed

- [ ] **Check performance appearing**:
  - Google Search Console → Performance
  - Expect 5–20 clicks, 100–300 impressions
  - Top keywords: "mach2.cloud", "Christian Weber", maybe "architecture SaaS"
  - **Owner**: You
  - **Time**: 5 min/day
  - **Deliverable**: First proof that SEO is working

- [ ] **Test LinkedIn Post Inspector**:
  - https://linkedin.com/post-inspector
  - Paste: https://mach2.cloud/en/, https://mach2.cloud/blog, any article URL
  - Verify: Branded OG image, correct title, description appear
  - **Owner**: You
  - **Time**: 10 min
  - **Deliverable**: Confirm OG image fallback working

### Month 2

- [ ] **Analyze trending keywords**:
  - Google Search Console → Top 3–5 keywords appearing?
  - Which pages driving clicks? (high CTR vs low CTR analysis)
  - **Owner**: AI agent can provide this weekly
  - **Deliverable**: Identify strongest-performing content angles

- [ ] **Optimize underperformers**:
  - Articles with high impressions but low CTR (< 4%)?
  - Update meta descriptions to match search intent
  - **Owner**: Content team
  - **Time**: 30 min per article
  - **Deliverable**: CTR improvements in Week 3

- [ ] **Plan Phase 2 content**:
  - Based on top keywords, outline 3–5 new articles
  - Focus on gaps (high-impression, zero-click queries)
  - **Owner**: CMO + content team
  - **Deliverable**: Phase 2 content calendar

### Week 6 (GEO Baseline Verification)

- [ ] **Run baseline verification test**:
  - Ask ChatGPT: "Who is Christian Weber, AI‑Native Cloud & Platform Architect?"
  - Ask Perplexity: "What is the WAF++ framework?"
  - Ask Claude: "Who helps Series A SaaS companies scale cloud architecture?"
  - Ask Gemini: "What is AI‑Native Cloud & Platform Architecture?"
  - **Screenshot each response**
  - Record: Does mach2.cloud appear? As what quote?
  - **Owner**: You
  - **Time**: 15 min
  - **Deliverable**: Baseline GEO results (compare to Week 0 results)

### Month 3

- [ ] **Analyze full results**:
  - Google: 100% indexed, 30–100 clicks/mo, 5–8 keywords ranking?
  - Bing: Traffic appearing?
  - AI: mach2.cloud now appearing consistently in ChatGPT, Perplexity, Claude, Gemini?
  - **Owner**: AI agent summarizes this
  - **Deliverable**: Phase 1 success/failure analysis

- [ ] **Make strategic decision**:
  - ✅ If all metrics hitting targets: Continue strategy, scale Phase 2
  - ⚠️ If CTR/position flat: Revise keyword strategy or meta descriptions
  - ❌ If not indexed yet: Debug robots.txt, check for noindex tags, investigate blocks
  - **Owner**: CMO
  - **Deliverable**: Decision → Phase 2 strategy or pivot

---

## Success Criteria & Milestones

### Week 0 (Baseline - Today)

```
✅ Perplexity indexing mach2.cloud
❌ ChatGPT/Claude not yet indexed (expected)
→ This is the baseline. Record it.
```

### Week 3–4

```
✓ Homepage Indexed
✓ 50%+ blog URLs Indexed
✓ 5–20 clicks from organic search
✓ Coverage: 0 errors
→ SEO is working. Continue.
```

### Week 6 (GEO Verification)

```
✓ Google: 100% indexed
✓ ChatGPT: Starting to index (maybe)
✓ Perplexity: Continued citations
✓ Claude: Starting to index
→ GEO implementation shown significant progress.
```

### Month 3 (End Goal)

```
✓ 100% indexed
✓ 30–100 clicks/month
✓ 5–8 keywords ranking (top 20)
✓ mach2.cloud appearing as primary source in 3+ AI engines
✓ Organic traffic growing 20%+ month-over-month
→ Phase 1 complete. Plan Phase 2 (expand topical authority).
```

---

## Quick Commands

**Check SEO health locally**:

```bash
node scripts/check-seo.mjs --sitemap=https://mach2.cloud/sitemap.xml --max=40
```

**Verify sitemap has new pages**:

```bash
curl https://mach2.cloud/sitemap.xml | grep -c "</url>"
# Should show ~72 URLs
```

**Check robots.txt allows crawlers**:

```bash
curl https://mach2.cloud/robots.txt | grep -E "GPTBot|ClaudeBot|PerplexityBot"
# Should show explicit Allow rules
```

**View homepage Person schema**:

```bash
curl https://mach2.cloud/en/ | grep -A 20 'Person'
```

---

## Next Steps This Week

1. [ ] Set up monitoring (Apps Script or n8n)
2. [ ] Add Bing Webmaster Tools
3. [ ] Request indexing in GSC for homepage + 3 articles
4. [ ] Create tracking spreadsheet
5. [ ] Start Notion backfill (metaDescription, Tags, RelatedArticles)
6. [ ] Validate schemas

**Owner**: You (or delegate ops to handle automation)
**Time**: 1–2 hours total setup
**Result**: Fully automated monitoring + indexed content + ready for Week 3–4 analysis
