---
id: "modules.models.EventsManager"
title: "Interface: EventsManager"
sidebar_label: "EventsManager"
custom_edit_url: null
---

[_modules](../modules/modules.md).[models](../namespaces/modules.models.md).EventsManager

## Methods

### addEventListener

▸ **addEventListener**(`element`, `eventType`, `fn`, `_options?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `element` | ``null`` \| `Window` \| `Document` \| `HTMLElement` \| `FileReader` |
| `eventType` | `string` |
| `fn` | (`event`: `Event` \| `KeyboardEvent` \| `MouseEvent` \| `MessageEvent`<`any`\>) => `void` |
| `_options?` | `any` |

#### Returns

`void`

#### Defined in

[src/livecodes/models.ts:662](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L662)

___

### removeEventListener

▸ **removeEventListener**(`element`, `eventType`, `fn`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `element` | ``null`` \| `Window` \| `Document` \| `HTMLElement` \| `FileReader` |
| `eventType` | `string` |
| `fn` | (`event`: `Event` \| `KeyboardEvent` \| `MouseEvent` \| `MessageEvent`<`any`\>) => `void` |

#### Returns

`void`

#### Defined in

[src/livecodes/models.ts:668](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L668)

___

### removeEventListeners

▸ **removeEventListeners**(): `void`

#### Returns

`void`

#### Defined in

[src/livecodes/models.ts:673](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L673)
