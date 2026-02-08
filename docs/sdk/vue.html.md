# Vue SDK

import LiveCodes from '../../src/components/LiveCodes.tsx';

The vue SDK is a thin wrapper around the [JavaScript SDK](js-ts.html.md) to provide an easy to use vue component, yet retaining the full power, by having access to the [SDK methods](js-ts.html.md)#sdk-methods).

It has a very simple [implementation](https://github.com/live-codes/livecodes/blob/develop/src/sdk/vue.ts) which you can easily modify in case you need.

## Installation

Please refer to the [SDK installation](./index.html.md)#installation) section.

## Usage

The vue component is provided as the default export from `livecodes/vue`.

```html title="App.vue"
<script setup>
  import LiveCodes from 'livecodes/vue';
</script>

<template>
  <LiveCodes />
</template>
```

### TypeScript Support

Prop types are exported as `Props` from `livecodes/vue`.

```html title="App.vue"
<script setup lang="ts">
  import LiveCodes, { type Props } from 'livecodes/vue';
  const options: Props = {
    // embed options
  };
</script>

<template>
  <LiveCodes v-bind="options" />
</template>
```

TypeScript types are [documented here](../api/globals.md).

### Props

All [embed options](js-ts.html.md)#embed-options) are available as props with the corresponding types.

Example:

```html title="App.vue"
<script setup>
  import LiveCodes from 'livecodes/vue';

  const config = {
    markup: {
      language: 'markdown',
      content: '# Hello World!',
    },
  };
</script>

<template>
  <LiveCodes :config="config" view="result" />
</template>
```

In addition, the following prop is also available:

- `height`

  Type: `string`.

  Sets the [height of playground container](js-ts.html.md)#height) element.

  Example:

  ```html title="App.vue"
  <script setup>
    import LiveCodes from 'livecodes/vue';
  </script>

  <template>
    <LiveCodes height="500px" />
  </template>
  ```

### Events

- `"sdkReady"`

  Type: `(sdk: Playground) => void`.

  When the playground initializes, the event `"sdkReady"` is emitted. The event handler function is provided with an instance of the [JavaScript SDK](js-ts.html.md) representing the current playground. This allows making use of full capability of the SDK by calling [SDK methods](js-ts.html.md)#sdk-methods).

  Example:

  ```html title="App.vue"
  <script setup lang="ts">
    import type { Playground } from 'livecodes';
    import LiveCodes, { type Props } from 'livecodes/vue';

    const options: Props = {
      config: {
        markup: {
          language: 'html',
          content: '<h1>Hello World!</h1>',
        },
      },
    };

    let playground: Playground | undefined;
    const onReady = (sdk: Playground) => {
      playground = sdk;
    };

    const run = async () => {
      await playground?.run();
    };
  </script>

  <template>
    <LiveCodes v-bind="options" @sdk-ready="onReady" />
    <button @click="run">run</button>
  </template>
  ```

### Styles

Styles can be applied to the component [as usual](https://vuejs.org/guide/essentials/class-and-style.html#binding-html-classes).

By default, a set of [default styles](js-ts.html.md)#default-styles) are applied to the playground container. Styles passed to the component override these default styles.

Example:

```html title="App.vue"
<script setup>
  import LiveCodes from 'livecodes/vue';

  const style = {
    margin: 'auto',
    width: '80%',
  };
</script>

<template>
  <LiveCodes :style="style" />
</template>
```

## Demo

export const vueSDKDemo = {
  vue: `<script setup>\n  import LiveCodes from 'livecodes/vue';\n  \n  const params = {\n    html: '<h1>Hello World!</h1>',\n    css: 'h1 {color: blue;}',\n    js: 'console.log("Hello, Svelte!")',\n    console: 'open',\n  };\n</script>\n\n<template>\n  <LiveCodes :params="params" />\n</template>\n`,
};

<LiveCodes params={vueSDKDemo} height="80vh" />

## Related

- [SDK Installation](./index.html.md)#installation)
- [JS/TS SDK](./js-ts.html.md)
- [React SDK](./react.html.md)
- [Using SDK in Svelte](./svelte.html.md)
- [Using SDK in Solid](./solid.html.md)
- [Embedded Playgrounds](../features/embeds.html.md)