# Solid

import LiveCodes from '../../src/components/LiveCodes.tsx';
import RunInLiveCodes from '../../src/components/RunInLiveCodes.tsx';

The [JS/TS SDK](js-ts.html.md) can be used directly in [Solid](https://www.solidjs.com/) components without the need for any wrappers.

## Installation

Please refer to the [SDK installation](./index.html.md)#installation) section.

## Usage

This is an example of using the LiveCodes TS SDK in a Solid component:

```tsx title="App.tsx"
import { onCleanup } from 'solid-js';
import { createPlayground, type Playground, type EmbedOptions } from 'livecodes';

export default function App() {
  let playground: Playground | null = null;

  const options: EmbedOptions = {
    params: {
      html: '<h1>Hello World!</h1>',
      css: 'h1 {color: blue;}',
      js: 'console.log("Hello, Solid!")',
      console: 'open',
    },
  };

  const onMounted = (container: HTMLElement) => {
    createPlayground(container, options).then((sdk) => {
      playground = sdk; // now the SDK is available
    });
  };
  onCleanup(() => playground?.destroy());

  return <div ref={onMounted}></div>;
}
```

export const solidSDKDemo = {
  "solid.tsx": `import { onCleanup } from 'solid-js';
import { createPlayground, type Playground, type EmbedOptions } from 'livecodes';

export default function App() {
  let playground: Playground | null = null;

  const options: EmbedOptions = {
    params: {
      html: '<h1>Hello World!</h1>',
      css: 'h1 {color: blue;}',
      js: 'console.log("Hello, Solid!")',
      console: 'open',
    },
  };

  const onMounted = (container: HTMLElement) => {
    createPlayground(container, options).then((sdk) => {
      playground = sdk; // now the SDK is available
    });
  };
  onCleanup(() => playground?.destroy());

  return <div ref={onMounted}></div>;
}
`,
};

<RunInLiveCodes params={solidSDKDemo}></RunInLiveCodes>

[Embed options](./js-ts.html.md)#embed-options), [SDK methods](./js-ts.html.md)#sdk-methods) and [TypeScript types](./js-ts.html.md)#typescript-types) are available as described in the [JS/TS SDK documentations](./js-ts.html.md).

## Demo

<LiveCodes params={solidSDKDemo} height="80vh" />

## Related

- [SDK Installation](./index.html.md)#installation)
- [JS/TS SDK](./js-ts.html.md)
- [React SDK](./react.html.md)
- [Vue SDK](./vue.html.md)
- [Using SDK in Svelte](./svelte.html.md)
- [Embedded Playgrounds](../features/embeds.html.md)