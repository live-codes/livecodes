---
sidebar_class_name: exclude_from_sidebar
---

# LiveCodes SDK

import LiveCodes from '../../src/components/LiveCodes.tsx'

The SoftWare Development Kit (SDK) provides an easy, yet powerful, interface to embed and communicate with LiveCodes playgrounds.

The SDK is provided as a light-weight, zero-dependencies [npm package](#npm-package), that is also available from [CDNs](#cdn). It can be used to create playgrounds with a wide variety of [configurations](../configuration/configuration-object.md) and [embed options](js-ts.md#embed-options). In addition, [SDK methods](js-ts.md#sdk-methods) allow programmatic communication and control of the playgrounds during runtime.

The [JavaScript SDK](js-ts.md) is framework/library agnostic. However, wrapper components are also provided for popular libraries (currently [React](react.md) and [Vue](vue.md)). [TypeScript support](js-ts.md#typescript-types) provides type-safety and a great developer experience.

## SDK Demo

This is an example of an editable embedded playground using the SDK.

<LiveCodes config={{markup: {language: 'markdown', content: '# Hello World!'}, script: {language: 'javascript', content: 'console.log("Hello, from JS!");'}, tools: {active: 'console', status: 'open'}}}></LiveCodes>

## Installation

### NPM Package

This is a single npm package that contains the different SDKs (JavaScript/TypeScript, React and Vue).
Install the library from npm:

```sh
npm i livecodes
```

then it can be used like that:

```js title="index.js"
import { createPlayground } from 'livecodes';

createPlayground('#container', { template: 'react' });
```

### CDN

Alternatively, it can just be loaded from a CDN.

ESM:

```html title="index.html"
<div id="container"></div>
<script type="module">
  import { createPlayground } from 'https://cdn.jsdelivr.net/npm/livecodes';

  createPlayground('#container', { template: 'react' });
</script>
```

UMD:

```html title="index.html"
<div id="container"></div>
<script src="https://cdn.jsdelivr.net/npm/livecodes/livecodes.umd.js"></script>
<script>
  // the UMD version provides the global object `livecodes`
  livecodes.createPlayground('#container', { template: 'react' });
</script>
```

:::info

In the full [standalone app](../getting-started.md#hosted-app), the JavaScript SDK is accessible via the global variable `livecodes`, which can be interacted with in the browser console.

:::

## Usage

The SDK is currently provided in the following variations:

### [JavaScript/TypeScript](./js-ts.md)

### [React](./react.md)

### [Vue](./vue.md)

## SDK Playground!

A demo page that shows the usage of the SDK can be [found here](https://live-codes.github.io/livecodes-examples/api-demo.html) ([source](https://github.com/live-codes/livecodes-examples/blob/gh-pages/api-demo.html)).

Or edit the SDK playground in LiveCodes. How meta! :)

<LiveCodes import="id/nqdxpnj6uvg" view="result" height="80vh" showCode={false} />

P.S. You may want to use the "Full Screen" button!
