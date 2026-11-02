// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// GitHub Pages project site: https://lazzzarov.github.io/legends-of-spain/
// Every internal link must go through `withBase()` (src/lib/paths.ts).
export default defineConfig({
  site: 'https://lazzzarov.github.io',
  base: '/legends-of-spain',
  trailingSlash: 'always',
  integrations: [react(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
