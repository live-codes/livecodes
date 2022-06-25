---
id: "modules.events"
title: "Namespace: events"
sidebar_label: "events"
custom_edit_url: null
---

[_modules](../modules/modules.md).events

## Functions

### createEventsManager

▸ **createEventsManager**(): `Object`

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `addEventListener` | (`element`: ``null`` \| `Window` \| `Document` \| `HTMLElement` \| `FileReader`, `eventType`: `string`, `fn`: (`event`: `Event` \| `KeyboardEvent` \| `MouseEvent` \| `MessageEvent`<`any`\> \| `CustomEvent`<`any`\>) => `void`, `options?`: `any`) => `void` |
| `removeEventListener` | (`element`: ``null`` \| `Window` \| `Document` \| `HTMLElement` \| `FileReader`, `eventType`: `string`, `fn`: (`event`: `Event` \| `KeyboardEvent` \| `MouseEvent` \| `MessageEvent`<`any`\>) => `void`) => `void` |
| `removeEventListeners` | () => `void` |

#### Defined in

[src/livecodes/events.ts:1](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/events.ts#L1)
