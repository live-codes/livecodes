---
name: livecodes/framework-wrappers
description: >
  Use SDK with React, Vue, Svelte, Solid, Preact, and Web Components.
  sdkReady callback pattern, reactive props, and framework-specific setup.
  Load this skill when embedding LiveCodes in a framework application.
type: framework
library: livecodes
library_version: 0.13.0
requires:
  - sdk-embedding
  - sdk-methods
sources:
  - live-codes/livecodes:docs/docs/sdk/react.mdx
  - live-codes/livecodes:docs/docs/sdk/vue.mdx
  - live-codes/livecodes:docs/docs/sdk/svelte.mdx
  - live-codes/livecodes:docs/docs/sdk/solid.mdx
  - live-codes/livecodes:docs/docs/sdk/preact.mdx
  - live-codes/livecodes:docs/docs/sdk/web-components.mdx
  - live-codes/livecodes:src/sdk/react.tsx
  - live-codes/livecodes:src/sdk/vue.ts
---

This skill builds on sdk-embedding and sdk-methods. Read them first for foundational concepts about createPlayground, SDK methods, and configuration.

# LiveCodes — Framework SDK Wrappers

LiveCodes provides framework-specific components that wrap the core SDK. Each wrapper handles lifecycle, reactivity, and props.

## React

```jsx
import LiveCodes from 'livecodes/react';

// Basic usage
function App() {
  return <LiveCodes template="react" />;
}

// With config
function App() {
  const config = {
    markup: { language: 'markdown', content: '# Hello World' },
  };
  return <LiveCodes config={config} height="400px" />;
}

// Access SDK methods via sdkReady
function App() {
  const [playground, setPlayground] = useState(null);

  const handleRun = async () => {
    await playground?.run();
  };

  return (
    <>
      <LiveCodes
        template="react"
        sdkReady={setPlayground}
      />
      <button onClick={handleRun}>Run</button>
    </>
  );
}

// TypeScript
import LiveCodes, { type Props } from 'livecodes/react';

const options: Props = {
  config: { /* ... */ },
  height: '500px',
};

export default () => <LiveCodes {...options} />;
```

### React: Available Props

| Prop             | Type                        | Description                |
| ---------------- | --------------------------- | -------------------------- |
| All EmbedOptions | —                           | Pass EmbedOptions as props |
| `className`      | `string`                    | Container class name       |
| `height`         | `string`                    | Container height           |
| `style`          | `object`                    | Container styles           |
| `sdkReady`       | `(sdk: Playground) => void` | Callback with SDK instance |

### React: Reactive Props

```jsx
function App() {
  const [config, setConfig] = useState({
    markup: { language: 'html', content: '<h1>Hello</h1>' },
  });

  // Changing config uses setConfig() - no full reload
  const switchToMarkdown = () => {
    setConfig({
      markup: { language: 'markdown', content: '# Hello' },
    });
  };

  // Changing other props causes full reload
  // <LiveCodes template={template} /> // changing template reloads

  return (
    <>
      <LiveCodes config={config} />
      <button onClick={switchToMarkdown}>Switch to Markdown</button>
    </>
  );
}
```

## Vue

```vue
<script setup>
import LiveCodes from 'livecodes/vue';

const config = {
  markup: { language: 'markdown', content: '# Hello World' },
};

let playground;
const onReady = (sdk) => {
  playground = sdk;
};

const run = async () => {
  await playground?.run();
};
</script>

<template>
  <LiveCodes :config="config" @sdk-ready="onReady" />
  <button @click="run">Run</button>
</template>

<!-- With TypeScript -->
<script setup lang="ts">
import LiveCodes, { type Props } from 'livecodes/vue';
import type { Playground } from 'livecodes';

const options: Props = {
  config: {
    /* ... */
  },
};
</script>

<template>
  <LiveCodes v-bind="options" />
</template>
```

### Vue: Available Props

| Prop             | Type     | Description                |
| ---------------- | -------- | -------------------------- |
| All EmbedOptions | —        | Pass EmbedOptions as props |
| `height`         | `string` | Container height           |

### Vue: Events

| Event        | Payload                     |
| ------------ | --------------------------- |
| `@sdk-ready` | `(sdk: Playground) => void` |

### Vue: Reactive Props

```vue
<script setup>
import { ref } from 'vue';
import LiveCodes from 'livecodes/vue';

const config = ref({
  markup: { language: 'html', content: '<h1>Hello</h1>' },
});

// Uses setConfig() - no reload
const switchToMarkdown = () => {
  config.value = {
    markup: { language: 'markdown', content: '# Hello' },
  };
};
</script>

<template>
  <LiveCodes :config="config" />
  <button @click="switchToMarkdown">Switch</button>
</template>
```

## Svelte

```svelte
<script>
  import LiveCodes from 'livecodes/svelte';

  let playground;
  const config = {
    markup: { language: 'markdown', content: '# Hello World' },
  };

  function onReady(sdk) {
    playground = sdk;
  }

  async function run() {
    await playground?.run();
  }
</script>

<LiveCodes {config} on:sdkReady={onReady} />
<button on:click={run}>Run</button>
```

## Solid

```tsx
import LiveCodes from 'livecodes/solid';
import { createSignal } from 'solid-js';

function App() {
  const [playground, setPlayground] = createSignal(null);
  const config = {
    markup: { language: 'markdown', content: '# Hello World' },
  };

  const handleRun = async () => {
    await playground()?.run();
  };

  return (
    <>
      <LiveCodes config={config} sdkReady={setPlayground} />
      <button onClick={handleRun}>Run</button>
    </>
  );
}
```

## Preact

```tsx
import LiveCodes from 'livecodes/preact';
import { useState } from 'preact/hooks';

function App() {
  const [playground, setPlayground] = useState(null);

  const handleRun = async () => {
    await playground?.run();
  };

  return (
    <>
      <LiveCodes template="react" sdkReady={setPlayground} />
      <button onClick={handleRun}>Run</button>
    </>
  );
}
```

## Web Components

```html
<script src="https://cdn.jsdelivr.net/npm/livecodes/web-components.js"></script>

<!-- Basic usage -->
<live-codes template="react"></live-codes>

<!-- With config property -->
<live-codes height="400px"></live-codes>

<script>
  const playground = document.querySelector('live-codes');
  playground.config = {
    markup: { language: 'markdown', content: '# Hello' },
  };
</script>
```

### Web Components: Declarative Code via Children

The web component supports providing code declaratively as child elements inside a wrapper `<template>`. This avoids JavaScript string escaping and enables IDE syntax highlighting.

The outer `<template>` makes inner `<style>` and `<script>` elements inert (no side effects on the embedding page).

#### Single-Editor Mode

```html
<live-codes height="400px">
  <template>
    <template lang="html">
      <h1>Hello World</h1>
      <p>Welcome to <strong>LiveCodes</strong></p>
    </template>
    <style lang="scss">
      body {
        font-family: sans-serif;
        h1 {
          color: royalblue;
        }
      }
    </style>
    <script lang="ts">
      console.log('Hello from TypeScript!');
    </script>
  </template>
</live-codes>
```

If `lang` is omitted, defaults are `html`, `css`, and `javascript`.

#### Active Editor

Use the `active` boolean attribute to set the initially focused editor:

```html
<live-codes>
  <template>
    <template lang="html"><h1>Hello</h1></template>
    <script lang="ts" active>
      console.log('focused');
    </script>
  </template>
</live-codes>
```

#### Config and Params Attributes

Use `config` and `params` HTML attributes as JSON strings for non-code settings:

```html
<live-codes config='{"processors": ["tailwindcss"]}' params='{"console": "open"}'>
  <template>
    <template lang="html"><h1 class="text-3xl">Hello</h1></template>
  </template>
</live-codes>
```

#### Merge Precedence

When combining children, config attribute, and config property:

1. **`config` property** (highest — explicit programmatic override)
2. **Children** (declarative defaults)
3. **`config` attribute** (lowest — inline JSON settings)

Same for `params`: attribute is merged with property, property wins for overlapping keys.

#### Reactivity

Children content is reactive. Changing content inside the wrapper `<template>` programmatically triggers `setConfig()`:

```html
<live-codes id="demo">
  <template>
    <style lang="css">
      h1 {
        color: blue;
      }
    </style>
  </template>
</live-codes>

<script>
  function changeColor() {
    const wrapper = document.querySelector('#demo > template');
    wrapper.content.querySelector('style').textContent = 'h1 { color: red; }';
    // MutationObserver detects this → setConfig() called
  }
</script>
```

## Common Mistakes

### HIGH Not using sdkReady to access SDK in frameworks

Wrong (React):

```jsx
function App() {
  // No way to get SDK reference
  return <LiveCodes template="react" />;
}

function handleRun() {
  // Where's playground? Can't access SDK methods
  playground.run(); // Error: playground is undefined
}
```

Correct (React):

```jsx
function App() {
  const [playground, setPlayground] = useState(null);

  const handleRun = async () => {
    await playground?.run();
  };

  return (
    <>
      <LiveCodes template="react" sdkReady={setPlayground} />
      <button onClick={handleRun}>Run</button>
    </>
  );
}
```

Correct (Vue):

```vue
<script setup>
import LiveCodes from 'livecodes/vue';
import { ref } from 'vue';

const playground = ref(null);

const onReady = (sdk) => {
  playground.value = sdk;
};
</script>

<template>
  <LiveCodes template="vue" @sdk-ready="onReady" />
</template>
```

The SDK is only available after the playground initializes. Use `sdkReady` (React), `@sdk-ready` (Vue), or `on:sdkReady` (Svelte) to get a reference.

Source: docs/docs/sdk/react.mdx, docs/docs/sdk/vue.mdx — sdkReady section

### MEDIUM Changing non-config props causes full reload

```jsx
// React - config changes use setConfig (no reload)
const [config, setConfig] = useState(initialConfig);
setConfig(newConfig); // Efficient update, no iframe reload

// React - other prop changes cause full reload
const [template, setTemplate] = useState('react');
setTemplate('vue'); // Destroys and recreates iframe
```

Changing `config` prop uses SDK's `setConfig()` method under the hood — efficient. Changing other props (`template`, `params`, `loading`) destroys and recreates the iframe.

If you need reactive changes, prefer updating `config` over changing other props.

Source: docs/docs/sdk/react.mdx — Reactive Props section

## Framework Installation

```bash
# React
npm install livecodes
import LiveCodes from 'livecodes/react';

# Vue 3
npm install livecodes
import LiveCodes from 'livecodes/vue';

# Svelte
npm install livecodes
import LiveCodes from 'livecodes/svelte';

# Solid
npm install livecodes
import LiveCodes from 'livecodes/solid';

# Preact
npm install livecodes
import LiveCodes from 'livecodes/preact';

# Web Components (CDN)
<script src="https://cdn.jsdelivr.net/npm/livecodes/web-components.js"></script>
```

## Exported Types

All frameworks export:

- `Props` — EmbedOptions plus framework-specific props
- `Playground` — SDK Playground interface
- `Config` — Configuration type
- `Code` — Code object type
- `Language` — Language string type
