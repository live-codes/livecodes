# Go (Wasm)

[Go](https://go.dev/) (Golang), is an open-source, statically typed, and compiled programming language developed by Google. It is designed for simplicity, efficiency, and strong support for concurrency, making it well-suited for building scalable and high-performance applications.

LiveCodes uses [Yaegi](https://github.com/traefik/yaegi), the Go interpreter (running on WebAssembly), to run Go in the browser.

:::info Note

LiveCodes also supports running Go using [GopherJS](https://github.com/gopherjs/gopherjs) which is a Go to JavaScript compiler. Read documentation [here](./go.html.md).

:::

## Demo

import LiveCodes from '../../src/components/LiveCodes.tsx';

export const params = {
  'go-wasm': 'package main\n\nimport "fmt"\n\nfunc main() {\n\tfmt.Println("Hello, World!")\n}\n',
  console: 'full',
};

<LiveCodes params={params}></LiveCodes>

## Usage

LiveCodes runs Go in the browser, including the [standard library](https://pkg.go.dev/std).


### Communication with JavaScript

The Go code runs in the context of the [result page](../features/result.html.md).
A few helper properties and methods are available in the browser global `livecodes.goWasm` object:

- `livecodes.goWasm.input`: the initial standard input that is passed to the Go code.
- `livecodes.goWasm.loaded`: A promise that resolves when the Go environment is loaded. Any other helpers should be used after this promise resolves.
- `livecodes.goWasm.output`: the standard output.
- `livecodes.goWasm.error`: the standard error.
- `livecodes.goWasm.exitCode`: the exit code.
- `livecodes.goWasm.run`: a function that runs the Go code with new input. This function takes a string as input and returns a promise that resolves when the Go code is done running. The promise resolves with an object containing the `input`, `output`, `error`, and `exitCode` properties.

See the [example below](#example-usage) for more details.

## Language Info

### Name

`go-wasm`

### Extensions

`wasm.go`, `go-wasm`, `gowasm`

### Editor

`script`

## Compiler

[Yaegi](https://github.com/traefik/yaegi), compiled to WebAssembly ([yaegi-wasm](https://github.com/Muhammad-Ayman/yaegi-wasm))

### Version

Yaegi v0.16.1, running go1.25.0

## Code Formatting

Using [GopherJS](https://github.com/gopherjs/gopherjs)

## Example Usage

This example demonstrates standard library usage and JavaScript interoperability (also check the code in the HTML editor):

<LiveCodes template="go-wasm" height="80vh"></LiveCodes>


## Live Reload

By default, new code changes are sent to the result page for re-evaluation without a full page reload, to avoid the need to reload the Go environment.

This behavior can be disabled by adding the code comment `// __livecodes_reload__` to the code, which will force a full page reload.
This comment can be added in the [`hiddenContent` property of the editor](../configuration/configuration-object.html.md)#markup) for embedded playgrounds.

## Starter Template

https://livecodes.io/?template=go-wasm

## Links

- [Go](https://go.dev/)
- [Go documentation](https://go.dev/doc/)
- [Go standard library](https://pkg.go.dev/std)
- [Yaegi](https://github.com/traefik/yaegi)
- [Go using GopherJS](./go.html.md) in LiveCodes