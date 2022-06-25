---
id: "Playground"
title: "Interface: Playground"
sidebar_label: "Playground"
sidebar_position: 0
custom_edit_url: null
---

## Hierarchy

- `API`

  ↳ **`Playground`**

## Methods

### destroy

▸ **destroy**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Inherited from

API.destroy

#### Defined in

[models.ts:14](https://github.com/live-codes/livecodes/blob/0b19ad3/src/lib/models.ts#L14)

___

### format

▸ **format**(`allEditors?`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `allEditors?` | `boolean` |

#### Returns

`Promise`<`void`\>

#### Inherited from

API.format

#### Defined in

[models.ts:3](https://github.com/live-codes/livecodes/blob/0b19ad3/src/lib/models.ts#L3)

___

### getCode

▸ **getCode**(): `Promise`<[`Code`](Code.md)\>

#### Returns

`Promise`<[`Code`](Code.md)\>

#### Inherited from

API.getCode

#### Defined in

[models.ts:7](https://github.com/live-codes/livecodes/blob/0b19ad3/src/lib/models.ts#L7)

___

### getConfig

▸ **getConfig**(`contentOnly?`): `Promise`<[`Config`](Config.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `contentOnly?` | `boolean` |

#### Returns

`Promise`<[`Config`](Config.md)\>

#### Inherited from

API.getConfig

#### Defined in

[models.ts:5](https://github.com/live-codes/livecodes/blob/0b19ad3/src/lib/models.ts#L5)

___

### getShareUrl

▸ **getShareUrl**(`shortUrl?`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `shortUrl?` | `boolean` |

#### Returns

`Promise`<`string`\>

#### Inherited from

API.getShareUrl

#### Defined in

[models.ts:4](https://github.com/live-codes/livecodes/blob/0b19ad3/src/lib/models.ts#L4)

___

### load

▸ **load**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

[models.ts:20](https://github.com/live-codes/livecodes/blob/0b19ad3/src/lib/models.ts#L20)

___

### onChange

▸ **onChange**(`fn`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `fn` | [`ChangeHandler`](../modules.md#changehandler) |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `remove` | () => `void` |

#### Inherited from

API.onChange

#### Defined in

[models.ts:13](https://github.com/live-codes/livecodes/blob/0b19ad3/src/lib/models.ts#L13)

___

### run

▸ **run**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Inherited from

API.run

#### Defined in

[models.ts:2](https://github.com/live-codes/livecodes/blob/0b19ad3/src/lib/models.ts#L2)

___

### runTests

▸ **runTests**(): `Promise`<{ `results`: [`TestResult`](TestResult.md)[]  }\>

#### Returns

`Promise`<{ `results`: [`TestResult`](TestResult.md)[]  }\>

#### Inherited from

API.runTests

#### Defined in

[models.ts:12](https://github.com/live-codes/livecodes/blob/0b19ad3/src/lib/models.ts#L12)

___

### setConfig

▸ **setConfig**(`config`): `Promise`<[`Config`](Config.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | `Partial`<[`Config`](Config.md)\> |

#### Returns

`Promise`<[`Config`](Config.md)\>

#### Inherited from

API.setConfig

#### Defined in

[models.ts:6](https://github.com/live-codes/livecodes/blob/0b19ad3/src/lib/models.ts#L6)

___

### show

▸ **show**(`panel`, `options`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `panel` | [`EditorId`](../modules.md#editorid) \| ``"result"`` \| ``"console"`` \| ``"compiled"`` \| ``"tests"`` |
| `options` | `Object` |
| `options.column?` | `number` |
| `options.full?` | `boolean` |
| `options.line?` | `number` |

#### Returns

`Promise`<`void`\>

#### Inherited from

API.show

#### Defined in

[models.ts:8](https://github.com/live-codes/livecodes/blob/0b19ad3/src/lib/models.ts#L8)
