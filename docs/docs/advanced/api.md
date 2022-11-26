# API

The [library](../getting-started.md#npm-package) provides an API for [embedding](./../features/embeds.md) and communicating with playgrounds.

In the full [standalone app](../getting-started.md#hosted-app), this API is accessible under the global variable `livecodes`, which can be interacted with in the browser console.

## API Demo

A demo page that shows the usage of the API can be [found here](https://live-codes.github.io/livecodes-examples/api-demo.html) ([source](https://github.com/live-codes/livecodes-examples/blob/gh-pages/api-demo.html)).

Or [edit the API demo in LiveCodes](https://livecodes.io/?x=id/y4wxj92fq6j). How meta! :)

## TypeScript Types

TypeScript types are [documented here](../api/modules.md) and can be imported from the library.

```ts
import { createPlayground, EmbedOptions, Playground } from 'livecodes';
```

## `createPlayground`

[`(container: string | Element, options?: EmbedOptions) => Promise<Playground>`](../api/modules.md#createplayground)

The library exports the function `createPlayground` which takes 2 arguments:

- `container` (required): HTMLElement or a string representing a CSS selector.
- `options` (optional): an object with embed options ([EmbedOptions](../api/interfaces/EmbedOptions.md)).

The `createPlayground` function return a promise which resolves to an object that exposes the API methods ([Playground](../api/interfaces/Playground.md)).

```ts
import { createPlayground, EmbedOptions } from 'livecodes';

const options: EmbedOptions = {
  // appUrl: ...
  // config: ...
  // import: ...
  // lite: ...
  // loading: ...
  // template: ...
  // view: ...
};

createPlayground('#container', options).then((playground) => {
  // `playground` object exposes the API methods
  // e.g. playground.run()
});
```

## Embed Options

The secong argument of the `createPlayground` function is an optional object with the following optional properties ([EmbedOptions](../api/interfaces/EmbedOptions.md)):

### `appUrl`

[`string`](../api/interfaces/EmbedOptions#appurl)

Default: `"https://livecodes.io/"`

Allows the library to load the playground from a custom URL (e.g. [hosted app](../getting-started.md#hosted-app)).

### `config`

[`string | Partial<Config>`](../api/interfaces/EmbedOptions#config)

Default: `{}`

A [configuration object](../configuration/configuration-object.md) or a URL to a JSON file representing a configuration object to load.

### `import`

[`string`](../api/interfaces/EmbedOptions#import)

A URL to [import](../features/import.md).

### `lite`

[`boolean`](../api/interfaces/EmbedOptions#lite)

Default: `false`

If `true`, the playground is loaded in [lite mode](../features/lite.md).

### `loading`

[`"eager" | "lazy" | "click"`](../api/interfaces/EmbedOptions#loading)

Default: `"lazy"`

"eager": The playground loads immediately.

"lazy": A playground embedded low down in the page will not load until the user scrolls so that it approaches the viewport.

"click": The playground does not load automatically. Instead, a "Click-to-load" screen is shown.

### `template`

[`string`](../api/interfaces/EmbedOptions#template)

A [starter template](../features/templates.md) to load.

### `view`

[`"editor" | "result" | "editor,result"`](../api/interfaces/EmbedOptions#view)

Default: `"editor,result"`

The [default view](../features/default-view.md) for the playground.

## API Methods

([`Playground`](../api/interfaces/Playground.md))

### `load`

[`() => Promise<void>`](../api/interfaces/Playground.md#load)

When the embed option `loading` is set to `click`, the playground is not loaded automatically. Instead, a screen is shown with "Click to load" button.
Calling the API method `load()` allows loading the playground.

If the playground was not loaded, calling any other method will load the playground first before executing.

```js
import { createPlayground } from 'livecodes';

createPlayground('#container').then(async (playground) => {
  await playground.load();
  // playground loaded
});
```

### `run`

[`() => Promise<void>`](../api/interfaces/Playground.md#run)

Runs the [result page](../features/result.md) (after any required compilation for code).

```js
import { createPlayground } from 'livecodes';

createPlayground('#container').then(async (playground) => {
  await playground.run();
  // new result page is displayed
});
```

### `format`

[`(allEditors?: boolean) => Promise<void>`](../api/interfaces/Playground.md#format)

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

[`(shortUrl?: boolean) => Promise<string>`](../api/interfaces/Playground.md#getshareurl)

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

[`(contentOnly?: boolean) => Promise<Config>`](../api/interfaces/Playground.md#getconfig)

Gets a config object representing the playground state. This can be used to restore state if passed as [embed option](#createplayground) property on creating playground, or can be manipulated and loaded in run-time using [`setConfig`](#setconfig) method.

```js
import { createPlayground } from 'livecodes';

createPlayground('#container').then(async (playground) => {
  const config = await playground.getConfig();
});
```

### `setConfig`

[`(config: Partial<Config>) => Promise<Config>`](../api/interfaces/Playground.md#setconfig)

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

[`() => Promise<Code>`](../api/interfaces/Playground.md#getcode)

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

[`(panel: EditorId | Lowercase<Tool['title']> | 'result', options?: { full?: boolean; line?: number; column?: number }) => Promise<void>`](../api/interfaces/Playground.md#show)

Shows the selected panel, which is either:

- Editor: `markup`, `style` or `script`
- Tool: `console`, `compiled` or `tests`
- Result page: `result`

The second optional argument is an object. It may have the boolean property `full`, which If `true`, selected editor or result page will take the full vertical and horizontal space of the playground, while tools will take the full vertical and half the horizontal space, leaving some space for the active editor.
The optional properties `line` and `column` allow scrolling to line/column number in the shown editor.

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
  await playground.show('console', { full: true });
});
```

### `runTests`

[`() => Promise<{ results: TestResult[] }>`](../api/interfaces/Playground.md#runtests)

Runs project [tests](./../features/tests.md) (if present) and gets test results.

```js
import { createPlayground } from 'livecodes';

createPlayground('#container').then(async (playground) => {
  const { results } = await playground.runTests();
});
```

### `onChange`

[`(fn: ChangeHandler) => { remove: () => void }`](../api/interfaces/Playground.md#onchange)

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

[`(command: APICommands, ...args: any[]) => Promise<{ output: any } | { error: string }>`](../api/interfaces/Playground.md#exec)

Execute custom commands, including:

- `"setBroadcastToken"`: Sets [broadcast `userToken`](../features/broadcast.md#technical-details).

```js
// in browser console of full app (e.g. https://livecodes.io)
await livecodes.exec('setBroadcastToken', 'my-token');
```

- `"showVersion"`: Logs current LiveCodes version and commitSHA in the browser console.

```js
// in browser console of full app (e.g. https://livecodes.io)
await livecodes.exec('showVersion');
```

### `destroy`

[`() => Promise<void>`](../api/interfaces/Playground.md#destroy)

Destoys the playground instance, and removes event listeners. Further call to any API methods throws an error.

```js
import { createPlayground } from 'livecodes';

createPlayground('#container').then(async (playground) => {
  await playground.destroy();
  // playground destroyed
  // any further API call throws an error
});
```
