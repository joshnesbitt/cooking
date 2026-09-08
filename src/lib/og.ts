import fs from 'node:fs';
import path from 'node:path';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import type { CollectionEntry } from 'astro:content';
import type { TableNode } from '../content.config';
import config from '../config.json';

// The Kitchen Ledger palette (mirrors src/styles/_settings.colors.scss)
const colors = {
  bg: '#fbfbf8',
  ink: '#24292c',
  accent: '#0e7490',
  tint: '#eef4f4',
  ruleStrong: '#bcc1b9',
  muted: '#7c8380',
  food: '#6b6f4a',
  foodTint: '#f0f1e2',
};

const serif = 'Source Serif 4';
const mono = 'IBM Plex Mono';

type Style = Record<string, unknown>;
type Node = { type: string; props: { style: Style; children?: unknown } };

// Satori misreads an empty children array as multiple children, so omit it
const h = (type: string, style: Style, ...children: unknown[]): Node => ({
  type,
  props: {
    style,
    children: children.length === 0 ? undefined : children.length === 1 ? children[0] : children,
  },
});

const font = (file: string) =>
  fs.readFileSync(path.join(process.cwd(), 'src/og/fonts', file));

const fonts = [
  { name: serif, data: font('SourceSerif4-Regular.ttf'), weight: 400 as const },
  { name: serif, data: font('SourceSerif4-SemiBold.ttf'), weight: 600 as const },
  { name: mono, data: font('IBMPlexMono-Regular.ttf'), weight: 400 as const },
  { name: mono, data: font('IBMPlexMono-SemiBold.ttf'), weight: 600 as const },
];

const monoLabel: Style = {
  fontFamily: mono,
  fontSize: '17px',
  fontWeight: 600,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
};

const leafCount = (node: TableNode): number =>
  typeof node === 'string' ? 1 : node.from.reduce((sum, child) => sum + leafCount(child), 0);

// Long titles step down so they never wrap past two lines
const titleSize = (title: string) =>
  title.length <= 16 ? 104 : title.length <= 26 ? 88 : title.length <= 36 ? 72 : 60;

function recipeCard(post: CollectionEntry<'posts'>, entryNo: number): Node {
  const isDrink = post.data.type === 'drink';
  const ingredients = post.data.table ? leafCount(post.data.table) : null;
  const logged = post.data.date.toISOString().slice(0, 7);
  const facts = [ingredients && `${ingredients} ingredients`, `Logged ${logged}`]
    .filter(Boolean)
    .join(' · ');

  return h(
    'div',
    {
      width: '1200px',
      height: '630px',
      display: 'flex',
      flexDirection: 'column',
      padding: '64px 72px',
      backgroundColor: colors.bg,
      color: colors.ink,
      fontFamily: serif,
    },
    h(
      'div',
      {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        paddingBottom: '20px',
        borderBottom: `2px solid ${colors.ink}`,
        ...monoLabel,
      },
      h('span', { color: colors.accent }, config.title),
      h('span', { color: colors.muted }, `No. ${String(entryNo).padStart(2, '0')}`)
    ),
    h(
      'div',
      { display: 'flex', flexDirection: 'column', justifyContent: 'center', flexGrow: 1 },
      h(
        'div',
        {
          fontSize: `${titleSize(post.data.title)}px`,
          fontWeight: 600,
          lineHeight: 1.02,
          letterSpacing: '-0.01em',
          marginBottom: '30px',
        },
        post.data.title
      ),
      post.data.description
        ? h(
            'div',
            { fontSize: '32px', lineHeight: 1.35, color: colors.muted, maxWidth: '760px' },
            post.data.description
          )
        : null
    ),
    h(
      'div',
      {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: '22px',
        borderTop: `1px solid ${colors.ruleStrong}`,
        color: colors.muted,
        ...monoLabel,
      },
      h(
        'div',
        { display: 'flex', alignItems: 'center' },
        h(
          'span',
          {
            fontSize: '15px',
            color: isDrink ? colors.accent : colors.food,
            backgroundColor: isDrink ? colors.tint : colors.foodTint,
            border: `1px solid ${isDrink ? colors.accent : colors.food}`,
            borderRadius: '3px',
            padding: '4px 12px',
            marginRight: '18px',
          },
          isDrink ? 'drink' : 'food'
        ),
        h('span', {}, facts)
      ),
      h('span', { color: colors.accent }, new URL(config.domain).hostname)
    )
  );
}

function defaultCard(entryCount: number, firstYear: number): Node {
  return h(
    'div',
    {
      width: '1200px',
      height: '630px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.bg,
      color: colors.ink,
      fontFamily: serif,
      border: `14px solid ${colors.tint}`,
    },
    h('div', { fontSize: '96px', fontWeight: 600, letterSpacing: '-0.01em' }, config.title),
    h(
      'div',
      { fontSize: '30px', color: colors.muted, marginTop: '10px' },
      `Findings from the kitchen, ${firstYear} → present. ${entryCount} entries.`
    ),
    h('div', {
      width: '120px',
      borderTop: `2px solid ${colors.accent}`,
      margin: '36px 0',
    }),
    h(
      'span',
      { ...monoLabel, fontSize: '19px', letterSpacing: '0.1em', color: colors.accent },
      new URL(config.domain).hostname
    )
  );
}

async function renderPng(node: Node): Promise<Uint8Array> {
  const svg = await satori(node, { width: 1200, height: 630, fonts });

  return new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } }).render().asPng();
}

function appendixCard(termCount: number, termRange: string): Node {
  return h(
    'div',
    {
      width: '1200px',
      height: '630px',
      display: 'flex',
      flexDirection: 'column',
      padding: '64px 72px',
      backgroundColor: colors.bg,
      color: colors.ink,
      fontFamily: serif,
    },
    h(
      'div',
      {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        paddingBottom: '20px',
        borderBottom: `2px solid ${colors.ink}`,
        ...monoLabel,
      },
      h('span', { color: colors.accent }, config.title),
      h('span', { color: colors.muted }, `${termCount} terms`)
    ),
    h(
      'div',
      { display: 'flex', flexDirection: 'column', justifyContent: 'center', flexGrow: 1 },
      h(
        'div',
        {
          fontSize: '104px',
          fontWeight: 600,
          lineHeight: 1.02,
          letterSpacing: '-0.01em',
          marginBottom: '30px',
        },
        'Appendix'
      ),
      h(
        'div',
        { fontSize: '32px', lineHeight: 1.35, color: colors.muted, maxWidth: '760px' },
        'Definitions of technical terms used in the log.'
      )
    ),
    h(
      'div',
      {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: '22px',
        borderTop: `1px solid ${colors.ruleStrong}`,
        color: colors.muted,
        ...monoLabel,
      },
      h('span', {}, termRange),
      h('span', { color: colors.accent }, new URL(config.domain).hostname)
    )
  );
}

export { recipeCard, defaultCard, appendixCard, renderPng };
