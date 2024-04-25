[![Ceasefire_Now-techforpalestine.org](https://img.shields.io/badge/%F0%9F%87%B5%F0%9F%87%B8_Ceasefire_Now-techforpalestine.org-D83838?color=D83838)](https://www.techforpalestine.org)

# LiveCodes

Code Playground That Just Works!

<p align="center">
<img width="300" src="https://dev.livecodes.io/docs/img/livecodes-logo.svg"></img>
</p>

A [feature-rich](https://livecodes.io/docs/features/), open-source, **client-side** code playground for React, Vue, Svelte, Solid, Typescript, Python, Go, Ruby, PHP and [80+ languages/frameworks](https://livecodes.io/docs/languages/).

[![LiveCodes: uptime status](https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/live-codes/upptime/master/api/live-codes/uptime.json)](https://status.livecodes.io)
[![LiveCodes: app version](https://img.shields.io/github/v/release/live-codes/livecodes?label=app)](https://livecodes.io)
[![LiveCodes: npm version](https://img.shields.io/npm/v/livecodes)](https://www.npmjs.com/package/livecodes)
[![LiveCodes: npm downloads](https://img.shields.io/npm/dw/livecodes)](https://www.npmjs.com/package/livecodes)
[![LiveCodes: languages](https://img.shields.io/badge/languages-90-blue)](https://livecodes.io/docs/languages/)
[![Codacy Badge](https://app.codacy.com/project/badge/Grade/3d39f15618e048db9d13c2a0e8002b33)](https://www.codacy.com/gh/live-codes/livecodes/dashboard?utm_source=github.com&utm_medium=referral&utm_content=live-codes/livecodes&utm_campaign=Badge_Grade)
[![license - MIT](https://img.shields.io/github/license/live-codes/livecodes)](https://github.com/live-codes/livecodes/blob/develop/LICENSE)
[![LiveCodes: GitHub repo](https://img.shields.io/github/stars/live-codes/livecodes?style=social)](https://github.com/live-codes/livecodes)

[Try it now on livecodes.io](https://livecodes.io)

[Documentations](https://livecodes.io/docs)

[What makes LiveCodes different?](https://livecodes.io/docs/why)

![LiveCodes list of languages screenshot](https://dev.livecodes.io/docs/img/screenshots/livecodes-languages.jpg)

## Code Playground That Just Works!

- No servers to configure (or pay for!)
- No databases to maintain (or pay for!)
- No installs
- No configuration files
- No build steps
- No subscription fees (free and open-source)
- No account required \*
- No limits for usage (unlimited private projects)
- 80+ languages/frameworks/processors
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
  import { createPlayground } from 'https://unpkg.com/livecodes';

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
2. Put it on a static file server (for free!) <sup><a href="https://pages.cloudflare.com/" target="_blank" rel="noopener">1</a>, <a href="https://vercel.com/" target="_blank" rel="noopener">2</a>, <a href="https://www.netlify.com/" target="_blank" rel="noopener">3</a>, <a href="https://firebase.google.com/" target="_blank" rel="noopener">4</a>, <a href="https://pages.github.com/" target="_blank" rel="noopener">5</a></sup>

   <sup>Check the guide for <a href="https://livecodes.io/docs/features/self-hosting" target="_blank" rel="noopener">self-hosting</a> (including the built-in setup to deploy to GitHub Pages).</sup>

... and it just works!

## Feature Summary

- A wide range of [language support](https://livecodes.io/docs/languages/) (80+ languages/frameworks/processors)
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
- [AI Code Assistant 🪄](https://livecodes.io/docs/features/ai)
- [Lite mode](https://livecodes.io/docs/features/lite)
- [Read-only mode](https://livecodes.io/docs/features/read-only)
- [Broadcast](https://livecodes.io/docs/features/broadcast)
- [Sync](https://livecodes.io/docs/features/sync)
- [Backup/Restore](https://livecodes.io/docs/features/backup-restore)
- [Client-side!](https://livecodes.io/docs/why#client-side)
- Very [configurable](https://livecodes.io/docs/configuration/)
- Developer-friendly build-free environment
- Powerful [SDK](https://livecodes.io/docs/sdk/) (available for [vanilla JavaScript, TypeScript](https://livecodes.io/docs/sdk/js-ts), [React](https://livecodes.io/docs/sdk/react), [Vue](https://livecodes.io/docs/sdk/vue) and [Svelte](https://livecodes.io/docs/sdk/svelte))
- Comprehensive [Documentations](https://livecodes.io/docs/)
- Focused on [privacy and security](https://livecodes.io/docs/features/security)
- Free and [Open-Source](https://livecodes.io/docs/license)

For details check the [full list of features](https://livecodes.io/docs/features/).

## Documentations

Comprehensive documentations for [features](https://livecodes.io/docs/features/), [getting started](https://livecodes.io/docs/getting-started), [configuration](https://livecodes.io/docs/configuration/) and [SDK](https://livecodes.io/docs/sdk/) are available on:

https://livecodes.io/docs/

The documentations include demos, code samples, screenshots, [Storybook](https://livecodes.io/stories) and [TypeScript types](https://livecodes.io/docs/sdk/js-ts#typescript-types).

## Contribution

Contributions are welcome and highly appreciated.

Please refer to the [contribution guide](https://github.com/live-codes/livecodes/blob/HEAD/CONTRIBUTING.md)

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
<a href="https://codeium.com/" target="_blank" title="Codeium">
  <img alt="Codeium" width="200" src="https://dev.livecodes.io/docs/img/credits/codeium.svg">
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
<a href="https://bundlewatch.io/" target="_blank" title="BundleWatch">
  <img alt="BundleWatch" width="200" src="https://dev.livecodes.io/docs/img/credits/bundlewatch.svg">
</img></a><br /><br />
</p>
<p>
<a href="https://www.browserstack.com/" target="_blank" title="BrowserStack">
  <img alt="BrowserStack" width="200" src="https://dev.livecodes.io/docs/img/credits/browserstack.svg">
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
