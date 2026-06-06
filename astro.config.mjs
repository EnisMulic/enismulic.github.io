import { defineConfig, passthroughImageService } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://enismulic.github.io',
  integrations: [react(), sitemap()],
  output: 'static',
  image: {
    service: passthroughImageService(),
  },
});
