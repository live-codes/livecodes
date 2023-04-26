# Module Resolution

import LiveCodes from '../../src/components/LiveCodes.tsx';

## NPM Modules

### Bare Module Imports

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

It just works without a build step and without you having to worry about. And when you [export your project](./export.md) to another service (e.g. CodePen) or as HTML, the full URL imports are used, so your code continues to work.

:::tip
It is recommended to use this method for dependencies over using [external scripts](./external-resources.md). The dependencies are explicitly stated in the code. And if you move to a local development environment, your bundler will take care of importing them and doing other optimizations like [tree-shaking](https://developer.mozilla.org/en-US/docs/Glossary/Tree_shaking).
:::

### CommonJS Modules

CommonJS module `require`s are also supported (they are converted to ESM imports).

So this also works (although not recommended - use ESM imports instead):

```js
const { v4 } = require('uuid');

document.body.innerHTML = v4();
```

Exercise:

Copy the previous code snippet and paste it in the playground below. Check the generated code in the compiled code viewer.

<LiveCodes params={{ activeEditor: 'script', compiled: 'open' }}></LiveCodes>

:::info

Script code that contains `import`, `export` or `require` gets served in a script tag with [`type="module"`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules).

:::

### NPM Package Search

NPM packages can be searched and added as script tags from the [External Resources](./external-resources.md) screen.

## Deno Modules

Modules imported from [deno.land/x](https://deno.land/x) (or any other URL ending in `.ts`, `.jsx` or `.tsx`) are automatically transpiled (ts -> js) and bundled by [bundlejs](https://bundlejs.com/) (using [esbuild](https://esbuild.github.io/)), including their relative imports. The project on LiveCodes that imports these modules does not need to be using TypeScript.

Example:

```js
import { uuid } from 'https://deno.land/x/uuid/mod.ts';

document.body.innerHTML = uuid();
```

[Open in LiveCodes](<https://livecodes.io/?js=import%20%7B%20uuid%20%7D%20from%20'https%3A%2F%2Fdeno.land%2Fx%2Fuuid%2Fmod.ts'%3B%0A%0Adocument.body.innerHTML%20%3D%20uuid()%3B>)

## GitHub/GitLab/Bitbucket

Modules can also be similarly imported from GitHub, Gitlab or Bitbucket. Also these imports are transpiled and bundled (see [Deno Modules](#deno-modules)).

```js
import { flatten } from 'https://github.com/remeda/remeda/blob/master/src/flatten.ts';

console.log(flatten([[1, 2], [3], [4, 5]])); // -> [1, 2, 3, 4, 5]
```

[Open in LiveCodes](<https://livecodes.io/?console=open&js=import%20%7B%20flatten%20%7D%20from%20'https%3A%2F%2Fgithub.com%2Fremeda%2Fremeda%2Fblob%2Fmaster%2Fsrc%2Fflatten.ts'%3B%0A%0Aconsole.log(flatten(%5B%5B1%2C%202%5D%2C%20%5B3%5D%2C%20%5B4%2C%205%5D%5D))%3B>)

:::tip

If you do not want the import URL to be bundled (e.g. in Deno or GitHub imports), add `#nobundle` to the end of URL.

Example:

```js
import { flatten } from 'https://github.com/remeda/remeda/blob/master/src/flatten.ts#nobundle';
```

If you want to bundle (and transpile) any import URL, prefix it with `bundle:` (see below).

:::

## CDN Providers

By default, npm modules are imported from [jspm.dev](https://jspm.dev/). You may choose another provider by using a CDN prefix. These are examples of importing the library `uuid`:

`uuid` → https://jspm.dev/uuid ([info](https://jspm.org))

`jspm:uuid` → https://jspm.dev/uuid ([info](https://jspm.org))

`skypack:uuid` → https://cdn.skypack.dev/uuid ([info](https://www.skypack.dev/))

`esm.sh:uuid` → https://esm.sh/uuid ([info](https://esm.sh/))

`jsdelivr:uuid` → https://cdn.jsdelivr.net/npm/uuid ([info](https://www.jsdelivr.com/))

`esm.run:uuid` → https://esm.run/uuid ([info](https://esm.run/))

`unpkg:uuid` → https://unpkg.com/uuid?module ([info](https://unpkg.com/))

`esbuild:uuid` → https://esbuild.vercel.app/uuid ([info](https://esbuild.vercel.app/))

`bundlejs:uuid` → https://deno.bundlejs.com/?file&q=uuid ([info](https://bundlejs.com/))

`bundle:uuid` → https://deno.bundlejs.com/?file&q=uuid ([info](https://bundlejs.com/))

`deno:uuid` → https://deno.bundlejs.com/?file&q=https://deno.land/x/uuid/mod.ts ([info](https://bundlejs.com/))

`npm:uuid` → https://jspm.dev/uuid ([info](https://jspm.org))

`node:uuid` → https://jspm.dev/uuid ([info](https://jspm.org))

Example:

```js
import React, { useState } from 'esm.sh:react';
import { createRoot } from 'esm.sh:react-dom/client';
```

:::caution

Please note that importing the same module (even for dependencies) from different CDNs may cause conflicts.

Example:

```js
// this will NOT work!
import React, { useState } from 'esm.sh:react'; // React from esm.sh
import { createRoot } from 'react-dom/client'; // React from jspm.dev
```

:::

### Package Version

Most CDN providers allow specifying package version using the format: <br />
`{pkgName}@{version}/{path}`.

Example:

```js
import latest from 'lodash';
import v3 from 'lodash@3';

console.log(latest.VERSION); // -> 4.17.21
console.log(v3.VERSION); // -> 3.10.1
```
