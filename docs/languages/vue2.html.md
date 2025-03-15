# Vue 2 SFC

[Vue.js](https://vuejs.org/), The Progressive JavaScript Framework, is an approachable, performant and versatile framework for building web user interfaces.

This is the documentation for LiveCodes language support for the older **Vue 2** [Single-File Component (SFC)](https://v2.vuejs.org/v2/guide/single-file-components.html). For the latest Vue SFC head to [Vue 3 SFC documentations](./vue.html.md).

:::caution

Please note that, officially, Vue 2 has reached [End of Life (EOL)](https://v2.vuejs.org/eol/) on December 31st, 2023.

:::

## Important Note

Vue 2 SFC language support in LiveCodes is different from that for Vue 3.

Unlike Vue 3, which uses the official SFC compiler ([@vue/compiler-sfc](https://github.com/vuejs/core/tree/main/packages/compiler-sfc)) to compile SFC to regular JavaScript which is then sent to the result page, Vue 2 SFC support uses [vue3-sfc-loader](https://github.com/FranckFreiburger/vue3-sfc-loader), which is loaded in the result page and the SFC is compiled on the fly in the end user's browser. This has a significant performance impact.

[vue3-sfc-loader](https://github.com/FranckFreiburger/vue3-sfc-loader) is currently at version 0.8.4, which is compatible with Vue 2 version 2.6.14.
Vue 2.7 is not supported.

## Usage

Vue 2 SFC support includes Scoped CSS, pre-processors, JSX and `src` imports.

## Language Info

### Name

`vue2`

### Extensions

`.vue2`

### Editor

`script`

## Compiler

[vue3-sfc-loader](https://github.com/FranckFreiburger/vue3-sfc-loader).

### Version

`vue3-sfc-loader`: v0.9.5, which is compatible with Vue v2.6.14

## Code Formatting

Using [Prettier](https://prettier.io/).

## Links

- [Vue 2 docs](https://v2.vuejs.org/)
- [Vue 2 SFC](https://v2.vuejs.org/v2/guide/single-file-components.html)