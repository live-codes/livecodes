# Display Modes

import LiveCodes from '../../src/components/LiveCodes.tsx';

The [configuration](../configuration/configuration-object.md) option [`mode`](../configuration/configuration-object.md#mode), also available as [query param](../configuration/query-params.md), can be used to select different display modes.
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

A read-only mode showing only the code block without editor interface. On mouse-over a copy button appears that allows to copy the code. This is specially useful when embedded.

Example: https://livecodes.io/?mode=codeblock&template=react

Demo:

<LiveCodes config={{mode:'codeblock'}} template="react"></LiveCodes>

By default, in `codeblock` mode, the light-weight `CodeJar` editor is used (in read-only mode). You can override this by setting the `editor` option. Refer to [Editor Settings](./editor-settings.md#code-editor) for details.

Example: https://livecodes.io/?mode=codeblock&editor=monaco&template=react

Demo:

<LiveCodes config={{mode:'codeblock', editor:'monaco'}} template="react"></LiveCodes>

## `result`

Shows the result page only, with a small overlay (appears on hover) that allows opening the project in the full playground.

Example: https://livecodes.io/?mode=result&template=react

Demo:

<LiveCodes params={{mode: 'result', template: 'react'}}></LiveCodes>

The tools pane (e.g. console/compiled code viewer) is hidden by default in `result` mode. It can be shown if set to `open` or `full`. Refer to [Tools pane](./tools-pane.md) documentation for details.

Example: https://livecodes.io/?mode=result&tools=console|full

Demo:

<LiveCodes params={{mode: 'result', tools: 'console|full'}}></LiveCodes>

## Display Mode vs Default View

:::info

"Display Mode" is different from "[Default View](./default-view.md)".

In `editor` display mode, only the editor is loaded and the result page is not available. While `editor` default view shows the editor by default, and the result page can be shown by dragging the split gutter.

The same applies for `result` display mode and default view.

:::
