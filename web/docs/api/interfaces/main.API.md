---
id: "main.API"
title: "Interface: API"
sidebar_label: "API"
custom_edit_url: null
---

[main](../modules/main.md).API

## Hierarchy

- **`API`**

  ↳ [`Playground`](modules.models.Playground.md)

## Methods

### destroy

▸ **destroy**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

[src/livecodes/models.ts:14](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L14)

___

### format

▸ **format**(`allEditors?`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `allEditors?` | `boolean` |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/livecodes/models.ts:3](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L3)

___

### getCode

▸ **getCode**(): `Promise`<[`Code`](modules.models.Code.md)\>

#### Returns

`Promise`<[`Code`](modules.models.Code.md)\>

#### Defined in

[src/livecodes/models.ts:7](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L7)

___

### getConfig

▸ **getConfig**(`contentOnly?`): `Promise`<[`Config`](main.Config.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `contentOnly?` | `boolean` |

#### Returns

`Promise`<[`Config`](main.Config.md)\>

#### Defined in

[src/livecodes/models.ts:5](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L5)

___

### getShareUrl

▸ **getShareUrl**(`shortUrl?`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `shortUrl?` | `boolean` |

#### Returns

`Promise`<`string`\>

#### Defined in

[src/livecodes/models.ts:4](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L4)

___

### onChange

▸ **onChange**(`fn`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `fn` | [`ChangeHandler`](../namespaces/modules.models.md#changehandler) |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `remove` | () => `void` |

#### Defined in

[src/livecodes/models.ts:13](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L13)

___

### run

▸ **run**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

[src/livecodes/models.ts:2](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L2)

___

### runTests

▸ **runTests**(): `Promise`<{ `results`: [`TestResult`](modules.models.TestResult.md)[]  }\>

#### Returns

`Promise`<{ `results`: [`TestResult`](modules.models.TestResult.md)[]  }\>

#### Defined in

[src/livecodes/models.ts:12](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L12)

___

### setConfig

▸ **setConfig**(`config`): `Promise`<[`Config`](main.Config.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | `Partial`<[`Config`](main.Config.md)\> |

#### Returns

`Promise`<[`Config`](main.Config.md)\>

#### Defined in

[src/livecodes/models.ts:6](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L6)

___

### show

▸ **show**(`panel`, `options`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `panel` | ``"tests"`` \| [`EditorId`](../namespaces/modules.models.md#editorid) \| ``"console"`` \| ``"compiled"`` \| ``"result"`` |
| `options` | `Object` |
| `options.column?` | `number` |
| `options.full?` | `boolean` |
| `options.line?` | `number` |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/livecodes/models.ts:8](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L8)
