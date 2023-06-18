# Getting Started

import LiveCodes from '../src/components/LiveCodes.tsx';

There are multiple options:

## Standalone App

The easiest way to get started with LiveCodes is to just use the app (https://livecodes.io).

It is packed with [features](./features/index.md) and offers various ways to [import code](./features/import.md).

## Embedded Playgrounds

LiveCodes playgrounds can be easily embedded into any web page. This can be achieved using:

### App Embed Screen

The [standalone app](#standalone-app) allows you to embed any project from the [embed screen](./features/embeds.md). The UI allows setting embed options and shows a preview of the embedded playground.  
Copy the generated code snippet (at the bottom of the screen) and add it to the web page that you want to embed the playground in.

### SDK

LiveCodes [<abbr title="Software Development Kit">SDK</abbr>](./sdk/index.md) is available as [npm package](https://www.npmjs.com/package/livecodes) to allow easy [embedding](./features/embeds.md) and communication with playgrounds.

#### Option 1: Using a bundler

Install from npm.

```shell
npm i livecodes
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
return (<CodeBlock title="index.html" language="html">
{`<div id="container"></div>\n<script type="module">
${'  '}import { createPlayground } from 'https://cdn.jsdelivr.net/npm/livecodes@${siteConfig.customFields.sdkVersion}';\n
${'  '}createPlayground('#container', {
${'    '}template: 'react',
${'    '}// other embed options
${'  '}});
</script>`}
</CodeBlock>);
}

<ESMCode />

UMD:

export const UMDCode = () => {
const { siteConfig } = useDocusaurusContext();
return (<CodeBlock title="index.html" language="html">
{`<div id="container"></div>\n<script src="https://cdn.jsdelivr.net/npm/livecodes@${siteConfig.customFields.sdkVersion}/livecodes.umd.js"></script>\n<script>\n  // the UMD version provides the global object \`livecodes\`
${' '}livecodes.createPlayground('#container', {\n${' '.repeat(4)}template: 'react',
${'    '}// other embed options
${' '}});
</script>
`}
</CodeBlock>);
}

<UMDCode />

#### Add your own content

You may use any of the methods to [prefill the playground](./features/code-prefill.md) with your own code.

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

Please refer to [SDK documentation](./sdk/js-ts.md) for detailed usage.

## Self-Hosting

LiveCodes can be hosted on any static file server or CDN.

The built app can be obtained by one of the following ways:

- Download the app from the [releases](https://github.com/live-codes/livecodes/releases), extract the folder and add it to your website.
- Fork the [GitHub repo](https://github.com/live-codes/livecodes) and clone it. You may wish to use the included setup to deploy to [GitHub Pages](https://pages.github.com/):

  ```shell
  git clone https://github.com/{your-username}/livecodes
  cd livecodes
  npm install
  npm run deploy     # build and deploy to github pages

  # for development
  npm run serve         # locally serve to http://localhost:8080
  npm start             # start local development with code watch, rebuild and live-reload
  ```

- Fork the [GitHub repo](https://github.com/live-codes/livecodes) and use one of the hosting services that integrate with GitHub to allow automatic deploys on code push (e.g. [Cloudflare Pages](https://developers.cloudflare.com/pages/get-started), [Vercel](https://vercel.com/docs/concepts/git), [Netlify](https://docs.netlify.com/configure-builds/overview/), [Firebase](https://firebase.google.com/docs/hosting/github-integration)). When prompted, the build command is `npm run build` and the build output directory is `build`.

You may wish to edit one or more of the used [services](./advanced/services.md) to use your own.

The [SDK](./sdk/index.md) can still be used with the self-hosted app by providing the [`appUrl`](./sdk/js-ts.md#appurl) [embed option](./sdk/js-ts.md#embed-options).

```js title="index.js"
import { createPlayground } from 'livecodes';

const options = {
  appUrl: 'https://playground.myserver.com/',
  template: 'react',
  // other embed options
};
createPlayground('#container', options);
```
