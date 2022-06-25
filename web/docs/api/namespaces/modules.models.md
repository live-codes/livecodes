---
id: "modules.models"
title: "Namespace: models"
sidebar_label: "models"
custom_edit_url: null
---

[_modules](../modules/modules.md).models

## Interfaces

- [AppConfig](../interfaces/modules.models.AppConfig.md)
- [Asset](../interfaces/modules.models.Asset.md)
- [BlocklyContent](../interfaces/modules.models.BlocklyContent.md)
- [Code](../interfaces/modules.models.Code.md)
- [CodeEditor](../interfaces/modules.models.CodeEditor.md)
- [CompileOptions](../interfaces/modules.models.CompileOptions.md)
- [CompiledCodeViewer](../interfaces/modules.models.CompiledCodeViewer.md)
- [Compiler](../interfaces/modules.models.Compiler.md)
- [Compilers](../interfaces/modules.models.Compilers.md)
- [Console](../interfaces/modules.models.Console.md)
- [ContentConfig](../interfaces/modules.models.ContentConfig.md)
- [CssPreset](../interfaces/modules.models.CssPreset.md)
- [CustomEditor](../interfaces/modules.models.CustomEditor.md)
- [CustomEditorOptions](../interfaces/modules.models.CustomEditorOptions.md)
- [Editor](../interfaces/modules.models.Editor.md)
- [EditorLanguages](../interfaces/modules.models.EditorLanguages.md)
- [EditorLibrary](../interfaces/modules.models.EditorLibrary.md)
- [EditorOptions](../interfaces/modules.models.EditorOptions.md)
- [Editors](../interfaces/modules.models.Editors.md)
- [EmbedOptions](../interfaces/modules.models.EmbedOptions.md)
- [EventsManager](../interfaces/modules.models.EventsManager.md)
- [LanguageFormatter](../interfaces/modules.models.LanguageFormatter.md)
- [LanguageSpecs](../interfaces/modules.models.LanguageSpecs.md)
- [Parser](../interfaces/modules.models.Parser.md)
- [Playground](../interfaces/modules.models.Playground.md)
- [Processors](../interfaces/modules.models.Processors.md)
- [Screen](../interfaces/modules.models.Screen.md)
- [ShareData](../interfaces/modules.models.ShareData.md)
- [TestResult](../interfaces/modules.models.TestResult.md)
- [TestViewer](../interfaces/modules.models.TestViewer.md)
- [Tool](../interfaces/modules.models.Tool.md)
- [ToolsPane](../interfaces/modules.models.ToolsPane.md)
- [Types](../interfaces/modules.models.Types.md)
- [User](../interfaces/modules.models.User.md)
- [UserConfig](../interfaces/modules.models.UserConfig.md)

## References

### API

Re-exports [API](../interfaces/main.API.md)

___

### Config

Re-exports [Config](../interfaces/main.Config.md)

## Type Aliases

### Await

Ƭ **Await**<`T`\>: `T` extends `PromiseLike`<infer U\> ? `U` : `T`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

[src/livecodes/models.ts:635](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L635)

___

### Cache

Ƭ **Cache**: [`ContentConfig`](../interfaces/modules.models.ContentConfig.md) & { `markup`: [`EditorCache`](modules.models.md#editorcache) ; `result?`: `string` ; `script`: [`EditorCache`](modules.models.md#editorcache) ; `style`: [`EditorCache`](modules.models.md#editorcache) ; `styleOnlyUpdate?`: `boolean` ; `tests?`: [`EditorCache`](modules.models.md#editorcache)  }

#### Defined in

[src/livecodes/models.ts:605](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L605)

___

### ChangeHandler

Ƭ **ChangeHandler**: (`{ code, config }`: { `code`: [`Code`](../interfaces/modules.models.Code.md) ; `config`: [`Config`](../interfaces/main.Config.md)  }) => `void`

#### Type declaration

▸ (`{ code, config }`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `{ code, config }` | `Object` |
| `{ code, config }.code` | [`Code`](../interfaces/modules.models.Code.md) |
| `{ code, config }.config` | [`Config`](../interfaces/main.Config.md) |

##### Returns

`void`

#### Defined in

[src/livecodes/models.ts:17](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L17)

___

### CompilerFunction

Ƭ **CompilerFunction**: (`code`: `string`, `{
    config,
    language,
    baseUrl,
    options,
    worker,
  }`: { `baseUrl`: `string` ; `config`: [`Config`](../interfaces/main.Config.md) ; `language`: [`Language`](modules.models.md#language) ; `options`: [`CompileOptions`](../interfaces/modules.models.CompileOptions.md) ; `worker?`: `Worker`  }) => `Promise`<`string`\>

#### Type declaration

▸ (`code`, `{
    config,
    language,
    baseUrl,
    options,
    worker,
  }`): `Promise`<`string`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `code` | `string` |
| `{
    config,
    language,
    baseUrl,
    options,
    worker,
  }` | `Object` |
| `{
    config,
    language,
    baseUrl,
    options,
    worker,
  }.baseUrl` | `string` |
| `{
    config,
    language,
    baseUrl,
    options,
    worker,
  }.config` | [`Config`](../interfaces/main.Config.md) |
| `{
    config,
    language,
    baseUrl,
    options,
    worker,
  }.language` | [`Language`](modules.models.md#language) |
| `{
    config,
    language,
    baseUrl,
    options,
    worker,
  }.options` | [`CompileOptions`](../interfaces/modules.models.CompileOptions.md) |
| `{
    config,
    language,
    baseUrl,
    options,
    worker,
  }.worker?` | `Worker` |

##### Returns

`Promise`<`string`\>

#### Defined in

[src/livecodes/models.ts:326](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L326)

___

### CssPresetId

Ƭ **CssPresetId**: ``""`` \| ``"normalize.css"`` \| ``"reset-css"`` \| ``"github-markdown-css"`` \| ``"asciidoctor.css"``

#### Defined in

[src/livecodes/models.ts:302](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L302)

___

### CustomEditors

Ƭ **CustomEditors**: { [key in Language]?: CustomEditor }

#### Defined in

[src/livecodes/models.ts:532](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L532)

___

### CustomSettings

Ƭ **CustomSettings**: `Partial`<{ [key in Language \| keyof Config["processors"]["postcss"]]: any } & { `convertCommonjs`: `boolean` ; `head`: `string` ; `htmlClasses`: `string` ; `imports`: `Record`<`string`, `string`\> ; `mapImports`: `boolean` ; `scriptType`: ``"module"`` \| ``"application/javascript"`` \| ``"application/ecmascript"`` \| ``"text/javascript"`` \| ``"text/ecmascript"`` \| ``""`` \| [`Compiler`](../interfaces/modules.models.Compiler.md)[``"scriptType"``] ; `template`: { `data?`: `any` ; `prerender?`: `boolean`  } ; `types`: [`Types`](../interfaces/modules.models.Types.md)  }\>

#### Defined in

[src/livecodes/models.ts:575](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L575)

___

### EditorCache

Ƭ **EditorCache**: [`Editor`](../interfaces/modules.models.Editor.md) & { `compiled`: `string` ; `modified?`: `string`  }

#### Defined in

[src/livecodes/models.ts:600](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L600)

___

### EditorId

Ƭ **EditorId**: ``"markup"`` \| ``"style"`` \| ``"script"``

#### Defined in

[src/livecodes/models.ts:227](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L227)

___

### FileType

Ƭ **FileType**: ``"image"`` \| ``"audio"`` \| ``"video"`` \| ``"archive"`` \| ``"html"`` \| ``"stylesheet"`` \| ``"script"`` \| ``"font"`` \| ``"icon"`` \| ``"json"`` \| ``"csv"`` \| ``"xml"`` \| ``"text"`` \| ``"other"``

#### Defined in

[src/livecodes/models.ts:637](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L637)

___

### FormatFn

Ƭ **FormatFn**: (`value`: `string`, `cursorOffset`: `number`) => `Promise`<{ `cursorOffset`: `number` ; `formatted`: `string`  }\>

#### Type declaration

▸ (`value`, `cursorOffset`): `Promise`<{ `cursorOffset`: `number` ; `formatted`: `string`  }\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |
| `cursorOffset` | `number` |

##### Returns

`Promise`<{ `cursorOffset`: `number` ; `formatted`: `string`  }\>

#### Defined in

[src/livecodes/models.ts:293](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L293)

___

### GithubScope

Ƭ **GithubScope**: ``"gist"`` \| ``"repo"`` \| ``"public_repo"``

#### Defined in

[src/livecodes/models.ts:550](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L550)

___

### Language

Ƭ **Language**: ``"html"`` \| ``"htm"`` \| ``"markdown"`` \| ``"md"`` \| ``"mdown"`` \| ``"mkdn"`` \| ``"mdx"`` \| ``"astro"`` \| ``"pug"`` \| ``"jade"`` \| ``"haml"`` \| ``"asciidoc"`` \| ``"adoc"`` \| ``"asc"`` \| ``"mustache"`` \| ``"handlebars"`` \| ``"hbs"`` \| ``"ejs"`` \| ``"nunjucks"`` \| ``"njk"`` \| ``"liquid"`` \| ``"liquidjs"`` \| ``"dot"`` \| ``"twig"`` \| ``"diagram"`` \| ``"graph"`` \| ``"plt"`` \| ``"richtext"`` \| ``"rte"`` \| ``"rich"`` \| ``"rte.html"`` \| ``"css"`` \| ``"scss"`` \| ``"sass"`` \| ``"less"`` \| ``"stylus"`` \| ``"styl"`` \| ``"postcss"`` \| ``"javascript"`` \| ``"js"`` \| ``"json"`` \| ``"babel"`` \| ``"es"`` \| ``"typescript"`` \| ``"ts"`` \| ``"jsx"`` \| ``"tsx"`` \| ``"react-native"`` \| ``"react-native.jsx"`` \| ``"react-native-tsx"`` \| ``"react-native.tsx"`` \| ``"vue"`` \| ``"vue3"`` \| ``"vue2"`` \| ``"svelte"`` \| ``"stencil"`` \| ``"stencil.tsx"`` \| ``"solid"`` \| ``"solid.jsx"`` \| ``"solid.tsx"`` \| ``"riot"`` \| ``"riotjs"`` \| ``"malina"`` \| ``"malinajs"`` \| ``"xht"`` \| ``"coffeescript"`` \| ``"coffee"`` \| ``"livescript"`` \| ``"ls"`` \| ``"clio"`` \| ``"imba"`` \| ``"assemblyscript"`` \| ``"as"`` \| ``"python"`` \| ``"py"`` \| ``"pyodide"`` \| ``"py3"`` \| ``"ruby"`` \| ``"rb"`` \| ``"go"`` \| ``"golang"`` \| ``"php"`` \| ``"cpp"`` \| ``"c"`` \| ``"C"`` \| ``"cp"`` \| ``"cxx"`` \| ``"c++"`` \| ``"cppm"`` \| ``"ixx"`` \| ``"ii"`` \| ``"hpp"`` \| ``"h"`` \| ``"clang"`` \| ``"clang.cpp"`` \| ``"perl"`` \| ``"pl"`` \| ``"pm"`` \| ``"lua"`` \| ``"julia"`` \| ``"jl"`` \| ``"scheme"`` \| ``"scm"`` \| ``"commonlisp"`` \| ``"common-lisp"`` \| ``"lisp"`` \| ``"rescript"`` \| ``"res"`` \| ``"resi"`` \| ``"reason"`` \| ``"re"`` \| ``"rei"`` \| ``"ocaml"`` \| ``"ml"`` \| ``"mli"`` \| ``"tcl"`` \| ``"wat"`` \| ``"wast"`` \| ``"webassembly"`` \| ``"wasm"`` \| ``"Binary"`` \| ``"csharp"`` \| ``"sql"`` \| ``"sqlite"`` \| ``"sqlite3"`` \| ``"prolog.pl"`` \| ``"prolog"`` \| ``"blockly"`` \| ``"blockly.xml"`` \| ``"xml"`` \| ``"pintora"``

#### Defined in

[src/livecodes/models.ts:87](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L87)

___

### ParserName

Ƭ **ParserName**: ``"babel"`` \| ``"babel-ts"`` \| ``"glimmer"`` \| ``"html"`` \| ``"markdown"`` \| ``"css"`` \| ``"scss"`` \| ``"less"`` \| ``"php"`` \| ``"pug"``

#### Defined in

[src/livecodes/models.ts:276](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L276)

___

### ProcessorName

Ƭ **ProcessorName**: ``"postcss"``

#### Defined in

[src/livecodes/models.ts:274](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L274)

___

### Template

Ƭ **Template**: `Pick`<[`Config`](../interfaces/main.Config.md), ``"title"`` \| ``"activeEditor"`` \| ``"markup"`` \| ``"style"`` \| ``"script"`` \| ``"stylesheets"`` \| ``"scripts"`` \| ``"cssPreset"`` \| ``"imports"`` \| ``"types"``\> & `Partial`<`Pick`<[`Config`](../interfaces/main.Config.md), ``"processors"`` \| ``"customSettings"`` \| ``"tests"``\>\> & { `name`: `string` ; `thumbnail`: `string`  }

#### Defined in

[src/livecodes/models.ts:384](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L384)

___

### Theme

Ƭ **Theme**: ``"light"`` \| ``"dark"``

#### Defined in

[src/livecodes/models.ts:633](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L633)

___

### ToolList

Ƭ **ToolList**: { `name`: [`Tool`](../interfaces/modules.models.Tool.md)[``"name"``] ; `factory`: (`config`: [`Config`](../interfaces/main.Config.md), `baseUrl`: `string`, `editors`: [`Editors`](../interfaces/modules.models.Editors.md), `eventsManager`: [`EventsManager`](../interfaces/modules.models.EventsManager.md), `isEmbed`: `boolean`, `runTests`: () => `Promise`<`void`\>) => [`Tool`](../interfaces/modules.models.Tool.md)  }[]

#### Defined in

[src/livecodes/models.ts:413](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L413)

___

### ToolsPaneStatus

Ƭ **ToolsPaneStatus**: ``"closed"`` \| ``"open"`` \| ``"full"`` \| ``"none"`` \| ``""``

#### Defined in

[src/livecodes/models.ts:411](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L411)
