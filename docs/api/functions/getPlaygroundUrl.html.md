# Function: getPlaygroundUrl()

> **getPlaygroundUrl**(`options`): `string`

Gets the URL to a LiveCodes playground (as a string) from the provided [options](https://livecodes.io/docs/sdk/js-ts#embed-options).
This can be useful for providing links to run code in playgrounds.

## Parameters

• **options**: [`EmbedOptions`](../interfaces/EmbedOptions.md) = `{}`

The [options](https://livecodes.io/docs/sdk/js-ts#embed-options) for the playground.

## Returns

`string`

- The URL of the playground (as a string).

large objects like config and params are store in the url hash params while the rest are in the search params
unless config is a string in which case it is stored in searchParams

## Defined in

[index.ts:387](https://github.com/live-codes/livecodes/blob/61a0396afe9816818482c9e42c3ba23295ad3520/src/sdk/index.ts#L387)