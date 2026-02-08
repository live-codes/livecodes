# LiveCodes SDK

import LiveCodes from '../../src/components/LiveCodes.tsx';

The Software Development Kit (SDK) provides an easy, yet powerful, interface to embed and communicate with LiveCodes playgrounds.

The SDK is provided as a light-weight ([less than 5kb gzipped](https://bundlephobia.com/package/livecodes)), zero-dependencies [npm package](#npm-package), that is also available from [CDNs](#cdn). It can be used to create playgrounds with a wide variety of [configurations](../configuration/configuration-object.html.md) and [embed options](js-ts.html.md)#embed-options). In addition, [SDK methods](js-ts.html.md)#sdk-methods) allow programmatic communication and control of the playgrounds during runtime.

The [JavaScript SDK](js-ts.html.md) is framework/library agnostic. However, wrapper components are also provided for popular libraries (currently [React](react.html.md) and [Vue](vue.html.md)). The SDK can be used in [Svelte](svelte.html.md) and [Solid](solid.html.md) directly without wrappers. [TypeScript support](js-ts.html.md)#typescript-types) provides type-safety and a great developer experience.

## SDK Demo

This is an example of an editable embedded playground using the SDK.

<LiveCodes
  config={{
    markup: { language: 'markdown', content: '# Hello World!' },
    script: { language: 'javascript', content: 'console.log("Hello, from JS!");' },
    tools: { active: 'console', status: 'open' },
  }}
></LiveCodes>

## Installation

### NPM Package

This is a single npm package for the SDK which supports JavaScript/TypeScript, React, Vue and Svelte.
Install the library from npm:

```bash npm2yarn
npm install livecodes
```

then it can be used like that:

```js title="index.js"
import { createPlayground } from 'livecodes';

createPlayground('#container', {
  // embed options
});
```

### CDN

Alternatively, it can just be loaded from a CDN.

ESM:

import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import CodeBlock from '@theme/CodeBlock';

export const ESMCode = () => {
  const { siteConfig } = useDocusaurusContext();
  return (
    <CodeBlock title="index.html" language="html">
      {`<div id="container"></div>\n<script type="module">
${'  '}import { createPlayground } from 'https://cdn.jsdelivr.net/npm/livecodes@${siteConfig.customFields.sdkVersion}';\n
${' '.repeat(2)}createPlayground('#container', {
${' '.repeat(4)}// embed options
${' '.repeat(2)}});
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
${' '.repeat(2)}livecodes.createPlayground('#container', {
${' '.repeat(4)}// embed options
${' '.repeat(2)}});
</script>
`}
    </CodeBlock>
  );
};

<UMDCode />

:::info

In the full [standalone app](../getting-started.html.md)#standalone-app), the JavaScript SDK is accessible via the global variable `livecodes`, which can be interacted with in the browser console.

:::

## Usage

The SDK is currently provided in the following variations:

- [JavaScript/TypeScript](./js-ts.html.md)

- [React](./react.html.md)

- [Vue](./vue.html.md)

- [Svelte](./svelte.html.md)

- [Solid](./solid.html.md)

## Headless Mode

The SDK also has a [headless mode](./headless.html.md). In this mode, no visible output is displayed in the embedding web page. However, all [SDK methods](../sdk/js-ts.html.md)#sdk-methods) are accessible. This provides the power of leveraging the wide range of features and language support offered by LiveCodes, while retaining full control over the UI.

## SDK Playground!

A demo page that shows the usage of the SDK can be [found here](https://live-codes.github.io/livecodes-examples/sdk-demo.html) ([source](https://github.com/live-codes/livecodes-examples/blob/gh-pages/sdk-demo.html)).

Or edit the SDK playground in LiveCodes. How meta! :)

<LiveCodes import="id/8k6vbxitvb9" config={{ view: 'result' }} height="80vh" showCode={false} />

P.S. You may want to use the "Full Screen" button!