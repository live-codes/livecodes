# ClojureScript

[ClojureScript](https://clojurescript.org/) is a robust, practical, and fast programming language with a set of useful features that together form a simple, coherent, and powerful tool.

ClojureScript is a compiler for [Clojure](https://clojure.org/) that targets
JavaScript. <br />In LiveCodes, it runs in the browser using
[Cherry](https://github.com/squint-cljs/cherry).

:::info Note

Lisp language family supported in LiveCodes includes [Common Lisp](./commonlisp.md), [Scheme](./scheme.md), [ClojureScript](./clojurescript.md) and [Fennel](./fennel.md).

:::

## Language Info

### Name

`clojurescript`

### Extensions

`cljs`, `cljc`, `clj`, `edn`, `clojure`

### Editor

`script`

## Compiler

[Cherry](https://github.com/squint-cljs/cherry)

If `JSX` is used (using `#jsx` reader tag - [example](https://github.com/squint-cljs/cherry/blob/60adcf6e3a8fb940a80c6a193599da0272fe3058/examples/jsx/pages/component.cljs)), it is also compiled ([JSX](./jsx.md)). See [example usage](#example-usage).

### Version

`cherry-cljs`: v0.0.3

## Code Formatting

Using [Parinfer](https://shaunlebron.github.io/parinfer/).

## Example Usage

import LiveCodes from '../../src/components/LiveCodes.tsx';

export const params = {
cljs: `(ns demo\n${'  '};; you can use npm modules\n${'  '}(:require ["canvas-confetti$default" :as confetti]))\n\n(let [el (js/document.getElementById "test")]\n${'  '}(.addEventListener el "click"\n ${'   '}(fn []\n ${'     '}(confetti)\n${'      '}(println "test"))))\n`,
html: '<button id="test">test</button>',
console: 'open',
};

<LiveCodes params={params}></LiveCodes>

Using React (with JSX):

<LiveCodes template="clojurescript"></LiveCodes>

## Starter Template

https://livecodes.io/?template=clojurescript

## Links

- [ClojureScript official website](https://clojurescript.org/)
- [Clojure official website](https://clojure.org/)
- [Cherry repo](https://github.com/squint-cljs/cherry)
