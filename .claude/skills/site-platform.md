---
name: site-platform
description: Design system, color palette, typography, layout, components, Netlify Forms, SEO, and accessibility rules for fabricplanning.io
---

# Site platform

Design system and platform configuration for **Fabric Planning** (fabricplanning.io). Apply these tokens and rules whenever building or modifying pages, components, or styles.

## Color palette

Three tiers: **Primary** (Fabric IQ greens — dominant), **Secondary** (Fabric Planning purple — hero/newsletter/accents), **Accent** (Data Crafters globe colors — variety).

> **Do NOT use Microsoft blue (`#0078d4`).** This site is not officially affiliated with Microsoft.

### Primary — Fabric IQ greens (dominant)

| Token         | Hex       | Usage                                            |
| ------------- | --------- | ------------------------------------------------ |
| Dark forest   | `#0f2b1e` | Header, footer, hero background                  |
| Deep green    | `#1B7A50` | Primary accent, links, register buttons          |
| Medium green  | `#3BA776` | Primary buttons, gradients                       |
| Mint teal    | `#7DD3A8` | Highlights, light accents, card borders          |
| Mint wash     | `#f0fdf4` | Alternating section backgrounds                  |

### Secondary — Fabric Planning purple

| Token         | Hex       | Usage                                                              |
| ------------- | --------- | ------------------------------------------------------------------ |
| Deep purple   | `#5B3F9E` | Button gradients, dark accent                                      |
| Fabric purple | `#7B61B8` | Newsletter CTA section background, hero CTA button, section labels |
| Light purple  | `#A78BDB` | Hero subtitle text, light accent                                   |
| Purple wash   | `#f5f3ff` | Subtle section backgrounds                                         |

### Accent — Data Crafters globe colors

| Token    | Hex       | Usage                                          |
| -------- | --------- | ---------------------------------------------- |
| DC blue  | `#2563EB` | In-person events, informational badges         |
| DC red   | `#DC2626` | Webinar events, alerts                         |
| DC amber | `#E5A019` | Highlights, attention, "new" badges            |
| DC green | `#4ADE80` | Data Crafters brand text in footer, success    |

### Neutrals

| Token       | Hex       | Usage                                            |
| ----------- | --------- | ------------------------------------------------ |
| Dark slate  | `#334155` | Primary body text (NOT pure black)               |
| Medium gray | `#64748b` | Secondary text, captions, metadata               |
| Light gray  | `#f8fafc` | Generic section backgrounds                      |
| White       | `#ffffff` | Page backgrounds, card backgrounds               |

## Typography

- **Headings:** Plus Jakarta Sans (bold / semibold), fallback `system-ui`
- **Body:** Plus Jakarta Sans (regular / medium), 16px base, line-height 1.6, fallback `system-ui`
- **Code:** JetBrains Mono, fallback `Menlo, Monaco, monospace`
- Load Plus Jakarta Sans via `@fontsource/plus-jakarta-sans` (not a Google Fonts `<link>` request)

## Layout

- Max content width: **1200px**, centered
- Section padding: **80px** vertical desktop, **48px** mobile
- Card border radius: **12px**
- Card shadows: Tailwind `shadow-sm` or `shadow-md`
- Grid: 12-column desktop, 2-column tablet, single column mobile
- Generous white space throughout

## Components

- **Tailwind CSS v4** via the Vite plugin (do NOT use `@astrojs/tailwind`)
- **shadcn/ui** for interactive elements: accordion, mobile nav, form inputs
- **Lucide React** for icons
- Static elements as **Astro components**; React only for interactive islands

## Visual direction

- Clean and editorial — **not** flashy or startup-y
- Card-based layouts for content collections
- **Hero section:** gradient from dark forest `#0f2b1e` blending into a hint of deep purple `#1a1035`
  - Label: "Microsoft Fabric Knowledge Hub" in light purple `#A78BDB`
  - CTA button: purple gradient `#7B61B8` → `#5B3F9E`
- **Section dividers:** gradient line from purple `#7B61B8` to green `#3BA776`
- **Event cards:** top border color indicates type
  - Green = virtual
  - Blue = in-person
  - Red = webinar
- **Newsletter CTA section:** Fabric purple `#7B61B8` background, white text
- **Footer:** dark forest background with a multi-color accent stripe using DC globe colors (amber, red, blue, green)
- **No stock photos of people.** Abstract patterns or data visualizations only if needed.
- **Data Crafters logo in footer.** No Microsoft logo.

## Netlify Forms

- All forms must include `data-netlify="true"`
- Include a static HTML blueprint of the form so Netlify can detect it at build time
- Add a honeypot field for spam protection

## SEO

- Every page needs a unique meta title and description
- Open Graph tags on every page
- Astro sitemap integration
- `robots.txt`
- JSON-LD for `Organization` and `Person`

## Accessibility

- WCAG AA color contrast on all text
- Visible focus states on all interactive elements
- Alt text on every image
- Touch targets minimum **44×44px**
- Responsive from **375px** to **1440px+**
