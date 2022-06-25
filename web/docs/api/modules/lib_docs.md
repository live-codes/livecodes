---
id: "lib_docs"
title: "Module: lib/docs"
sidebar_label: "lib/docs"
sidebar_position: 0
custom_edit_url: null
---

## Interfaces

- [AppConfig](../interfaces/lib_docs.AppConfig.md)
- [Code](../interfaces/lib_docs.Code.md)
- [Config](../interfaces/lib_docs.Config.md)
- [ContentConfig](../interfaces/lib_docs.ContentConfig.md)
- [Editor](../interfaces/lib_docs.Editor.md)
- [EmbedOptions](../interfaces/lib_docs.EmbedOptions.md)
- [Playground](../interfaces/lib_docs.Playground.md)
- [TestResult](../interfaces/lib_docs.TestResult.md)
- [Types](../interfaces/lib_docs.Types.md)
- [UserConfig](../interfaces/lib_docs.UserConfig.md)

## Type Aliases

### ChangeHandler

Ƭ **ChangeHandler**: (`{ code, config }`: { `code`: [`Code`](../interfaces/lib_docs.Code.md) ; `config`: [`Config`](../interfaces/lib_docs.Config.md)  }) => `void`

#### Type declaration

▸ (`{ code, config }`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `{ code, config }` | `Object` |
| `{ code, config }.code` | [`Code`](../interfaces/lib_docs.Code.md) |
| `{ code, config }.config` | [`Config`](../interfaces/lib_docs.Config.md) |

##### Returns

`void`

#### Defined in

[lib/models.ts:17](https://github.com/live-codes/livecodes/blob/0b19ad3/src/lib/models.ts#L17)

___

### CssPresetId

Ƭ **CssPresetId**: ``""`` \| ``"normalize.css"`` \| ``"reset-css"`` \| ``"github-markdown-css"`` \| ``"asciidoctor.css"``

#### Defined in

[lib/models.ts:302](https://github.com/live-codes/livecodes/blob/0b19ad3/src/lib/models.ts#L302)

___

### EditorId

Ƭ **EditorId**: ``"markup"`` \| ``"style"`` \| ``"script"``

#### Defined in

[lib/models.ts:227](https://github.com/live-codes/livecodes/blob/0b19ad3/src/lib/models.ts#L227)

___

### Language

Ƭ **Language**: ``"html"`` \| ``"htm"`` \| ``"markdown"`` \| ``"md"`` \| ``"mdown"`` \| ``"mkdn"`` \| ``"mdx"`` \| ``"astro"`` \| ``"pug"`` \| ``"jade"`` \| ``"haml"`` \| ``"asciidoc"`` \| ``"adoc"`` \| ``"asc"`` \| ``"mustache"`` \| ``"handlebars"`` \| ``"hbs"`` \| ``"ejs"`` \| ``"nunjucks"`` \| ``"njk"`` \| ``"liquid"`` \| ``"liquidjs"`` \| ``"dot"`` \| ``"twig"`` \| ``"diagram"`` \| ``"graph"`` \| ``"plt"`` \| ``"richtext"`` \| ``"rte"`` \| ``"rich"`` \| ``"rte.html"`` \| ``"css"`` \| ``"scss"`` \| ``"sass"`` \| ``"less"`` \| ``"stylus"`` \| ``"styl"`` \| ``"postcss"`` \| ``"javascript"`` \| ``"js"`` \| ``"json"`` \| ``"babel"`` \| ``"es"`` \| ``"typescript"`` \| ``"ts"`` \| ``"jsx"`` \| ``"tsx"`` \| ``"react-native"`` \| ``"react-native.jsx"`` \| ``"react-native-tsx"`` \| ``"react-native.tsx"`` \| ``"vue"`` \| ``"vue3"`` \| ``"vue2"`` \| ``"svelte"`` \| ``"stencil"`` \| ``"stencil.tsx"`` \| ``"solid"`` \| ``"solid.jsx"`` \| ``"solid.tsx"`` \| ``"riot"`` \| ``"riotjs"`` \| ``"malina"`` \| ``"malinajs"`` \| ``"xht"`` \| ``"coffeescript"`` \| ``"coffee"`` \| ``"livescript"`` \| ``"ls"`` \| ``"clio"`` \| ``"imba"`` \| ``"assemblyscript"`` \| ``"as"`` \| ``"python"`` \| ``"py"`` \| ``"pyodide"`` \| ``"py3"`` \| ``"ruby"`` \| ``"rb"`` \| ``"go"`` \| ``"golang"`` \| ``"php"`` \| ``"cpp"`` \| ``"c"`` \| ``"C"`` \| ``"cp"`` \| ``"cxx"`` \| ``"c++"`` \| ``"cppm"`` \| ``"ixx"`` \| ``"ii"`` \| ``"hpp"`` \| ``"h"`` \| ``"clang"`` \| ``"clang.cpp"`` \| ``"perl"`` \| ``"pl"`` \| ``"pm"`` \| ``"lua"`` \| ``"julia"`` \| ``"jl"`` \| ``"scheme"`` \| ``"scm"`` \| ``"commonlisp"`` \| ``"common-lisp"`` \| ``"lisp"`` \| ``"rescript"`` \| ``"res"`` \| ``"resi"`` \| ``"reason"`` \| ``"re"`` \| ``"rei"`` \| ``"ocaml"`` \| ``"ml"`` \| ``"mli"`` \| ``"tcl"`` \| ``"wat"`` \| ``"wast"`` \| ``"webassembly"`` \| ``"wasm"`` \| ``"Binary"`` \| ``"csharp"`` \| ``"sql"`` \| ``"sqlite"`` \| ``"sqlite3"`` \| ``"prolog.pl"`` \| ``"prolog"`` \| ``"blockly"`` \| ``"blockly.xml"`` \| ``"xml"`` \| ``"pintora"``

#### Defined in

[lib/models.ts:87](https://github.com/live-codes/livecodes/blob/0b19ad3/src/lib/models.ts#L87)

___

### Theme

Ƭ **Theme**: ``"light"`` \| ``"dark"``

#### Defined in

[lib/models.ts:633](https://github.com/live-codes/livecodes/blob/0b19ad3/src/lib/models.ts#L633)

___

### ToolsPaneStatus

Ƭ **ToolsPaneStatus**: ``"closed"`` \| ``"open"`` \| ``"full"`` \| ``"none"`` \| ``""``

#### Defined in

[lib/models.ts:411](https://github.com/live-codes/livecodes/blob/0b19ad3/src/lib/models.ts#L411)

## Functions

### createPlayground

▸ **createPlayground**(`container`, `options?`): `Promise`<[`Playground`](../interfaces/lib_docs.Playground.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `container` | `string` \| `Element` |
| `options` | [`EmbedOptions`](../interfaces/lib_docs.EmbedOptions.md) |

#### Returns

`Promise`<[`Playground`](../interfaces/lib_docs.Playground.md)\>

#### Defined in

[lib/livecodes.ts:5](https://github.com/live-codes/livecodes/blob/0b19ad3/src/lib/livecodes.ts#L5)
