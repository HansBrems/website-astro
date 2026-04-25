---
description: "Add a new project entry to the portfolio. Reads projects.json to find the next id, validates tags against categories, appends the entry, and runs the build."
agent: "agent"
argument-hint: "Describe the project: role, company, dates, and tech stack"
---

Add a new project to [src/data/projects.json](../src/data/projects.json) using the following steps:

1. Read [src/data/projects.json](../src/data/projects.json) and find the current maximum `id`. The new entry's `id` must be `max + 1`.
2. Read [src/data/categories.json](../src/data/categories.json) and collect all known tags across all categories.
3. For each tag in the new project's `tags` array:
   - If it already exists in a category, use it as-is.
   - If it is new, ask which category it belongs to (or whether to create a new category). Do not silently add unrecognised tags.
4. Append the new project object to `projects.json`. Follow this exact shape:
   ```json
   {
     "id": <next integer>,
     "title": "Role title",
     "company": "Company name",
     "description": "One or two sentence description.",
     "from": "YYYY-MM-DDT00:00:00.000Z",
     "to": null,
     "tags": ["Tag1", "Tag2"]
   }
   ```
   Use `"to": null` for ongoing projects. For completed projects use an ISO 8601 datetime string (e.g. `"2025-06-30T00:00:00.000Z"`).
5. Run `npm run build` and report the result. Fix any errors before finishing.
