---
id: "modules.models.AppConfig"
title: "Interface: AppConfig"
sidebar_label: "AppConfig"
custom_edit_url: null
---

[_modules](../modules/modules.md).[models](../namespaces/modules.models.md).AppConfig

## Hierarchy

- **`AppConfig`**

  ↳ [`Config`](main.Config.md)

## Properties

### allowLangChange

• **allowLangChange**: `boolean`

#### Defined in

[src/livecodes/models.ts:65](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L65)

___

### editor

• **editor**: ``""`` \| ``"monaco"`` \| ``"codemirror"`` \| ``"codejar"``

#### Defined in

[src/livecodes/models.ts:67](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L67)

___

### mode

• **mode**: ``"editor"`` \| ``"result"`` \| ``"full"`` \| ``"codeblock"``

#### Defined in

[src/livecodes/models.ts:66](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L66)

___

### readonly

• **readonly**: `boolean`

#### Defined in

[src/livecodes/models.ts:64](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L64)

___

### showVersion

• **showVersion**: `boolean`

#### Defined in

[src/livecodes/models.ts:68](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L68)

___

### tools

• **tools**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `active` | ``""`` \| ``"tests"`` \| ``"console"`` \| ``"compiled"`` |
| `enabled` | (``"tests"`` \| ``"console"`` \| ``"compiled"``)[] \| ``"all"`` |
| `status` | [`ToolsPaneStatus`](../namespaces/modules.models.md#toolspanestatus) |

#### Defined in

[src/livecodes/models.ts:69](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L69)
