# Getting Started

There are multiple options:

### Hosted App

The easiest way to get started with LiveCodes is to use the hosted app (https://livecodes.io).

The app is packed with [features](./features/index.md) and offers various ways to [import code](./features/import.md).

### SDK

LiveCodes [<abbr title="Software Development Kit">SDK</abbr>](./sdk/index.md) is available as npm package to allow easy [embedding](./features/embeds.md) of playgrouds and facilitates communication with them.

1. Install from npm.

```sh
npm i livecodes
```

then you can use it like that:

```js title="index.js"
import { createPlayground } from 'livecodes';

createPlayground('#container', { template: 'react' });
```

2. or you may load from CDN

ESM:

```html title="index.html"
<div id="container"></div>
<script type="module">
  import { createPlayground } from 'https://cdn.jsdelivr.net/npm/livecodes/sdk/livecodes.js';

  createPlayground('#container', { template: 'react' });
</script>
```

UMD:

```html title="index.html"
<div id="container"></div>
<script src="https://cdn.jsdelivr.net/npm/livecodes/sdk/livecodes.umd.js"></script>
<script>
  // the UMD version provides the global object `livecodes`
  livecodes.createPlayground('#container', { template: 'react' });
</script>
```

Please refer to [SDK documentation](./sdk/index.md) for detailed usage.

### Self-Hosting

LiveCodes can be hosted on any static file server or CDN.

The built app can be obtained by one of the following ways:

- Download the app from the [releases](https://github.com/live-codes/livecodes/releases), extract the folder and add it to your website.
- Fork the [GitHub repo](https://github.com/live-codes/livecodes) and clone it. You may wish to use the included setup to publish to [GitHub Pages](https://pages.github.com/):

  ```sh
  git clone https://github.com/{your-username}/livecodes
  cd livecodes
  npm install
  npm run build         # build the app to 'build' directory
  npm run gh-pages      # optionally, publish to github pages

  # for development
  npm run serve         # locally serve to http://localhost:8080
  npm start             # start local development with code watch, rebuild and live-reload
  ```

- Fork the [GitHub repo](https://github.com/live-codes/livecodes) and use one of the hosting services that integrate with GitHub to allow automatic deploys on code push (e.g. [Cloudflare Pages](https://developers.cloudflare.com/pages/get-started), [Vercel](https://vercel.com/docs/concepts/git), [Netlify](https://docs.netlify.com/configure-builds/overview/), [Firebase](https://firebase.google.com/docs/hosting/github-integration)). When prompted, the build command is `npm run build` and the build output directory is `build`.

The app needs to be served from the root of the domain/subdomain.

You may wish to edit one or more of the used [services](./advanced/services.md) to use your own.

The [SDK](./sdk/index.md) can still be used with the self-hosted app by providing the [`appUrl`](./sdk/js-ts.md#appurl) [embed option](./sdk/js-ts.md#embed-options).

```js title="index.js"
import { createPlayground } from 'livecodes';

const options = {
  appUrl: 'https://playground.myserver.com/',
  template: 'react',
};
createPlayground('#container', options);
```
