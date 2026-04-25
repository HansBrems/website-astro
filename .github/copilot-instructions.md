# Longville Software — Agent Instructions

## Project

Personal portfolio website for Hans Brems (Longville Software BV). Freelance software developer based in Langdorp, Belgium.

- **Production URL**: https://longville-software.be
- **Technical docs**: `.github/docs/` — see the Technical Reference section below

## Architecture

Static site. All data lives in `src/data/*.json`, validated by Zod schemas in `src/domain/models/`. Pages are `.astro` files that load collections via `getCollection()` and pass data to React island components. No database, no external API calls, no server-side logic. Full tech stack → [architecture.md](.github/docs/architecture.md).

## Hard Constraints

These must be followed on every change — no exceptions. Detailed rationale and edge cases for each constraint → [conventions.md](.github/docs/conventions.md).

1. **Plan before touching files.** Always present a plan and wait for confirmation before making any edits.
2. **`Page.astro` is the root layout for every page.** Never write raw `<html>`, `<head>`, or `<body>` in a page.
3. **Tailwind CSS only.** No CSS modules, no styled-components, no inline `style` attributes (except where Tailwind cannot cover it).
4. **Zod schema for every data model.** Export both the schema (`*Schema`) and the inferred type from `src/domain/models/`.
5. **React for interactive islands only.** Static content = `.astro`. React components hydrated with `client:visible` (lazy) or `client:load` (above-fold interactive).
6. **Run `npm run build` after every change set.** Fix all TypeScript and Astro diagnostics before considering a task done. If the build fails, use the `build-verify` skill to triage.
7. **All data in `src/data/*.json`.** No external APIs, no CMS, no database.
8. **New pages**: update `astro.config.mjs` sitemap filter and `src/pages/robots.txt.ts` if the page should be excluded from crawlers.

## Future Expansions

- **Blog**: implement as a new Astro content collection using the `glob()` loader with `.mdx` files. Do not use a CMS or external API.
- **Contact form**: no server-side handler exists yet. Use a third-party form service (e.g. Resend, Formspree) or defer until a server adapter is added.

## Technical Reference

Documentation is split by topic in `.github/docs/`. Read the relevant file when you need detail on a specific area:

| File                                              | Contents                                                                      |
| ------------------------------------------------- | ----------------------------------------------------------------------------- |
| [architecture.md](.github/docs/architecture.md)   | Tech stack, project structure, pages, configuration, dev commands, deployment |
| [components.md](.github/docs/components.md)       | Component descriptions, dependency map, props reference                       |
| [data-and-flow.md](.github/docs/data-and-flow.md) | Content model (Project/Category schemas), data flow                           |
| [conventions.md](.github/docs/conventions.md)     | Coding conventions, invariants, unstated defaults                             |
| [how-to.md](.github/docs/how-to.md)               | Step-by-step guides (add project, add tag, add page)                          |
