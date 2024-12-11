import { file } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

const projects = defineCollection({
  loader: file('src/data/projects.json'),
  schema: z.object({
    title: z.string(),
    company: z.string(),
    description: z.string(),
    from: z.coerce.date(),
    to: z.coerce.date(),
    tags: z.array(z.string()),
  }),
});

const categories = defineCollection({
  loader: file('src/data/categories.json'),
  schema: z.object({
    name: z.string(),
    color: z.string(),
    tags: z.array(z.string()),
  }),
});

export const collections = { projects, categories };
