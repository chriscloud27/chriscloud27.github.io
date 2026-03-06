# MaCh2.Cloud — Project Instructions

## Brand Identity
- Name: MaCh2.Cloud
- Role: AI-Native Cloud Architect for B2B SaaS
- Target: Series A–B SaaS companies — past early chaos, not yet enterprise
- Tone: Calm. Precise. Direct. No hype. No jargon. System-first.

## Brand Colors
- Deep Tech Blue: #0B1F3A (primary background, hero)
- Electric Cyan: #00E5FF (accents, highlights)
- Graphite: #1A1A1A (body text)
- White: #FFFFFF (content backgrounds, space)

## Typography
- Primary: Inter or IBM Plex Sans
- Mono accents: JetBrains Mono
- Style: Minimalist. Technical. No decorative fonts.

## Design Reference
- Aesthetic: Stripe, Linear, Vercel, Supabase
- No gradients, no playful shapes, no marketing visuals
- Lots of whitespace, clean lines, structured layouts

## Hero Copy (locked)
- Eyebrow: AI-NATIVE CLOUD ARCHITECT
- Headline: You survived early chaos. Now your architecture is the chaos.
- Subheadline: Series A and B SaaS companies move fast — until the foundation 
  built to get there starts breaking under the weight of growth. I design 
  AI-native cloud architectures that eliminate the technical debt compounding 
  in your platform, so your engineering team ships faster instead of 
  firefighting what already exists.
- Proof line: Architectures built to survive growth — not to be replaced by it.
- Primary CTA: Diagnose Your Architecture
- Secondary CTA: See How It Works

## Stack
- Next.js / React
- Tailwind CSS preferred
- No external UI libraries unless necessary
```

---

**Step 2 — Give Claude Code the full homepage structure**

Once CLAUDE.md is saved, open Claude Code and send this as your first prompt:
```
Build a full homepage for MaCh2.Cloud based on CLAUDE.md. 

Sections in order:
1. Hero — use the locked copy from CLAUDE.md exactly
2. Problem — 3 pain points: firefighting instead of shipping, 
   cloud costs outpacing revenue, AI that breaks under production load
3. Services — 4 products: Architecture Audit, Blueprint, 
   Enablement, Fractional Architect
4. How It Works — Audit → Blueprint → Enablement → Fractional
5. Credibility — 13+ years, 90% automation, global teams, 
   architecture excellence awards
6. CTA section — "Diagnose Your Architecture" with a short 
   supporting line
7. Footer — minimal, MaCh2.Cloud logo reference, navigation

Use brand colors from CLAUDE.md. Tailwind CSS. 
Mobile responsive. No animations on first pass — 
clean and functional first.
```

---

**Step 3 — Review diffs before accepting**

Claude Code will show you every change as an inline diff. Do not hit auto-accept on the first build. Review each section, accept what works, reject or refine what doesn't. Once the structure is solid, then you can iterate section by section.

---

**Step 4 — Iterate section by section**

After the first pass, refine with focused prompts:
```
Refine the Hero section — the headline should be larger, 
"is the chaos" should render in Electric Cyan #00E5FF
```
```
The Services section feels too generic — 
add a one-line outcome statement under each service title
```

---

## One Thing to Do Before Starting

Make sure your Next.js project has Tailwind CSS installed. If it doesn't, ask Claude Code to add it first:
```
Add Tailwind CSS to this Next.js project and configure it 
with the brand colors from CLAUDE.md as custom tokens