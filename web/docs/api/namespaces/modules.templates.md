---
id: "modules.templates"
title: "Namespace: templates"
sidebar_label: "templates"
custom_edit_url: null
---

[_modules](../modules/modules.md).templates

## Functions

### getStarterTemplates

▸ **getStarterTemplates**(`config`, `baseUrl`): `Promise`<[`Template`](modules.models.md#template)[]\>

get starter templates with languages that are enabled in the current config

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | [`Config`](../interfaces/main.Config.md) |
| `baseUrl` | `string` |

#### Returns

`Promise`<[`Template`](modules.models.md#template)[]\>

#### Defined in

[src/livecodes/templates/get-starter-templates.ts:24](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/templates/get-starter-templates.ts#L24)

___

### getTemplate

▸ **getTemplate**(`name`, `config`, `baseUrl`): `Promise`<[`Template`](modules.models.md#template)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `config` | [`Config`](../interfaces/main.Config.md) |
| `baseUrl` | `string` |

#### Returns

`Promise`<[`Template`](modules.models.md#template)\>

#### Defined in

[src/livecodes/templates/get-starter-templates.ts:60](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/templates/get-starter-templates.ts#L60)
