# Lite Mode

import LiveCodes from '../../src/components/LiveCodes.tsx';

In case you need to embed a playground in your web page to show case some code and expect users to mainly read through the code and to have just minor edits, it would be an overkill to load full-blown code editors with auto-complete and code formatting, specially if you want to embed more than one playground in the same page. That's why the LiveCodes playground has a lite mode.

In lite mode, a light-weight, minimal code editor is used ([CodeJar](./editor-settings.html.md)#code-editor)). [Emmet abbreviations](./emmet.html.md) and [tools pane](./tools-pane.html.md) are not available. However, any language supported by LiveCodes can be used, with syntax highlighting. Code edits are compiled and shown in the [result page](./result.html.md) as usual.

Demo:

<LiveCodes template="react" config={{ mode: 'lite' }}></LiveCodes>

## Using SDK

Set [`EmbedOptions.config.mode`](../configuration/configuration-object.html.md)#mode) to `"lite"`.

```js
import { createPlayground } from 'livecodes';

createPlayground('#container', { config: { mode: 'lite' } });
```

## Using query params

Add the [query parameter](../configuration/query-params.html.md) `?mode=lite`.

https://livecodes.io?mode=lite

## Related

- [Read-only](./read-only.html.md).