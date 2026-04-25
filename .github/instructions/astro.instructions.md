---
description: 'Use when creating or editing .astro files, pages, layouts, or Astro components. Covers layout rules, page scaffolding, sitemap/robots.txt updates, and icon conventions.'
applyTo: '**/*.astro'
---

# Astro Component & Page Rules

## Every page must use `Page.astro` as its root layout

```astro
---
import Page from '../layouts/Page.astro';
import Prose from '../shared/components/layout/Prose.astro';
---

<Page pageTitle="Your Title">
  <Prose>
    <!-- content -->
  </Prose>
</Page>
```

Never write `<html>`, `<head>`, or `<body>` in a page file. `Page.astro` owns the entire HTML shell.

## Long-form content uses `Prose.astro`

Wrap any prose, headings, or article-style content in `<Prose>`. It applies Tailwind Typography and the project's heading overrides.

## Adding a new page

1. Create `src/pages/<name>.astro` using the template above.
2. If the page should **not** appear in the sitemap, add a filter condition in `astro.config.mjs`:
   ```js
   filter: (page) =>
     page !== 'https://longville-software.be/dev/' &&
     page !== 'https://longville-software.be/<name>/',
   ```
3. If the page should be **blocked from crawlers**, add to `src/pages/robots.txt.ts`:
   ```
   Disallow: /<name>
   ```

## Icons

Icons are `.astro` components in `src/shared/components/ui/icons/`. Each renders an inline SVG. To add a new icon, create `<Name>Icon.astro` in that folder using the same pattern as the existing icons.

## Header, Footer, Socials

These are wired inside `Page.astro` and its sub-components. Do not import or re-render them inside page files.

## Experimental components

Components in `src/shared/components/ui/experimental/` are WIP only. They must not be used on production pages (`index.astro`, `projects.astro`). Only `dev.astro` may import them.
