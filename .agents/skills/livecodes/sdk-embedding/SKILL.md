---
name: livecodes/sdk-embedding
description: >
  Create and configure embedded playgrounds using createPlayground(), EmbedOptions,
  container setup, loading modes (eager/lazy/click), and appUrl for self-hosted instances.
  Load this skill when embedding LiveCodes in web pages, configuring playground
  containers, or setting up SDK integration.
type: core
library: livecodes
library_version: 0.13.0
sources:
  - live-codes/livecodes:docs/docs/sdk/js-ts.mdx
  - live-codes/livecodes:src/sdk/index.ts
  - live-codes/livecodes:src/sdk/models.ts
---

# LiveCodes — Create Embedded Playground

LiveCodes is a client-side code playground that runs in the browser. Use `createPlayground` to embed interactive code editors in any web page.

## Setup

```javascript
import { createPlayground } from 'livecodes';

// Minimal embed with template
createPlayground('#container', {
  template: 'react',
});

// Embed with custom code
createPlayground('#container', {
  config: {
    markup: { language: 'html', content: '<h1>Hello World</h1>' },
    style: { language: 'css', content: 'h1 { color: blue; }' },
    script: { language: 'javascript', content: 'console.log("Hello");' },
  },
});

// CDN usage (no bundler)
import { createPlayground } from 'https://cdn.jsdelivr.net/npm/livecodes';
createPlayground('#container', { template: 'vue' });
```

## Core Patterns

### Load playground lazily

Playgrounds load when they approach the viewport by default. Use `loading: 'eager'` for immediate load or `loading: 'click'` for click-to-load.

```javascript
createPlayground('#container', {
  template: 'react',
  loading: 'click', // Shows "Click to load" screen
});
```

### Configure via query params

For simple cases, use URL-style params instead of full config objects.

```javascript
createPlayground('#container', {
  params: {
    html: '<h1>Hello</h1>',
    css: 'h1 { color: blue; }',
    js: 'console.log("Hello")',
    console: 'open',
  },
});
```

### Use self-hosted instance

Point to your own LiveCodes deployment.

```javascript
createPlayground('#container', {
  appUrl: 'https://playground.mywebsite.com',
  template: 'react',
});
```

### Multiple sources priority

When providing multiple config sources, they override in order: `template` < `import` < `config` < `params`.

```javascript
createPlayground('#container', {
  template: 'react', // Lowest priority
  import: 'https://gist.github.com/...', // Overrides template
  config: {
    /* ... */
  }, // Overrides import
  params: { js: '...' }, // Highest priority
});
```

### Generate shareable URL

Create a link to the standalone app without embedding.

```javascript
import { getPlaygroundUrl } from 'livecodes';

const url = getPlaygroundUrl({
  config: {
    markup: { language: 'markdown', content: '# Hello World' },
  },
});
// url = "https://livecodes.io/#config/..."
```

### Compress config for sharing

Compress a stringified config object for use in URL hashes or compact storage.

```javascript
import { compress } from 'livecodes';

const config = {
  markup: { language: 'html', content: '<h1>Hello World</h1>' },
};
const compressed = compress(JSON.stringify(config));
```

### Decompress config

Decompress a string that was compressed with `compress`. Returns `null` if decompression fails.

```javascript
import { decompress } from 'livecodes';

const decompressed = decompress(compressedString);
if (decompressed) {
  const config = JSON.parse(decompressed);
}
```

## Common Mistakes

### HIGH Container element not found throws error

Wrong:

```javascript
createPlayground('#nonexistent-container', { template: 'react' });
// Throws: "Cannot find element: \"#nonexistent-container\""
```

Correct:

```javascript
// Ensure container exists before calling
const container = document.querySelector('#container');
if (container) {
  createPlayground('#container', { template: 'react' });
}

// Or use headless mode (container optional)
createPlayground({
  view: 'headless',
  config: {
    /* ... */
  },
});
```

`createPlayground` throws if the container selector matches no elements. In headless mode (`headless: true`), the container parameter is optional.

Source: src/sdk/index.ts — throws `"Cannot find element"` for invalid container

### HIGH Calling SDK methods after destroy() throws error

Wrong:

```javascript
const playground = await createPlayground('#container', options);
await playground.destroy();
await playground.run(); // Throws: "Cannot call API methods after calling `destroy()`."
```

Correct:

```javascript
const playground = await createPlayground('#container', options);
await playground.run();
// Use SDK methods while playground exists...
await playground.destroy(); // Last call — no more methods after this
```

Once `destroy()` is called, all subsequent SDK method calls throw with the message "Cannot call API methods after calling `destroy()`."

Source: src/sdk/index.ts — `alreadyDestroyedMessage` constant

### MEDIUM Invalid appUrl throws error

Wrong:

```javascript
createPlayground('#container', {
  appUrl: 'my-playground', // Not a valid URL
});
// Throws: "my-playground is not a valid URL."
```

Correct:

```javascript
createPlayground('#container', {
  appUrl: 'https://playground.example.com',
  template: 'react',
});
```

The `appUrl` must be a parseable URL string. Use the full URL including protocol.

Source: src/sdk/index.ts — URL parsing in `getPlaygroundUrl`

### MEDIUM SDK method timeout after 60 seconds

SDK calls timeout after 60 seconds if the playground doesn't respond.

```javascript
// This can timeout if playground has infinite loop or slow WASM load
await playground.run(); // Times out after 60s
```

Handle with try/catch for long-running operations:

```javascript
try {
  await playground.run();
} catch (error) {
  if (error.message.includes('timed out')) {
    console.error('Playground timed out');
  }
}
```

Source: src/sdk/index.ts — `API_TIMEOUT = 60_000` (60 seconds)
