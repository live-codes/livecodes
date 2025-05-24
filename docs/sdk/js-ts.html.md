# JavaScript/<wbr />TypeScript SDK

import LiveCodes from '../../src/components/LiveCodes.tsx';
import RunInLiveCodes from '../../src/components/RunInLiveCodes.tsx';

This is the core SDK on which others ([React](react.html.md), [Vue](vue.html.md), and [Svelte](svelte.html.md) SDKs) are build on top. It is a light-weight ([less than 5kb gzipped](https://bundlephobia.com/package/livecodes)), zero-dependencies library that allows creating, embedding and communication with LiveCodes playgrounds. It also allows easily creating links to playgrounds.

## Installation

Please refer to the [SDK installation](./index.html.md)#installation) section.

:::info

In the full [standalone app](../getting-started.html.md)#standalone-app), the JavaScript SDK is accessible via the global variable `livecodes`, which can be interacted with in the browser console.

:::

## TypeScript Types

TypeScript types are [documented here](../api/globals.md) and can be imported from the library.

```ts
import type { EmbedOptions, Playground } from 'livecodes';
```

The following 2 functions are exported by the library:

## `createPlayground`

Type: [`(container: string | Element, options?: EmbedOptions) => Promise<Playground>`](../api/functions/createPlayground.md)

The library exports the function `createPlayground` which has 2 parameters:

- `container` (required): `HTMLElement` or a string representing a CSS selector. This is the container where the playground is rendered.
  If not found, an error is thrown (except in [headless mode](./headless.html.md), in which this parameter is optional and can be omitted).
- `options` (optional): an object with embed options ([EmbedOptions](../api/interfaces/EmbedOptions.md)).

The `createPlayground` function returns a promise which resolves to an object that exposes the SDK methods ([Playground](../api/interfaces/Playground.md)).

```ts
import { createPlayground, type EmbedOptions } from 'livecodes';

const options: EmbedOptions = {
  // appUrl: ...
  // config: ...
  // headless: ...
  // import: ...
  // loading: ...
  // params: ...
  // template: ...
};

createPlayground('#container', options).then((playground) => {
  // the `playground` object exposes the SDK methods
  // e.g. playground.run()
});
```

:::caution Throws

The `createPlayground` function throws an error (promise is rejected) in any of the following conditions:

- The first parameter ([`container`](#createplayground)) is not an element or not found (by CSS selector), except in [headless mode](./headless.html.md).
- The embed option [`appUrl`](#appurl) is supplied and is not a valid URL.
- The embed option [`config`](#config) is supplied and is not an object or a valid URL.
- Any of the [SDK methods](#sdk-methods) was called after calling the [`destroy`](#destroy) method.

:::

### Multiple Sources

When multiple sources are provided in the [embed options](#embed-options), each is converted to a [configuration object](../configuration/configuration-object.html.md) and the properties are merged.
In case there are conflicts between the properties of the configurations, they are overridden in the following order:
- [`template`](#template) (lowest precedence)
- [`import`](#import)
- [`config`](#config)
- [`params`](#params) (highest precedence)

## `getPlaygroundUrl`

Type: [`(options?: EmbedOptions) => string`](../api/functions/getPlaygroundUrl.md)

Gets the URL to playground (as a string) from the provided [options](#embed-options). This can be useful for providing links to run code in playgrounds.

Example:

```html
<pre><code class="language-markdown"># Hello World!</code></pre>
<a href="#" id="playground-link" target="_blank">Open in playground</a>
<script type="module">
  // highlight-next-line
  import { getPlaygroundUrl } from 'livecodes';
  const config = {
    markup: {
      language: 'markdown',
      content: '# Hello World!',
    },
  };
  // highlight-next-line
  const url = getPlaygroundUrl({ config });
  document.querySelector('#playground-link').href = url;
</script>
```

export const getPlaygroundUrlDemo = {
  html: `<pre><code\nclass="language-markdown"># Hello World!</code></pre>\n<a href="#" id="playground-link" target="_blank">Open in playground</a>\n<script type="module">\n  import { getPlaygroundUrl } from 'livecodes';\n  const config = {\n    markup: {\n      language: 'markdown',\n      content: '# Hello World!',\n    },\n  };\n  const url = getPlaygroundUrl({ config });\n  document.querySelector('#playground-link').href = url;\n</script>`,
};

<RunInLiveCodes params={getPlaygroundUrlDemo} />

## Embed Options

Type: [`EmbedOptions`](../api/interfaces/EmbedOptions.md)

The [`createPlayground`](#createplayground) and [`getPlaygroundUrl`](#getplaygroundurl) functions accept an optional object that allows providing different options to the playground. This object can have the following optional properties:

### `appUrl`

Type: [`string`](../api/interfaces/EmbedOptions.md#appurl)

Default: `"https://livecodes.io/"`

Allows loading the playground from a custom URL (e.g. a [self-hosted app](../features/self-hosting.html.md) or a [permanent URL](../features/permanent-url.html.md)).

If supplied with an invalid URL, an error is thrown.

### `config`

Type: [`string | Partial<Config>`](../api/interfaces/EmbedOptions.md#config)

Default: `{}`

A [configuration object](../configuration/configuration-object.html.md) or a URL to a JSON file representing a configuration object to load.

If supplied and is not an object or a valid URL, an error is thrown.

### `headless`

Type: [`boolean`](../api/interfaces/EmbedOptions.md#headless)

Default: `false`

When set to `true`, the playground is loaded in [headless mode](./headless.html.md).

### `import`

Type: [`string`](../api/interfaces/EmbedOptions.md#import)

A resource to [import](../features/import.html.md) (from any of the supported [sources](../features/import.html.md)#sources)).

### `loading`

Type: [`"eager" | "lazy" | "click"`](../api/interfaces/EmbedOptions.md#loading)

Default: `"lazy"`

Sets how the playground loads:

- `"eager"`: The playground loads immediately.
- `"lazy"`: A playground embedded low down in the page will not load until the user scrolls so that it approaches the viewport.
- `"click"`: The playground does not load automatically. Instead, a "Click-to-load" screen is shown.

### `params`

Type: [`UrlQueryParams`](../api/interfaces/EmbedOptions.md#params)

An object that represents [URL Query parameters](../configuration/query-params.html.md), that can be used to configure the playground.

These 2 snippets produce similar output:

```js
import { createPlayground } from 'livecodes';

// use config
createPlayground('#container', {
  config: {
    markup: {
      language: 'markdown',
      content: '# Hello World!',
    },
  },
});

// use params
createPlayground('#container', { params: { md: '# Hello World!' } });
```

### `template`

Type: [`TemplateName`](../api/interfaces/EmbedOptions.md#template)

A [starter template](../features/templates.html.md) to load. Allowed valued can be found [here](../api/interfaces/EmbedOptions.md#template).

## SDK Methods

The [`createPlayground`](#createplayground) function returns a promise which resolves to an object ([`Playground`](../api/interfaces/Playground.md)) that exposes some useful SDK methods that can be used to interact with the playground. These methods include:

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

Runs the [result page](../features/result.html.md) (after any required compilation for code).

```js
import { createPlayground } from 'livecodes';

createPlayground('#container').then(async (playground) => {
  await playground.run();
  // new result page is displayed
});
```

### `format`

Type: [`(allEditors?: boolean) => Promise<void>`](../api/interfaces/Playground.md#format)

[Formats the code](../features/code-format.html.md).

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

Gets a [share url](../features/share.html.md) for the current project.

By default, the url has a long query string representing the compressed encoded config object. If the argument `shortUrl` was set to `true`, a short url is generated.

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

  // source code, language and compiled code for the script editor
  const { content, language, compiled } = code.script;

  // result page HTML
  const result = code.result;
});
```

### `show`

Type: [`(panel: 'editor' | 'markup' | 'style' | 'script' | 'console' | 'compiled' | 'tests' | 'result' | 'toggle-result', options?: { full?: boolean; line?: number; column?: number; zoom?: 1 | 0.5 | 0.25 }) => Promise<void>`](../api/interfaces/Playground.md#show)

Shows the selected panel, which is either:

- Active Editor: `editor`
- Specific Editor: `markup`, `style` or `script`
- Tool: `console`, `compiled` or `tests`
- Result page: `result` or `toggle-result`

The second optional argument is an object:

- It may have the boolean property `full`, which If `true`, selected editor or result page will take the full vertical and horizontal space of the playground, while tools will take the full vertical and half the horizontal space, leaving some space for the active editor.

- The optional properties `line` and `column` allow scrolling to line/column number in the shown editor.

- The optional property `zoom` sets the result page [zoom level](../features/result.html.md)#result-page-zoom) (the selected panel must be `result`).

```js
import { createPlayground } from 'livecodes';

createPlayground('#container').then(async (playground) => {
  const delay = (duration) =>
    new Promise((resolve) => {
      setTimeout(resolve, duration);
    });

  await playground.show('toggle-result');
  await delay(2000);
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

Runs project [tests](./../features/tests.html.md) (if present) and gets test results.

```js
import { createPlayground } from 'livecodes';

createPlayground('#container').then(async (playground) => {
  const { results } = await playground.runTests();
});
```

### `watch`

Type: [docs](../api/interfaces/Playground.md#watch)

```ts
((event: 'load', fn: () => void) => { remove: () => void }) &
((event: 'ready', fn: (data: { config: Config }) => void) => { remove: () => void }) &
((event: 'code', fn: (data: { code: Code; config: Config }) => void) => { remove: () => void }) &
((event: 'console', fn: (data: { method: string; args: any[] }) => void) => { remove: () => void }) &
((event: 'tests', fn: (data: { results: TestResult[]; error?: string }) => void) => { remove: () => void }) &
((event: 'destroy', fn: () => void) => { remove: () => void });
```

Allows to watch for various playground events. It takes 2 arguments: event name and a callback function that will be called on every event.

In some events, the callback function will be called with an object that supplies relevant data to the callback function (e.g. code, console output, test results).

The `watch` method returns an object with a single method `remove`, which when called will remove the callback from watching further events.

```js
import { createPlayground } from 'livecodes';

createPlayground('#container').then((playground) => {
  const codeWatcher = playground.watch('code', ({ code, config }) => {
    // this will run on every code change
    console.log('code:', code);
    console.log('config:', config);
  });

  const consoleWatcher = playground.watch('console', ({ method, args }) => {
    // this will run on every console output
    console[method](...args);
  });

  const testsWatcher = playground.watch('tests', ({ results }) => {
    // this will run when tests run
    results.forEach((testResult) => {
      console.log('status:', testResult.status); // "pass", "fail" or "skip"
      console.log(testResult.errors); // array of errors as strings
    });
  });

  // then later
  codeWatcher.remove();
  consoleWatcher.remove();
  testsWatcher.remove();
  // events are no longer watched
});
```

These are the events that can be watched and the description of their callback functions:

- `"load"`: Called when the playground first loads.

  ```ts
  (
    event: "load",
    fn: () => void
  ) => { remove: () => void }
  ```

- `"ready"`: Called when a new project is loaded (including when [imported](../features/import.html.md)) and the playground is ready to run.

  ```ts
  (
    event: "ready",
    fn: (data: { config: Config }) => void
  ) => { remove: () => void }
  ```

- `"code"`: Called when the playground "content" is changed (see [`getCode`](./js-ts.html.md)#getcode) and [`getConfig`](./js-ts.html.md)#getconfig)).

  This includes changes in:

  - Code (in editors)
  - Editor languages
  - [CSS processors](../features/css.html.md)#css-processors)
  - [External resources](../features/external-resources.html.md)
  - Project info (e.g. allows adding content in page head and attributes to `<html>` element)
  - [Custom settings](../advanced/custom-settings.html.md) (e.g. allows changing [import maps](../features/module-resolution.html.md)#custom-module-resolution))
  - Project title
  - [Test](../features/tests.html.md) code

  ```ts
  (
    event: "code",
    fn: (data: { code: Code; config: Config }) => void
  ) => { remove: () => void }
  ```

- `"console"`: Called when the playground console gets new outputs. The callback method is passed an object with 2 properties: `"method"` (e.g. `"log"`, `"error"`, etc.) and `"args"` (the arguments passed to the method, as an array).

  ```ts
  (
    event: "console",
    fn: (data: { method: string; args: any[] }) => void
  ) => { remove: () => void }
  ```

- `"tests"`: Called when tests run and test results are available (see [`runTests`](./js-ts.html.md)#runtests)).

  ```ts
  (
    event: "tests",
    fn: (data: { results: TestResult[]; error?: string }) => void
  ) => { remove: () => void }
  ```

- `"destroy"`: Called when the playground is destroyed.
  ```ts
  (
    event: "destroy",
    fn: () => void
  ) => { remove: () => void }
  ```

### `onChange`

**Deprecated**: Use [`watch`](#watch) method instead.

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

- `"setBroadcastToken"`: Sets [broadcast `userToken`](../features/broadcast.html.md)#technical-details).

```js
// in browser console of full app (e.g. https://livecodes.io)
await livecodes.exec('setBroadcastToken', 'my-token');
```

- `"showVersion"`: Logs the current LiveCodes app version, SDK version, git commit SHA, [permanent app URL](../features/permanent-url.html.md) and SDK URL in the browser console.

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
  js: `import { createPlayground } from "livecodes";\n\nconst params = {\n  html: "<h1>Hello World!</h1>",\n  css: "h1 {color: blue;}",\n  js: 'console.log("Hello, LiveCodes!")',\n  console: "open",\n};\n\ncreatePlayground('#container', { params });\n`,
  html: '<div id="container"></div>',
};

<LiveCodes params={sdkDemo} height="80vh" />

## Related

- [React SDK](./react.html.md)
- [Vue SDK](./vue.html.md)
- [Using SDK in Svelte](./svelte.html.md)
- [Embedded Playgrounds](../features/embeds.html.md)