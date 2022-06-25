---
id: "modules.deploy"
title: "Namespace: deploy"
sidebar_label: "deploy"
custom_edit_url: null
---

[_modules](../modules/modules.md).deploy

## Interfaces

- [DeployResult](../interfaces/modules.deploy.DeployResult.md)
- [GitHubFile](../interfaces/modules.deploy.GitHubFile.md)

## Functions

### deploy

▸ **deploy**(`__namedParameters`): `Promise`<``null`` \| [`DeployResult`](../interfaces/modules.deploy.DeployResult.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.commitSource` | `boolean` |
| `__namedParameters.config` | [`ContentConfig`](../interfaces/modules.models.ContentConfig.md) |
| `__namedParameters.content` | `Object` |
| `__namedParameters.content.resultPage` | `string` |
| `__namedParameters.content.script` | `string` |
| `__namedParameters.content.style` | `string` |
| `__namedParameters.deps` | `Object` |
| `__namedParameters.deps.getLanguageExtension` | (`alias`: `string`) => `undefined` \| [`Language`](modules.models.md#language) |
| `__namedParameters.message` | `string` |
| `__namedParameters.newRepo` | `boolean` |
| `__namedParameters.repo` | `string` |
| `__namedParameters.singleFile` | `boolean` |
| `__namedParameters.user` | [`User`](../interfaces/modules.models.User.md) |

#### Returns

`Promise`<``null`` \| [`DeployResult`](../interfaces/modules.deploy.DeployResult.md)\>

#### Defined in

[src/livecodes/deploy/deploy.ts:259](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/deploy/deploy.ts#L259)

___

### deployFile

▸ **deployFile**(`__namedParameters`): `Promise`<``null`` \| [`DeployResult`](../interfaces/modules.deploy.DeployResult.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.branch?` | `string` |
| `__namedParameters.file` | [`GitHubFile`](../interfaces/modules.deploy.GitHubFile.md) |
| `__namedParameters.message?` | `string` |
| `__namedParameters.repo?` | `string` |
| `__namedParameters.user` | [`User`](../interfaces/modules.models.User.md) |

#### Returns

`Promise`<``null`` \| [`DeployResult`](../interfaces/modules.deploy.DeployResult.md)\>

#### Defined in

[src/livecodes/deploy/deploy.ts:336](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/deploy/deploy.ts#L336)

___

### deployedConfirmation

▸ **deployedConfirmation**(`deployResult`, `sourcePublished`): `HTMLDivElement`

#### Parameters

| Name | Type |
| :------ | :------ |
| `deployResult` | [`DeployResult`](../interfaces/modules.deploy.DeployResult.md) |
| `sourcePublished` | `boolean` |

#### Returns

`HTMLDivElement`

#### Defined in

[src/livecodes/deploy/deploy.ts:386](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/deploy/deploy.ts#L386)

___

### getUserPublicRepos

▸ **getUserPublicRepos**(`user`): `Promise`<`any`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `user` | [`User`](../interfaces/modules.models.User.md) |

#### Returns

`Promise`<`any`[]\>

#### Defined in

[src/livecodes/deploy/get-public-repos.ts:5](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/deploy/get-public-repos.ts#L5)

___

### repoExists

▸ **repoExists**(`user`, `repo`): `Promise`<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `user` | [`User`](../interfaces/modules.models.User.md) |
| `repo` | `string` |

#### Returns

`Promise`<`boolean`\>

#### Defined in

[src/livecodes/deploy/deploy.ts:10](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/deploy/deploy.ts#L10)
