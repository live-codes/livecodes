# Display Modes

import LiveCodes from '../../src/components/LiveCodes.tsx';

The configuration option `mode` can be used to select different display modes.
The following display modes are supported:

## `full`

This is the default mode with a top toolbar, editor and results panes.

Demo:

<LiveCodes query="template=react"></LiveCodes>

## `editor`

Hides the results pane and works as editor only.

Demo:

<LiveCodes query="mode=editor&template=react"></LiveCodes>

## `codeblock`

A read-only mode just showing only the code block. On mouse-over a copy button appears that allows to copy the code. This can useful when embedded.

Demo:

<LiveCodes query="mode=codeblock&template=react"></LiveCodes>

By default, in `codeblock` mode, `prism` editor is used. You can override this by setting the `editor` option. Refer to [Editors](./editors.md) for details.

Demo:

<LiveCodes query="mode=codeblock&editor=monaco&template=react"></LiveCodes>

## `result`

Shows the result page only, with a small overlay (appears on hover) that allows opening the project in the full playground.

Demo:

<LiveCodes query="mode=result&template=react"></LiveCodes>

The tools pane (e.g. console/compiled code viewer) ca be shown if set to `open` or `full`. Refer to [Tools pane](./tools-pane.md) documentation for details.

Demo:

<LiveCodes query="mode=result&template=react&console=open"></LiveCodes>
