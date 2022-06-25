---
id: "modules.models.ToolsPane"
title: "Interface: ToolsPane"
sidebar_label: "ToolsPane"
custom_edit_url: null
---

[_modules](../modules/modules.md).[models](../namespaces/modules.models.md).ToolsPane

## Properties

### compiled

• `Optional` **compiled**: [`CompiledCodeViewer`](modules.models.CompiledCodeViewer.md)

#### Defined in

[src/livecodes/models.ts:462](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L462)

___

### console

• `Optional` **console**: [`Console`](modules.models.Console.md)

#### Defined in

[src/livecodes/models.ts:461](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L461)

___

### tests

• `Optional` **tests**: [`TestViewer`](modules.models.TestViewer.md)

#### Defined in

[src/livecodes/models.ts:463](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L463)

## Methods

### close

▸ **close**(): `void`

#### Returns

`void`

#### Defined in

[src/livecodes/models.ts:453](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L453)

___

### disableTool

▸ **disableTool**(`name`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | ``"tests"`` \| ``"console"`` \| ``"compiled"`` |

#### Returns

`void`

#### Defined in

[src/livecodes/models.ts:459](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L459)

___

### enableTool

▸ **enableTool**(`name`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | ``"tests"`` \| ``"console"`` \| ``"compiled"`` |

#### Returns

`void`

#### Defined in

[src/livecodes/models.ts:460](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L460)

___

### getActiveTool

▸ **getActiveTool**(): ``"tests"`` \| ``"console"`` \| ``"compiled"``

#### Returns

``"tests"`` \| ``"console"`` \| ``"compiled"``

#### Defined in

[src/livecodes/models.ts:457](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L457)

___

### getStatus

▸ **getStatus**(): [`ToolsPaneStatus`](../namespaces/modules.models.md#toolspanestatus)

#### Returns

[`ToolsPaneStatus`](../namespaces/modules.models.md#toolspanestatus)

#### Defined in

[src/livecodes/models.ts:456](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L456)

___

### hide

▸ **hide**(): `void`

#### Returns

`void`

#### Defined in

[src/livecodes/models.ts:455](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L455)

___

### load

▸ **load**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

[src/livecodes/models.ts:451](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L451)

___

### maximize

▸ **maximize**(): `void`

#### Returns

`void`

#### Defined in

[src/livecodes/models.ts:454](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L454)

___

### open

▸ **open**(): `void`

#### Returns

`void`

#### Defined in

[src/livecodes/models.ts:452](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L452)

___

### setActiveTool

▸ **setActiveTool**(`name`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | ``"tests"`` \| ``"console"`` \| ``"compiled"`` |

#### Returns

`void`

#### Defined in

[src/livecodes/models.ts:458](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L458)
