---
id: "modules.notifications"
title: "Namespace: notifications"
sidebar_label: "notifications"
custom_edit_url: null
---

[_modules](../modules/modules.md).notifications

## Functions

### createNotifications

▸ **createNotifications**(): `Object`

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `confirm` | (`message`: `string`, `confirmCallback`: () => `void`, `cancelCallback?`: () => `void`) => `Snackbar` |
| `error` | (`message`: `string`, `dismissable`: `boolean`) => `Snackbar` |
| `info` | (`message`: `string`, `dismissable`: `boolean`) => `Snackbar` |
| `success` | (`message`: `string`, `dismissable`: `boolean`) => `Snackbar` |
| `warning` | (`message`: `string`, `dismissable`: `boolean`) => `Snackbar` |

#### Defined in

[src/livecodes/notifications/create-notifications.ts:12](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/notifications/create-notifications.ts#L12)
