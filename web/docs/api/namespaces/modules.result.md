---
id: "modules.result"
title: "Namespace: result"
sidebar_label: "result"
custom_edit_url: null
---

[_modules](../modules/modules.md).result

## Functions

### createResultPage

▸ **createResultPage**(`__namedParameters`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.baseUrl` | `string` |
| `__namedParameters.code` | [`Cache`](modules.models.md#cache) |
| `__namedParameters.config` | [`Config`](../interfaces/main.Config.md) |
| `__namedParameters.forExport` | `boolean` |
| `__namedParameters.runTests` | `boolean` |
| `__namedParameters.singleFile` | `boolean` |
| `__namedParameters.template` | `string` |

#### Returns

`Promise`<`string`\>

#### Defined in

[src/livecodes/result/result-page.ts:9](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/result/result-page.ts#L9)

___

### handleEval

▸ **handleEval**(): `void`

#### Returns

`void`

#### Defined in

[src/livecodes/result/utils.ts:124](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/result/utils.ts#L124)

___

### handleResize

▸ **handleResize**(): `void`

#### Returns

`void`

#### Defined in

[src/livecodes/result/utils.ts:144](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/result/utils.ts#L144)

___

### proxyConsole

▸ **proxyConsole**(): `void`

#### Returns

`void`

#### Defined in

[src/livecodes/result/utils.ts:96](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/result/utils.ts#L96)

___

### typeOf

▸ **typeOf**(`obj`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `obj` | `any` |

#### Returns

`string`

#### Defined in

[src/livecodes/result/utils.ts:2](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/result/utils.ts#L2)
