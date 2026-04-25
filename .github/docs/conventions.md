# Conventions

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
