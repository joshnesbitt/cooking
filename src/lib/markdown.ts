import { createMarkdownProcessor, type MarkdownProcessor } from '@astrojs/markdown-remark';
import remarkBreaks from 'remark-breaks';

let processor: Promise<MarkdownProcessor> | undefined;

// Mirrors the markdown config in astro.config.mjs so split-rendered
// fragments come out identical to whole-page rendering
export async function renderMarkdown(markdown: string): Promise<string> {
  processor ??= createMarkdownProcessor({ remarkPlugins: [remarkBreaks] });

  return (await (await processor).render(markdown)).code;
}
