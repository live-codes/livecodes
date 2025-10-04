# Self-Hosting

LiveCodes is a [client-side app](../why.html.md)#client-side). It can be easily self-hosted on any static file server or CDN.

All core functionalities (e.g. editors, compilers, formatters, code execution, etc) run in the browser. However, some minor features require [external services](../advanced/services.html.md) (e.g. [sharing](./share.html.md) short URLs, [broadcast](./broadcast.html.md), etc).
If you also want to self-host these services, you can use the [docker setup](../advanced/docker.html.md).

## Guide

The built app can be obtained using **any of the following** methods:

### Download a Release

Download the app from the [releases](https://github.com/live-codes/livecodes/releases), extract the folder and add it to your website.

### Build from Source

Fork the [GitHub repo](https://github.com/live-codes/livecodes) and clone it. You may wish to use the included setup to deploy to [GitHub Pages](https://pages.github.com/):

  ```shell
  git clone https://github.com/{your-username}/livecodes
  cd livecodes
  npm install
  npm run build      # build the app to "build" directory
  npm run serve      # locally serve to http://localhost:8080

  # deploy
  npm run deploy     # build and deploy to GitHub Pages

  # for development
  npm start          # start local development with code watch, rebuild and live-reload
  ```

### Git Integration

Fork the [GitHub repo](https://github.com/live-codes/livecodes) and use one of the hosting services that integrate with GitHub to allow automatic deploys on code push (e.g. [Cloudflare Pages](https://developers.cloudflare.com/pages/get-started), [Netlify](https://docs.netlify.com/configure-builds/overview/), [Firebase](https://firebase.google.com/docs/hosting/github-integration), etc.). When prompted, the build command is `npm run build` and the build output directory is `build`.

### Docker Setup

In addition to the _static_ app provided by the previous methods, the included [docker setup](../advanced/docker.html.md) provides alternative implementations for server-side features available in the [hosted app](https://livecodes.io),
e.g. automatic HTTPS, [Open Graph meta tags](https://ogp.me/), [oEmbed](https://oembed.com/), custom headers, [short-URL share](./share.html.md), [broadcast server](./broadcast.html.md), separate origin sandbox to run code, custom 404 page, etc.

```sh
docker-compose up -d
```

By default, the app is served at https://livecodes.localhost.

For customization and detailed guide, see [docker setup](../advanced/docker.html.md) docs.

## Custom Build

By default, when building the app, it is expected to be hosted on the root of the domain/subdomain (e.g. `https://my-website.com` or `https://playground.my-website.com`). The documentation is also hosted in the `/docs/` directory (e.g. `https://my-website.com/docs/`).

If you wish to host the app in a subdirectory (e.g. `https://my-username.github.io/playground/`), the base URL of the app needs to be supplied by the environment variable `BASE_URL` during build.

Example:

```shell
npx cross-env BASE_URL="/playground/" npm run build
```

If you do not want to build documentations and instead direct all documentation links to https://livecodes.io/docs/, use the following command:

```shell
npx cross-env DOCS_BASE_URL=null npm run build:app
```

## Services

Some of the [services](../advanced/services.html.md) used by the app are not supported on _static_ [self-hosted](../features/self-hosting.html.md) deploys and are either replaced by other compatible services (e.g. the [share](../features/share.html.md) service uses [dpaste](https://dpaste.com/) for short URLs, which are [**deleted after 365 days**](https://dpaste.com/help)) or require you to provide an alternative service (e.g. [Firebase configuration](https://github.com/live-codes/livecodes/tree/develop/src/livecodes/services/firebase.ts) for authentication).

You may wish to use the included [docker setup](../advanced/docker.html.md) to self-host these services.

:::info

LiveCodes [sponsors](../sponsor.html.md) (Bronze sponsors and above) get access to a hosted [docker setup](../advanced/docker.html.md) with managed [services](../advanced/docker.html.md)#services).

:::

## Examples

### Static App on GitHub Pages

This is an example of a self-hosted deployment, that was deployed to [GitHub Pages](https://pages.github.com/) using the [built-in setup](#build-from-source):

https://live-codes.github.io/livecodes/

### Docker Setup on VPS

This is an example of a self-hosted deployment, that was deployed to a VPS using the included [docker setup](../advanced/docker.html.md):

https://vps.livecodes.io

## SDK Usage

The [SDK](../sdk/index.html.md) can still be used with the self-hosted app by providing the [`appUrl`](../sdk/js-ts.html.md)#appurl) [embed option](../sdk/js-ts.html.md)#embed-options).

```js title="index.js"
import { createPlayground } from 'livecodes';

const options = {
  appUrl: 'https://playground.my-website.com',
  template: 'react',
  // other embed options
};
createPlayground('#container', options);
```