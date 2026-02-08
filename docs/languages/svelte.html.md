# Svelte

[Svelte](https://svelte.dev/docs/svelte/overview) is a framework for building user interfaces on the web. It uses a compiler to turn declarative components written in HTML, CSS and JavaScript.

## Usage

Svelte components can be used as documented in the [docs](https://svelte.dev/docs/svelte/svelte-files). See below for usage.

### Demo

import LiveCodes from '../../src/components/LiveCodes.tsx';
import RunInLiveCodes from '../../src/components/RunInLiveCodes.tsx';

<LiveCodes template="svelte" height="400"></LiveCodes>

### CSS Frameworks

[CSS Frameworks](../features/css.html.md)#css-processors) supported in LiveCodes (e.g. [Tailwind CSS](./tailwindcss.html.md), [UnoCSS](./unocss.html.md), [WindiCSS](./windicss.html.md)) can detect class names added in Svelte components.
Make sure that the required utility is enabled (from style editor menu or in `processors` property of [configuration object](../configuration/configuration-object.html.md)#processors)).

See [example below](#multiple-components).

### Languages and Pre-Processors

Many of the [languages supported in LiveCodes](./index.html.md) can be used. The value of `lang` attribute can be the language name (specified in its documentation page) or any of its aliases (extensions).

You may wrap the markup in a `template` element if you want to specify the `lang` attribute.

export const processorsDemo = {
  svelte: `<template lang="pug">\nh1 {msg}\n</template>\n\n<script lang="ts">\n  let msg: string = 'Hello!'\n</script>\n\n<style lang="scss">\n  $primary-color: #555;\n  h1 {\n    color: $primary-color;\n  }\n</style>\n`,
};

<RunInLiveCodes
  params={processorsDemo}
  code={processorsDemo.svelte}
  language="html"
  formatCode={false}
></RunInLiveCodes>

### Module Imports

npm modules can be imported as described in the section about [module resolution](../features/module-resolution.html.md), including bare module imports and importing from different CDNs. Stylesheets imported in the `script` block are added as `<link rel="stylesheet">` tags in the page `head`.

Example:

export const importsDemo = {
  svelte: `<script>
  import confetti from "canvas-confetti";
  import "bootstrap/dist/css/bootstrap.css";\n
  let count = $state(0);
  function increment() {
    count++;
    confetti();
  }
</script>\n
<div class="m-5 text-center">
  <p>You clicked {count} times.</p>
  <button on:click={increment}>Click me</button>
</div>
`,
};

<RunInLiveCodes
  params={importsDemo}
  code={importsDemo.svelte}
  language="html"
  formatCode={false}
></RunInLiveCodes>

Module imports can be customized using import maps as described in [module resolution](../features/module-resolution.html.md)#custom-module-resolution) documentations.

### Multiple Components

Svelte is supported in both [markup](../features/projects.html.md)#markup-editor) and [script](../features/projects.html.md)#script-editor) editors.

This allows having a component in the markup editor that imports (and passes props to) a component in the script editor. The opposite is not supported.

This can be done using relative import of a file name in the same directory. Any file name will resolve to the component in the script editor,
e.g. `./script.svelte`, `./Component.svelte`, `./Counter.svelte`, etc.

export const multi = {
  markup: {
    language: 'svelte',
    content: `<script lang="ts">
import Counter from './Counter.svelte';
</script>

<Counter start="5" />
`,
},
  script: {
    language: 'svelte',
    content: `<script lang="ts">
  let { start } = $props();
  let count = $state(start);
</script>

<div class="mt-8 text-center">
  <span class="text-3xl font-bold">{count}</span>
</div>
<div class="mt-4 space-x-4 text-center">
  <button on:click={() => count--} class="text-md font-medium bg-gray-500 hover:bg-gray-600 transition py-1 px-4 text-white rounded drop-shadow-xl">-</button>
  <button on:click={() => count++} class="text-md font-medium bg-gray-500 hover:bg-gray-600 transition py-1 px-4 text-white rounded drop-shadow-xl">+</button>
</div>
<div class="mt-4 space-x-4 text-center">
  <button on:click={() => count = start} class="text-md font-medium bg-red-500 hover:bg-red-600 transition py-1 px-4 text-white rounded drop-shadow-xl">Reset</button>
</div>
`,
  },
  style: {
    language: 'css',
    content: '@import "tailwindcss";\n',
  },
  processors: ['tailwindcss'],
}

<LiveCodes config={multi}></LiveCodes>

Please note that LiveCodes [does not have the concept of a file system](../features/projects.html.md). However, you can configure [editor options](../configuration/configuration-object.html.md)#markup) like `title`, `order` and `hideTitle` to simulate multiple files, change editor order or even hide editors.

Example:

export const multiFiles = {
  ...multi,
  markup: {
    ...multi.markup,
    title: 'App.svelte',
  },
  script: {
    ...multi.script,
    title: 'Counter.svelte',
  },
  style: {
    ...multi.style,
    title: 'styles.css',
    order: 3,
  },
};

<LiveCodes config={multiFiles}></LiveCodes>

When both markup and script editors use Svelte, the component in the markup editor is used as the main component rendered in the [root element](#root-element).
To render the component in the script editor, it has to be imported and used by the main component.

### Importing External Components

External Svelte components can be imported. The import URL has to be an absolute URL ending with `.svelte` extension. Any bare or relative imports in the imported files are resolved and compiled recursively.

Example:

```html
<script>
  import Counter from 'https://raw.githubusercontent.com/user/repo/main/src/Counter.svelte';
</script>

<Counter />
```

### Root Element

To mount the application instance to a specific DOM element use `"livecodes-app"` as the element `id` in the HTML. Otherwise, if that element is not found, a new `div` element is added to `document.body` and is used to mount the instance.

Example:

export const customRoot = {
  markup: {
    language: 'html',
    content: `<h1>Custom Root Element</h1>
<div id="livecodes-app"></div>
<p>...other page content</p>
`,
  },
  script: {
    language: 'svelte',
    content: `<script>
  let name = $state('Svelte');
</script>\n
<div>I'm a {name} component</div>
`,
  },
};

<LiveCodes config={customRoot} />

## Language Info

### Name

`svelte`

### Extensions

`.svelte`

### Editor

`script`, `markup`

## Compiler

The official [Svelte compiler](https://svelte.dev/docs/svelte/svelte-compiler).

### Version

`svelte`: v5.39.12

## Code Formatting

Using [Prettier](https://prettier.io/).

## Starter Template

https://livecodes.io/?template=svelte

## Links

- [Svelte](https://svelte.dev/)
- [Svelte documentations](https://svelte.dev/docs/svelte/overview)