# n8n SEO/GEO Monitoring Workflows — Copy-Paste Ready

**Format**: JSON ready to import into n8n
**Setup**: 3 complete workflows for daily/weekly/monthly monitoring
**Bing Integration**: Included in Workflow 2 (Weekly Search Engine Audit)

---

## Quick Setup

1. **Access your n8n instance**: http://localhost:5678
2. **Create new workflow** → Workflows → Create
3. **Copy JSON below** → Workflows → Import from Code
4. **Paste** → Import
5. **Set credentials** (see "Credentials Setup" section)
6. **Enable workflow** → Toggle ON
7. **Verify first run** in 24 hrs

---

## Workflow 1: Daily Coverage Check (8 AM UTC)

**Purpose**: Check coverage (indexed vs crawled URLs), validate Article schemas, alert on errors

**Trigger**: Cron (Daily at 8 AM UTC)
**Duration**: ~2 min
**Output**: Row appended to Google Sheet

**JSON** (Copy everything between the triple backticks):

```json
{
  "name": "SEO Daily Coverage Check",
  "nodes": [
    {
      "name": "Trigger (8 AM UTC)",
      "type": "n8n-nodes-base.cron",
      "position": [250, 300],
      "parameters": {
        "expression": "0 8 * * *"
      }
    },
    {
      "name": "Get GSC Sitedata",
      "type": "n8n-nodes-base.httpRequest",
      "position": [450, 300],
      "parameters": {
        "url": "https://www.googleapis.com/webmasters/v3/sites/https%3A%2F%2Fmach2.cloud/sitemaps",
        "method": "GET",
        "headers": {
          "Authorization": "Bearer {{ $env.GOOGLE_SERVICE_ACCOUNT_TOKEN }}"
        },
        "responseFormat": "json"
      }
    },
    {
      "name": "Get GSC Coverage",
      "type": "n8n-nodes-base.httpRequest",
      "position": [650, 300],
      "parameters": {
        "url": "https://www.googleapis.com/webmasters/v3/sites/https%3A%2F%2Fmach2.cloud/crawlStats/daily",
        "method": "GET",
        "headers": {
          "Authorization": "Bearer {{ $env.GOOGLE_SERVICE_ACCOUNT_TOKEN }}"
        },
        "responseFormat": "json"
      }
    },
    {
      "name": "Parse Coverage Data",
      "type": "n8n-nodes-base.code",
      "position": [850, 300],
      "parameters": {
        "mode": "runOnceForAllItems",
        "jsCode": "const data = items[0].json?.data || [];\nconst latest = data[data.length - 1] || {};\nreturn {\n  date: new Date().toISOString().split('T')[0],\n  indexed: latest.notSubmittedIndexed || 0,\n  crawled: latest.submitted || 0,\n  errors: items[1].json?.errors?.length || 0,\n  status: items[1].json?.errors?.length > 0 ? '⚠️ ERRORS' : '✓ OK'\n};"
      }
    },
    {
      "name": "Append to Google Sheet",
      "type": "n8n-nodes-base.googleSheets",
      "position": [1050, 300],
      "parameters": {
        "credentialsType": "oAuth2",
        "operation": "append",
        "spreadsheetId": "{{ $env.GOOGLE_SHEET_ID }}",
        "sheetName": "SEO Monitoring Dashboard",
        "columns": "Date,Indexed,Crawled,Errors,Status"
      }
    },
    {
      "name": "Condition: Alert if Errors",
      "type": "n8n-nodes-base.if",
      "position": [1050, 450],
      "parameters": {
        "conditions": {
          "boolean": [
            {
              "value1": "{{ $node['Parse Coverage Data'].json.errors }}",
              "operation": ">",
              "value2": 0
            }
          ]
        }
      }
    },
    {
      "name": "Send Alert Email",
      "type": "n8n-nodes-base.emailSend",
      "position": [1250, 450],
      "parameters": {
        "to": "christian@mach2.cloud",
        "subject": "⚠️ SEO Alert: Coverage Errors Detected",
        "body": "Coverage Report — {{ $node['Parse Coverage Data'].json.date }}\n\n✓ Indexed: {{ $node['Parse Coverage Data'].json.indexed }} URLs\n⏳ Crawled: {{ $node['Parse Coverage Data'].json.crawled }} URLs\n❌ Errors: {{ $node['Parse Coverage Data'].json.errors }} URLs\n\nAction: Check https://console.google.com/webmasters → Coverage"
      }
    }
  ],
  "connections": {
    "Trigger (8 AM UTC)": {
      "main": [
        [
          {
            "node": "Get GSC Sitedata",
            "type": "main",
            "index": 0
          },
          {
            "node": "Get GSC Coverage",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Get GSC Sitedata": {
      "main": [
        [
          {
            "node": "Parse Coverage Data",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Get GSC Coverage": {
      "main": [
        [
          {
            "node": "Parse Coverage Data",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Parse Coverage Data": {
      "main": [
        [
          {
            "node": "Append to Google Sheet",
            "type": "main",
            "index": 0
          },
          {
            "node": "Condition: Alert if Errors",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Condition: Alert if Errors": {
      "main": [
        [
          {
            "node": "Send Alert Email",
            "type": "main",
            "index": 0
          }
        ]
      ]
    }
  }
}
```

---

## Workflow 2: Weekly Search Engine Audit (Friday 5 PM UTC)

**Purpose**: Check Google + Bing performance, identify top keywords, compare week-over-week trends

**Trigger**: Cron (Weekly Friday 5 PM UTC)
**Duration**: ~3 min
**Output**: Email digest + Google Sheet row

**JSON**:

```json
{
  "name": "SEO Weekly Search Engine Audit",
  "nodes": [
    {
      "name": "Trigger (Friday 5 PM UTC)",
      "type": "n8n-nodes-base.cron",
      "position": [250, 300],
      "parameters": {
        "expression": "0 17 * * FRI"
      }
    },
    {
      "name": "Get Google Performance (Last 7 Days)",
      "type": "n8n-nodes-base.httpRequest",
      "position": [450, 300],
      "parameters": {
        "url": "https://www.googleapis.com/webmasters/v3/sites/https%3A%2F%2Fmach2.cloud/searchAnalytics/query",
        "method": "POST",
        "headers": {
          "Authorization": "Bearer {{ $env.GOOGLE_SERVICE_ACCOUNT_TOKEN }}",
          "Content-Type": "application/json"
        },
        "body": {
          "startDate": "{{ new Date(new Date().getTime() - 7*24*60*60*1000).toISOString().split('T')[0] }}",
          "endDate": "{{ new Date().toISOString().split('T')[0] }}",
          "dimensions": ["query"],
          "rowLimit": 10
        },
        "responseFormat": "json"
      }
    },
    {
      "name": "Get Bing Traffic (Optional)",
      "type": "n8n-nodes-base.httpRequest",
      "position": [450, 450],
      "parameters": {
        "url": "https://www.bingwebmaster.com/api/v1/urlinfo",
        "method": "GET",
        "headers": {
          "Authorization": "Bearer {{ $env.BING_API_KEY }}"
        },
        "responseFormat": "json"
      }
    },
    {
      "name": "Parse Performance Data",
      "type": "n8n-nodes-base.code",
      "position": [650, 375],
      "parameters": {
        "mode": "runOnceForAllItems",
        "jsCode": "const rows = items[0].json?.rows || [];\nconst totals = rows.reduce((acc, row) => ({\n  clicks: acc.clicks + (row.clicks || 0),\n  impressions: acc.impressions + (row.impressions || 0),\n  ctr: acc.ctr + (row.ctr || 0)\n}), { clicks: 0, impressions: 0, ctr: 0 });\n\nreturn {\n  week: new Date().toISOString().split('T')[0],\n  clicks_total: totals.clicks,\n  impressions_total: totals.impressions,\n  avg_ctr: (totals.ctr / rows.length * 100).toFixed(2),\n  top_keywords: rows.slice(0, 5).map(r => `${r.keys[0]} (${r.clicks} clicks)`).join('; '),\n  bing_status: items[1].json?.indexDetails ? '✓ Indexed' : '⏳ Pending'\n};"
      }
    },
    {
      "name": "Append to Google Sheet",
      "type": "n8n-nodes-base.googleSheets",
      "position": [850, 375],
      "parameters": {
        "operation": "append",
        "spreadsheetId": "{{ $env.GOOGLE_SHEET_ID }}",
        "sheetName": "Weekly Performance",
        "columns": "Week,Clicks,Impressions,Avg_CTR,Top_Keywords,Bing_Status"
      }
    },
    {
      "name": "Send Weekly Digest Email",
      "type": "n8n-nodes-base.emailSend",
      "position": [1050, 375],
      "parameters": {
        "to": "christian@mach2.cloud",
        "subject": "📊 SEO Weekly Report — {{ $node['Parse Performance Data'].json.week }}",
        "body": "SEO Performance Summary\n\n📈 Clicks: {{ $node['Parse Performance Data'].json.clicks_total }} (this week)\n👁️ Impressions: {{ $node['Parse Performance Data'].json.impressions_total }}\n🎯 Average CTR: {{ $node['Parse Performance Data'].json.avg_ctr }}%\n\nTop Keywords:\n{{ $node['Parse Performance Data'].json.top_keywords }}\n\nBing Status: {{ $node['Parse Performance Data'].json.bing_status }}\n\nDashboard: https://console.google.com/webmasters"
      }
    }
  ],
  "connections": {
    "Trigger (Friday 5 PM UTC)": {
      "main": [
        [
          {
            "node": "Get Google Performance (Last 7 Days)",
            "type": "main",
            "index": 0
          },
          {
            "node": "Get Bing Traffic (Optional)",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Get Google Performance (Last 7 Days)": {
      "main": [
        [
          {
            "node": "Parse Performance Data",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Get Bing Traffic (Optional)": {
      "main": [
        [
          {
            "node": "Parse Performance Data",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Parse Performance Data": {
      "main": [
        [
          {
            "node": "Append to Google Sheet",
            "type": "main",
            "index": 0
          },
          {
            "node": "Send Weekly Digest Email",
            "type": "main",
            "index": 0
          }
        ]
      ]
    }
  }
}
```

---

## Workflow 3: Monthly GEO Baseline Test (1st of Month, Manual Trigger)

**Purpose**: Test AI search engine indexing by asking 4 major AI engines and recording results

**Trigger**: Manual (or Cron: 1st of month 10 AM UTC)
**Duration**: ~5 min
**Output**: Google Sheet row with baseline data

**Note**: This one requires manual input (screenshots + quotes), or you can use Claude API to automate it.

**Setup Instructions**:

1. Create new workflow in n8n
2. Add Manual Trigger node
3. Create 4 HTTP nodes to call Claude API (or run manually outside n8n):

```bash
# Manual Test (Run in terminal):

# ChatGPT
curl -X POST https://api.openai.com/v1/chat/completions \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model": "gpt-4", "messages": [{"role": "user", "content": "Who is Christian Weber, AI‑Native Cloud & Platform Architect?"}]}' \
  | jq '.choices[0].message.content'

# Perplexity
curl -X POST https://api.perplexity.ai/chat/completions \
  -H "Authorization: Bearer $PERPLEXITY_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model": "pplx-7b-online", "messages": [{"role": "user", "content": "What is the WAF++ framework?"}]}'

# Claude
curl -X POST https://api.anthropic.com/v1/messages \
  -H "x-api-key: $CLAUDE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model": "claude-3-opus-20250205", "max_tokens": 1024, "messages": [{"role": "user", "content": "Who helps Series A SaaS companies scale cloud architecture?"}]}'

# Google Gemini
curl -X POST https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=$GEMINI_API_KEY \
  -H "Content-Type: application/json" \
  -d '{"contents": [{"parts": [{"text": "What is AI‑Native Cloud & Platform Architecture?"}]}]}'
```

**Then manually record results in Google Sheet**:
| Month | ChatGPT | Perplexity | Claude | Gemini | mach2cloud Mentions |
|-------|---------|-----------|--------|--------|---|
| Mar 26 | ❌ | ✅ | ❌ | ❌ | 2 (Perplexity) |
| Apr 2 | ⏳ | ✅ | ⏳ | ⏳ | ? (check) |

---

## Credentials Setup (Required Before Running Workflows)

### 1. Google Service Account (For Google Search Console API)

1. **Create Service Account**:
   - Google Cloud Console → Project
   - Create Service Account
   - Download JSON key file

2. **In n8n**: Credentials → Google Search Console
   - Upload JSON file
   - Save as `google_seo`

3. **Share site with service account**:
   - Google Search Console → Settings
   - Share with: `seo-bot@[project].iam.gserviceaccount.com`
   - Role: Admin

### 2. Bing Webmaster API (Optional, for Bing traffic)

1. **Get Bing API Key**: https://bing.com/webmasters
   - Settings → API Access
   - Create token

2. **In n8n**: Credentials → API Key
   - Save as `bing_api`

### 3. Google Sheets (For data storage)

1. **In n8n**: Credentials → Google Sheets
   - Select your Google account
   - Grant permissions
   - Save as `google_sheets`

2. **Get Sheet ID**:
   - Open your Google Sheet
   - URL: `https://docs.google.com/spreadsheets/d/[SHEET_ID]/`
   - Copy `SHEET_ID`

3. **In n8n environment**:
   - Set `GOOGLE_SHEET_ID` variable

### 4. Email (For alerts)

1. **In n8n**: Credentials → Email
   - SMTP settings (Gmail or SendGrid)
   - Save as `email`

---

## Environment Variables in n8n

Add these to your n8n instance (Settings → Environment Variables):

```
GOOGLE_SERVICE_ACCOUNT_TOKEN=<your-google-oauth-token>
GOOGLE_SHEET_ID=<your-sheet-id>
BING_API_KEY=<your-bing-token>
OPENAI_API_KEY=<if-automating-gpt-tests>
CLAUDE_API_KEY=<if-automating-claude-tests>
```

---

## Bing Integration in Workflows

**Workflow 2** already includes Bing traffic via:

```
GET https://www.bingwebmaster.com/api/v1/urlinfo
Authorization: Bearer {{ $env.BING_API_KEY }}
```

This checks if Bing has indexed mach2.cloud and fetches top queries from Bing.

**To enhance Bing monitoring**:

Add this node after "Get Bing Traffic":

```
Query: "Which queries drive clicks from Bing vs Google?"
→ Compare performance by source
→ Identify Bing-specific keyword opportunities
```

---

## First Run Checklist

- [ ] Credentials set up (Google, Bing, Email, Sheets)
- [ ] Environment variables configured
- [ ] Google Sheet created with columns
- [ ] Each workflow imported
- [ ] Each workflow shows "No errors" in UI
- [ ] Test run manually (trigger via UI)
- [ ] Check Google Sheet received data
- [ ] Check email alert received
- [ ] Enable schedules (Cron timers)
- [ ] Verify first automated run (check 8 AM tomorrow)

---

## Troubleshooting

**Workflow fails at Google API call**:

- Check: Service account has access to mach2.cloud in Search Console
- Check: OAuth token is fresh (refresh if older than 1 hour)

**Data not appearing in Google Sheet**:

- Check: Sheet name matches exactly (case-sensitive)
- Check: Columns exist in sheet
- Check: GOOGLE_SHEET_ID is correct

**Email not sending**:

- Check: SMTP credentials correct
- Check: "to" email is valid
- Check: Gmail security settings (enable app passwords if using Gmail)

**Bing API returns 401**:

- Check: API key is valid
- Check: Key hasn't expired
- Check: You've shared mach2.cloud property with Bing

---

## Next: Run First Time

1. **Deploy workflows** above
2. **Wait 24 hours** for first automated run (8 AM tomorrow)
3. **Check Google Sheet** for data
4. **Check email** for alerts
5. **Verify**: All systems functioning

Then monitor manually for Week 1–2 to confirm data quality before full automation handoff.
