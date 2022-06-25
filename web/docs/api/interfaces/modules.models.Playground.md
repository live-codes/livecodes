---
id: "modules.models.Playground"
title: "Interface: Playground"
sidebar_label: "Playground"
custom_edit_url: null
---

[_modules](../modules/modules.md).[models](../namespaces/modules.models.md).Playground

## Hierarchy

- [`API`](main.API.md)

  ↳ **`Playground`**

## Methods

### destroy

▸ **destroy**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Inherited from

[API](main.API.md).[destroy](main.API.md#destroy)

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

#### Inherited from

[API](main.API.md).[format](main.API.md#format)

#### Defined in

[src/livecodes/models.ts:3](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L3)

___

### getCode

▸ **getCode**(): `Promise`<[`Code`](modules.models.Code.md)\>

#### Returns

`Promise`<[`Code`](modules.models.Code.md)\>

#### Inherited from

[API](main.API.md).[getCode](main.API.md#getcode)

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

#### Inherited from

[API](main.API.md).[getConfig](main.API.md#getconfig)

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

#### Inherited from

[API](main.API.md).[getShareUrl](main.API.md#getshareurl)

#### Defined in

[src/livecodes/models.ts:4](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L4)

___

### load

▸ **load**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

[src/livecodes/models.ts:20](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L20)

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

#### Inherited from

[API](main.API.md).[onChange](main.API.md#onchange)

#### Defined in

[src/livecodes/models.ts:13](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L13)

___

### run

▸ **run**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Inherited from

[API](main.API.md).[run](main.API.md#run)

#### Defined in

[src/livecodes/models.ts:2](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L2)

___

### runTests

▸ **runTests**(): `Promise`<{ `results`: [`TestResult`](modules.models.TestResult.md)[]  }\>

#### Returns

`Promise`<{ `results`: [`TestResult`](modules.models.TestResult.md)[]  }\>

#### Inherited from

[API](main.API.md).[runTests](main.API.md#runtests)

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

#### Inherited from

[API](main.API.md).[setConfig](main.API.md#setconfig)

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

#### Inherited from

[API](main.API.md).[show](main.API.md#show)

#### Defined in

[src/livecodes/models.ts:8](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L8)
