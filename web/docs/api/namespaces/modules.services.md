---
id: "modules.services"
title: "Namespace: services"
sidebar_label: "services"
custom_edit_url: null
---

[_modules](../modules/modules.md).services

## Variables

### corsService

• `Const` **corsService**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `fetch` | (`url`: `string`, `options?`: `RequestInit`) => `Promise`<`Response`\> |

#### Defined in

[src/livecodes/services/cors.ts:7](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/services/cors.ts#L7)

___

### modulesService

• `Const` **modulesService**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `getModuleInfoUrl` | (`moduleName`: `string`) => `string` |
| `getModuleUrl` | (`moduleName`: `string`, `isModule`: `boolean`) => `string` |

#### Defined in

[src/livecodes/services/modules.ts:1](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/services/modules.ts#L1)

___

### sandboxService

• `Const` **sandboxService**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `getCompilerUrl` | () => `string` |
| `getOrigin` | () => `string` |
| `getResultUrl` | () => `string` |

#### Defined in

[src/livecodes/services/sandbox.ts:7](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/services/sandbox.ts#L7)

___

### shareService

• `Const` **shareService**: `ShareService`

#### Defined in

[src/livecodes/services/share.ts:76](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/services/share.ts#L76)

___

### typesService

• `Const` **typesService**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `getTypeUrls` | (`types`: `string`[]) => `Promise`<[`Types`](../interfaces/modules.models.Types.md)\> |

#### Defined in

[src/livecodes/services/types.ts:4](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/services/types.ts#L4)

## Functions

### allowedOrigin

▸ **allowedOrigin**(`origin?`): `boolean`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `origin` | `string` | `location.origin` |

#### Returns

`boolean`

#### Defined in

[src/livecodes/services/allowed-origin.ts:1](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/services/allowed-origin.ts#L1)

___

### createAuthService

▸ **createAuthService**(`isEmbed`): `AuthService`

#### Parameters

| Name | Type |
| :------ | :------ |
| `isEmbed` | `boolean` |

#### Returns

`AuthService`

#### Defined in

[src/livecodes/services/auth.ts:23](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/services/auth.ts#L23)

___

### whitelistTarget

▸ **whitelistTarget**(`url`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |

#### Returns

`boolean`

#### Defined in

[src/livecodes/services/allowed-origin.ts:12](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/services/allowed-origin.ts#L12)
