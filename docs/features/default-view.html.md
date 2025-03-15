# Default View

import LiveCodes from '../../src/components/LiveCodes.tsx';

The playground can be loaded in one of the following views:

## `split`

Both the code editor and the result page are visible. This is the default.

Example: https://livecodes.io/?view=split

Demo:

<LiveCodes config={{ view: 'split' }}></LiveCodes>

## `editor`

The code editor is visible, while the result page is collapsed. The result page can be shown by dragging the split gutter, or clicking the "Toggle Result" button.

Example: https://livecodes.io/?view=editor

Demo:

<LiveCodes config={{ view: 'editor' }}></LiveCodes>

## `result`

The result page is visible, while the code editor is collapsed. The code editor can be shown by dragging the split gutter, or clicking one of the editor tabs.

Example: https://livecodes.io/?view=result

Demo:

<LiveCodes config={{ view: 'result' }}></LiveCodes>

## Display Mode vs Default View

:::info

"[Display Mode](./display-modes.html.md)" is different from "Default View".

In `editor` display mode, only the editor is loaded and the result page is not available. While `editor` default view shows the editor by default, and the result page can be shown by dragging the split gutter.

The same applies for `result` display mode and default view.

:::