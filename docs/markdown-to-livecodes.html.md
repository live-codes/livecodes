# Markdown to LiveCodes

Markdown and MDX code blocks can be easily converted to interactive LiveCodes playgrounds.

The playgrounds can run any of the supported [languages](./languages/index.html.md) in LiveCodes, and can be customized to any of the [configuration options](./configuration/index.html.md).

A fenced code block in Markdown can be rendered as a LiveCodes playground by adding the `livecodes` parameter to the code block language meta.

This is provided as [plugins](#packages) for [markdown-it](https://github.com/markdown-it/markdown-it), [marked](https://github.com/markedjs/marked) and [remark](https://github.com/remarkjs/remark).
These plugins allow the seamless integration with most of the popular frameworks like Astro, Docusaurus, Next.js, Storybook, VitePress, etc. See the section "[Using with Frameworks](#using-with-frameworks)" for getting started.

## Demo

This is an example code block:

````md
```jsx
import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>You clicked {count} times.</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}

export default App;
```
````

The above code block is normally rendered like this:

```jsx
import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>You clicked {count} times.</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}

export default App;
```

<br />

The code block can instead be rendered as an interactive playground by adding the `livecodes` parameter to the code block language meta:

````md {1}
```jsx livecodes
import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>You clicked {count} times.</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}

export default App;
```
````

to be displayed like this:

```jsx livecodes
import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>You clicked {count} times.</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}

export default App;
```

<br />
<br />

The playground can be customized by setting [options](#options) that are applied to all code blocks or by [meta parameters](#meta-parameters) that are applied to individual code blocks.

Alternatively, the code block can be kept as it is, and a button or a link (**Edit in LiveCodes**) is appended, below the code block, that opens the code in a LiveCodes playground.
This is achieved by adding the `render=button` or `render=link` parameter to the code block language meta.

This displays a button:

````md {1}
```jsx livecodes render=button
import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>You clicked {count} times.</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}

export default App;
```
````

```jsx livecodes render=button
import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>You clicked {count} times.</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}

export default App;
```
<br />
<br />
While this displays a link:

````md {1}
```jsx livecodes render=link
import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>You clicked {count} times.</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}

export default App;
```
````

```jsx livecodes render=link
import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>You clicked {count} times.</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}

export default App;
```

## Packages

All the functionality described here can be achieved using *any* of the following packages:

- [`markdown-it-livecodes`](https://www.npmjs.com/package/markdown-it-livecodes): A [markdown-it](https://github.com/markdown-it/markdown-it) plugin.
- [`marked-livecodes`](https://www.npmjs.com/package/marked-livecodes): A [marked](https://github.com/markedjs/marked) plugin.
- [`remark-livecodes`](https://www.npmjs.com/package/remark-livecodes): A [remark](https://github.com/remarkjs/remark) plugin.
- [`gatsby-remark-livecodes`](https://www.npmjs.com/package/gatsby-remark-livecodes): A [gatsby](https://github.com/gatsbyjs/gatsby) plugin.

See the section "[Using with Frameworks](#using-with-frameworks)" for using the plugins with popular frameworks like Astro, Docusaurus, Next.js, Storybook, VitePress, etc.

## Usage

### markdown-it-livecodes

To use the `markdown-it-livecodes` plugin, first install it:

```bash npm2yarn
npm install markdown-it markdown-it-livecodes
```

Then it can be used like this:

````js
import markdownIt from "markdown-it";
import markdownItLivecodes from "markdown-it-livecodes";

const input = "```js livecodes \nconsole.log('Hello World!');\n```";

const output = markdownIt()
  .use(markdownItLivecodes, {
    /* options */
  })
  .render(input);

console.log(output); // <iframe ...></iframe>
````

### marked-livecodes

To use the `marked-livecodes` plugin, first install it:

```bash npm2yarn
npm install marked marked-livecodes
```

Then it can be used like this:

````js
import marked from "marked";
import markedLivecodes from "marked-livecodes";

const input = "```js livecodes \nconsole.log('Hello World!');\n```";

const output = await marked
  .use(markedLivecodes, {
    /* options */
  })
  .parse(input);

console.log(output); // <iframe ...></iframe>
````

### remark-livecodes

To use the `remark-livecodes` plugin, first install it:

```bash npm2yarn
npm install remark remark-livecodes
```

Then it can be used like this:

````js
import { remark } from "remark";
import remarkLivecodes from "remark-livecodes";

const input = "```js livecodes \nconsole.log('Hello World!');\n```";

const output = await remark()
  .use(remarkLivecodes, {
    /* options */
  })
  .process(input);

console.log(String(output)); // <iframe ...></iframe>
````

### gatsby-remark-livecodes

See usage with [Gatsby](#gatsby).

## Options

Options can be passed to the plugins. These options apply to all code blocks.

These options include LiveCodes SDK [embed options](./sdk/js-ts.html.md)#embed-options) (except `headless`).

Example:

````js
const output = await remark()
  .use(remarkLivecodes, {
    // highlight-start
    loading: "click",
    params: {
      console: "open"
      theme: "light",
    }
    // highlight-end
  })
  .process(input);
````

In addition, the following options are also available:

- `render`: The render mode for the LiveCodes playgrounds. This can be one of the following:
  - `playground` (default): Replaces the code block with an iframe that displays the LiveCodes playground. By default, [`"simple"` mode](./features/display-modes.html.md) is used, but this can be changed in [options](#options) or [meta parameters](#meta-parameters).
  - `link`: Keeps the code block as it is, and appends a link (**Edit in LiveCodes**), below the code block, that opens the code in a LiveCodes playground.
  - `button`: Keeps the code block as it is, and appends a button (Edit in LiveCodes), below the code block, that opens the code in a LiveCodes playground.<br />
    <img src="https://dev.livecodes.io/livecodes/assets/images/edit-in-livecodes-button.svg" alt="Edit in LiveCodes button" style={{height: "28px"}} />
  - `meta`: Keeps the code block as it is, and adds the URL of the playground to the `data-livecodes-url` attribute of the `<code>` element. In addition, in `remark-livecodes` the URL is added to the AST (`node.data.livecodesUrl` and `node.data.hProperties.dataLivecodesUrl`). In `markdown-it-livecodes` the URL is added to `env.livecodesUrl`.
    This can be used by other plugins (e.g. to display a custom run button overlying the code block).
- `height`: The height of the playground iframe.
- `className`: The class name to be applied to the iframe, link or button.
  Note: If the class name of the button contains `"dark"` (e.g. `"dark-btn"`), the dark button will be used.<br />
  <img src="https://dev.livecodes.io/livecodes/assets/images/edit-in-livecodes-button-dark.svg" alt="Edit in LiveCodes button" style={{height: "28px"}} />
- `auto`: When set to `true`, it automatically enables the `livecodes` parameter for all code blocks without having to explicitly add it.
  This is useful when you have a large number of code blocks and don't want to add the `livecodes` parameter to each code block.
  To disable this for a specific code block, add the `livecodes=false` [meta parameter](#meta-parameters) to the code block.

## Meta Parameters

Individual code blocks can be configured using meta parameters. These are key/value pairs, separated by spaces, that are added after the language name.

Meta parameters of code blocks override the [options](#options) passed to the plugin.

Example:

````markdown {1}
```jsx livecodes render=button className=dark-btn console=open
import { useState, useEffect } from "react";

export default () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("count:", count);
  }, [count]);

  return (
    <div>
      <p>You clicked {count} times.</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
};
```
````

All LiveCodes [configuration query parameters](./configuration/query-params.html.md) can be used as code block meta parameters (e.g. ` ```js livecodes console=open theme=light`). See the [LiveCodes configuration docs](./configuration/configuration-object.html.md) for more information.

In addition, the following meta parameters are available:

- `livecodes`: Enables the LiveCodes playground for the code block. This can be omitted if the `auto` option is set to `true`. When `livecodes` is set to `false`, the code block is not handled by the plugin.
- `render`: The render mode. See the [Options](#options) section for more information.
- `height`: The height of the playground iframe.
- `className`: The class name for the playground iframe, link or button.
- `lang`: This overrides the language of the code block (e.g. ` ```jsx livecodes lang=react` or ` ```py livecodes lang=py-wasm`). See the [Languages](./languages/index.html.md) docs for more language information.

## Using with Frameworks

This guide shows how to use the suitable plugin in different frameworks.

### Astro

([demo](https://markdown-to-livecodes-astro.pages.dev/) - [code on GitHub](https://github.com/hatemhosny/markdown-to-livecodes-astro))

Install the `remark-livecodes` plugin:

```bash npm2yarn
npm install -D remark-livecodes
```

This is an example for adding the `remark-livecodes` plugin to `astro.config.mjs` file:

```js title="astro.config.js"
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import remarkLivecodes from "remark-livecodes";

export default defineConfig({
  // ...
  integrations: [mdx()],
  markdown: {
    remarkPlugins: [
      [remarkLivecodes, { /* options */ }],
    ],
  },
});
```

### Docusaurus

([demo](https://markdown-to-livecodes-docusaurus.pages.dev/) - [code on GitHub](https://github.com/hatemhosny/markdown-to-livecodes-docusaurus))

Install the `remark-livecodes` plugin:

```bash npm2yarn
npm install -D remark-livecodes
```

This is an example for adding the `remark-livecodes` plugin to `docusaurus.config.js` file:

```js title="docusaurus.config.js"
export default {
  presets: [
    [
      'classic',
      {
        docs: {
          // ...
          remarkPlugins: [
            [require('remark-livecodes'), { /* options */ }],
          ],
        },
      },
    ],
  ],
  // ...
};
```

### Eleventy

([demo](https://markdown-to-livecodes-11ty.pages.dev/) - [code on GitHub](https://github.com/hatemhosny/markdown-to-livecodes-11ty))

Install the `markdown-it-livecodes` plugin:

```bash npm2yarn
npm install -D markdown-it-livecodes
```

This is an example for adding the `markdown-it-livecodes` plugin to `eleventy.config.js` file:

```js title="eleventy.config.js"
import markdownItLivecodes from "markdown-it-livecodes";

export default async function (eleventyConfig) {
  eleventyConfig.amendLibrary("md", (mdLib) =>
    mdLib.use(markdownItLivecodes, { /* options */ }),
  );
  // ...
}
```

### Gatsby

([demo](https://markdown-to-livecodes-gatsby.pages.dev/markdown-to-livecodes/) - [code on GitHub](https://github.com/hatemhosny/markdown-to-livecodes-gatsby))

Install the `gatsby-remark-livecodes` plugin:

```bash npm2yarn
npm install -D gatsby-remark-livecodes
```

This is an example for adding the `gatsby-remark-livecodes` plugin to `gatsby-config.js` file:

```js title="gatsby-config.js"
module.exports = {
  // ...
  plugins: [
    // ...
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-livecodes',
            options: { /* options */ },
          },
        ],
      },
    },
  ],
};
```

### Next.js

([demo](https://markdown-to-livecodes-nextjs.pages.dev/mdx-page) - [code on GitHub](https://github.com/hatemhosny/markdown-to-livecodes-nextjs))

See [Next.js docs](https://nextjs.org/docs/app/guides/mdx) for using markdown and MDX in Next.js.

Install the `remark-livecodes` plugin:

```bash npm2yarn
npm install -D remark-livecodes
```

This is an example for adding the `remark-livecodes` plugin to `next.config.js` file:

```js title="next.config.js"
import createMDX from "@next/mdx";
import remarkLivecodes from "remark-livecodes";

const nextConfig = {
  // ...
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [
      [remarkLivecodes, { /* other options */ }],
    ],
  },
});

export default withMDX(nextConfig);
```

When using Turbopack for local development, check the guide for [using plugins with Turbopack](https://nextjs.org/docs/app/guides/mdx#using-plugins-with-turbopack).

### react-markdown

`react-markdown` is a React component to render markdown.

This is an example for using the `remark-livecodes` plugin with `react-markdown`:

Install the `remark-livecodes` plugin:

```bash npm2yarn
npm install remark-livecodes
```

```jsx title="App.jsx" livecodes render=button
import Markdown from 'react-markdown';
import remarkLivecodes from 'remark-livecodes';

const markdown =
  '```jsx livecodes\nexport default () => <h1>Hello World</h1>\n```';

export default () => (
  <Markdown remarkPlugins={[[remarkLivecodes, { /* options */ }]]}>
    {markdown}
  </Markdown>
);
```

### Storybook

([demo](https://markdown-to-livecodes-storybook.pages.dev/) - [code on GitHub](https://github.com/hatemhosny/markdown-to-livecodes-storybook))

Install the `remark-livecodes` plugin:

```bash npm2yarn
npm install -D remark-livecodes
```

This is an example for adding the `remark-livecodes` plugin to `storybook/main.js` file:

```js title="storybook/main.js"
import remarkLivecodes from "remark-livecodes";

export default {
  // ...
  addons: [
    // ...
    {
      name: "@storybook/addon-docs",
      options: {
        mdxPluginOptions: {
          mdxCompileOptions: {
            remarkPlugins: [
              [remarkLivecodes, { /* options */ }],
            ],
          },
        },
      },
    },
  ],
};
```

### VitePress

([demo](https://markdown-to-livecodes-vitepress.pages.dev/) - [code on GitHub](https://github.com/hatemhosny/markdown-to-livecodes-vitepress))

Install the `markdown-it-livecodes` plugin:

```bash npm2yarn
npm install -D markdown-it-livecodes
```

This is an example for adding the `markdown-it-livecodes` plugin to `vitepress.config.js` file:

```js title=".vitepress/config.js"
import { defineConfig } from "vitepress";
import markDownItLivecodes from "markdown-it-livecodes";

export default defineConfig({
  // ...
  markdown: {
    config: (md) => {
      md.use(markDownItLivecodes, { /* options */ });
    },
  },
});
```