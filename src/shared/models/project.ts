import { z } from 'astro/zod';

export const projectSchema = z.object({
  title: z.string(),
  company: z.string(),
  description: z.string(),
  from: z.coerce.date(),
  to: z.coerce.date(),
  tags: z.array(z.string()),
});

export type Project = z.infer<typeof projectSchema>;
