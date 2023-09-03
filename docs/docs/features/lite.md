# Lite Mode

import LiveCodes from '../../src/components/LiveCodes.tsx';

In case you need to embed a playground in your web page to show case some code and expect users to mainly read through the code and to have just minor edits, it would be an overkill to load full-blown code editors with auto-complete and code formatting, specially if you want to embed more than one playground in the same page. That's why the LiveCodes playground has a lite mode.

In lite mode, a light-weight, minimal code editor is used ([CodeJar](./editor-settings.md#code-editor)). [Emmet abbreviations](./emmet.md) and [tools pane](./tools-pane.md) are not available. However, any language supported by LiveCodes can be used, with syntax highlighting. Code edits are compiled and shown in the [result page](./result.md) as usual.

Demo:

<LiveCodes template="react" lite={true}></LiveCodes>

## Using SDK

set [EmbedOptions.lite](../sdk/js-ts.md#lite) to `true`.

```js
import { createPlayground } from 'livecodes';

createPlayground('#container', { lite: true });
```

## Using query params

add the [query parameter](../configuration/query-params.md) `lite` (no need to set a value).

https://livecodes.io?lite

## Related

- [Read-only](./read-only.md).
