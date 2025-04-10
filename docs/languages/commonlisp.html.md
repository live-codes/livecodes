# Common Lisp

[Common Lisp](https://common-lisp.net/) is a dialect of the Lisp programming language.

In LiveCodes, Common Lisp code runs in the browser using [JSCL](https://github.com/jscl-project/jscl), a Common Lisp to JavaScript compiler.

:::info Note

Lisp language family supported in LiveCodes includes [Common Lisp](./commonlisp.html.md), [Scheme](./scheme.html.md), [ClojureScript](./clojurescript.html.md) and [Fennel](./fennel.html.md).

:::

## Usage

LiveCodes runs Common Lisp code in the browser. JSCL implements a subset of Common Lisp, but covers enough functionality to write practical code.

import LiveCodes from '../../src/components/LiveCodes.tsx';

This example demonstrates basic Common Lisp syntax and functionality:

<LiveCodes template="commonlisp" height="80vh"></LiveCodes>

### JS Interoperability

Please see [JSCL docs](https://github.com/jscl-project/jscl/wiki/JSCL-and-manipulations-with-JS-objects)

## Language Info

### Name

`commonlisp`

### Aliases/Extensions

`common-lisp`, `lisp`

### Editor

`script`

## Compiler

[JSCL](https://github.com/jscl-project/jscl) - Common Lisp to JavaScript compiler

## Code Formatting

Using [Parinfer](https://shaunlebron.github.io/parinfer/).

## Limitations

Since JSCL is a subset of Common Lisp, it doesn't implement all Common Lisp features. See the [JSCL documentation](https://github.com/jscl-project/jscl#status) for more information.

## Starter Template

https://livecodes.io/?template=commonlisp

## Links

- [Common Lisp](https://common-lisp.net/)
- [JSCL](https://github.com/jscl-project/jscl)
- [Common Lisp: A Gentle Introduction to Symbolic Computation](https://www.cs.cmu.edu/~dst/LispBook/)
- [Practical Common Lisp](http://www.gigamonkeys.com/book/)