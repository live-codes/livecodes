---
id: "modules.models.CodeEditor"
title: "Interface: CodeEditor"
sidebar_label: "CodeEditor"
custom_edit_url: null
---

[_modules](../modules/modules.md).[models](../namespaces/modules.models.md).CodeEditor

## Properties

### codejar

• `Optional` **codejar**: `any`

#### Defined in

[src/livecodes/models.ts:497](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L497)

___

### codemirror

• `Optional` **codemirror**: `any`

#### Defined in

[src/livecodes/models.ts:495](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L495)

___

### isFake

• `Optional` **isFake**: `boolean`

#### Defined in

[src/livecodes/models.ts:498](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L498)

___

### isReadonly

• **isReadonly**: `boolean`

#### Defined in

[src/livecodes/models.ts:489](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L489)

___

### keyCodes

• **keyCodes**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `CtrlEnter` | `any` |
| `DownArrow` | `any` |
| `Enter` | `any` |
| `ShiftAltF` | `any` |
| `ShiftEnter` | `any` |
| `UpArrow` | `any` |

#### Defined in

[src/livecodes/models.ts:479](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L479)

___

### monaco

• `Optional` **monaco**: `any`

#### Defined in

[src/livecodes/models.ts:494](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L494)

___

### prism

• `Optional` **prism**: `any`

#### Defined in

[src/livecodes/models.ts:496](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L496)

## Methods

### addKeyBinding

▸ **addKeyBinding**(`label`, `keybinding`, `callback`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `label` | `string` |
| `keybinding` | `any` |
| `callback` | () => `void` |

#### Returns

`void`

#### Defined in

[src/livecodes/models.ts:478](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L478)

___

### addTypes

▸ `Optional` **addTypes**(`lib`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `lib` | [`EditorLibrary`](modules.models.EditorLibrary.md) |

#### Returns

`any`

#### Defined in

[src/livecodes/models.ts:475](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L475)

___

### configureEmmet

▸ `Optional` **configureEmmet**(`enabled`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `enabled` | `boolean` |

#### Returns

`void`

#### Defined in

[src/livecodes/models.ts:476](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L476)

___

### destroy

▸ **destroy**(): `void`

#### Returns

`void`

#### Defined in

[src/livecodes/models.ts:493](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L493)

___

### focus

▸ **focus**(): `void`

#### Returns

`void`

#### Defined in

[src/livecodes/models.ts:472](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L472)

___

### format

▸ **format**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

[src/livecodes/models.ts:488](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L488)

___

### getEditorId

▸ **getEditorId**(): `string`

#### Returns

`string`

#### Defined in

[src/livecodes/models.ts:471](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L471)

___

### getLanguage

▸ **getLanguage**(): [`Language`](../namespaces/modules.models.md#language)

#### Returns

[`Language`](../namespaces/modules.models.md#language)

#### Defined in

[src/livecodes/models.ts:469](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L469)

___

### getValue

▸ **getValue**(): `string`

#### Returns

`string`

#### Defined in

[src/livecodes/models.ts:467](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L467)

___

### goToLine

▸ **goToLine**(`line`, `column?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `line` | `number` |
| `column?` | `number` |

#### Returns

`void`

#### Defined in

[src/livecodes/models.ts:473](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L473)

___

### layout

▸ `Optional` **layout**(): `void`

#### Returns

`void`

#### Defined in

[src/livecodes/models.ts:474](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L474)

___

### onContentChanged

▸ **onContentChanged**(`callback`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | () => `void` |

#### Returns

`void`

#### Defined in

[src/livecodes/models.ts:477](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L477)

___

### redo

▸ **redo**(): `void`

#### Returns

`void`

#### Defined in

[src/livecodes/models.ts:492](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L492)

___

### registerFormatter

▸ **registerFormatter**(`formatFn`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `formatFn` | `undefined` \| [`FormatFn`](../namespaces/modules.models.md#formatfn) |

#### Returns

`void`

#### Defined in

[src/livecodes/models.ts:487](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L487)

___

### setLanguage

▸ **setLanguage**(`language`, `value?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `language` | [`Language`](../namespaces/modules.models.md#language) |
| `value?` | `string` |

#### Returns

`void`

#### Defined in

[src/livecodes/models.ts:470](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L470)

___

### setTheme

▸ **setTheme**(`theme`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `theme` | [`Theme`](../namespaces/modules.models.md#theme) |

#### Returns

`void`

#### Defined in

[src/livecodes/models.ts:490](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L490)

___

### setValue

▸ **setValue**(`value?`, `newState?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value?` | `string` |
| `newState?` | `boolean` |

#### Returns

`void`

#### Defined in

[src/livecodes/models.ts:468](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L468)

___

### undo

▸ **undo**(): `void`

#### Returns

`void`

#### Defined in

[src/livecodes/models.ts:491](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L491)
