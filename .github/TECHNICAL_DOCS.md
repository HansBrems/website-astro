# Longville Software — Technical Documentation

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

## Content Model

Content is loaded from static JSON files using Astro's **Content Collections** with file loaders. Schemas are validated with Zod.

### Project (`src/data/projects.json`)

```ts
{
  title: string;       // Role/position title
  company: string;     // Client or employer name
  description: string;
  from: Date;          // ISO datetime string, coerced to Date
  to: Date | null;     // null = "Present"
  tags: string[];      // Technology/skill tags
}
```

### Category (`src/data/categories.json`)

```ts
{
  name: string;    // e.g. "back-end", "front-end"
  color: string;   // Tailwind color name, e.g. "teal", "pink"
  tags: string[];  // Tags belonging to this category
}
```

Tag-to-color resolution is handled by `getTagColor()` in `tag-helper.ts`. If a tag doesn't match any category, it falls back to the `"other"` category, then to `"stone"`.

---

## Key Components

### `Page.astro` (layout)

Root layout used by every page. Provides:

- HTML `<head>` with SEO meta, favicon, Inter Variable font, Google Analytics (via Partytown).
- Fixed `<Header>` with logo, social links, and theme toggle.
- `<Main>` content slot.
- `<Footer>` with copyright and social links.

### `Header.astro`

Fixed, full-width top bar with backdrop blur. Contains:

- Logo (links to `/`).
- Social icons (hidden on mobile, visible on `md+`).
- `ThemeToggle`.

### `ThemeToggle.astro`

Reads `localStorage` for a stored `theme` value; falls back to `prefers-color-scheme`. Toggles the `dark` class on `<html>` and persists the choice to `localStorage`.

### `Project.tsx` (React island)

Renders a project card with:

- Company name, date range (`MMM yyyy` format), and role title.
- Description paragraph.
- Tag pills with category-based colors.
- A "Show all / Show less" toggle button when there are more than 5 tags and `showAllTags` is not set.

Activated with `client:visible` (home page) or `client:load` (dev page).

### `Socials.astro`

Icon links to email (`info@longville-software.be`), LinkedIn (`hansbrems`), and GitHub (`HansBrems`).

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
- **Analytics:** Google Analytics (GA4, measurement ID `G-HDGEL4WEZ7`) is loaded as a Partytown script to offload execution to a web worker and avoid blocking the main thread.

---

## Deployment

The site is a static output (Astro default adapter). Run `npm run build` to produce the `dist/` folder, then deploy to any static hosting provider.

---

## Data Flow

Content data follows this exact path at both build time and runtime:

```
src/data/projects.json
  └─► defineCollection (file loader, src/content.config.ts)
        └─► getCollection('projects') in page frontmatter
              └─► .map(x => x.data)  →  Project[]
                    └─► <Project project={...} categories={...} client:visible />
                          ├─► <Tag label={tag} color={getTagColor(categories, tag)} />
                          └─► <Button text="Show all" onClick={toggleShowAll} />  (conditional)

src/data/categories.json
  └─► defineCollection (file loader, src/content.config.ts)
        └─► getCollection('categories') in page frontmatter
              └─► .map(x => x.data)  →  Category[]
                    └─► passed as prop to every <Project />
                          └─► passed to getTagColor() for each tag
```

No API calls are made at runtime. All data is resolved during the Astro build or, for React islands, on first render on the client.

---

## Component Dependency Map

Import relationships between files. Indentation = "imports".

```
Page.astro (layout)
  ├── Header.astro
  │     ├── Logo.astro
  │     ├── Socials.astro
  │     │     ├── Link.astro
  │     │     ├── GithubIcon.astro
  │     │     ├── LinkedInIcon.astro
  │     │     └── MailIcon.astro
  │     └── ThemeToggle.astro
  │           └── ThemeIcon.astro
  ├── Main.astro
  └── Footer.astro
        └── Socials.astro  (same as above)

index.astro
  ├── Page.astro
  ├── Prose.astro
  ├── Link.astro
  └── Project.tsx  (React island)
        ├── Tag.tsx
        ├── Button.tsx
        └── tag-helper.ts
              └── category.ts  (type only)

projects.astro
  ├── Page.astro
  ├── Prose.astro
  └── Project.tsx  (same as above)

dev.astro
  ├── Page.astro
  ├── Prose.astro
  └── MyFlow.tsx  (React island, experimental)
```

---

## Component Props Reference

### `Project.tsx`

| Prop          | Type         | Required | Default | Description                                                                  |
| ------------- | ------------ | -------- | ------- | ---------------------------------------------------------------------------- |
| `project`     | `Project`    | yes      | —       | Project data object (see Content Model)                                      |
| `categories`  | `Category[]` | yes      | —       | All categories, used to resolve tag colors                                   |
| `showAllTags` | `boolean`    | no       | `false` | When `true`, renders all tags without truncation and hides the toggle button |

### `Tag.tsx`

| Prop    | Type     | Required | Default | Description                                                                            |
| ------- | -------- | -------- | ------- | -------------------------------------------------------------------------------------- |
| `label` | `string` | yes      | —       | Text displayed inside the tag pill                                                     |
| `color` | `string` | yes      | —       | Tailwind color name (e.g. `"teal"`, `"pink"`, `"stone"`). Used as `border-{color}-500` |

### `Button.tsx`

| Prop      | Type         | Required | Default | Description   |
| --------- | ------------ | -------- | ------- | ------------- |
| `text`    | `string`     | yes      | —       | Button label  |
| `onClick` | `() => void` | yes      | —       | Click handler |

### `Link.astro`

| Prop       | Type      | Required | Default | Description                                                      |
| ---------- | --------- | -------- | ------- | ---------------------------------------------------------------- |
| `href`     | `string`  | yes      | —       | Target URL                                                       |
| `external` | `boolean` | no       | `false` | When `true`, sets `target="_blank"`                              |
| `icon`     | `boolean` | no       | `false` | When `true`, suppresses text color classes (for icon-only links) |
| `title`    | `string`  | no       | —       | HTML `title` attribute (tooltip on hover)                        |

### `Page.astro` (layout)

| Prop        | Type     | Required | Default | Description                                                 |
| ----------- | -------- | -------- | ------- | ----------------------------------------------------------- |
| `pageTitle` | `string` | yes      | —       | Appended to `<title>` as `Longville Software - {pageTitle}` |

---

## Conventions & Patterns

These rules are followed consistently across the codebase. When generating or modifying code, preserve them.

1. **Every page uses `Page.astro` as its root layout.** No page renders its own `<html>`, `<head>`, or `<body>`.
2. **All persistent data lives in `src/data/*.json`.** There is no database, CMS, or external API.
3. **Schemas are defined with Zod in `src/domain/models/`.** Each model file exports both a Zod schema (`*Schema`) and the inferred TypeScript type.
4. **React is used only for interactive islands.** Static markup uses `.astro` components. React components that need the DOM are activated with `client:visible` (lazy, viewport-triggered) or `client:load` (immediate).
5. **Tailwind CSS v4 is used for all styling.** There are no CSS modules or styled-components. Global styles are limited to `src/styles/global.css`.
6. **`Prose.astro` wraps all long-form or prose-style content.** It applies Tailwind Typography (`prose prose-stone`) and the project's heading overrides.
7. **Icons are `.astro` components** located in `src/shared/components/ui/icons/`. They render inline SVG.
8. **The `experimental/` folder** contains components that are work-in-progress and not used in production pages (only in `dev.astro`).

---

## Invariants & Constraints

Things that must remain true for the site to function correctly.

- **Every tag used in `projects.json` should have a matching entry in at least one `categories.json` category's `tags` array.** If not, `getTagColor()` falls back to the `"other"` category (color: `"stone"`). The `"other"` category must always exist in `categories.json` with `"tags": []`.
- **`Page.astro` is the only file that imports the global font and `global.css`.** Adding these imports elsewhere will cause duplicates.
- **`/dev` must remain excluded from both the sitemap and `robots.txt`.** The sitemap filter is in `astro.config.mjs`; the `robots.txt` disallow rule is in `src/pages/robots.txt.ts`.
- **Project entries in `projects.json` must include an `id` field** (integer, unique) because Astro's file loader requires an `id` for collection entries.
- **`to: null` in a project entry is the sentinel value for "currently active".** Do not use an empty string or omit the field.
- **Tailwind class names that are built dynamically** (e.g. `border-${color}-500` in `Tag.tsx`) must use complete class strings — Tailwind's JIT scanner cannot detect dynamically assembled class names. The color values passed to `Tag` must be Tailwind color names that are already present elsewhere in the project or added to the safelist.

---

## Unstated Defaults

Behavior that is not obvious from reading the component surface.

- **Dark mode is on by default.** `<html>` is rendered with `class="dark"` server-side. `ThemeToggle.astro` then reads `localStorage` and `prefers-color-scheme` to correct the class on the client before first paint.
- **Tag truncation threshold is 5.** `Project.tsx` shows the first 5 tags when `showAllTags` is `false` (the default). The "Show all" button appears only when there are more than 5 tags.
- **Projects on the home page are limited to the first 3 entries** from the collection (`.slice(0, 3)`). Order is determined by the order of objects in `projects.json` — there is no sort applied in code.
- **`Main.astro` constrains content width to `prose` (65ch) on `md+` screens** and is centered with `mx-auto`.
- **`Socials.astro` is rendered in both `Header` and `Footer`.** In the header it is hidden on mobile (`hidden md:flex`).
- **Google Analytics fires on every page** because it is part of `Page.astro`'s `<head>`. There is no per-page opt-out.

---

## How-To Guides

### Add a new project

1. Open `src/data/projects.json`.
2. Append a new object to the JSON array:

```json
{
  "id": <next integer>,
  "title": "Role title here",
  "company": "Company name",
  "description": "One or two sentence description.",
  "from": "2024-01-01T00:00:00.000Z",
  "to": null,
  "tags": ["Tag1", "Tag2"]
}
```

3. Set `"to": null` for ongoing projects. For completed projects use an ISO 8601 datetime string (e.g. `"2025-06-30T00:00:00.000Z"`).
4. Use tag values that already exist in `categories.json`, or add them there first (see below).
5. No code changes are required. The content collection loader picks up the change automatically.

### Add a new tag category or tag

1. Open `src/data/categories.json`.
2. To add a tag to an existing category, append the tag string to that category's `"tags"` array.
3. To add a new category, append a new object:

```json
{
  "id": <next integer>,
  "name": "category-name",
  "color": "<tailwind-color-name>",
  "tags": ["Tag1", "Tag2"]
}
```

4. The `color` value must be a standard Tailwind color name (e.g. `"blue"`, `"violet"`). It is used as `border-{color}-500` in `Tag.tsx`. Ensure the resulting class exists in Tailwind's palette or is safelisted.
5. Do not remove the `"other"` category — it is the fallback used by `getTagColor()`.

### Add a new page

1. Create a new `.astro` file in `src/pages/`, e.g. `src/pages/about.astro`.
2. Use `Page.astro` as the layout:

```astro
---
import Page from '../layouts/Page.astro';
import Prose from '../shared/components/layout/Prose.astro';
---

<Page pageTitle="About">
  <Prose>
    <h1>About</h1>
    <p>Content here.</p>
  </Prose>
</Page>
```

3. Astro's file-based router exposes the page at `/{filename}` automatically.
4. If the page should be excluded from the sitemap, add a filter condition in `astro.config.mjs`:

```js
sitemap({
  filter: (page) =>
    page !== 'https://longville-software.be/dev/' &&
    page !== 'https://longville-software.be/about/',
}),
```

5. If the page should be blocked from crawlers, add a `Disallow` line in `src/pages/robots.txt.ts`.
