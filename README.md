# LiveCodes

Code Playground That Just Works!

<p align="center">
<img width="300" src="https://dev.livecodes.io/docs/img/livecodes-logo.svg"></img>
</p>

A [feature-rich](https://livecodes.io/docs/features/), open-source, **client-side** code playground for React, Vue, Svelte, Solid, Typescript, Python, Go, Ruby, PHP and [80+ languages/frameworks](https://livecodes.io/docs/languages/).

[![Codacy Badge](https://app.codacy.com/project/badge/Grade/3d39f15618e048db9d13c2a0e8002b33)](https://www.codacy.com/gh/live-codes/livecodes/dashboard?utm_source=github.com&utm_medium=referral&utm_content=live-codes/livecodes&utm_campaign=Badge_Grade)

[Try it now on livecodes.io](https://livecodes.io)

[Documentations](https://livecodes.io/docs)

[What makes LiveCodes different?](https://livecodes.io/docs/why)

<a href="https://dev.livecodes.io/docs/img/screenshots/livecodes-languages.jpg" target="_blank"><img src="https://dev.livecodes.io/docs/img/screenshots/livecodes-languages.jpg" width="600" /></a>

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
- Use modules from npm, deno.land/x, GitHub, and others
- Easily embed it in your web pages
- It runs in the browser (client-side)

<small>\* GitHub account is required only for features that use <a href="https://livecodes.io/docs/features/github-integration" target="_blank" rel="noopener">GitHub Integration</a>.</small>

### Quick Start

#### Standalone App

1. Go to [livecodes.io](https://livecodes.io)

... that's it!

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

#### Self-hosted

1. Download a [release](https://github.com/live-codes/livecodes/releases)
2. Put it on a static file server (for free!) <sup><a href="https://pages.cloudflare.com/" target="_blank" rel="noopener">1</a>, <a href="https://vercel.com/" target="_blank" rel="noopener">2</a>, <a href="https://www.netlify.com/" target="_blank" rel="noopener">3</a>, <a href="https://firebase.google.com/" target="_blank" rel="noopener">4</a>, <a href="https://pages.github.com/" target="_blank" rel="noopener">5</a></sup>

... and it just works!

## Feature Summary

- A wide range of [language support](https://livecodes.io/docs/languages/) (80+ languages/frameworks/processors)
- [Powerful Editor](https://livecodes.io/docs/features/editor-settings)
- Mobile-friendly
- [External resources/libraries](https://livecodes.io/docs/features/external-resources)
- [Import modules](https://livecodes.io/docs/features/module-resolution) from npm, deno.land/x, GitHub and others
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
- Powerful [SDK](https://livecodes.io/docs/sdk/) (available for [JavaScript, TypeScript](https://livecodes.io/docs/sdk/js-ts), [React](https://livecodes.io/docs/sdk/react) and [Vue](https://livecodes.io/docs/sdk/vue))
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

## License

[MIT](https://github.com/live-codes/livecodes/blob/HEAD/LICENSE)

## Sponsor

LiveCodes is free and open-source. The app does not contain ads or require subscription. It allows unlimited usage without any restrictions.

By sponsoring LiveCodes, you will be supporting the ongoing development and maintenance of the project, as well as helping to ensure that it remains a valuable resource for the developer community.

Please consider [becoming a sponsor](https://livecodes.io/docs/sponsor).
