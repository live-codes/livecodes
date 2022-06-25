---
id: "modules.storage"
title: "Namespace: storage"
sidebar_label: "storage"
custom_edit_url: null
---

[_modules](../modules/modules.md).storage

## Interfaces

- [ProjectStorage](../interfaces/modules.storage.ProjectStorage.md)
- [RestoreItem](../interfaces/modules.storage.RestoreItem.md)
- [SavedProject](../interfaces/modules.storage.SavedProject.md)
- [SimpleStorage](../interfaces/modules.storage.SimpleStorage.md)
- [StorageItem](../interfaces/modules.storage.StorageItem.md)

## Variables

### fakeSimpleStorage

• `Const` **fakeSimpleStorage**: [`SimpleStorage`](../interfaces/modules.storage.SimpleStorage.md)<`any`\>

#### Defined in

[src/livecodes/storage/fake-storage.ts:18](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/storage/fake-storage.ts#L18)

___

### fakeStorage

• `Const` **fakeStorage**: [`ProjectStorage`](../interfaces/modules.storage.ProjectStorage.md)

#### Defined in

[src/livecodes/storage/fake-storage.ts:5](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/storage/fake-storage.ts#L5)

## Functions

### createSimpleStorage

▸ **createSimpleStorage**<`T`\>(`name`, `isEmbed`): [`SimpleStorage`](../interfaces/modules.storage.SimpleStorage.md)<`T`\>

Creates a simple synchronous key/value data store using localstorage

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `isEmbed` | `boolean` |

#### Returns

[`SimpleStorage`](../interfaces/modules.storage.SimpleStorage.md)<`T`\>

#### Defined in

[src/livecodes/storage/simple-storage.ts:7](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/storage/simple-storage.ts#L7)

___

### createStorage

▸ **createStorage**(`name`, `isEmbed`): `Promise`<[`ProjectStorage`](../interfaces/modules.storage.ProjectStorage.md)\>

Creates asynchronous data store using localforage

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `isEmbed` | `boolean` |

#### Returns

`Promise`<[`ProjectStorage`](../interfaces/modules.storage.ProjectStorage.md)\>

#### Defined in

[src/livecodes/storage/storage.ts:32](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/storage/storage.ts#L32)

___

### decrypt

▸ **decrypt**(`encrypted`): `Promise`<``null`` \| `string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `encrypted` | `string` |

#### Returns

`Promise`<``null`` \| `string`\>

#### Defined in

[src/livecodes/storage/encrypt.ts:75](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/storage/encrypt.ts#L75)

___

### encrypt

▸ **encrypt**(`text`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `text` | `string` |

#### Returns

`Promise`<`string`\>

#### Defined in

[src/livecodes/storage/encrypt.ts:62](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/storage/encrypt.ts#L62)

___

### generateId

▸ **generateId**(): `string`

#### Returns

`string`

#### Defined in

[src/livecodes/storage/storage.ts:11](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/storage/storage.ts#L11)
