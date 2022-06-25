---
id: "modules.models.Console"
title: "Interface: Console"
sidebar_label: "Console"
custom_edit_url: null
---

[_modules](../modules/modules.md).[models](../namespaces/modules.models.md).Console

## Hierarchy

- [`Tool`](modules.models.Tool.md)

  ↳ **`Console`**

## Properties

### name

• **name**: ``"tests"`` \| ``"console"`` \| ``"compiled"``

#### Inherited from

[Tool](modules.models.Tool.md).[name](modules.models.Tool.md#name)

#### Defined in

[src/livecodes/models.ts:403](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L403)

___

### title

• **title**: ``"Console"``

#### Overrides

[Tool](modules.models.Tool.md).[title](modules.models.Tool.md#title)

#### Defined in

[src/livecodes/models.ts:426](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L426)

## Methods

### clear

▸ **clear**(): `void`

#### Returns

`void`

#### Defined in

[src/livecodes/models.ts:432](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L432)

___

### error

▸ **error**(...`args`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | `any`[] |

#### Returns

`void`

#### Defined in

[src/livecodes/models.ts:431](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L431)

___

### evaluate

▸ **evaluate**(`code`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `code` | `string` |

#### Returns

`void`

#### Defined in

[src/livecodes/models.ts:434](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L434)

___

### getEditor

▸ `Optional` **getEditor**(): `undefined` \| [`CodeEditor`](modules.models.CodeEditor.md)

#### Returns

`undefined` \| [`CodeEditor`](modules.models.CodeEditor.md)

#### Inherited from

[Tool](modules.models.Tool.md).[getEditor](modules.models.Tool.md#geteditor)

#### Defined in

[src/livecodes/models.ts:408](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L408)

___

### info

▸ **info**(...`args`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | `any`[] |

#### Returns

`void`

#### Defined in

[src/livecodes/models.ts:428](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L428)

___

### load

▸ **load**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Inherited from

[Tool](modules.models.Tool.md).[load](modules.models.Tool.md#load)

#### Defined in

[src/livecodes/models.ts:405](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L405)

___

### log

▸ **log**(...`args`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | `any`[] |

#### Returns

`void`

#### Defined in

[src/livecodes/models.ts:427](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L427)

___

### onActivate

▸ **onActivate**(): `void`

#### Returns

`void`

#### Inherited from

[Tool](modules.models.Tool.md).[onActivate](modules.models.Tool.md#onactivate)

#### Defined in

[src/livecodes/models.ts:406](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L406)

___

### onDeactivate

▸ **onDeactivate**(): `void`

#### Returns

`void`

#### Inherited from

[Tool](modules.models.Tool.md).[onDeactivate](modules.models.Tool.md#ondeactivate)

#### Defined in

[src/livecodes/models.ts:407](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L407)

___

### table

▸ **table**(...`args`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | `any`[] |

#### Returns

`void`

#### Defined in

[src/livecodes/models.ts:429](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L429)

___

### warn

▸ **warn**(...`args`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | `any`[] |

#### Returns

`void`

#### Defined in

[src/livecodes/models.ts:430](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L430)
