# LiveCodes

A Code Playground That Just Works!

<p align="center">
<img width="300" src="https://dev.livecodes.io/docs/img/livecodes-logo.svg"></img>
</p>

A [feature-rich](https://livecodes.io/docs/features/), open-source, **client-side** code playground for React, Vue, Svelte, Solid, Typescript, Python, Go, Ruby, PHP and [90+ languages/frameworks](https://livecodes.io/docs/languages/).

[![LiveCodes: uptime status](https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/live-codes/upptime/master/api/live-codes/uptime.json)](https://status.livecodes.io)
[![LiveCodes: app version](https://img.shields.io/github/v/release/live-codes/livecodes?label=app)](https://livecodes.io)
[![LiveCodes: npm version](https://img.shields.io/npm/v/livecodes)](https://www.npmjs.com/package/livecodes)
[![LiveCodes: npm downloads](https://img.shields.io/npm/dm/livecodes)](https://www.npmjs.com/package/livecodes)
[![LiveCodes: jsdelivr downloads](https://data.jsdelivr.com/v1/package/npm/livecodes/badge?style=rounded)](https://www.jsdelivr.com/package/npm/livecodes)
[![LiveCodes: languages](https://img.shields.io/badge/languages-98-blue)](https://livecodes.io/docs/languages/)
[![LiveCodes: docs](https://img.shields.io/badge/Documentation-575757?logo=gitbook&logoColor=white)](https://livecodes.io/docs/)
[![LiveCodes: llms.txt](https://img.shields.io/badge/llms.txt-575757?logo=googledocs&logoColor=white)](https://livecodes.io/docs/llms.txt)
[![LiveCodes: llms-full.txt](https://img.shields.io/badge/llms--full.txt-575757?logo=googledocs&logoColor=white)](https://livecodes.io/docs/llms-full.txt)
[![Codacy Badge](https://app.codacy.com/project/badge/Grade/3d39f15618e048db9d13c2a0e8002b33)](https://app.codacy.com/gh/live-codes/livecodes/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_grade)
[![Lokalise: translated](https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/live-codes/lokalise-badge/main/badges/translated.json)](https://app.lokalise.com/public/34958094667a72e9454592.95108106/)
[![Lokalise: UI languages](https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/live-codes/lokalise-badge/main/badges/languages.json)](https://app.lokalise.com/public/34958094667a72e9454592.95108106/)
[![license - MIT](https://img.shields.io/github/license/live-codes/livecodes)](https://github.com/live-codes/livecodes/blob/develop/LICENSE)
[![LiveCodes: GitHub repo](https://img.shields.io/github/stars/live-codes/livecodes?style=flat&logo=github)](https://github.com/live-codes/livecodes)
[![LiveCodes: GitHub repo](https://img.shields.io/github/forks/live-codes/livecodes?style=flat&logo=github)](https://github.com/live-codes/livecodes)
[![Follow us on X (formerly Twitter)](https://img.shields.io/badge/Follow%20@livecodes__io-575757?logo=x)](https://x.com/livecodes_io)

[Try it now on livecodes.io](https://livecodes.io)

[Documentations](https://livecodes.io/docs)

[What makes LiveCodes different?](https://livecodes.io/docs/why)

![LiveCodes list of languages screenshot](https://dev.livecodes.io/docs/img/screenshots/livecodes-overview.jpg)

## A Code Playground That Just Works!

- No servers to configure (or pay for!)
- No databases to maintain (or pay for!)
- No installs
- No configuration files
- No build steps
- No subscription fees (free and open-source)
- No account required \*
- No limits for usage (unlimited private projects)
- 90+ languages/frameworks/processors
- Large set of features and integrations
- Import code from a wide variety of sources
- Use modules from npm, deno.land/x, jsr, GitHub, and others
- Easily embed it in your web pages
- It runs in the browser (client-side)

<sub>\* GitHub account is required only for features that use <a href="https://livecodes.io/docs/features/github-integration" target="_blank" rel="noopener">GitHub Integration</a>.</sub>

### Quick Start

#### Standalone App

1. Go to [livecodes.io](https://livecodes.io)

... and enjoy all the [features](https://livecodes.io/docs/features/)!

#### Embedded Playground

Add this code to your page:

```html
<div id="container"></div>
<script type="module">
  import { createPlayground } from 'https://cdn.jsdelivr.net/npm/livecodes';

  createPlayground('#container', {
    params: {
      markdown: '# Hello LiveCodes!',
      css: 'h1 {color: dodgerblue;}',
      js: 'console.log("Hello, from JS!");',
      console: 'open',
    },
  });
</script>
```

<sup>Check documentations for <a href="https://livecodes.io/docs/features/embeds" target="_blank" rel="noopener">Embedded Playgrounds</a>.</sup>

#### Self-hosted

1. Download a [release](https://github.com/live-codes/livecodes/releases)
2. Put it on a static file server (for free!) <sup><a href="https://pages.cloudflare.com/" target="_blank" rel="noopener">1</a>, <a href="https://www.netlify.com/" target="_blank" rel="noopener">2</a>, <a href="https://firebase.google.com/" target="_blank" rel="noopener">3</a>, <a href="https://pages.github.com/" target="_blank" rel="noopener">4</a></sup>

   <sup>Check the guide for <a href="https://livecodes.io/docs/features/self-hosting" target="_blank" rel="noopener">self-hosting</a> (including the built-in setup to deploy to GitHub Pages).</sup>

... and it just works!

## Feature Summary

- A wide range of [language support](https://livecodes.io/docs/languages/) (90+ languages/frameworks/processors)
- [Powerful Editor](https://livecodes.io/docs/features/editor-settings)
- Mobile-friendly
- [External resources/libraries](https://livecodes.io/docs/features/external-resources)
- [Import modules](https://livecodes.io/docs/features/module-resolution) from npm, deno.land/x, jsr, GitHub and others
- [Code Pre-fill](https://livecodes.io/docs/features/code-prefill)
- [Import](https://livecodes.io/docs/features/import)/[Export](https://livecodes.io/docs/features/export) [projects](https://livecodes.io/docs/features/projects)
- [Share](https://livecodes.io/docs/features/share)
- [Embed the playground](https://livecodes.io/docs/features/embeds) in any web page
- [Display modes](https://livecodes.io/docs/features/display-modes)
- [Deploy](https://livecodes.io/docs/features/deploy)
- [Starter Templates](https://livecodes.io/docs/features/templates)
- [Assets](https://livecodes.io/docs/features/assets)
- [Themes](https://livecodes.io/docs/features/themes)
- [Dev Tools](https://livecodes.io/docs/features/tools-pane) ([console](https://livecodes.io/docs/features/console), [compiled code viewer](https://livecodes.io/docs/features/compiled-code), [test runner](https://livecodes.io/docs/features/tests))
- [Code formatting](https://livecodes.io/docs/features/code-format)
- [Intellisense](https://livecodes.io/docs/features/intellisense)
- [Lite mode](https://livecodes.io/docs/features/lite)
- [Read-only mode](https://livecodes.io/docs/features/read-only)
- [Broadcast](https://livecodes.io/docs/features/broadcast)
- [Sync](https://livecodes.io/docs/features/sync)
- [Backup/Restore](https://livecodes.io/docs/features/backup-restore)
- [Client-side!](https://livecodes.io/docs/why#client-side)
- Very [configurable](https://livecodes.io/docs/configuration/)
- Developer-friendly build-free environment
- Powerful [SDK](https://livecodes.io/docs/sdk/) (available for [vanilla JavaScript, TypeScript](https://livecodes.io/docs/sdk/js-ts), [React](https://livecodes.io/docs/sdk/react), [Vue](https://livecodes.io/docs/sdk/vue), [Svelte](https://livecodes.io/docs/sdk/svelte) and [Solid](https://livecodes.io/docs/sdk/solid))
- Comprehensive [Documentations](https://livecodes.io/docs/)
- Focused on [privacy and security](https://livecodes.io/docs/features/security)
- Free and [Open-Source](https://livecodes.io/docs/license)

For details check the [full list of features](https://livecodes.io/docs/features/).

## LiveCodes SDK

The Software Development Kit (SDK) provides an easy, yet powerful, interface to embed and communicate with LiveCodes playgrounds.

The SDK is provided as a light-weight ([less than 5kb gzipped](https://bundlephobia.com/package/livecodes)), zero-dependencies [npm package](https://livecodes.io/docs/sdk/#npm-package), that is also available from [CDNs](https://livecodes.io/docs/sdk/#cdn). It can be used to create playgrounds with a wide variety of [configurations](https://livecodes.io/docs/configuration/configuration-object) and [embed options](https://livecodes.io/docs/sdk/js-ts#embed-options). In addition, [SDK methods](https://livecodes.io/docs/sdk/js-ts#sdk-methods) allow programmatic communication and control of the playgrounds during runtime.

### Installation

```
npm i livecodes
```

### Usage

Example: ([open in LiveCodes](https://livecodes.io/?x=code/N4IgLglmA2CmIC4QBkIDdYGED2ATWAzgAQDKAIgNJH4C22IANCPgQMYBOEADpNgHaIQjEAAtYAQ1yCAPDVhhxRViPHsC8gLwAdEAFUAKgDEAtAA4dRAPQA+LX1nzFfcXO0g0EWAHcu2dmAtWfjBYPjA3LwhcMBENfA9WWGNI6JEGIgg+KAhxaGM2XNgNAEYAOgAGCxthETAaaABBMDA1QWhxPgBzN1DA9oICNx1hBU6CRABtAF0mcVZIDABRXCg-QTZOHmEaVQBrAFcuRFB2rv3xTvgkWvrhILDQsBkVtAzcN3uFTNh2HWtpSwvawgAC+TAIYAAnnBjiBTp1zpdBKwBndgo9BKDwRxuE8ECcOgiLlcQAArcRocQbXFoh5hQQQGi+fxEYBKdgSEIABXakM67Gw+z4uCIIKIADMBTQiAByaDoWBBFgygDcWl+fHVdg4nNgPPEfIFQtwAAoZQBiT7ib7sGXpYBavhEJT8cUQToIVmO53OnbsA5cT0OjU+n3wxGwT0yv27XDYLx8O3e0MuulgKPmogACVg0Gg2CIAHU-NBcABCJMhn1g5M1qsebxRjkEfbQMCVuwggCUao1WJAEOhhDE8nGCGm2M2YDHE5AKIIXOb8kxTC4AsSAz8M5mc-2EOwNBI8kgXTHwDBIEZzOnxwvUK4hFvTBCELPcMJEcE98IOK2TE+GJIP2GBqBA-CCAAzBBIzYNg0BvqE4gAEZwFISC5NAwhzAsJL3AQcHwOCChgHuyL5uoUggiCQA))

```js
import { createPlayground } from 'livecodes';

createPlayground('#container', {
  config: {
    markup: {
      language: 'markdown',
      content: '# Hello World!',
    },
  },
  view: 'result',
});
```

The [JavaScript SDK](https://livecodes.io/docs/sdk/js-ts) is framework/library agnostic. However, wrapper components are also provided for popular libraries (currently [React](https://livecodes.io/docs/sdk/react) and [Vue](https://livecodes.io/docs/sdk/vue)). The SDK can be used in [Svelte](https://livecodes.io/docs/sdk/svelte) and [Solid](https://livecodes.io/docs/sdk/solid) directly without wrappers. [TypeScript support](https://livecodes.io/docs/sdk/js-ts#typescript-types) provides type-safety and a great developer experience.

React SDK example: ([open in LiveCodes](https://livecodes.io/?x=code/N4IgLglmA2CmIC4QBkIDdYGED2ATWAzgAQBKsAhgMZhEDKAIgNJH4C22IANCPgZQE4QADpGwA7RCC4gAFhVySAPK1hhyRSjPL8CqgLwAdEAFUAKgDEAtAA4jRAPQA+A2OWr1Y8isMg0EWADuQtj8YHaU4mCwYmA+ARC4YDJ6+H6UsJbxiTKcRBBiUBDk0JZ8xbB6AIwAdAAMdk7SMmCs0ACCYGA6ktDkYgDmPtHhvQQEPkbSav0EiADaALrcVJAYAKK4UCGSfIIi0qzaANYArkKIoL0DJ+T98EjNrdIRMdFgkiAAvtwEYACecAuICu-Rud0klDGz0ibw+3xAu2E7wQlz6oNu9xAACsCAAPaGvGKSCCsYKhIioDA4XhEABm-GwrCIAHJoOhYBFePZ+BRqMyANwGfguIUuF6-DTiWkQfpEPREYCisREIiHfinIQIBVKlUqkFg2Ba5lqo64bABMTMzg63UvKIxI0AYiIAAlYNBoNgiAB1ELQXAAQitNu+Ss+guFYnFNAACr0-v0GScxLg5UQABQASjljiIikpWDwhElYmlg2ALzLnyIfkCPh5BBO0DCIAcjgjLlguLJNHwtPITdj8cT2GTuA7EnhvwBhDkqlmCEWPwESIXS5AkIIMYbqg+3CEDPSYxCa6WG5Ov0ZtFUkAGC+A8JJPfv8P+QkIF1fhDA9+BaINkhvoQK77NwdqwkgXzcBgOgQOIkgAMwIVM2DYNAv7ROQABGcAKEgxTQNIKzshC4gEGh8A-GoYAXhCnq6AonyfEAA))

```jsx
import LiveCodes from 'livecodes/react';

const config = {
  markup: {
    language: 'markdown',
    content: '# Hello World!',
  },
};
const Playground = () => <LiveCodes config={config} view="result" />;
export default Playground;
```

Vue SDK example: ([open in LiveCodes](https://livecodes.io/?x=code/N4IgLglmA2CmIC4QBkIDdYGED2ATWAzgAQBqArrEQMoAiA0kfgLbYgA0I+BAxgE4QAHSNgB2iEOxAALWAENc4gDxNYYWUW5TZvAqoC8AHRABVACoAxALQAOI0QD0APgMjlq9SNkrDINBFgA7gLYvGB23KJgsCJgPgEQuGBSevh+3LCW8YlSbEQQIlAQstCWPMWwegCMAHQADHZOklJgTNAAgmBgOuLQsiIA5j7R4b0EBD5Gkmr9BIgA2gC6HLLckBgAorhQIeI8-EKSTNoA1mQCiKC9A2Sy-fBIza2SETHRYOIgAL4cBGAAnnALiArv0bndxNwxs9Im8Pt8QHtBO8EJc+qDbvdfBRoa8YkpEUIiLowGdnLwXEQ8kxgqEiKgMDguEQAGa8bBMIgAcmg6FgES49jQFE5AG4DOSROKKRpRL8ZSJmRB+kQ9ERgFKRJTKUdeKcBAg1RqtVqQWDYAbOTrjrhsAERJy2EbjfKojELQBiIgACVg0Gg2CIAHUQtBcABCB1OynfJ2fMUSxT2AlgMkuDWKKLU3pRVOaoiKelYPCEIgIF6KwZGctKux+QI+XiEMjQMIgBy5xOZgTZ2C5r4-f5wAgyVSzBCLH58JFjicgSEEAAKjeJHw4AjZ6TGIRnSznZF+7KoqkgAzHwHhEGpITAZ-h-wEhAud8IN6Bpox4nvhCnBw4L1dyISPCGA6BAojiAAzBBUzYNg0BniA0SyAARnAChIMU0CSCsayYi8BBwfAA6yCSY5zv6ugKJ8nxAA))

```html
<script setup>
  import LiveCodes from 'livecodes/vue';

  const config = {
    markup: {
      language: 'markdown',
      content: '# Hello World!',
    },
  };
</script>

<template>
  <LiveCodes :config="config" view="result" />
</template>
```

In addition, the SDK allows creating links to playgrounds:

```js
import { getPlaygroundUrl } from 'livecodes';

const url = getPlaygroundUrl({
  config: {
    markup: {
      language: 'markdown',
      content: '# Hello World!',
    },
  },
});

console.log(url);
```

See [SDK docs](https://livecodes.io/docs/sdk/) for more details.

## Documentations

Comprehensive documentations for [features](https://livecodes.io/docs/features/), [getting started](https://livecodes.io/docs/getting-started), [configuration](https://livecodes.io/docs/configuration/) and [SDK](https://livecodes.io/docs/sdk/) are available on:

https://livecodes.io/docs/

The documentations include demos, code samples, screenshots, [Storybook](https://livecodes.io/stories) and [TypeScript types](https://livecodes.io/docs/sdk/js-ts#typescript-types).

## Updates

Keep up with the latest changes:

- Twitter/X: [@livecodes_io](https://twitter.com/livecodes_io)
- Blog: [blog.livecodes.io](https://blog.livecodes.io/)
- Development build: [dev.livecodes.io](https://dev.livecodes.io/)

## Feedback

We welcome feedback!

Please start a new [issue](https://github.com/live-codes/livecodes/issues/new/choose) or [discussion](https://github.com/live-codes/livecodes/discussions/new).

For security reports please refer to [SECURITY.md](https://github.com/live-codes/livecodes/blob/develop/SECURITY.md).

You may also reach out to us using the [contact form](https://livecodes.io/docs/contact).

## Contribution

Contributions are welcome and highly appreciated.

A huge shout-out to our wonderful [contributors](https://github.com/live-codes/livecodes/graphs/contributors)! Your hard work makes all the difference!

Please refer to the [contribution guide](https://github.com/live-codes/livecodes/blob/HEAD/CONTRIBUTING.md).

## Credits

LiveCodes uses services that are generously provided by:

<p>
<a href="https://pages.cloudflare.com/" target="_blank" title="Cloudflare Pages">
  <img alt="Cloudflare Pages" width="200" src="https://dev.livecodes.io/docs/img/credits/cloudflare-pages.svg">
</img></a><br /><br />
</p>
<p>
<a href="https://www.jsdelivr.com/" target="_blank" title="jsDelivr">
  <img alt="jsDelivr" width="200" src="https://dev.livecodes.io/docs/img/credits/jsdelivr.svg">
</img></a><br /><br />
</p>
<p>
<a href="https://esm.sh/" target="_blank" title="esm.sh">
  <img alt="esm.sh" width="200" src="https://dev.livecodes.io/docs/img/credits/esm.sh.png">
</img></a><br /><br />
</p>
<p>
<a href="https://unpkg.com/" target="_blank" title="unpkg">
  <img alt="unpkg" width="200" src="https://dev.livecodes.io/docs/img/credits/unpkg.png">
</img></a><br /><br />
</p>
<p>
<a href="https://m.do.co/c/fb8c00b45b91" target="_blank" title="DigitalOcean">
  <img alt="DigitalOcean" width="200" src="https://dev.livecodes.io/docs/img/credits/digital-ocean.svg">
</img></a><br /><br />
</p>
<p>
<a href="https://bundlejs.com/" target="_blank" title="bundlejs">
  <img alt="bundlejs" width="200" src="https://dev.livecodes.io/docs/img/credits/bundlejs.jpg">
</img></a><br /><br />
</p>
<p>
<a href="https://dpaste.com/" target="_blank" title="dpaste">
  <img alt="dpaste" width="200" src="https://dev.livecodes.io/docs/img/credits/dpaste.png">
</img></a><br /><br />
</p>
<p>
<a href="https://github.com/" target="_blank" title="GitHub">
  <img alt="GitHub" width="200" src="https://dev.livecodes.io/docs/img/credits/github.png">
</img></a><br /><br />
</p>
<p>
<a href="https://netlify.com/" target="_blank" title="Netlify">
  <img alt="Netlify" width="200" src="https://dev.livecodes.io/docs/img/credits/netlify.svg">
</img></a><br /><br />
</p>
<p>
<a href="https://www.sonarsource.com/products/sonarcloud/" target="_blank" title="SonarCloud">
  <img alt="SonarCloud" width="200" src="https://dev.livecodes.io/docs/img/credits/sonarcloud.svg">
</img></a><br /><br />
</p>
<p>
<a href="https://www.codacy.com/" target="_blank" title="Codacy">
  <img alt="Codacy" width="200" src="https://dev.livecodes.io/docs/img/credits/codacy.svg">
</img></a><br /><br />
</p>
<p>
<a href="https://www.browserstack.com/" target="_blank" title="BrowserStack">
  <img alt="BrowserStack" width="200" src="https://dev.livecodes.io/docs/img/credits/browserstack.svg">
</img></a><br /><br />
</p>
<p>
<a href="https://lokalise.com/" target="_blank" title="Lokalise">
  <img alt="Lokalise" width="200" src="https://dev.livecodes.io/docs/img/credits/lokalise.png">
</img></a><br /><br />
</p>

## Third Party Packages

Packages used by LiveCodes and their licenses are [listed here](https://github.com/live-codes/livecodes/blob/develop/vendor-licenses.md).

## License

[MIT](https://github.com/live-codes/livecodes/blob/HEAD/LICENSE) License © [Hatem Hosny](https://github.com/hatemhosny)

## Sponsor

LiveCodes is free and open-source. The app does not contain ads or require subscription. It allows unlimited usage without any restrictions.

By sponsoring LiveCodes, you will be supporting the ongoing development and maintenance of the project, as well as helping to ensure that it remains a valuable resource for the developer community.

Please consider [becoming a sponsor](https://livecodes.io/docs/sponsor).
