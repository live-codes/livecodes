# Module Resolution

import LiveCodes from '../../src/components/LiveCodes.tsx';

## Bare Module Imports

In LiveCodes you can use node-style bare module imports for npm modules like you do in your local development. However, there are no installation or build steps required.

e.g. consider the following code:

```js
import { v4 } from 'uuid';

document.body.innerHTML = v4();
```

If you run it directly in the browser, you get this error:

```
Uncaught TypeError: Failed to resolve module specifier "uuid". Relative references must start with either "/", "./", or "../".
```

However, in LiveCodes, bare module imports are transformed to full URLs that are imported from CDN (by default: [jspm.dev](https://jspm.dev/)) which provides ESM versions of NPM packages.

`import { v4 } from 'uuid';` <br /> becomes <br />
`import { v4 } from 'https://jspm.dev/uuid';`

This is made possible by using [import maps](https://github.com/WICG/import-maps).

<p id="npm-modules-demo1">Demo:</p>

<LiveCodes params={{js: "import { v4 } from 'uuid';\n\ndocument.body.innerHTML = v4();"}}></LiveCodes>

<p>&nbsp;</p>

You can import React like that:

```js
import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
```

Demo:

<LiveCodes template="react"></LiveCodes>

It just works without a build step and without you having to worry about. And when you [export your project](./export.md) to another service (e.g. CodePen) or as HTML, the full url imports are used, so your code continue to work.

:::tip
It is recommended to use this method for dependencies over using [external scripts](./external-resources.md). The dependencies are explicitly stated in the code. And if you move to a local development environment, your bundler will take care of importing them and doing other optimizations like [tree-shaking](https://developer.mozilla.org/en-US/docs/Glossary/Tree_shaking).
:::

### Other CDN Providers

By default, bare module imports are imported from [jspm.dev](https://jspm.dev/). You may choose another provider by using a CDN prefix. These are examples of importing the library `uuid`:

`uuid` → https://jspm.dev/uuid ([info](https://jspm.org))

`jspm:uuid` → https://jspm.dev/uuid ([info](https://jspm.org))

`npm:uuid` → https://jspm.dev/uuid ([info](https://jspm.org))

`node:uuid` → https://jspm.dev/uuid ([info](https://jspm.org))

`skypack:uuid` → https://cdn.skypack.dev/uuid ([info](https://www.skypack.dev/))

`esm.sh:uuid` → https://esm.sh/uuid ([info](https://esm.sh/))

`jsdelivr:uuid` → https://cdn.jsdelivr.net/npm/uuid ([info](https://www.jsdelivr.com/))

`esm.run:uuid` → https://esm.run/uuid ([info](https://esm.run/))

`unpkg:uuid` → https://unpkg.com/uuid?module ([info](https://unpkg.com/))

`esbuild:uuid` → https://esbuild.vercel.app/uuid ([info](https://esbuild.vercel.app/))

`bundlejs:uuid` → https://deno.bundlejs.com/?file&q=uuid ([info](https://bundlejs.com/))

`deno:uuid` → https://deno.bundlejs.com/?file&q=https://deno.land/x/uuid/mod.ts ([info](https://bundlejs.com/))

`github:uuidjs/uuid/main/src/v4.js` → https://raw.githack.com/uuidjs/uuid/main/src/v4.js ([info](https://raw.githack.com/))

`gitlab:staltz/manyverse/-/blob/master/index.web.js` → https://gl.githack.com/staltz/manyverse/-/raw/master/index.web.js ([info](https://raw.githack.com/))

Example:

```js
import React from 'esm.sh:react';
```

## CommonJS Modules

CommonJS module requires are also supported.

So this also works (although not recommended - use ES6 imports instead):

```js
const { v4 } = require('uuid');

document.body.innerHTML = v4();
```

Exercise:

Copy the previous code snippet and paste it in the playground below. Check the generated code in the compiled code viewer.

<LiveCodes params={{ activeEditor: 'script', compiled: 'open' }}></LiveCodes>

:::info

Script code that contains `import` or `export` gets served in a script tag with `type=module`.

:::

## NPM Package Search

NPM packages can be searched and added as script tags from the [External Resources](./external-resources.md) screen.

## Deno Modules

Modules imported from [deno.land/x](https://deno.land/x) (or any other URL ending in `.ts`) are automatically transpiled (ts -> js) and bundled by [bundlejs](https://bundlejs.com/) (using [esbuild](https://esbuild.github.io/)). The project does not have to be using TypeScript.

Example:

```js
import { uuid } from 'https://deno.land/x/uuid/mod.ts';

document.body.innerHTML = uuid();
```
