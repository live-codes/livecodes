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

  let container;

  const params = {
    html: '<h1>Hello World!</h1>',
    css: 'h1 {color: blue;}',
    js: 'console.log("Hello, Svelte!")',
    console: 'open',
  };

  onMount(() => {
    createPlayground(container, { params });
  });
</script>

<div bind:this="{container}"></div>
```

<RunInLiveCodes params={{x:"id/e9v4agd4nbd"}}></RunInLiveCodes>

[Embed options](./js-ts.md#embed-options), [SDK methods](./js-ts.md#sdk-methods) and [TypeScript types](./js-ts.md#typescript-types) are available as described in the [JS/TS SDK documentations](./js-ts.md).

## Demo

<LiveCodes import="id/e9v4agd4nbd" height="80vh" />
