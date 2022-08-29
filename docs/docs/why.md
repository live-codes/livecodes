# Why Another Playground?

## Introduction

There are great products like [CodePen](https://codepen.io/), [JSFiddle](https://jsfiddle.net/), [JS Bin](https://jsbin.com/), [CodeSandbox](https://codesandbox.io/), [Replit](https://replit.com/) and many others, which LiveCodes does not aim to replace or compete with. On the contrary, it aims to integrate with many of these services as their APIs allow (e.g. import and export).

## What makes LiveCodes different?

### Language Support

Currently, there are 60+ languages/frameworks supported. These include:

- Syntax used by web libraries/frameworks (e.g. JSX, TSX, Vue SFC, Svelte SFC, MDX, Astro).
- Languages that transpile to JavaScript (e.g. TypeScript, CoffeeScript, LiveScript, ReScript).
- Languages/utilities that generate CSS (e.g. SCSS, Less, Stylus, PostCSS, Tailwind CSS).
- Traditional programming languages (e.g. Python, Ruby, Go, PHP, C++, Lua, Scheme, Perl).
- Data manipulation/logic languages (e.g. SQL, Prolog).
- Authoring/templating languages (e.g Markdown, AsciiDoc, Pug, Handlebars, Haml).
- Low-code/visual editors (e.g. blockly, rich text editor).
- Modeling languages/graph-as-code (e.g. Gnuplot, Graphviz, Mermaid, Vega, Plotly).
- Languages that target WebAssembly (e.g. AssemblyScript, WebAssembly Text Format)
- ... and others.

For a full list check the [Languages](./languages/index.md) section.

This provides a wide variety of options. Generally, if you are a developer, there is a big chance you will find something interesting to do with LiveCodes.

### Client-Side!

All proccessing and code transformations run in the browser on the client-side. After the initial load, using the app can be significantly faster than having to wait for server rounds. Lazy-loading is heavily used, so that only parts of the app required for the selected languages/features are downloaded.

The code you write in LiveCodes does not leave your computer. All projects are private unless you choose to share/export/deploy them.

Being client-side allows the app to be hosted on any static file server or CDN, which removes the restrictions provided by other alternatives (like server storage or memory allocation). This makes LiveCodes available for a large number of developers without requiring them to pay for servers, so it can stay free with unlimited usage.

### Developer Tool

LiveCodes aims to be a feature-rich, easy to use playground that can be used for prototyping and education. The other main goal (in fact, that was the motive for its development), is to allow library developers to use it for the documentation of their libraries and as a showcase for their products. This can be achieved by [embedding playgrounds](./features/embeds.md) in documentation and educational websites. In addition, private (unpublished) modules can be imported with editor auto-completion and [intellisense](./features/intellisense.md).

That can be done using the hosted app ([livecodes.io](https://livecodes.io)), or as a [self-hosted](./getting-started.md#self-hosted) option. Again, being a client-side only app, LiveCodes becomes more convenient for not needing special server requirements, while features like export and deploy are provided by APIs of external services.

LiveCodes does NOT aim to be a social coding platform. It will stay as a backendless developer tool. Other platforms are already doing a great job in this regards.

### Build-Free Development Environment

LiveCodes provides many of the tools you may already be using. These include Monaco editor (that powers [VS Code](https://code.visualstudio.com/)), [Prettier](https://prettier.io/), [Emmet](https://emmet.io/), [Babel](https://babeljs.io/), [TypeScript](https://www.typescriptlang.org/), [SCSS](https://sass-lang.com/), [Less](https://lesscss.org/), [PostCSS](https://postcss.org/), [Jest](https://jestjs.io/) and [Testing Library](https://testing-library.com/), among others. NPM modules can be imported as usual. All that runs seamlessly in the browser without any explicit build step. It feels like a very light-weight version of your own local development environment with the keyboard shortcuts, intellisense and code navigation features.

It just works™ without having to `npm install` anything. Not even on the server (because there is no server!).

This can markedly improve productivity, reduce the mental load required for all the traditional setup and can significantly decrease the barrier to entry for learning new technologies.

### Web Platform

The output of code written in LiveCodes is a [web page](./features/result.md). Whatever language/syntax you use, the result can ultimately be viewed as a web page which you can interact with, [test](./features/tests.md), [share](./features/share.md) or [deploy](./features/deploy.md). Check the [starter templates](https://livecodes.io?screen=new) for examples.

Of course, the app can be still used as a REPL with the output seen in the integrated [console](./features/console.md). However, that's a secodary use case.

### Powerful API

The LiveCodes app ([hosted](./getting-started.md#hosted-app) or [self-hosted](./getting-started.md#self-hosted)) can be embedded in any web page. The provided [library](./getting-started.md#npm-package) provides a powerful [API](./advanced/api.md) that allows the embedding page to interact with the playground (e.g. run, get/set source code, format, get result page or compiled code, get share URL, listen to changes, run tests, get test results, change layout, etc.). This enables other apps to be built on top of LiveCodes.

Your imagination is the limit!

### Free and Open-Source

LiveCodes is a free product that allows unrestricted use for the hosted app and for the self-hosted option. It is licensed under the permissive [MIT license](./license.md) which allows free commercial use.

Please consider [sponsoring LiveCodes](./sponsor.md) if you find it useful, to support its maintenance and continued development.

:::caution Under Development

Please note that LiveCodes is still in active development and may not yet be ready for production use. API may change, and performance improvements may still be required. However please take the time to try it. Your feedback and contribution are highly appreciated.

:::

Enough talk, let's get started.
