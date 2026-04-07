# n8n Automation Workflow: SEO/GEO Health Monitor

## Setup Requirements

1. **Google Service Account** (for API access):
   - Go: [Google Cloud Console](https://console.cloud.google.com/)
   - Create Project: `mach2-cloud-seo-monitor`
   - Enable: Google Search Console API
   - Create Service Account → Download JSON key
   - Share mach2.cloud property with service account email

2. **n8n Instance**:
   - Self-hosted or n8n Cloud account
   - Install Google Sheets (for data storage) + HTTP + Email nodes

3. **Google Sheet** (for historical tracking):
   - Sheet name: `SEO Monitoring Dashboard`
   - Columns: Date, IndexedCount, CrawledCount, ErrorCount, ArticleSchemaValid, AvgPosition, Clicks, Status

---

## Workflow 1: Daily Coverage Check (8 AM UTC)

**Trigger**: Cron (Daily at 8 AM)

**Steps**:

### 1. Call Google Search Console API → Coverage Report

```json
{
  "node": "HTTP Request",
  "url": "https://www.googleapis.com/webmasters/v3/sites/https%3A%2F%2Fmach2.cloud/sitemaps",
  "method": "GET",
  "headers": {
    "Authorization": "Bearer {{ $env.GOOGLE_AUTH_TOKEN }}"
  }
}
```

### 2. Parse Coverage Data

Extract from response:

- Indexed count
- Crawled (not indexed) count
- Error count
- Last crawl date

```javascript
// In n8n JavaScript node
return {
  date: new Date().toISOString(),
  indexed: data.coverage?.indexed || 0,
  crawled: data.coverage?.crawled || 0,
  errors: data.coverage?.errors || 0,
  excluded: data.coverage?.excluded || 0,
};
```

### 3. Write to Google Sheets

Append row to tracking sheet with daily data.

### 4. Condition: Alert if Errors > 0

```
IF errors > 0 THEN email alert with error details
```

### 5. Email Report (if errors detected)

Subject: `⚠️ SEO Alert: Coverage Errors Detected`

Body:

```
Coverage Report — {{ date }}

✓ Indexed: {{ indexed }} URLs
⏳ Crawled (not indexed): {{ crawled }} URLs
❌ Errors: {{ errors }} URLs
⭕ Excluded: {{ excluded }} URLs

Check: console.google.com/webmasters → Coverage
```

---

## Workflow 2: Weekly Article Schema Validation (Monday 9 AM)

**Trigger**: Cron (Weekly Monday 9 AM)

**Steps**:

### 1. Get Blog Slugs (via HTTP webhook to your site)

```javascript
// Fetches from your sitemap or API
const response = await fetch("https://mach2.cloud/sitemap.xml");
const xml = await response.text();
// Parse all /blog/ URLs
```

### 2. Loop Through First 5 Blog Articles

For each article, call Schema.org Validator API:

```json
{
  "url": "https://mach2.cloud/en/blog/{{ slug }}",
  "validator": "schema.org"
}
```

### 3. Extract Schema Validation Results

For each article, check:

- ✓ Article type detected
- ✓ `keywords` field populated (if empty, flag it)
- ✓ `author.sameAs` present
- ✓ `datePublished` present

```javascript
return {
  slug: "{{ slug }}",
  articleSchemaValid: response.article_schema_valid,
  keywordsPresent: response.keywords?.length > 0,
  authorSameAs: response.author?.sameAs ? true : false,
  errors: response.errors || [],
};
```

### 4. Write Results to Google Sheets

New tab: `Schema Validation Log`

Columns: Date, Article, SchemaValid, KeywordsPresent, AuthorSameAs, Notes

### 5. Alert if Keywords Empty

```
IF keywordsPresent == false AND locale == 'en'
THEN email: "⚠️ Article {{ slug }} has no Keywords in schema — add Tags in Notion"
```

---

## Workflow 3: Weekly Performance Summary (Friday 5 PM)

**Trigger**: Cron (Weekly Friday 5 PM)

**Steps**:

### 1. Call GSC Performance API (Last 7 Days)

```json
{
  "node": "HTTP Request",
  "url": "https://www.googleapis.com/webmasters/v3/sites/https%3A%2F%2Fmach2.cloud/searchAnalytics/query",
  "method": "POST",
  "body": {
    "startDate": "{{ 7DaysAgo }}",
    "endDate": "{{ Today }}",
    "dimensions": ["query"],
    "rowLimit": 25
  }
}
```

Extract:

- Total clicks (week)
- Total impressions (week)
- Average CTR
- Top 5 queries
- Average position

### 2. Compare to Previous Week

Pull last week's data from Google Sheets and calculate:

- Week-over-week click change (%)
- Week-over-week impression change (%)
- CTR trend

### 3. Generate Trend Alert

```javascript
const clickChange = ((this_week - last_week) / last_week) * 100;
const trend = clickChange >= 0 ? "📈 UP" : "📉 DOWN";

return {
  summary: `${trend} ${Math.abs(clickChange).toFixed(1)}% clicks this week`,
  clicks_this_week: this_week,
  clicks_last_week: last_week,
  top_queries: data.rows?.slice(0, 5) || [],
};
```

### 4. Write to Google Sheets

New tab: `Weekly Performance`

Columns: Week, Clicks, Impressions, AvgCTR, TopQuery, Trend

### 5. Send Weekly Digest Email

Subject: `📊 SEO Weekly Report — Week of {{ date }}`

Body:

```
SEO Performance Summary

📈 Clicks: {{ clicks_this_week }} (was {{ clicks_last_week }})
👁️ Impressions: {{ impressions }}
🎯 Average CTR: {{ avg_ctr }}%
📍 Average Position: {{ avg_position }}

Top Queries:
1. {{ query1 }} ({{ clicks1 }} clicks)
2. {{ query2 }} ({{ clicks2 }} clicks)
3. {{ query3 }} ({{ clicks3 }} clicks)

⚠️ Actions:
{{ alerts }}

Dashboard: https://console.google.com/webmasters/
```

---

## Workflow 4: Monthly GEO Baseline Test (1st of Month)

**Trigger**: Cron (1st of month at 10 AM)

**Steps**: _(This one you run manually via Slack command or can automate with Claude API)_

### Manual: Ask AI Assistants

1. ChatGPT: `"Who is Christian Weber, AI‑Native Cloud & Platform Architect?"`
2. Perplexity: `"What is the WAF++ framework?"`
3. Claude: `"Who helps Series A SaaS companies with AI-native architecture?"`

**Record in Google Sheets**:

- Did mach2.cloud appear as source? (Y/N)
- Quote showing mach2.cloud
- Screenshot reference
- Month/date

**Automated Option** (using Claude API):

```javascript
// In n8n node
const response = await fetch("https://api.anthropic.com/v1/messages", {
  method: "POST",
  headers: {
    "x-api-key": $env.CLAUDE_API_KEY,
    "content-type": "application/json",
  },
  body: JSON.stringify({
    model: "claude-3-opus-20250205",
    max_tokens: 1024,
    messages: [
      {
        role: "user",
        content: "Who is Christian Weber, AI‑Native Cloud & Platform Architect?",
      },
    ],
  }),
});

// Parse response and check if 'mach2.cloud' appears
const text = response.content[0].text;
const hasMentionOfMach2Cloud = text.includes("mach2.cloud");

return {
  question: "Who is Christian Weber?",
  response: text,
  mach2cloudMentioned: hasMentionOfMach2Cloud,
  date: new Date().toISOString(),
};
```

---

## Google Sheets Dashboard Template

**Sheet: `SEO Monitoring Dashboard`**

```
Date          | Indexed | Crawled | Errors | Schema Valid | Clicks | Impressions | Avg CTR | Trend
2026-03-27    | 42      | 8       | 0      | 12/12        | 5      | 120         | 4.2%   | ✓
2026-03-28    | 44      | 6       | 0      | 12/12        | 8      | 145         | 5.5%   | ↑
2026-03-29    | 45      | 5       | 1      | 11/12        | 12     | 180         | 6.7%   | ↑
```

**Use Google Sheets Formulas for Insights**:

```
Average Weekly Clicks: =AVERAGE(F2:F8)
Trending Up? =IF(F2 > AVERAGE(F2:F8), "📈", "📉")
Coverage Health: =IF(AND(D:D = 0, E:E >= 0.95), "✓ Healthy", "⚠️ Check")
```

---

## n8n Workflow Export (JSON)

Save this JSON and import into your n8n instance:

```json
{
  "name": "SEO GEO Monitor",
  "nodes": [
    {
      "name": "Daily Coverage Check",
      "type": "trigger:cron",
      "parameters": {
        "expression": "0 8 * * *"
      }
    },
    {
      "name": "Get GSC Coverage",
      "type": "http",
      "parameters": {
        "url": "https://www.googleapis.com/webmasters/v3/sites/https%3A%2F%2Fmach2.cloud/sitemaps",
        "method": "GET",
        "headers": {
          "Authorization": "Bearer {{ $env.GOOGLE_SERVICE_ACCOUNT_TOKEN }}"
        }
      }
    },
    {
      "name": "Parse Coverage Data",
      "type": "code",
      "parameters": {
        "language": "javascript",
        "code": "return { date: new Date().toISOString(), indexed: items[0].json.coverage?.indexed || 0 }"
      }
    },
    {
      "name": "Append to Google Sheets",
      "type": "google-sheets",
      "parameters": {
        "spreadsheetId": "{{ $env.GOOGLE_SHEET_ID }}",
        "range": "SEO Monitoring Dashboard!A:H",
        "action": "append"
      }
    },
    {
      "name": "Alert if Errors",
      "type": "if",
      "parameters": {
        "condition": "items[0].json.errors > 0"
      }
    },
    {
      "name": "Send Email Alert",
      "type": "email",
      "parameters": {
        "to": "christian@mach2.cloud",
        "subject": "⚠️ SEO Alert: Coverage Errors",
        "body": "Coverage Errors: {{ items[0].json.errors }}\n\nCheck: console.google.com/webmasters"
      }
    }
  ]
}
```

---

## Alternative: Google Sheets + Apps Script (Simpler)

If you don't have n8n set up yet, use **Google Apps Script** (runs inside Google Sheets):

1. **Create Apps Script** in your Google Sheet (Tools → Script Editor)
2. **Copy this code**:

```javascript
function checkSEOHealth() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const today = new Date().toISOString().split("T")[0];

  // Call Google Search Console API
  const gsc = getGSCData();

  // Append row
  sheet.appendRow([
    today,
    gsc.indexed,
    gsc.crawled,
    gsc.errors,
    gsc.schemaValid,
    gsc.clicks,
    gsc.impressions,
    gsc.avgCtr,
    gsc.errors > 0 ? "⚠️ Errors" : "✓ OK",
  ]);

  // Alert if errors
  if (gsc.errors > 0) {
    GmailApp.sendEmail(
      "christian@mach2.cloud",
      "⚠️ SEO Alert: Errors Detected",
      `Coverage Errors detected: ${gsc.errors} URLs\n\nCheck: console.google.com/webmasters`,
    );
  }
}

function getGSCData() {
  // Placeholder - you'll need to set up Google Search Console API auth
  return {
    indexed: 45,
    crawled: 6,
    errors: 0,
    schemaValid: 12,
    clicks: 15,
    impressions: 200,
    avgCtr: 7.5,
  };
}

// Schedule to run daily at 8 AM UTC
// In Apps Script: Triggers → Create new → checkSEOHealth → Time-driven → Daily → 8 AM UTC
```

3. **Set up trigger**: Triggers → + Create new → Select `checkSEOHealth` → Time-driven → Daily 8 AM UTC

---

## Quick Start Checklist

- [ ] Create Google Service Account and download JSON key
- [ ] Share mach2.cloud property with service account email
- [ ] Create Google Sheet: `SEO Monitoring`
- [ ] Set up n8n workflows above (or use Apps Script alternative)
- [ ] Add n8n webhook to Slack/Email for alerts
- [ ] Test: Manually run workflow once to confirm data flows
- [ ] Create calendar reminder for manual GEO baseline test (monthly)

---

## What This Monitors

| Metric                | Frequency | Alert If                      | Action                                   |
| --------------------- | --------- | ----------------------------- | ---------------------------------------- |
| Indexed URLs          | Daily     | < 35 or dropping              | Check robots.txt, request indexing       |
| Crawled (not indexed) | Daily     | > 10 for 3+ days              | URLs may have issues, check GSC          |
| Schema Errors         | Weekly    | Any errors detected           | Fix in code, re-request indexing         |
| Keywords in Schema    | Weekly    | Empty for any article         | Add Tags to Notion article               |
| Weekly Clicks         | Weekly    | Flat/declining 2 weeks        | Review meta descriptions, internal links |
| Average Position      | Weekly    | > 30 for target keywords      | Needs 8+ weeks, monitor trend            |
| mach2.cloud in AI     | Monthly   | Still not appearing at week 6 | Check article indexing + tag density     |

---

**Result**: Zero manual reporting. Metrics come to you via email + dashboard.
