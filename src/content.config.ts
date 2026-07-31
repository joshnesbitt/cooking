import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// A recipe table is a tree: leaves are ingredients, internal nodes are
// actions applied to the children beneath them (Cooking for Engineers style)
export type TableNode = string | { action: string; from: TableNode[] };

const tableNode: z.ZodType<TableNode> = z.lazy(() =>
  z.union([
    z.string(),
    z.object({
      action: z.string(),
      from: z.array(tableNode).min(1),
    }),
  ])
);

const posts = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/posts' }),
  schema: z.object({
    title: z.string(),
    description: z.string().nullable().optional(),
    date: z.coerce.date(),
    type: z.string().optional(),
    // Legacy Eleventy field; routing now derives the URL from the filename
    permalink: z.string().optional(),
    table: tableNode.optional(),
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
