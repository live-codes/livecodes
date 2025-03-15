# Display Modes

import LiveCodes from '../../src/components/LiveCodes.tsx';

The [configuration](../configuration/configuration-object.html.md) option [`mode`](../configuration/configuration-object.html.md)#mode), also available as [query param](../configuration/query-params.html.md), can be used to select different display modes.
The following display modes are supported:

## `full`

This is the default mode with toolbars, editor and result panes.

Example: https://livecodes.io/?template=react

Screenshot: (App in full mode)

![full-mode](../../static/img/screenshots/mode-full.jpg)

Demo: (Embedded playground in full mode)

<LiveCodes template="react"></LiveCodes>

## `focus`

This hides most of UI buttons and menus and keeps only the essential elements: editors, editor titles, result page, console, and run and share buttons. It can be toggled during runtime from the full mode through the UI from a button in the lower left corner. Also the query param `?mode=focus`.

Example: https://livecodes.io/?template=react&mode=focus

Screenshot: (focus mode)

![focus-mode](../../static/img/screenshots/mode-focus.jpg)

## `simple`

This mode is mainly useful for embedded playgrounds.
It shows only 1 editor with the output (result page +/- console). The content of other editors can be set using [SDK](../sdk/index.html.md) [config](../configuration/configuration-object.html.md) even though the editors are not shown.
By default, `codemirror` editor is used, however, this can be changed by the [`editor`](../configuration/configuration-object.html.md)#editor) option.
By default, the layout is `responsive` but can also be overridden by the [`layout`](../configuration/configuration-object.html.md)#layout) option to `vertical` or `horizontal`.

Demo: JS with console

<LiveCodes
  params={{ mode: 'simple', js: 'console.log("hello world")', layout: 'vertical', console: 'full' }}
></LiveCodes>

Demo: JSX & Result page (Monaco editor, add CSS)

export const simpleConfig = {
  mode: 'simple',
  layout: 'vertical',
  activeEditor: 'script',
  editor: 'monaco',
  tools: { status: 'none' },
  script: {
    language: 'jsx',
    content: `import { atom, useAtom } from 'jotai';\n\nconst countAtom = atom(0);\n\nconst Counter = () => {\n  const [count, setCount] = useAtom(countAtom);\n  const inc = () => setCount((c) => c + 1);\n  return (\n    <>\n      {count} <button onClick={inc}>+1</button>\n    </>\n  );\n};\n\nconst App = () => (\n  <div className="App">\n    <h1>Hello Jotai</h1>\n    <h2>Enjoy coding!</h2>\n    <Counter />\n  </div>\n);\n\nexport default App;\n`,
  },
  style: {
    language: 'css',
    content: '.App {\n font-family: sans-serif;\n text-align: center;\n}\n'.trimStart(),
  },
};

<LiveCodes config={simpleConfig} height="400px"></LiveCodes>

## `lite`

Loads a light-weight, minimal code editor, with limited playground features.
See the section about [lite mode](./lite.html.md) for details

Example: https://livecodes.io/?mode=lite&template=react

Demo:

<LiveCodes config={{ mode: 'lite' }} template="react"></LiveCodes>

## `editor`

Hides the results pane and works as editor only.

Example: https://livecodes.io/?mode=editor&template=react

Demo:

<LiveCodes config={{ mode: 'editor' }} template="react"></LiveCodes>

## `codeblock`

A read-only mode showing only the code block without editor interface. On mouse-over a copy button appears that allows to copy the code. This is specially useful when embedded.

Example: https://livecodes.io/?mode=codeblock&template=react

Demo:

<LiveCodes config={{ mode: 'codeblock' }} template="react"></LiveCodes>

By default, in `codeblock` mode, the light-weight `CodeJar` editor is used (in read-only mode). You can override this by setting the `editor` option. Refer to [Editor Settings](./editor-settings.html.md)#code-editor) for details.

Example: https://livecodes.io/?mode=codeblock&editor=monaco&template=react

Demo:

<LiveCodes config={{ mode: 'codeblock', editor: 'monaco' }} template="react"></LiveCodes>

## `result`

Shows the result page only, with a drawer at the bottom (which can be closed) that allows opening the project in the full playground.

Example: https://livecodes.io/?mode=result&template=react

Demo:

<LiveCodes params={{ mode: 'result', template: 'react' }}></LiveCodes>

The tools pane (e.g. console/compiled code viewer) is hidden by default in `result` mode. It can be shown if set to `open` or `full`. Refer to [Tools pane](./tools-pane.html.md) documentation for details.

Example: https://livecodes.io/?mode=result&tools=console|full&&js=console.log("Hello%20World!")

Demo:

<LiveCodes
  params={{ mode: 'result', tools: 'console|full', js: 'console.log("Hello World!")' }}
></LiveCodes>

## Display Mode vs Default View

:::info

"Display Mode" is different from "[Default View](./default-view.html.md)".

In `editor` display mode, only the editor is loaded and the result page is not available. While `editor` default view shows the editor by default, and the result page can be shown by dragging the split gutter.

The same applies for `result` display mode and default view.

:::