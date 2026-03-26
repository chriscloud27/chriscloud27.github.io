# Slide System — Architecture & Usage Guide

> For mach2.cloud — strategic context, technical reference, and usage guide.

---

## A. Purpose

### Why code-based slides instead of PowerPoint or Keynote?

Traditional slide tools are designed for one-time presentations. They produce artifacts — files that live on someone's hard drive, go out of date, and get rebuilt from scratch for every new context.

A code-based slide system built into the product stack treats slides as **living UI**. The same component primitives used to build the product can be reused in the deck. Content updates in one place. Slides can be deployed to a URL, shared with a link, embedded in a demo, or adapted into onboarding flows without rebuilding.

This is not about developer preference. It is about **reducing the cost of reuse**.

### When to use this system

- Sales demos to prospects (send a link, not an attachment)
- Internal product walkthroughs and onboarding
- Investor updates where content evolves frequently
- Event presentations that embed live product components
- Any context where the slide deck and the product share content

---

## B. Architecture

### Stack

| Layer     | Technology                            | Role                                       |
| --------- | ------------------------------------- | ------------------------------------------ |
| Framework | Next.js 15 (App Router)               | Routing, static export, build pipeline     |
| UI        | React 19 + TypeScript                 | Component model                            |
| Styling   | Tailwind CSS                          | Design system tokens                       |
| Animation | Framer Motion                         | Slide transitions and step reveals         |
| Content   | MDX (`@next/mdx`)                     | Markdown + React components in slide files |
| Fonts     | Syne + Space Grotesk + JetBrains Mono | Brand typography                           |

### Component Structure

```
components/slides/
├── Deck.tsx           # State manager: current slide, keyboard nav, touch swipe
├── Slide.tsx          # Layout container: full-viewport, variant-aware (dark/light/accent)
├── SlideProgress.tsx  # Progress bar: dot indicators + numeric counter
├── SlideTransition.tsx # Framer Motion wrapper: directional fade/slide transitions
└── MDXComponents.tsx  # Custom MDX renderers + named primitives
```

### MDX Role

MDX files in `content/slides/<deck>/` are compiled at build time by `@next/mdx`. Each file is a React component. The deck page imports them statically and passes them as an array to `<Deck>`.

This means:

- Zero runtime MDX parsing — slides render as fast as any React component
- Full React support inside slide content (import components, embed logic)
- Static export compatible (`output: "export"` in `next.config.ts`)

### Route Structure

```
app/slides/
├── layout.tsx              # Fullscreen layout — no site nav/header/footer
└── fairup/
    └── page.tsx            # FairUp deck — imports all slide MDX files
```

Slides live **outside** the `[locale]` routing tree intentionally. They are demo/sales assets, not localized public pages. If you need localized slides in the future, create separate deck files per locale.

---

## C. Usage Guide

### Adding a new slide to an existing deck

1. Create a new MDX file in `content/slides/<deck>/`:

   ```
   content/slides/fairup/10-roadmap.mdx
   ```

2. Structure the file using the `<Slide>` component and available primitives:

   ```mdx
   import Slide from "@/components/slides/Slide";
   import {
     Eyebrow,
     Headline,
     Sub,
     CardGrid,
     Card,
   } from "@/components/slides/MDXComponents";

   <Slide variant="dark">
     <Eyebrow>Roadmap</Eyebrow>
     <Headline>What's coming *next.*</Headline>
     <Sub>Q3–Q4 2026 priorities.</Sub>
     <CardGrid>
       <Card title="ATS Integration">
         Direct export to Greenhouse, Lever, Workday.
       </Card>
       <Card title="Mobile App">
         Native apps for candidates at in-person events.
       </Card>
     </CardGrid>
   </Slide>
   ```

3. Import and add it to the deck in `app/slides/fairup/page.tsx`:
   ```tsx
   import Slide10 from "@/content/slides/fairup/10-roadmap.mdx";
   const SLIDES = [...existingSlides, Slide10];
   ```

### Creating a new deck

1. Create a folder: `content/slides/<deck-name>/`
2. Add MDX files (01, 02, etc.)
3. Create route: `app/slides/<deck-name>/page.tsx`
4. Import slides and render `<Deck slides={SLIDES} title="Deck Name" />`

No configuration changes needed — the system picks up any new MDX files automatically once imported.

### Editing slide content

All slide content lives in `content/slides/`. Each `.mdx` file is self-contained. Edit the text directly — no CMS, no JSON keys, no build configuration required.

### Available primitives

| Component                               | Purpose                                              |
| --------------------------------------- | ---------------------------------------------------- |
| `<Slide variant="dark\|light\|accent">` | Full-viewport slide container                        |
| `<Eyebrow>`                             | Small uppercase label (cyan)                         |
| `<Headline>`                            | Main slide heading — use `*italics*` for cyan accent |
| `<Sub>`                                 | Supporting subtitle text                             |
| `<Highlight>`                           | Inline cyan text emphasis                            |
| `<TwoCol left={} right={}>`             | Two-column layout                                    |
| `<Card title="">`                       | Bordered content card                                |
| `<CardGrid>`                            | 1–3 column responsive card grid                      |
| `<Stat value="" label="">`              | Large metric display                                 |
| `<StatRow>`                             | Horizontal row of stats                              |

### Navigation

- **Keyboard**: `←` / `→` (or `↑` / `↓`) to move between slides
- **Touch**: Swipe left/right on mobile
- **Dots**: Click any dot in the progress bar to jump to that slide
- **Arrows**: Button controls in the bottom bar

---

## D. Strategic Takeaways

### Slides as product layer, not marketing artifact

Most companies treat pitch decks and product demos as separate artifacts — built in different tools, by different people, on different schedules. This creates a constant synchronization problem: the product evolves, but the slides don't. The onboarding material references features that no longer exist. The sales deck shows a flow that was rebuilt six months ago.

A code-based slide system embedded in the product codebase eliminates this gap. **Slides are components. Components are slides.** The same `<Card>` that displays a pricing tier in the marketing page can be used in the sales deck. The same design tokens that define the product's visual language apply to every slide automatically.

### Reusability matrix

| Slide deck        | Reusable as                    |
| ----------------- | ------------------------------ |
| Sales pitch       | Product onboarding walkthrough |
| Feature overview  | In-app tooltip tour            |
| How it works      | Demo video script              |
| Customer segments | Sales team targeting guide     |
| Business model    | Investor FAQ appendix          |

The investment in building these slides well pays forward every time the same content is repurposed. Each reuse costs near zero if the system is structured correctly.

### Why this matters for SaaS scalability

As a SaaS company grows, the distance between what the product does and what salespeople say it does becomes a real operational risk. Code-based slides close this gap structurally, not culturally. You don't need to remind people to "update the deck" — the deck and the product are built from the same materials.

---

## E. When NOT to use this system

**Investor decks in active fundraising**
Investors expect polished PDFs they can forward, print, and annotate. A web URL is not a substitute. Build the live code version for demos; export a PDF separately for distribution.

**Fast iteration sales slides**
If a sales rep needs to add a competitor slide before a call in 20 minutes, MDX and `git push` is the wrong workflow. For that cadence, use Google Slides or Pitch and treat this system as the canonical version to sync from occasionally.

**Non-technical teams operating independently**
This system requires a developer to add new slides or restructure content. If your content team needs to own slides completely without engineering involvement, the friction is real. Consider a headless CMS layer on top of this system in that case — but don't add that complexity before you need it.

**One-off presentations**
If a slide deck will be used once and discarded, the build pipeline overhead is not worth it. Use a traditional tool.

---

_Built with Next.js, Tailwind CSS, Framer Motion, and MDX._
_Part of the mach2.cloud product infrastructure for FairUp._
