---
id: "modules.export"
title: "Namespace: export"
sidebar_label: "export"
custom_edit_url: null
---

[_modules](../modules/modules.md).export

## Interfaces

- [Files](../interfaces/modules.export.Files.md)

## Type Aliases

### ExportType

Ƭ **ExportType**: ``"json"`` \| ``"src"`` \| ``"html"`` \| ``"codepen"`` \| ``"jsfiddle"`` \| ``"githubGist"``

#### Defined in

[src/livecodes/export/export.ts:9](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/export/export.ts#L9)

## Functions

### exportConfig

▸ **exportConfig**(`config`, `baseUrl`, `type`, `payload?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | [`Config`](../interfaces/main.Config.md) |
| `baseUrl` | `string` |
| `type` | [`ExportType`](modules.export.md#exporttype) |
| `payload?` | `any` |

#### Returns

`void`

#### Defined in

[src/livecodes/export/export.ts:13](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/export/export.ts#L13)

___

### getCompilerScripts

▸ **getCompilerScripts**(`__namedParameters`): `string`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.baseUrl` | `string` |
| `__namedParameters.compiled` | `Object` |
| `__namedParameters.compiled.markup` | `string` |
| `__namedParameters.compiled.script` | `string` |
| `__namedParameters.compiled.style` | `string` |
| `__namedParameters.config` | [`Config`](../interfaces/main.Config.md) |
| `__namedParameters.editorId` | [`EditorId`](modules.models.md#editorid) |
| `__namedParameters.getLanguageCompiler` | (`alias`: `string`) => `undefined` \| [`Compiler`](../interfaces/modules.models.Compiler.md) |
| `__namedParameters.supportedLanguages` | `Object` |
| `__namedParameters.supportedLanguages.markup` | [`Language`](modules.models.md#language)[] |
| `__namedParameters.supportedLanguages.script` | [`Language`](modules.models.md#language)[] |
| `__namedParameters.supportedLanguages.style` | [`Language`](modules.models.md#language)[] |

#### Returns

`string`[]

#### Defined in

[src/livecodes/export/utils.ts:94](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/export/utils.ts#L94)

___

### getContent

▸ **getContent**(`__namedParameters`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.compiled` | `Object` |
| `__namedParameters.compiled.markup` | `string` |
| `__namedParameters.compiled.script` | `string` |
| `__namedParameters.compiled.style` | `string` |
| `__namedParameters.config` | [`Config`](../interfaces/main.Config.md) |
| `__namedParameters.editorId` | [`EditorId`](modules.models.md#editorid) |
| `__namedParameters.getLanguageCompiler` | (`alias`: `string`) => `undefined` \| [`Compiler`](../interfaces/modules.models.Compiler.md) |
| `__namedParameters.supportedLanguages` | `Object` |
| `__namedParameters.supportedLanguages.markup` | [`Language`](modules.models.md#language)[] |
| `__namedParameters.supportedLanguages.script` | [`Language`](modules.models.md#language)[] |
| `__namedParameters.supportedLanguages.style` | [`Language`](modules.models.md#language)[] |

#### Returns

`string`

#### Defined in

[src/livecodes/export/utils.ts:120](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/export/utils.ts#L120)

___

### getDescriptionFile

▸ **getDescriptionFile**(`config`, `user?`, `url?`, `gist?`): `Object`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `config` | [`ContentConfig`](../interfaces/modules.models.ContentConfig.md) | `undefined` |
| `user?` | [`User`](../interfaces/modules.models.User.md) | `undefined` |
| `url?` | `string` | `undefined` |
| `gist` | `boolean` | `true` |

#### Returns

`Object`

#### Defined in

[src/livecodes/export/utils.ts:73](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/export/utils.ts#L73)

___

### getFilesFromConfig

▸ **getFilesFromConfig**(`config`, `__namedParameters`): [`Files`](../interfaces/modules.export.Files.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | [`Config`](../interfaces/main.Config.md) \| [`ContentConfig`](../interfaces/modules.models.ContentConfig.md) |
| `__namedParameters` | `Object` |
| `__namedParameters.getLanguageExtension` | (`alias`: `string`) => `undefined` \| [`Language`](modules.models.md#language) |

#### Returns

[`Files`](../interfaces/modules.export.Files.md)

#### Defined in

[src/livecodes/export/utils.ts:13](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/export/utils.ts#L13)
