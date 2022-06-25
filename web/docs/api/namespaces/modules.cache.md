---
id: "modules.cache"
title: "Namespace: cache"
sidebar_label: "cache"
custom_edit_url: null
---

[_modules](../modules/modules.md).cache

## Functions

### cacheIsValid

▸ **cacheIsValid**(`cache`, `config`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `cache` | [`Cache`](modules.models.md#cache) |
| `config` | [`ContentConfig`](../interfaces/modules.models.ContentConfig.md) |

#### Returns

`boolean`

#### Defined in

[src/livecodes/cache/utils.ts:8](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/cache/utils.ts#L8)

___

### getCache

▸ **getCache**(): [`Cache`](modules.models.md#cache)

#### Returns

[`Cache`](modules.models.md#cache)

#### Defined in

[src/livecodes/cache/cache.ts:17](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/cache/cache.ts#L17)

___

### getCachedCode

▸ **getCachedCode**(): [`Code`](../interfaces/modules.models.Code.md)

#### Returns

[`Code`](../interfaces/modules.models.Code.md)

#### Defined in

[src/livecodes/cache/cache.ts:49](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/cache/cache.ts#L49)

___

### setCache

▸ **setCache**(`newCache?`): `void`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `newCache` | [`Cache`](modules.models.md#cache) | `initialCache` |

#### Returns

`void`

#### Defined in

[src/livecodes/cache/cache.ts:19](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/cache/cache.ts#L19)

___

### updateCache

▸ **updateCache**(`editorId`, `language`, `modified`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `editorId` | [`EditorId`](modules.models.md#editorid) |
| `language` | [`Language`](modules.models.md#language) |
| `modified` | `string` |

#### Returns

`void`

#### Defined in

[src/livecodes/cache/cache.ts:43](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/cache/cache.ts#L43)
