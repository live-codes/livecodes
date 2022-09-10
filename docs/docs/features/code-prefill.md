# Code Prefill

import LiveCodes from '../../src/components/LiveCodes.tsx';

There are many ways to pre-fill code into playgrounds. This is generally achieved either by the [library](../getting-started.md#npm-package) [API](../advanced/api.md) or using [query params](../configuration/query-params.md).

## Prefill using API

When creating an embeded playground, the following [embed options](../advanced/api.md#embed-options) allow prefill with code:

### config

[EmbedOptions.config](../advanced/api.md#config)

loads a [configuration object](../configuration/configuration-object.md) (or a URL to JSON file represention the configuration object)

<LiveCodes config={{markup: {language: 'html', content: '<h1>Hello World!</h1>'}, style: {language: 'css', content: 'h1 { color: blue; }'}}}></LiveCodes>

### import

[EmbedOptions.import](../advanced/api.md#import)

allows [importing](./import.md) from many sources.

Examples:

Import GitHub gist:

<LiveCodes import="https://gist.github.com/f01deb828a42f363502fbae7964d48e9"></LiveCodes>

Import shared project:

<LiveCodes import="id/6ys2b8txf33"></LiveCodes>

### template

[EmbedOptions.template](../advanced/api.md#template)

loads one of the [starter templates](./templates.md).

<LiveCodes template="react"></LiveCodes>

## Prefill using query params

[Query parameters](../configuration/query-params.md) can provide easy and powerful ways for configuring the playground.

Example:

<a href="https://livecodes.io/?md=**Hello World!**" target="_blank">https://livecodes.io/?md=**Hello World!**</a><br /><br />

<LiveCodes query="md=**Hello World!**"></LiveCodes>
