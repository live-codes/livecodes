# Svelte

import LiveCodes from '../../src/components/LiveCodes.tsx';
import RunInLiveCodes from '../../src/components/RunInLiveCodes.tsx';

The [JS/TS SDK](js-ts.html.md) can be used directly in Svelte components without the need for any wrappers.

## Installation

Please refer to the [SDK installation](./index.html.md)#installation) section.

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
  let playground = $state(null);
  onMount(() => {
    createPlayground(container, options).then((p) => {
      playground = p; // now the SDK is available
    });
    // cleanup when the component is destroyed
    return () => playground?.destroy();
  });
</script>

<div bind:this="{container}"></div>
```

export const svelteSDKDemo = {
  svelte: `\x3Cscript>\n  import { onMount } from 'svelte';\n  import { createPlayground } from 'livecodes';\n\n  // Embed Options\n  const options = {\n    params: {\n      html: '<h1>Hello World!</h1>',\n      css: 'h1 {color: blue;}',\n      js: 'console.log("Hello, Svelte!")',\n      console: 'open',\n    },\n  };\n\n  let container;\n  let playground = $state(null);\n  onMount(() => {\n    createPlayground(container, options).then((p) => {\n      playground = p; // now the SDK is available\n    });\n    // cleanup when the component is destroyed\n    return () => playground?.destroy();\n  });\n\x3C/script>\n\n<div bind:this="{container}"></div>\n`,
};

<RunInLiveCodes params={svelteSDKDemo}></RunInLiveCodes>

[Embed options](./js-ts.html.md)#embed-options), [SDK methods](./js-ts.html.md)#sdk-methods) and [TypeScript types](./js-ts.html.md)#typescript-types) are available as described in the [JS/TS SDK documentations](./js-ts.html.md).

Alternatively, the SDK function [`createPlayground`](./js-ts.html.md)#createplayground) can be used as an [action](https://learn.svelte.dev/tutorial/actions).

Example:

```html title="Component.svelte"
<script>
  import { createPlayground } from 'livecodes';
  let options = {
    // embed options
  };
</script>

<div use:createPlayground="{options}"></div>
```

However, it is recommended to cleanup when the node is unmounted, like that:

```html title="Component.svelte"
<script>
  import { createPlayground } from 'livecodes';
  let options = {
    // embed options
  };

  const livecodes = (node, opts) => {
    let playground = $state(null);
    const ready = new Promise(async (res) => {
      playground = await createPlayground(node, opts);
      res();
    });
    return { destroy: () => ready.then(() => playground?.destroy()) };
  };
</script>

<div use:livecodes="{options}"></div>
```

## Demo

<LiveCodes params={svelteSDKDemo} height="80vh" />

## Related

- [SDK Installation](./index.html.md)#installation)
- [JS/TS SDK](./js-ts.html.md)
- [React SDK](./react.html.md)
- [Vue SDK](./vue.html.md)
- [Using SDK in Solid](./solid.html.md)
- [Embedded Playgrounds](../features/embeds.html.md)