---
id: "modules.toolspane"
title: "Namespace: toolspane"
sidebar_label: "toolspane"
custom_edit_url: null
---

[_modules](../modules/modules.md).toolspane

## Functions

### createCompiledCodeViewer

▸ **createCompiledCodeViewer**(`config`, `baseUrl`, `_editors`, `_eventsManager`, `isEmbed`, `_runTests`): [`CompiledCodeViewer`](../interfaces/modules.models.CompiledCodeViewer.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | [`Config`](../interfaces/main.Config.md) |
| `baseUrl` | `string` |
| `_editors` | [`Editors`](../interfaces/modules.models.Editors.md) |
| `_eventsManager` | `Object` |
| `_eventsManager.addEventListener` | (`element`: ``null`` \| `Window` \| `Document` \| `HTMLElement` \| `FileReader`, `eventType`: `string`, `fn`: (`event`: `Event` \| `KeyboardEvent` \| `MouseEvent` \| `MessageEvent`<`any`\> \| `CustomEvent`<`any`\>) => `void`, `options?`: `any`) => `void` |
| `_eventsManager.removeEventListener` | (`element`: ``null`` \| `Window` \| `Document` \| `HTMLElement` \| `FileReader`, `eventType`: `string`, `fn`: (`event`: `Event` \| `KeyboardEvent` \| `MouseEvent` \| `MessageEvent`<`any`\>) => `void`) => `void` |
| `_eventsManager.removeEventListeners` | () => `void` |
| `isEmbed` | `boolean` |
| `_runTests` | () => `Promise`<`void`\> |

#### Returns

[`CompiledCodeViewer`](../interfaces/modules.models.CompiledCodeViewer.md)

#### Defined in

[src/livecodes/toolspane/compiled-code-viewer.ts:14](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/toolspane/compiled-code-viewer.ts#L14)

___

### createConsole

▸ **createConsole**(`config`, `baseUrl`, `_editors`, `eventsManager`, `isEmbed`, `_runTests`): [`Console`](../interfaces/modules.models.Console.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | [`Config`](../interfaces/main.Config.md) |
| `baseUrl` | `string` |
| `_editors` | [`Editors`](../interfaces/modules.models.Editors.md) |
| `eventsManager` | `Object` |
| `eventsManager.addEventListener` | (`element`: ``null`` \| `Window` \| `Document` \| `HTMLElement` \| `FileReader`, `eventType`: `string`, `fn`: (`event`: `Event` \| `KeyboardEvent` \| `MouseEvent` \| `MessageEvent`<`any`\> \| `CustomEvent`<`any`\>) => `void`, `options?`: `any`) => `void` |
| `eventsManager.removeEventListener` | (`element`: ``null`` \| `Window` \| `Document` \| `HTMLElement` \| `FileReader`, `eventType`: `string`, `fn`: (`event`: `Event` \| `KeyboardEvent` \| `MouseEvent` \| `MessageEvent`<`any`\>) => `void`) => `void` |
| `eventsManager.removeEventListeners` | () => `void` |
| `isEmbed` | `boolean` |
| `_runTests` | () => `Promise`<`void`\> |

#### Returns

[`Console`](../interfaces/modules.models.Console.md)

#### Defined in

[src/livecodes/toolspane/console.ts:10](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/toolspane/console.ts#L10)

___

### createTestViewer

▸ **createTestViewer**(`_config`, `_baseUrl`, `_editors`, `eventsManager`, `isEmbed`, `runTests`): [`TestViewer`](../interfaces/modules.models.TestViewer.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `_config` | [`Config`](../interfaces/main.Config.md) |
| `_baseUrl` | `string` |
| `_editors` | [`Editors`](../interfaces/modules.models.Editors.md) |
| `eventsManager` | [`EventsManager`](../interfaces/modules.models.EventsManager.md) |
| `isEmbed` | `boolean` |
| `runTests` | () => `Promise`<`void`\> |

#### Returns

[`TestViewer`](../interfaces/modules.models.TestViewer.md)

#### Defined in

[src/livecodes/toolspane/test-viewer.ts:4](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/toolspane/test-viewer.ts#L4)

___

### createToolsPane

▸ **createToolsPane**(`config`, `baseUrl`, `editors`, `eventsManager`, `isEmbed`, `runTests`): [`ToolsPane`](../interfaces/modules.models.ToolsPane.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | [`Config`](../interfaces/main.Config.md) |
| `baseUrl` | `string` |
| `editors` | [`Editors`](../interfaces/modules.models.Editors.md) |
| `eventsManager` | [`EventsManager`](../interfaces/modules.models.EventsManager.md) |
| `isEmbed` | `boolean` |
| `runTests` | () => `Promise`<`void`\> |

#### Returns

[`ToolsPane`](../interfaces/modules.models.ToolsPane.md)

#### Defined in

[src/livecodes/toolspane/tools.ts:16](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/toolspane/tools.ts#L16)
