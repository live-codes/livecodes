---
id: "modules.storage.ProjectStorage"
title: "Interface: ProjectStorage"
sidebar_label: "ProjectStorage"
custom_edit_url: null
---

[_modules](../modules/modules.md).[storage](../namespaces/modules.storage.md).ProjectStorage

## Methods

### addGenericItem

▸ **addGenericItem**(`value`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `any` |

#### Returns

`Promise`<`string`\>

#### Defined in

[src/livecodes/storage/models.ts:11](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/storage/models.ts#L11)

___

### addItem

▸ **addItem**(`config`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | [`ContentConfig`](modules.models.ContentConfig.md) |

#### Returns

`Promise`<`string`\>

#### Defined in

[src/livecodes/storage/models.ts:7](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/storage/models.ts#L7)

___

### bulkInsert

▸ **bulkInsert**(`newProjects`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `newProjects` | [`ContentConfig`](modules.models.ContentConfig.md)[] |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/livecodes/storage/models.ts:10](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/storage/models.ts#L10)

___

### clear

▸ **clear**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

[src/livecodes/storage/models.ts:13](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/storage/models.ts#L13)

___

### deleteItem

▸ **deleteItem**(`id`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/livecodes/storage/models.ts:9](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/storage/models.ts#L9)

___

### getAllData

▸ **getAllData**<`T`\>(): `Promise`<`T`[]\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | [`StorageItem`](modules.storage.StorageItem.md) |

#### Returns

`Promise`<`T`[]\>

#### Defined in

[src/livecodes/storage/models.ts:5](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/storage/models.ts#L5)

___

### getItem

▸ **getItem**<`T`\>(`itemId`): `Promise`<``null`` \| `T`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | [`StorageItem`](modules.storage.StorageItem.md) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `itemId` | `string` |

#### Returns

`Promise`<``null`` \| `T`\>

#### Defined in

[src/livecodes/storage/models.ts:6](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/storage/models.ts#L6)

___

### getList

▸ **getList**(): `Promise`<[`SavedProject`](modules.storage.SavedProject.md)[]\>

#### Returns

`Promise`<[`SavedProject`](modules.storage.SavedProject.md)[]\>

#### Defined in

[src/livecodes/storage/models.ts:4](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/storage/models.ts#L4)

___

### updateGenericItem

▸ **updateGenericItem**(`id`, `value`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `value` | `any` |

#### Returns

`Promise`<`string`\>

#### Defined in

[src/livecodes/storage/models.ts:12](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/storage/models.ts#L12)

___

### updateItem

▸ **updateItem**(`id`, `config`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `config` | [`ContentConfig`](modules.models.ContentConfig.md) |

#### Returns

`Promise`<`string`\>

#### Defined in

[src/livecodes/storage/models.ts:8](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/storage/models.ts#L8)
