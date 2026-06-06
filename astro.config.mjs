import { defineConfig, passthroughImageService } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://enismulic.github.io',
  integrations: [sitemap()],
  output: 'static',
  image: {
    service: passthroughImageService(),
  },
});
