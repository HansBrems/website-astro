# Architecture

## Overview

Personal portfolio website for Hans Brems (Longville Software BV), a freelance software developer based in Langdorp, Belgium. The site showcases an about section and a projects portfolio.

**Production URL:** https://longville-software.be

---

## Tech Stack

| Layer           | Technology                                      |
| --------------- | ----------------------------------------------- |
| Framework       | [Astro](https://astro.build/) v5                |
| UI components   | React v19 (islands)                             |
| Styling         | Tailwind CSS v4                                 |
| Language        | TypeScript                                      |
| Analytics       | Google Analytics (`G-HDGEL4WEZ7`) via Partytown |
| SEO             | astro-seo, @astrojs/sitemap                     |
| Date formatting | date-fns                                        |
| Flow diagrams   | @xyflow/react (experimental)                    |
| Font            | Inter Variable (@fontsource-variable/inter)     |

---

## Project Structure

```
website-astro/
├── astro.config.mjs          # Astro configuration
├── tailwind.config.mjs       # Tailwind configuration
├── tsconfig.json
├── package.json
├── public/
│   ├── fonts/
│   └── favicon.svg
├── src/
│   ├── content.config.ts     # Content collections definition
│   ├── env.d.ts
│   ├── assets/
│   ├── data/
│   │   ├── projects.json     # Project entries
│   │   └── categories.json   # Tag category definitions
│   ├── domain/
│   │   └── models/
│   │       ├── project.ts    # Zod schema & type for Project
│   │       └── category.ts   # Zod schema & type for Category
│   ├── features/
│   │   └── projects/
│   │       ├── Project.tsx   # React component — project card
│   │       ├── Tag.tsx       # React component — tag pill
│   │       └── tag-helper.ts # Resolves tag → category color
│   ├── layouts/
│   │   └── Page.astro        # Root HTML layout (head, header, footer)
│   ├── pages/
│   │   ├── index.astro       # Home page (about + recent projects)
│   │   ├── projects.astro    # Full projects list
│   │   ├── dev.astro         # Dev/experimental page (excluded from sitemap)
│   │   └── robots.txt.ts     # Dynamically generated robots.txt
│   ├── shared/
│   │   └── components/
│   │       ├── layout/
│   │       │   ├── Header.astro       # Fixed top nav bar
│   │       │   ├── Footer.astro       # Bottom footer with copyright
│   │       │   ├── Logo.astro
│   │       │   ├── Main.astro         # Page content wrapper
│   │       │   ├── Prose.astro        # Tailwind typography wrapper
│   │       │   └── ThemeToggle.astro  # Dark/light mode toggle
│   │       └── ui/
│   │           ├── Button.tsx
│   │           ├── Link.astro
│   │           ├── Socials.astro      # Email, LinkedIn, GitHub links
│   │           ├── experimental/
│   │           │   ├── FlyingCharactersCanvas.tsx
│   │           │   └── MyFlow.tsx     # React Flow diagram
│   │           └── icons/
│   │               ├── CubeIcon.astro
│   │               ├── GithubIcon.astro
│   │               ├── LinkedInIcon.astro
│   │               ├── MailIcon.astro
│   │               └── ThemeIcon.astro
│   └── styles/
│       └── global.css
├── tools/
└── wip/
```

---

## Pages

### `/` — Home (`index.astro`)

Displays an about section and the **3 most recent projects** from the content collection.

### `/projects` — Projects (`projects.astro`)

Lists **all projects**. Tags are fully expanded (`showAllTags`).

### `/dev` — Dev sandbox (`dev.astro`)

Experimental page hosting the React Flow diagram and placeholder prose. Excluded from the sitemap via `astro.config.mjs` and blocked in `robots.txt`.

### `/robots.txt` — Dynamic robots.txt (`robots.txt.ts`)

Generated at build time. Disallows `/dev` and includes the sitemap URL.

---

## Configuration

### Astro (`astro.config.mjs`)

- **Site:** `https://longville-software.be`
- **Integrations:** sitemap (filters out `/dev/`), Partytown (forwards `dataLayer.push`), React.
- **Vite plugin:** Tailwind CSS via `@tailwindcss/vite`.

### Tailwind (`tailwind.config.mjs`)

- **Dark mode:** `selector` (class-based — toggled on `<html>`).
- **Font family:** Inter Variable for `sans`.
- **Custom animation:** `jiggle` — vertical bounce keyframes.

---

## Development

### Prerequisites

- Node.js (LTS recommended)
- npm

### Commands

| Command           | Description                       |
| ----------------- | --------------------------------- |
| `npm run dev`     | Start local dev server            |
| `npm run build`   | Type-check + build for production |
| `npm run preview` | Preview production build locally  |

### Formatting

Prettier is configured with:

- `prettier-plugin-astro` — Astro file support.
- `prettier-plugin-tailwindcss` — Tailwind class sorting.
- `@trivago/prettier-plugin-sort-imports` — Import order sorting.

---

## SEO & Analytics

- **SEO:** `astro-seo` sets `<title>` as `Longville Software - {pageTitle}`. A sitemap is generated at `/sitemap-index.xml`.
- **Analytics:** Google Analytics (GA4, measurement ID `G-HDGEL4WEZ7`) is loaded as a Partytown script to offload execution to a web worker and avoid blocking the main thread. It fires on every page via `Page.astro`'s `<head>` — there is no per-page opt-out.

---

## Deployment

The site is a static output (Astro default adapter). Run `npm run build` to produce the `dist/` folder, then deploy to any static hosting provider.
