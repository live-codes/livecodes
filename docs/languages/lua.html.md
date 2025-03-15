# Lua

[Lua](https://www.lua.org/) is a powerful, efficient, lightweight, embeddable scripting language. It supports procedural programming, object-oriented programming, functional programming, data-driven programming, and data description.

LiveCodes runs Lua in the browser using [Fengari](https://fengari.io/).

> Fengari (Moon in greek) is the Lua VM written in JavaScript. It uses JavaScript's garbage collector so that interoperability with the DOM is non-leaky.
>
> [fengari.io](https://fengari.io/)

:::info Note

LiveCodes also supports running Lua using [Wasmoon](https://github.com/ceifa/wasmoon) which is a real Lua 5.4 VM with JS bindings made with WebAssembly. Read documentation [here](./lua-wasm.html.md)

:::

## Usage

LiveCodes runs Lua in the browser. JavaScript interoperability and DOM access is achieved using [`"js"` module](https://github.com/fengari-lua/fengari-interop).

import LiveCodes from '../../src/components/LiveCodes.tsx';

This example demonstrates usage, JavaScript interoperability and DOM access:

<LiveCodes template="lua" height="80vh"></LiveCodes>

## Language Info

### Name

`lua`

### Extension

`.lua`

### Editor

`script`

## Compiler

[Fengari](https://fengari.io/)

### Version

Fengari v0.1.4

## Code Formatting

Using [`lua-fmt`](https://github.com/trixnz/lua-fmt).

## Starter Template

https://livecodes.io/?template=lua

## Links

- [Lua](https://www.lua.org/)
- [Lua documentation](https://www.lua.org/docs.html)
- [Fengari](https://fengari.io/)
- [lua-wasm](./lua-wasm.html.md) in LiveCodes