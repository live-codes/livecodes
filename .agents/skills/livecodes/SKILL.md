---
name: livecodes
description: >-
  Open-source, client-side code playground supporting 90+ languages/frameworks.
  Runs entirely in the browser with SDK for embedding. Entry point for all
  LiveCodes skills.
type: core
library: livecodes
library_version: 0.13.0
---

# LiveCodes Overview

LiveCodes is a feature-rich, open-source, client-side code playground that runs entirely in the browser. No server required. Supports 90+ languages/frameworks with a powerful SDK for embedding in any web application.

> **CRITICAL**: LiveCodes runs CLIENT-SIDE. No server, no build step, no backend. Do not confuse with server-based playgrounds.

> **CRITICAL**: All SDK methods are async (return Promises). Always `await` them or use `.then()`.

## Sub-Skills

| Task                                             | Sub-Skill                                                                  |
| ------------------------------------------------ | -------------------------------------------------------------------------- |
| Quick start for beginners                        | [livecodes/getting-started/SKILL.md](./getting-started/SKILL.md)           |
| Create embedded playgrounds                      | [livecodes/sdk-embedding/SKILL.md](./sdk-embedding/SKILL.md)               |
| Use SDK methods (run, getCode, setConfig, watch) | [livecodes/sdk-methods/SKILL.md](./sdk-methods/SKILL.md)                   |
| Compress/decompress config utilities         | [livecodes/sdk-embedding/SKILL.md](./sdk-embedding/SKILL.md)               |
| Configure via Config object, query params        | [livecodes/configuration/SKILL.md](./configuration/SKILL.md)               |
| Choose display mode (full, simple, result, etc.) | [livecodes/display-modes/SKILL.md](./display-modes/SKILL.md)               |
| Run playgrounds without visible UI               | [livecodes/headless-mode/SKILL.md](./headless-mode/SKILL.md)               |
| Import/export code (GitHub, gists, files)        | [livecodes/import-export/SKILL.md](./import-export/SKILL.md)               |
| Work with 90+ languages and processors           | [livecodes/language-support/SKILL.md](./language-support/SKILL.md)         |
| Import npm packages without bundler              | [livecodes/module-resolution/SKILL.md](./module-resolution/SKILL.md)       |
| Write and run tests in the playground            | [livecodes/testing/SKILL.md](./testing/SKILL.md)                           |
| Use with React, Vue, Svelte, Solid, Preact       | [livecodes/framework-wrappers/SKILL.md](./framework-wrappers/SKILL.md)     |
| Integrate with docs sites (Docusaurus, Astro)    | [livecodes/markdown-integration/SKILL.md](./markdown-integration/SKILL.md) |
| Self-host on your own server                     | [livecodes/self-hosting/SKILL.md](./self-hosting/SKILL.md)                 |
| Preview PRs in LiveCodes (GitHub Action)         | [livecodes/gh-action/SKILL.md](./gh-action/SKILL.md)                       |

## Quick Decision Tree

```
New to LiveCodes?
  → livecodes/getting-started

Need to embed a playground in your app?
  → livecodes/sdk-embedding

Need to control playground programmatically?
  → livecodes/sdk-methods

Need to configure project content (languages, theme, etc.)?
  → livecodes/configuration

Need to show code readonly or result-only?
  → livecodes/display-modes

Need to run playground without any UI?
  → livecodes/headless-mode

Need to use React/Vue/Svelte/etc.?
  → livecodes/framework-wrappers

Need to import npm packages or external modules?
  → livecodes/module-resolution

Need a specific language (Python, SASS, TypeScript)?
  → livecodes/language-support

Need to run tests in the playground?
  → livecodes/testing

Need to import code from GitHub/URL or export?
  → livecodes/import-export

Need to add playgrounds to markdown docs?
  → livecodes/markdown-integration

Need to host LiveCodes on your own server?
  → livecodes/self-hosting

Need to preview PR changes in playgrounds?
  → livecodes/gh-action
```

## Minimal Working Example

### CDN (quickest)

```html
<!doctype html>
<html>
  <head>
    <title>LiveCodes Demo</title>
  </head>
  <body>
    <div id="container"></div>
    <script type="module">
      import { createPlayground } from 'https://cdn.jsdelivr.net/npm/livecodes';

      createPlayground('#container', {
        config: {
          markup: { language: 'html', content: '<h1>Hello LiveCodes!</h1>' },
          style: { language: 'css', content: 'h1 { color: blue; }' },
          script: { language: 'javascript', content: 'console.log("Hello!");' },
        },
      });
    </script>
  </body>
</html>
```

### NPM

```bash
npm install livecodes
```

```javascript
import { createPlayground } from 'livecodes';

const playground = await createPlayground('#container', {
  config: {
    markup: { language: 'html', content: '<h1>Hello!</h1>' },
  },
});

// SDK methods are async - always await
await playground.run();
const code = await playground.getCode();
```

### React

```jsx
import { useState } from 'react';
import LiveCodes from 'livecodes/react';

export default function App() {
  const [playground, setPlayground] = useState(null);

  return (
    <>
      <LiveCodes
        config={{ markup: { language: 'html', content: '<h1>Hello!</h1>' } }}
        sdkReady={setPlayground}
      />
      <button onClick={() => playground?.run()}>Run</button>
    </>
  );
}
```

## Common Mistakes

### HIGH: SDK methods return Promises - always await

```javascript
// WRONG - code is a Promise, not actual code
const code = playground.getCode();
console.log(code.markup); // undefined!

// CORRECT - await the Promise
const code = await playground.getCode();
console.log(code.markup.content); // '<h1>Hello!</h1>'
```

### HIGH: Container must exist before createPlayground

```javascript
// WRONG - container doesn't exist yet
createPlayground('#container', { config }); // throws if #container not in DOM

// CORRECT - ensure container exists
const container = document.querySelector('#container');
if (container) {
  createPlayground('#container', { config });
}

// OR use headless mode if no UI needed
createPlayground({ headless: true, config });
```

### HIGH: Config vs EmbedOptions confusion

```javascript
// WRONG - appUrl is not a config property
createPlayground('#container', {
  config: {
    appUrl: 'https://my-server.com', // ERROR: wrong place
  },
});

// CORRECT - appUrl is an EmbedOption, not config
createPlayground('#container', {
  appUrl: 'https://my-server.com', // EmbedOptions
  config: {
    // Config
    markup: { language: 'html', content: '<h1>Hi</h1>' },
  },
});
```

### MEDIUM: Different CDN imports create separate module instances

```javascript
// WRONG - two different React instances
import React from 'react'; // esm.sh
import { createRoot } from 'skypack:react-dom/client'; // Different React!

// CORRECT - use same CDN consistently
import React from 'react';
import { createRoot } from 'react-dom/client'; // Both from esm.sh (default)
```
