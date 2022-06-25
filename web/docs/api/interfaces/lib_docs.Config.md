---
id: "lib_docs.Config"
title: "Interface: Config"
sidebar_label: "Config"
custom_edit_url: null
---

[lib/docs](../modules/lib_docs.md).Config

## Hierarchy

- [`ContentConfig`](lib_docs.ContentConfig.md)

- [`AppConfig`](lib_docs.AppConfig.md)

- [`UserConfig`](lib_docs.UserConfig.md)

  ↳ **`Config`**

## Properties

### activeEditor

• **activeEditor**: `undefined` \| [`EditorId`](../modules/lib_docs.md#editorid)

#### Inherited from

[ContentConfig](lib_docs.ContentConfig.md).[activeEditor](lib_docs.ContentConfig.md#activeeditor)

#### Defined in

[lib/models.ts:39](https://github.com/live-codes/livecodes/blob/0b19ad3/src/lib/models.ts#L39)

___

### allowLangChange

• **allowLangChange**: `boolean`

#### Inherited from

[AppConfig](lib_docs.AppConfig.md).[allowLangChange](lib_docs.AppConfig.md#allowlangchange)

#### Defined in

[lib/models.ts:65](https://github.com/live-codes/livecodes/blob/0b19ad3/src/lib/models.ts#L65)

___

### autosave

• **autosave**: `boolean`

#### Inherited from

[UserConfig](lib_docs.UserConfig.md).[autosave](lib_docs.UserConfig.md#autosave)

#### Defined in

[lib/models.ts:78](https://github.com/live-codes/livecodes/blob/0b19ad3/src/lib/models.ts#L78)

___

### autoupdate

• **autoupdate**: `boolean`

#### Inherited from

[UserConfig](lib_docs.UserConfig.md).[autoupdate](lib_docs.UserConfig.md#autoupdate)

#### Defined in

[lib/models.ts:77](https://github.com/live-codes/livecodes/blob/0b19ad3/src/lib/models.ts#L77)

___

### cssPreset

• **cssPreset**: [`CssPresetId`](../modules/lib_docs.md#csspresetid)

#### Inherited from

[ContentConfig](lib_docs.ContentConfig.md).[cssPreset](lib_docs.ContentConfig.md#csspreset)

#### Defined in

[lib/models.ts:46](https://github.com/live-codes/livecodes/blob/0b19ad3/src/lib/models.ts#L46)

___

### customSettings

• **customSettings**: `Partial`<{ `Binary`: `any` ; `C`: `any` ; `adoc`: `any` ; `as`: `any` ; `asc`: `any` ; `asciidoc`: `any` ; `assemblyscript`: `any` ; `astro`: `any` ; `autoprefixer`: `any` ; `babel`: `any` ; `blockly`: `any` ; `blockly.xml`: `any` ; `c`: `any` ; `c++`: `any` ; `clang`: `any` ; `clang.cpp`: `any` ; `clio`: `any` ; `coffee`: `any` ; `coffeescript`: `any` ; `common-lisp`: `any` ; `commonlisp`: `any` ; `cp`: `any` ; `cpp`: `any` ; `cppm`: `any` ; `csharp`: `any` ; `css`: `any` ; `cxx`: `any` ; `diagram`: `any` ; `dot`: `any` ; `ejs`: `any` ; `es`: `any` ; `go`: `any` ; `golang`: `any` ; `graph`: `any` ; `h`: `any` ; `haml`: `any` ; `handlebars`: `any` ; `hbs`: `any` ; `hpp`: `any` ; `htm`: `any` ; `html`: `any` ; `ii`: `any` ; `imba`: `any` ; `ixx`: `any` ; `jade`: `any` ; `javascript`: `any` ; `jl`: `any` ; `js`: `any` ; `json`: `any` ; `jsx`: `any` ; `julia`: `any` ; `less`: `any` ; `liquid`: `any` ; `liquidjs`: `any` ; `lisp`: `any` ; `livescript`: `any` ; `ls`: `any` ; `lua`: `any` ; `malina`: `any` ; `malinajs`: `any` ; `markdown`: `any` ; `md`: `any` ; `mdown`: `any` ; `mdx`: `any` ; `mkdn`: `any` ; `ml`: `any` ; `mli`: `any` ; `mustache`: `any` ; `njk`: `any` ; `nunjucks`: `any` ; `ocaml`: `any` ; `perl`: `any` ; `php`: `any` ; `pintora`: `any` ; `pl`: `any` ; `plt`: `any` ; `pm`: `any` ; `postcss`: `any` ; `postcssImportUrl`: `any` ; `postcssPresetEnv`: `any` ; `prolog`: `any` ; `prolog.pl`: `any` ; `pug`: `any` ; `py`: `any` ; `py3`: `any` ; `pyodide`: `any` ; `python`: `any` ; `rb`: `any` ; `re`: `any` ; `react-native`: `any` ; `react-native-tsx`: `any` ; `react-native.jsx`: `any` ; `react-native.tsx`: `any` ; `reason`: `any` ; `rei`: `any` ; `res`: `any` ; `rescript`: `any` ; `resi`: `any` ; `rich`: `any` ; `richtext`: `any` ; `riot`: `any` ; `riotjs`: `any` ; `rte`: `any` ; `rte.html`: `any` ; `ruby`: `any` ; `sass`: `any` ; `scheme`: `any` ; `scm`: `any` ; `scss`: `any` ; `solid`: `any` ; `solid.jsx`: `any` ; `solid.tsx`: `any` ; `sql`: `any` ; `sqlite`: `any` ; `sqlite3`: `any` ; `stencil`: `any` ; `stencil.tsx`: `any` ; `styl`: `any` ; `stylus`: `any` ; `svelte`: `any` ; `tailwindcss`: `any` ; `tcl`: `any` ; `ts`: `any` ; `tsx`: `any` ; `twig`: `any` ; `typescript`: `any` ; `vue`: `any` ; `vue2`: `any` ; `vue3`: `any` ; `wasm`: `any` ; `wast`: `any` ; `wat`: `any` ; `webassembly`: `any` ; `windicss`: `any` ; `xht`: `any` ; `xml`: `any`  } & { `convertCommonjs`: `boolean` ; `head`: `string` ; `htmlClasses`: `string` ; `imports`: `Record`<`string`, `string`\> ; `mapImports`: `boolean` ; `scriptType`: `undefined` \| ``""`` \| ``"module"`` \| ``"application/javascript"`` \| ``"application/ecmascript"`` \| ``"text/javascript"`` \| ``"text/ecmascript"`` \| ``"text/liquid"`` \| ``"text/python"`` \| ``"text/x-uniter-php"`` \| ``"text/cpp"`` \| ``"text/perl"`` \| ``"text/julia"`` \| ``"text/biwascheme"`` \| ``"text/commonlisp"`` \| ``"text/tcl"`` \| ``"text/prolog"`` \| ``"application/json"`` \| ``"application/lua"`` \| ``"application/wasm-uint8"`` ; `template`: { `data?`: `any` ; `prerender?`: `boolean`  } ; `types`: [`Types`](lib_docs.Types.md)  }\>

#### Inherited from

[ContentConfig](lib_docs.ContentConfig.md).[customSettings](lib_docs.ContentConfig.md#customsettings)

#### Defined in

[lib/models.ts:56](https://github.com/live-codes/livecodes/blob/0b19ad3/src/lib/models.ts#L56)

___

### delay

• **delay**: `number`

#### Inherited from

[UserConfig](lib_docs.UserConfig.md).[delay](lib_docs.UserConfig.md#delay)

#### Defined in

[lib/models.ts:79](https://github.com/live-codes/livecodes/blob/0b19ad3/src/lib/models.ts#L79)

___

### description

• **description**: `string`

#### Inherited from

[ContentConfig](lib_docs.ContentConfig.md).[description](lib_docs.ContentConfig.md#description)

#### Defined in

[lib/models.ts:37](https://github.com/live-codes/livecodes/blob/0b19ad3/src/lib/models.ts#L37)

___

### editor

• **editor**: ``""`` \| ``"monaco"`` \| ``"codemirror"`` \| ``"codejar"``

#### Inherited from

[AppConfig](lib_docs.AppConfig.md).[editor](lib_docs.AppConfig.md#editor)

#### Defined in

[lib/models.ts:67](https://github.com/live-codes/livecodes/blob/0b19ad3/src/lib/models.ts#L67)

___

### emmet

• **emmet**: `boolean`

#### Inherited from

[UserConfig](lib_docs.UserConfig.md).[emmet](lib_docs.UserConfig.md#emmet)

#### Defined in

[lib/models.ts:81](https://github.com/live-codes/livecodes/blob/0b19ad3/src/lib/models.ts#L81)

___

### enableRestore

• **enableRestore**: `boolean`

#### Inherited from

[UserConfig](lib_docs.UserConfig.md).[enableRestore](lib_docs.UserConfig.md#enablerestore)

#### Defined in

[lib/models.ts:83](https://github.com/live-codes/livecodes/blob/0b19ad3/src/lib/models.ts#L83)

___

### formatOnsave

• **formatOnsave**: `boolean`

#### Inherited from

[UserConfig](lib_docs.UserConfig.md).[formatOnsave](lib_docs.UserConfig.md#formatonsave)

#### Defined in

[lib/models.ts:80](https://github.com/live-codes/livecodes/blob/0b19ad3/src/lib/models.ts#L80)

___

### imports

• **imports**: `Object`

#### Index signature

▪ [key: `string`]: `string`

#### Inherited from

[ContentConfig](lib_docs.ContentConfig.md).[imports](lib_docs.ContentConfig.md#imports)

#### Defined in

[lib/models.ts:57](https://github.com/live-codes/livecodes/blob/0b19ad3/src/lib/models.ts#L57)

___

### languages

• **languages**: `undefined` \| [`Language`](../modules/lib_docs.md#language)[]

#### Inherited from

[ContentConfig](lib_docs.ContentConfig.md).[languages](lib_docs.ContentConfig.md#languages)

#### Defined in

[lib/models.ts:40](https://github.com/live-codes/livecodes/blob/0b19ad3/src/lib/models.ts#L40)

___

### markup

• **markup**: [`Editor`](lib_docs.Editor.md)

#### Inherited from

[ContentConfig](lib_docs.ContentConfig.md).[markup](lib_docs.ContentConfig.md#markup)

#### Defined in

[lib/models.ts:41](https://github.com/live-codes/livecodes/blob/0b19ad3/src/lib/models.ts#L41)

___

### mode

• **mode**: ``"editor"`` \| ``"result"`` \| ``"full"`` \| ``"codeblock"``

#### Inherited from

[AppConfig](lib_docs.AppConfig.md).[mode](lib_docs.AppConfig.md#mode)

#### Defined in

[lib/models.ts:66](https://github.com/live-codes/livecodes/blob/0b19ad3/src/lib/models.ts#L66)

___

### processors

• **processors**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `postcss` | { `autoprefixer`: `boolean` ; `postcssImportUrl?`: `boolean` ; `postcssPresetEnv`: `boolean` ; `tailwindcss`: `boolean` ; `windicss`: `boolean`  } |
| `postcss.autoprefixer` | `boolean` |
| `postcss.postcssImportUrl?` | `boolean` |
| `postcss.postcssPresetEnv` | `boolean` |
| `postcss.tailwindcss` | `boolean` |
| `postcss.windicss` | `boolean` |

#### Inherited from

[ContentConfig](lib_docs.ContentConfig.md).[processors](lib_docs.ContentConfig.md#processors)

#### Defined in

[lib/models.ts:47](https://github.com/live-codes/livecodes/blob/0b19ad3/src/lib/models.ts#L47)

___

### readonly

• **readonly**: `boolean`

#### Inherited from

[AppConfig](lib_docs.AppConfig.md).[readonly](lib_docs.AppConfig.md#readonly)

#### Defined in

[lib/models.ts:64](https://github.com/live-codes/livecodes/blob/0b19ad3/src/lib/models.ts#L64)

___

### script

• **script**: [`Editor`](lib_docs.Editor.md)

#### Inherited from

[ContentConfig](lib_docs.ContentConfig.md).[script](lib_docs.ContentConfig.md#script)

#### Defined in

[lib/models.ts:43](https://github.com/live-codes/livecodes/blob/0b19ad3/src/lib/models.ts#L43)

___

### scripts

• **scripts**: `string`[]

#### Inherited from

[ContentConfig](lib_docs.ContentConfig.md).[scripts](lib_docs.ContentConfig.md#scripts)

#### Defined in

[lib/models.ts:45](https://github.com/live-codes/livecodes/blob/0b19ad3/src/lib/models.ts#L45)

___

### showSpacing

• **showSpacing**: `boolean`

#### Inherited from

[UserConfig](lib_docs.UserConfig.md).[showSpacing](lib_docs.UserConfig.md#showspacing)

#### Defined in

[lib/models.ts:84](https://github.com/live-codes/livecodes/blob/0b19ad3/src/lib/models.ts#L84)

___

### showVersion

• **showVersion**: `boolean`

#### Inherited from

[AppConfig](lib_docs.AppConfig.md).[showVersion](lib_docs.AppConfig.md#showversion)

#### Defined in

[lib/models.ts:68](https://github.com/live-codes/livecodes/blob/0b19ad3/src/lib/models.ts#L68)

___

### style

• **style**: [`Editor`](lib_docs.Editor.md)

#### Inherited from

[ContentConfig](lib_docs.ContentConfig.md).[style](lib_docs.ContentConfig.md#style)

#### Defined in

[lib/models.ts:42](https://github.com/live-codes/livecodes/blob/0b19ad3/src/lib/models.ts#L42)

___

### stylesheets

• **stylesheets**: `string`[]

#### Inherited from

[ContentConfig](lib_docs.ContentConfig.md).[stylesheets](lib_docs.ContentConfig.md#stylesheets)

#### Defined in

[lib/models.ts:44](https://github.com/live-codes/livecodes/blob/0b19ad3/src/lib/models.ts#L44)

___

### tags

• **tags**: `string`[]

#### Inherited from

[ContentConfig](lib_docs.ContentConfig.md).[tags](lib_docs.ContentConfig.md#tags)

#### Defined in

[lib/models.ts:38](https://github.com/live-codes/livecodes/blob/0b19ad3/src/lib/models.ts#L38)

___

### tests

• **tests**: `undefined` \| `Partial`<[`Editor`](lib_docs.Editor.md)\>

#### Inherited from

[ContentConfig](lib_docs.ContentConfig.md).[tests](lib_docs.ContentConfig.md#tests)

#### Defined in

[lib/models.ts:59](https://github.com/live-codes/livecodes/blob/0b19ad3/src/lib/models.ts#L59)

___

### theme

• **theme**: [`Theme`](../modules/lib_docs.md#theme)

#### Inherited from

[UserConfig](lib_docs.UserConfig.md).[theme](lib_docs.UserConfig.md#theme)

#### Defined in

[lib/models.ts:82](https://github.com/live-codes/livecodes/blob/0b19ad3/src/lib/models.ts#L82)

___

### title

• **title**: `string`

#### Inherited from

[ContentConfig](lib_docs.ContentConfig.md).[title](lib_docs.ContentConfig.md#title)

#### Defined in

[lib/models.ts:36](https://github.com/live-codes/livecodes/blob/0b19ad3/src/lib/models.ts#L36)

___

### tools

• **tools**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `active` | ``""`` \| ``"tests"`` \| ``"console"`` \| ``"compiled"`` |
| `enabled` | (``"tests"`` \| ``"console"`` \| ``"compiled"``)[] \| ``"all"`` |
| `status` | [`ToolsPaneStatus`](../modules/lib_docs.md#toolspanestatus) |

#### Inherited from

[AppConfig](lib_docs.AppConfig.md).[tools](lib_docs.AppConfig.md#tools)

#### Defined in

[lib/models.ts:69](https://github.com/live-codes/livecodes/blob/0b19ad3/src/lib/models.ts#L69)

___

### types

• **types**: [`Types`](lib_docs.Types.md)

#### Inherited from

[ContentConfig](lib_docs.ContentConfig.md).[types](lib_docs.ContentConfig.md#types)

#### Defined in

[lib/models.ts:58](https://github.com/live-codes/livecodes/blob/0b19ad3/src/lib/models.ts#L58)

___

### version

• `Readonly` **version**: `string`

#### Inherited from

[ContentConfig](lib_docs.ContentConfig.md).[version](lib_docs.ContentConfig.md#version)

#### Defined in

[lib/models.ts:60](https://github.com/live-codes/livecodes/blob/0b19ad3/src/lib/models.ts#L60)
