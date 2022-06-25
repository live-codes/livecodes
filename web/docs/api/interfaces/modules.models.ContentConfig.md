---
id: "modules.models.ContentConfig"
title: "Interface: ContentConfig"
sidebar_label: "ContentConfig"
custom_edit_url: null
---

[_modules](../modules/modules.md).[models](../namespaces/modules.models.md).ContentConfig

## Hierarchy

- **`ContentConfig`**

  ↳ [`Config`](main.Config.md)

## Properties

### activeEditor

• **activeEditor**: `undefined` \| [`EditorId`](../namespaces/modules.models.md#editorid)

#### Defined in

[src/livecodes/models.ts:39](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L39)

___

### cssPreset

• **cssPreset**: [`CssPresetId`](../namespaces/modules.models.md#csspresetid)

#### Defined in

[src/livecodes/models.ts:46](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L46)

___

### customSettings

• **customSettings**: `Partial`<{ `Binary`: `any` ; `C`: `any` ; `adoc`: `any` ; `as`: `any` ; `asc`: `any` ; `asciidoc`: `any` ; `assemblyscript`: `any` ; `astro`: `any` ; `autoprefixer`: `any` ; `babel`: `any` ; `blockly`: `any` ; `blockly.xml`: `any` ; `c`: `any` ; `c++`: `any` ; `clang`: `any` ; `clang.cpp`: `any` ; `clio`: `any` ; `coffee`: `any` ; `coffeescript`: `any` ; `common-lisp`: `any` ; `commonlisp`: `any` ; `cp`: `any` ; `cpp`: `any` ; `cppm`: `any` ; `csharp`: `any` ; `css`: `any` ; `cxx`: `any` ; `diagram`: `any` ; `dot`: `any` ; `ejs`: `any` ; `es`: `any` ; `go`: `any` ; `golang`: `any` ; `graph`: `any` ; `h`: `any` ; `haml`: `any` ; `handlebars`: `any` ; `hbs`: `any` ; `hpp`: `any` ; `htm`: `any` ; `html`: `any` ; `ii`: `any` ; `imba`: `any` ; `ixx`: `any` ; `jade`: `any` ; `javascript`: `any` ; `jl`: `any` ; `js`: `any` ; `json`: `any` ; `jsx`: `any` ; `julia`: `any` ; `less`: `any` ; `liquid`: `any` ; `liquidjs`: `any` ; `lisp`: `any` ; `livescript`: `any` ; `ls`: `any` ; `lua`: `any` ; `malina`: `any` ; `malinajs`: `any` ; `markdown`: `any` ; `md`: `any` ; `mdown`: `any` ; `mdx`: `any` ; `mkdn`: `any` ; `ml`: `any` ; `mli`: `any` ; `mustache`: `any` ; `njk`: `any` ; `nunjucks`: `any` ; `ocaml`: `any` ; `perl`: `any` ; `php`: `any` ; `pintora`: `any` ; `pl`: `any` ; `plt`: `any` ; `pm`: `any` ; `postcss`: `any` ; `postcssImportUrl`: `any` ; `postcssPresetEnv`: `any` ; `prolog`: `any` ; `prolog.pl`: `any` ; `pug`: `any` ; `py`: `any` ; `py3`: `any` ; `pyodide`: `any` ; `python`: `any` ; `rb`: `any` ; `re`: `any` ; `react-native`: `any` ; `react-native-tsx`: `any` ; `react-native.jsx`: `any` ; `react-native.tsx`: `any` ; `reason`: `any` ; `rei`: `any` ; `res`: `any` ; `rescript`: `any` ; `resi`: `any` ; `rich`: `any` ; `richtext`: `any` ; `riot`: `any` ; `riotjs`: `any` ; `rte`: `any` ; `rte.html`: `any` ; `ruby`: `any` ; `sass`: `any` ; `scheme`: `any` ; `scm`: `any` ; `scss`: `any` ; `solid`: `any` ; `solid.jsx`: `any` ; `solid.tsx`: `any` ; `sql`: `any` ; `sqlite`: `any` ; `sqlite3`: `any` ; `stencil`: `any` ; `stencil.tsx`: `any` ; `styl`: `any` ; `stylus`: `any` ; `svelte`: `any` ; `tailwindcss`: `any` ; `tcl`: `any` ; `ts`: `any` ; `tsx`: `any` ; `twig`: `any` ; `typescript`: `any` ; `vue`: `any` ; `vue2`: `any` ; `vue3`: `any` ; `wasm`: `any` ; `wast`: `any` ; `wat`: `any` ; `webassembly`: `any` ; `windicss`: `any` ; `xht`: `any` ; `xml`: `any`  } & { `convertCommonjs`: `boolean` ; `head`: `string` ; `htmlClasses`: `string` ; `imports`: `Record`<`string`, `string`\> ; `mapImports`: `boolean` ; `scriptType`: `undefined` \| ``""`` \| ``"module"`` \| ``"application/javascript"`` \| ``"application/ecmascript"`` \| ``"text/javascript"`` \| ``"text/ecmascript"`` \| ``"text/liquid"`` \| ``"text/python"`` \| ``"text/x-uniter-php"`` \| ``"text/cpp"`` \| ``"text/perl"`` \| ``"text/julia"`` \| ``"text/biwascheme"`` \| ``"text/commonlisp"`` \| ``"text/tcl"`` \| ``"text/prolog"`` \| ``"application/json"`` \| ``"application/lua"`` \| ``"application/wasm-uint8"`` ; `template`: { `data?`: `any` ; `prerender?`: `boolean`  } ; `types`: [`Types`](modules.models.Types.md)  }\>

#### Defined in

[src/livecodes/models.ts:56](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L56)

___

### description

• **description**: `string`

#### Defined in

[src/livecodes/models.ts:37](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L37)

___

### imports

• **imports**: `Object`

#### Index signature

▪ [key: `string`]: `string`

#### Defined in

[src/livecodes/models.ts:57](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L57)

___

### languages

• **languages**: `undefined` \| [`Language`](../namespaces/modules.models.md#language)[]

#### Defined in

[src/livecodes/models.ts:40](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L40)

___

### markup

• **markup**: [`Editor`](modules.models.Editor.md)

#### Defined in

[src/livecodes/models.ts:41](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L41)

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

[src/livecodes/models.ts:47](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L47)

___

### script

• **script**: [`Editor`](modules.models.Editor.md)

#### Defined in

[src/livecodes/models.ts:43](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L43)

___

### scripts

• **scripts**: `string`[]

#### Defined in

[src/livecodes/models.ts:45](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L45)

___

### style

• **style**: [`Editor`](modules.models.Editor.md)

#### Defined in

[src/livecodes/models.ts:42](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L42)

___

### stylesheets

• **stylesheets**: `string`[]

#### Defined in

[src/livecodes/models.ts:44](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L44)

___

### tags

• **tags**: `string`[]

#### Defined in

[src/livecodes/models.ts:38](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L38)

___

### tests

• **tests**: `undefined` \| `Partial`<[`Editor`](modules.models.Editor.md)\>

#### Defined in

[src/livecodes/models.ts:59](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L59)

___

### title

• **title**: `string`

#### Defined in

[src/livecodes/models.ts:36](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L36)

___

### types

• **types**: [`Types`](modules.models.Types.md)

#### Defined in

[src/livecodes/models.ts:58](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L58)

___

### version

• `Readonly` **version**: `string`

#### Defined in

[src/livecodes/models.ts:60](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L60)
