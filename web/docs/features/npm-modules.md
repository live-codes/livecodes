# NPM Modules

import LiveCodes from '../../src/components/LiveCodes.tsx';

## Bare Module Imports

In LiveCodes you can use node-style bare module imports for npm modules like you do in your local development. However, there is no build step required.

e.g. consider the following code:

```js
import { v4 } from 'uuid';

document.body.innerHTML = v4();
```

If you run it in regular web page, you get this error:

```
Uncaught TypeError: Failed to resolve module specifier "uuid". Relative references must start with either "/", "./", or "../".
```

However, in LiveCodes, bare module imports are imported from [skypack.dev](https://www.skypack.dev/) (which provides ESM versions of NPM packages).

So `uuid` becomes `https://cdn.skypack.dev/uuid`;

This is made possible by using [import maps](https://github.com/WICG/import-maps).

<p id="npm-modules-demo1">Demo:</p>

<LiveCodes query="js=import%20%7B%20v4%20%7D%20from%20%27uuid%27%3B%0A%0Adocument.body.innerHTML%20%3D%20v4()%3B"></LiveCodes>

<p>&nbsp;</p>

You can import React like that:

```js
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
```

Demo:

<LiveCodes template="react"></LiveCodes>

It just works without a build step and without you having to worry about. And when you export your code to another service (e.g CodePen or JSFiddle), the full url imports are used, so your code continue to work elsewhere.

It is recommended to use this method for dependencies over using [external scripts](./resources-assets.md#external-stylesheetsscripts). The dependencies are explicitly stated in the code. And if you move to a local development environment, your bundler will take care of importing them and doing other optimizations like tree-shaking.

### Other CDN Providers

By default, bare module imports are imported from [skypack.dev](https://www.skypack.dev/). You may choose another provider by using a CDN prefix:

`uuid` → https://cdn.skypack.dev/uuid ([info](https://www.skypack.dev/))

`skypack:uuid` → https://cdn.skypack.dev/uuid ([info](https://www.skypack.dev/))

`jsdelivr:uuid` → https://cdn.jsdelivr.net/npm/uuid ([info](https://www.jsdelivr.com/))

`esm.run:uuid` → https://esm.run/uuid ([info](https://esm.run/))

`esm.sh:uuid` → https://esm.sh/uuid ([info](https://esm.sh/))

`jspm:uuid` → https://jspm.dev/uuid ([info](https://jspm.org))

`esbuild:uuid` → https://esbuild.vercel.app/uuid ([info](https://esbuild.vercel.app/))

`unpkg:uuid` → https://unpkg.com/uuid?module ([info](https://unpkg.com/))

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

<LiveCodes config={{ activeEditor: 'script' }}></LiveCodes>

:::info

Script code that contains `import` or `export` gets served in a script tag with `type=module`.

:::
