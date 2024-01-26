# Vue 3 SFC

[Vue.js](https://vuejs.org/), The Progressive JavaScript Framework, is an approachable, performant and versatile framework for building web user interfaces.

This is the documentation for LiveCodes language support for Vue [Single-File Component (SFC)](https://vuejs.org/api/sfc-spec.html). The support for Vue 2 SFC is [documented separately](./vue2.md).

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

export const scopedCssDemo = { vue: `<style scoped>\n.example {\n  color: red;\n}\n</style>\n\n<template>\n  <div class="example">hi</div>\n</template>` }

<RunInLiveCodes params={scopedCssDemo} code={scopedCssDemo.vue} language="html" formatCode={false}></RunInLiveCodes>

### CSS Modules

> A `<style module>` tag is compiled as CSS Modules and exposes the resulting CSS classes to the component as an object under the key of `$style`.
>
> — [docs](https://vuejs.org/api/sfc-css-features.html#css-modules)

export const cssModulesDemo = { vue: `<template>\n  <p :class="$style.red">This should be red</p>\n</template>\n\n<style module>\n.red {\n  color: red;\n}\n</style>` }

<RunInLiveCodes params={cssModulesDemo} code={cssModulesDemo.vue} language="html" formatCode={false}></RunInLiveCodes>

### CSS Frameworks

[CSS Frameworks](../features/css.md#css-processors) supported in LiveCodes (e.g. [Tailwind CSS](./tailwindcss.md), [UnoCSS](./unocss.md), [WindiCSS](./windicss.md)) can detect class names added in Vue SFCs. Make sure that the required utility is enabled (from style editor menu or in `processors` property of [configuration object](../configuration/configuration-object.md#processors)) and that required [directives](https://tailwindcss.com/docs/functions-and-directives#tailwind) are added to the style editor.

See [example below](#importing-vue-sfcs).

### Languages and Pre-Processors

> Blocks can declare pre-processor languages using the `lang` attribute.
>
> — [docs](https://vuejs.org/api/sfc-spec.html#pre-processors)

Many of the [languages supported in LiveCodes](./index.md) can be used. The value of `lang` attribute can be the language name (specified in its documentation page) or any of its aliases (extensions).

export const processorsDemo = { vue: `<template lang="pug">\nh1 {{ msg }}\n</template>\n\n<script lang="ts" setup>\n  const msg: string = 'Hello!'\n</script>\n\n<style lang="scss">\n  $primary-color: #666;\n  body {\n    color: $primary-color;\n  }\n</style>\n` }

<RunInLiveCodes params={processorsDemo} code={processorsDemo.vue} language="html" formatCode={false}></RunInLiveCodes>

### JSX

JSX can be used in render functions without needing any configuration.

export const jsxDemo = { vue: `<script>\n  export default {\n    data() {\n      return {\n        counter: 0,\n        align: "center",\n      };\n    },\n    methods: {\n      increment() {\n        this.counter += 1;\n      },\n    },\n    render() {\n      return (\n        <div class="container">\n          <h1>Hello, Vue!</h1>\n          <p>You clicked {this.counter} times.</p>\n          <button onClick={this.increment}>Click me</button>\n        </div>\n      );\n    },\n  };\n</script>\n\n<style scoped>\n  .container,\n  .container button {\n    text-align: v-bind("align");\n    font: 1em sans-serif;\n  }\n  .logo {\n    width: 150px;\n  }\n</style>` }

<RunInLiveCodes params={jsxDemo} code={jsxDemo.vue} language="html" formatCode={false}></RunInLiveCodes>

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

npm modules can be imported as described in the section about [module resolution](../features/module-resolution.md), including bare module imports and importing from different CDNs. Stylesheets imported in the `script` block are added as `<link rel="stylesheet">` tags in the page `head`.

Example:

export const importsDemo = { vue: `<script setup>\n   import { ref } from 'vue';\n   import confetti from 'canvas-confetti';\n   import "bootstrap/dist/css/bootstrap.css"\n\n   const count = ref(0);\n   function increment() {\n     count.value++;\n     confetti();\n   }\n</script>\n\n<template>\n  <div class="m-5 text-center">\n    <p>You clicked {{ count }} times.</p>\n    <button @click="increment()">Click me</button>\n  </div>\n</template>\n` }

<RunInLiveCodes params={importsDemo} code={importsDemo.vue} language="html" formatCode={false}></RunInLiveCodes>

Module imports can be customized using import maps as described in [module resolution](../features/module-resolution.md#custom-module-resolution) documentations.

### Importing Vue SFCs

Other Vue SFCs can be imported. The import URL has to be an absolute URL ending with `.vue` extension. Any bare or relative imports in the imported files are resolved and compiled recursively.

This is an example of importing a Vue SFC, which in turn imports other Vue SFCs (the imported components use Tailwind CSS, which is enabled in this project as a CSS preprocessor):

<RunInLiveCodes params={{x:"id/2af5rqradrs"}} style={{display:'inline'}}></RunInLiveCodes> - <a href="https://github.com/hatemhosny/simple-vue-counter" target="_blank" rel="noopener noreferrer">view source on GitHub</a><br /><br />

<LiveCodes import="id/2af5rqradrs"></LiveCodes>

Please note that extensionless imports are not supported. However, you may customize the import URL using import maps as described in [module resolution](../features/module-resolution.md#custom-module-resolution) section.

This is an example of importing a Vue SFC, which in turn imports other Vue SFCs and extensionless imports, that are customized using importmap:

```json title="Custom Settings"
{
  "imports": {
    "https://raw.githubusercontent.com/hatemhosny/vue3-samples/master/src/composable/useTodoList": "https://raw.githubusercontent.com/hatemhosny/vue3-samples/master/src/composable/useTodoList.js",
    "https://raw.githubusercontent.com/hatemhosny/vue3-samples/master/src/composable/useMousePosition": "https://raw.githubusercontent.com/hatemhosny/vue3-samples/master/src/composable/useMousePosition.js"
  }
}
```

<RunInLiveCodes params={{x:"id/d72xp4wbinp"}} style={{display:'inline'}}></RunInLiveCodes> - <a href="https://github.com/hatemhosny/vue3-samples" target="_blank" rel="noopener noreferrer">view source on GitHub</a><br /><br />

<LiveCodes import="id/d72xp4wbinp"></LiveCodes>

### Root Element

To [mount](https://vuejs.org/api/application.html#app-mount) the application instance to a specific DOM element use `"livecodes-app"` as the element `id`. Otherwise, if that element is not found, a new `div` element is added to `document.body` and is used to mount the instance.

## Language Info

### Name

`vue`

### Extensions

`.vue`, `.vue3`

### Editor

`script`

## Compiler

The official [@vue/compiler-sfc](https://github.com/vuejs/core/tree/main/packages/compiler-sfc).

### Version

`@vue/compiler-sfc`: v3.3.4

## Code Formatting

Using [Prettier](https://prettier.io/).

## Limitations

Currently, SSR is not supported.

## Starter Template

https://livecodes.io/?template=vue

## Links

- [Vue.js](https://vuejs.org/)
- [Vue SFC specs](https://vuejs.org/api/sfc-spec.html)
- [CSS Modules](https://github.com/css-modules/css-modules)
