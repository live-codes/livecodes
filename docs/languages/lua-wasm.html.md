# Lua (Wasm)

[Lua](https://www.lua.org/) is a powerful, efficient, lightweight, embeddable scripting language. It supports procedural programming, object-oriented programming, functional programming, data-driven programming, and data description.

LiveCodes can run Lua in the browser using [Wasmoon](https://github.com/ceifa/wasmoon).

> Wasmoon is a real Lua 5.4 VM with JS bindings made with [WebAssembly](https://webassembly.org/).
>
> [github.com/ceifa/wasmoon](https://github.com/ceifa/wasmoon)

:::info Note

LiveCodes also supports running Lua using [Fengari](https://fengari.io/) which is the Lua VM written in JavaScript. Read documentation [here](./lua.html.md)

:::

## Usage

LiveCodes runs Lua in the browser. JavaScript interoperability and DOM access is achieved using the global variable `window` which exposes the page `window` object.

import LiveCodes from '../../src/components/LiveCodes.tsx';

This example demonstrates usage, JavaScript interoperability and DOM access:

<LiveCodes template="lua-wasm" height="80vh"></LiveCodes>

## Language Info

### Name

`lua-wasm`

### Alias

`luawasm`

### Extension

`.wasm.lua`

### Editor

`script`

## Compiler

[Wasmoon](https://github.com/ceifa/wasmoon)

### Version

Wasmoon v1.16.0

## Code Formatting

Using [`lua-fmt`](https://github.com/trixnz/lua-fmt).

## Starter Template

https://livecodes.io/?template=lua-wasm

## Links

- [Lua](https://www.lua.org/)
- [Lua documentation](https://www.lua.org/docs.html)
- [wasmoon](https://github.com/ceifa/wasmoon)
- [Lua (using Fengari)](./lua.html.md) in LiveCodes