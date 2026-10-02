# MaCh2.Cloud Brand Basics
*Source: `content/output files/MaCh2_BrandBook.html` v1.0, March 2026 (Chapters 04–05)*

---

## Positioning in Two Lines

MaCh2.Cloud is the AI-Native Cloud & Platform Architect for Series A–B B2B SaaS companies — eliminating the architectural debt compounding from the build-fast phase, so engineering teams ship product instead of firefighting the platform beneath it. Not a consultant, not a tooling vendor: a Principal-level architect who designs the system foundations organizations are built upon (title stays internal — never used publicly, see `brand-voice.md`).

---

## Color Palette

### Official 4 (per BrandBook Chapter 04 — the narrative/marketing palette)

| Role | Name | HEX | Usage |
|---|---|---|---|
| Primary | Deep Tech Blue | `#0B1F3A` | Hero/banner backgrounds, primary brand surface, major sections, footer |
| Accent | Electric Cyan | `#00E5FF` | CTAs, key terms, diagram highlights, icons — used **sparingly** for maximum signal value |
| Neutral | Graphite | `#1A1A1A` | Body text on light backgrounds, secondary surfaces, diagram lines/structure |
| Base | White | `#FFFFFF` | Content areas, cards, reading surfaces, headlines on dark backgrounds |

**Rules**: Deep Tech Blue is the foundation of every major surface. Electric Cyan signals innovation/AI-native — never used as a dominant fill, only as accent. No colourful gradients, no purple tones, no playful palette additions.

### Extended palette — actually implemented (`tailwind.config.js`, `app/globals.css`)

**Gap**: the BrandBook claims "4 colours, nothing else" — production code already defines 9 brand tokens plus semantic error/success colours. Treat these as brand-compliant; do NOT flag them as off-brand:

| Token (Tailwind class) | HEX | Usage |
|---|---|---|
| `deep-blue` | `#0B1F3A` | = Deep Tech Blue |
| `deep-blue-mid` | `#0D2447` | Alternate dark surface |
| `electric-cyan` | `#00E5FF` | = Electric Cyan |
| `cyan-dim` | `#00B8CC` | Hover state for cyan buttons |
| `cyan-pale` | `#E4FBFF` | Pale cyan tint (light backgrounds) |
| `graphite` | `#1A1A1A` | = Graphite |
| `grey-subtle` | `#F4F6F9` | Alternate section background |
| `grey-mid` | `#8A9BB0` | Muted text, labels, captions |
| `grey-text` | `#374151` | Secondary body text |
| `grey-300` | `#C8D4E3` | Light text on dark background |
| `grey-700` | `#4A5A72` | Dimmer text on dark background |

**Semantic colours (not in BrandBook at all — form/UI states only, `app/globals.css`)**:

| Purpose | HEX |
|---|---|
| Error text/border | `#ff4444` (labels), `#ff6464` (message text), `rgba(255,100,100,.1)` bg |
| Success message | `#00c864`, `rgba(0,200,100,.1)` bg |

These exist only for form/UI feedback (ContactForm, WhitepaperForm) — never use them for brand/marketing surfaces.

---

## Typography

| Context | Typeface | Weight | Notes |
|---|---|---|---|
| Display / Headings | **Syne** | 800 | Letter-spacing -0.03em, line-height 0.95–1.1 |
| Subheading / Section Titles | **Syne** | 700 | Letter-spacing -0.01em, line-height 1.2 |
| Body / Paragraphs | **Space Grotesk** | 400 | 16–18px, line-height 1.65 |
| Labels / Code / Tags | **JetBrains Mono** | 400–500 | 10–13px, letter-spacing 0.06–0.15em |

**Never**: Arial, Roboto, or system fonts in brand materials. Never mix in a font outside this trio.

**Resolved (2026-09-29)**: `CLAUDE.md` and `content/input files/selling-personal-brand-colors.md` previously listed Inter/IBM Plex Sans as primary — corrected to Syne + Space Grotesk + JetBrains Mono to match the BrandBook (v1.0, March 2026) and the live implementation (`app/[locale]/layout.tsx`, `app/globals.css`). This is now the single, consistent typography spec across docs and code. The logo assets remain an intentional exception — see `logo-usage.md` and ADR-0025.

**Line-height caution**: the BrandBook's spec of 0.95–1.1 line-height for Display type is tight enough to clip descenders (g, y, p) on bold Syne, especially in tools/renderers without careful baseline handling. The live site's actual `h1` rule uses 1.15 (safer) — treat 1.15 as the practical floor for real display headlines, not the BrandBook's 0.95 figure literally.

### Type Scale

| Token | Size |
|---|---|
| Display XL | 96px |
| Display L | 56px |
| Heading 1 | 32px |
| Heading 2 | 24px |
| Lead / Intro paragraph | 18px |
| Body text (standard) | 16px |
| Label / caption / metadata | 11px |

---

## Logo (overview — see `logo-usage.md` for full rules)

- Modular icon mark (rocket-to-platform metaphor) + "MaCh2." wordmark (Deep Tech Blue) + "Cloud" accent (Electric Cyan)
- Two variants: Primary on dark background, Primary on light background
- Full source: `content/output files/MaCh2_BrandBook.html`, Chapter 03
