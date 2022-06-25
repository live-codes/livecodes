---
id: "modules.config"
title: "Namespace: config"
sidebar_label: "config"
custom_edit_url: null
---

[_modules](../modules/modules.md).config

## Variables

### defaultConfig

• `Const` **defaultConfig**: [`Config`](../interfaces/main.Config.md)

#### Defined in

[src/livecodes/config/default-config.ts:3](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/config/default-config.ts#L3)

## Functions

### buildConfig

▸ **buildConfig**(`appConfig`): [`Config`](../interfaces/main.Config.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `appConfig` | `Partial`<[`Config`](../interfaces/main.Config.md)\> |

#### Returns

[`Config`](../interfaces/main.Config.md)

#### Defined in

[src/livecodes/config/build-config.ts:7](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/config/build-config.ts#L7)

___

### getConfig

▸ **getConfig**(): [`Config`](../interfaces/main.Config.md)

#### Returns

[`Config`](../interfaces/main.Config.md)

#### Defined in

[src/livecodes/config/config.ts:7](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/config/config.ts#L7)

___

### getContentConfig

▸ **getContentConfig**(`config`): [`ContentConfig`](../interfaces/modules.models.ContentConfig.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | [`Config`](../interfaces/main.Config.md) \| [`ContentConfig`](../interfaces/modules.models.ContentConfig.md) |

#### Returns

[`ContentConfig`](../interfaces/modules.models.ContentConfig.md)

#### Defined in

[src/livecodes/config/config.ts:13](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/config/config.ts#L13)

___

### getParams

▸ **getParams**(`queryParams?`): `Object`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `queryParams` | `string` | `parent.location.search` |

#### Returns

`Object`

#### Defined in

[src/livecodes/config/build-config.ts:45](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/config/build-config.ts#L45)

___

### getUserConfig

▸ **getUserConfig**(`config`): [`UserConfig`](../interfaces/modules.models.UserConfig.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | [`Config`](../interfaces/main.Config.md) \| [`UserConfig`](../interfaces/modules.models.UserConfig.md) |

#### Returns

[`UserConfig`](../interfaces/modules.models.UserConfig.md)

#### Defined in

[src/livecodes/config/config.ts:34](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/config/config.ts#L34)

___

### loadParamConfig

▸ **loadParamConfig**(`config`, `params`): `Partial`<[`Config`](../interfaces/main.Config.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | [`Config`](../interfaces/main.Config.md) |
| `params` | `Object` |

#### Returns

`Partial`<[`Config`](../interfaces/main.Config.md)\>

#### Defined in

[src/livecodes/config/build-config.ts:60](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/config/build-config.ts#L60)

___

### setConfig

▸ **setConfig**(`newConfig`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `newConfig` | [`Config`](../interfaces/main.Config.md) |

#### Returns

`void`

#### Defined in

[src/livecodes/config/config.ts:9](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/config/config.ts#L9)

___

### upgradeAndValidate

▸ **upgradeAndValidate**(`config`): `Partial`<[`Config`](../interfaces/main.Config.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | `Partial`<[`Config`](../interfaces/main.Config.md)\> |

#### Returns

`Partial`<[`Config`](../interfaces/main.Config.md)\>

#### Defined in

[src/livecodes/config/config.ts:46](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/config/config.ts#L46)
