---
name: livecodes/markdown-integration
description: >
  Integrate LiveCodes with documentation sites using remark-livecodes,
  markdown-it-livecodes, gatsby-remark-livecodes, or marked-livecodes for
  Docusaurus, Astro, VitePress, Next.js, and Storybook.
type: composition
library: livecodes
library_version: 0.13.0
requires:
  - sdk-embedding
sources:
  - live-codes/livecodes:docs/docs/markdown-to-livecodes.mdx
---

This skill requires sdk-embedding. Read it first for foundational concepts.

# LiveCodes — Integrate with Documentation Sites

Convert Markdown/MDX code blocks to interactive LiveCodes playgrounds using plugins for popular documentation frameworks.

## Setup

### Docusaurus (remark-livecodes)

```bash
npm install -D remark-livecodes
```

```javascript
// docusaurus.config.js
module.exports = {
  presets: [
    [
      'classic',
      {
        docs: {
          remarkPlugins: [
            [
              require('remark-livecodes'),
              {
                /* options */
              },
            ],
          ],
        },
      },
    ],
  ],
};
```

### Astro (remark-livecodes)

```bash
npm install -D remark-livecodes
```

```javascript
// astro.config.mjs
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import remarkLivecodes from 'remark-livecodes';

export default defineConfig({
  integrations: [mdx()],
  markdown: {
    remarkPlugins: [
      [
        remarkLivecodes,
        {
          /* options */
        },
      ],
    ],
  },
});
```

### VitePress (markdown-it-livecodes)

```bash
npm install -D markdown-it-livecodes
```

```javascript
// .vitepress/config.js
import { defineConfig } from 'vitepress';
import markdownItLivecodes from 'markdown-it-livecodes';

export default defineConfig({
  markdown: {
    config: (md) => {
      md.use(markdownItLivecodes, {
        /* options */
      });
    },
  },
});
```

### Next.js (remark-livecodes)

```bash
npm install -D remark-livecodes
```

```javascript
// next.config.js
import createMDX from '@next/mdx';
import remarkLivecodes from 'remark-livecodes';

const nextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [
      [
        remarkLivecodes,
        {
          /* options */
        },
      ],
    ],
  },
});

export default withMDX(nextConfig);
```

### react-markdown

```bash
npm install remark-livecodes
```

````jsx
import Markdown from 'react-markdown';
import remarkLivecodes from 'remark-livecodes';

const markdown = '```jsx livecodes\nexport default () => <h1>Hello</h1>\n```';

<Markdown
  remarkPlugins={[
    [
      remarkLivecodes,
      {
        /* options */
      },
    ],
  ]}
>
  {markdown}
</Markdown>;
````

### Storybook (remark-livecodes)

```javascript
// storybook/main.js
import remarkLivecodes from 'remark-livecodes';

export default {
  addons: [
    {
      name: '@storybook/addon-docs',
      options: {
        mdxPluginOptions: {
          mdxCompileOptions: {
            remarkPlugins: [
              [
                remarkLivecodes,
                {
                  /* options */
                },
              ],
            ],
          },
        },
      },
    },
  ],
};
```

### Gatsby (gatsby-remark-livecodes)

```bash
npm install -D gatsby-remark-livecodes
```

```javascript
// gatsby-config.js
module.exports = {
  plugins: [
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-livecodes',
            options: {
              /* options */
            },
          },
        ],
      },
    },
  ],
};
```

## Usage

### Basic code block → Playground

````markdown
```jsx livecodes
import { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount((c) => c + 1)}>{count}</button>;
}

export default App;
```
````

Add `livecodes` to the code block language to render as an interactive playground.

### Button or Link instead of embed

````markdown
```jsx livecodes render=button
console.log('Edit in LiveCodes');
```
````

````markdown
```jsx livecodes render=link
console.log('Edit in LiveCodes');
```
````

| render                 | Behavior                                     |
| ---------------------- | -------------------------------------------- |
| `playground` (default) | Embed playground in page                     |
| `button`               | Show code block + "Edit in LiveCodes" button |
| `link`                 | Show code block + "Edit in LiveCodes" link   |
| `meta`                 | Add URL to `data-livecodes-url` attribute    |

## Options

Configure plugin options to apply to all code blocks:

```javascript
remarkPlugins: [
  [remarkLivecodes, {
    // Embed options
    loading: 'lazy',
    params: { console: 'open' },

    // Plugin options
    render: 'playground',  // 'playground' | 'button' | 'link' | 'meta'
    height: '400px',
    className: 'my-playground',
    auto: false,  // Auto-enable for all code blocks
  }],
],
```

## Meta Parameters

Configure individual code blocks with meta parameters:

````markdown
```jsx livecodes height=500px console=open theme=light
console.log('Hello World');
```
````

| Parameter   | Description                                                         |
| ----------- | ------------------------------------------------------------------- |
| `livecodes` | Enable playground rendering                                         |
| `render`    | Render mode: `playground`, `button`, `link`, `meta`                 |
| `height`    | Iframe height                                                       |
| `className` | CSS class for iframe/button/link                                    |
| `lang`      | Override language                                                   |
| `<param>`   | Any LiveCodes query parameter (e.g., `console=open`, `theme=light`) |

### Common Meta Parameters

````markdown
```jsx livecodes render=button
// Button opens in LiveCodes
```

```py livecodes lang=py-wasm console=open
# Force Python (Wasm) language
print("Hello from Python")
```

```typescript livecodes theme=light editor=monaco
// Light theme, Monaco editor
const x: number = 1;
```
````

## Common Mistakes

### MEDIUM Not installing peer dependencies

```bash
# Each plugin requires its host library
npm install remark remark-livecodes     # remark-livecodes
npm install marked marked-livecodes     # marked-livecodes
npm install markdown-it markdown-it-livecodes  # markdown-it-livecodes
npm install gatsby-plugin-remark gatsby-remark-livecodes  # Gatsby
```

Install the host library alongside the LiveCodes plugin. Each plugin wraps a specific Markdown processor.

Source: docs/docs/markdown-to-livecodes.mdx — Installation sections

### LOW Forgetting livecodes parameter in code block

````markdown
```jsx
// This is just a static code block (no livecodes parameter)
export default () => <h1>Hello</h1>;
```

```jsx livecodes
// This becomes an interactive playground
export default () => <h1>Hello</h1>;
```
````

Without the `livecodes` parameter, the code block renders as static Markdown. Add it to enable the playground.

Set `auto: true` in options to convert all code blocks automatically.

Source: docs/docs/markdown-to-livecodes.mdx — Meta Parameters section

## Plugin Packages

| Package                   | Use With                                              | Install                                  |
| ------------------------- | ----------------------------------------------------- | ---------------------------------------- |
| `remark-livecodes`        | Docusaurus, Astro, Next.js, Storybook, react-markdown | `npm install -D remark-livecodes`        |
| `markdown-it-livecodes`   | VitePress, Eleventy                                   | `npm install -D markdown-it-livecodes`   |
| `marked-livecodes`        | Marked                                                | `npm install -D marked-livecodes`        |
| `gatsby-remark-livecodes` | Gatsby                                                | `npm install -D gatsby-remark-livecodes` |
