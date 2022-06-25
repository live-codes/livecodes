---
id: "lib_docs.AppConfig"
title: "Interface: AppConfig"
sidebar_label: "AppConfig"
custom_edit_url: null
---

[lib/docs](../modules/lib_docs.md).AppConfig

## Hierarchy

- **`AppConfig`**

  ↳ [`Config`](lib_docs.Config.md)

## Properties

### allowLangChange

• **allowLangChange**: `boolean`

#### Defined in

[lib/models.ts:65](https://github.com/live-codes/livecodes/blob/0b19ad3/src/lib/models.ts#L65)

___

### editor

• **editor**: ``""`` \| ``"monaco"`` \| ``"codemirror"`` \| ``"codejar"``

#### Defined in

[lib/models.ts:67](https://github.com/live-codes/livecodes/blob/0b19ad3/src/lib/models.ts#L67)

___

### mode

• **mode**: ``"editor"`` \| ``"result"`` \| ``"full"`` \| ``"codeblock"``

#### Defined in

[lib/models.ts:66](https://github.com/live-codes/livecodes/blob/0b19ad3/src/lib/models.ts#L66)

___

### readonly

• **readonly**: `boolean`

#### Defined in

[lib/models.ts:64](https://github.com/live-codes/livecodes/blob/0b19ad3/src/lib/models.ts#L64)

___

### showVersion

• **showVersion**: `boolean`

#### Defined in

[lib/models.ts:68](https://github.com/live-codes/livecodes/blob/0b19ad3/src/lib/models.ts#L68)

___

### tools

• **tools**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `active` | ``""`` \| ``"tests"`` \| ``"console"`` \| ``"compiled"`` |
| `enabled` | (``"tests"`` \| ``"console"`` \| ``"compiled"``)[] \| ``"all"`` |
| `status` | [`ToolsPaneStatus`](../modules/lib_docs.md#toolspanestatus) |

#### Defined in

[lib/models.ts:69](https://github.com/live-codes/livecodes/blob/0b19ad3/src/lib/models.ts#L69)
