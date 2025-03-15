# Why Another Playground?

There are great products like [CodePen](https://codepen.io/), [JSFiddle](https://jsfiddle.net/), [JS Bin](https://jsbin.com/), [CodeSandbox](https://codesandbox.io/), [Replit](https://replit.com/) and many others, which LiveCodes does not aim to replace or compete with. On the contrary, it aims to [integrate](./features/integrations.html.md) with as many of these services as their APIs allow.

## What makes LiveCodes different?

### Language Support

Currently, there are 90+ languages/frameworks supported. These include:

- Web languages (HTML, CSS & JavaScript).
- Web frameworks/libraries (e.g. React JSX/TSX, Vue SFC, Svelte SFC, Solid, MDX, Astro).
- Languages that transpile to JavaScript (e.g. TypeScript, CoffeeScript, LiveScript, ReScript).
- Languages/frameworks that generate CSS (e.g. SCSS, Less, Stylus, Tailwind CSS, UnoCSS).
- CSS processors (e.g. PostCSS, Autoprefixer, Lightning CSS, CSS Modules, cssnano).
- Traditional programming languages (e.g. Python, Ruby, Go, PHP, C++, R, Lua, Scheme, Perl).
- Data manipulation/logic languages (e.g. SQL, Prolog).
- Authoring/templating languages (e.g Markdown, AsciiDoc, Pug, Handlebars, Haml).
- Low-code/visual editors (e.g. blockly, rich text editor).
- Modeling languages/diagram-as-code (e.g. Gnuplot, Graphviz, Mermaid, Vega, Plotly).
- Languages that target WebAssembly (e.g. AssemblyScript, WebAssembly Text Format).
- ... and many more.

For a full list check the [Languages](./languages/index.html.md) section.

Generally, if you are a developer (or want to be one), there is a big chance you will find something interesting to do with LiveCodes.

### Client-Side!

All processing and code transformations run in the browser on the client-side. After the initial load, the app gets significantly faster without having to wait for server rounds. Lazy-loading is heavily used. Only parts of the app required for the selected languages/features are downloaded.

The code you write in LiveCodes does not leave your computer. All projects are private unless you choose to share/export/deploy them.

Being a client-side app allows it to be hosted on any static file server or CDN, which removes the high requirements needed by other alternatives (like server storage or memory). This makes LiveCodes available for a large number of developers without requiring them to pay for servers, so it can stay free with unlimited usage 😊.

### Developer Tool

LiveCodes aims to be a feature-rich, easy to use playground that can be used for prototyping and education. The other main goal (in fact, that was the motive for its development), is to allow library developers to use it for documentation of their libraries and showcase their products. This can be achieved by [embedding playgrounds](./features/embeds.html.md) in blogs, tutorials, documentation and educational websites. In addition, private (unpublished) modules can be imported with editor auto-completion and [IntelliSense](./features/intellisense.html.md).

That can be done using the official app ([livecodes.io](https://livecodes.io)), or as a [self-hosted](./features/self-hosting.html.md) option. Again, being a client-side-only app, LiveCodes becomes more convenient for not needing special server requirements, while features like export and deploy are provided by APIs of external services.

LiveCodes does NOT aim to be a social coding platform. It will stay as a backendless developer tool. Other platforms are already doing a great job in this regards.

### Build-Free Development Environment

LiveCodes provides many of the tools you may already be using. These include Monaco editor (that powers [VS Code](https://code.visualstudio.com/)), [Prettier](https://prettier.io/), [Emmet](https://emmet.io/), [Babel](https://babeljs.io/), [TypeScript](https://www.typescriptlang.org/), [SCSS](https://sass-lang.com/), [Less](https://lesscss.org/), [PostCSS](https://postcss.org/), [Jest](https://jestjs.io/) and [Testing Library](https://testing-library.com/), among others. [NPM modules](./features/module-resolution.html.md) can be imported as usual. All these tools run seamlessly in the browser without any explicit build step. It feels like a very light-weight version of your own local development environment with the keyboard shortcuts, IntelliSense and code navigation features.

It just works™ without having to `npm install` anything. Not even on the server (because there is no server!).

This can markedly improve productivity, reduce the mental load required for all the traditional setup and can significantly decrease the barrier to entry for learning new technologies.

### Web Platform

The output of code written in LiveCodes is a [web page](./features/result.html.md). Whatever language/syntax you use, the result can ultimately be viewed as a web page which you can interact with, [test](./features/tests.html.md), [share](./features/share.html.md) or [deploy](./features/deploy.html.md). Check the [starter templates](https://livecodes.io?screen=new) for examples.

Of course, the app can be still used as a REPL with the output seen in the integrated [console](./features/console.html.md).

### Powerful SDK

The LiveCodes app ([standalone](./getting-started.html.md)#standalone-app) or [self-hosted](./features/self-hosting.html.md)) can be [embedded](./features/embeds.html.md) in any web page. A powerful [SDK](./sdk/index.html.md) allows the embedding page to interact with the playground (e.g. run, get/set source code, format, get result page or compiled code, get share URL, listen to changes, run tests, get test results, change layout, etc.). This enables other apps to be built on top of LiveCodes.

Your imagination is the limit!

### Free and Open-Source

LiveCodes is a free product that allows unrestricted use for the hosted app and for the self-hosted option. It is licensed under the permissive [MIT license](./license.html.md) which allows free commercial use.

Please consider [sponsoring LiveCodes](./sponsor.html.md) if you find it useful, to support its maintenance and continued development.

:::caution Under Development

LiveCodes is currently in **public beta**. It is in active development. However, please take the time to try it. Use [permanent URL](./features/permanent-url.html.md) and pinned [library version](./sdk/index.html.md) to avoid breaking changes. Your feedback and contribution are highly appreciated.

:::

Enough talk, let's get started.