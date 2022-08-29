# Tools Pane

import LiveCodes from '../../src/components/LiveCodes.tsx';

The resizeable tools pane (below the result page) provides an area for developer tools. This currently includes:

- [Console](./console.md)
- [Compiled code viewer](./compiled-code.md)
- [Tests](./tests.md)
- Open result page in new window (not in embeds)
- [Broadcast](broadcast.md) status (not in embeds)
- Loading spinner that appears when the result page is loading

The pane can be resized by dragging the bar. Clicking a tool button toggles opening/closing the pane. Double-click toggles maximize/close.

It can be configured to have any of the following states:

- `closed` (default)
- `open`
- `full`
- `none`

e.g. https://livecodes.io/?console=open&js=console.log('hello') <br />
opens the console and sets JavaScript code.

Demo: (console=open)

<LiveCodes query="console=open&js=console.log('hello')"></LiveCodes>

<p>&nbsp;</p>

Demo: (console=full)

<LiveCodes query="console=full&js=console.log('hello')"></LiveCodes>
