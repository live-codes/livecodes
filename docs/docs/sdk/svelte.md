# Svelte

import LiveCodes from '../../src/components/LiveCodes.tsx'
import RunInLiveCodes from '../../src/components/RunInLiveCodes.tsx'

The [JS/TS SDK](js-ts.md) can be used directly in Svelte components without the need for any wrappers.

## Installation

Please refer to the [SDK installation](./index.md#installation) section.

## Usage

This is an example of using the LiveCodes JS SDK in a Svelte component:

```html title="Component.svelte"
<script>
  import { onMount } from 'svelte';
  import { createPlayground } from 'livecodes';

  // Embed Options
  const options = {
    params: {
      html: '<h1>Hello World!</h1>',
      css: 'h1 {color: blue;}',
      js: 'console.log("Hello, Svelte!")',
      console: 'open',
    },
  };

  let container;
  let playground;
  onMount(() => {
    createPlayground(container, options).then((p) => {
      playground = p; // now the SDK is available
    });
    // clean up when the component is destroyed
    return () => playground?.destroy();
  });
</script>

<div bind:this="{container}"></div>
```

export const svelteSDKDemo = {
svelte: `\x3Cscript>\n  import { onMount } from 'svelte';\n  import { createPlayground } from 'livecodes';\n\n  // Embed Options\n  const options = {\n    params: {\n      html: '<h1>Hello World!</h1>',\n      css: 'h1 {color: blue;}',\n      js: 'console.log("Hello, Svelte!")',\n      console: 'open',\n    },\n  };\n\n  let container;\n  let playground;\n  onMount(() => {\n    createPlayground(container, options).then((p) => {\n      playground = p; // now the SDK is available\n    });\n    // clean up when the component is destroyed\n    return () => playground?.destroy();\n  });\n\x3C/script>\n\n<div bind:this="{container}"></div>\n`,
};

<RunInLiveCodes params={svelteSDKDemo}></RunInLiveCodes>

[Embed options](./js-ts.md#embed-options), [SDK methods](./js-ts.md#sdk-methods) and [TypeScript types](./js-ts.md#typescript-types) are available as described in the [JS/TS SDK documentations](./js-ts.md).

## Demo

<LiveCodes params={svelteSDKDemo} height="80vh" />

## Related

- [SDK Installation](./index.md#installation)
- [JS/TS SDK](./js-ts.md)
- [React SDK](./react.md)
- [Vue SDK](./vue.md)
- [Embedded Playgrounds](../features/embeds.md)
