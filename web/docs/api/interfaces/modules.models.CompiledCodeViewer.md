---
id: "modules.models.CompiledCodeViewer"
title: "Interface: CompiledCodeViewer"
sidebar_label: "CompiledCodeViewer"
custom_edit_url: null
---

[_modules](../modules/modules.md).[models](../namespaces/modules.models.md).CompiledCodeViewer

## Hierarchy

- [`Tool`](modules.models.Tool.md)

  ↳ **`CompiledCodeViewer`**

## Properties

### name

• **name**: ``"tests"`` \| ``"console"`` \| ``"compiled"``

#### Inherited from

[Tool](modules.models.Tool.md).[name](modules.models.Tool.md#name)

#### Defined in

[src/livecodes/models.ts:403](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L403)

___

### title

• **title**: ``"Compiled"``

#### Overrides

[Tool](modules.models.Tool.md).[title](modules.models.Tool.md#title)

#### Defined in

[src/livecodes/models.ts:438](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L438)

## Methods

### getEditor

▸ `Optional` **getEditor**(): `undefined` \| [`CodeEditor`](modules.models.CodeEditor.md)

#### Returns

`undefined` \| [`CodeEditor`](modules.models.CodeEditor.md)

#### Inherited from

[Tool](modules.models.Tool.md).[getEditor](modules.models.Tool.md#geteditor)

#### Defined in

[src/livecodes/models.ts:408](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L408)

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

### reloadEditor

▸ **reloadEditor**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

[src/livecodes/models.ts:440](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L440)

___

### update

▸ **update**(`language`, `content`, `label?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `language` | [`Language`](../namespaces/modules.models.md#language) |
| `content` | `string` |
| `label?` | `string` |

#### Returns

`void`

#### Defined in

[src/livecodes/models.ts:439](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L439)
