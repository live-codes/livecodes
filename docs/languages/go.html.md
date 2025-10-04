# Go (Golang)

[Go](https://go.dev/) (Golang), is an open-source, statically typed, and compiled programming language developed by Google. It is designed for simplicity, efficiency, and strong support for concurrency, making it well-suited for building scalable and high-performance applications.

LiveCodes uses [GopherJS](https://github.com/gopherjs/gopherjs) which is a Go to JavaScript compiler, to run Go in the browser.

:::info Note

LiveCodes also supports running Go using [Yaegi](https://github.com/traefik/yaegi), the Go interpreter (running on WebAssembly). Read documentation [here](./go-wasm.html.md).

:::

## Demo

import LiveCodes from '../../src/components/LiveCodes.tsx';

export const params = {
  'go': 'package main\n\nimport "fmt"\n\nfunc main() {\n\tfmt.Println("Hello, World!")\n}\n',
  console: 'full',
};

<LiveCodes params={params}></LiveCodes>

## Usage

LiveCodes runs Go in the browser, including the [standard library](https://pkg.go.dev/std).

JavaScript interoperability and DOM access is achieved using [package `js`](https://pkg.go.dev/syscall/js) (see the [example below](#example-usage)).

## Language Info

### Name

`go`

### Extensions

`go`, `golang`

### Editor

`script`

## Compiler

[GopherJS](https://github.com/gopherjs/gopherjs), the Go to JavaScript compiler.

### Version

GopherJS v1.19.0 beta1, running Go 1.19.13

## Code Formatting

Using [GopherJS](https://github.com/gopherjs/gopherjs)

## Example Usage

This example demonstrates standard library usage, JavaScript interoperability and DOM access:

<LiveCodes template="go" height="80vh"></LiveCodes>

## Starter Template

https://livecodes.io/?template=go

## Links

- [Go](https://go.dev/)
- [Go documentation](https://go.dev/doc/)
- [Go standard library](https://pkg.go.dev/std)
- [GopherJS](https://github.com/gopherjs/gopherjs)
- [Go using Yaegi](./go-wasm.html.md) in LiveCodes