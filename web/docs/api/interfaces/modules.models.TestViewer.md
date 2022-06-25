---
id: "modules.models.TestViewer"
title: "Interface: TestViewer"
sidebar_label: "TestViewer"
custom_edit_url: null
---

[_modules](../modules/modules.md).[models](../namespaces/modules.models.md).TestViewer

## Hierarchy

- [`Tool`](modules.models.Tool.md)

  ↳ **`TestViewer`**

## Properties

### name

• **name**: ``"tests"`` \| ``"console"`` \| ``"compiled"``

#### Inherited from

[Tool](modules.models.Tool.md).[name](modules.models.Tool.md#name)

#### Defined in

[src/livecodes/models.ts:403](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L403)

___

### title

• **title**: ``"Tests"``

#### Overrides

[Tool](modules.models.Tool.md).[title](modules.models.Tool.md#title)

#### Defined in

[src/livecodes/models.ts:444](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L444)

## Methods

### clearTests

▸ **clearTests**(): `void`

#### Returns

`void`

#### Defined in

[src/livecodes/models.ts:447](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L447)

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

### resetTests

▸ **resetTests**(): `void`

#### Returns

`void`

#### Defined in

[src/livecodes/models.ts:446](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L446)

___

### showResults

▸ **showResults**(`__namedParameters`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.error?` | `string` |
| `__namedParameters.results` | [`TestResult`](modules.models.TestResult.md)[] |

#### Returns

`void`

#### Defined in

[src/livecodes/models.ts:445](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L445)
