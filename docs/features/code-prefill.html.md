# Code Prefill

import LiveCodes from '../../src/components/LiveCodes.tsx';

There are many ways to pre-fill code into playgrounds. This is generally achieved either by the [SDK](../sdk/index.html.md) or using [query params](../configuration/query-params.html.md).

## Prefill using SDK

When creating an embedded playground, the following [embed options](../sdk/js-ts.html.md)#embed-options) allow prefill with code:

### config

[EmbedOptions.config](../sdk/js-ts.html.md)#config)

loads a [configuration object](../configuration/configuration-object.html.md) (or a URL to JSON file representing the configuration object)

<LiveCodes
  config={{
    markup: { language: 'html', content: '<h1>Hello World!</h1>' },
    style: { language: 'css', content: 'h1 { color: blue; }' },
  }}
></LiveCodes>

### import

[EmbedOptions.import](../sdk/js-ts.html.md)#import)

allows [importing](./import.html.md) from many sources.

Examples:

Import GitHub directory:

<LiveCodes import="https://github.com/bradtraversy/50projects50days/tree/master/progress-steps"></LiveCodes>

Import shared project:

<LiveCodes import="id/6ys2b8txf33"></LiveCodes>

### template

[EmbedOptions.template](../sdk/js-ts.html.md)#template)

loads one of the [starter templates](./templates.html.md).

<LiveCodes template="react"></LiveCodes>

## Prefill using query params

[Query parameters](../configuration/query-params.html.md) can provide easy and powerful ways for configuring the playground.

Example:

<a href="https://livecodes.io/?md=**Hello World!**" target="_blank">
  {'https://livecodes.io/?md=**Hello World!**'}
</a>
<br />
<br />

<LiveCodes params={{ md: '**Hello World!**' }}></LiveCodes>

## Auto-Prefill from page DOM

TODO...

## Related

- [Import](./import.html.md)
- [Templates](./templates.html.md)
- [Configuration](../configuration/index.html.md)
- [SDK](../sdk/index.html.md)