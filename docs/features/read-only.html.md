# Read-Only

import LiveCodes from '../../src/components/LiveCodes.tsx';

In case you need to embed a playground in your web page to show case some code and want users to read through the code and not allow edits, you may use the `readonly` setting.

Code editing, [formatting](./code-format.html.md), and [console input](./console.html.md) are not available. However, any language supported by LiveCodes can be used, with syntax highlighting. Code can be [prefilled](./code-prefill.html.md), and is compiled and shown in the [result page](./result.html.md) as usual.

By default, a light-weight, minimal [code editor](./editor-settings.html.md)#code-editor) is used. This can be changed by explicitly setting the [configuration object](../configuration/configuration-object.html.md) property [`editor`](../configuration/configuration-object.html.md)#editor) (e.g. to show hover intellisense).

Demo:

<LiveCodes template="javascript" config={{ readonly: true }}></LiveCodes>

## Using SDK

set the [configuration object](../configuration/configuration-object.html.md) property [`readonly`](../configuration/configuration-object.html.md)#readonly) to `true`.

```js
import { createPlayground } from 'livecodes';

createPlayground('#container', { template: 'javascript', config: { readonly: true } });
```

## Using query params

add the [query parameter](../configuration/query-params.html.md) `readonly` (no need to set a value).

https://livecodes.io?template=javascript&readonly

## Related

- [Code prefill](./code-prefill.html.md)
- [Lite mode](./lite.html.md)