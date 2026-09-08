export interface GlossaryTerm {
  // Anchor on the glossary page (/glossary/#id)
  id: string;
  term: string;
  definition: string;
  // Surface forms that count as a mention of this term
  aliases: string[];
  // Slug of the post that IS this term; mentions there aren't linked
  entry?: string;
}

export const glossary: GlossaryTerm[] = [
  {
    id: 'al-dente',
    term: 'al dente',
    definition:
      'Cooked until it still has a slight bite in the centre. Pasta wants to stay there. Risotto rice bound for arancini has to, because it cooks a second time in the fryer.',
    aliases: ['al dente'],
  },
  {
    id: 'baste',
    term: 'baste',
    definition:
      "Spooning or brushing fat over something as it cooks. It carries flavour and colour to parts the heat can't reach on its own: butter over a grilling lobster, miso brown butter over a charred cabbage.",
    aliases: ['baste', 'bastes', 'basted', 'basting'],
  },
  {
    id: 'blanch',
    term: 'blanch',
    definition:
      'A short dip in boiling water, then straight into iced water to stop the cooking dead. It sets the colour in herbs and greens, which is why the herb oil ends up so green.',
    aliases: ['blanch', 'blanches', 'blanched', 'blanching'],
  },
  {
    id: 'confit',
    term: 'confit',
    definition:
      "Cooking something slowly, fully submerged in fat, at a temperature too low to fry. If the oil is bubbling aggressively it's too hot. The odd lazy bubble is what you're after.",
    aliases: ['confit', 'confiting', 'confited'],
    entry: 'confit-garlic',
  },
  {
    id: 'crumb',
    term: 'crumb',
    definition:
      'The inside of a loaf: the holes and the texture, as opposed to the crust. An open crumb (big, irregular holes) is the reward for a wet dough and a patient prove.',
    aliases: ['crumb'],
  },
  {
    id: 'cure',
    term: 'cure',
    definition:
      'Preserving meat or fish with salt, which pulls out moisture and keeps the dangerous things at bay. The salt ratios matter more here than anywhere else in cooking: weigh them properly.',
    aliases: ['cure', 'cures', 'cured', 'curing'],
  },
  {
    id: 'deglaze',
    term: 'deglaze',
    definition:
      'Adding liquid to a hot pan or roasting tray to lift the stuck-on brown bits. Those bits are concentrated flavour, scrape them up and keep them.',
    aliases: ['deglaze', 'deglazed', 'deglazing'],
  },
  {
    id: 'emulsion',
    term: 'emulsion',
    definition:
      "Fat and liquid persuaded to hold together as one thick, glossy sauce: mayonnaise, béarnaise, a proper dressing. Add the fat slowly and keep everything moving. If it splits back into its parts it can usually be rescued, so don't bin it.",
    aliases: ['emulsion', 'emulsions', 'emulsify', 'emulsifies', 'emulsified', 'emulsifying'],
  },
  {
    id: 'fold',
    term: 'fold',
    definition:
      "Two meanings depending on what's in the bowl. With a batter, combining gently with a spatula to keep the air in. With a wet bread dough, stretching one side up and over itself: a lazy substitute for kneading that builds strength between rests.",
    aliases: ['fold', 'folds', 'folded', 'folding'],
  },
  {
    id: 'glace',
    term: 'glace',
    definition:
      'Stock reduced hard until it sets like jelly in the fridge. A spoonful does more for a pan sauce than anything you can buy in a jar.',
    aliases: ['glace'],
  },
  {
    id: 'hydration',
    term: 'hydration',
    definition:
      'The weight of water in a dough as a percentage of the flour weight. Higher hydration means a stickier dough and a more open crumb. Resist the urge to add flour, wet hands solve most of the handling problems.',
    aliases: ['hydration'],
  },
  {
    id: 'maldon',
    term: 'Maldon',
    definition:
      'Flaky sea salt from Essex, and the only finishing salt used in this log. Crush it between your fingers over the finished dish. Fine salt is for pasta water and seasoning as you go, Maldon is for the end.',
    aliases: ['maldon'],
  },
  {
    id: 'mojama',
    term: 'mojama',
    definition:
      'Salt-cured, air-dried tuna loin, a Spanish staple. A sort of tuna ham: sliced thin it delivers the same deep savoury hit as anchovy or parmesan.',
    aliases: ['mojama'],
    entry: 'tuna-mojama',
  },
  {
    id: 'muddle',
    term: 'muddle',
    definition:
      'Pressing fruit or herbs in the bottom of a shaker or glass to release their juice and oils. Press and twist gently rather than pulverise: smashed mint turns a drink bitter.',
    aliases: ['muddle', 'muddles', 'muddled', 'muddling'],
  },
  {
    id: 'poolish',
    term: 'poolish',
    definition:
      'A French pre-ferment: equal weights of flour and water with a pinch of yeast, mixed the night before and added to a dough in place of using yeast directly. All it needs is time, and it pays you back in flavour and crumb.',
    aliases: ['poolish', 'pre-ferment', 'pre-ferments'],
    entry: 'poolish',
  },
  {
    id: 'prove',
    term: 'prove',
    definition:
      'Leaving a yeasted dough to rise before baking. Slow and cold (overnight in the fridge) builds more flavour than fast and warm. Bakers also call it proofing.',
    aliases: ['prove', 'proves', 'proved', 'proving', 'proofing'],
  },
  {
    id: 'render',
    term: 'render',
    definition:
      'Melting the fat out of meat slowly on a low heat, so it ends up in the dish rather than chewy in the meat. Rushing this step is why cheap cuts get a bad name.',
    aliases: ['render', 'renders', 'rendered', 'rendering'],
  },
  {
    id: 'roux',
    term: 'roux',
    definition:
      "Flour cooked into melted butter until it forms a smooth paste, the thickener behind béchamel, Mornay and most white sauces. Cook it for a minute or two first so the sauce doesn't taste of raw flour.",
    aliases: ['roux'],
  },
  {
    id: 'umami',
    term: 'umami',
    definition:
      'The fifth taste: deep, savoury, moreish. Parmesan, anchovies, dried shrimp, cured ham and MSG all carry it, and some of the best condiments in this log are little more than vehicles for it.',
    aliases: ['umami'],
  },
];

const escapeRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const patterns = new Map(
  glossary.map((term) => [
    term.id,
    new RegExp(`\\b(?:${term.aliases.map(escapeRegExp).join('|')})\\b`, 'i'),
  ])
);

export const termPattern = (term: GlossaryTerm) => patterns.get(term.id)!;

// Whether a post's markdown body mentions the term. Link targets and
// reference definitions are stripped so URLs don't count as mentions.
export function mentionsTerm(term: GlossaryTerm, body: string): boolean {
  const prose = body
    .replace(/\]\([^)]*\)/g, ']')
    .replace(/^\[[^\]]+\]:.*$/gm, '')
    .replace(/https?:\/\/\S+/g, '');

  return termPattern(term).test(prose);
}

// Tags whose contents should never gain glossary links
const skipTag = /^(?:a|code|pre|h[1-6]|script|style)$/;

export interface GlossaryLinkState {
  linked: Set<string>;
}

// Wrap the first mention of each glossary term in a link to the glossary
// page. State is shared across calls so a post split into fragments still
// links each term once. Mentions of a term on its own entry page are left
// alone (the glossary would only point straight back).
export function linkGlossaryTerms(
  html: string,
  state: GlossaryLinkState,
  currentSlug?: string
): string {
  const tokens = html.split(/(<[^>]+>)/);
  let skipDepth = 0;

  const linkText = (text: string): string => {
    let result = '';
    let rest = text;

    for (;;) {
      let best: { term: GlossaryTerm; index: number; match: string } | null = null;

      for (const term of glossary) {
        if (state.linked.has(term.id) || term.entry === currentSlug) continue;

        const match = termPattern(term).exec(rest);

        if (match && (best === null || match.index < best.index)) {
          best = { term, index: match.index, match: match[0] };
        }
      }

      if (!best) return result + rest;

      state.linked.add(best.term.id);
      result +=
        rest.slice(0, best.index) +
        `<a class="o-term" href="/glossary/#${best.term.id}">${best.match}</a>`;
      rest = rest.slice(best.index + best.match.length);
    }
  };

  return tokens
    .map((token) => {
      if (token.startsWith('<')) {
        const tag = token.match(/^<(\/?)([a-zA-Z][a-zA-Z0-9]*)/);

        if (tag && skipTag.test(tag[2].toLowerCase())) {
          skipDepth += tag[1] ? -1 : 1;
        }

        return token;
      }

      return skipDepth > 0 || token === '' ? token : linkText(token);
    })
    .join('');
}
