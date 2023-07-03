# Vue 3 SFC

[Vue.js](https://vuejs.org/), The Progressive JavaScript Framework, is an approachable, performant and versatile framework for building web user interfaces.

LiveCodes supports Vue [Single-File Component (SFC)](https://vuejs.org/api/sfc-spec.html). In addition, Vue 2 SFC is [also supported](./vue2.md).

## Usage

The Vue SFC is compiled as per the [specs](https://vuejs.org/api/sfc-spec.html), including support for [Scoped CSS](https://vuejs.org/api/sfc-css-features.html#scoped-css), [CSS Modules](https://vuejs.org/api/sfc-css-features.html#css-modules), [pre-processors](https://vuejs.org/api/sfc-spec.html#pre-processors), [JSX](https://vuejs.org/guide/extras/render-function.html#jsx-tsx) and [`src` imports](https://vuejs.org/api/sfc-spec.html#src-imports). See below for usage.

### Demo

import LiveCodes from '../../src/components/LiveCodes.tsx';
import RunInLiveCodes from '../../src/components/RunInLiveCodes.tsx';

<LiveCodes template="vue" height="400"></LiveCodes>

### Scoped CSS

From [docs](https://vuejs.org/api/sfc-css-features.html#scoped-css): When a `<style>` tag has the scoped attribute, its CSS will apply to elements of the current component only.

export const scopedCssDemo = { vue: `<style scoped>\n.example {\n  color: red;\n}\n</style>\n\n<template>\n  <div class="example">hi</div>\n</template>` }

<RunInLiveCodes params={scopedCssDemo} code={scopedCssDemo.vue} language="html" formatCode={false}></RunInLiveCodes>

### CSS Modules

From [docs](https://vuejs.org/api/sfc-css-features.html#css-modules): A `<style module>` tag is compiled as CSS Modules and exposes the resulting CSS classes to the component as an object under the key of `$style`:

export const cssModulesDemo = { vue: `<template>\n  <p :class="$style.red">This should be red</p>\n</template>\n\n<style module>\n.red {\n  color: red;\n}\n</style>` }

<RunInLiveCodes params={cssModulesDemo} code={cssModulesDemo.vue} language="html" formatCode={false}></RunInLiveCodes>

### Pre-Processors

From [docs](https://vuejs.org/api/sfc-spec.html#pre-processors): Blocks can declare pre-processor languages using the `lang` attribute.

Most of the [languages supported in LiveCodes](./index.md) can be used. The value of `lang` attribute can be the language name (specified in its documentation page) or any of its aliases (extensions).

export const processorsDemo = { vue: `<template lang="pug">\nh1 {{ msg }}\n</template>\n\n<script lang="ts" setup>\n  const msg: string = 'Hello!'\n</script>\n\n<style lang="scss">\n  $primary-color: #666;\n  body {\n    color: $primary-color;\n  }\n</style>\n` }

<RunInLiveCodes params={processorsDemo} code={processorsDemo.vue} language="html" formatCode={false}></RunInLiveCodes>

### JSX

export const jsxDemo = { vue: `<script>\n  export default {\n    data() {\n      return {\n        counter: 0,\n        align: "center",\n      };\n    },\n    methods: {\n      increment() {\n        this.counter += 1;\n      },\n    },\n    render() {\n      return (\n        <div class="container">\n          <h1>Hello, Vue!</h1>\n          <p>You clicked {this.counter} times.</p>\n          <button onClick={this.increment}>Click me</button>\n        </div>\n      );\n    },\n  };\n</script>\n\n<style scoped>\n  .container,\n  .container button {\n    text-align: v-bind("align");\n    font: 1em sans-serif;\n  }\n  .logo {\n    width: 150px;\n  }\n</style>` }

<RunInLiveCodes params={jsxDemo} code={jsxDemo.vue} language="html" formatCode={false}></RunInLiveCodes>

### `src` Imports

### Root Element

To [mount](https://vuejs.org/api/application.html#app-mount) the application instance to a specific DOM element use `livecodes-app` as the element ID. Otherwise, if that element is not found, a new `div` element is added to `document.body` and is used to mount the instance.

## Language Info

### Name

`vue`

### Extensions

`vue`, `vue3`

### Editor

`script`

## Compiler

The official [@vue/compiler-sfc](https://github.com/vuejs/core/tree/main/packages/compiler-sfc).

### Version

`@vue/compiler-sfc`: v3.3.4

## Code Formatting

Using [Prettier](https://prettier.io/).

## Limitations

Currently SSR is not supported.

## Example Usage

export const params = {};

<LiveCodes params={params}></LiveCodes>

## Starter Template

https://livecodes.io/?template=vue

## Links

- [Vue.js](https://vuejs.org/)
- [CSS Modules](https://github.com/css-modules/css-modules)
