# Compiled Code

import LiveCodes from '../../src/components/LiveCodes.tsx';

The resulting compiled/transpiled code can be seen in the compiled code viewer (in the [tools pane](./tools-pane.html.md)) in real-time, as you type. This works for all compiled code (e.g. Markdown, Pug, SCSS, Less, Stylus, Typescript, CoffeeScript, ...etc.).

This can be a great tool for learning. As you write code, you see the compiled code and the resulting page at the same time. The compiled code viewer shows the code compiled from the currently active editor (markup/style/script). This includes the CSS produced by CSS processors (e.g. Autoprefixer), if enabled.

![Compiled Code Viewer](./../../static/img/screenshots/compiled-code-1.jpg)

e.g. https://livecodes.io/?ts&compiled=full <br />
sets TypeScript as the active editor and shows compiled code viewer maximized.

This demo shows TypeScript code along with the compiled Javascript code, similar to the [official TypeScript Playground](https://www.typescriptlang.org/play):

<LiveCodes
  import="https://gist.github.com/hatemhosny/4bed283ef9757a6a541aee685c710dc7"
  params={{ 'ts-selector': 'playground.ts', activeEditor: 'script', compiled: 'full' }}
></LiveCodes>