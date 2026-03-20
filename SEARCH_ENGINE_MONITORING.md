# Quick Setup: Bing Webmaster Tools + n8n Connection

## 1. Add Bing Webmaster Tools (5 minutes)

**Why**: Bing has 3% market share + indexes different content than Google. Worth monitoring.

### Setup Steps:

1. Go to [bing.com/webmasters](https://bing.com/webmasters)
2. Sign in (Microsoft account, or create one)
3. Add Site: `https://mach2.cloud`
4. Verify ownership (choose one):
   - **Easiest**: Upload HTML meta tag to root
   - **Via DNS**: Add TXT record (takes 24 hrs)
5. Submit sitemap: `https://mach2.cloud/sitemap.xml`

**Result**: Bing now crawls mach2.cloud. You can see:

- Indexed pages
- Crawl errors
- Keywords Bing found
- Traffic (if from Bing)

---

## 2. n8n Local Setup + Claude Integration

### Option 1: Just Use n8n UI (Simplest)

**If your n8n is running at localhost:5678**:

1. **Access n8n**: http://localhost:5678
2. **Go to Workflows** → Create new
3. Copy one of the 4 workflows from `N8N_AUTOMATION.md`
4. Import nodes:
   - Cron (trigger)
   - HTTP (Google Search Console API)
   - Google Sheets (append data)
   - Email (send alert)
5. **Set credentials**:
   - Google Service Account (JSON file)
   - Gmail/email provider
6. **Enable trigger** → Workflow runs on schedule

**Time**: 30 minutes setup

---

### Option 2: Expose n8n to Claude (Advanced)

If you want Claude to ask n8n questions:

1. **Deploy n8n to cloud** (or expose localhost):
   - n8n Cloud: Sign up at [n8n.cloud](https://n8n.cloud)
   - Or use ngrok: `ngrok http 5678` → get public URL
   - Cloud URL example:`https://mach2-seo.n8n.cloud`

2. **Create webhook endpoint in n8n**:
   - New workflow → HTTP Request trigger
   - Method: POST
   - URL: `https://your-n8n-domain/webhook/seo-check`
   - Body type: JSON

3. **Test webhook** (from terminal):

   ```bash
   curl -X POST https://your-n8n/webhook/seo-check \
     -H "Content-Type: application/json" \
     -d '{"action": "check_coverage", "date": "2026-03-27"}'
   ```

4. **Give Claude the webhook URL**:
   - Claude can now call: `POST https://your-n8n/webhook/seo-check`
   - n8n executes the workflow
   - Returns results as JSON

**Practical Example**:

```
User to Claude: "Check my SEO health"
Claude calls: POST /webhook/seo-check
n8n runs: Check GSC coverage + schema validation
n8n returns: { indexed: 45, errors: 0, status: "healthy" }
Claude tells user: "Your site is healthy — 45 URLs indexed, no errors"
```

---

### Option 3: Use n8n API (Most Flexible)

If you want to script interactions:

1. **Get n8n API key** (Settings → API keys)
2. **Call n8n API directly**:

```bash
# Trigger a workflow
curl -X POST https://your-n8n-domain/api/v1/workflows/{{ workflow_id }}/activate \
  -H "Content-Type: application/json" \
  -H "X-N8N-API-KEY: your-api-key" \
  -d '{"data": {"date": "2026-03-27"}}'

# Get workflow execution results
curl -X GET https://your-n8n-domain/api/v1/executions \
  -H "X-N8N-API-KEY: your-api-key"
```

---

## 3. Search Engines to Monitor (Priority Order)

### Tier 1: Must Monitor

```
1. Google Search Console (active)
   - 90% of organic traffic
   - Full indexing data + Performance metrics

2. Bing Webmaster Tools (ADD TODAY)
   - 3% of organic traffic
   - Different index = different insights
   - Easy setup (5 min)
```

### Tier 2: Monitor for GEO

```
1. ChatGPT (ask directly)
   - ~200M users
   - Largest AI search volume
   - Check weekly

2. Perplexity (ask directly)
   - ~50M users
   - Cites sources prominently
   - Check weekly

3. Claude (ask directly)
   - ~50M users
   - You have API access
   - Check bi-weekly

4. Google Gemini (gemini.google.com)
   - ~100M users
   - Integrated with Google
   - Check monthly
```

### Tier 3: Optional (Lower Priority)

```
- Copilot (Microsoft Bing-based)
- Kimi (Asia-focused)
- Grok (X/Twitter, limited data)
- DuckDuckGo (privacy users, small segment)
```

---

## 4. Automated Search Engine Monitoring

### Create n8n Workflow: "Weekly Search Engine Audit"

**Trigger**: Every Monday 9 AM

**Steps**:

1. **For Google**: Call GSC API
   - Get top 5 keywords
   - Get average position
   - Get clicks trend

2. **For Bing**: Call Bing Webmaster API
   - Get top queries
   - Compare to last week

3. **For AI Engines**:
   - Send webhook to external service (optional)
   - Or manually record in Google Sheets (simpler)

4. **Output**: Email report

   ```
   Weekly Search Engine Summary

   Google:
   - Top keyword: "AI-native architecture" (position 12)
   - Clicks: 18 (↑ 20% vs last week)
   - Indexed: 45 URLs

   Bing:
   - Top keyword: "cloud architecture SaaS" (position 8)
   - Impressions: 45

   AI Search (Manual Test):
   - ChatGPT: mach2.cloud mentioned ✓
   - Perplexity: mach2.cloud mentioned ✓
   - Claude: not yet
   - Gemini: not yet
   ```

**Result**: You get one email per week with holistic search engine health.

---

## Quick n8n Workflow Template

```json
{
  "name": "Weekly SEO Health Check",
  "nodes": [
    {
      "name": "Trigger (Monday 9 AM)",
      "type": "trigger:cron",
      "expression": "0 9 * * MON"
    },
    {
      "name": "Get GSC Data",
      "type": "http",
      "url": "https://www.googleapis.com/webmasters/v3/sites/https%3A%2F%2Fmach2.cloud/searchAnalytics/query",
      "method": "POST",
      "auth": "google_oauth2"
    },
    {
      "name": "Get Bing Data",
      "type": "http",
      "url": "https://www.bingwebmaster.com/api/v1/siteinfolist",
      "method": "GET",
      "auth": "bing_api"
    },
    {
      "name": "Format Report",
      "type": "code",
      "language": "javascript",
      "code": "return { google: items[0].json, bing: items[1].json }"
    },
    {
      "name": "Send Email",
      "type": "email",
      "to": "christian@mach2.cloud",
      "subject": "📊 Weekly SEO Report",
      "body": "{{ $node.Format Report.json }}"
    }
  ]
}
```

---

## Recommended Timeline

**Today (March 27)**:

- [ ] Set up Bing Webmaster Tools (5 min)
- [ ] Verify sitemap there
- [ ] Note Bing traffic baseline

**Week 1**:

- [ ] Set up n8n locally or in cloud
- [ ] Import 1 workflow (Daily Coverage Check)
- [ ] Test it runs successfully

**Week 2**:

- [ ] Add other 3 workflows
- [ ] Set up email alerts
- [ ] Verify all credentials work

**Week 3**:

- [ ] Start collecting data in Google Sheet
- [ ] Run first GEO baseline test (ask AI engines)
- [ ] Create comparison baseline

**Month 2**:

- [ ] Review trends
- [ ] Optimize underperforming content
- [ ] Expand n8n to include Bing API calls

---

## Search Engine Monitoring Checklist

- [ ] Google Search Console (active)
- [ ] Bing Webmaster Tools (add today)
- [ ] n8n workflows deployed (Week 1)
- [ ] Email alerts configured
- [ ] Google Sheet for historical data
- [ ] Manual GEO baseline test ready (ChatGPT, Perplexity, Claude, Gemini)
- [ ] Calendar reminder: Check metrics weekly

---

**Next**: Deploy Bing setup + deploy first n8n workflow by end of Week 1.
