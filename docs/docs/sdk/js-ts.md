---
title: JS/TS SDK
---

# JavaScript/<wbr />TypeScript SDK

import LiveCodes from '../../src/components/LiveCodes.tsx'

This is the core SDK on which others ([React](react.md), [Vue](vue.md), and [Svelte](svelte.md) SDKs) are build on top. It is a lightweight library (less than 3kb gzipped) that allows creating, embedding and communication with LiveCodes playgrounds.

## Installation

Please refer to the [SDK installation](./index.md#installation) section.

:::info

In the full [standalone app](../getting-started.md#standalone-app), the JavaScript SDK is accessible via the global variable `livecodes`, which can be interacted with in the browser console.

:::

## TypeScript Types

TypeScript types are [documented here](../api/modules.md) and can be imported from the library.

```ts
import type { EmbedOptions, Playground } from 'livecodes';
```

## `createPlayground`

Type: [`(container: string | Element, options?: EmbedOptions) => Promise<Playground>`](../api/modules.md#createplayground)

The library exports the function `createPlayground` which takes 2 arguments:

- `container` (required): `HTMLElement` or a string representing a CSS selector.  
  If not found, an error is thrown.
- `options` (optional): an object with embed options ([EmbedOptions](../api/interfaces/EmbedOptions.md)).

The `createPlayground` function returns a promise which resolves to an object that exposes the SDK methods ([Playground](../api/interfaces/Playground.md)).

```ts
import { createPlayground, type EmbedOptions } from 'livecodes';

const options: EmbedOptions = {
  // appUrl: ...
  // config: ...
  // import: ...
  // lite: ...
  // loading: ...
  // params: ...
  // template: ...
  // view: ...
};

createPlayground('#container', options).then((playground) => {
  // the `playground` object exposes the SDK methods
  // e.g. playground.run()
});
```

:::caution Throws

The `createPlayground` function throws an error in any of the following conditions:

- The first parameter ([`container`](#createplayground)) is not an element or not found (by CSS selector).
- The embed option [`appUrl`](#appurl) is supplied and is not a valid URL.
- The embed option [`config`](#config) is supplied and is not an object or a valid URL.
- Any of the [SDK methods](#sdk-methods) was called after calling the [`destroy`](#destroy) method.

:::

## Embed Options

Type: [`EmbedOptions`](../api/interfaces/EmbedOptions.md)

The second argument of the `createPlayground` function is an optional object with the following optional properties:

### `appUrl`

Type: [`string`](../api/interfaces/EmbedOptions.md#appurl)

Default: `"https://livecodes.io/"`

Allows the library to load the playground from a custom URL (e.g. [self-hosted app](../features/self-hosting.md), [permanent URL](../features/permanent-url.md)).

If supplied with an invalid URL, an error is thrown.

### `config`

Type: [`string | Partial<Config>`](../api/interfaces/EmbedOptions.md#config)

Default: `{}`

A [configuration object](../configuration/configuration-object.md) or a URL to a JSON file representing a configuration object to load.

If supplied and is not an object or a valid URL, an error is thrown.

### `import`

Type: [`string`](../api/interfaces/EmbedOptions.md#import)

A resource to [import](../features/import.md) (from any of the supported [sources](../features/import.md#sources)).

### `lite`

Type: [`boolean`](../api/interfaces/EmbedOptions.md#lite)

Default: `false`

If `true`, the playground is loaded in [lite mode](../features/lite.md).

When [headless](../features/headless.md), the playground is loaded in [lite mode](../features/lite.md) by default unless the `lite` option is set to `false`.

### `loading`

Type: [`"eager" | "lazy" | "click"`](../api/interfaces/EmbedOptions.md#loading)

Default: `"lazy"`

"eager": The playground loads immediately.

"lazy": A playground embedded low down in the page will not load until the user scrolls so that it approaches the viewport.

"click": The playground does not load automatically. Instead, a "Click-to-load" screen is shown.

### `params`

Type: [`UrlQueryParams`](../api/interfaces/EmbedOptions.md#params)

An object that represents [URL Query parameters](../configuration/query-params.md).

These 2 snippets produce similar output:

```js
import { createPlayground } from 'livecodes';

// use config
createPlayground('#container1', {
  config: {
    markup: {
      language: 'markdown',
      content: '# Hello World!',
    },
  },
});

// use params
createPlayground('#container2', { params: { md: '# Hello World!' } });
```

### `template`

Type: [`TemplateName`](../api/interfaces/EmbedOptions.md#template)

A [starter template](../features/templates.md) to load.

### `view`

Type: [`"editor" | "result" | "split" | "headless"`](../api/interfaces/EmbedOptions.md#view)

Default: `"split"`

The [default view](../features/default-view.md) for the playground.

When set to `"headless"`, the playground is loaded in [headless mode](../features/headless.md).

## SDK Methods

Type: ([`Playground`](../api/interfaces/Playground.md))

### `load`

Type: [`() => Promise<void>`](../api/interfaces/Playground.md#load)

When the embed option `loading` is set to `click`, the playground is not loaded automatically. Instead, a screen is shown with "Click to load" button.
Calling the SDK method `load()` allows loading the playground.

If the playground was not loaded, calling any other method will load the playground first before executing.

```js
import { createPlayground } from 'livecodes';

createPlayground('#container').then(async (playground) => {
  await playground.load();
  // playground loaded
});
```

### `run`

Type: [`() => Promise<void>`](../api/interfaces/Playground.md#run)

Runs the [result page](../features/result.md) (after any required compilation for code).

```js
import { createPlayground } from 'livecodes';

createPlayground('#container').then(async (playground) => {
  await playground.run();
  // new result page is displayed
});
```

### `format`

Type: [`(allEditors?: boolean) => Promise<void>`](../api/interfaces/Playground.md#format)

[Formats the code](../features/code-format.md).

By default, the code in all editors (markup, style and script) is formatted.
If you wish to format only the active editor, pass the value `false` as an argument.

```js
import { createPlayground } from 'livecodes';

createPlayground('#container').then(async (playground) => {
  await playground.format();
  // code in editors is formatted
});
```

### `getShareUrl`

Type: [`(shortUrl?: boolean) => Promise<string>`](../api/interfaces/Playground.md#getshareurl)

Gets a [share url](../features/share.md).

By default, the url is has a long query string representing the compressed config object. If the argument `shortUrl` was set to `true`, a short url is generated.

```js
import { createPlayground } from 'livecodes';

createPlayground('#container').then(async (playground) => {
  const longUrl = await playground.getShareUrl();
  const shortUrl = await playground.getShareUrl(true);
});
```

### `getConfig`

Type: [`(contentOnly?: boolean) => Promise<Config>`](../api/interfaces/Playground.md#getconfig)

Gets a config object representing the playground state. This can be used to restore state if passed as [embed option](#createplayground) property on creating playground, or can be manipulated and loaded in run-time using [`setConfig`](#setconfig) method.

```js
import { createPlayground } from 'livecodes';

createPlayground('#container').then(async (playground) => {
  const config = await playground.getConfig();
});
```

### `setConfig`

Type: [`(config: Partial<Config>) => Promise<Config>`](../api/interfaces/Playground.md#setconfig)

Loads a new project using the passed configuration object.

```js
import { createPlayground } from 'livecodes';

createPlayground('#container').then(async (playground) => {
  const config = {
    markup: {
      language: 'html',
      content: 'Hello World!',
    },
  };
  const newConfig = await playground.setConfig(config);
  // new project loaded
});
```

### `getCode`

Type: [`() => Promise<Code>`](../api/interfaces/Playground.md#getcode)

Gets the playground code (including source code, source language and compiled code) for each editor (`markup`, `style`, `script`), in addition to result page HTML.

```js
import { createPlayground } from 'livecodes';

createPlayground('#container').then(async (playground) => {
  const code = await playground.getCode();

  // source code, language and compiled code are available
  const { content, language, compiled } = code.script;

  // result page HTML
  const result = code.result;
});
```

### `show`

Type: [`(panel: EditorId | Lowercase<Tool['title']> | 'result', options?: { full?: boolean; line?: number; column?: number; zoom?: 1 | 0.5 | 0.25 }) => Promise<void>`](../api/interfaces/Playground.md#show)

Shows the selected panel, which is either:

- Editor: `markup`, `style` or `script`
- Tool: `console`, `compiled` or `tests`
- Result page: `result`

The second optional argument is an object:

- It may have the boolean property `full`, which If `true`, selected editor or result page will take the full vertical and horizontal space of the playground, while tools will take the full vertical and half the horizontal space, leaving some space for the active editor.

- The optional properties `line` and `column` allow scrolling to line/column number in the shown editor.

- The optional property `zoom` sets the result page [zoom level](../features/result.md#result-page-zoom) (the selected panel must be `result`).

```js
import { createPlayground } from 'livecodes';

createPlayground('#container').then(async (playground) => {
  const delay = (duration) =>
    new Promise((resolve) => {
      setTimeout(resolve, duration);
    });

  await playground.show('style');
  await delay(2000);
  await playground.show('result', { full: true });
  await delay(2000);
  await playground.show('script');
  await delay(2000);
  await playground.show('result', { zoom: 0.5 });
  await delay(2000);
  await playground.show('console', { full: true });
});
```

### `runTests`

Type: [`() => Promise<{ results: TestResult[] }>`](../api/interfaces/Playground.md#runtests)

Runs project [tests](./../features/tests.md) (if present) and gets test results.

```js
import { createPlayground } from 'livecodes';

createPlayground('#container').then(async (playground) => {
  const { results } = await playground.runTests();
});
```

### `onChange`

Type: [`(fn: ChangeHandler) => { remove: () => void }`](../api/interfaces/Playground.md#onchange)

Allows to watch the playground for changes. It takes a callback function that will be called on every change.

The callback function will be called with an object that has 2 properties: `code` and `config`, representing the current codes and configuration objects (see [`getCode`](#getcode) and [`getConfig`](#getconfig)).

The `onChange` method returns an object with a single method `remove`, which when called will remove the callback from watching changes.

```js
import { createPlayground } from 'livecodes';

createPlayground('#container').then((playground) => {
  const watcher = playground.onChange(({ code, config }) => {
    // this will run on every code change
    console.log('code:', code);
    console.log('config:', config);
  });

  // then later
  watcher.remove();
  // changes are no longer watched
});
```

### `exec`

Type: [`(command: APICommands, ...args: any[]) => Promise<{ output: any } | { error: string }>`](../api/interfaces/Playground.md#exec)

Execute custom commands, including:

- `"setBroadcastToken"`: Sets [broadcast `userToken`](../features/broadcast.md#technical-details).

```js
// in browser console of full app (e.g. https://livecodes.io)
await livecodes.exec('setBroadcastToken', 'my-token');
```

- `"showVersion"`: Logs the current LiveCodes app version, SDK version, git commit SHA, [permanent app URL](../features/permanent-url.md) and SDK URL in the browser console.

```js
// in browser console of full app (e.g. https://livecodes.io)
await livecodes.exec('showVersion');
```

### `destroy`

Type: [`() => Promise<void>`](../api/interfaces/Playground.md#destroy)

Destroys the playground instance, and removes event listeners. Further call to any SDK methods throws an error.

```js
import { createPlayground } from 'livecodes';

createPlayground('#container').then(async (playground) => {
  await playground.destroy();
  // playground destroyed
  // any further SDK call throws an error
});
```

## Styles

### Default Styles

By default, the container element is styled when the SDK is initialized (including width, height, border, etc.). To disable default styles, set the container element attribute `data-default-styles` to `"false"` before initializing.

Example:

```html
<div id="container" data-default-styles="false" class="custom"></div>
<script type="module">
  import { createPlayground } from 'livecodes';
  createPlayground('#container');
</script>
```

### Height

By default, the playground container height is set to `"300px"`. To change the height, either disable the default styles and override them, or simply set the `data-height` attribute to a number (in pixels) or any valid CSS value (e.g. `"100%"` to take the full height of its parent element).

Example:

```html
<div id="container" data-height="500"></div>
<script type="module">
  import { createPlayground } from 'livecodes';
  createPlayground('#container');
</script>
```

## Demo

export const sdkDemo = {
js: `import { createPlayground } from "livecodes";\n\nconst params = {\n  html: "<h1>Hello World!</h1>",\n  css: "h1 {color: blue;}",\n  js: 'console.log("Hello, Svelte!")',\n  console: "open",\n};\n\ncreatePlayground('#container', { params });\n`,
html: '<div id="container"></div>',
}

<LiveCodes params={sdkDemo} height="80vh" />

## Related

- [React SDK](./react.md)
- [Vue SDK](./vue.md)
- [Using SDK in Svelte](./svelte.md)
- [Embedded Playgrounds](../features/embeds.md)
