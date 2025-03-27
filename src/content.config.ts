import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

// const blog = defineCollection({
// 	// Load Markdown and MDX files in the `src/content/blog/` directory.
// 	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
// 	// Type-check frontmatter using a schema
// 	schema: z.object({
// 		title: z.string(),
// 		description: z.string(),
// 		// Transform string to Date object
// 		pubDate: z.coerce.date(),
// 		updatedDate: z.coerce.date().optional(),
// 		heroImage: z.string().optional(),
// 	}),
// });


const blogCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    publishDate: z.coerce.date(), // Using coerce.date() for more flexible date parsing
    description: z.string(),
    author: z.string(),
    tags: z.array(z.string()).optional(),
    draft: z.boolean().optional().default(false)
  })
});



const docsCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    category: z.enum([
      'vue-idioms',
      'tooling',
      'testing',
      'refactoring',
      'mindset',
      'guides',
      'design-systems',
      'composables',
      'architecture'
    ]),
    order: z.number().optional(),
    description: z.string().optional(),
    tags: z.array(z.string()).optional()
  })
});

export const collections = {
  'mindset': docsCollection,
  'refactoring': docsCollection,
  'vue-idioms': docsCollection,
  'composables': docsCollection,
  'architecture': docsCollection,
  'design-systems': docsCollection,
  'testing': docsCollection,
  'tooling': docsCollection,
  'guides': docsCollection,
  'blog': blogCollection,
};
