import { z } from 'astro/zod';

export const categorySchema = z.object({
  id: z.number(),
  name: z.string(),
  color: z.string(),
  tags: z.array(z.string()),
});

export type Category = z.infer<typeof categorySchema>;
