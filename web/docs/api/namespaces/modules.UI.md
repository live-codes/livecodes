---
id: "modules.UI"
title: "Namespace: UI"
sidebar_label: "UI"
custom_edit_url: null
---

[_modules](../modules/modules.md).UI

## Variables

### noUserTemplates

• `Const` **noUserTemplates**: ``"\n<div class=\"modal-message no-data\">\n  <div>You have no saved templates.</div>\n  <div class=\"description\">\n    You can save a project as a template from\n    <wbr />(settings&nbsp;menu&nbsp;>&nbsp;Save&nbsp;as&nbsp;> Template).\n  </div>\n</div>\n"``

#### Defined in

[src/livecodes/UI/templates.ts:49](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/UI/templates.ts#L49)

## Functions

### createLoginContainer

▸ **createLoginContainer**(`eventsManager`, `loginCallback`): `HTMLElement`

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventsManager` | `Object` |
| `eventsManager.addEventListener` | (`element`: ``null`` \| `Window` \| `Document` \| `HTMLElement` \| `FileReader`, `eventType`: `string`, `fn`: (`event`: `Event` \| `KeyboardEvent` \| `MouseEvent` \| `MessageEvent`<`any`\> \| `CustomEvent`<`any`\>) => `void`, `options?`: `any`) => `void` |
| `eventsManager.removeEventListener` | (`element`: ``null`` \| `Window` \| `Document` \| `HTMLElement` \| `FileReader`, `eventType`: `string`, `fn`: (`event`: `Event` \| `KeyboardEvent` \| `MouseEvent` \| `MessageEvent`<`any`\>) => `void`) => `void` |
| `eventsManager.removeEventListeners` | () => `void` |
| `loginCallback` | (`scopes`: [`GithubScope`](modules.models.md#githubscope)[]) => `void` |

#### Returns

`HTMLElement`

#### Defined in

[src/livecodes/UI/login.ts:6](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/UI/login.ts#L6)

___

### createOpenItem

▸ **createOpenItem**(`item`, `list`, `getLanguageTitle`, `getLanguageByAlias`, `isTemplate?`): `Object`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `item` | [`SavedProject`](../interfaces/modules.storage.SavedProject.md) | `undefined` |
| `list` | `HTMLElement` | `undefined` |
| `getLanguageTitle` | (`language`: [`Language`](modules.models.md#language)) => `string` | `undefined` |
| `getLanguageByAlias` | (`alias?`: `string`) => `undefined` \| [`Language`](modules.models.md#language) | `undefined` |
| `isTemplate` | `boolean` | `false` |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `deleteButton` | `HTMLButtonElement` |
| `link` | `HTMLAnchorElement` |

#### Defined in

[src/livecodes/UI/open.ts:12](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/UI/open.ts#L12)

___

### createPluginItem

▸ **createPluginItem**(`plugin`): `HTMLLIElement`

#### Parameters

| Name | Type |
| :------ | :------ |
| `plugin` | `Object` |
| `plugin.name` | `string` |
| `plugin.title` | `string` |

#### Returns

`HTMLLIElement`

#### Defined in

[src/livecodes/UI/postcss-plugins.ts:1](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/UI/postcss-plugins.ts#L1)

___

### createProjectInfoUI

▸ **createProjectInfoUI**(`config`, `storage`, `modal`, `eventsManager`, `onSave`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | [`Config`](../interfaces/main.Config.md) |
| `storage` | [`ProjectStorage`](../interfaces/modules.storage.ProjectStorage.md) |
| `modal` | `Object` |
| `modal.close` | () => `void` |
| `modal.show` | (`container`: `HTMLElement`, `__namedParameters`: `ModalOptions`) => `void` |
| `eventsManager` | `Object` |
| `eventsManager.addEventListener` | (`element`: ``null`` \| `Window` \| `Document` \| `HTMLElement` \| `FileReader`, `eventType`: `string`, `fn`: (`event`: `Event` \| `KeyboardEvent` \| `MouseEvent` \| `MessageEvent`<`any`\> \| `CustomEvent`<`any`\>) => `void`, `options?`: `any`) => `void` |
| `eventsManager.removeEventListener` | (`element`: ``null`` \| `Window` \| `Document` \| `HTMLElement` \| `FileReader`, `eventType`: `string`, `fn`: (`event`: `Event` \| `KeyboardEvent` \| `MouseEvent` \| `MessageEvent`<`any`\>) => `void`) => `void` |
| `eventsManager.removeEventListeners` | () => `void` |
| `onSave` | (`title`: `string`, `description`: `string`, `tags`: `string`[]) => `void` |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/livecodes/UI/info.ts:19](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/UI/info.ts#L19)

___

### createSavedProjectsList

▸ **createSavedProjectsList**(`__namedParameters`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.eventsManager` | `Object` |
| `__namedParameters.eventsManager.addEventListener` | (`element`: ``null`` \| `Window` \| `Document` \| `HTMLElement` \| `FileReader`, `eventType`: `string`, `fn`: (`event`: `Event` \| `KeyboardEvent` \| `MouseEvent` \| `MessageEvent`<`any`\> \| `CustomEvent`<`any`\>) => `void`, `options?`: `any`) => `void` |
| `__namedParameters.eventsManager.removeEventListener` | (`element`: ``null`` \| `Window` \| `Document` \| `HTMLElement` \| `FileReader`, `eventType`: `string`, `fn`: (`event`: `Event` \| `KeyboardEvent` \| `MouseEvent` \| `MessageEvent`<`any`\>) => `void`) => `void` |
| `__namedParameters.eventsManager.removeEventListeners` | () => `void` |
| `__namedParameters.languages` | [`LanguageSpecs`](../interfaces/modules.models.LanguageSpecs.md)[] |
| `__namedParameters.modal` | `Object` |
| `__namedParameters.modal.close` | () => `void` |
| `__namedParameters.modal.show` | (`container`: `HTMLElement`, `__namedParameters`: `ModalOptions`) => `void` |
| `__namedParameters.notifications` | `Object` |
| `__namedParameters.notifications.confirm` | (`message`: `string`, `confirmCallback`: () => `void`, `cancelCallback?`: () => `void`) => `Snackbar` |
| `__namedParameters.notifications.error` | (`message`: `string`, `dismissable`: `boolean`) => `Snackbar` |
| `__namedParameters.notifications.info` | (`message`: `string`, `dismissable`: `boolean`) => `Snackbar` |
| `__namedParameters.notifications.success` | (`message`: `string`, `dismissable`: `boolean`) => `Snackbar` |
| `__namedParameters.notifications.warning` | (`message`: `string`, `dismissable`: `boolean`) => `Snackbar` |
| `__namedParameters.projectStorage` | [`ProjectStorage`](../interfaces/modules.storage.ProjectStorage.md) |
| `__namedParameters.getContentConfig` | (`config`: [`Config`](../interfaces/main.Config.md) \| [`ContentConfig`](../interfaces/modules.models.ContentConfig.md)) => [`ContentConfig`](../interfaces/modules.models.ContentConfig.md) |
| `__namedParameters.getLanguageByAlias` | (`alias?`: `string`) => `undefined` \| [`Language`](modules.models.md#language) |
| `__namedParameters.getLanguageTitle` | (`language`: [`Language`](modules.models.md#language)) => `string` |
| `__namedParameters.getProjectId` | () => `undefined` \| `string` |
| `__namedParameters.loadConfig` | (`config`: [`ContentConfig`](../interfaces/modules.models.ContentConfig.md)) => `Promise`<`void`\> |
| `__namedParameters.setProjectId` | (`id`: `string`) => `void` |
| `__namedParameters.showScreen` | (`screen`: ``"open"`` \| ``"embed"`` \| ``"login"`` \| ``"info"`` \| ``"new"`` \| ``"assets"`` \| ``"add-asset"`` \| ``"import"`` \| ``"external"`` \| ``"share"`` \| ``"deploy"`` \| ``"custom-settings"`` \| ``"test-editor"``) => `void` |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/livecodes/UI/open.ts:371](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/UI/open.ts#L371)

___

### createSplitPanes

▸ **createSplitPanes**(): `Object`

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `destroy` | (`preserveStyles?`: `boolean`, `preserveGutters?`: `boolean`) => `void` |
| `show` | (`pane`: ``"code"`` \| ``"output"``, `full`: `boolean`) => `void` |

#### Defined in

[src/livecodes/UI/split-panes.ts:4](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/UI/split-panes.ts#L4)

___

### createStarterTemplateLink

▸ **createStarterTemplateLink**(`template`, `starterTemplatesList`, `baseUrl`): `HTMLAnchorElement`

#### Parameters

| Name | Type |
| :------ | :------ |
| `template` | [`Template`](modules.models.md#template) |
| `starterTemplatesList` | ``null`` \| `HTMLElement` |
| `baseUrl` | `string` |

#### Returns

`HTMLAnchorElement`

#### Defined in

[src/livecodes/UI/templates.ts:32](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/UI/templates.ts#L32)

___

### createTemplatesContainer

▸ **createTemplatesContainer**(`eventsManager`, `loadUserTemplates`): `HTMLElement`

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventsManager` | `Object` |
| `eventsManager.addEventListener` | (`element`: ``null`` \| `Window` \| `Document` \| `HTMLElement` \| `FileReader`, `eventType`: `string`, `fn`: (`event`: `Event` \| `KeyboardEvent` \| `MouseEvent` \| `MessageEvent`<`any`\> \| `CustomEvent`<`any`\>) => `void`, `options?`: `any`) => `void` |
| `eventsManager.removeEventListener` | (`element`: ``null`` \| `Window` \| `Document` \| `HTMLElement` \| `FileReader`, `eventType`: `string`, `fn`: (`event`: `Event` \| `KeyboardEvent` \| `MouseEvent` \| `MessageEvent`<`any`\>) => `void`) => `void` |
| `eventsManager.removeEventListeners` | () => `void` |
| `loadUserTemplates` | () => `void` |

#### Returns

`HTMLElement`

#### Defined in

[src/livecodes/UI/templates.ts:5](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/UI/templates.ts#L5)

___

### displayLoggedIn

▸ **displayLoggedIn**(`user`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `user` | [`User`](../interfaces/modules.models.User.md) |

#### Returns

`void`

#### Defined in

[src/livecodes/UI/login.ts:58](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/UI/login.ts#L58)

___

### displayLoggedOut

▸ **displayLoggedOut**(): `void`

#### Returns

`void`

#### Defined in

[src/livecodes/UI/login.ts:73](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/UI/login.ts#L73)

___

### getAddAssetButton

▸ **getAddAssetButton**(`listContainer`): `HTMLElement`

#### Parameters

| Name | Type |
| :------ | :------ |
| `listContainer` | `HTMLElement` |

#### Returns

`HTMLElement`

#### Defined in

[src/livecodes/UI/selectors.ts:271](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/UI/selectors.ts#L271)

___

### getAssetDataUrlFileInput

▸ **getAssetDataUrlFileInput**(`listContainer`): `HTMLInputElement`

#### Parameters

| Name | Type |
| :------ | :------ |
| `listContainer` | `HTMLElement` |

#### Returns

`HTMLInputElement`

#### Defined in

[src/livecodes/UI/selectors.ts:280](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/UI/selectors.ts#L280)

___

### getAssetDataUrlOutput

▸ **getAssetDataUrlOutput**(`listContainer`): `HTMLElement`

#### Parameters

| Name | Type |
| :------ | :------ |
| `listContainer` | `HTMLElement` |

#### Returns

`HTMLElement`

#### Defined in

[src/livecodes/UI/selectors.ts:283](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/UI/selectors.ts#L283)

___

### getAssetGHPagesFileInput

▸ **getAssetGHPagesFileInput**(`listContainer`): `HTMLInputElement`

#### Parameters

| Name | Type |
| :------ | :------ |
| `listContainer` | `HTMLElement` |

#### Returns

`HTMLInputElement`

#### Defined in

[src/livecodes/UI/selectors.ts:286](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/UI/selectors.ts#L286)

___

### getAssetGHPagesFileInputButton

▸ **getAssetGHPagesFileInputButton**(`listContainer`): `HTMLElement`

#### Parameters

| Name | Type |
| :------ | :------ |
| `listContainer` | `HTMLElement` |

#### Returns

`HTMLElement`

#### Defined in

[src/livecodes/UI/selectors.ts:292](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/UI/selectors.ts#L292)

___

### getAssetGHPagesFileInputLabel

▸ **getAssetGHPagesFileInputLabel**(`listContainer`): `HTMLElement`

#### Parameters

| Name | Type |
| :------ | :------ |
| `listContainer` | `HTMLElement` |

#### Returns

`HTMLElement`

#### Defined in

[src/livecodes/UI/selectors.ts:289](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/UI/selectors.ts#L289)

___

### getAssetGHPagesOutput

▸ **getAssetGHPagesOutput**(`listContainer`): `HTMLElement`

#### Parameters

| Name | Type |
| :------ | :------ |
| `listContainer` | `HTMLElement` |

#### Returns

`HTMLElement`

#### Defined in

[src/livecodes/UI/selectors.ts:295](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/UI/selectors.ts#L295)

___

### getAssetsButton

▸ **getAssetsButton**(`listContainer`): `HTMLElement`

#### Parameters

| Name | Type |
| :------ | :------ |
| `listContainer` | `HTMLElement` |

#### Returns

`HTMLElement`

#### Defined in

[src/livecodes/UI/selectors.ts:277](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/UI/selectors.ts#L277)

___

### getAssetsDeleteAllButton

▸ **getAssetsDeleteAllButton**(`listContainer`): `HTMLElement`

#### Parameters

| Name | Type |
| :------ | :------ |
| `listContainer` | `HTMLElement` |

#### Returns

`HTMLElement`

#### Defined in

[src/livecodes/UI/selectors.ts:274](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/UI/selectors.ts#L274)

___

### getAssetsLink

▸ **getAssetsLink**(): `HTMLInputElement`

#### Returns

`HTMLInputElement`

#### Defined in

[src/livecodes/UI/selectors.ts:156](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/UI/selectors.ts#L156)

___

### getAutosaveToggle

▸ **getAutosaveToggle**(): `HTMLInputElement`

#### Returns

`HTMLInputElement`

#### Defined in

[src/livecodes/UI/selectors.ts:129](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/UI/selectors.ts#L129)

___

### getAutoupdateToggle

▸ **getAutoupdateToggle**(): `HTMLInputElement`

#### Returns

`HTMLInputElement`

#### Defined in

[src/livecodes/UI/selectors.ts:126](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/UI/selectors.ts#L126)

___

### getBulkImportButton

▸ **getBulkImportButton**(`listContainer`): `HTMLElement`

#### Parameters

| Name | Type |
| :------ | :------ |
| `listContainer` | `HTMLElement` |

#### Returns

`HTMLElement`

#### Defined in

[src/livecodes/UI/selectors.ts:262](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/UI/selectors.ts#L262)

___

### getBulkImportFileInput

▸ **getBulkImportFileInput**(`importContainer`): `HTMLInputElement`

#### Parameters

| Name | Type |
| :------ | :------ |
| `importContainer` | `HTMLElement` |

#### Returns

`HTMLInputElement`

#### Defined in

[src/livecodes/UI/selectors.ts:226](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/UI/selectors.ts#L226)

___

### getBulkImportJsonUrlButton

▸ **getBulkImportJsonUrlButton**(`importContainer`): `HTMLInputElement`

#### Parameters

| Name | Type |
| :------ | :------ |
| `importContainer` | `HTMLElement` |

#### Returns

`HTMLInputElement`

#### Defined in

[src/livecodes/UI/selectors.ts:216](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/UI/selectors.ts#L216)

___

### getBulkImportJsonUrlForm

▸ **getBulkImportJsonUrlForm**(`importContainer`): `HTMLInputElement`

#### Parameters

| Name | Type |
| :------ | :------ |
| `importContainer` | `HTMLElement` |

#### Returns

`HTMLInputElement`

#### Defined in

[src/livecodes/UI/selectors.ts:214](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/UI/selectors.ts#L214)

___

### getBulkImportJsonUrlInput

▸ **getBulkImportJsonUrlInput**(`importContainer`): `HTMLInputElement`

#### Parameters

| Name | Type |
| :------ | :------ |
| `importContainer` | `HTMLElement` |

#### Returns

`HTMLInputElement`

#### Defined in

[src/livecodes/UI/selectors.ts:218](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/UI/selectors.ts#L218)

___

### getCSSPresetLinks

▸ **getCSSPresetLinks**(): `NodeListOf`<`HTMLAnchorElement`\>

#### Returns

`NodeListOf`<`HTMLAnchorElement`\>

#### Defined in

[src/livecodes/UI/selectors.ts:150](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/UI/selectors.ts#L150)

___

### getCodeImportInput

▸ **getCodeImportInput**(`importContainer`): `HTMLInputElement`

#### Parameters

| Name | Type |
| :------ | :------ |
| `importContainer` | `HTMLElement` |

#### Returns

`HTMLInputElement`

#### Defined in

[src/livecodes/UI/selectors.ts:204](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/UI/selectors.ts#L204)

___

### getCodeRunButton

▸ **getCodeRunButton**(): `HTMLElement`

#### Returns

`HTMLElement`

#### Defined in

[src/livecodes/UI/selectors.ts:17](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/UI/selectors.ts#L17)

___

### getCopyButton

▸ **getCopyButton**(): `HTMLElement`

#### Returns

`HTMLElement`

#### Defined in

[src/livecodes/UI/selectors.ts:19](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/UI/selectors.ts#L19)

___

### getCssPresetLinks

▸ **getCssPresetLinks**(): `NodeListOf`<`HTMLAnchorElement`\>

#### Returns

`NodeListOf`<`HTMLAnchorElement`\>

#### Defined in

[src/livecodes/UI/selectors.ts:72](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/UI/selectors.ts#L72)

___

### getCustomSettingsEditor

▸ **getCustomSettingsEditor**(): ``null`` \| `HTMLElement`

#### Returns

``null`` \| `HTMLElement`

#### Defined in

[src/livecodes/UI/selectors.ts:177](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/UI/selectors.ts#L177)

___

### getCustomSettingsLink

▸ **getCustomSettingsLink**(): ``null`` \| `HTMLAnchorElement`

#### Returns

``null`` \| `HTMLAnchorElement`

#### Defined in

[src/livecodes/UI/selectors.ts:115](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/UI/selectors.ts#L115)

___

### getDeleteAllButton

▸ **getDeleteAllButton**(`listContainer`): `HTMLElement`

#### Parameters

| Name | Type |
| :------ | :------ |
| `listContainer` | `HTMLElement` |

#### Returns

`HTMLElement`

#### Defined in

[src/livecodes/UI/selectors.ts:268](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/UI/selectors.ts#L268)

___

### getDeployLink

▸ **getDeployLink**(): ``null`` \| `HTMLAnchorElement`

#### Returns

``null`` \| `HTMLAnchorElement`

#### Defined in

[src/livecodes/UI/selectors.ts:122](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/UI/selectors.ts#L122)

___

### getEditTestsButton

▸ **getEditTestsButton**(): ``null`` \| `HTMLElement`

#### Returns

``null`` \| `HTMLElement`

#### Defined in

[src/livecodes/UI/selectors.ts:189](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/UI/selectors.ts#L189)

___

### getEditorContainerElement

▸ **getEditorContainerElement**(): `HTMLElement`

#### Returns

`HTMLElement`

#### Defined in

[src/livecodes/UI/selectors.ts:3](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/UI/selectors.ts#L3)

___

### getEditorDivs

▸ **getEditorDivs**(): `NodeListOf`<`HTMLElement`\>

#### Returns

`NodeListOf`<`HTMLElement`\>

#### Defined in

[src/livecodes/UI/selectors.ts:31](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/UI/selectors.ts#L31)

___

### getEditorTitles

▸ **getEditorTitles**(): `NodeListOf`<`HTMLElement`\>

#### Returns

`NodeListOf`<`HTMLElement`\>

#### Defined in

[src/livecodes/UI/selectors.ts:29](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/UI/selectors.ts#L29)

___

### getEditorToolbar

▸ **getEditorToolbar**(): `HTMLElement`

#### Returns

`HTMLElement`

#### Defined in

[src/livecodes/UI/selectors.ts:18](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/UI/selectors.ts#L18)

___

### getEditorsElement

▸ **getEditorsElement**(): `HTMLElement`

#### Returns

`HTMLElement`

#### Defined in

[src/livecodes/UI/selectors.ts:5](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/UI/selectors.ts#L5)

___

### getEmbedLink

▸ **getEmbedLink**(): ``null`` \| `HTMLAnchorElement`

#### Returns

``null`` \| `HTMLAnchorElement`

#### Defined in

[src/livecodes/UI/selectors.ts:120](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/UI/selectors.ts#L120)

___

### getEmmetToggle

▸ **getEmmetToggle**(): `HTMLInputElement`

#### Returns

`HTMLInputElement`

#### Defined in

[src/livecodes/UI/selectors.ts:138](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/UI/selectors.ts#L138)

___

### getExistingRepoButton

▸ **getExistingRepoButton**(`deployContainer`): `HTMLButtonElement`

#### Parameters

| Name | Type |
| :------ | :------ |
| `deployContainer` | `HTMLElement` |

#### Returns

`HTMLButtonElement`

#### Defined in

[src/livecodes/UI/selectors.ts:244](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/UI/selectors.ts#L244)

___

### getExistingRepoCommitSource

▸ **getExistingRepoCommitSource**(`deployContainer`): `HTMLInputElement`

#### Parameters

| Name | Type |
| :------ | :------ |
| `deployContainer` | `HTMLElement` |

#### Returns

`HTMLInputElement`

#### Defined in

[src/livecodes/UI/selectors.ts:250](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/UI/selectors.ts#L250)

___

### getExistingRepoForm

▸ **getExistingRepoForm**(`deployContainer`): ``null`` \| `HTMLFormElement`

#### Parameters

| Name | Type |
| :------ | :------ |
| `deployContainer` | `HTMLElement` |

#### Returns

``null`` \| `HTMLFormElement`

#### Defined in

[src/livecodes/UI/selectors.ts:242](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/UI/selectors.ts#L242)

___

### getExistingRepoMessageInput

▸ **getExistingRepoMessageInput**(`deployContainer`): `HTMLInputElement`

#### Parameters

| Name | Type |
| :------ | :------ |
| `deployContainer` | `HTMLElement` |

#### Returns

`HTMLInputElement`

#### Defined in

[src/livecodes/UI/selectors.ts:248](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/UI/selectors.ts#L248)

___

### getExistingRepoNameInput

▸ **getExistingRepoNameInput**(`deployContainer`): `HTMLInputElement`

#### Parameters

| Name | Type |
| :------ | :------ |
| `deployContainer` | `HTMLElement` |

#### Returns

`HTMLInputElement`

#### Defined in

[src/livecodes/UI/selectors.ts:246](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/UI/selectors.ts#L246)

___

### getExportAllButton

▸ **getExportAllButton**(`listContainer`): `HTMLElement`

#### Parameters

| Name | Type |
| :------ | :------ |
| `listContainer` | `HTMLElement` |

#### Returns

`HTMLElement`

#### Defined in

[src/livecodes/UI/selectors.ts:265](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/UI/selectors.ts#L265)

___

### getExportCodepenLink

▸ **getExportCodepenLink**(): ``null`` \| `HTMLAnchorElement`

#### Returns

``null`` \| `HTMLAnchorElement`

#### Defined in

[src/livecodes/UI/selectors.ts:91](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/UI/selectors.ts#L91)

___

### getExportGithubGistLink

▸ **getExportGithubGistLink**(): ``null`` \| `HTMLAnchorElement`

#### Returns

``null`` \| `HTMLAnchorElement`

#### Defined in

[src/livecodes/UI/selectors.ts:88](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/UI/selectors.ts#L88)

___

### getExportJSONLink

▸ **getExportJSONLink**(): ``null`` \| `HTMLAnchorElement`

#### Returns

``null`` \| `HTMLAnchorElement`

#### Defined in

[src/livecodes/UI/selectors.ts:79](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/UI/selectors.ts#L79)

___

### getExportJsfiddleLink

▸ **getExportJsfiddleLink**(): ``null`` \| `HTMLAnchorElement`

#### Returns

``null`` \| `HTMLAnchorElement`

#### Defined in

[src/livecodes/UI/selectors.ts:94](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/UI/selectors.ts#L94)

___

### getExportResultLink

▸ **getExportResultLink**(): ``null`` \| `HTMLAnchorElement`

#### Returns

``null`` \| `HTMLAnchorElement`

#### Defined in

[src/livecodes/UI/selectors.ts:82](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/UI/selectors.ts#L82)

___

### getExportSourceLink

▸ **getExportSourceLink**(): ``null`` \| `HTMLAnchorElement`

#### Returns

``null`` \| `HTMLAnchorElement`

#### Defined in

[src/livecodes/UI/selectors.ts:85](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/UI/selectors.ts#L85)

___

### getExternalResourcesBtn

▸ **getExternalResourcesBtn**(): `HTMLElement`

#### Returns

`HTMLElement`

#### Defined in

[src/livecodes/UI/selectors.ts:24](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/UI/selectors.ts#L24)

___

### getExternalResourcesLink

▸ **getExternalResourcesLink**(): ``null`` \| `HTMLAnchorElement`

#### Returns

``null`` \| `HTMLAnchorElement`

#### Defined in

[src/livecodes/UI/selectors.ts:112](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/UI/selectors.ts#L112)

___

### getExternalResourcesMark

▸ **getExternalResourcesMark**(): `HTMLElement`

#### Returns

`HTMLElement`

#### Defined in

[src/livecodes/UI/selectors.ts:26](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/UI/selectors.ts#L26)

___

### getExternalResourcesTextareas

▸ **getExternalResourcesTextareas**(): `NodeListOf`<`HTMLTextAreaElement`\>

#### Returns

`NodeListOf`<`HTMLTextAreaElement`\>

#### Defined in

[src/livecodes/UI/selectors.ts:171](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/UI/selectors.ts#L171)

___

### getForkLink

▸ **getForkLink**(): ``null`` \| `HTMLAnchorElement`

#### Returns

``null`` \| `HTMLAnchorElement`

#### Defined in

[src/livecodes/UI/selectors.ts:107](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/UI/selectors.ts#L107)

___

### getFormatButton

▸ **getFormatButton**(): `HTMLElement`

#### Returns

`HTMLElement`

#### Defined in

[src/livecodes/UI/selectors.ts:22](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/UI/selectors.ts#L22)

___

### getFormatOnsaveToggle

▸ **getFormatOnsaveToggle**(): `HTMLInputElement`

#### Returns

`HTMLInputElement`

#### Defined in

[src/livecodes/UI/selectors.ts:132](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/UI/selectors.ts#L132)

___

### getGutterElement

▸ **getGutterElement**(): `HTMLElement`

#### Returns

`HTMLElement`

#### Defined in

[src/livecodes/UI/selectors.ts:13](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/UI/selectors.ts#L13)

___

### getImportFileInput

▸ **getImportFileInput**(`importContainer`): `HTMLInputElement`

#### Parameters

| Name | Type |
| :------ | :------ |
| `importContainer` | `HTMLElement` |

#### Returns

`HTMLInputElement`

#### Defined in

[src/livecodes/UI/selectors.ts:223](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/UI/selectors.ts#L223)

___

### getImportJsonUrlButton

▸ **getImportJsonUrlButton**(`importContainer`): `HTMLInputElement`

#### Parameters

| Name | Type |
| :------ | :------ |
| `importContainer` | `HTMLElement` |

#### Returns

`HTMLInputElement`

#### Defined in

[src/livecodes/UI/selectors.ts:209](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/UI/selectors.ts#L209)

___

### getImportJsonUrlForm

▸ **getImportJsonUrlForm**(`importContainer`): `HTMLInputElement`

#### Parameters

| Name | Type |
| :------ | :------ |
| `importContainer` | `HTMLElement` |

#### Returns

`HTMLInputElement`

#### Defined in

[src/livecodes/UI/selectors.ts:207](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/UI/selectors.ts#L207)

___

### getImportJsonUrlInput

▸ **getImportJsonUrlInput**(`importContainer`): `HTMLInputElement`

#### Parameters

| Name | Type |
| :------ | :------ |
| `importContainer` | `HTMLElement` |

#### Returns

`HTMLInputElement`

#### Defined in

[src/livecodes/UI/selectors.ts:211](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/UI/selectors.ts#L211)

___

### getImportLink

▸ **getImportLink**(): ``null`` \| `HTMLAnchorElement`

#### Returns

``null`` \| `HTMLAnchorElement`

#### Defined in

[src/livecodes/UI/selectors.ts:124](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/UI/selectors.ts#L124)

___

### getInfoDescription

▸ **getInfoDescription**(): `HTMLTextAreaElement`

#### Returns

`HTMLTextAreaElement`

#### Defined in

[src/livecodes/UI/selectors.ts:162](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/UI/selectors.ts#L162)

___

### getInfoTagsInput

▸ **getInfoTagsInput**(): `HTMLInputElement`

#### Returns

`HTMLInputElement`

#### Defined in

[src/livecodes/UI/selectors.ts:165](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/UI/selectors.ts#L165)

___

### getInfoTitleInput

▸ **getInfoTitleInput**(): `HTMLInputElement`

#### Returns

`HTMLInputElement`

#### Defined in

[src/livecodes/UI/selectors.ts:159](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/UI/selectors.ts#L159)

___

### getLanguageMenuButtons

▸ **getLanguageMenuButtons**(): `NodeListOf`<`HTMLElement`\>

#### Returns

`NodeListOf`<`HTMLElement`\>

#### Defined in

[src/livecodes/UI/selectors.ts:63](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/UI/selectors.ts#L63)

___

### getLanguageMenuLinks

▸ **getLanguageMenuLinks**(): `NodeListOf`<`HTMLElement`\>

#### Returns

`NodeListOf`<`HTMLElement`\>

#### Defined in

[src/livecodes/UI/selectors.ts:60](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/UI/selectors.ts#L60)

___

### getLinkToSavedProjects

▸ **getLinkToSavedProjects**(`importContainer`): `HTMLAnchorElement`

#### Parameters

| Name | Type |
| :------ | :------ |
| `importContainer` | `HTMLElement` |

#### Returns

`HTMLAnchorElement`

#### Defined in

[src/livecodes/UI/selectors.ts:220](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/UI/selectors.ts#L220)

___

### getLoadCustomSettingsButton

▸ **getLoadCustomSettingsButton**(): ``null`` \| `HTMLElement`

#### Returns

``null`` \| `HTMLElement`

#### Defined in

[src/livecodes/UI/selectors.ts:180](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/UI/selectors.ts#L180)

___

### getLoadResourcesButton

▸ **getLoadResourcesButton**(): ``null`` \| `HTMLElement`

#### Returns

``null`` \| `HTMLElement`

#### Defined in

[src/livecodes/UI/selectors.ts:174](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/UI/selectors.ts#L174)

___

### getLoadTestsButton

▸ **getLoadTestsButton**(): ``null`` \| `HTMLElement`

#### Returns

``null`` \| `HTMLElement`

#### Defined in

[src/livecodes/UI/selectors.ts:186](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/UI/selectors.ts#L186)

___

### getLoginLink

▸ **getLoginLink**(): ``null`` \| `HTMLAnchorElement`

#### Returns

``null`` \| `HTMLAnchorElement`

#### Defined in

[src/livecodes/UI/selectors.ts:97](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/UI/selectors.ts#L97)

___

### getLogoLink

▸ **getLogoLink**(): `HTMLAnchorElement`

#### Returns

`HTMLAnchorElement`

#### Defined in

[src/livecodes/UI/selectors.ts:15](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/UI/selectors.ts#L15)

___

### getLogoutLink

▸ **getLogoutLink**(): ``null`` \| `HTMLAnchorElement`

#### Returns

``null`` \| `HTMLAnchorElement`

#### Defined in

[src/livecodes/UI/selectors.ts:99](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/UI/selectors.ts#L99)

___

### getMarkupElement

▸ **getMarkupElement**(): `HTMLElement`

#### Returns

`HTMLElement`

#### Defined in

[src/livecodes/UI/selectors.ts:6](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/UI/selectors.ts#L6)

___

### getModalCancelButton

▸ **getModalCancelButton**(): `HTMLElement`

#### Returns

`HTMLElement`

#### Defined in

[src/livecodes/UI/selectors.ts:44](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/UI/selectors.ts#L44)

___

### getModalCancelRestoreButton

▸ **getModalCancelRestoreButton**(): `HTMLElement`

#### Returns

`HTMLElement`

#### Defined in

[src/livecodes/UI/selectors.ts:51](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/UI/selectors.ts#L51)

___

### getModalDisableRestoreCheckbox

▸ **getModalDisableRestoreCheckbox**(): `HTMLInputElement`

#### Returns

`HTMLInputElement`

#### Defined in

[src/livecodes/UI/selectors.ts:57](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/UI/selectors.ts#L57)

___

### getModalDoNotSaveButton

▸ **getModalDoNotSaveButton**(): `HTMLElement`

#### Returns

`HTMLElement`

#### Defined in

[src/livecodes/UI/selectors.ts:42](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/UI/selectors.ts#L42)

___

### getModalRestoreButton

▸ **getModalRestoreButton**(): `HTMLElement`

#### Returns

`HTMLElement`

#### Defined in

[src/livecodes/UI/selectors.ts:47](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/UI/selectors.ts#L47)

___

### getModalSaveButton

▸ **getModalSaveButton**(): `HTMLElement`

#### Returns

`HTMLElement`

#### Defined in

[src/livecodes/UI/selectors.ts:40](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/UI/selectors.ts#L40)

___

### getModalSavePreviousButton

▸ **getModalSavePreviousButton**(): `HTMLElement`

#### Returns

`HTMLElement`

#### Defined in

[src/livecodes/UI/selectors.ts:49](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/UI/selectors.ts#L49)

___

### getModalUnsavedLastModified

▸ **getModalUnsavedLastModified**(): `HTMLElement`

#### Returns

`HTMLElement`

#### Defined in

[src/livecodes/UI/selectors.ts:55](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/UI/selectors.ts#L55)

___

### getModalUnsavedName

▸ **getModalUnsavedName**(): `HTMLElement`

#### Returns

`HTMLElement`

#### Defined in

[src/livecodes/UI/selectors.ts:53](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/UI/selectors.ts#L53)

___

### getNewLink

▸ **getNewLink**(): ``null`` \| `HTMLAnchorElement`

#### Returns

``null`` \| `HTMLAnchorElement`

#### Defined in

[src/livecodes/UI/selectors.ts:101](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/UI/selectors.ts#L101)

___

### getNewRepoButton

▸ **getNewRepoButton**(`deployContainer`): `HTMLButtonElement`

#### Parameters

| Name | Type |
| :------ | :------ |
| `deployContainer` | `HTMLElement` |

#### Returns

`HTMLButtonElement`

#### Defined in

[src/livecodes/UI/selectors.ts:231](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/UI/selectors.ts#L231)

___

### getNewRepoCommitSource

▸ **getNewRepoCommitSource**(`deployContainer`): `HTMLInputElement`

#### Parameters

| Name | Type |
| :------ | :------ |
| `deployContainer` | `HTMLElement` |

#### Returns

`HTMLInputElement`

#### Defined in

[src/livecodes/UI/selectors.ts:239](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/UI/selectors.ts#L239)

___

### getNewRepoForm

▸ **getNewRepoForm**(`deployContainer`): ``null`` \| `HTMLFormElement`

#### Parameters

| Name | Type |
| :------ | :------ |
| `deployContainer` | `HTMLElement` |

#### Returns

``null`` \| `HTMLFormElement`

#### Defined in

[src/livecodes/UI/selectors.ts:229](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/UI/selectors.ts#L229)

___

### getNewRepoMessageInput

▸ **getNewRepoMessageInput**(`deployContainer`): `HTMLInputElement`

#### Parameters

| Name | Type |
| :------ | :------ |
| `deployContainer` | `HTMLElement` |

#### Returns

`HTMLInputElement`

#### Defined in

[src/livecodes/UI/selectors.ts:237](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/UI/selectors.ts#L237)

___

### getNewRepoNameError

▸ **getNewRepoNameError**(`deployContainer`): `HTMLElement`

#### Parameters

| Name | Type |
| :------ | :------ |
| `deployContainer` | `HTMLElement` |

#### Returns

`HTMLElement`

#### Defined in

[src/livecodes/UI/selectors.ts:235](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/UI/selectors.ts#L235)

___

### getNewRepoNameInput

▸ **getNewRepoNameInput**(`deployContainer`): `HTMLInputElement`

#### Parameters

| Name | Type |
| :------ | :------ |
| `deployContainer` | `HTMLElement` |

#### Returns

`HTMLInputElement`

#### Defined in

[src/livecodes/UI/selectors.ts:233](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/UI/selectors.ts#L233)

___

### getOpenLink

▸ **getOpenLink**(): ``null`` \| `HTMLAnchorElement`

#### Returns

``null`` \| `HTMLAnchorElement`

#### Defined in

[src/livecodes/UI/selectors.ts:103](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/UI/selectors.ts#L103)

___

### getOutputElement

▸ **getOutputElement**(): `HTMLElement`

#### Returns

`HTMLElement`

#### Defined in

[src/livecodes/UI/selectors.ts:9](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/UI/selectors.ts#L9)

___

### getProcessorToggles

▸ **getProcessorToggles**(): `NodeListOf`<`HTMLInputElement`\>

#### Returns

`NodeListOf`<`HTMLInputElement`\>

#### Defined in

[src/livecodes/UI/selectors.ts:135](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/UI/selectors.ts#L135)

___

### getProjectInfoLink

▸ **getProjectInfoLink**(): `HTMLInputElement`

#### Returns

`HTMLInputElement`

#### Defined in

[src/livecodes/UI/selectors.ts:153](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/UI/selectors.ts#L153)

___

### getProjectTitleElement

▸ **getProjectTitleElement**(): `HTMLElement`

#### Returns

`HTMLElement`

#### Defined in

[src/livecodes/UI/selectors.ts:2](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/UI/selectors.ts#L2)

___

### getRedoButton

▸ **getRedoButton**(): `HTMLElement`

#### Returns

`HTMLElement`

#### Defined in

[src/livecodes/UI/selectors.ts:21](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/UI/selectors.ts#L21)

___

### getRestoreToggle

▸ **getRestoreToggle**(): `HTMLInputElement`

#### Returns

`HTMLInputElement`

#### Defined in

[src/livecodes/UI/selectors.ts:144](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/UI/selectors.ts#L144)

___

### getResultButton

▸ **getResultButton**(): `HTMLElement`

#### Returns

`HTMLElement`

#### Defined in

[src/livecodes/UI/selectors.ts:28](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/UI/selectors.ts#L28)

___

### getResultElement

▸ **getResultElement**(): `HTMLElement`

#### Returns

`HTMLElement`

#### Defined in

[src/livecodes/UI/selectors.ts:10](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/UI/selectors.ts#L10)

___

### getResultIFrameElement

▸ **getResultIFrameElement**(): `HTMLIFrameElement`

#### Returns

`HTMLIFrameElement`

#### Defined in

[src/livecodes/UI/selectors.ts:11](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/UI/selectors.ts#L11)

___

### getRunButton

▸ **getRunButton**(): `HTMLElement`

#### Returns

`HTMLElement`

#### Defined in

[src/livecodes/UI/selectors.ts:16](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/UI/selectors.ts#L16)

___

### getRunTestsButton

▸ **getRunTestsButton**(): ``null`` \| `HTMLElement`

#### Returns

``null`` \| `HTMLElement`

#### Defined in

[src/livecodes/UI/selectors.ts:192](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/UI/selectors.ts#L192)

___

### getSaveAsTemplateLink

▸ **getSaveAsTemplateLink**(): ``null`` \| `HTMLAnchorElement`

#### Returns

``null`` \| `HTMLAnchorElement`

#### Defined in

[src/livecodes/UI/selectors.ts:109](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/UI/selectors.ts#L109)

___

### getSaveInfoButton

▸ **getSaveInfoButton**(): ``null`` \| `HTMLElement`

#### Returns

``null`` \| `HTMLElement`

#### Defined in

[src/livecodes/UI/selectors.ts:168](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/UI/selectors.ts#L168)

___

### getSaveLink

▸ **getSaveLink**(): ``null`` \| `HTMLAnchorElement`

#### Returns

``null`` \| `HTMLAnchorElement`

#### Defined in

[src/livecodes/UI/selectors.ts:105](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/UI/selectors.ts#L105)

___

### getScriptElement

▸ **getScriptElement**(): `HTMLElement`

#### Returns

`HTMLElement`

#### Defined in

[src/livecodes/UI/selectors.ts:8](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/UI/selectors.ts#L8)

___

### getSettingToggles

▸ **getSettingToggles**(): `NodeListOf`<`HTMLInputElement`\>

#### Returns

`NodeListOf`<`HTMLInputElement`\>

#### Defined in

[src/livecodes/UI/selectors.ts:69](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/UI/selectors.ts#L69)

___

### getSettingsButton

▸ **getSettingsButton**(): ``null`` \| `HTMLElement`

#### Returns

``null`` \| `HTMLElement`

#### Defined in

[src/livecodes/UI/selectors.ts:77](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/UI/selectors.ts#L77)

___

### getSettingsMenuScroller

▸ **getSettingsMenuScroller**(): ``null`` \| `HTMLElement`

#### Returns

``null`` \| `HTMLElement`

#### Defined in

[src/livecodes/UI/selectors.ts:75](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/UI/selectors.ts#L75)

___

### getShareLink

▸ **getShareLink**(): ``null`` \| `HTMLAnchorElement`

#### Returns

``null`` \| `HTMLAnchorElement`

#### Defined in

[src/livecodes/UI/selectors.ts:118](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/UI/selectors.ts#L118)

___

### getSpacingToggle

▸ **getSpacingToggle**(): `HTMLInputElement`

#### Returns

`HTMLInputElement`

#### Defined in

[src/livecodes/UI/selectors.ts:147](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/UI/selectors.ts#L147)

___

### getStarterTemplatesList

▸ **getStarterTemplatesList**(`templatesContainer`): ``null`` \| `HTMLElement`

#### Parameters

| Name | Type |
| :------ | :------ |
| `templatesContainer` | `HTMLElement` |

#### Returns

``null`` \| `HTMLElement`

#### Defined in

[src/livecodes/UI/selectors.ts:257](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/UI/selectors.ts#L257)

___

### getStarterTemplatesTab

▸ **getStarterTemplatesTab**(`templatesContainer`): ``null`` \| `HTMLElement`

#### Parameters

| Name | Type |
| :------ | :------ |
| `templatesContainer` | `HTMLElement` |

#### Returns

``null`` \| `HTMLElement`

#### Defined in

[src/livecodes/UI/selectors.ts:253](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/UI/selectors.ts#L253)

___

### getStyleElement

▸ **getStyleElement**(): `HTMLElement`

#### Returns

`HTMLElement`

#### Defined in

[src/livecodes/UI/selectors.ts:7](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/UI/selectors.ts#L7)

___

### getTags

▸ **getTags**(`value`): `string`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

#### Returns

`string`[]

#### Defined in

[src/livecodes/UI/info.ts:10](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/UI/info.ts#L10)

___

### getTestEditor

▸ **getTestEditor**(): ``null`` \| `HTMLElement`

#### Returns

``null`` \| `HTMLElement`

#### Defined in

[src/livecodes/UI/selectors.ts:183](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/UI/selectors.ts#L183)

___

### getThemeToggle

▸ **getThemeToggle**(): `HTMLInputElement`

#### Returns

`HTMLInputElement`

#### Defined in

[src/livecodes/UI/selectors.ts:141](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/UI/selectors.ts#L141)

___

### getToolbarElement

▸ **getToolbarElement**(): `HTMLElement`

#### Returns

`HTMLElement`

#### Defined in

[src/livecodes/UI/selectors.ts:1](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/UI/selectors.ts#L1)

___

### getToolspaneBar

▸ **getToolspaneBar**(): `HTMLElement`

#### Returns

`HTMLElement`

#### Defined in

[src/livecodes/UI/selectors.ts:34](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/UI/selectors.ts#L34)

___

### getToolspaneButtons

▸ **getToolspaneButtons**(): `HTMLElement`

#### Returns

`HTMLElement`

#### Defined in

[src/livecodes/UI/selectors.ts:36](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/UI/selectors.ts#L36)

___

### getToolspaneElement

▸ **getToolspaneElement**(): `HTMLElement`

#### Returns

`HTMLElement`

#### Defined in

[src/livecodes/UI/selectors.ts:32](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/UI/selectors.ts#L32)

___

### getToolspaneLoader

▸ **getToolspaneLoader**(): ``null`` \| `HTMLElement`

#### Returns

``null`` \| `HTMLElement`

#### Defined in

[src/livecodes/UI/selectors.ts:39](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/UI/selectors.ts#L39)

___

### getToolspaneTitles

▸ **getToolspaneTitles**(): ``null`` \| `HTMLElement`

#### Returns

``null`` \| `HTMLElement`

#### Defined in

[src/livecodes/UI/selectors.ts:38](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/UI/selectors.ts#L38)

___

### getUndoButton

▸ **getUndoButton**(): `HTMLElement`

#### Returns

`HTMLElement`

#### Defined in

[src/livecodes/UI/selectors.ts:20](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/UI/selectors.ts#L20)

___

### getUrlImportButton

▸ **getUrlImportButton**(`importContainer`): `HTMLButtonElement`

#### Parameters

| Name | Type |
| :------ | :------ |
| `importContainer` | `HTMLElement` |

#### Returns

`HTMLButtonElement`

#### Defined in

[src/livecodes/UI/selectors.ts:200](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/UI/selectors.ts#L200)

___

### getUrlImportForm

▸ **getUrlImportForm**(`importContainer`): ``null`` \| `HTMLFormElement`

#### Parameters

| Name | Type |
| :------ | :------ |
| `importContainer` | `HTMLElement` |

#### Returns

``null`` \| `HTMLFormElement`

#### Defined in

[src/livecodes/UI/selectors.ts:198](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/UI/selectors.ts#L198)

___

### getUrlImportInput

▸ **getUrlImportInput**(`importContainer`): `HTMLInputElement`

#### Parameters

| Name | Type |
| :------ | :------ |
| `importContainer` | `HTMLElement` |

#### Returns

`HTMLInputElement`

#### Defined in

[src/livecodes/UI/selectors.ts:202](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/UI/selectors.ts#L202)

___

### getUserTemplatesScreen

▸ **getUserTemplatesScreen**(`templatesContainer`): `HTMLElement`

#### Parameters

| Name | Type |
| :------ | :------ |
| `templatesContainer` | `HTMLElement` |

#### Returns

`HTMLElement`

#### Defined in

[src/livecodes/UI/selectors.ts:259](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/UI/selectors.ts#L259)

___

### getWatchTestsButton

▸ **getWatchTestsButton**(): ``null`` \| `HTMLElement`

#### Returns

``null`` \| `HTMLElement`

#### Defined in

[src/livecodes/UI/selectors.ts:195](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/UI/selectors.ts#L195)

___

### getstyleMenu

▸ **getstyleMenu**(): ``null`` \| `HTMLElement`

#### Returns

``null`` \| `HTMLElement`

#### Defined in

[src/livecodes/UI/selectors.ts:66](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/UI/selectors.ts#L66)

___

### loadingMessage

▸ **loadingMessage**(): `HTMLDivElement`

#### Returns

`HTMLDivElement`

#### Defined in

[src/livecodes/UI/loading.ts:1](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/UI/loading.ts#L1)
