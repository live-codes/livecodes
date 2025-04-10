# Scheme

[Scheme](https://www.scheme.org/) is a classic programming language in the Lisp family. It emphasizes functional programming and domain-specific languages but adapts to other styles.

In LiveCodes, Scheme code runs in the browser using [BiwaScheme](https://www.biwascheme.org/), a Scheme interpreter written in JavaScript.

:::info Note

Lisp language family supported in LiveCodes includes [Common Lisp](./commonlisp.html.md), [Scheme](./scheme.html.md), [ClojureScript](./clojurescript.html.md) and [Fennel](./fennel.html.md).

:::

## Usage

LiveCodes runs Scheme code in the browser. BiwaScheme [implements](https://www.biwascheme.org/doc/features.html) most of the features of [R7RS small](https://small.r7rs.org/), including first-class continuation and tail call optimization.

**Example:**

import LiveCodes from '../../src/components/LiveCodes.tsx';

export const basicSchemeDemo = {
  activeEditor: 'script',
  markup: {
    language: 'html',
    content: `<div class="container">
  <h1>Hello, <span id="title">World</span>!</h1>
  <img class="logo" alt="logo" src="https://livecodes.io/livecodes/assets/templates/scheme.svg" />
  <p>You clicked <span id="counter">0</span> times.</p>
  <button id="counter-button">Click me</button>
</div>
`,
  },
  style: {
    language: 'css',
    content: `.container,
.container button {
  text-align: center;
  font: 1em sans-serif;
}
.logo {
  width: 150px;
}
`,
  },
  script: {
    language: 'scheme',
    content: `(let ((title "Scheme"))
  (set-content! "#title" title))

(let ((counter 0))
(add-handler! "#counter-button" "click"
(lambda (ev)
(set! counter (+ counter 1))
(set-content! "#counter" (number->string counter)))))

; check console
(let ((time-now (date-hour (current-date))))
(console-log
(cond ((< time-now 12) "Good morning")
((< time-now 18) "Good afternoon")
(else "Good evening"))))
`
}
}

<LiveCodes config={basicSchemeDemo} height="70vh"></LiveCodes>

### JS Interoperability

See [BiwaScheme docs](https://www.biwascheme.org/doc/features.html#javascript-language-interface).

## Language Info

### Name

`scheme`

### Extensions

`.scm`

### Editor

`script`

## Compiler

[BiwaScheme](https://www.biwascheme.org/), a Scheme interpreter written in JavaScript.

### Version

`biwascheme`: v0.8.0

## Code Formatting

Using [Parinfer](https://shaunlebron.github.io/parinfer/).

## Limitations

BiwaScheme implements most of the features of R7RS small, however some features are not supported.
See the [BiwaScheme documentation](https://github.com/biwascheme/biwascheme#conformance) for more information.

## Starter Template

https://livecodes.io/?template=scheme

## Links

- [Scheme Programming Language](https://www.scheme.org/)
- [BiwaScheme](https://www.biwascheme.org/)
- [The Scheme Programming Language (4th Edition)](https://www.scheme.com/tspl4/)
- [Structure and Interpretation of Computer Programs](https://mitp-content-server.mit.edu/books/content/sectbyfn/books_pres_0/6515/sicp.zip/index.html)