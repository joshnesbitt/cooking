import type { APIRoute } from 'astro';
import type { CollectionEntry } from 'astro:content';
import { getPostsChronological } from '../../lib/posts';
import { recipeCard, defaultCard, renderPng } from '../../lib/og';

interface Props {
  post: CollectionEntry<'posts'> | null;
  entryNo: number;
  entryCount: number;
  firstYear: number;
}

export async function getStaticPaths() {
  const posts = await getPostsChronological();
  const entryCount = posts.length;
  const firstYear = posts[0].data.date.getUTCFullYear();

  return [
    { params: { slug: 'default' }, props: { post: null, entryNo: 0, entryCount, firstYear } },
    ...posts.map((post, index) => ({
      params: { slug: post.id },
      props: { post, entryNo: index + 1, entryCount, firstYear },
    })),
  ];
}

export const GET: APIRoute<Props> = async ({ props }) => {
  const card = props.post
    ? recipeCard(props.post, props.entryNo)
    : defaultCard(props.entryCount, props.firstYear);

  return new Response(await renderPng(card), {
    headers: { 'Content-Type': 'image/png' },
  });
};
