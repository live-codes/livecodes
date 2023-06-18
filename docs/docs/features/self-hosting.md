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

  # deploy
  npm run deploy     # build and deploy to github pages

  # for development
  npm run serve      # locally serve to http://localhost:8080
  npm start          # start local development with code watch, rebuild and live-reload
  ```

- Fork the [GitHub repo](https://github.com/live-codes/livecodes) and use one of the hosting services that integrate with GitHub to allow automatic deploys on code push (e.g. [Cloudflare Pages](https://developers.cloudflare.com/pages/get-started), [Vercel](https://vercel.com/docs/concepts/git), [Netlify](https://docs.netlify.com/configure-builds/overview/), [Firebase](https://firebase.google.com/docs/hosting/github-integration)). When prompted, the build command is `npm run build` and the build output directory is `build`.

## Custom Build

By default, when building the app, it is expected to be hosted on the root of the domain/subdomain (e.g. `https://my-website.com` or `https://playground.my-website.com`). The documentation is also hosted in the `/docs/` directory (e.g. `https://my-website.com/docs`).

If you wish to host the app in a subdirectory (e.g. <span style={{wrap: 'no-wrap'}}>`https://my-username.github.io/playground/`</span>), the base URL of the documentation directory needs to be supplied by the environment variable `DOCS_BASE_URL` during build.

Example:

```shell
npx cross-env DOCS_BASE_URL=\"/playground/docs/\" npm run build
```

If you do not want to build documentations and direct all links to documentations to https://livecodes.io/docs/, use the following command:

```shell
npx cross-env DOCS_BASE_URL=null npm run build:app
```

## Services

You may wish to edit one or more of the used [services](../advanced/services.md) to use your own.

## SDK Usage

The [SDK](../sdk/index.md) can still be used with the self-hosted app by providing the [`appUrl`](../sdk/js-ts.md#appurl) [embed option](../sdk/js-ts.md#embed-options).

```js title="index.js"
import { createPlayground } from 'livecodes';

const options = {
  appUrl: 'https://playground.myserver.com/',
  template: 'react',
  // other embed options
};
createPlayground('#container', options);
```
