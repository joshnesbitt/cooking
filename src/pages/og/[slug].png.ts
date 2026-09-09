import type { APIRoute } from 'astro';
import type { CollectionEntry } from 'astro:content';
import { getPostsChronological } from '../../lib/posts';
import { glossary } from '../../lib/glossary';
import { recipeCard, defaultCard, appendixCard, renderPng } from '../../lib/og';

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
  const shared = { post: null, entryNo: 0, entryCount, firstYear };

  return [
    { params: { slug: 'default' }, props: shared },
    { params: { slug: 'appendix' }, props: shared },
    ...posts.map((post, index) => ({
      params: { slug: post.id },
      props: { post, entryNo: index + 1, entryCount, firstYear },
    })),
  ];
}

export const GET: APIRoute<Props> = async ({ props, params }) => {
  const terms = [...glossary].sort((a, b) => a.term.localeCompare(b.term));
  const termRange = `${terms[0].term} → ${terms[terms.length - 1].term}`;

  const card = props.post
    ? recipeCard(props.post, props.entryNo)
    : params.slug === 'appendix'
      ? appendixCard(glossary.length, termRange)
      : defaultCard(props.entryCount, props.firstYear);

  return new Response(await renderPng(card), {
    headers: { 'Content-Type': 'image/png' },
  });
};
