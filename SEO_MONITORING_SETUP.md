# SEO Monitoring Setup — Next Steps (Quick Reference)

## CHANGELOG 2026-03-20

1. ✅ **Sitemap Enhanced**
   - Added `/diagnosis` (CTA page — high priority)
   - Added `/whitepaper`, `/services/agentic-team-focal`
   - Increased blog article priority from 0.7 → 0.8
   - Sitemap now at: `https://mach2.cloud/sitemap.xml`

2. ✅ **README Updated**
   - Added SEO/GEO Monitoring Dashboard with metrics table
   - Added expected results by timeline (Week 1–2, Week 3–4, Month 2–3)
   - Added red flags to watch for
   - Added checkpoint actions for next 3 months

3. ✅ **Automation Template Created**
   - n8n workflows ready to import
   - Google Apps Script alternative (simpler)
   - See: `N8N_AUTOMATION.md`

---

## Understanding "Come Back in a Day or So"

When Google Search Console says this after a "Request Indexing":

```
Status: "Request received"
"Check back in about a day for status"
```

This means: ✅ **Google received it** → ⏳ **Queued for crawl** → ⏱️ **24–72 hours for decision**

**What to do**:

- ✓ Wait 24 hours (don't re-request)
- ✓ Check URL Inspection again after 24 hrs
- ✓ If still "Request received" → wait another 24 hrs (Google is busy)
- ✗ Don't spam "Request Indexing" repeatedly

---

## Your Monitoring Setup (Choose One)

### Option A: Google Apps Script (Easiest, No Cost)

1. Open your tracking Google Sheet
2. Tools → Script Editor
3. Copy code from `N8N_AUTOMATION.md` (Google Apps Script section)
4. Set up triggers: Create → Daily 8 AM UTC
5. **Result**: Daily email + sheet auto-populated

**Time to set up**: 10 minutes

### Option B: n8n (Most Flexible, Some Setup)

1. Deploy n8n (self-hosted or n8n Cloud)
2. Create Google Service Account (15 min)
3. Import workflows from `N8N_AUTOMATION.md`
4. Connect Google Sheets + Email
5. **Result**: Advanced alerts + multiple workflows + custom logic

**Time to set up**: 45 minutes

---

## Right Now Checklist

**Today (before going live)**:

- [ ] Verify sitemap loads: `curl https://mach2.cloud/sitemap.xml | head -20`
  - Should show all pages including /diagnosis
- [ ] Test robots.txt: `curl https://mach2.cloud/robots.txt | grep -E "GPTBot|ClaudeBot"`
  - Should show explicit allow rules
- [ ] Request indexing for homepage:
  - GSC → URL Inspection → `https://mach2.cloud/en/`
  - Report: "URL is on Google" → Request Indexing → Done
- [ ] Request indexing for 3 blog articles:
  - Any article URL like `https://mach2.cloud/en/blog/ai-native-platform-design`
  - Request Indexing → Done

**Starting Today**:

- [ ] Set up Google Sheet for tracking (columns: Date, Indexed, Crawled, Errors, Clicks)
- [ ] Choose monitoring: Apps Script OR n8n (see above)
- [ ] Add 3 new properties to Notion blog database:
  - MetaDescription (rich_text)
  - DateModified (date)
  - RelatedArticles (relation)
- [ ] Start backfilling articles:
  - Add MetaDescription (155 chars, pain-first)
  - Add Tags (5–8 keywords per article)
  - Add RelatedArticles (link 2–3 articles)

---

## Monitoring Cadence (Automated / Semi-Automatic)

| Task               | Frequency       | How               | Alert If                    |
| ------------------ | --------------- | ----------------- | --------------------------- |
| Coverage check     | Daily 8 AM      | Apps Script / n8n | Errors > 0                  |
| Schema validation  | Weekly Fri 9 AM | Apps Script / n8n | Keywords empty              |
| Performance report | Weekly Fri 5 PM | Apps Script / n8n | Clicks flat 2 weeks         |
| GEO baseline test  | Monthly 1st     | Manual (ask AI)   | mach2.cloud not in response |
| Trend analysis     | Monthly         | Read Google Sheet | Declining CTR?              |

---

## Expected Results (Reference)

Note these dates in your calendar:

| Date              | What to Check      | Expected                            |
| ----------------- | ------------------ | ----------------------------------- |
| Today + 24 hrs    | GSC URL Inspection | Homepage: "Indexed" ✓               |
| Week 2            | GSC Coverage       | Articles in Crawled or Indexed      |
| Week 4            | GSC Performance    | 5–20 clicks, 100+ impressions       |
| Week 6 (Baseline) | Ask ChatGPT, etc.  | mach2.cloud possibly in responses   |
| Week 12           | GSC All Metrics    | 30–100 clicks, 5–8 keywords ranking |

---

## Files Created/Updated

| File                        | Purpose                                                     |
| --------------------------- | ----------------------------------------------------------- |
| `N8N_AUTOMATION.md`         | 4 complete n8n workflows + Apps Script alternative          |
| `VERIFICATION_CHECKLIST.md` | Schema validation checklist (already exists)                |
| `README.md`                 | Added section: "SEO/GEO Health Monitoring Dashboard"        |
| `app/sitemap.ts`            | Updated: includes diagnosis, whitepaper, agentic-team-focal |

---

## Quick Links

- **Google Search Console**: https://console.google.com/webmasters
- **Sitemap**: `https://mach2.cloud/sitemap.xml`
- **Robots.txt**: `https://mach2.cloud/robots.txt`
- **n8n Workflows**: See `N8N_AUTOMATION.md`
- **Notion Properties to Add**: MetaDescription, DateModified, RelatedArticles

---

## Support

If you hit any issues:

1. **Sitemap not updating?**
   - Check: `/app/sitemap.ts` includes all routes
   - Rebuild: `npm run build`
   - Purge GSC cache: Resubmit sitemap in GSC

2. **Articles not indexing after 1 week?**
   - Check robots.txt: Is it blocking crawlers?
   - Check GSC: Do they show "Crawled" but not indexed?
   - Fix: May be noindex tag or server error

3. **Schema validation failing?**
   - Use: `search.google.com/test/rich-results`
   - Check exact error message
   - Most common: Empty `keywords` field (add Tags in Notion)

---

**Next action: Set up Google Apps Script or n8n, then backfill Notion metadata. Everything is ready to go.**
