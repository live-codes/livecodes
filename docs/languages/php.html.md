# PHP

import LiveCodes from '../../src/components/LiveCodes.tsx';

PHP running client-side in the browser using [Uniter](https://phptojs.com/).

Uniter is a light-weight PHP-to-JavaScript transpiler and runtime with JavaScript interoperability and client-side DOM manipulation. However, only a small subset of PHP's standard library is supported.

:::info Note

If you need better standard library support, you may want to use [`php-wasm`](./php-wasm.html.md).

`php-wasm` runs PHP in the browser using WebAssembly. This matches the behavior of the official PHP interpreter and allows using PHP's standard library. However, it requires relatively large download and has limited capabilities for client-side DOM manipulation.

:::

## Usage

### JavaScript Interoperability

Example:

<LiveCodes template="php" height="80vh"></LiveCodes>

## Language Info

### Name

`php`

### Extension

`.php`

### Editor

`script`

## Compiler

[Uniter](https://phptojs.com/)

### Version

Uniter v2.18.0

## Code Formatting

Using [prettier](https://prettier.io/) and [Prettier PHP Plugin](https://github.com/prettier/plugin-php).

## Starter Template

https://livecodes.io/?template=php

## Links

- [PHP](https://php.net/)
- [PHP documentation](https://www.php.net/manual/en/)
- [Uniter](https://phptojs.com/)
- [PHP using `php-wasm`](./php-wasm.html.md) in LiveCodes