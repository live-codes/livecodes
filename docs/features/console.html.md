# Console

import LiveCodes from '../../src/components/LiveCodes.tsx';

Console messages are shown in the integrated console (in the [tools pane](./tools-pane.html.md), below the result page), without having to open the native browser console.

Messages can be sent to the console using the standard `console` methods in the code editor (e.g. `console.log`, `console.warn`, `console.error`, `console.table`, ...etc). The console can also be used as REPL (read–eval–print loop) using the integrated console input.

The code is evaluated in the context of the result page (i.e. variables defined in the script editor are accessible for evaluation in the console input). Also code completion works in the console input.

e.g. https://livecodes.io/?ts&console=full <br />
sets TypeScript as the active editor and shows the console maximized.

Demo: (console=full)

<LiveCodes
  params={{
    console: 'full',
    js: `const x = 5;\nconsole.log('x:', x);\nconsole.log({x, y: 6});\nconsole.table({x, y: 6});\nconsole.warn('take care!');\nconst z = x * y;`,
  }}
></LiveCodes>

<p>&nbsp;</p>

:::tip

Setting the querystring `languages` only shows these languages.
Selecting one language and setting console to `full` gives an environment similar to a REPL.

:::

Demo: (Python - print to console)

<LiveCodes
  params={{ languages: 'py', console: 'full', py: "print('hello from python')" }}
></LiveCodes>