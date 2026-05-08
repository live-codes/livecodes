# Function: createPlayground()

## createPlayground(container, options)

> **createPlayground**(`container`, `options`?): `Promise`\<[`Playground`](../interfaces/Playground.md)\>

Creates a LiveCodes playground.

### Parameters

• **container**: `string` \| `HTMLElement`

`HTMLElement` or a string representing a CSS selector. This is the container where the playground is rendered.
 If not found, an error is thrown (except in [headless mode](https://livecodes.io/docs/sdk/headless), in which this parameter is optional and can be omitted).

• **options?**: [`EmbedOptions`](../interfaces/EmbedOptions.md)

The [embed options](https://livecodes.io/docs/sdk/js-ts#embed-options) for the playground (optional).

### Returns

`Promise`\<[`Playground`](../interfaces/Playground.md)\>

A promise that resolves to a [`Playground`](https://livecodes.io/docs/api/interfaces/Playground/) object which exposes many [SDK methods](https://livecodes.io/docs/sdk/js-ts/#sdk-methods) that can be used to interact with the playground.

### Defined in

[src/sdk/index.ts:36](https://github.com/live-codes/livecodes/blob/d62960022f85a48a6957f2d51a7d1293dfcb55e8/src/sdk/index.ts#L36)

## createPlayground(options)

> **createPlayground**(`options`): `Promise`\<[`Playground`](../interfaces/Playground.md)\>

### Parameters

• **options**: [`EmbedOptions`](../interfaces/EmbedOptions.md) & `object`

### Returns

`Promise`\<[`Playground`](../interfaces/Playground.md)\>

### Defined in

[src/sdk/index.ts:40](https://github.com/live-codes/livecodes/blob/d62960022f85a48a6957f2d51a7d1293dfcb55e8/src/sdk/index.ts#L40)