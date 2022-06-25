---
id: "modules.models.Tool"
title: "Interface: Tool"
sidebar_label: "Tool"
custom_edit_url: null
---

[_modules](../modules/modules.md).[models](../namespaces/modules.models.md).Tool

## Hierarchy

- **`Tool`**

  ↳ [`Console`](modules.models.Console.md)

  ↳ [`CompiledCodeViewer`](modules.models.CompiledCodeViewer.md)

  ↳ [`TestViewer`](modules.models.TestViewer.md)

## Properties

### name

• **name**: ``"tests"`` \| ``"console"`` \| ``"compiled"``

#### Defined in

[src/livecodes/models.ts:403](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L403)

___

### title

• **title**: ``"Console"`` \| ``"Compiled"`` \| ``"Tests"``

#### Defined in

[src/livecodes/models.ts:404](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L404)

## Methods

### getEditor

▸ `Optional` **getEditor**(): `undefined` \| [`CodeEditor`](modules.models.CodeEditor.md)

#### Returns

`undefined` \| [`CodeEditor`](modules.models.CodeEditor.md)

#### Defined in

[src/livecodes/models.ts:408](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L408)

___

### load

▸ **load**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

[src/livecodes/models.ts:405](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L405)

___

### onActivate

▸ **onActivate**(): `void`

#### Returns

`void`

#### Defined in

[src/livecodes/models.ts:406](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L406)

___

### onDeactivate

▸ **onDeactivate**(): `void`

#### Returns

`void`

#### Defined in

[src/livecodes/models.ts:407](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L407)
