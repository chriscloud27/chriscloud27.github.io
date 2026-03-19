# MaCh2.Cloud — Project Memory

## Project Overview

- Next.js 14 app router, Tailwind CSS v3, next-intl for i18n (en/de)
- GitHub Pages deployment target
- Notion CMS for blog posts (`lib/notion.ts`)
- Radix UI Dialog for mobile nav, react-hook-form + zod for contact form

## Brand System (applied March 2026)

Design tokens live in `tailwind.config.js`. Never use raw hex values in components.

### Key Token Names

| Intent                 | Tailwind class                            |
| ---------------------- | ----------------------------------------- |
| Primary dark surface   | `bg-deep-blue` / `text-deep-blue`         |
| Accent                 | `text-electric-cyan` / `bg-electric-cyan` |
| Body text (light bg)   | `text-graphite` / `text-grey-text`        |
| Muted text             | `text-grey-mid`                           |
| Light text on dark     | `text-grey-300`                           |
| Dim text on dark       | `text-grey-700`                           |
| Alternate dark surface | `bg-deep-blue-mid`                        |
| Light section bg       | `bg-grey-subtle`                          |

### Font Families

- `font-display` → Syne 700/800 (headings h1–h3)
- `font-body` → Space Grotesk 300/400/500 (body, UI)
- `font-mono` → JetBrains Mono 400/500 (labels, tags, code)
- Google Fonts loaded in `app/[locale]/layout.tsx`

### Border Radius Tokens

- `rounded-tag` (4px) · `rounded-btn` (8px) · `rounded-card` (12px) · `rounded-feature` (16px)

### Surface Rules

- Dark sections: `bg-deep-blue` + `text-white`
- Light sections: `bg-white` + `text-graphite`
- Alternate dark: `bg-deep-blue-mid`
- Cards on dark: `bg-electric-cyan/[0.03]` border `border-white/[0.07]`
- Cards on light: `bg-white` border `border-deep-blue/[0.08]`
- `text-electric-cyan` only on dark backgrounds (contrast fails on white)

## File Structure

```
app/
  [locale]/
    layout.tsx          ← Google Fonts, Header, Connect, Footer
    page.tsx            ← homepage sections
    about/page.tsx
    blog/page.tsx
    blog/[slug]/page.tsx
    cases/[slug]/page.tsx
  globals.css           ← @apply utilities + complex CSS (nav, mobile, animations)

components/
  layout/
    Header.tsx → Nav.tsx (client, uses MobileNav)
    Footer.tsx
    MobileNav.tsx       ← Radix Dialog
  sections/
    HeroSection.tsx     ← homepage
    ProblemSection.tsx
    ServicesSection.tsx
    HowItWorksSection.tsx  ← .hiw-steps CSS in globals.css
    CredibilitySection.tsx
    CtaSection.tsx
    Connect.tsx         ← uses ContactForm, translations
    Experience.tsx      ← timeline, uses CSS classes from globals.css
    CoreValues.tsx
  ContactForm.tsx       ← react-hook-form, shadcn Input/Textarea/Button
  Mach2Logo.tsx         ← SVG logo, inline colors acceptable
```

## CSS Architecture Decision

- Complex selectors (nav dropdown, mobile menu, animations, `.hiw-steps` connector) stay in `globals.css` as plain CSS
- Reusable brand utilities (`.btn`, `.eyebrow`, `.tag`, `.s-top`, `.grid-overlay`) use `@apply` in globals.css
- Components use Tailwind utility classes directly — no inline styles
- `style={{ paddingTop: 'var(--nav)' }}` replaced with `pt-16` (64px)
- `.wrap` = `max-width: 1100px` (legacy site width, see `--max` CSS var)

## Recurring Patterns

- Section label: `<p className="eyebrow">` → adds `::before` line via CSS
- Cyan top divider: `<div aria-hidden="true" className="s-top" />`
- Grid bg overlay: `<div aria-hidden="true" className="grid-overlay" />` (hero/CTA)
- Section padding: `py-[120px]` on main sections
- Nav offset: `pt-16` on `<main>` for all page layouts
- Mono counter label: `font-mono text-[11px] tracking-[0.12em] text-electric-cyan`
- Body prose cap: `max-w-text` (680px token)

## Known Flags

- `cases/[slug]/page.tsx` renders static HTML case files with embedded `<style>` — not migrated, intentional
- `blog/[slug]/page.tsx` uses `style={{ maxWidth: '760px' }}` on wrap — article prose width, acceptable one-off
- `Mach2Logo.tsx` uses inline SVG hex colors — acceptable for SVG
