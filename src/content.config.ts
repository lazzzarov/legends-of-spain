import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { legendSchema } from './lib/schema';

// One YAML file per legend: src/content/legends/<slug>.yaml (the filename is the URL slug).
const legends = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './src/content/legends' }),
  schema: legendSchema,
});

export const collections = { legends };
