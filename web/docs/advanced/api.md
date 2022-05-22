# API

The [library](../getting-started.md#npm-package) provides an API that the embedding page can use to communicate with the embedded playground.

## API Demo

A demo page that shows the usage of the API can be [found here](https://live-codes.github.io/livecodes-examples/api-demo.html) ([source](https://github.com/live-codes/livecodes-examples/blob/gh-pages/api-demo.html)).

Or [edit the API demo in LiveCodes](https://livecodes.io/?x=id/sxyzszjn3fb), à la [Inception](https://en.wikipedia.org/wiki/Inception) :)

## `createPlayground`

The library exports the function `createPlayground` which takes 2 arguments:

- `container`: (required) HTMLElement or a CSS selector of an element
- `options`: (optional) an object with embed options

The `createPlayground` function return a promise which resolves to an object that exposes the API methods.

```ts
import { createPlayground, EmbedOptions } from '@live-codes/livecodes';

const options: EmbedOptions = {
  // appUrl: ...
  // config: ...
  // importUrl: ...
  // loading: ...
  // template: ...
};

createPlayground('#container', options).then((playground) => {
  // `playground` object exposes the API methods
  // e.g. playground.run()
});
```

:::tip

The TypeScript types are [documented here](https://livecodes.io/api-docs/lib/modules.html).

:::

## API Methods

### `load`

`() => Promise<void>`

When the embed option `loading` is set to `click`, the playground is not loaded automatically. Instead, a screen is shown with "Click to load" button.
Calling the API method `load()` allows loading the playground.

If the playground was not loaded, calling any other method will load the playground first before executing.

```js
import { createPlayground } from '@live-codes/livecodes';

createPlayground('#container').then(async (playground) => {
  await playground.load();
  // playground loaded
});
```

### `run`

`() => Promise<void>`

Runs the [result page](../features/result.md) (after any required compilation for code).

```js
import { createPlayground } from '@live-codes/livecodes';

createPlayground('#container').then(async (playground) => {
  await playground.run();
  // new result page is displayed
});
```

### `format`

`(allEditors?: boolean) => Promise<void>`

[Formats the code](../features/code-format.md).

By default, the code in all editors (markup, style and script) is formatted.
If you wish to format only the active editor, pass the value `false` as an argument.

```js
import { createPlayground } from '@live-codes/livecodes';

createPlayground('#container').then(async (playground) => {
  await playground.format();
  // code in editors is formatted
});
```

### `getShareUrl`

`(shortUrl?: boolean) => Promise<string>`

Gets a [share url](../features/share.md).

By default, the url is has a long query string representing the compressed config object. If the argument `shortUrl` was set to `true`, a short url is generated.

```js
import { createPlayground } from '@live-codes/livecodes';

createPlayground('#container').then(async (playground) => {
  const longUrl = await playground.getShareUrl();
  const shortUrl = await playground.getShareUrl(true);
});
```

### `getConfig`

`(contentOnly?: boolean) => Promise<Config>`

Gets a config object representing the playground state. This can be used to restore state if passed as [embed option](#createplayground) property on creating playground, or can be manipulated and loaded in run-time using [`setConfig`](#setconfig) method.

```js
import { createPlayground } from '@live-codes/livecodes';

createPlayground('#container').then(async (playground) => {
  const config = await playground.getConfig();
});
```

### `setConfig`

`(config: Partial<Config>) => Promise<Config>`

Loads a new project using the passed configuration object.

```js
import { createPlayground } from '@live-codes/livecodes';

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

`() => Promise<Code>`

Gets the playground code (including source code, source language and compiled code) for each editor (`markup`, `style`, `script`), in addition to result page HTML.

```js
import { createPlayground } from '@live-codes/livecodes';

createPlayground('#container').then(async (playground) => {
  const code = await playground.getCode();

  // source code, language and compiled code are available
  const { content, language, compiled } = code.script;

  // result page HTML
  const result = code.result;
});
```

### `show`

`(panel: EditorId | Lowercase<Tool['title']> | 'result', options: { full?: boolean }) => Promise<void>`

Shows the selected panel, which is either:

- Editor: `markup`, `style` or `script`
- Tool: `console`, `compiled` or `tests`
- Result page: `result`

The second optional argument is an object that may have the boolean property `full`. If `true`, selected editor or result page will take the full vertical and horizontal space of the playground, while tools will take the full vertical and half the horizontal space,leaving some space for the active editor.

```js
import { createPlayground } from '@live-codes/livecodes';

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

`() => Promise<{ results: TestResult[] }>`

Runs project [tests](./../features/tests.md) (if present) and gets test results.

```js
import { createPlayground } from '@live-codes/livecodes';

createPlayground('#container').then(async (playground) => {
  const { results } = await playground.runTests();
});
```

### `onChange`

`(fn: ChangeHandler) => { remove: () => void }`

Allows to watch the playground for changes. It takes a callback function that will be called on every change.

The callback function will be called with an object that has 2 properties: `code` and `config`, representing the current codes and configuration objects (see [`getCode`](#getcode) and [`getConfig`](#getconfig)).

The `onChange` method returns an object with a single method `remove`, which when called will remove the callback from watching changes.

```js
import { createPlayground } from '@live-codes/livecodes';

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

### `destroy`

`() => Promise<void>`

Destoys the playground instance, and removes event listeners. Further call to any API methods throws an error.

```js
import { createPlayground } from '@live-codes/livecodes';

createPlayground('#container').then(async (playground) => {
  await playground.destroy();
  // playground destroyed
  // any further API call throws an error
});
```
