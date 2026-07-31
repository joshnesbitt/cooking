import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const posts = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/posts' }),
  schema: z.object({
    title: z.string(),
    description: z.string().nullable().optional(),
    date: z.coerce.date(),
    type: z.string().optional(),
    // Legacy Eleventy field; routing now derives the URL from the filename
    permalink: z.string().optional(),
    images: z
      .array(
        z.object({
          path: z.string(),
          alt: z.string(),
        })
      )
      .optional(),
  }),
});

export const collections = { posts };
