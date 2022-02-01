# Display Modes

import LiveCodes from '../../src/components/LiveCodes.tsx';

The configuration option `mode` can be used to select different display modes.
The following display modes are supported:

## `full`

This is the default mode with toolbars, editor and result panes.

Example: https://livecodes.io/?template=react

Demo:

<LiveCodes template="react"></LiveCodes>

## `editor`

Hides the results pane and works as editor only.

Example: https://livecodes.io/?mode=editor&template=react

Demo:

<LiveCodes config={{mode:'editor'}} template="react"></LiveCodes>

## `codeblock`

A read-only mode just showing only the code block. On mouse-over a copy button appears that allows to copy the code. This can useful when embedded.

Example: https://livecodes.io/?mode=codeblock&template=react

Demo:

<LiveCodes config={{mode:'codeblock'}} template="react"></LiveCodes>

By default, in `codeblock` mode, `prism` editor is used. You can override this by setting the `editor` option. Refer to [Editors](./editors.md) for details.

Example: https://livecodes.io/?mode=codeblock&editor=monaco&template=react

Demo:

<LiveCodes config={{mode:'codeblock', editor:'monaco'}} template="react"></LiveCodes>

## `result`

Shows the result page only, with a small overlay (appears on hover) that allows opening the project in the full playground.

Example: https://livecodes.io/?mode=result&template=react

Demo:

<LiveCodes config={{mode:'result'}} template="react"></LiveCodes>

The tools pane (e.g. console/compiled code viewer) is hidden by default in `result` mode. It can be shown if set to `open` or `full`. Refer to [Tools pane](./tools-pane.md) documentation for details.

Example: https://livecodes.io/?mode=result&console=open&template=react

Demo:

<LiveCodes config={{mode:'result', console:'open'}} template="react"></LiveCodes>
