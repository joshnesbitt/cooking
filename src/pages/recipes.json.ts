import type { APIRoute } from 'astro';
import { getPostsChronological } from '../lib/posts';

// A machine-readable copy of every recipe, built at deploy time. The home
// planner (home.nesbitts.family) imports from this rather than scraping pages,
// so keep the shape stable: add fields, don't rename or remove them.

// The body of one `## Heading` section, up to the next H2
function section(body: string, heading: string): string {
  const match = body.match(new RegExp(`^## ${heading}\\s*$([\\s\\S]*?)(?=^## |(?![\\s\\S]))`, 'm'));
  return match ? match[1].trim() : '';
}

// Markdown links, emphasis and code down to their text
function plain(text: string): string {
  return text
    .replace(/!?\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/(\*\*|__|\*|_|`)(.+?)\1/g, '$2')
    .trim();
}

// List items (`* `, `- ` or `1. `) in a section; prose lines in between are skipped
function listItems(text: string): string[] {
  return text
    .split('\n')
    .map((line) => line.match(/^\s*(?:[*-]|\d+\.)\s+(.*)$/)?.[1])
    .filter((item): item is string => Boolean(item))
    .map(plain);
}

export const GET: APIRoute = async ({ site }) => {
  const posts = await getPostsChronological();
  const absolute = (path: string) => new URL(path, site).toString();

  const recipes = posts.map((post) => {
    const body = post.body ?? '';
    const notes = section(body, 'Notes');

    return {
      slug: post.id,
      title: post.data.title,
      description: post.data.description ?? null,
      type: post.data.type === 'drink' ? 'drink' : 'food',
      date: post.data.date.toISOString().slice(0, 10),
      url: absolute(`/${post.id}/`),
      image: post.data.images?.[0] ? absolute(post.data.images[0].path) : null,
      ingredients: listItems(section(body, 'Ingredients')),
      method: listItems(section(body, 'Method')),
      notes: notes ? plain(notes) : null,
    };
  });

  return new Response(JSON.stringify({ version: 1, recipes }, null, 2), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
};
