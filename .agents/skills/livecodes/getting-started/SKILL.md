---
name: livecodes/getting-started
description: >
  Quick start for standalone app at livecodes.io, embedding playgrounds with CDN or npm,
  and self-hosting basics. Load this skill for initial setup and basic usage patterns.
type: lifecycle
library: livecodes
library_version: 0.13.0
sources:
  - live-codes/livecodes:README.md
  - live-codes/livecodes:docs/docs/getting-started.mdx
---

# LiveCodes — Get Started

LiveCodes is a client-side code playground that runs in the browser. No server, no build step, no `npm install`.

## Quick Start

### Standalone App

1. Go to [livecodes.io](https://livecodes.io)
2. Start coding with 90+ languages

### Embedded Playground (CDN)

```html
<div id="container"></div>
<script type="module">
  import { createPlayground } from 'https://cdn.jsdelivr.net/npm/livecodes';

  createPlayground('#container', {
    params: {
      markdown: '# Hello LiveCodes!',
      css: 'h1 { color: dodgerblue; }',
      js: 'console.log("Hello, from JS!");',
      console: 'open',
    },
  });
</script>
```

### Embedded Playground (npm)

```bash
npm install livecodes
```

```javascript
import { createPlayground } from 'livecodes';

createPlayground('#container', {
  template: 'react',
});
```

### Self-Hosted

1. Download from [GitHub releases](https://github.com/live-codes/livecodes/releases)
2. Host on any static server (GitHub Pages, Netlify, Cloudflare Pages, etc.)
3. Point SDK to your instance:

```javascript
import { createPlayground } from 'livecodes';

createPlayground('#container', {
  appUrl: 'https://your-domain.com/livecodes',
  template: 'react',
});
```

## Basic Patterns

### Use a template

```javascript
createPlayground('#container', {
  template: 'react', // react, vue, svelte, solid, angular, etc.
});

// Available templates:
// blank, javascript, typescript, react, react-native, vue, vue2, angular,
// preact, svelte, solid, lit, stencil, mdx, astro, jest, tailwindcss, python, ...
```

### Custom code

```javascript
createPlayground('#container', {
  config: {
    markup: {
      language: 'markdown',
      content: '# Hello World',
    },
    style: {
      language: 'css',
      content: 'h1 { color: blue; }',
    },
    script: {
      language: 'javascript',
      content: 'console.log("Hello!");',
    },
    activeEditor: 'script',
  },
  params: { console: 'open' },
});
```

### Generate shareable URL

```javascript
import { getPlaygroundUrl } from 'livecodes';

const url = getPlaygroundUrl({
  config: {
    markup: { language: 'markdown', content: '# Hello' },
  },
});
// Share this URL
window.open(url);
```

### Permanent URL (pinned version)

For stable embeds that won't break with updates:

```javascript
// Use a specific version
createPlayground('#container', {
  appUrl: 'https://v48.livecodes.io', // Permanent URL
  template: 'react',
});

// SDK version pinning
import { createPlayground } from 'https://cdn.jsdelivr.net/npm/livecodes@0.13.0';
```

## Common Patterns by Use Case

### Documentation site embed

```javascript
// Minimal embed for docs
createPlayground('#container', {
  params: {
    js: `console.log("Hello World")`,
    console: 'open',
  },
  loading: 'lazy', // Load when visible
});

// Or use markdown plugins (remark-livecodes, etc.)
// See: markdown-integration skill
```

### Blog post with code example

```javascript
// Simple, focused display
createPlayground('#container', {
  config: {
    mode: 'simple',
    layout: 'vertical',
  },
  params: {
    html: '<h1>Hello</h1>',
    css: 'h1 { color: blue; }',
  },
});
```

### Teaching/Tutorial

```javascript
// Show code with tests
createPlayground('#container', {
  template: 'jest',
  params: { tests: 'open' },
});

// Read-only code review
createPlayground('#container', {
  config: {
    mode: 'codeblock',
    readonly: true,
  },
  params: { html: '<h1>Review this code</h1>' },
});
```

### Demo showcase

```javascript
// Result only
createPlayground('#container', {
  params: {
    mode: 'result',
    template: 'react',
  },
});

// Demo with console
createPlayground('#container', {
  params: {
    mode: 'result',
    tools: 'console|full',
    js: 'console.log("Demo output")',
  },
});
```

## Framework Quick Start

### React

```jsx
import LiveCodes from 'livecodes/react';

export default function App() {
  return <LiveCodes template="react" height="400px" />;
}
```

### Vue

```vue
<script setup>
import LiveCodes from 'livecodes/vue';
</script>

<template>
  <LiveCodes template="vue" height="400px" />
</template>
```

### Svelte

```svelte
<script>
import LiveCodes from 'livecodes/svelte';
</script>

<LiveCodes template="svelte" height="400px" />
```

### Solid

```tsx
import LiveCodes from 'livecodes/solid';

function App() {
  return <LiveCodes template="solid" height="400px" />;
}
```

### Web Components

```html
<script src="https://cdn.jsdelivr.net/npm/livecodes/web-components.js"></script>
<live-codes template="react" height="400px"></live-codes>
```

## Available Templates

| Template      | Description                  |
| ------------- | ---------------------------- |
| `blank`       | Empty project                |
| `javascript`  | Vanilla JavaScript           |
| `typescript`  | TypeScript                   |
| `react`       | React                        |
| `vue`         | Vue 3 SFC                    |
| `svelte`      | Svelte SFC                   |
| `solid`       | Solid                        |
| `angular`     | Angular                      |
| `preact`      | Preact                       |
| `tailwindcss` | Tailwind CSS                 |
| `bootstrap`   | Bootstrap                    |
| `python`      | Python                       |
| `python-wasm` | Python (WASM)                |
| `jest`        | Jest tests                   |
| `jest-react`  | Jest + React Testing Library |

See [Full Template List](https://livecodes.io/docs/api/internal/type-aliases/TemplateName/) for all 70+ templates.

## Next Steps

- **Embed playgrounds**: Read `sdk-embedding` skill
- **Control via SDK**: Read `sdk-methods` skill
- **Configure behavior**: Read `configuration` skill
- **Use languages**: Read `language-support` skill
- **Import npm modules**: Read `module-resolution` skill
- **Self-host**: Read `self-hosting` skill
- **Integrate with docs**: Read `markdown-integration` skill
