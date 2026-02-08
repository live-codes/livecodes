# Vue SFC

[Vue.js](https://vuejs.org/), The Progressive JavaScript Framework, is an approachable, performant and versatile framework for building web user interfaces.

This is the documentation for LiveCodes language support for Vue [Single-File Component (SFC)](https://vuejs.org/api/sfc-spec.html).

The support for Vue 2 SFC (the older, EOL version) is [documented separately](./vue2.html.md).

## Usage

Vue SFC can be used as documented in the [specs](https://vuejs.org/api/sfc-spec.html), including support for [Scoped CSS](https://vuejs.org/api/sfc-css-features.html#scoped-css), [CSS Modules](https://vuejs.org/api/sfc-css-features.html#css-modules), [pre-processors](https://vuejs.org/api/sfc-spec.html#pre-processors), [JSX](https://vuejs.org/guide/extras/render-function.html#jsx-tsx) and [`src` imports](https://vuejs.org/api/sfc-spec.html#src-imports). See below for usage.

### Demo

import LiveCodes from '../../src/components/LiveCodes.tsx';
import RunInLiveCodes from '../../src/components/RunInLiveCodes.tsx';

<LiveCodes template="vue" height="400"></LiveCodes>

### Scoped CSS

> When a `<style>` tag has the scoped attribute, its CSS will apply to elements of the current component only.
>
> — [docs](https://vuejs.org/api/sfc-css-features.html#scoped-css)

export const scopedCssDemo = {
  vue: `<style scoped>\n.example {\n  color: red;\n}\n</style>\n\n<template>\n  <div class="example">hi</div>\n</template>`,
};

<RunInLiveCodes
  params={scopedCssDemo}
  code={scopedCssDemo.vue}
  language="html"
  formatCode={false}
></RunInLiveCodes>

### CSS Modules

> A `<style module>` tag is compiled as CSS Modules and exposes the resulting CSS classes to the component as an object under the key of `$style`.
>
> — [docs](https://vuejs.org/api/sfc-css-features.html#css-modules)

export const cssModulesDemo = {
  vue: `<template>\n  <p :class="$style.red">This should be red</p>\n</template>\n\n<style module>\n.red {\n  color: red;\n}\n</style>`,
};

<RunInLiveCodes
  params={cssModulesDemo}
  code={cssModulesDemo.vue}
  language="html"
  formatCode={false}
></RunInLiveCodes>

### CSS Frameworks

[CSS Frameworks](../features/css.html.md)#css-processors) supported in LiveCodes (e.g. [Tailwind CSS](./tailwindcss.html.md), [UnoCSS](./unocss.html.md), [WindiCSS](./windicss.html.md)) can detect class names added in Vue SFCs. Make sure that the required utility is enabled (from style editor menu or in `processors` property of [configuration object](../configuration/configuration-object.html.md)#processors)).

See [example below](#multiple-components).

### Languages and Pre-Processors

> Blocks can declare pre-processor languages using the `lang` attribute.
>
> — [docs](https://vuejs.org/api/sfc-spec.html#pre-processors)

Many of the [languages supported in LiveCodes](./index.html.md) can be used. The value of `lang` attribute can be the language name (specified in its documentation page) or any of its aliases (extensions).

export const processorsDemo = {
  vue: `<template lang="pug">\nh1 {{ msg }}\n</template>\n\n<script lang="ts" setup>\n  const msg: string = 'Hello!'\n</script>\n\n<style lang="scss">\n  $primary-color: #666;\n  body {\n    color: $primary-color;\n  }\n</style>\n`,
};

<RunInLiveCodes
  params={processorsDemo}
  code={processorsDemo.vue}
  language="html"
  formatCode={false}
></RunInLiveCodes>

### JSX

JSX can be used in render functions without needing any configuration.

export const jsxDemo = {
  vue: `<script>\n  export default {\n    data() {\n      return {\n        counter: 0,\n        align: "center",\n      };\n    },\n    methods: {\n      increment() {\n        this.counter += 1;\n      },\n    },\n    render() {\n      return (\n        <div class="container">\n          <h1>Hello, Vue!</h1>\n          <p>You clicked {this.counter} times.</p>\n          <button onClick={this.increment}>Click me</button>\n        </div>\n      );\n    },\n  };\n</script>\n\n<style scoped>\n  .container,\n  .container button {\n    text-align: v-bind("align");\n    font: 1em sans-serif;\n  }\n  .logo {\n    width: 150px;\n  }\n</style>`,
};

<RunInLiveCodes
  params={jsxDemo}
  code={jsxDemo.vue}
  language="html"
  formatCode={false}
></RunInLiveCodes>

### `src` Imports

The src attribute can be used to import an external file for a language block:

```html
<template src="https://my-website.com/template.html"></template>
<style src="https://my-website.com/style.css"></style>
<script src="https://my-website.com/script.js"></script>
```

The value of `src` attribute can be either:

- Absolute URL (e.g. `https://unpkg.com/todomvc-app-css/index.css`)
- Path in npm package (e.g. `todomvc-app-css/index.css`)

Relative paths (e.g. `./my-styles.css`) cannot be used (because there is no file system in LiveCodes).

The imported sources can use any of the supported languages/pre-processors (identified by the file extension or can be specified by `lang` attribute).

### Module Imports

npm modules can be imported as described in the section about [module resolution](../features/module-resolution.html.md), including bare module imports and importing from different CDNs. Stylesheets imported in the `script` block are added as `<link rel="stylesheet">` tags in the page `head`.

Example:

export const importsDemo = {
  vue: `<script setup>\n   import { ref } from 'vue';\n   import confetti from 'canvas-confetti';\n   import "bootstrap/dist/css/bootstrap.css"\n\n   const count = ref(0);\n   function increment() {\n     count.value++;\n     confetti();\n   }\n</script>\n\n<template>\n  <div class="m-5 text-center">\n    <p>You clicked {{ count }} times.</p>\n    <button @click="increment()">Click me</button>\n  </div>\n</template>\n`,
};

<RunInLiveCodes
  params={importsDemo}
  code={importsDemo.vue}
  language="html"
  formatCode={false}
></RunInLiveCodes>

Module imports can be customized using import maps as described in [module resolution](../features/module-resolution.html.md)#custom-module-resolution) documentations.

### Multiple Components

Vue is supported in both [markup](../features/projects.html.md)#markup-editor) and [script](../features/projects.html.md)#script-editor) editors.

This allows having a component in the markup editor that imports (and passes props to) a component in the script editor. The opposite is not supported.

This can be done using relative import of a file name in the same directory. Any file name will resolve to the component in the script editor,
e.g. `./script.vue`, `./Component.vue`, `./Counter.vue`, etc.

export const multi = {
  markup: {
    language: 'vue',
    content: `<script setup>
import Counter from './Counter.vue';
</script>

<template>
  <div class="w-full text-center">
    <Counter start="5" />
  </div>
</template>
`,
},
  script: {
    language: 'vue',
    content: `<script setup lang="ts">
  import { ref } from "vue";
  const props = defineProps({
    start: {
      type: Number,
      default: 0,
    },
  });
  const count = ref(props.start);
</script>

<template>
  <div class="mt-8">
    <span ref="counter" class="text-3xl font-bold">{{ count }}</span>
  </div>
  <div class="mt-4 space-x-4">
    <button title="-" @click="count--" class="text-md font-medium bg-gray-500 hover:bg-gray-600 transition py-1 px-4 text-white rounded drop-shadow-xl">-</button>
    <button title="+" @click="count++" class="text-md font-medium bg-gray-500 hover:bg-gray-600 transition py-1 px-4 text-white rounded drop-shadow-xl">+</button>
  </div>
  <div class="mt-4 space-x-4">
    <button @click="count = props.start" class="text-md font-medium bg-red-500 hover:bg-red-600 transition py-1 px-4 text-white rounded drop-shadow-xl">Reset</button>
  </div>
</template>
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
    title: 'App.vue',
  },
  script: {
    ...multi.script,
    title: 'Counter.vue',
  },
  style: {
    ...multi.style,
    title: 'styles.css',
    order: 3,
  },
};

<LiveCodes config={multiFiles}></LiveCodes>

When both markup and script editors use Vue, the component in the markup editor is used as the main component rendered in the [root element](#root-element).
To render the component in the script editor, it has to be imported and used by the main component.

### Importing External SFCs

External Vue SFCs can be imported. The import URL has to be an absolute URL ending with `.vue` extension. Any bare or relative imports in the imported files are resolved and compiled recursively.

This is an example of importing a Vue SFC, which in turn imports other Vue SFCs (the imported components use Tailwind CSS, which is enabled in this project as a CSS preprocessor):

export const importExternal = {
  activeEditor: 'script',
  script: {
    language: 'vue',
    content: `<script setup>
import Counter from 'https://raw.githubusercontent.com/hatemhosny/simple-vue-counter/main/src/App.vue';
</script>

<template>
  <Counter />
</template>
`
  },
  style: {
    language: 'css',
    content: '@import "tailwindcss";\n',
  },
  processors: ['tailwindcss'],
}

<div style={{ marginBottom: '2em' }}>
  <RunInLiveCodes config={importExternal} style={{ display: 'inline' }}></RunInLiveCodes> {
    ' - '
  } <a
    href="https://github.com/hatemhosny/simple-vue-counter"
    target="_blank"
    rel="noopener noreferrer"
  >
    <>view source on GitHub</>
  </a>

</div>

<LiveCodes config={importExternal}></LiveCodes>

Please note that extensionless imports are not supported. However, you may customize the import URL using import maps as described in [module resolution](../features/module-resolution.html.md)#custom-module-resolution) section.

Example:

```json title="Custom Settings"
{
  "imports": {
    "https://raw.githubusercontent.com/hatemhosny/vue3-samples/master/src/composable/useTodoList": "https://raw.githubusercontent.com/hatemhosny/vue3-samples/master/src/composable/useTodoList.js",
    "https://raw.githubusercontent.com/hatemhosny/vue3-samples/master/src/composable/useMousePosition": "https://raw.githubusercontent.com/hatemhosny/vue3-samples/master/src/composable/useMousePosition.js"
  }
}
```

export const importExternalWithImportMap = {
  activeEditor: 'script',
  script: {
    language: 'vue',
    content: `<script setup>
import App from 'https://raw.githubusercontent.com/hatemhosny/vue3-samples/master/src/App.vue';
</script>

<template>
<App />
</template>
`,
  },
  imports: {
  "https://raw.githubusercontent.com/hatemhosny/vue3-samples/master/src/composable/useTodoList": "https://raw.githubusercontent.com/hatemhosny/vue3-samples/master/src/composable/useTodoList.js",
  "https://raw.githubusercontent.com/hatemhosny/vue3-samples/master/src/composable/useMousePosition": "https://raw.githubusercontent.com/hatemhosny/vue3-samples/master/src/composable/useMousePosition.js"
  }
};

<div style={{ marginBottom: '2em' }}>
  <RunInLiveCodes config={importExternalWithImportMap} style={{ display: 'inline' }}></RunInLiveCodes>{' '}
  {' - '} <a
    href="https://github.com/hatemhosny/vue3-samples"
    target="_blank"
    rel="noopener noreferrer"
  >
    <>view source on GitHub</>
  </a>
</div>

### Importing Data URLs

You may want to import other SFCs without having to host them on a server.
These components can be encoded as [data URLs](https://developer.mozilla.org/en-US/docs/Web/URI/Reference/Schemes/data) and imported as usual.

The data URL has to start with `data:text/vue` to be recognized as a Vue SFC. Any imports in the imported URLs (even if they are also data URLs) are resolved and compiled recursively.

:::info

The code in any code editor can be encoded as data URL from the LiveCodes UI using the "Copy code as data URL" button below the code editor.

:::

This is the previous demo that uses data URLs (with nested imports) instead of external URLs:

export const importDataUrls = {
  activeEditor: 'script',
  script: {
    language: 'vue',
    content: `<script setup>
import Counter from 'data:text/vue;charset=UTF-8;base64,PHNjcmlwdCBzZXR1cCBsYW5nPSJ0cyI+DQppbXBvcnQgeyByZWYgfSBmcm9tICJ2dWUiOw0KaW1wb3J0IFByaW1hcnlCdXR0b24gZnJvbSAiZGF0YTp0ZXh0L3Z1ZTtjaGFyc2V0PVVURi04O2Jhc2U2NCxQSE5qY21sd2RDQnpaWFIxY0NCc1lXNW5QU0owY3lJK0RRcGtaV1pwYm1WUWNtOXdjeWg3RFFvZ0lIUnBkR3hsT2lCN0RRb2dJQ0FnZEhsd1pUb2dVM1J5YVc1bkxBMEtJQ0FnSUdSbFptRjFiSFE2SUNKQ2RYUjBiMjRpTEEwS0lDQjlMQTBLZlNrN0RRbzhMM05qY21sd2RENE5DZzBLUEhSbGJYQnNZWFJsUGcwS0lDQThZblYwZEc5dURRb2dJQ0FnWTJ4aGMzTTlJblJsZUhRdGJXUWdabTl1ZEMxdFpXUnBkVzBnWW1jdFozSmhlUzAxTURBZ2FHOTJaWEk2WW1jdFozSmhlUzAyTURBZ2RISmhibk5wZEdsdmJpQndlUzB4SUhCNExUUWdkR1Y0ZEMxM2FHbDBaU0J5YjNWdVpHVmtJR1J5YjNBdGMyaGhaRzkzTFhoc0lnMEtJQ0ErRFFvZ0lDQWdlM3NnZEdsMGJHVWdmWDBOQ2lBZ1BDOWlkWFIwYjI0K0RRbzhMM1JsYlhCc1lYUmxQZz09IjsNCmltcG9ydCBEYW5nZXJCdXR0b24gZnJvbSAiZGF0YTp0ZXh0L3Z1ZTtjaGFyc2V0PVVURi04O2Jhc2U2NCxQSE5qY21sd2RDQnpaWFIxY0NCc1lXNW5QU0owY3lJK0RRcGtaV1pwYm1WUWNtOXdjeWg3RFFvZ0lIUnBkR3hsT2lCN0RRb2dJQ0FnZEhsd1pUb2dVM1J5YVc1bkxBMEtJQ0FnSUdSbFptRjFiSFE2SUNKQ2RYUjBiMjRpTEEwS0lDQjlMQTBLZlNrN0RRbzhMM05qY21sd2RENE5DZzBLUEhSbGJYQnNZWFJsUGcwS0lDQThZblYwZEc5dURRb2dJQ0FnWTJ4aGMzTTlJblJsZUhRdGJXUWdabTl1ZEMxdFpXUnBkVzBnWW1jdGNtVmtMVFV3TUNCb2IzWmxjanBpWnkxeVpXUXROakF3SUhSeVlXNXphWFJwYjI0Z2NIa3RNU0J3ZUMwMElIUmxlSFF0ZDJocGRHVWdjbTkxYm1SbFpDQmtjbTl3TFhOb1lXUnZkeTE0YkNJTkNpQWdQZzBLSUNBZ0lIdDdJSFJwZEd4bElIMTlEUW9nSUR3dlluVjBkRzl1UGcwS1BDOTBaVzF3YkdGMFpUND0iOw0KDQpjb25zdCBjb3VudCA9IHJlZigwKTsNCjwvc2NyaXB0Pg0KDQo8dGVtcGxhdGU+DQogIDxkaXYgY2xhc3M9InctZnVsbCBtdC04IGZsZXgganVzdGlmeS1jZW50ZXIiPg0KICAgIDxzcGFuIHJlZj0iY291bnRlciIgY2xhc3M9InRleHQtM3hsIGZvbnQtYm9sZCI+e3sgY291bnQgfX08L3NwYW4+DQogIDwvZGl2Pg0KICA8ZGl2IGNsYXNzPSJ3LWZ1bGwgbXQtNCBmbGV4IGZsZXgtcm93IHNwYWNlLXgtNCBqdXN0aWZ5LWNlbnRlciI+DQogICAgPHByaW1hcnktYnV0dG9uIHJlZj0iZGVjcmVtZW50QnV0dG9uIiB0aXRsZT0iLSIgQGNsaWNrPSJjb3VudC0tIiAvPg0KICAgIDxwcmltYXJ5LWJ1dHRvbiByZWY9ImluY3JlbWVudEJ1dHRvbiIgdGl0bGU9IisiIEBjbGljaz0iY291bnQrKyIgLz4NCiAgPC9kaXY+DQogIDxkaXYgY2xhc3M9InctZnVsbCBtdC00IGZsZXggZmxleC1yb3cgc3BhY2UteC00IGp1c3RpZnktY2VudGVyIj4NCiAgICA8ZGFuZ2VyLWJ1dHRvbiByZWY9InJlc2V0QnV0dG9uIiB0aXRsZT0iUmVzZXQiIEBjbGljaz0iY291bnQgPSAwIiAvPg0KICA8L2Rpdj4NCjwvdGVtcGxhdGU+';
</script>

<template>
  <Counter />
</template>
`
  },
  style: {
    language: 'css',
    content: '@import "tailwindcss";\n',
  },
  processors: ['tailwindcss'],
}

<div style={{ marginBottom: '1em' }}>
  <RunInLiveCodes config={importDataUrls} style={{ display: 'inline' }}></RunInLiveCodes>
</div>

<LiveCodes config={importDataUrls}></LiveCodes>

In the above demo, this component is imported:

```
data:text/vue;charset=UTF-8;base64,PHNjcmlwdCBzZXR1cCBsYW5nPSJ0cyI+DQppbXBvcnQgeyByZWYgfSBmcm9tICJ2dWUiOw0KaW1wb3J0IFByaW1hcnlCdXR0b24gZnJvbSAiZGF0YTp0ZXh0L3Z1ZTtjaGFyc2V0PVVURi04O2Jhc2U2NCxQSE5qY21sd2RDQnpaWFIxY0NCc1lXNW5QU0owY3lJK0RRcGtaV1pwYm1WUWNtOXdjeWg3RFFvZ0lIUnBkR3hsT2lCN0RRb2dJQ0FnZEhsd1pUb2dVM1J5YVc1bkxBMEtJQ0FnSUdSbFptRjFiSFE2SUNKQ2RYUjBiMjRpTEEwS0lDQjlMQTBLZlNrN0RRbzhMM05qY21sd2RENE5DZzBLUEhSbGJYQnNZWFJsUGcwS0lDQThZblYwZEc5dURRb2dJQ0FnWTJ4aGMzTTlJblJsZUhRdGJXUWdabTl1ZEMxdFpXUnBkVzBnWW1jdFozSmhlUzAxTURBZ2FHOTJaWEk2WW1jdFozSmhlUzAyTURBZ2RISmhibk5wZEdsdmJpQndlUzB4SUhCNExUUWdkR1Y0ZEMxM2FHbDBaU0J5YjNWdVpHVmtJR1J5YjNBdGMyaGhaRzkzTFhoc0lnMEtJQ0ErRFFvZ0lDQWdlM3NnZEdsMGJHVWdmWDBOQ2lBZ1BDOWlkWFIwYjI0K0RRbzhMM1JsYlhCc1lYUmxQZz09IjsNCmltcG9ydCBEYW5nZXJCdXR0b24gZnJvbSAiZGF0YTp0ZXh0L3Z1ZTtjaGFyc2V0PVVURi04O2Jhc2U2NCxQSE5qY21sd2RDQnpaWFIxY0NCc1lXNW5QU0owY3lJK0RRcGtaV1pwYm1WUWNtOXdjeWg3RFFvZ0lIUnBkR3hsT2lCN0RRb2dJQ0FnZEhsd1pUb2dVM1J5YVc1bkxBMEtJQ0FnSUdSbFptRjFiSFE2SUNKQ2RYUjBiMjRpTEEwS0lDQjlMQTBLZlNrN0RRbzhMM05qY21sd2RENE5DZzBLUEhSbGJYQnNZWFJsUGcwS0lDQThZblYwZEc5dURRb2dJQ0FnWTJ4aGMzTTlJblJsZUhRdGJXUWdabTl1ZEMxdFpXUnBkVzBnWW1jdGNtVmtMVFV3TUNCb2IzWmxjanBpWnkxeVpXUXROakF3SUhSeVlXNXphWFJwYjI0Z2NIa3RNU0J3ZUMwMElIUmxlSFF0ZDJocGRHVWdjbTkxYm1SbFpDQmtjbTl3TFhOb1lXUnZkeTE0YkNJTkNpQWdQZzBLSUNBZ0lIdDdJSFJwZEd4bElIMTlEUW9nSUR3dlluVjBkRzl1UGcwS1BDOTBaVzF3YkdGMFpUND0iOw0KDQpjb25zdCBjb3VudCA9IHJlZigwKTsNCjwvc2NyaXB0Pg0KDQo8dGVtcGxhdGU+DQogIDxkaXYgY2xhc3M9InctZnVsbCBtdC04IGZsZXgganVzdGlmeS1jZW50ZXIiPg0KICAgIDxzcGFuIHJlZj0iY291bnRlciIgY2xhc3M9InRleHQtM3hsIGZvbnQtYm9sZCI+e3sgY291bnQgfX08L3NwYW4+DQogIDwvZGl2Pg0KICA8ZGl2IGNsYXNzPSJ3LWZ1bGwgbXQtNCBmbGV4IGZsZXgtcm93IHNwYWNlLXgtNCBqdXN0aWZ5LWNlbnRlciI+DQogICAgPHByaW1hcnktYnV0dG9uIHJlZj0iZGVjcmVtZW50QnV0dG9uIiB0aXRsZT0iLSIgQGNsaWNrPSJjb3VudC0tIiAvPg0KICAgIDxwcmltYXJ5LWJ1dHRvbiByZWY9ImluY3JlbWVudEJ1dHRvbiIgdGl0bGU9IisiIEBjbGljaz0iY291bnQrKyIgLz4NCiAgPC9kaXY+DQogIDxkaXYgY2xhc3M9InctZnVsbCBtdC00IGZsZXggZmxleC1yb3cgc3BhY2UteC00IGp1c3RpZnktY2VudGVyIj4NCiAgICA8ZGFuZ2VyLWJ1dHRvbiByZWY9InJlc2V0QnV0dG9uIiB0aXRsZT0iUmVzZXQiIEBjbGljaz0iY291bnQgPSAwIiAvPg0KICA8L2Rpdj4NCjwvdGVtcGxhdGU+
```

which imports these:

```
data:text/vue;charset=UTF-8;base64,PHNjcmlwdCBzZXR1cCBsYW5nPSJ0cyI+DQpkZWZpbmVQcm9wcyh7DQogIHRpdGxlOiB7DQogICAgdHlwZTogU3RyaW5nLA0KICAgIGRlZmF1bHQ6ICJCdXR0b24iLA0KICB9LA0KfSk7DQo8L3NjcmlwdD4NCg0KPHRlbXBsYXRlPg0KICA8YnV0dG9uDQogICAgY2xhc3M9InRleHQtbWQgZm9udC1tZWRpdW0gYmctZ3JheS01MDAgaG92ZXI6YmctZ3JheS02MDAgdHJhbnNpdGlvbiBweS0xIHB4LTQgdGV4dC13aGl0ZSByb3VuZGVkIGRyb3Atc2hhZG93LXhsIg0KICA+DQogICAge3sgdGl0bGUgfX0NCiAgPC9idXR0b24+DQo8L3RlbXBsYXRlPg==
```

```
data:text/vue;charset=UTF-8;base64,PHNjcmlwdCBzZXR1cCBsYW5nPSJ0cyI+DQpkZWZpbmVQcm9wcyh7DQogIHRpdGxlOiB7DQogICAgdHlwZTogU3RyaW5nLA0KICAgIGRlZmF1bHQ6ICJCdXR0b24iLA0KICB9LA0KfSk7DQo8L3NjcmlwdD4NCg0KPHRlbXBsYXRlPg0KICA8YnV0dG9uDQogICAgY2xhc3M9InRleHQtbWQgZm9udC1tZWRpdW0gYmctcmVkLTUwMCBob3ZlcjpiZy1yZWQtNjAwIHRyYW5zaXRpb24gcHktMSBweC00IHRleHQtd2hpdGUgcm91bmRlZCBkcm9wLXNoYWRvdy14bCINCiAgPg0KICAgIHt7IHRpdGxlIH19DQogIDwvYnV0dG9uPg0KPC90ZW1wbGF0ZT4=
```

### Root Element

To [mount](https://vuejs.org/api/application.html#app-mount) the application instance to a specific DOM element use `"livecodes-app"` as the element `id` in the HTML. Otherwise, if that element is not found, a new `div` element is added to `document.body` and is used to mount the instance.

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
    language: 'vue',
    content: `<template>I'm a Vue SFC</template>`,
  },
};

<LiveCodes config={customRoot} />

## Language Info

### Name

`vue`

### Extensions

`.vue`, `.vue3`

### Editor

`script`, `markup`

## Compiler

The official [@vue/compiler-sfc](https://github.com/vuejs/core/tree/main/packages/compiler-sfc).

### Version

`@vue/compiler-sfc`: v3.5.22

## Code Formatting

Using [Prettier](https://prettier.io/).

## Limitations

Currently, Vue support has the following limitations:

- SSR is not supported.
- The [`defineProps()`](https://vuejs.org/guide/components/props#props-declaration) macro cannot infer props from TypeScript types not defined in the same file.

[PRs are welcome](https://github.com/live-codes/livecodes/issues/757).

## Starter Template

https://livecodes.io/?template=vue

## Links

- [Vue.js](https://vuejs.org/)
- [Vue SFC specs](https://vuejs.org/api/sfc-spec.html)
- [CSS Modules](https://github.com/css-modules/css-modules)