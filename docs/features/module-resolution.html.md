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

However, in LiveCodes, bare module imports are transformed to full URLs that are imported from CDN (by default: [esm.sh](https://esm.sh/)) which provides ESM versions of NPM packages.

`import { v4 } from 'uuid';` <br /> becomes <br />
`import { v4 } from 'https://esm.sh/uuid';`

This is made possible by using [import maps](https://github.com/WICG/import-maps).

<p id="npm-modules-demo1">Demo:</p>

<LiveCodes
  params={{ js: "import { v4 } from 'uuid';\n\ndocument.body.innerHTML = v4();" }}
></LiveCodes>

<p>&nbsp;</p>

You can import from React like that:

```js
import { useState } from 'react';
```

Demo:

<LiveCodes template="react"></LiveCodes>

It just works without a build step and without you having to worry about. And when you [export your project](./export.html.md) to another service (e.g. CodePen) or as HTML, the full URL imports are used, so your code continues to work.

:::tip
It is recommended to use this method for dependencies over using [external scripts](./external-resources.html.md). The dependencies are explicitly stated in the code. And if you move to a local development environment, your bundler will take care of importing them and doing other optimizations like [tree-shaking](https://developer.mozilla.org/en-US/docs/Glossary/Tree_shaking).
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

NPM packages can be searched and added as script tags from the [External Resources](./external-resources.html.md) screen.

## Deno Modules

Modules imported from [deno.land/x](https://deno.land/x) (or any other URL ending in `.ts`, `.jsx` or `.tsx`) are automatically transpiled (ts -> js) and bundled by [bundlejs](https://bundlejs.com/) (using [esbuild](https://esbuild.github.io/)), including their relative imports. The project on LiveCodes that imports these modules does not need to be using TypeScript.

Example:

```js
import { uuid } from 'https://deno.land/x/uuid/mod.ts';

document.body.innerHTML = uuid();
```

[Open in LiveCodes](<https://livecodes.io/?js=import%20%7B%20uuid%20%7D%20from%20'https%3A%2F%2Fdeno.land%2Fx%2Fuuid%2Fmod.ts'%3B%0A%0Adocument.body.innerHTML%20%3D%20uuid()%3B>)

## JSR Modules

Modules can be imported from [jsr.io](https://jsr.io/) using the prefix `jsr:`. The project on LiveCodes that imports these modules does not need to be using TypeScript.

Example:

```js
import { yassify } from 'jsr:@kwhinnery/yassify';

document.body.innerHTML = yassify('Hello, World!');
```

[Open in LiveCodes](<https://livecodes.io/?js=import%20%7B%20yassify%20%7D%20from%20'jsr%3A%40kwhinnery%2Fyassify'%3B%0A%0Adocument.body.innerHTML%20%3D%20yassify('Hello%2C%20World!')%3B>)

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

## pkg.pr.new

Unpublished npm packages can be imported while still under development using the [pkg.pr.new](https://pkg.pr.new/) service.

Use the prefix `pr:` or `pkg.pr.new:`.

Example:

```js
import { Bench } from 'pr:tinybench@a832a55';
// or
// import { Bench } from 'pr:tinylibs/tinybench/tinybench@a832a55';
```

## CDN Providers

By default, npm modules are imported from [esm.sh](https://esm.sh/). You may choose another provider by using a CDN prefix. These are examples of importing the library `uuid`:

`uuid` → https://esm.sh/uuid ([info](https://esm.sh))

`esm.sh:uuid` → https://esm.sh/uuid ([info](https://esm.sh/))

`skypack:uuid` → https://cdn.skypack.dev/uuid ([info](https://www.skypack.dev/))

`jsdelivr:uuid` → https://cdn.jsdelivr.net/npm/uuid ([info](https://www.jsdelivr.com/))

`esm.run:uuid` → https://esm.run/uuid ([info](https://esm.run/))

`unpkg:uuid` → https://unpkg.com/uuid?module ([info](https://unpkg.com/))

`esbuild:uuid` → https://esbuild.vercel.app/uuid ([info](https://esbuild.vercel.app/))

`bundlejs:uuid` → https://deno.bundlejs.com/?file&q=uuid ([info](https://bundlejs.com/))

`bundle:uuid` → https://deno.bundlejs.com/?file&q=uuid ([info](https://bundlejs.com/))

`deno:uuid` → https://deno.bundlejs.com/?file&q=https://deno.land/x/uuid/mod.ts ([info](https://bundlejs.com/))

`npm:uuid` → https://esm.sh/uuid ([info](https://esm.sh))

`node:uuid` → https://esm.sh/uuid ([info](https://esm.sh))

`jsr:@std/uuid` → https://esm.sh/jsr/@std/uuid ([info](https://esm.sh))

`pr:tinybench@a832a55` → https://esm.sh/pr/tinybench@a832a55 ([info](https://esm.sh))

`pkg.pr.new:tinybench@a832a55` → https://esm.sh/pkg.pr.new/tinybench@a832a55 ([info](https://esm.sh))

`jspm:uuid` → https://jspm.dev/uuid ([info](https://jspm.org) - [DEPRECATED](https://jspm.org/jspm-dev-deprecation))

Example:

```js
import { useState } from 'esm.sh:react';
```

:::caution

Please note that importing the same module (even for dependencies) from different CDNs may cause conflicts.

Example:

```js
// this will NOT work!
import React, { useState } from 'esm.sh:react'; // React from esm.sh
import { createRoot } from 'skypack:react-dom/client'; // React from skypack.dev
```

:::

### Change Default CDN

Default CDN can be changed on project-level using the [custom settings](../advanced/custom-settings.html.md) property `defaultCDN` which accepts a string representing one of the CDN aliases listed above.

Example: This assigns [Skypack](https://www.skypack.dev/) as the default CDN for all imports of the project

```json
{
  "defaultCDN": "skypack"
}
```

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

## Custom Module Resolution

Module resolution described in this page mainly depends on [import maps](https://github.com/WICG/import-maps). The generated import map is added to the [result page](./result.html.md).

You may wish to override or customize module resolution behavior (e.g. change URL, CDN, specify version, import custom unpublished library, ...etc. ), however you cannot add another import map script because [currently multiple import maps are not yet supported](https://github.com/WICG/import-maps#multiple-import-map-support).

LiveCodes allows you to add your custom import map by one of the following methods:

#### Custom Settings

In the standalone app, via the [custom settings](../advanced/custom-settings.html.md) property `imports`.

Example:

```json title="Custom Settings"
{
  "imports": {
    "my-lib": "https://my-server.com/path/to/library.js"
  }
}
```

#### SDK

For embedded playgrounds, use the [SDK](../sdk/index.html.md) embed option [`config.imports`](../configuration/configuration-object.html.md)#imports).

Example:

```js title="index.js"
import { createPlayground } from 'livecodes';

const config = {
  imports: {
    'my-lib': 'https://my-server.com/path/to/library.js',
  },
  // other configurations ...
};

createPlayground('#container', { config });
```

Please note that you may also provide [custom type definitions](./intellisense.html.md)#custom-types) for your custom modules for editor intellisense and better development experience.

## Related

- [Import](./import.html.md)
- [External Resources](./external-resources.html.md)
- [Projects](./projects.html.md)
- [Intellisense](./intellisense.html.md)