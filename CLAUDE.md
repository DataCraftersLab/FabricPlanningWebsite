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

- **`main`** = production. Deploys to **fabricplanning.io**.
- **`develop`** = staging. Deploys to **develop--fabricplanning.netlify.app**.
- All work happens on **feature branches created from `develop`**.
- Feature branches merge into `develop` via PR. Verify the change at **develop--fabricplanning.netlify.app**.
- When `develop` is verified and ready, merge `develop` into `main` via PR. The change goes live at **fabricplanning.io**.
- **Never push directly to `main` or `develop`.**
- Descriptive commit messages.
- Netlify generates a deploy preview for every PR.

## Deployment

- **Production:** fabricplanning.io — auto-deploys from `main`
- **Staging:** develop--fabricplanning.netlify.app — auto-deploys from `develop`
- Deploy previews on every PR
- All feature work is verified on staging before going to production

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

## llms.txt and /md/ Maintenance

This project auto-generates `/llms.txt`, `/llms-full.txt`, and the `/md/` directory via a GitHub Action.

- Generator script: `scripts/generate-llms-txt.mjs`
- GitHub Action: `.github/workflows/generate-llms-txt.yml`
- Output: `public/llms.txt`, `public/llms-full.txt`, and `public/md/` directory
- Schedule: Weekly (Monday 6 AM UTC) + on every content push to `main` + manual trigger

**When adding new content types or changing content directory structure:**
Update the `SOURCES` array in `scripts/generate-llms-txt.mjs` to include the new paths.

**When adding new pages that should appear in llms.txt:**
No action needed if the page is a markdown file inside one of the configured `SOURCES` directories. The script auto-discovers all `.md`/`.mdx` files. Pages authored as `.astro` files are not currently picked up.

**To manually regenerate:**
Run `node scripts/generate-llms-txt.mjs` locally, or trigger the GitHub Action manually from the Actions tab.

**Do NOT edit `public/llms.txt`, `public/llms-full.txt`, or anything in `public/md/` manually.** They are auto-generated and will be overwritten.

## Where to look

- `.claude/skills/site-platform.md` — design system, colors, typography, layout, Netlify Forms, SEO, accessibility
- `.claude/skills/content-pipeline.md` — content collection schemas and contributor workflow
