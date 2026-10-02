# MaCh2.Cloud Visual Style
*Source: `content/output files/MaCh2_BrandBook.html` v1.0, March 2026 (Chapters 06, 13–14)*

---

## Spacing Scale (8px base unit)

| Value | Use |
|---|---|
| 4px | Micro spacing, inline gaps |
| 8px | Base unit, tight groupings |
| 16px | Component padding |
| 24px | Card internal padding |
| 32px | Section sub-spacing |
| 48px | Grid gaps, column spacing |
| 64px | Section dividers |
| 96–100px | Page section padding |

Generous whitespace communicates precision and control. Density is intentional — never cluttered, never empty.

---

## Grid System

| Context | Grid |
|---|---|
| Web — Desktop | 12-column · 80px gutters · max-width 1440px |
| Web — Tablet | 8-column · 48px gutters · max-width 1024px |
| Web — Mobile | 4-column · 24px gutters · full width |
| Print / Slides | 3-column · 40px margins · A4 / 16:9 widescreen |

**Known gap**: `tailwind.config.js` still carries a `site: "1100px"` max-width token marked "legacy container width" — some older sections render at 1100px instead of the BrandBook's 1440px desktop max. Not yet migrated; flag if asked to build new full-width sections so they use `content` (1440px), not `site`.

## Border Radius System

| Radius | Use |
|---|---|
| 4px | Tags, chips, small elements |
| 8px | Buttons, form inputs |
| 12px | Cards, panels |
| 16px | Product cards, sections |

---

## Imagery — What to Use

- Architecture diagrams and system visualizations as the primary imagery language
- Clean lines — no 3D effects, drop shadows, or bevels
- Diagram colour logic: Electric Cyan for highlights/key paths, Graphite for structural lines and secondary elements

## Imagery — What NOT to Use

- No generic stock photography of servers, handshakes, or clouds
- No decorative icons or illustration styles from marketing toolkits
- No colourful gradients, purple tones, or playful palette additions
- No 3D treatments, drop shadows, or glow effects on any graphic element

---

## Visual Do's

- Deep Tech Blue as primary surface for hero sections and covers
- Electric Cyan applied sparingly — for maximum signal value
- Generous whitespace — density is intentional, not default
- Architecture diagrams and system visualizations as imagery
- Pair Syne display with Space Grotesk body text consistently
- Dark-background logo on Deep Blue, light-background logo on white/grey surfaces
- Logo clear space equal to the "M" character height

## Visual Don'ts

- No colourful gradients, purple tones, or playful palette additions
- No generic stock photography of servers, handshakes, or clouds
- No decorative icons or illustration styles from marketing toolkits
- No drop shadows, glow effects, or 3D treatments on the logo
- No compressing or stretching logo proportions
- No Arial, Roboto, or system fonts in brand materials
- No crowded layouts — negative space is a design statement

Reference aesthetic: Stripe, Linear, Vercel, Supabase, OpenAI.
