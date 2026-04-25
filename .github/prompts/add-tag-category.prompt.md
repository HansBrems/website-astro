---
description: 'Add a new tag or tag category to categories.json. Validates the Tailwind color, updates the safelist if needed, and runs the build.'
agent: 'agent'
argument-hint: 'Category name, Tailwind color, and tags to include'
---

Add a new tag category (or new tags to an existing category) using the following steps:

1. Read [src/data/categories.json](../src/data/categories.json).

2. If adding to an **existing category**, append the new tag strings to that category's `"tags"` array.

3. If creating a **new category**:
   - Find the current maximum `id` and set `id = max + 1`.
   - The `color` must be a standard Tailwind color name (e.g. `"blue"`, `"violet"`, `"emerald"`). It is used as `border-{color}-500` in `Tag.tsx`.
   - Confirm the color exists in Tailwind's default palette before using it.
   - Append the new object:
     ```json
     {
       "id": <next integer>,
       "name": "category-name",
       "color": "<tailwind-color-name>",
       "tags": ["Tag1", "Tag2"]
     }
     ```

4. If the color is new (not already used in the codebase), add it to the safelist in [tailwind.config.mjs](../tailwind.config.mjs):

   ```js
   safelist: [{ pattern: /border-(teal|pink|stone|<new-color>)-500/ }];
   ```

5. Do **not** remove or rename the `"other"` category — it is the fallback used by `getTagColor()`.

6. Run `npm run build` and report the result. Fix any errors before finishing.
