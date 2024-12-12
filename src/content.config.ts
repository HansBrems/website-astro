import { file } from 'astro/loaders';
import { defineCollection } from 'astro:content';

import { categorySchema } from './shared/models/category';
import { projectSchema } from './shared/models/project';

const projects = defineCollection({
  loader: file('src/data/projects.json'),
  schema: projectSchema,
});

const categories = defineCollection({
  loader: file('src/data/categories.json'),
  schema: categorySchema,
});

export const collections = { categories, projects };
