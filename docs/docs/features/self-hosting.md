# Self-Hosting

The LiveCodes app can be self-hosted on any static file server or CDN.

## Guide

The built app can be obtained by **one of the following** ways:

- Download the app from the [releases](https://github.com/live-codes/livecodes/releases), extract the folder and add it to your website.
- Fork the [GitHub repo](https://github.com/live-codes/livecodes) and clone it. You may wish to use the included setup to deploy to [GitHub Pages](https://pages.github.com/):

  ```shell
  git clone https://github.com/{your-username}/livecodes
  cd livecodes
  npm install
  npm build          # build the app to "build" directory
  npm run serve      # locally serve to http://localhost:8080

  # deploy
  npm run deploy     # build and deploy to github pages

  # for development
  npm start          # start local development with code watch, rebuild and live-reload
  ```

- Fork the [GitHub repo](https://github.com/live-codes/livecodes) and use one of the hosting services that integrate with GitHub to allow automatic deploys on code push (e.g. [Cloudflare Pages](https://developers.cloudflare.com/pages/get-started), [Vercel](https://vercel.com/docs/concepts/git), [Netlify](https://docs.netlify.com/configure-builds/overview/), [Firebase](https://firebase.google.com/docs/hosting/github-integration)). When prompted, the build command is `npm run build` and the build output directory is `build`.

## Custom Build

By default, when building the app, it is expected to be hosted on the root of the domain/subdomain (e.g. `https://my-website.com` or `https://playground.my-website.com`). The documentation is also hosted in the `/docs/` directory (e.g. `https://my-website.com/docs`).

If you wish to host the app in a subdirectory (e.g. `https://my-username.github.io/playground/`), the base URL of the documentation directory needs to be supplied by the environment variable `DOCS_BASE_URL` during build.

Example:

```shell
npx cross-env DOCS_BASE_URL="/playground/docs/" npm run build
```

If you do not want to build documentations and direct all links to documentations to https://livecodes.io/docs/, use the following command:

```shell
npx cross-env DOCS_BASE_URL=null npm run build:app
```

## Services

Some of the [services](../advanced/services.md) used by the app are not supported on [self-hosted](../features/self-hosting.md) deploys and are either replaced by other compatible services (e.g. the [share](../features/share.md) service uses [dpaste](https://dpaste.com/) for short URLs, which are [**deleted after 365 days**](https://dpaste.com/help)) or require you to provide an alternative service (e.g. [Firebase configuration](https://github.com/live-codes/livecodes/tree/develop/src/livecodes/services/firebase.ts) for authentication).

You may wish to edit one or more of the used [services](../advanced/services.md) to use your own.

:::info

LiveCodes [sponsors](../sponsor.md) (Bronze sponsors and above) get access to managed custom services.

:::

## Example

This is an example of a self-hosted deployment, that was deployed to [GitHub Pages](https://pages.github.com/) using the [built-in setup](#guide):

https://live-codes.github.io/livecodes/

## SDK Usage

The [SDK](../sdk/index.md) can still be used with the self-hosted app by providing the [`appUrl`](../sdk/js-ts.md#appurl) [embed option](../sdk/js-ts.md#embed-options).

```js title="index.js"
import { createPlayground } from 'livecodes';

const options = {
  appUrl: 'https://playground.my-website.com',
  template: 'react',
  // other embed options
};
createPlayground('#container', options);
```
