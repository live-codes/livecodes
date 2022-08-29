---
id: "modules"
title: "livecodes"
sidebar_label: "Exports"
sidebar_position: 0.5
custom_edit_url: null
---

## Interfaces

- [AppConfig](interfaces/AppConfig.md)
- [Code](interfaces/Code.md)
- [Config](interfaces/Config.md)
- [ContentConfig](interfaces/ContentConfig.md)
- [Editor](interfaces/Editor.md)
- [EmbedOptions](interfaces/EmbedOptions.md)
- [Playground](interfaces/Playground.md)
- [TestResult](interfaces/TestResult.md)
- [Types](interfaces/Types.md)
- [UserConfig](interfaces/UserConfig.md)

## Type Aliases

### ChangeHandler

Ƭ **ChangeHandler**: (`{ code, config }`: { `code`: [`Code`](interfaces/Code.md) ; `config`: [`Config`](interfaces/Config.md)  }) => `void`

#### Type declaration

▸ (`{ code, config }`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `{ code, config }` | `Object` |
| `{ code, config }.code` | [`Code`](interfaces/Code.md) |
| `{ code, config }.config` | [`Config`](interfaces/Config.md) |

##### Returns

`void`

#### Defined in

[models.ts:18](https://github.com/live-codes/livecodes/blob/3e2b51e/src/lib/models.ts#L18)

___

### CssPresetId

Ƭ **CssPresetId**: ``""`` \| ``"normalize.css"`` \| ``"reset-css"`` \| ``"github-markdown-css"`` \| ``"asciidoctor.css"``

#### Defined in

[models.ts:339](https://github.com/live-codes/livecodes/blob/3e2b51e/src/lib/models.ts#L339)

___

### EditorId

Ƭ **EditorId**: ``"markup"`` \| ``"style"`` \| ``"script"``

#### Defined in

[models.ts:264](https://github.com/live-codes/livecodes/blob/3e2b51e/src/lib/models.ts#L264)

___

### Language

Ƭ **Language**: ``"html"`` \| ``"htm"`` \| ``"markdown"`` \| ``"md"`` \| ``"mdown"`` \| ``"mkdn"`` \| ``"mdx"`` \| ``"astro"`` \| ``"pug"`` \| ``"jade"`` \| ``"haml"`` \| ``"asciidoc"`` \| ``"adoc"`` \| ``"asc"`` \| ``"mustache"`` \| ``"handlebars"`` \| ``"hbs"`` \| ``"ejs"`` \| ``"nunjucks"`` \| ``"njk"`` \| ``"liquid"`` \| ``"liquidjs"`` \| ``"dot"`` \| ``"twig"`` \| ``"art-template"`` \| ``"art"`` \| ``"diagrams"`` \| ``"diagram"`` \| ``"graph"`` \| ``"plt"`` \| ``"richtext"`` \| ``"rte"`` \| ``"rich"`` \| ``"rte.html"`` \| ``"css"`` \| ``"scss"`` \| ``"sass"`` \| ``"less"`` \| ``"stylus"`` \| ``"styl"`` \| ``"postcss"`` \| ``"javascript"`` \| ``"js"`` \| ``"json"`` \| ``"babel"`` \| ``"es"`` \| ``"typescript"`` \| ``"ts"`` \| ``"jsx"`` \| ``"tsx"`` \| ``"react-native"`` \| ``"react-native.jsx"`` \| ``"react-native-tsx"`` \| ``"react-native.tsx"`` \| ``"vue"`` \| ``"vue3"`` \| ``"vue2"`` \| ``"svelte"`` \| ``"stencil"`` \| ``"stencil.tsx"`` \| ``"solid"`` \| ``"solid.jsx"`` \| ``"solid.tsx"`` \| ``"riot"`` \| ``"riotjs"`` \| ``"malina"`` \| ``"malinajs"`` \| ``"xht"`` \| ``"coffeescript"`` \| ``"coffee"`` \| ``"livescript"`` \| ``"ls"`` \| ``"clio"`` \| ``"imba"`` \| ``"assemblyscript"`` \| ``"as"`` \| ``"python"`` \| ``"py"`` \| ``"pyodide"`` \| ``"py3"`` \| ``"ruby"`` \| ``"rb"`` \| ``"go"`` \| ``"golang"`` \| ``"php"`` \| ``"cpp"`` \| ``"c"`` \| ``"C"`` \| ``"cp"`` \| ``"cxx"`` \| ``"c++"`` \| ``"cppm"`` \| ``"ixx"`` \| ``"ii"`` \| ``"hpp"`` \| ``"h"`` \| ``"clang"`` \| ``"clang.cpp"`` \| ``"perl"`` \| ``"pl"`` \| ``"pm"`` \| ``"lua"`` \| ``"julia"`` \| ``"jl"`` \| ``"scheme"`` \| ``"scm"`` \| ``"commonlisp"`` \| ``"common-lisp"`` \| ``"lisp"`` \| ``"rescript"`` \| ``"res"`` \| ``"resi"`` \| ``"reason"`` \| ``"re"`` \| ``"rei"`` \| ``"ocaml"`` \| ``"ml"`` \| ``"mli"`` \| ``"tcl"`` \| ``"wat"`` \| ``"wast"`` \| ``"webassembly"`` \| ``"wasm"`` \| ``"Binary"`` \| ``"csharp"`` \| ``"sql"`` \| ``"sqlite"`` \| ``"sqlite3"`` \| ``"prolog.pl"`` \| ``"prolog"`` \| ``"blockly"`` \| ``"blockly.xml"`` \| ``"xml"`` \| ``"pintora"``

#### Defined in

[models.ts:115](https://github.com/live-codes/livecodes/blob/3e2b51e/src/lib/models.ts#L115)

___

### Theme

Ƭ **Theme**: ``"light"`` \| ``"dark"``

#### Defined in

[models.ts:684](https://github.com/live-codes/livecodes/blob/3e2b51e/src/lib/models.ts#L684)

___

### ToolsPaneStatus

Ƭ **ToolsPaneStatus**: ``"closed"`` \| ``"open"`` \| ``"full"`` \| ``"none"`` \| ``""``

#### Defined in

[models.ts:448](https://github.com/live-codes/livecodes/blob/3e2b51e/src/lib/models.ts#L448)

## Functions

### createPlayground

▸ **createPlayground**(`container`, `options?`): `Promise`<[`Playground`](interfaces/Playground.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `container` | `string` \| `Element` |
| `options` | [`EmbedOptions`](interfaces/EmbedOptions.md) |

#### Returns

`Promise`<[`Playground`](interfaces/Playground.md)\>

#### Defined in

[livecodes.ts:5](https://github.com/live-codes/livecodes/blob/3e2b51e/src/lib/livecodes.ts#L5)
