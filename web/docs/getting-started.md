# Getting Started

There are multiple options:

### Hosted App

The easiest way to use LiveCodes is to through the hosted app ([livecodes.io](https://livecodes.io)).

Use various methods to add your code like [embedded editors](./features/embeds.md), [code blocks](#prefill-from-code-blocks), ["Edit in LiveCodes"](#edit-in-livecodes-bookmarklet) and [code prefill](#importing-code-editor-prefill).

### Self-Hosted

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

### NPM Package

An npm package is also planned.
