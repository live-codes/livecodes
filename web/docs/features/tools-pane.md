# Tools Pane

import LiveCodes from '../../src/components/LiveCodes.tsx';

The resizeable tools pane (below the result page) provides an area for developer tools. This currently includes the [console](./console.md) and [compiled code viewer](./compiled-code.md). In addition, it shows a loading spinner when the result page is loading. The pane can be resized by dragging the bar. Clicking a tool button toggles opening/closing the pane. Double-click toggles maximize/close.

It can be configured to have any of the following states:

- `closed` (default)
- `open`
- `full`
- `none`

e.g. https://livecodes.io/?console=open&js=console.log('hello') <br />
opens the console and sets JavaScript code.

Demo: (console=open)

<LiveCodes query="console=open&js=console.log('hello')"></LiveCodes>

<details>
<summary>show code</summary>

```html
<iframe src="https://livecodes.io/?embed&console=open&js=console.log('hello')"></iframe>
```

</details>

<p>&nbsp;</p>

Demo: (console=full)

<LiveCodes query="console=full&js=console.log('hello')"></LiveCodes>

<details>
<summary>show code</summary>

```html
<iframe src="https://livecodes.io/?embed&console=full&js=console.log('hello')"></iframe>
```

</details>
