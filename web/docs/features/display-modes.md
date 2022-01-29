# Display Modes

import LiveCodes from '../../src/components/LiveCodes.tsx';

The querystring parameter `mode` can be used to select different display modes.
The following display modes are supported:

- `full`: This is the default mode with a top toolbar, editor and results panes.

  Example: https://livecodes.io/

  Demo:

  <LiveCodes query="js=console.log('hello world!');"></LiveCodes>

- `editor`: Hides the results pane and works as editor only.

  example: https://livecodes.io/?mode=editor

  Demo:

  <LiveCodes query="mode=editor&js=console.log('hello world!');"></LiveCodes>

- `codeblock`: A read-only mode just showing only the code block. On mouse-over a copy button appears that allows to copy the code. This is useful when embedded

  Example: [Demo](https://live-codes.github.io/livecodes-examples/embed.html#codeblock) [View source](https://github.com/live-codes/livecodes-examples/blob/master/embed.html#L56)

  Demo:

  <LiveCodes query="mode=codeblock&js=script.jsx#https://gist.github.com/hatemhosny/a0a32216df59e53879b7cd83856cdde4"></LiveCodes>
