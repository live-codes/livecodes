# Fennel

[Fennel](https://fennel-lang.org/) is a programming language that brings together the speed, simplicity, and reach of [Lua](https://www.lua.org/) with the flexibility of a [lisp syntax and macro system](<https://en.wikipedia.org/wiki/Lisp_(programming_language)>).

Fennel code is compiled to Lua, which then runs in the browser using [Fengari](https://fengari.io/). See documentation for Lua language support in LiveCodes [here](./lua.html.md).

:::info Note

Lisp language family supported in LiveCodes includes [Common Lisp](./commonlisp.html.md), [Scheme](./scheme.html.md), [ClojureScript](./clojurescript.html.md) and [Fennel](./fennel.html.md).

:::

## Usage

JavaScript interoperability and DOM access is achieved using [`"js"` module](https://github.com/fengari-lua/fengari-interop).

import LiveCodes from '../../src/components/LiveCodes.tsx';

This example demonstrates usage, JavaScript interoperability and DOM access:

<LiveCodes template="fennel" height="80vh"></LiveCodes>

## Language Info

### Name

`fennel`

### Extension

`.fnl`

### Editor

`script`

## Compiler

[Fennel](https://fennel-lang.org/)

### Version

Fennel v1.3.0

## Code Formatting

Using [Parinfer](https://shaunlebron.github.io/parinfer/).

## Starter Template

https://livecodes.io/?template=fennel

## Links

- [Fennel](https://fennel-lang.org/)
- [Fennel tutorial](https://fennel-lang.org/tutorial)
- [Lua](https://www.lua.org/)
- [Fengari](https://fengari.io/)
- [lua](./lua.html.md) in LiveCodes
- [Common Lisp](./commonlisp.html.md) in LiveCodes