---
id: "modules.compiler"
title: "Namespace: compiler"
sidebar_label: "compiler"
custom_edit_url: null
---

[_modules](../modules/modules.md).compiler

## Variables

### dynamicImportsPattern

• `Const` **dynamicImportsPattern**: `RegExp`

#### Defined in

[src/livecodes/compiler/import-map.ts:8](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/compiler/import-map.ts#L8)

___

### importsPattern

• `Const` **importsPattern**: `RegExp`

#### Defined in

[src/livecodes/compiler/import-map.ts:5](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/compiler/import-map.ts#L5)

___

### styleimportsPattern

• `Const` **styleimportsPattern**: `RegExp`

#### Defined in

[src/livecodes/compiler/import-map.ts:70](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/compiler/import-map.ts#L70)

## Functions

### cjs2esm

▸ **cjs2esm**(`code`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `code` | `string` |

#### Returns

`string`

#### Defined in

[src/livecodes/compiler/import-map.ts:88](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/compiler/import-map.ts#L88)

___

### compileAllBlocks

▸ **compileAllBlocks**(`code`, `config`, `options?`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `code` | `string` |
| `config` | [`Config`](../interfaces/main.Config.md) |
| `options` | `CompileBlocksOptions` |

#### Returns

`Promise`<`string`\>

#### Defined in

[src/livecodes/compiler/compile-blocks.ts:39](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/compiler/compile-blocks.ts#L39)

___

### compileBlocks

▸ **compileBlocks**(`code`, `blockElement`, `config`, `options?`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `code` | `string` |
| `blockElement` | ``"style"`` \| ``"script"`` \| ``"template"`` |
| `config` | [`Config`](../interfaces/main.Config.md) |
| `options` | `CompileBlocksOptions` |

#### Returns

`Promise`<`string`\>

#### Defined in

[src/livecodes/compiler/compile-blocks.ts:10](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/compiler/compile-blocks.ts#L10)

___

### compileInCompiler

▸ **compileInCompiler**(`content`, `language`, `config`, `options?`, `worker?`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `content` | `string` |
| `language` | `undefined` \| [`Language`](modules.models.md#language) |
| `config` | [`Config`](../interfaces/main.Config.md) |
| `options` | [`CompileOptions`](../interfaces/modules.models.CompileOptions.md) |
| `worker` | `Worker` |

#### Returns

`Promise`<`string`\>

#### Defined in

[src/livecodes/compiler/compile-in-compiler.ts:3](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/compiler/compile-in-compiler.ts#L3)

___

### createImportMap

▸ **createImportMap**(`code`, `config`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `code` | `string` |
| `config` | [`Config`](../interfaces/main.Config.md) |

#### Returns

`Object`

#### Defined in

[src/livecodes/compiler/import-map.ts:24](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/compiler/import-map.ts#L24)

___

### getAllCompilers

▸ **getAllCompilers**(`languages`, `config`, `baseUrl`): [`Compilers`](../interfaces/modules.models.Compilers.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `languages` | ([`LanguageSpecs`](../interfaces/modules.models.LanguageSpecs.md) \| [`Processors`](../interfaces/modules.models.Processors.md))[] |
| `config` | [`Config`](../interfaces/main.Config.md) |
| `baseUrl` | `string` |

#### Returns

[`Compilers`](../interfaces/modules.models.Compilers.md)

#### Defined in

[src/livecodes/compiler/get-all-compilers.ts:5](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/compiler/get-all-compilers.ts#L5)

___

### getCompiler

▸ **getCompiler**(`options`): `Promise`<`Compiler`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Object` |
| `options.baseUrl` | `string` |
| `options.config` | [`Config`](../interfaces/main.Config.md) |
| `options.eventsManager` | [`EventsManager`](../interfaces/modules.models.EventsManager.md) |

#### Returns

`Promise`<`Compiler`\>

#### Defined in

[src/livecodes/compiler/get-compiler.ts:5](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/compiler/get-compiler.ts#L5)

___

### getImports

▸ **getImports**(`code`): `string`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `code` | `string` |

#### Returns

`string`[]

#### Defined in

[src/livecodes/compiler/import-map.ts:10](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/compiler/import-map.ts#L10)

___

### hasAwait

▸ **hasAwait**(`code`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `code` | `string` |

#### Returns

`boolean`

#### Defined in

[src/livecodes/compiler/import-map.ts:46](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/compiler/import-map.ts#L46)

___

### hasExports

▸ **hasExports**(`code`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `code` | `string` |

#### Returns

`boolean`

#### Defined in

[src/livecodes/compiler/import-map.ts:43](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/compiler/import-map.ts#L43)

___

### hasImports

▸ **hasImports**(`code`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `code` | `string` |

#### Returns

`boolean`

#### Defined in

[src/livecodes/compiler/import-map.ts:41](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/compiler/import-map.ts#L41)

___

### hasStyleImports

▸ **hasStyleImports**(`code`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `code` | `string` |

#### Returns

`boolean`

#### Defined in

[src/livecodes/compiler/import-map.ts:73](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/compiler/import-map.ts#L73)

___

### isModuleScript

▸ **isModuleScript**(`code`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `code` | `string` |

#### Returns

`boolean`

#### Defined in

[src/livecodes/compiler/import-map.ts:49](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/compiler/import-map.ts#L49)

___

### replaceImports

▸ **replaceImports**(`code`, `config`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `code` | `string` |
| `config` | [`Config`](../interfaces/main.Config.md) |

#### Returns

`string`

#### Defined in

[src/livecodes/compiler/import-map.ts:52](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/compiler/import-map.ts#L52)

___

### replaceStyleImports

▸ **replaceStyleImports**(`code`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `code` | `string` |

#### Returns

`string`

#### Defined in

[src/livecodes/compiler/import-map.ts:75](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/compiler/import-map.ts#L75)
