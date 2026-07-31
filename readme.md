[![Netlify Status](https://api.netlify.com/api/v1/badges/4e74a407-39cd-4a98-aba5-50a55f5913e5/deploy-status)](https://app.netlify.com/sites/joshnesbitt-cooking/deploys)

# Cooking Site


## Overview

A simple site to publish findings while cooking. Built with [Astro](https://astro.build/) and deployed to Netlify.


## Running

```
nvm use
npm install
npm run dev
```


## Building

```
npm run build
```

The static site is output to `dist/`.


## Recipe tables

Each post can declare a `table:` tree in its frontmatter — a [Cooking for Engineers](https://www.cookingforengineers.com/)-style matrix rendered between the intro and the recipe. Leaves are ingredients; nodes are actions applied to their children; the root is the final step.

```yaml
table:
  action: blend until smooth
  from:
    - action: finely mince
      from:
        - 2 garlic cloves
    - 1 bunch parsley
```

Avoid colons inside action or ingredient text (it breaks YAML parsing).
