# Getting Started

import LiveCodes from '../src/components/LiveCodes.tsx';

There are multiple options:

## Standalone App

The easiest way to get started with LiveCodes is to just use the app (https://livecodes.io).

It is packed with [features](./features/index.html.md) and offers various ways to [import code](./features/import.html.md).

## Embedded Playgrounds

LiveCodes playgrounds can be easily [embedded](./features/embeds.html.md) into any web page. This can be achieved using:

### App Embed Screen

The [standalone app](#standalone-app) allows you to embed any project from the [embed screen](./features/embeds.html.md). The UI allows setting embed options and shows a preview of the embedded playground.
Copy the generated code snippet (at the bottom of the screen) and add it to the web page that you want to embed the playground in.

### SDK

LiveCodes [<abbr title="Software Development Kit">SDK</abbr>](./sdk/index.html.md) is available as [npm package](https://www.npmjs.com/package/livecodes) to allow easy embedding and communication with playgrounds.

#### Option 1: Using a bundler

Install from npm.

```bash npm2yarn
npm install livecodes
```

then you can use it like that:

```js title="index.js"
import { createPlayground } from 'livecodes';

createPlayground('#container', {
  template: 'react',
  // other embed options
});
```

#### Option 2: Load from CDN

ESM:

import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import CodeBlock from '@theme/CodeBlock';

export const ESMCode = () => {
  const { siteConfig } = useDocusaurusContext();
  return (
    <CodeBlock title="index.html" language="html">
      {`<div id="container"></div>\n<script type="module">
${'  '}import { createPlayground } from 'https://cdn.jsdelivr.net/npm/livecodes@${siteConfig.customFields.sdkVersion}';\n
${'  '}createPlayground('#container', {
${'    '}template: 'react',
${'    '}// other embed options
${'  '}});
</script>`}
    </CodeBlock>
  );
};

<ESMCode />

UMD:

export const UMDCode = () => {
  const { siteConfig } = useDocusaurusContext();
  return (
    <CodeBlock title="index.html" language="html">
      {`<div id="container"></div>\n<script src="https://cdn.jsdelivr.net/npm/livecodes@${siteConfig.customFields.sdkVersion}/livecodes.umd.js"></script>\n<script>\n  // the UMD version provides the global object \`livecodes\`
${' '}livecodes.createPlayground('#container', {\n${' '.repeat(4)}template: 'react',
${'    '}// other embed options
${' '}});
</script>
`}
    </CodeBlock>
  );
};

<UMDCode />

#### Add your own content

You may use any of the methods to [prefill the playground](./features/code-prefill.html.md) with your own code.

Example:

```js title="index.js"
import { createPlayground } from 'livecodes';

const config = {
  markup: {
    language: 'markdown',
    content: '# Hello LiveCodes!',
  },
  style: {
    language: 'css',
    content: 'body { color: blue; }',
  },
  script: {
    language: 'javascript',
    content: 'console.log("hello from JavaScript!");',
  },
  activeEditor: 'script',
};

createPlayground('#container', { config, params: { console: 'open' } });
```

export const config = {
  markup: {
    language: 'markdown',
    content: '# Hello LiveCodes!',
  },
  style: {
    language: 'css',
    content: 'body { color: blue; }',
  },
  script: {
    language: 'javascript',
    content: 'console.log("hello from JavaScript!");',
  },
  activeEditor: 'script',
};

Live demo:
(this is an interactive playground - try editing the code!)

<LiveCodes config={config} params={{ console: 'open' }}></LiveCodes>

Please refer to the section on [Embedded Playgrounds](./features/embeds.html.md) for more details.

## Self-Hosting

LiveCodes can be hosted on any static file server or CDN.

The easiest way is to download the app from [releases](https://github.com/live-codes/livecodes/releases), extract the folder and add it to your website.

Please check the section on [self-hosting](./features/self-hosting.html.md) for other methods of self-hosting, including the built-in setup to deploy to GitHub pages and how to use the SDK with the self-hosted app.