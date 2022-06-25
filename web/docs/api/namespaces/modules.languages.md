---
id: "modules.languages"
title: "Namespace: languages"
sidebar_label: "languages"
custom_edit_url: null
---

[_modules](../modules/modules.md).languages

## Type Aliases

### Plugin

Ƭ **Plugin**: () => `any`

#### Type declaration

▸ (): `any`

##### Returns

`any`

#### Defined in

[src/livecodes/languages/postcss/processor-postcss.ts:6](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/languages/postcss/processor-postcss.ts#L6)

___

### PluginFactory

Ƭ **PluginFactory**: (`{
  config,
  options,
  baseUrl,
}`: { `baseUrl`: `string` ; `config`: [`Config`](../interfaces/main.Config.md) ; `options?`: `any`  }) => [`Plugin`](modules.languages.md#plugin)

#### Type declaration

▸ (`{
  config,
  options,
  baseUrl,
}`): [`Plugin`](modules.languages.md#plugin)

##### Parameters

| Name | Type |
| :------ | :------ |
| `{
  config,
  options,
  baseUrl,
}` | `Object` |
| `{
  config,
  options,
  baseUrl,
}.baseUrl` | `string` |
| `{
  config,
  options,
  baseUrl,
}.config` | [`Config`](../interfaces/main.Config.md) |
| `{
  config,
  options,
  baseUrl,
}.options?` | `any` |

##### Returns

[`Plugin`](modules.languages.md#plugin)

#### Defined in

[src/livecodes/languages/postcss/processor-postcss.ts:7](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/languages/postcss/processor-postcss.ts#L7)

___

### PluginName

Ƭ **PluginName**: keyof [`Config`](../interfaces/main.Config.md)[``"processors"``][``"postcss"``]

#### Defined in

[src/livecodes/languages/postcss/processor-postcss.ts:5](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/languages/postcss/processor-postcss.ts#L5)

## Variables

### cssPresets

• `Const` **cssPresets**: [`CssPreset`](../interfaces/modules.models.CssPreset.md)[]

#### Defined in

[src/livecodes/languages/css-presets.ts:4](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/languages/css-presets.ts#L4)

___

### languages

• `Const` **languages**: [`LanguageSpecs`](../interfaces/modules.models.LanguageSpecs.md)[]

#### Defined in

[src/livecodes/languages/languages.ts:59](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/languages/languages.ts#L59)

___

### parserPlugins

• `Const` **parserPlugins**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `babel` | `string` |
| `glimmer` | `string` |
| `html` | `string` |
| `markdown` | `string` |
| `php` | `string` |
| `postcss` | `string` |
| `pug` | `string` |

#### Defined in

[src/livecodes/languages/prettier.ts:4](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/languages/prettier.ts#L4)

___

### pluginSpecs

• `Const` **pluginSpecs**: `PluginSpecs`[]

#### Defined in

[src/livecodes/languages/postcss/processor-postcss.ts:25](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/languages/postcss/processor-postcss.ts#L25)

___

### postcss

• `Const` **postcss**: [`Processors`](../interfaces/modules.models.Processors.md)

#### Defined in

[src/livecodes/languages/postcss/processor-postcss.ts:85](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/languages/postcss/processor-postcss.ts#L85)

___

### prettierUrl

• `Const` **prettierUrl**: `string`

#### Defined in

[src/livecodes/languages/prettier.ts:3](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/languages/prettier.ts#L3)

___

### processors

• `Const` **processors**: [`Processors`](../interfaces/modules.models.Processors.md)[]

#### Defined in

[src/livecodes/languages/processors.ts:5](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/languages/processors.ts#L5)

## Functions

### createLanguageMenus

▸ **createLanguageMenus**(`config`, `baseUrl`, `eventsManager`, `showLanguageInfo`, `loadStarterTemplate`, `importCode`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | [`Config`](../interfaces/main.Config.md) |
| `baseUrl` | `string` |
| `eventsManager` | `Object` |
| `eventsManager.addEventListener` | (`element`: ``null`` \| `Window` \| `Document` \| `HTMLElement` \| `FileReader`, `eventType`: `string`, `fn`: (`event`: `Event` \| `KeyboardEvent` \| `MouseEvent` \| `MessageEvent`<`any`\> \| `CustomEvent`<`any`\>) => `void`, `options?`: `any`) => `void` |
| `eventsManager.removeEventListener` | (`element`: ``null`` \| `Window` \| `Document` \| `HTMLElement` \| `FileReader`, `eventType`: `string`, `fn`: (`event`: `Event` \| `KeyboardEvent` \| `MouseEvent` \| `MessageEvent`<`any`\>) => `void`) => `void` |
| `eventsManager.removeEventListeners` | () => `void` |
| `showLanguageInfo` | (`languageInfo`: `HTMLElement`) => `void` |
| `loadStarterTemplate` | (`templateName`: `string`) => `void` |
| `importCode` | (`options`: { `url`: `string`  }) => `Promise`<`boolean`\> |

#### Returns

`void`

#### Defined in

[src/livecodes/languages/create-language-menus.ts:7](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/languages/create-language-menus.ts#L7)

___

### detectLanguage

▸ **detectLanguage**(`code`, `languages`): `Promise`<{ `language`: [`Language`](modules.models.md#language) ; `secondBest`: [`Language`](modules.models.md#language)  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `code` | `string` |
| `languages` | [`Language`](modules.models.md#language)[] |

#### Returns

`Promise`<{ `language`: [`Language`](modules.models.md#language) ; `secondBest`: [`Language`](modules.models.md#language)  }\>

#### Defined in

[src/livecodes/languages/utils.ts:119](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/languages/utils.ts#L119)

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

[src/livecodes/languages/utils.ts:85](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/languages/utils.ts#L85)

___

### getCustomSettings

▸ **getCustomSettings**(`language`, `config`): `Partial`<{ `Binary`: `any` ; `C`: `any` ; `adoc`: `any` ; `as`: `any` ; `asc`: `any` ; `asciidoc`: `any` ; `assemblyscript`: `any` ; `astro`: `any` ; `autoprefixer`: `any` ; `babel`: `any` ; `blockly`: `any` ; `blockly.xml`: `any` ; `c`: `any` ; `c++`: `any` ; `clang`: `any` ; `clang.cpp`: `any` ; `clio`: `any` ; `coffee`: `any` ; `coffeescript`: `any` ; `common-lisp`: `any` ; `commonlisp`: `any` ; `cp`: `any` ; `cpp`: `any` ; `cppm`: `any` ; `csharp`: `any` ; `css`: `any` ; `cxx`: `any` ; `diagram`: `any` ; `dot`: `any` ; `ejs`: `any` ; `es`: `any` ; `go`: `any` ; `golang`: `any` ; `graph`: `any` ; `h`: `any` ; `haml`: `any` ; `handlebars`: `any` ; `hbs`: `any` ; `hpp`: `any` ; `htm`: `any` ; `html`: `any` ; `ii`: `any` ; `imba`: `any` ; `ixx`: `any` ; `jade`: `any` ; `javascript`: `any` ; `jl`: `any` ; `js`: `any` ; `json`: `any` ; `jsx`: `any` ; `julia`: `any` ; `less`: `any` ; `liquid`: `any` ; `liquidjs`: `any` ; `lisp`: `any` ; `livescript`: `any` ; `ls`: `any` ; `lua`: `any` ; `malina`: `any` ; `malinajs`: `any` ; `markdown`: `any` ; `md`: `any` ; `mdown`: `any` ; `mdx`: `any` ; `mkdn`: `any` ; `ml`: `any` ; `mli`: `any` ; `mustache`: `any` ; `njk`: `any` ; `nunjucks`: `any` ; `ocaml`: `any` ; `perl`: `any` ; `php`: `any` ; `pintora`: `any` ; `pl`: `any` ; `plt`: `any` ; `pm`: `any` ; `postcss`: `any` ; `postcssImportUrl`: `any` ; `postcssPresetEnv`: `any` ; `prolog`: `any` ; `prolog.pl`: `any` ; `pug`: `any` ; `py`: `any` ; `py3`: `any` ; `pyodide`: `any` ; `python`: `any` ; `rb`: `any` ; `re`: `any` ; `react-native`: `any` ; `react-native-tsx`: `any` ; `react-native.jsx`: `any` ; `react-native.tsx`: `any` ; `reason`: `any` ; `rei`: `any` ; `res`: `any` ; `rescript`: `any` ; `resi`: `any` ; `rich`: `any` ; `richtext`: `any` ; `riot`: `any` ; `riotjs`: `any` ; `rte`: `any` ; `rte.html`: `any` ; `ruby`: `any` ; `sass`: `any` ; `scheme`: `any` ; `scm`: `any` ; `scss`: `any` ; `solid`: `any` ; `solid.jsx`: `any` ; `solid.tsx`: `any` ; `sql`: `any` ; `sqlite`: `any` ; `sqlite3`: `any` ; `stencil`: `any` ; `stencil.tsx`: `any` ; `styl`: `any` ; `stylus`: `any` ; `svelte`: `any` ; `tailwindcss`: `any` ; `tcl`: `any` ; `ts`: `any` ; `tsx`: `any` ; `twig`: `any` ; `typescript`: `any` ; `vue`: `any` ; `vue2`: `any` ; `vue3`: `any` ; `wasm`: `any` ; `wast`: `any` ; `wat`: `any` ; `webassembly`: `any` ; `windicss`: `any` ; `xht`: `any` ; `xml`: `any`  } & { `convertCommonjs`: `boolean` ; `head`: `string` ; `htmlClasses`: `string` ; `imports`: `Record`<`string`, `string`\> ; `mapImports`: `boolean` ; `scriptType`: `undefined` \| ``""`` \| ``"module"`` \| ``"application/javascript"`` \| ``"application/ecmascript"`` \| ``"text/javascript"`` \| ``"text/ecmascript"`` \| ``"text/liquid"`` \| ``"text/python"`` \| ``"text/x-uniter-php"`` \| ``"text/cpp"`` \| ``"text/perl"`` \| ``"text/julia"`` \| ``"text/biwascheme"`` \| ``"text/commonlisp"`` \| ``"text/tcl"`` \| ``"text/prolog"`` \| ``"application/json"`` \| ``"application/lua"`` \| ``"application/wasm-uint8"`` ; `template`: { `data?`: `any` ; `prerender?`: `boolean`  } ; `types`: [`Types`](../interfaces/modules.models.Types.md)  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `language` | [`Language`](modules.models.md#language) |
| `config` | [`Config`](../interfaces/main.Config.md) |

#### Returns

`Partial`<{ `Binary`: `any` ; `C`: `any` ; `adoc`: `any` ; `as`: `any` ; `asc`: `any` ; `asciidoc`: `any` ; `assemblyscript`: `any` ; `astro`: `any` ; `autoprefixer`: `any` ; `babel`: `any` ; `blockly`: `any` ; `blockly.xml`: `any` ; `c`: `any` ; `c++`: `any` ; `clang`: `any` ; `clang.cpp`: `any` ; `clio`: `any` ; `coffee`: `any` ; `coffeescript`: `any` ; `common-lisp`: `any` ; `commonlisp`: `any` ; `cp`: `any` ; `cpp`: `any` ; `cppm`: `any` ; `csharp`: `any` ; `css`: `any` ; `cxx`: `any` ; `diagram`: `any` ; `dot`: `any` ; `ejs`: `any` ; `es`: `any` ; `go`: `any` ; `golang`: `any` ; `graph`: `any` ; `h`: `any` ; `haml`: `any` ; `handlebars`: `any` ; `hbs`: `any` ; `hpp`: `any` ; `htm`: `any` ; `html`: `any` ; `ii`: `any` ; `imba`: `any` ; `ixx`: `any` ; `jade`: `any` ; `javascript`: `any` ; `jl`: `any` ; `js`: `any` ; `json`: `any` ; `jsx`: `any` ; `julia`: `any` ; `less`: `any` ; `liquid`: `any` ; `liquidjs`: `any` ; `lisp`: `any` ; `livescript`: `any` ; `ls`: `any` ; `lua`: `any` ; `malina`: `any` ; `malinajs`: `any` ; `markdown`: `any` ; `md`: `any` ; `mdown`: `any` ; `mdx`: `any` ; `mkdn`: `any` ; `ml`: `any` ; `mli`: `any` ; `mustache`: `any` ; `njk`: `any` ; `nunjucks`: `any` ; `ocaml`: `any` ; `perl`: `any` ; `php`: `any` ; `pintora`: `any` ; `pl`: `any` ; `plt`: `any` ; `pm`: `any` ; `postcss`: `any` ; `postcssImportUrl`: `any` ; `postcssPresetEnv`: `any` ; `prolog`: `any` ; `prolog.pl`: `any` ; `pug`: `any` ; `py`: `any` ; `py3`: `any` ; `pyodide`: `any` ; `python`: `any` ; `rb`: `any` ; `re`: `any` ; `react-native`: `any` ; `react-native-tsx`: `any` ; `react-native.jsx`: `any` ; `react-native.tsx`: `any` ; `reason`: `any` ; `rei`: `any` ; `res`: `any` ; `rescript`: `any` ; `resi`: `any` ; `rich`: `any` ; `richtext`: `any` ; `riot`: `any` ; `riotjs`: `any` ; `rte`: `any` ; `rte.html`: `any` ; `ruby`: `any` ; `sass`: `any` ; `scheme`: `any` ; `scm`: `any` ; `scss`: `any` ; `solid`: `any` ; `solid.jsx`: `any` ; `solid.tsx`: `any` ; `sql`: `any` ; `sqlite`: `any` ; `sqlite3`: `any` ; `stencil`: `any` ; `stencil.tsx`: `any` ; `styl`: `any` ; `stylus`: `any` ; `svelte`: `any` ; `tailwindcss`: `any` ; `tcl`: `any` ; `ts`: `any` ; `tsx`: `any` ; `twig`: `any` ; `typescript`: `any` ; `vue`: `any` ; `vue2`: `any` ; `vue3`: `any` ; `wasm`: `any` ; `wast`: `any` ; `wat`: `any` ; `webassembly`: `any` ; `windicss`: `any` ; `xht`: `any` ; `xml`: `any`  } & { `convertCommonjs`: `boolean` ; `head`: `string` ; `htmlClasses`: `string` ; `imports`: `Record`<`string`, `string`\> ; `mapImports`: `boolean` ; `scriptType`: `undefined` \| ``""`` \| ``"module"`` \| ``"application/javascript"`` \| ``"application/ecmascript"`` \| ``"text/javascript"`` \| ``"text/ecmascript"`` \| ``"text/liquid"`` \| ``"text/python"`` \| ``"text/x-uniter-php"`` \| ``"text/cpp"`` \| ``"text/perl"`` \| ``"text/julia"`` \| ``"text/biwascheme"`` \| ``"text/commonlisp"`` \| ``"text/tcl"`` \| ``"text/prolog"`` \| ``"application/json"`` \| ``"application/lua"`` \| ``"application/wasm-uint8"`` ; `template`: { `data?`: `any` ; `prerender?`: `boolean`  } ; `types`: [`Types`](../interfaces/modules.models.Types.md)  }\>

#### Defined in

[src/livecodes/languages/utils.ts:91](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/languages/utils.ts#L91)

___

### getEnabledProcessors

▸ **getEnabledProcessors**(`language`, `config`): `string`

returns a string with names of enabled processors/postcss plugins
for the supplied language (separated by hyphens)

#### Parameters

| Name | Type |
| :------ | :------ |
| `language` | [`Language`](modules.models.md#language) |
| `config` | [`Config`](../interfaces/main.Config.md) |

#### Returns

`string`

#### Defined in

[src/livecodes/languages/utils.ts:66](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/languages/utils.ts#L66)

___

### getLanguageByAlias

▸ **getLanguageByAlias**(`alias?`): `undefined` \| [`Language`](modules.models.md#language)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `alias` | `string` | `''` |

#### Returns

`undefined` \| [`Language`](modules.models.md#language)

#### Defined in

[src/livecodes/languages/utils.ts:7](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/languages/utils.ts#L7)

___

### getLanguageCompiler

▸ **getLanguageCompiler**(`alias?`): `undefined` \| [`Compiler`](../interfaces/modules.models.Compiler.md)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `alias` | `string` | `''` |

#### Returns

`undefined` \| [`Compiler`](../interfaces/modules.models.Compiler.md)

#### Defined in

[src/livecodes/languages/utils.ts:32](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/languages/utils.ts#L32)

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

### getLanguageEditorId

▸ **getLanguageEditorId**(`alias?`): `undefined` \| [`EditorId`](modules.models.md#editorid)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `alias` | `string` | `''` |

#### Returns

`undefined` \| [`EditorId`](modules.models.md#editorid)

#### Defined in

[src/livecodes/languages/utils.ts:23](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/languages/utils.ts#L23)

___

### getLanguageExtension

▸ **getLanguageExtension**(`alias?`): `undefined` \| [`Language`](modules.models.md#language)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `alias` | `string` | `''` |

#### Returns

`undefined` \| [`Language`](modules.models.md#language)

#### Defined in

[src/livecodes/languages/utils.ts:26](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/languages/utils.ts#L26)

___

### getLanguageSpecs

▸ **getLanguageSpecs**(`alias?`): `undefined` \| [`LanguageSpecs`](../interfaces/modules.models.LanguageSpecs.md)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `alias` | `string` | `''` |

#### Returns

`undefined` \| [`LanguageSpecs`](../interfaces/modules.models.LanguageSpecs.md)

#### Defined in

[src/livecodes/languages/utils.ts:29](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/languages/utils.ts#L29)

___

### getLanguageTitle

▸ **getLanguageTitle**(`language`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `language` | [`Language`](modules.models.md#language) |

#### Returns

`string`

#### Defined in

[src/livecodes/languages/utils.ts:18](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/languages/utils.ts#L18)

___

### languageIsEnabled

▸ **languageIsEnabled**(`language`, `config`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `language` | [`Language`](modules.models.md#language) |
| `config` | [`Config`](../interfaces/main.Config.md) |

#### Returns

`boolean`

#### Defined in

[src/livecodes/languages/utils.ts:44](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/languages/utils.ts#L44)

___

### mapLanguage

▸ **mapLanguage**(`language`): [`Language`](modules.models.md#language)

#### Parameters

| Name | Type |
| :------ | :------ |
| `language` | [`Language`](modules.models.md#language) |

#### Returns

[`Language`](modules.models.md#language)

#### Defined in

[src/livecodes/languages/utils.ts:41](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/languages/utils.ts#L41)

___

### processorIsActivated

▸ **processorIsActivated**(`processorName`, `config`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `processorName` | [`Language`](modules.models.md#language) |
| `config` | [`Config`](../interfaces/main.Config.md) |

#### Returns

`boolean`

#### Defined in

[src/livecodes/languages/utils.ts:58](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/languages/utils.ts#L58)

___

### processorIsEnabled

▸ **processorIsEnabled**(`processorName`, `config`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `processorName` | [`Language`](modules.models.md#language) |
| `config` | [`Config`](../interfaces/main.Config.md) |

#### Returns

`boolean`

#### Defined in

[src/livecodes/languages/utils.ts:51](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/languages/utils.ts#L51)
