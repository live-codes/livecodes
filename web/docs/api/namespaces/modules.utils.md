---
id: "modules.utils"
title: "Namespace: utils"
sidebar_label: "utils"
custom_edit_url: null
---

[_modules](../modules/modules.md).utils

## Functions

### blobToBase64

▸ **blobToBase64**(`file`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `file` | `Blob` |

#### Returns

`Promise`<`string`\>

#### Defined in

[src/livecodes/utils/utils.ts:198](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/utils/utils.ts#L198)

___

### cloneObject

▸ **cloneObject**<`T`\>(`x`): `T`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `x` | `Record`<`string`, `any`\> |

#### Returns

`T`

#### Defined in

[src/livecodes/utils/utils.ts:74](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/utils/utils.ts#L74)

___

### copyToClipboard

▸ **copyToClipboard**(`text`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `text` | `string` |

#### Returns

`boolean`

#### Defined in

[src/livecodes/utils/utils.ts:86](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/utils/utils.ts#L86)

___

### debounce

▸ **debounce**(`fn`, `delay`): (...`args`: `unknown`[]) => `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `fn` | (...`x`: `any`[]) => `any` |
| `delay` | `number` |

#### Returns

`fn`

▸ (...`args`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | `unknown`[] |

##### Returns

`void`

#### Defined in

[src/livecodes/utils/utils.ts:3](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/utils/utils.ts#L3)

___

### decodeHTML

▸ **decodeHTML**(`html`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `html` | `string` |

#### Returns

`string`

#### Defined in

[src/livecodes/utils/utils.ts:12](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/utils/utils.ts#L12)

___

### downloadFile

▸ **downloadFile**(`filename`, `extension`, `content`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `filename` | `string` |
| `extension` | `string` |
| `content` | `string` |

#### Returns

`void`

#### Defined in

[src/livecodes/utils/utils.ts:129](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/utils/utils.ts#L129)

___

### encodeHTML

▸ **encodeHTML**(`html`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `html` | `string` |

#### Returns

`string`

#### Defined in

[src/livecodes/utils/utils.ts:18](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/utils/utils.ts#L18)

___

### escapeCode

▸ **escapeCode**(`code`, `slash?`): `string`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `code` | `string` | `undefined` |
| `slash` | `boolean` | `true` |

#### Returns

`string`

#### Defined in

[src/livecodes/utils/utils.ts:28](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/utils/utils.ts#L28)

___

### escapeScript

▸ **escapeScript**(`code`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `code` | `string` |

#### Returns

`string`

#### Defined in

[src/livecodes/utils/utils.ts:26](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/utils/utils.ts#L26)

___

### fetchWithHandler

▸ **fetchWithHandler**(`input`, `init?`): `Promise`<`Response`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `input` | `RequestInfo` |
| `init?` | `RequestInit` |

#### Returns

`Promise`<`Response`\>

#### Defined in

[src/livecodes/utils/utils.ts:195](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/utils/utils.ts#L195)

___

### getAbsoluteUrl

▸ **getAbsoluteUrl**(`url`, `baseUrl?`): `string`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `url` | `string` | `undefined` |
| `baseUrl` | `string` | `document.baseURI` |

#### Returns

`string`

#### Defined in

[src/livecodes/utils/utils.ts:71](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/utils/utils.ts#L71)

___

### getDate

▸ **getDate**(): `string`

#### Returns

`string`

#### Defined in

[src/livecodes/utils/utils.ts:187](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/utils/utils.ts#L187)

___

### getImportInstance

▸ **getImportInstance**(`url`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |

#### Returns

`any`

#### Defined in

[src/livecodes/utils/get-import-instance.ts:7](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/utils/get-import-instance.ts#L7)

___

### getLanguageCustomSettings

▸ **getLanguageCustomSettings**(`language`, `config`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `language` | [`Language`](modules.models.md#language) |
| `config` | [`Config`](../interfaces/main.Config.md) |

#### Returns

`any`

#### Defined in

[src/livecodes/utils/utils.ts:222](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/utils/utils.ts#L222)

___

### getRandomString

▸ **getRandomString**(): `string`

#### Returns

`string`

#### Defined in

[src/livecodes/utils/utils.ts:127](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/utils/utils.ts#L127)

___

### getValidUrl

▸ **getValidUrl**(`url?`): ``null`` \| `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `url?` | `string` |

#### Returns

``null`` \| `string`

#### Defined in

[src/livecodes/utils/utils.ts:226](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/utils/utils.ts#L226)

___

### getWorkerDataURL

▸ **getWorkerDataURL**(`url`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |

#### Returns

`string`

#### Defined in

[src/livecodes/utils/utils.ts:206](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/utils/utils.ts#L206)

___

### handleFetchError

▸ **handleFetchError**(`res`): `Response` \| `Promise`<`never`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `res` | `Response` |

#### Returns

`Response` \| `Promise`<`never`\>

#### Defined in

[src/livecodes/utils/utils.ts:194](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/utils/utils.ts#L194)

___

### isMobile

▸ **isMobile**(): `boolean`

#### Returns

`boolean`

#### Defined in

[src/livecodes/utils/utils.ts:47](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/utils/utils.ts#L47)

___

### isRelativeUrl

▸ **isRelativeUrl**(`url?`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `url?` | `string` |

#### Returns

`boolean`

#### Defined in

[src/livecodes/utils/utils.ts:68](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/utils/utils.ts#L68)

___

### loadScript

▸ **loadScript**(`url`, `name?`): `Promise`<`unknown`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `name?` | `string` |

#### Returns

`Promise`<`unknown`\>

#### Defined in

[src/livecodes/utils/utils.ts:138](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/utils/utils.ts#L138)

___

### loadStylesheet

▸ **loadStylesheet**(`url`, `id?`, `insertBefore?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `id?` | `string` |
| `insertBefore?` | `string` |

#### Returns

`void`

#### Defined in

[src/livecodes/utils/utils.ts:172](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/utils/utils.ts#L172)

___

### objectFilter

▸ **objectFilter**(`obj`, `predicate`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `obj` | `Record`<`string`, `any`\> |
| `predicate` | (`value`: `any`, `key`: `string`, `index`: `number`) => `any` |

#### Returns

`Object`

#### Defined in

[src/livecodes/utils/utils.ts:81](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/utils/utils.ts#L81)

___

### objectMap

▸ **objectMap**(`obj`, `fn`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `obj` | `Record`<`string`, `any`\> |
| `fn` | (`value`: `any`, `key`: `string`, `index`: `number`) => `any` |

#### Returns

`Object`

#### Defined in

[src/livecodes/utils/utils.ts:76](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/utils/utils.ts#L76)

___

### pipe

▸ **pipe**(...`fns`): `Function`

#### Parameters

| Name | Type |
| :------ | :------ |
| `...fns` | `Function`[] |

#### Returns

`Function`

#### Defined in

[src/livecodes/utils/utils.ts:35](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/utils/utils.ts#L35)

___

### removeComments

▸ **removeComments**(`src`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `src` | `string` |

#### Returns

`string`

#### Defined in

[src/livecodes/utils/utils.ts:211](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/utils/utils.ts#L211)

___

### removeCommentsAndStrings

▸ **removeCommentsAndStrings**(`src`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `src` | `string` |

#### Returns

`string`

#### Defined in

[src/livecodes/utils/utils.ts:220](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/utils/utils.ts#L220)

___

### removeStrings

▸ **removeStrings**(`src`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `src` | `string` |

#### Returns

`string`

#### Defined in

[src/livecodes/utils/utils.ts:214](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/utils/utils.ts#L214)

___

### safeName

▸ **safeName**(`name`, `symbol?`): `string`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `name` | `string` | `undefined` |
| `symbol` | `string` | `'_'` |

#### Returns

`string`

#### Defined in

[src/livecodes/utils/utils.ts:43](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/utils/utils.ts#L43)

___

### stringToValidJson

▸ **stringToValidJson**(`str`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `str` | `string` |

#### Returns

`string`

#### Defined in

[src/livecodes/utils/utils.ts:106](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/utils/utils.ts#L106)

___

### stringify

▸ **stringify**(`obj`, `pretty?`): `string`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `obj` | `any` | `undefined` |
| `pretty` | `boolean` | `false` |

#### Returns

`string`

#### Defined in

[src/livecodes/utils/utils.ts:119](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/utils/utils.ts#L119)

___

### typedArrayToBuffer

▸ **typedArrayToBuffer**(`array`): `ArrayBuffer`

#### Parameters

| Name | Type |
| :------ | :------ |
| `array` | `Uint8Array` |

#### Returns

`ArrayBuffer`

#### Defined in

[src/livecodes/utils/utils.ts:184](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/utils/utils.ts#L184)
