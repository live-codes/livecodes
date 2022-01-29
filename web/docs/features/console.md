# Console

import LiveCodes from '../../src/components/LiveCodes.tsx';

Console messages are shown in the integrated console (in the [tools pane](./tools-pane.md), below the result page), without having to open the native browser console.

Messages can be sent to the console using the standard `console` methods in the code editor (e.g. `console.log`, `console.warn`, `console.error`, `console.table`, ...etc). The console can also be used as REPL (read–eval–print loop) using the integrated console input.

The code is evaluated in the context of the result page (i.e. variables defined in the script editor are accessible for evaluation in the console input). Also code completion works in the console input.

e.g. https://livecodes.io/?ts&console=full <br />
sets TypeScript as the active editor and shows the console maximized.

Demo: (console=full)

<LiveCodes query="console=full&js=const%20x%20=%205;%0Aconsole.log(%27x:%27,%20x);%0Aconsole.log({x,%20y:%206});%0Aconsole.table({x,%20y:%206});%0Aconsole.warn(%27take%20care!%27);%0Aconst%20z%20=%20x%20*%20y;"></LiveCodes>

<details>
<summary>show code</summary>

```html
<iframe
  src="https://livecodes.io/?embed&console=full&js=const%20x%20=%205;%0Aconsole.log(%27x:%27,%20x);%0Aconsole.log({x,%20y:%206});%0Aconsole.table({x,%20y:%206});%0Aconsole.warn(%27take%20care!%27);%0Aconst%20z%20=%20x%20*%20y;"
></iframe>
```

</details>

<p>&nbsp;</p>

:::tip

Setting the querystring `languages` only shows these languages.
Selecting one language and setting console to `full` gives an environment similar to a REPL.

:::

Demo: (Python - print to console)

<LiveCodes query="languages=py&console=full&py=print('hello%20from%20python')"></LiveCodes>

<details>
<summary>show code</summary>

```html
<iframe
  src="https://livecodes.io/?embed&languages=py&console=full&py=print('hello%20from%20python')"
></iframe>
```

</details>
