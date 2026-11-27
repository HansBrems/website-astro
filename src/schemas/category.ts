import { z } from 'astro/zod';

export const categoryColorSchema = z.enum(['teal', 'pink', 'stone']);

export type CategoryColor = z.infer<typeof categoryColorSchema>;

export const categorySchema = z.object({
  id: z.number(),
  name: z.string(),
  color: categoryColorSchema,
  tags: z.array(z.string()),
});

export type Category = z.infer<typeof categorySchema>;
