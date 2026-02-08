# JavaScript

LiveCodes runs [JavaScript](https://developer.mozilla.org/docs/Web/JavaScript) (JS) in the browser.
Accordingly, it has access to the DOM and other Web APIs, but it does not have access to Node.js APIs such as the file system or process information.

## Demo

import LiveCodes from '../../src/components/LiveCodes.tsx';

<LiveCodes template="javascript" height="60vh"></LiveCodes>

## Usage

The JavaScript code is added as-is without any transformations to the [result page](../features/result.html.md) inside a `<script>` tag.

If the code has imports or exports, the `<script>` tag will have `type="module"` attribute.

The only case where the code is modified is when CommonJS `require`s are used to import external dependencies (not recommended - use ESM imports instead).
These `require`s are converted to ESM imports with some glue code to make them work.

Example:

export const commonjs = `const { v4 } = require('uuid');

document.body.innerHTML = v4();`;

<LiveCodes params={{ activeEditor: 'script', js: commonjs, compiled: 'open' }}></LiveCodes>

### External Modules

Modules can be imported from various sources (e.g. npm, deno.land/x, jsr, CDNs, GitHub, etc.) including bare module imports.
The modules are loaded from CDNs using importmaps (see [module resolution](../features/module-resolution.html.md) for details).

Example:

export const esm = `import _ from 'lodash';

const arr = [1, 2, 3, 4, 5];
console.log(_.shuffle(arr)); // shuffle the array
`;

<LiveCodes params={{ activeEditor: 'script', js: esm, console: 'open' }}></LiveCodes>


## Language Info

### Name

`javascript`

### Alias

`js`

### Extensions

`js`, `mjs`

### Editor

`script`

### Compiler

JavaScript runs natively in the browser without compilation.

## Code Formatting

Using [Prettier](https://prettier.io/).

## Starter Template

https://livecodes.io/?template=Javascript

## Links

- [JavaScript Reference on MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [Web API](https://developer.mozilla.org/en-US/docs/Web/API)