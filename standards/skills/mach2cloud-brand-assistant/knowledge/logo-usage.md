# MaCh2.Cloud Logo Usage
*Source: `content/output files/MaCh2_BrandBook.html` v1.0, March 2026 (Chapter 03)*

---

## Logo Construction

Three elements:

1. **Icon Mark** — modular stack with a rocket motif; communicates velocity built on platform layers
2. **"MaCh2." Wordmark** — set in Deep Tech Blue (`#0B1F3A`); strategic authority, typographic precision
3. **"Cloud" Accent** — set in Electric Cyan (`#00E5FF`); signals AI-native, forward-facing, technical modernity

The rocket-to-platform visual metaphor is the core idea: velocity, but structurally grounded.

---

## Variants

| Variant | When to use |
|---|---|
| Primary — Dark Background | Deep Tech Blue or other dark surfaces (hero sections, covers, footer) |
| Primary — Light Background | White or light-grey surfaces (body content, cards, letterhead-equivalents) |

---

## Clear Space & Minimum Size

- **Clear space**: minimum equal to the height of the "M" character in the wordmark, on all sides
- **Minimum size**: 120px width (digital) · 35mm (print)

---

## Hard Rules — Never Do This (per BrandBook)

- Never compress or stretch the logo
- Never recolor the logo (no gradients, tints, or custom colours outside the two defined variants)
- Never add drop shadows, glow effects, or 3D treatments
- Never change the relationship between icon mark, wordmark, and accent

**⚠️ Known contradictions** — do not "fix" silently, ask which side (rule or asset) should change:

1. The live logo SVGs (`mach2-logo-dark.svg`, `mach2-favicon.svg`) use a `linearGradient` and `feGaussianBlur` glow filters on the rocket-flame icon — violates the "no gradients/glow" rule above.
2. The wordmark text inside both logo SVGs is hardcoded to **`IBM Plex Sans`** (name) and **`IBM Plex Mono`** (tagline) — not Syne/Space Grotesk/JetBrains Mono. The logo predates the current typography system and was never migrated (see `brand-basics.md` typography note).

## Actual Asset Files (repo)

| File | Purpose |
|---|---|
| `public/img/mach2-logo-dark.svg` | Primary — Dark Background variant |
| `public/img/mach2-logo-light.svg` | Primary — Light Background variant |
| `public/img/mach2-favicon.svg` | Favicon / small-format mark (background `#0B1F3A`) |

No DAM/CELUM equivalent exists — these repo files are the single source of truth for the logo.

---

## Background Rules

| Background | Logo variant |
|---|---|
| Deep Tech Blue / dark surfaces | Primary — Dark Background (light-coloured logo) |
| White / light-grey surfaces | Primary — Light Background |

Do not place on busy, low-contrast, or photographic backgrounds — the brand uses architecture/system diagrams, not photography, as its visual language (see `visual-style.md`).
