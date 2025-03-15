# PHP (Wasm)

import LiveCodes from '../../src/components/LiveCodes.tsx';

PHP in Browser, powered by WebAssembly (using [php-wasm](https://github.com/seanmorris/php-wasm)).

`php-wasm` runs PHP in the browser using [WebAssembly](https://webassembly.org/). This matches the behavior of the official PHP interpreter and allows using PHP's standard library. However, it requires relatively large download and has limited capabilities for client-side DOM manipulation.

:::info Note

If you need a lighter-weight interpreter with more capable client-side DOM manipulation in PHP and do not need to use PHP's standard library, you may want to use the [PHP interpreter written in JavaScript](./php.html.md).

:::

## Usage

### Standard Library

The PHP standard library is supported.

```php
<?php
phpinfo();
```

{/* prettier-ignore-start */}
export const infoConfig = {script: {language: "php-wasm", content: `<?php\n\nphpinfo();`}, activeEditor: "script", mode: "result"};

{/* prettier-ignore-end */}

<LiveCodes config={infoConfig} height="80vh"></LiveCodes>

### JavaScript Interoperability

[JavaScript Interoperability](https://github.com/seanmorris/php-wasm#accessing-the-dom) is achieved via the [VRZNO](https://github.com/seanmorris/vrzno) php extension.

Example:

{/* prettier-ignore-start */}
export const jsOpParams = { phpwasm: `<?php\n\n// read from DOM\n$oldTitle = vrzno_eval('document.querySelector("#title").innerText');\necho $oldTitle;\n\n$newTitle = 'Changed@' . date('h:i:s');\n\n// set DOM properties\nvrzno_eval('document.querySelector("#title").innerText = "' . $newTitle . '"' );\n\n// run console.log\nvrzno_eval('console.log("Hello, World!")');\n`, html: `<h1 id="title">Hello, PHP!</h1>\n`, console: 'open' };

{/* prettier-ignore-end */}

<LiveCodes params={jsOpParams} height="80vh"></LiveCodes>

Check the [starter template](#example-usage) for another example.

## Language Info

### Name

`php-wasm`

### Extension

`.wasm.php`

### Alias

`phpwasm`

### Editor

`script`

## Compiler

[php-wasm](https://github.com/seanmorris/php-wasm)

### Version

`php-wasm` v0.0.7, running PHP v8.2.4

## Code Formatting

Using [prettier](https://prettier.io/) and [Prettier PHP Plugin](https://github.com/prettier/plugin-php).

## Example Usage

<LiveCodes template="php-wasm" height="80vh"></LiveCodes>

## Starter Template

https://livecodes.io/?template=php-wasm

## Links

- [PHP](https://php.net/)
- [PHP documentation](https://www.php.net/manual/en/)
- [php-wasm](https://github.com/seanmorris/php-wasm)
- [PHP using Uniter](./php.html.md) in LiveCodes