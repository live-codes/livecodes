---
id: "AppConfig"
title: "Interface: AppConfig"
sidebar_label: "AppConfig"
sidebar_position: 0
custom_edit_url: null
---

## Hierarchy

- **`AppConfig`**

  ↳ [`Config`](Config.md)

## Properties

### allowLangChange

• **allowLangChange**: `boolean`

#### Defined in

[models.ts:65](https://github.com/live-codes/livecodes/blob/0b19ad3/src/lib/models.ts#L65)

___

### editor

• **editor**: ``""`` \| ``"monaco"`` \| ``"codemirror"`` \| ``"codejar"``

#### Defined in

[models.ts:67](https://github.com/live-codes/livecodes/blob/0b19ad3/src/lib/models.ts#L67)

___

### mode

• **mode**: ``"full"`` \| ``"editor"`` \| ``"codeblock"`` \| ``"result"``

#### Defined in

[models.ts:66](https://github.com/live-codes/livecodes/blob/0b19ad3/src/lib/models.ts#L66)

___

### readonly

• **readonly**: `boolean`

#### Defined in

[models.ts:64](https://github.com/live-codes/livecodes/blob/0b19ad3/src/lib/models.ts#L64)

___

### showVersion

• **showVersion**: `boolean`

#### Defined in

[models.ts:68](https://github.com/live-codes/livecodes/blob/0b19ad3/src/lib/models.ts#L68)

___

### tools

• **tools**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `active` | ``""`` \| ``"console"`` \| ``"compiled"`` \| ``"tests"`` |
| `enabled` | (``"console"`` \| ``"compiled"`` \| ``"tests"``)[] \| ``"all"`` |
| `status` | [`ToolsPaneStatus`](../modules.md#toolspanestatus) |

#### Defined in

[models.ts:69](https://github.com/live-codes/livecodes/blob/0b19ad3/src/lib/models.ts#L69)
