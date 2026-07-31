import { getCollection } from 'astro:content';

// Posts in chronological order; a post's entry number is its position + 1
export async function getPostsChronological() {
  const posts = await getCollection('posts');

  return posts.sort(
    (a, b) => a.data.date.valueOf() - b.data.date.valueOf() || a.id.localeCompare(b.id)
  );
}
