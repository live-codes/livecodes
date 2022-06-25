---
id: "modules.models.EditorOptions"
title: "Interface: EditorOptions"
sidebar_label: "EditorOptions"
custom_edit_url: null
---

[_modules](../modules/modules.md).[models](../namespaces/modules.models.md).EditorOptions

## Properties

### baseUrl

• **baseUrl**: `string`

#### Defined in

[src/livecodes/models.ts:502](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L502)

___

### container

• **container**: ``null`` \| `HTMLElement`

#### Defined in

[src/livecodes/models.ts:503](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L503)

___

### editor

• `Optional` **editor**: ``""`` \| ``"monaco"`` \| ``"codemirror"`` \| ``"codejar"``

#### Defined in

[src/livecodes/models.ts:508](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L508)

___

### editorBuild

• `Optional` **editorBuild**: ``"full"`` \| ``"basic"``

#### Defined in

[src/livecodes/models.ts:510](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L510)

___

### editorId

• **editorId**: ``"customSettings"`` \| ``"tests"`` \| [`EditorId`](../namespaces/modules.models.md#editorid) \| ``"console"`` \| ``"compiled"`` \| ``"embed"``

#### Defined in

[src/livecodes/models.ts:509](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L509)

___

### isEmbed

• **isEmbed**: `boolean`

#### Defined in

[src/livecodes/models.ts:512](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L512)

___

### language

• **language**: [`Language`](../namespaces/modules.models.md#language)

#### Defined in

[src/livecodes/models.ts:504](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L504)

___

### mode

• `Optional` **mode**: ``"editor"`` \| ``"result"`` \| ``"full"`` \| ``"codeblock"``

#### Defined in

[src/livecodes/models.ts:506](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L506)

___

### readonly

• **readonly**: `boolean`

#### Defined in

[src/livecodes/models.ts:507](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L507)

___

### theme

• **theme**: [`Theme`](../namespaces/modules.models.md#theme)

#### Defined in

[src/livecodes/models.ts:511](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L511)

___

### value

• **value**: `string`

#### Defined in

[src/livecodes/models.ts:505](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L505)

## Methods

### getLanguageExtension

▸ **getLanguageExtension**(`alias`): `undefined` \| [`Language`](../namespaces/modules.models.md#language)

#### Parameters

| Name | Type |
| :------ | :------ |
| `alias` | `string` |

#### Returns

`undefined` \| [`Language`](../namespaces/modules.models.md#language)

#### Defined in

[src/livecodes/models.ts:513](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L513)

___

### mapLanguage

▸ **mapLanguage**(`language`): [`Language`](../namespaces/modules.models.md#language)

#### Parameters

| Name | Type |
| :------ | :------ |
| `language` | [`Language`](../namespaces/modules.models.md#language) |

#### Returns

[`Language`](../namespaces/modules.models.md#language)

#### Defined in

[src/livecodes/models.ts:514](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L514)
