# Python

import RunInLiveCodes from '../../src/components/RunInLiveCodes.tsx';
import LiveCodes from '../../src/components/LiveCodes.tsx';

LiveCodes can run Python in the browser using [Brython](https://brython.info/), a Python 3 implementation for client-side web programming.

:::info Note

Brython is a light-weight Python interpreter written in JavaScript. However, It does not allow loading external packages from PyPI.

If you need to import external packages including scientific Python packages like numpy, pandas, scipy, matplotlib, and scikit-learn, you may want to use [Python (Wasm)](./python-wasm.html.md), which uses Pyodide the [CPython](https://github.com/python/cpython) port to WebAssembly.

:::

## Usage

LiveCodes runs Python code in the browser. There is no server required to run the code and no need to install Python.

In addition, since the Python code is running on the client-side, it has access to the [JavaScript scope](#javascript-interoperability), including the page DOM and browser APIs. See the [starter template](#starter-template) for an example.

### Standard Library

Many modules of the Python standard library are functional. See [Brython distribution](https://brython.info/static_doc/en/stdlib.html) for details.

### JavaScript Interoperability

Interaction with the page DOM and JavaScript can be achieved using [`browser`](https://brython.info/static_doc/en/browser.html) and [`javascript`](https://brython.info/static_doc/en/javascript.html) modules. See [this guide](https://brython.info/static_doc/en/dom_api.html) for using the DOM API.

Check the [starter template](#starter-template) for an example.

## Language Info

### Name

`python`

### Extensions

`.py`

### Editor

`script`

## Compiler

[Brython](https://brython.info/)

### Version

Brython v3.12.3, running Python v3.12

## Code Formatting

Not supported.

## Example Usage

<LiveCodes template="python" height="80vh"></LiveCodes>

## Starter Template

https://livecodes.io/?template=python

## Links

- [Python](https://www.python.org/)
- [Brython](https://brython.info/)
- [Python (Wasm)](./python-wasm.html.md) in LiveCodes