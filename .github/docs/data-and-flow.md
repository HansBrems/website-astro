# Data & Flow

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
