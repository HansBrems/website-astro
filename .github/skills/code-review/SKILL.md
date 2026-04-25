---
name: code-review
description: 'Review changed files against all project hard constraints, conventions, data-model invariants, and dynamic Tailwind safety rules. Use after implementing a feature, during the implementation loop, or when you want an explicit quality gate before committing. Triggered by: "code review", "review changes", "check conventions", "quality gate".'
argument-hint: 'Optional: path(s) or area to focus on (e.g. "src/features/projects/")'
---

# Code Review

Inspects the changed files in the current working tree against this project's hard constraints, conventions, invariants, and code-quality rules. Produces a structured report the agent can act on immediately.

---

## Procedure

### Step 1 — Identify changed files

Run `git diff HEAD --name-only` to list all modified files (staged and unstaged). If the review is scoped to a specific area, filter to those paths.

```
git diff HEAD --name-only
```

For each file, read its contents with `read_file` before evaluating it.

### Step 2 — Run the checklist

Work through **all five categories** below for every changed file. Record a finding whenever a rule is violated.

### Step 3 — Produce the report

Output a Markdown report in the format shown in the **Output Format** section. If there are no findings, write `All checks passed.`

If findings exist, return the report to the calling agent so it can fix each item before re-running the review.

---

## Checklist

### Category 1 — Hard Constraints

Check every changed `.astro` page file:

- [ ] **Root layout**: The page uses `<Page>` from `../layouts/Page.astro` as its outermost wrapper. No raw `<html>`, `<head>`, or `<body>` tags.
- [ ] **No CSS modules / styled-components / inline styles**: All styling is done with Tailwind classes. Inline `style=` attributes are only present where a value literally cannot be expressed as a Tailwind class.
- [ ] **React for islands only**: Any `.tsx` component imported into an `.astro` page must have a `client:` directive (`client:visible` or `client:load`). Static content belongs in `.astro`.
- [ ] **Data lives in `src/data/*.json`**: No component fetches from an external API, reads from a database, or imports data from outside `src/data/` or Astro content collections.
- [ ] **Sitemap & robots updated**: If a new page was added that should be excluded from crawlers, confirm `astro.config.mjs` has a filter entry and `src/pages/robots.txt.ts` has a `Disallow:` rule.

Check every changed `src/domain/models/*.ts` file:

- [ ] **Zod schema exported**: The file exports a Zod schema named `<noun>Schema`.
- [ ] **Type exported**: The file exports the inferred TypeScript type via `export type <Noun> = z.infer<typeof <noun>Schema>`.

---

### Category 2 — Conventions

- [ ] **`Prose.astro` wrapping**: Long-form or article-style content inside `.astro` pages is wrapped in `<Prose>`. Headings and body text should not appear unwrapped inside `<Page>`.
- [ ] **Icons as `.astro` components**: New icons are created as `<Name>Icon.astro` in `src/shared/components/ui/icons/` and render inline SVG. No external icon library imports.
- [ ] **`experimental/` isolation**: Components in `src/shared/components/ui/experimental/` are only imported by `dev.astro`. No production page (`index.astro`, `projects.astro`, etc.) imports from `experimental/`.
- [ ] **No duplicate global imports**: `global.css` and the global font are only imported in `Page.astro`. No other file imports them.
- [ ] **`Header`, `Footer`, `Socials` not re-imported in pages**: These are already wired inside `Page.astro`. Page files must not import or render them again.

---

### Category 3 — Data Model Invariants

Check every changed `src/data/*.json` file:

- [ ] **`id` is an integer, unique within its collection**: Use `max(existing id) + 1` for new entries. Duplicate ids cause Astro collection errors.
- [ ] **`to: null` sentinel preserved**: For project entries representing ongoing work, the `to` field must be `null` — not an empty string, not omitted.
- [ ] **`"other"` category not removed**: `categories.json` must always contain a category with id/slug `"other"` and `"tags": []`. It is the fallback used by `getTagColor()`.
- [ ] **Tag coverage**: Every tag string used in `projects.json` appears in at least one category's `tags` array in `categories.json`. Unmatched tags silently fall back to `"stone"` color — verify this is intentional if new tags are added without a matching category.
- [ ] **Content config updated**: If a new `src/data/*.json` file was added, `src/content.config.ts` has a matching `defineCollection` entry.

---

### Category 4 — Dynamic Tailwind Safety

- [ ] **No assembled class strings without a complete literal**: If a class name is built at runtime (e.g. `` `border-${color}-500` ``), the complete class string (e.g. `border-teal-500`) must appear somewhere in the source — in the component, in `src/data/categories.json`, or as a safelist pattern in `tailwind.config.mjs`.
- [ ] **New colors added to safelist**: If a new Tailwind color is introduced for dynamic use, confirm that `tailwind.config.mjs` has a safelist pattern that covers it.

---

### Category 5 — Code Quality

- [ ] **No TypeScript `any` escapes**: No new `as any`, `: any`, or `@ts-ignore` comments unless there is a documented reason.
- [ ] **Correct hydration directive**: React islands default to `client:visible`. Only use `client:load` for components that are above the fold and require immediate interactivity. Flag any `client:load` on below-fold components.
- [ ] **No dead code introduced**: Unused imports, unreachable branches, or exported symbols never referenced elsewhere should not be left in place.
- [ ] **No hardcoded secrets or credentials**: No API keys, tokens, or passwords in any source file.
- [ ] **No `<script>` tags with `innerHTML` or `eval`**: These are XSS vectors. Dynamic content must be injected via safe DOM APIs or Astro's templating.

---

## Output Format

```markdown
## Code Review Report

### Category 1 — Hard Constraints: PASS | FAIL

- [ FAIL ] <file>: <description of violation>

### Category 2 — Conventions: PASS | FAIL

- [ FAIL ] <file>: <description of violation>

### Category 3 — Data Model Invariants: PASS | FAIL

- [ FAIL ] <file>: <description of violation>

### Category 4 — Dynamic Tailwind Safety: PASS | FAIL

- (no findings)

### Category 5 — Code Quality: PASS | FAIL

- [ FAIL ] <file>: <description of violation>

---

**Overall: PASS | FAIL**
X finding(s) require action before this change is ready.
```

If all categories pass, output:

```markdown
## Code Review Report

All checks passed. No findings.
```
