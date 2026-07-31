import { defineConfig, passthroughImageService } from 'astro/config';
import remarkBreaks from 'remark-breaks';

export default defineConfig({
  site: 'https://joshnesbitt.cooking',
  image: {
    // Images are served as-is from public/, no processing needed
    service: passthroughImageService(),
  },
  markdown: {
    // Preserve the markdown-it `breaks: true` behaviour from the Eleventy build
    remarkPlugins: [remarkBreaks],
  },
});
