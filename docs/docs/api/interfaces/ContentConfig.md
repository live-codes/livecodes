---
id: "ContentConfig"
title: "Interface: ContentConfig"
sidebar_label: "ContentConfig"
sidebar_position: 0
custom_edit_url: null
---

## Hierarchy

- **`ContentConfig`**

  ↳ [`Config`](Config.md)

## Properties

### activeEditor

• **activeEditor**: `undefined` \| [`EditorId`](../modules.md#editorid)

#### Defined in

[models.ts:41](https://github.com/live-codes/livecodes/blob/78947ee/src/lib/models.ts#L41)

___

### cssPreset

• **cssPreset**: [`CssPresetId`](../modules.md#csspresetid)

#### Defined in

[models.ts:48](https://github.com/live-codes/livecodes/blob/78947ee/src/lib/models.ts#L48)

___

### customSettings

• **customSettings**: `Partial`<{ `Binary`: `any` ; `C`: `any` ; `adoc`: `any` ; `art`: `any` ; `art-template`: `any` ; `as`: `any` ; `asc`: `any` ; `asciidoc`: `any` ; `assemblyscript`: `any` ; `astro`: `any` ; `autoprefixer`: `any` ; `babel`: `any` ; `blockly`: `any` ; `blockly.xml`: `any` ; `c`: `any` ; `c++`: `any` ; `clang`: `any` ; `clang.cpp`: `any` ; `clio`: `any` ; `coffee`: `any` ; `coffeescript`: `any` ; `common-lisp`: `any` ; `commonlisp`: `any` ; `cp`: `any` ; `cpp`: `any` ; `cppm`: `any` ; `csharp`: `any` ; `css`: `any` ; `cxx`: `any` ; `diagram`: `any` ; `diagrams`: `any` ; `dot`: `any` ; `ejs`: `any` ; `es`: `any` ; `go`: `any` ; `golang`: `any` ; `graph`: `any` ; `h`: `any` ; `haml`: `any` ; `handlebars`: `any` ; `hbs`: `any` ; `hpp`: `any` ; `htm`: `any` ; `html`: `any` ; `ii`: `any` ; `imba`: `any` ; `ixx`: `any` ; `jade`: `any` ; `javascript`: `any` ; `jl`: `any` ; `js`: `any` ; `json`: `any` ; `jsx`: `any` ; `julia`: `any` ; `less`: `any` ; `liquid`: `any` ; `liquidjs`: `any` ; `lisp`: `any` ; `livescript`: `any` ; `ls`: `any` ; `lua`: `any` ; `malina`: `any` ; `malinajs`: `any` ; `markdown`: `any` ; `md`: `any` ; `mdown`: `any` ; `mdx`: `any` ; `mkdn`: `any` ; `ml`: `any` ; `mli`: `any` ; `mustache`: `any` ; `njk`: `any` ; `nunjucks`: `any` ; `ocaml`: `any` ; `perl`: `any` ; `php`: `any` ; `pintora`: `any` ; `pl`: `any` ; `plt`: `any` ; `pm`: `any` ; `postcss`: `any` ; `postcssImportUrl`: `any` ; `postcssPresetEnv`: `any` ; `prolog`: `any` ; `prolog.pl`: `any` ; `pug`: `any` ; `py`: `any` ; `py3`: `any` ; `pyodide`: `any` ; `python`: `any` ; `rb`: `any` ; `re`: `any` ; `react-native`: `any` ; `react-native-tsx`: `any` ; `react-native.jsx`: `any` ; `react-native.tsx`: `any` ; `reason`: `any` ; `rei`: `any` ; `res`: `any` ; `rescript`: `any` ; `resi`: `any` ; `rich`: `any` ; `richtext`: `any` ; `riot`: `any` ; `riotjs`: `any` ; `rte`: `any` ; `rte.html`: `any` ; `ruby`: `any` ; `sass`: `any` ; `scheme`: `any` ; `scm`: `any` ; `scss`: `any` ; `solid`: `any` ; `solid.jsx`: `any` ; `solid.tsx`: `any` ; `sql`: `any` ; `sqlite`: `any` ; `sqlite3`: `any` ; `stencil`: `any` ; `stencil.tsx`: `any` ; `styl`: `any` ; `stylus`: `any` ; `svelte`: `any` ; `tailwindcss`: `any` ; `tcl`: `any` ; `ts`: `any` ; `tsx`: `any` ; `twig`: `any` ; `typescript`: `any` ; `vue`: `any` ; `vue2`: `any` ; `vue3`: `any` ; `wasm`: `any` ; `wast`: `any` ; `wat`: `any` ; `webassembly`: `any` ; `windicss`: `any` ; `xht`: `any` ; `xml`: `any`  } & { `convertCommonjs`: `boolean` ; `head`: `string` ; `htmlClasses`: `string` ; `imports`: `Record`<`string`, `string`\> ; `mapImports`: `boolean` ; `scriptType`: `undefined` \| ``""`` \| ``"module"`` \| ``"application/javascript"`` \| ``"application/ecmascript"`` \| ``"text/javascript"`` \| ``"text/ecmascript"`` \| ``"text/liquid"`` \| ``"text/python"`` \| ``"text/x-uniter-php"`` \| ``"text/cpp"`` \| ``"text/perl"`` \| ``"text/julia"`` \| ``"text/biwascheme"`` \| ``"text/commonlisp"`` \| ``"text/tcl"`` \| ``"text/prolog"`` \| ``"application/json"`` \| ``"application/lua"`` \| ``"application/wasm-uint8"`` ; `template`: { `data?`: `any` ; `prerender?`: `boolean`  } ; `types`: [`Types`](Types.md)  }\>

#### Defined in

[models.ts:58](https://github.com/live-codes/livecodes/blob/78947ee/src/lib/models.ts#L58)

___

### description

• **description**: `string`

#### Defined in

[models.ts:39](https://github.com/live-codes/livecodes/blob/78947ee/src/lib/models.ts#L39)

___

### imports

• **imports**: `Object`

#### Index signature

▪ [key: `string`]: `string`

#### Defined in

[models.ts:59](https://github.com/live-codes/livecodes/blob/78947ee/src/lib/models.ts#L59)

___

### languages

• **languages**: `undefined` \| [`Language`](../modules.md#language)[]

#### Defined in

[models.ts:42](https://github.com/live-codes/livecodes/blob/78947ee/src/lib/models.ts#L42)

___

### markup

• **markup**: [`Editor`](Editor.md)

#### Defined in

[models.ts:43](https://github.com/live-codes/livecodes/blob/78947ee/src/lib/models.ts#L43)

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

#### Defined in

[models.ts:49](https://github.com/live-codes/livecodes/blob/78947ee/src/lib/models.ts#L49)

___

### script

• **script**: [`Editor`](Editor.md)

#### Defined in

[models.ts:45](https://github.com/live-codes/livecodes/blob/78947ee/src/lib/models.ts#L45)

___

### scripts

• **scripts**: `string`[]

#### Defined in

[models.ts:47](https://github.com/live-codes/livecodes/blob/78947ee/src/lib/models.ts#L47)

___

### style

• **style**: [`Editor`](Editor.md)

#### Defined in

[models.ts:44](https://github.com/live-codes/livecodes/blob/78947ee/src/lib/models.ts#L44)

___

### stylesheets

• **stylesheets**: `string`[]

#### Defined in

[models.ts:46](https://github.com/live-codes/livecodes/blob/78947ee/src/lib/models.ts#L46)

___

### tags

• **tags**: `string`[]

#### Defined in

[models.ts:40](https://github.com/live-codes/livecodes/blob/78947ee/src/lib/models.ts#L40)

___

### tests

• **tests**: `undefined` \| `Partial`<[`Editor`](Editor.md)\>

#### Defined in

[models.ts:61](https://github.com/live-codes/livecodes/blob/78947ee/src/lib/models.ts#L61)

___

### title

• **title**: `string`

#### Defined in

[models.ts:38](https://github.com/live-codes/livecodes/blob/78947ee/src/lib/models.ts#L38)

___

### types

• **types**: [`Types`](Types.md)

#### Defined in

[models.ts:60](https://github.com/live-codes/livecodes/blob/78947ee/src/lib/models.ts#L60)

___

### version

• `Readonly` **version**: `string`

#### Defined in

[models.ts:62](https://github.com/live-codes/livecodes/blob/78947ee/src/lib/models.ts#L62)
