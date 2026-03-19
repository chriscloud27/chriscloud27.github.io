# MaCh2.Cloud — Brand System Tokens

### Type Scale Reference

| Token               | Size           | Font           | Weight  | Line-height | Letter-spacing |
| ------------------- | -------------- | -------------- | ------- | ----------- | -------------- |
| `--text-display-xl` | clamp(56–96px) | Syne           | 800     | 0.95        | -0.03em        |
| `--text-display-l`  | clamp(36–56px) | Syne           | 800     | 1.0         | -0.02em        |
| `--text-h1`         | 32px           | Syne           | 700     | 1.1         | -0.01em        |
| `--text-h2`         | 24px           | Syne           | 700     | 1.2         | -0.01em        |
| `--text-h3`         | 20px           | Syne           | 700     | 1.2         | -0.01em        |
| `--text-lead`       | 18px           | Space Grotesk  | 400     | 1.65        | 0              |
| `--text-body`       | 16px           | Space Grotesk  | 400     | 1.65        | 0              |
| `--text-small`      | 14px           | Space Grotesk  | 400     | 1.6         | 0              |
| `--text-caption`    | 13px           | JetBrains Mono | 400     | 1.6         | 0.04em         |
| `--text-label`      | 11px           | JetBrains Mono | 400–500 | 1.4         | 0.12em         |

---

## Spacing Tokens

```css
:root {
  /* ── Base Unit: 8px ── */
  --space-1: 4px; /* micro — inline gaps */
  --space-2: 8px; /* base unit — tight groupings */
  --space-3: 16px; /* component internal padding */
  --space-4: 24px; /* card padding */
  --space-5: 32px; /* section sub-spacing */
  --space-6: 48px; /* grid gaps, column spacing */
  --space-7: 64px; /* section dividers */
  --space-8: 96px; /* page section padding */
  --space-9: 128px; /* large section separation */
}
```

### Spacing Reference

| Token       | Value | Usage                                      |
| ----------- | ----- | ------------------------------------------ |
| `--space-1` | 4px   | Micro spacing, icon-text gaps              |
| `--space-2` | 8px   | Base unit, tag padding, tight groupings    |
| `--space-3` | 16px  | Component internal padding, list item gaps |
| `--space-4` | 24px  | Card padding, form field spacing           |
| `--space-5` | 32px  | Section sub-spacing, card gaps             |
| `--space-6` | 48px  | Grid column gaps, large component spacing  |
| `--space-7` | 64px  | Section dividers, large block separation   |
| `--space-8` | 96px  | Page section vertical padding              |
| `--space-9` | 128px | Hero sections, large full-bleed spacing    |

---

## Border Radius Tokens

```css
:root {
  --radius-xs: 2px; /* subtle rounding — table cells, small chips */
  --radius-sm: 4px; /* tags, badges, small pills */
  --radius-md: 8px; /* buttons, form inputs, small cards */
  --radius-lg: 12px; /* standard cards, panels, modals */
  --radius-xl: 16px; /* product cards, feature sections */
  --radius-2xl: 24px; /* large hero cards */
  --radius-full: 9999px; /* pill buttons, avatar rings */
}
```

---

## Shadow Tokens

```css
:root {
  --shadow-sm: 0 1px 4px rgba(0, 0, 0, 0.06);
  --shadow-md: 0 4px 16px rgba(0, 0, 0, 0.08);
  --shadow-lg: 0 8px 32px rgba(0, 0, 0, 0.1);
  --shadow-xl: 0 16px 64px rgba(0, 0, 0, 0.12);

  /* ── Cyan glow — use sparingly on accent elements ── */
  --shadow-cyan: 0 0 24px rgba(0, 229, 255, 0.15);
}
```

---

## Grid Tokens

```css
:root {
  /* ── Breakpoints ── */
  --bp-sm: 640px;
  --bp-md: 768px;
  --bp-lg: 1024px;
  --bp-xl: 1280px;
  --bp-2xl: 1440px;

  /* ── Max Widths ── */
  --max-width-content: 1440px;
  --max-width-text: 720px;
  --max-width-narrow: 540px;

  /* ── Layout Gutters ── */
  --gutter-mobile: 24px;
  --gutter-tablet: 48px;
  --gutter-desktop: 80px;
}
```

### Grid Reference

| Breakpoint          | Columns | Gutter | Max Width |
| ------------------- | ------- | ------ | --------- |
| Mobile `< 640px`    | 4       | 24px   | 100%      |
| Tablet `640–1024px` | 8       | 48px   | 1024px    |
| Desktop `> 1024px`  | 12      | 80px   | 1440px    |
| Print / Slides      | 3       | 40px   | A4 / 16:9 |

---

## Border Tokens

```css
:root {
  --border-width-thin: 1px;
  --border-width-medium: 2px;
  --border-width-thick: 3px;
  --border-width-accent: 4px; /* pillar card top borders */

  --border-dark: 1px solid rgba(0, 229, 255, 0.15);
  --border-light: 1px solid rgba(11, 31, 58, 0.12);
  --border-subtle: 1px solid rgba(11, 31, 58, 0.06);

  --border-accent-left: 3px solid var(--color-electric-cyan); /* quote / highlight blocks */
}
```

---

## Animation Tokens

```css
:root {
  /* ── Durations ── */
  --duration-instant: 80ms;
  --duration-fast: 150ms;
  --duration-normal: 200ms;
  --duration-slow: 300ms;
  --duration-slower: 500ms;

  /* ── Easing ── */
  --ease-default: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-in: cubic-bezier(0.4, 0, 1, 1);
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
  --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);

  /* ── Transitions ── */
  --transition-color: color var(--duration-normal) var(--ease-default);
  --transition-bg: background-color var(--duration-normal) var(--ease-default);
  --transition-border: border-color var(--duration-normal) var(--ease-default);
  --transition-shadow: box-shadow var(--duration-normal) var(--ease-default);
  --transition-transform: transform var(--duration-slow) var(--ease-out);
  --transition-all: all var(--duration-normal) var(--ease-default);
}
```

---

## Z-Index Tokens

```css
:root {
  --z-base: 0;
  --z-raised: 10;
  --z-dropdown: 100;
  --z-sticky: 200;
  --z-overlay: 300;
  --z-modal: 400;
  --z-toast: 500;
  --z-tooltip: 600;
}
```

---

## Component Tokens

```css
:root {
  /* ── Buttons ── */
  --btn-height-sm: 36px;
  --btn-height-md: 44px;
  --btn-height-lg: 52px;
  --btn-padding-sm: 0 16px;
  --btn-padding-md: 0 24px;
  --btn-padding-lg: 0 32px;
  --btn-radius: var(--radius-md);
  --btn-font: var(--font-body);
  --btn-weight: var(--weight-semibold);
  --btn-tracking: 0.02em;

  /* ── Cards ── */
  --card-padding-sm: 24px;
  --card-padding-md: 32px;
  --card-padding-lg: 40px;
  --card-radius: var(--radius-lg);
  --card-border: var(--border-light);
  --card-shadow: var(--shadow-md);

  /* ── Navigation ── */
  --nav-height: 64px;
  --nav-bg: var(--color-deep-blue);
  --nav-border: var(--border-dark);

  /* ── Sidebar ── */
  --sidebar-width: 220px;
  --sidebar-bg: var(--color-deep-blue);
  --sidebar-border: var(--border-dark);

  /* ── Inputs ── */
  --input-height: 44px;
  --input-padding: 0 16px;
  --input-radius: var(--radius-md);
  --input-border: var(--border-light);
  --input-font-size: var(--text-body);

  /* ── Tags / Chips ── */
  --tag-height: 28px;
  --tag-padding: 0 12px;
  --tag-radius: var(--radius-full);
  --tag-font-size: var(--text-label);
  --tag-tracking: var(--tracking-wide);
}
```

---

## Logo Token Reference

| Variant | Token Name     | Background               | File                   |
| ------- | -------------- | ------------------------ | ---------------------- |
| Dark    | `--logo-dark`  | Deep Tech Blue (#0B1F3A) | `mach2logodark2x.png`  |
| Light   | `--logo-light` | White / Grey (#F4F6F9)   | `mach2logolight2x.png` |

### Clear Space Rule

Minimum clear space on all sides = height of the **"M"** character in the wordmark.

| Context | Minimum Size |
| ------- | ------------ |
| Digital | 120px width  |
| Print   | 35mm width   |

---

## Quick Reference Cheatsheet

```
COLORS
  Primary surface   →   #0B1F3A  (Deep Tech Blue)
  Accent            →   #00E5FF  (Electric Cyan)
  Body text         →   #1A1A1A  (Graphite)
  Base              →   #FFFFFF  (White)
  Muted text        →   #8A9BB0  (Grey Mid)

FONTS
  Display / Heads   →   Syne 700–800
  Body / UI         →   Space Grotesk 400–500
  Labels / Code     →   JetBrains Mono 400–500

SPACING
  Base unit         →   8px
  Card padding      →   24–40px
  Section padding   →   96px
  Grid gap          →   48px (tablet) · 80px (desktop)

GRID
  Desktop           →   12col · 80px gutters · max 1440px
  Tablet            →   8col  · 48px gutters · max 1024px
  Mobile            →   4col  · 24px gutters · full width

RADIUS
  Tags              →   4px
  Buttons / inputs  →   8px
  Cards             →   12px
  Feature cards     →   16px
```

---

_MaCh2.Cloud · Brand System Tokens · v1.0 · March 2026_
