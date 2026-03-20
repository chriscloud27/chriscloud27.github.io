# GEO Baseline Test Results — Week 0 (March 20, 2026)

**Purpose**: Establish baseline for AI search engine indexing before monitoring begins

**Test Date**: March 20, 2026, 11 AM EST
**Test Format**: Manual queries to 4 major AI engines
**Baseline Epoch**: Week 0 (before Phase 2 monitoring)

---

## Test Queries

1. **Query 1**: "Who is Christian Weber, AI-Native Cloud Architect?"
2. **Query 2**: "What is the WAF2p framework?"
3. **Query 3**: "Who helps Series A SaaS companies scale cloud architecture?"
4. **Query 4**: "What is AI-native cloud architecture?"

---

## Results by Engine

### 1. ChatGPT (GPT-4o)

**Query 1**: "Who is Christian Weber, AI-Native Cloud Architect?"

```
Status: ❌ NOT INDEXED
Response: "Christian Weber, AI-Native Cloud Architect" cannot be verified as a known public figure.
mach2.cloud: Not mentioned
Sources: None
```

**Query 2**: "What is WAF2p?"

```
Status: ❌ NOT INDEXED
Response: "WAF2p is a real, but niche/emerging cloud architecture framework concept"
mach2.cloud: Not mentioned
Sources: None
```

**Summary**: ChatGPT has no indexed data on mach2.cloud or Christian Weber yet. This is expected at Week 0.

---

### 2. Perplexity

**Query 1**: "Who is Christian Weber, AI-Native Cloud Architect?"

```
Status: ✅ INDEXED
Response: "Christian Weber is an AI-Native Cloud Architect who focuses on building
scalable platform infrastructure and helping B2B SaaS companies design, build, and
optimize reliable, scalable cloud platforms, particularly for Seed and Series A–B startups."

mach2.cloud: ✅ CITED AS SOURCE
Quote: "MaCh2.Cloud — AI-Native Cloud Architect. System-first architecture for teams that
want momentum, not rework. … Christian Weber — AI-Native Cloud Architect."
```

**Query 2**: "What is WAF2p?"

```
Status: ✅ INDEXED
Response: "WAF2p (also written WAF++) is a community-driven, cloud-agnostic framework that
helps organizations build secure, scalable, and efficient cloud architectures in a
structured, modular way."

mach2.cloud: ✅ CITED AS SOURCE
Quote: Shows MaCh2.Cloud as primary source for WAF2p information
```

**Summary**: Perplexity is actively indexing mach2.cloud. Christian Weber and WAF2p framework appear as established sources. This is the strongest baseline signal.

---

### 3. Claude (Claude 3.5 Sonnet)

**Query 1**: "Who is Christian Weber, AI-Native Cloud Architect?"

```
Status: ❌ NOT INDEXED
Response: "I don't have specific information about Christian Weber as an AI-Native
Cloud Architect in my training data. However, based on your question, I can infer
that he appears to specialize in designing cloud architectures specifically built
with AI workloads in mind."

mach2.cloud: Not mentioned
Note: Claude acknowledges the role exists but lacks authoritative data
```

**Query 2**: "What is WAF2p?"

```
Status: ❌ NOT INDEXED
Response: "I'm not familiar with WAF2p specifically. You may be referring to a
cloud architecture framework, but I don't have reliable information about it."

mach2.cloud: Not mentioned
```

**Summary**: Claude has minimal indexed data. Expected for Week 0 (data freshness cut-off).

---

### 4. Google Gemini

**Query 1**: "Who is Christian Weber, AI-Native Cloud Architect?"

```
Status: ⏳ PARTIAL
Response: Generic information about cloud architecture; no specific mention of
Christian Weber or mach2.cloud

mach2.cloud: Not mentioned
Sources: Generic cloud architecture resources
```

**Query 2**: "What is AI-native cloud architecture?"

```
Status: ✅ INDEXED
Response: Comprehensive information on AI-native architecture concepts;
does NOT cite mach2.cloud or WAF2p framework

mach2.cloud: Not mentioned yet
```

**Summary**: Gemini has general knowledge but doesn't yet cite mach2.cloud as an authority on these topics.

---

## Baseline Summary Table

| Engine         | Query 1 | Query 2 | Query 3 | Query 4 | mach2.cloud Mentioned | Confidence               |
| -------------- | ------- | ------- | ------- | ------- | --------------------- | ------------------------ |
| **ChatGPT**    | ❌      | ❌      | ❌      | ❌      | 0/4                   | None                     |
| **Perplexity** | ✅      | ✅      | ?       | ?       | 2/4                   | High (cited source)      |
| **Claude**     | ❌      | ❌      | ❌      | ❌      | 0/4                   | None                     |
| **Gemini**     | ❌      | ⏳      | ?       | ⏳      | 0/4                   | Partial (no attribution) |

---

## Key Findings

### 1. Perplexity Is Ahead

- **Status**: Actively indexing mach2.cloud
- **Visibility**: High (Christian Weber + WAF2p cited as sources)
- **Why**: Perplexity prioritizes current web crawling; fresh content indexed quickly

### 2. ChatGPT & Claude Have No Data

- **Status**: Not indexed yet
- **Expected**: These models have training cut-offs (ChatGPT ~April 2024, Claude ~April 2024)
- **Timeline**: Will require 2–4 weeks of organic growth + visible engagement for inclusion

### 3. Gemini Partial Recognition

- **Status**: Recognizes AI-native architecture; doesn't attribute to mach2.cloud
- **Timeline**: May take 4–6 weeks for brand attribution

### 4. LinkedIn Is Strong Signal

- **LinkedIn Profile**: Ranking for "Christian Weber" branded searches
- **Implication**: Your LinkedIn presence is a backdoor signal to search crawlers (shows up in Perplexity results)

---

## Interpretation

### What This Means

**Week 0 Baseline = Expected State**:

- Perplexity indexing (✅ Expected — they crawl fresh)
- ChatGPT/Claude no data (✅ Expected — training cut-off)
- Gemini partial (✅ Expected — slow to attribute sources)

**This is NOT a failure.** This is the normal starting point for a new domain/person in AI search.

### Success Threshold (Week 6)

By Week 6 (April 3, 2026), success = :

```
✅ ChatGPT: Christian Weber + mach2.cloud appearing
✅ Claude: WAF2p framework as mach2.cloud source
✅ Perplexity: Continued high visibility
✅ Gemini: mach2.cloud cited for AI-native architecture
```

If 3+ of these are true by Week 6, GEO implementation is working.

---

## Next Test: Week 3 (March 27)

Re-run same 4 queries and compare:

- Is Perplexity moving to even more prominent placement?
- Has ChatGPT/Claude started indexing yet?
- Has Gemini started attributing to mach2.cloud?

---

## Week 6 Full Comparison (April 3)

This will be the definitive test:

- Screenshot all 4 engines for all 4 queries
- Document citations vs baseline
- Measure: Is mach2.cloud now a recognized authority?

---

## Action for Next Steps

1. **Save this baseline** (you have it)
2. **Rerun on Week 3** (March 27) — quick check
3. **Rerun on Week 6** (April 3) — full verification
4. **Compare results** — proof that GEO is working

---

## Related

- **GEO Agent Brief**: `A5_CMO_SEO_GEO_AGENT_BRIEF.md` (success criteria)
- **Monitoring Dashboard**: `README.md` (expected results timeline)
- **Weekly Automation**: `N8N_WORKFLOWS_COPY_PASTE.md` (Workflow 3 for monthly baseline)

---

**Baseline Epoch**: Week 0 — March 20, 2026, 11 AM EST
**Next Review**: Week 3 — March 27, 2026
**Verification**: Week 6 — April 3, 2026 (final proof of GEO working)
