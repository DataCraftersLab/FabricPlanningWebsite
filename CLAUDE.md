# Fabric Planning

Microsoft Fabric Planning knowledge hub owned by Khaled Chowdhury ("The Fabric Whisperer"), sponsored by [Data Crafters](https://datacrafters.io) — a Microsoft Fabric Featured Partner.

- **Site:** https://fabricplanning.io
- **Repo:** https://github.com/DataCraftersLab/FabricPlanningWebsite

## Tech stack

- **Astro 5** — site framework
- **Tailwind CSS v4** via the Vite plugin (do **NOT** use `@astrojs/tailwind`)
- **React** — interactive islands only
- **shadcn/ui** — interactive components (accordion, mobile nav, form inputs)
- **TypeScript** throughout
- **Tina CMS** (TinaCloud) — content stored as Markdown in `content/`
- **Cloudflare R2** — media at `media.fabricplanning.io`
- **Netlify** — hosting + Forms

## Commands

| Task  | Command         |
| ----- | --------------- |
| Dev   | `npm run dev`   |
| Build | `npm run build` |

## Code style

- TypeScript preferred everywhere
- ESLint + Prettier enforced
- **No `any` types**
- Static elements as Astro components; React only when interactivity is required

## Git workflow

- Feature branches off `main`
- **All merges go through Pull Requests** — never push directly to `main`
- Descriptive commit messages
- Netlify generates a deploy preview for every PR

## Deployment

- Netlify auto-deploys from the `main` branch
- Deploy previews on every PR

## Content

- Authored as Markdown in `content/` and managed via Tina CMS (TinaCloud)
- Multiple contributors supported via a shared `author` object
- See `.claude/skills/content-pipeline.md` for schemas

## Media

- All images live in the Cloudflare R2 bucket served from `media.fabricplanning.io`
- Reference images by full URL: `https://media.fabricplanning.io/path/to/image.png`
- **Never commit images to the Git repo**

## Hard rules

- No placeholder text on public pages
- Every image must have alt text
- Mobile-first responsive design
- WCAG AA color contrast compliance
- This site is **not officially affiliated with Microsoft** — do not use Microsoft branding or Microsoft blue (`#0078d4`)

## Where to look

- `.claude/skills/site-platform.md` — design system, colors, typography, layout, Netlify Forms, SEO, accessibility
- `.claude/skills/content-pipeline.md` — content collection schemas and contributor workflow
