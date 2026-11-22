import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import rehypeExternalLinks from 'rehype-external-links';

export default defineConfig({
  site: 'https://enismulic.github.io',
  integrations: [sitemap()],
  output: 'static',
  image: {
    // Remote images (photos, covers) come from many hosts; the build resizes them to WebP (see src/modules/secret/lib/image.ts)
    remotePatterns: [{ protocol: 'https' }],
  },
  markdown: {
    rehypePlugins: [
      [rehypeExternalLinks, { target: '_blank', rel: ['noopener', 'noreferrer'] }],
    ],
  },
});
