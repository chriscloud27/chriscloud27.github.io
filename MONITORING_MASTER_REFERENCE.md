# SEO/GEO Monitoring: Master Reference & AI Agent Handoff

## Executive Summary

Your SEO/GEO implementation is live. Now you need three things:

1. ✅ **Daily monitoring** (automated via n8n or Google Apps Script)
2. ✅ **Search engine coverage** (Google + Bing, plus AI crawlers)
3. ✅ **AI agent briefing** (for your A5-CMO to use SEO data for positioning/messaging)

---

## Search Engines to Monitor (Ranked by Priority)

### Traditional Search (SEO)

| Priority | Engine                    | Market Share | Status           | Action                                     |
| -------- | ------------------------- | ------------ | ---------------- | ------------------------------------------ |
| **1**    | Google                    | 90%          | ✅ Active in GSC | Monitor daily via n8n                      |
| **2**    | Bing                      | 3%           | ⏳ Setup today   | Add to Bing Webmaster Tools                |
| **3–4**  | DuckDuckGo, Yandex, Baidu | <1% each     | ❌ Skip          | Not worth monitoring for Series A SaaS ICP |

**Action**: Add Bing Webmaster Tools today (5 min) → https://bing.com/webmasters

---

### AI Search Engines (GEO - Your Real Differentiator)

| Rank  | Engine            | Users | Test Quarterly            | Why It Matters             |
| ----- | ----------------- | ----- | ------------------------- | -------------------------- |
| **1** | ChatGPT           | 200M  | "Who is Christian Weber?" | Largest AI search volume   |
| **2** | Perplexity        | 50M   | "What is WAF2p?"          | Cites sources prominently  |
| **3** | Claude            | 50M   | Run via API               | You have full API access   |
| **4** | Google Gemini     | 100M  | gemini.google.com         | Google-native AI           |
| **5** | Microsoft Copilot | 50M   | copilot.microsoft.com     | Bing-based, lower priority |

**Testing Protocol**:

- **Weekly**: Ask ChatGPT + Perplexity manually
- **Monthly**: Run baseline test on all 4 engines
- **Week 6 + Month 3**: Screenshot + record mach2.cloud citations

---

## Automation Setup: Choose Your Path

### Path A: Google Apps Script (Easiest, Free)

- ⏱️ Setup: 10 minutes
- 📊 Data: Appends to Google Sheet daily
- 📧 Alerts: Email if errors detected
- 💰 Cost: Free
- See: `N8N_AUTOMATION.md` (Google Apps Script section)

### Path B: n8n Local (Most Flexible)

- ⏱️ Setup: 30 minutes
- 🔄 Workflows: 4 complete workflows ready to import
- 📊 Data: Google Sheets + Email
- 💰 Cost: Free (self-hosted) or $25+/mo (cloud)
- See: `N8N_AUTOMATION.md` (n8n section) + `SEARCH_ENGINE_MONITORING.md`

### Path C: n8n Cloud + Claude Integration (Most Advanced)

- ⏱️ Setup: 45 minutes
- 🔄 Workflows: Same as Path B
- 🤖 Integration: Claude can trigger checks via webhooks
- 📊 Data: Real-time reporting to Claude
- 💰 Cost: $25+/mo (n8n cloud)
- See: `SEARCH_ENGINE_MONITORING.md` (Option 2)

**Recommendation**: Start with **Path A** (Apps Script), graduate to **Path B** (n8n local) after 2 weeks.

---

## What n8n/Apps Script Monitors (Daily/Weekly)

```
Every Morning (8 AM UTC):
├─ Coverage: Indexed count, Crawled count, Errors
├─ Schema: Article schemas valid? Keywords populated?
├─ Last crawl date
└─ Alert if: Errors > 0 OR indexed dropping

Every Friday (5 PM UTC):
├─ Performance (last 7 days)
├─ Clicks: {{ weekly_clicks }} (↑/↓ vs last week)
├─ Impressions, CTR, Avg Position
├─ Top 5 keywords by clicks
└─ Trend alert if CTR declining or clicks flat

Every Month (1st):
├─ GEO Baseline Test
├─ Ask: ChatGPT, Perplexity, Claude, Gemini
├─ Record: Does mach2.cloud appear as source?
└─ Compare to previous month

All data stored in Google Sheet for historical analysis
```

---

## Your AI Agent's Mission (A5-CMO Brief)

**See**: `A5_CMO_SEO_GEO_AGENT_BRIEF.md` (full document)

### In 30 Seconds:

Your AI agent monitors 3 things daily:

1. **SEO Health** (indexed URLs, schema validation, errors)
2. **Performance** (clicks, impressions, positions, CTR trends)
3. **GEO Presence** (mach2.cloud appearing in AI search responses)

### What Agent Tells You Weekly:

```
"Your SEO is healthy. 45 URLs indexed, no errors.
Top keyword: 'AI-native architecture' (position 12, 8 clicks).
CTR trending up 15% — meta descriptions working well.
Action: Continue current strategy, start phase 2 content."

OR

"⚠️ Warning: 3 articles stuck in 'Crawled' for 2+ weeks.
Cause: Likely missing Notion Tags (keywords field empty).
Action: Add 5–8 Tags to each article in Notion, request re-index in GSC."
```

### What Agent Uses for CMO Strategy:

**Input**: Daily SEO metrics
↓
**Agent Analyzes**: Keyword intent, position trends, ICP fit
↓
**Output to CMO**:

- Which content angles resonate with ICP (top keywords)
- Which positioning messages drive highest CTR (meta descriptions)
- Where to invest next (high-impression, low-CTR articles)
- GEO progress (is mach2.cloud becoming trusted source?)

**Feeds Into**: Content calendar, messaging strategy, website copy

---

## Timeline & Success Criteria

### Week 1–2: Crawl Phase

```
Expected: Homepage indexed, articles in queue
Metric Target:
  ✓ Errors: 0
  ✓ Clicks: 0–3 (branded only)
  ✓ Homepage: Indexed

Decision: Continue, start Notion backfill
```

### Week 3–4: Indexing Phase

```
Expected: 50%+ articles indexed, 5–20 clicks
Metric Target:
  ✓ Coverage: 50%+ blog URLs indexed
  ✓ Clicks: 5–20
  ✓ Keywords appearing: "mach2.cloud", "Christian Weber"
  ✓ Avg position: 15–25

Decision:
  IF clicking well → Accelerate content creation
  IF flat clicks → Revise meta descriptions or keyword targeting
```

### Month 2: Authority

```
Expected: 100% indexed, 30–100 clicks, 5–8 keywords ranking
Metric Target:
  ✓ Indexed: 100% of blog URLs
  ✓ Clicks: 30–100/month
  ✓ Keywords: Brand + 5–8 topical keywords
  ✓ Avg position: 10–20

Decision: Start phase 2 (expand keyword targets, create authority content)
```

### Month 3: GEO Validation

```
Expected: mach2.cloud appearing in AI responses
Metric Target:
  ✓ ChatGPT: mach2.cloud appears ✓
  ✓ Perplexity: mach2.cloud appears ✓
  ✓ Claude: mach2.cloud appears ✓
  ✓ Gemini: mach2.cloud appears (maybe)

Decision: GEO implementation proven. Plan long-term strategy.
```

---

## Action Items This Week

### Today (March 27)

- [ ] Set up Bing Webmaster Tools
  - Go: https://bing.com/webmasters
  - Add site: mach2.cloud
  - Submit sitemap
  - Time: 5 min

### Days 1–3

- [ ] Choose automation path (Apps Script vs n8n)
- [ ] Set up first workflow
- [ ] Configure Google Sheet for tracking
- [ ] Send test run → verify data flows

### Days 3–7

- [ ] Deploy all workflows (or let Apps Script run)
- [ ] Set up email alerts
- [ ] Create Google Sheet dashboard
- [ ] Ready to brief AI agent by end of week

---

## Files You Now Have

| File                            | Purpose                                    | Read If                     |
| ------------------------------- | ------------------------------------------ | --------------------------- |
| `A5_CMO_SEO_GEO_AGENT_BRIEF.md` | AI agent mission + success metrics         | You're building an AI agent |
| `N8N_AUTOMATION.md`             | 4 ready-to-use n8n workflows + Apps Script | Setting up automation       |
| `SEARCH_ENGINE_MONITORING.md`   | Search engine priorities + n8n setup       | Choosing automation path    |
| `SEO_MONITORING_SETUP.md`       | Quick reference checklist                  | Starting today              |
| `README.md` (updated)           | SEO/GEO dashboard + timeline               | Overview of everything      |

---

## Next 3 Months at a Glance

```
Week 1-2     → Set up monitoring, start backfilling Notion
Week 3-4     → First real data arrives, first decision point
Week 6       → GEO baseline test 1 (ask AI engines)
Month 2      → Trend analysis, optimize underperformers
Month 2-3    → Content phase 2 (expand topical authority)
Month 3      → GEO baseline test 2 (compare to week 6)
             → Decide: Continue current strategy or pivot
```

---

## One-Page Summary for Your Calendar

**Copy this and save as recurring meeting notes:**

```
SEO/GEO Health Check Meeting (Every Friday 5 PM)

Dashboard: [ Your Google Sheet ]
Status: [ Green/Yellow/Red ]

This Week:
  ✓ Indexed: ____ URLs
  ✓ Crawled: ____ URLs
  ✓ Errors: ____
  ✓ Clicks: ____ (↑/↓ _ %)
  ✓ Top keyword: ____

Top 3 Actions:
  1. ____
  2. ____
  3. ____

GEO Status (Monthly):
  ✓ ChatGPT: mach2.cloud? Y/N
  ✓ Perplexity: mach2.cloud? Y/N
  ✓ Claude: mach2.cloud? Y/N

Decision for Next Week:
  [ ] Continue current strategy
  [ ] Optimize [ specific aspect ]
  [ ] Investigate [ red flag ]
  [ ] Pivot to [ new direction ]
```

---

## Support

- **n8n Issues?** See `SEARCH_ENGINE_MONITORING.md` options A/B/C
- **Search engine confusion?** Check `SEARCH_ENGINE_MONITORING.md` priority table
- **AI agent setup?** Read `A5_CMO_SEO_GEO_AGENT_BRIEF.md` fully
- **Quick start?** Follow `SEO_MONITORING_SETUP.md` checklist

---

**Status**: Ready to go live. You're monitoring across 2 traditional search engines + 4 AI search engines, with daily automated checks. AI agent is briefed on success criteria, timeline, and decision framework.

**Next milestone**: Week 3 when first click data appears. That's when you'll know if the SEO/GEO strategy is working.
