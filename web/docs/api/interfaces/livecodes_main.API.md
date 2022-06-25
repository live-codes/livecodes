---
id: "livecodes_main.API"
title: "Interface: API"
sidebar_label: "API"
custom_edit_url: null
---

[livecodes/main](../modules/livecodes_main.md).API

## Methods

### destroy

▸ **destroy**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

[livecodes/models.ts:14](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L14)

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

[livecodes/models.ts:3](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L3)

___

### getCode

▸ **getCode**(): `Promise`<`Code`\>

#### Returns

`Promise`<`Code`\>

#### Defined in

[livecodes/models.ts:7](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L7)

___

### getConfig

▸ **getConfig**(`contentOnly?`): `Promise`<[`Config`](livecodes_main.Config.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `contentOnly?` | `boolean` |

#### Returns

`Promise`<[`Config`](livecodes_main.Config.md)\>

#### Defined in

[livecodes/models.ts:5](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L5)

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

[livecodes/models.ts:4](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L4)

___

### onChange

▸ **onChange**(`fn`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `fn` | `ChangeHandler` |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `remove` | () => `void` |

#### Defined in

[livecodes/models.ts:13](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L13)

___

### run

▸ **run**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

[livecodes/models.ts:2](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L2)

___

### runTests

▸ **runTests**(): `Promise`<{ `results`: `TestResult`[]  }\>

#### Returns

`Promise`<{ `results`: `TestResult`[]  }\>

#### Defined in

[livecodes/models.ts:12](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L12)

___

### setConfig

▸ **setConfig**(`config`): `Promise`<[`Config`](livecodes_main.Config.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | `Partial`<[`Config`](livecodes_main.Config.md)\> |

#### Returns

`Promise`<[`Config`](livecodes_main.Config.md)\>

#### Defined in

[livecodes/models.ts:6](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L6)

___

### show

▸ **show**(`panel`, `options`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `panel` | ``"tests"`` \| `EditorId` \| ``"console"`` \| ``"compiled"`` \| ``"result"`` |
| `options` | `Object` |
| `options.column?` | `number` |
| `options.full?` | `boolean` |
| `options.line?` | `number` |

#### Returns

`Promise`<`void`\>

#### Defined in

[livecodes/models.ts:8](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L8)
