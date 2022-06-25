---
id: "modules.editor"
title: "Namespace: editor"
sidebar_label: "editor"
custom_edit_url: null
---

[_modules](../modules/modules.md).editor

## Variables

### basicLanguages

• `Const` **basicLanguages**: [`Language`](modules.models.md#language)[]

#### Defined in

[src/livecodes/editor/create-editor.ts:5](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/editor/create-editor.ts#L5)

## Functions

### createCustomEditors

▸ **createCustomEditors**(`options`): [`CustomEditors`](modules.models.md#customeditors)

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Object` |
| `options.baseUrl` | `string` |
| `options.eventsManager` | [`EventsManager`](../interfaces/modules.models.EventsManager.md) |

#### Returns

[`CustomEditors`](modules.models.md#customeditors)

#### Defined in

[src/livecodes/editor/custom-editors.ts:5](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/editor/custom-editors.ts#L5)

___

### createEditor

▸ **createEditor**(`options`): `Promise`<[`CodeEditor`](../interfaces/modules.models.CodeEditor.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`EditorOptions`](../interfaces/modules.models.EditorOptions.md) |

#### Returns

`Promise`<[`CodeEditor`](../interfaces/modules.models.CodeEditor.md)\>

#### Defined in

[src/livecodes/editor/create-editor.ts:71](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/editor/create-editor.ts#L71)

___

### selectedEditor

▸ **selectedEditor**(`options`): `undefined` \| ``""`` \| ``"monaco"`` \| ``"codemirror"`` \| ``"codejar"`` \| ``"fake"``

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Partial`<`Pick`<[`EditorOptions`](../interfaces/modules.models.EditorOptions.md), ``"mode"`` \| ``"editor"`` \| ``"editorId"``\>\> |

#### Returns

`undefined` \| ``""`` \| ``"monaco"`` \| ``"codemirror"`` \| ``"codejar"`` \| ``"fake"``

#### Defined in

[src/livecodes/editor/create-editor.ts:56](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/editor/create-editor.ts#L56)
