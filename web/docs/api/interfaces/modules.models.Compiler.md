---
id: "modules.models.Compiler"
title: "Interface: Compiler"
sidebar_label: "Compiler"
custom_edit_url: null
---

[_modules](../modules/modules.md).[models](../namespaces/modules.models.md).Compiler

## Properties

### aliasTo

• `Optional` **aliasTo**: [`Language`](../namespaces/modules.models.md#language)

#### Defined in

[src/livecodes/models.ts:374](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L374)

___

### compiledCodeLanguage

• `Optional` **compiledCodeLanguage**: [`Language`](../namespaces/modules.models.md#language)

#### Defined in

[src/livecodes/models.ts:375](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L375)

___

### deferScripts

• `Optional` **deferScripts**: `boolean`

#### Defined in

[src/livecodes/models.ts:356](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L356)

___

### dependencies

• `Optional` **dependencies**: [`Language`](../namespaces/modules.models.md#language)[]

#### Defined in

[src/livecodes/models.ts:344](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L344)

___

### editors

• `Optional` **editors**: [`EditorId`](../namespaces/modules.models.md#editorid)[]

#### Defined in

[src/livecodes/models.ts:349](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L349)

___

### fn

• `Optional` **fn**: [`CompilerFunction`](../namespaces/modules.models.md#compilerfunction)

#### Defined in

[src/livecodes/models.ts:346](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L346)

___

### imports

• `Optional` **imports**: `Object`

#### Index signature

▪ [key: `string`]: `string`

#### Defined in

[src/livecodes/models.ts:376](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L376)

___

### inlineScript

• `Optional` **inlineScript**: `string` \| (`options`: { `baseUrl`: `string`  }) => `Promise`<`string`\>

#### Defined in

[src/livecodes/models.ts:357](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L357)

___

### liveReload

• `Optional` **liveReload**: `boolean`

#### Defined in

[src/livecodes/models.ts:373](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L373)

___

### runOutsideWorker

• `Optional` **runOutsideWorker**: [`CompilerFunction`](../namespaces/modules.models.md#compilerfunction)

#### Defined in

[src/livecodes/models.ts:348](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L348)

___

### scriptType

• `Optional` **scriptType**: ``"module"`` \| ``"text/liquid"`` \| ``"text/python"`` \| ``"text/x-uniter-php"`` \| ``"text/cpp"`` \| ``"text/perl"`` \| ``"text/julia"`` \| ``"text/biwascheme"`` \| ``"text/commonlisp"`` \| ``"text/tcl"`` \| ``"text/prolog"`` \| ``"application/json"`` \| ``"application/lua"`` \| ``"application/wasm-uint8"``

#### Defined in

[src/livecodes/models.ts:358](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L358)

___

### scripts

• `Optional` **scripts**: `string`[] \| (`options`: { `baseUrl`: `string` ; `compiled`: `string` ; `config`: [`Config`](main.Config.md)  }) => `string`[]

#### Defined in

[src/livecodes/models.ts:353](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L353)

___

### styles

• `Optional` **styles**: `string`[] \| (`options`: { `baseUrl`: `string` ; `compiled`: `string` ; `config`: [`Config`](main.Config.md)  }) => `string`[]

#### Defined in

[src/livecodes/models.ts:350](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L350)

___

### types

• `Optional` **types**: [`Types`](modules.models.Types.md)

#### Defined in

[src/livecodes/models.ts:377](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L377)

___

### url

• `Optional` **url**: `string`

#### Defined in

[src/livecodes/models.ts:345](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L345)

## Methods

### factory

▸ **factory**(`config`, `baseUrl`): [`CompilerFunction`](../namespaces/modules.models.md#compilerfunction)

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | [`Config`](main.Config.md) |
| `baseUrl` | `string` |

#### Returns

[`CompilerFunction`](../namespaces/modules.models.md#compilerfunction)

#### Defined in

[src/livecodes/models.ts:347](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L347)
