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

However, in LiveCodes, all bare module imports are converted on-the-fly to use [skypack.dev](https://www.skypack.dev/).

So

```js
import { v4 } from 'uuid';
```

gets converted to

```js
import { v4 } from 'https://cdn.skypack.dev/uuid';
```

<p id="npm-modules-demo1">Demo:</p>

<LiveCodes query="js=import%20%7B%20v4%20%7D%20from%20%27uuid%27%3B%0A%0Adocument.body.innerHTML%20%3D%20v4()%3B"></LiveCodes>

<p>&nbsp;</p>

You can import React like that:

```js
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
```

Demo:

<LiveCodes query="template=react"></LiveCodes>

It just works without a build step and without you having to worry about. And when you export your code to another service (e.g CodePen or JSFiddle), the full url imports are used, so your code continue to work elsewhere.

It is recommended to use this method for dependencies over using [external scripts](./resources-assets.md#external-stylesheetsscripts). The dependencies are explicitly stated in the code. And if you move to a local development environment, your bundler will take care of importing them and doing other optimizations like tree-shaking.

## CommonJS Modules

CommonJS module requires are also supported.

So this also works.

```js
const { v4 } = require('uuid');

document.body.innerHTML = v4();
```

Exercise: Copy this code snippet and paste it instead of the code in the [demo above](#npm-modules-demo1). Check the generated code in the compiled code viewer.

:::info

Script code that contains `import` or `export` gets served in a script tag with `type=module`.

:::
