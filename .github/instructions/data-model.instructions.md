---
description: 'Use when adding or editing data files (projects.json, categories.json), Zod schemas, or content collection config. Covers JSON structure, schema conventions, and collection invariants.'
applyTo: 'src/data/**,src/domain/**,src/content.config.ts'
---

# Data Model Rules

## All persistent data lives in `src/data/*.json`

No database, no CMS, no external API. JSON files are the single source of truth.

## Every JSON entry requires an integer `id` field

The `id` must be unique within its collection. Astro's file loader uses it as the collection entry identifier. Use `max(existing id) + 1` for new entries.

## Adding a new data collection

Every new collection requires three coordinated changes:

1. **JSON file**: `src/data/<name>.json` — array of objects, each with an integer `id`
2. **Zod schema**: `src/domain/models/<name>.ts` — export both the schema and the inferred type:

   ```ts
   import { z } from 'astro/zod';

   export const thingSchema = z.object({ ... });
   export type Thing = z.infer<typeof thingSchema>;
   ```

3. **Content config**: add a `defineCollection` entry in `src/content.config.ts`:

   ```ts
   import { file } from 'astro/loaders';
   import { thingSchema } from './domain/models/thing';

   const things = defineCollection({ loader: file('src/data/things.json'), schema: thingSchema });
   export const collections = { ..., things };
   ```

## Project-specific invariants

- **`to: null`** is the sentinel for a currently-active project. Never use an empty string or omit the field entirely.
- The **`"other"` category** in `categories.json` must never be removed — it is the fallback used by `getTagColor()`.
- Every tag used in `projects.json` should have a matching entry in at least one `categories.json` category. Unmatched tags fall back to the `"other"` category (color: `"stone"`).

## Future blog

When adding a blog, implement it as a new Astro content collection using the `glob()` loader with `.mdx` source files. Do not use an external CMS or API.
