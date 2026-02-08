# Interface: API

## Extended by

- [`Playground`](../../interfaces/Playground.md)

## Properties

### destroy()

> **destroy**: () => `Promise`\<`void`\>

Destroys the playground instance, and removes event listeners.

Further call to any SDK methods throws an error.

#### Returns

`Promise`\<`void`\>

#### Example

```ts
import { createPlayground } from "livecodes";

createPlayground("#container").then(async (playground) => {
  await playground.destroy();
  // playground destroyed
  // any further SDK call throws an error
});
```

#### Defined in

[models.ts:211](https://github.com/live-codes/livecodes/blob/61a0396afe9816818482c9e42c3ba23295ad3520/src/sdk/models.ts#L211)

***

### exec()

> **exec**: (`command`, ...`args`) => `Promise`\<`object` \| `object`\>

Executes custom commands, including: `"setBroadcastToken"` and `"showVersion"`.

See [docs](https://livecodes.io/docs/sdk/js-ts#exec) for details.

#### Parameters

• **command**: [`APICommands`](../type-aliases/APICommands.md)

• ...**args**: `any`[]

#### Returns

`Promise`\<`object` \| `object`\>

#### Defined in

[models.ts:194](https://github.com/live-codes/livecodes/blob/61a0396afe9816818482c9e42c3ba23295ad3520/src/sdk/models.ts#L194)

***

### format()

> **format**: (`allEditors`?) => `Promise`\<`void`\>

Formats the code.

By default, the code in all editors (markup, style and script) is formatted.
To format only the active editor, the value `false` should be passed as an argument.

#### Parameters

• **allEditors?**: `boolean`

#### Returns

`Promise`\<`void`\>

#### Example

```ts
import { createPlayground } from "livecodes";

createPlayground("#container").then(async (playground) => {
  await playground.format();
  // code in editors is formatted
});
```

#### Defined in

[models.ts:31](https://github.com/live-codes/livecodes/blob/61a0396afe9816818482c9e42c3ba23295ad3520/src/sdk/models.ts#L31)

***

### getCode()

> **getCode**: () => `Promise`\<[`Code`](../../interfaces/Code.md)\>

Gets the playground code (including source code, source language and compiled code) for each editor (markup, style, script), in addition to result page HTML.

See [Code](https://livecodes.io/docs/api/interfaces/Code) for the structure of the returned object.

#### Returns

`Promise`\<[`Code`](../../interfaces/Code.md)\>

#### Example

```ts
import { createPlayground } from "livecodes";

createPlayground("#container").then(async (playground) => {
  const code = await playground.getCode();

  // source code, language and compiled code for the script editor
  const { content, language, compiled } = code.script;

  // result page HTML
  const result = code.result;
});
```

#### Defined in

[models.ts:105](https://github.com/live-codes/livecodes/blob/61a0396afe9816818482c9e42c3ba23295ad3520/src/sdk/models.ts#L105)

***

### getConfig()

> **getConfig**: (`contentOnly`?) => `Promise`\<[`Config`](../../interfaces/Config.md)\>

Gets a [configuration object](https://livecodes.io/docs/configuration/configuration-object) representing the playground state.

This can be used to restore state if passed as an [EmbedOptions](https://livecodes.io/docs/sdk/js-ts#embed-options) property when [creating playgrounds](https://livecodes.io/docs/sdk/js-ts/#createplayground),
or can be manipulated and loaded in run-time using [`setConfig`](https://livecodes.io/docs/sdk/js-ts#setconfig) method.

#### Parameters

• **contentOnly?**: `boolean`

#### Returns

`Promise`\<[`Config`](../../interfaces/Config.md)\>

#### Example

```ts
import { createPlayground } from "livecodes";

createPlayground("#container").then(async (playground) => {
  const config = await playground.getConfig();
});
```

#### Defined in

[models.ts:64](https://github.com/live-codes/livecodes/blob/61a0396afe9816818482c9e42c3ba23295ad3520/src/sdk/models.ts#L64)

***

### getShareUrl()

> **getShareUrl**: (`shortUrl`?) => `Promise`\<`string`\>

Gets a [share url](https://livecodes.io/docs/features/share) for the current project.

By default, the url has a long query string representing the compressed encoded config object.
If the argument `shortUrl` was set to `true`, a short url is generated.

#### Parameters

• **shortUrl?**: `boolean`

#### Returns

`Promise`\<`string`\>

#### Example

```ts
import { createPlayground } from "livecodes";

createPlayground("#container").then(async (playground) => {
  const longUrl = await playground.getShareUrl();
  const shortUrl = await playground.getShareUrl(true);
});
```

#### Defined in

[models.ts:48](https://github.com/live-codes/livecodes/blob/61a0396afe9816818482c9e42c3ba23295ad3520/src/sdk/models.ts#L48)

***

### ~~onChange()~~

> **onChange**: (`fn`) => `object`

Runs a callback function when code changes.

#### Parameters

• **fn**

#### Returns

`object`

##### ~~remove()~~

> **remove**: () => `void`

###### Returns

`void`

#### Deprecated

Use [`watch`](https://livecodes.io/docs/sdk/js-ts#watch) method instead.

#### Defined in

[models.ts:142](https://github.com/live-codes/livecodes/blob/61a0396afe9816818482c9e42c3ba23295ad3520/src/sdk/models.ts#L142)

***

### run()

> **run**: () => `Promise`\<`void`\>

Runs the [result page](https://livecodes.io/docs/features/result) (after any required compilation for code).

#### Returns

`Promise`\<`void`\>

#### Example

```ts
import { createPlayground } from "livecodes";

createPlayground("#container").then(async (playground) => {
  await playground.run();
  // new result page is displayed
});
```

#### Defined in

[models.ts:14](https://github.com/live-codes/livecodes/blob/61a0396afe9816818482c9e42c3ba23295ad3520/src/sdk/models.ts#L14)

***

### runTests()

> **runTests**: () => `Promise`\<`object`\>

Runs project [tests](https://livecodes.io/docs/features/tests) (if present) and gets test results.

#### Returns

`Promise`\<`object`\>

##### results

> **results**: [`TestResult`](TestResult.md)[]

#### Example

```ts
import { createPlayground } from "livecodes";

createPlayground("#container").then(async (playground) => {
  const { results } = await playground.runTests();
});
```

#### Defined in

[models.ts:135](https://github.com/live-codes/livecodes/blob/61a0396afe9816818482c9e42c3ba23295ad3520/src/sdk/models.ts#L135)

***

### setConfig()

> **setConfig**: (`config`) => `Promise`\<[`Config`](../../interfaces/Config.md)\>

Loads a new project using the passed configuration object.

#### Parameters

• **config**: `Partial`\<[`Config`](../../interfaces/Config.md)\>

#### Returns

`Promise`\<[`Config`](../../interfaces/Config.md)\>

#### Example

```ts
import { createPlayground } from "livecodes";

createPlayground("#container").then(async (playground) => {
  const config = {
    markup: {
      language: "html",
      content: "Hello World!",
    },
  };
  const newConfig = await playground.setConfig(config);
  // new project loaded
});
```

#### Defined in

[models.ts:84](https://github.com/live-codes/livecodes/blob/61a0396afe9816818482c9e42c3ba23295ad3520/src/sdk/models.ts#L84)

***

### show()

> **show**: (`panel`, `options`?) => `Promise`\<`void`\>

Shows the selected panel.

See [docs](https://livecodes.io/docs/sdk/js-ts#show) for details.

#### Parameters

• **panel**: `"editor"` \| `"result"` \| [`EditorId`](../type-aliases/EditorId.md) \| `"console"` \| `"compiled"` \| `"tests"` \| `"toggle-result"`

• **options?**

• **options.column?**: `number`

• **options.full?**: `boolean`

• **options.line?**: `number`

• **options.zoom?**: `1` \| `0.5` \| `0.25`

#### Returns

`Promise`\<`void`\>

#### Example

```ts
await playground.show("style");
await playground.show("toggle-result");
await playground.show("result", { full: true });
await playground.show("script");
await playground.show("result", { zoom: 0.5 });
await playground.show("console", { full: true });
```

#### Defined in

[models.ts:119](https://github.com/live-codes/livecodes/blob/61a0396afe9816818482c9e42c3ba23295ad3520/src/sdk/models.ts#L119)

***

### watch

> **watch**: [`WatchLoad`](../type-aliases/WatchLoad.md) & [`WatchReady`](../type-aliases/WatchReady.md) & [`WatchCode`](../type-aliases/WatchCode.md) & [`WatchConsole`](../type-aliases/WatchConsole.md) & [`WatchTests`](../type-aliases/WatchTests.md) & [`WatchDestroy`](../type-aliases/WatchDestroy.md)

Allows to watch for various playground events.
It takes 2 arguments: event name and a callback function that will be called on every event.

event name can be one of: `"load" | "ready" | "code" | "console" | "tests" | "destroy"`

In some events, the callback function will be called with an object that supplies relevant data to the callback function (e.g. code, console output, test results).

The watch method returns an object with a single method (`remove`), which when called will remove the callback from watching further events.

See [docs](https://livecodes.io/docs/sdk/js-ts#watch) for details.

#### Example

```ts
import { createPlayground } from "livecodes";

createPlayground("#container").then((playground) => {
  const codeWatcher = playground.watch("code", ({ code, config }) => {
    // this will run on every code change
    console.log("code:", code);
    console.log("config:", config);
  });

  const consoleWatcher = playground.watch("console", ({ method, args }) => {
    // this will run on every console output
    console[method](...args);
  });

  const testsWatcher = playground.watch("tests", ({ results }) => {
    // this will run when tests run
    results.forEach((testResult) => {
      console.log("status:", testResult.status); // "pass", "fail" or "skip"
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

#### Defined in

[models.ts:187](https://github.com/live-codes/livecodes/blob/61a0396afe9816818482c9e42c3ba23295ad3520/src/sdk/models.ts#L187)