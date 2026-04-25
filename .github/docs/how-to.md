# How-To Guides

## Add a new project

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

---

## Add a new tag category or tag

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

---

## Add a new page

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
