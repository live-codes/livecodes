---
id: "livecodes_main.Config"
title: "Interface: Config"
sidebar_label: "Config"
custom_edit_url: null
---

[livecodes/main](../modules/livecodes_main.md).Config

## Hierarchy

- `ContentConfig`

- `AppConfig`

- `UserConfig`

  ↳ **`Config`**

## Properties

### activeEditor

• **activeEditor**: `undefined` \| `EditorId`

#### Inherited from

ContentConfig.activeEditor

#### Defined in

[livecodes/models.ts:39](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L39)

___

### allowLangChange

• **allowLangChange**: `boolean`

#### Inherited from

AppConfig.allowLangChange

#### Defined in

[livecodes/models.ts:65](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L65)

___

### autosave

• **autosave**: `boolean`

#### Inherited from

UserConfig.autosave

#### Defined in

[livecodes/models.ts:78](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L78)

___

### autoupdate

• **autoupdate**: `boolean`

#### Inherited from

UserConfig.autoupdate

#### Defined in

[livecodes/models.ts:77](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L77)

___

### cssPreset

• **cssPreset**: `CssPresetId`

#### Inherited from

ContentConfig.cssPreset

#### Defined in

[livecodes/models.ts:46](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L46)

___

### customSettings

• **customSettings**: `Partial`<{ `Binary`: `any` ; `C`: `any` ; `adoc`: `any` ; `as`: `any` ; `asc`: `any` ; `asciidoc`: `any` ; `assemblyscript`: `any` ; `astro`: `any` ; `autoprefixer`: `any` ; `babel`: `any` ; `blockly`: `any` ; `blockly.xml`: `any` ; `c`: `any` ; `c++`: `any` ; `clang`: `any` ; `clang.cpp`: `any` ; `clio`: `any` ; `coffee`: `any` ; `coffeescript`: `any` ; `common-lisp`: `any` ; `commonlisp`: `any` ; `cp`: `any` ; `cpp`: `any` ; `cppm`: `any` ; `csharp`: `any` ; `css`: `any` ; `cxx`: `any` ; `diagram`: `any` ; `dot`: `any` ; `ejs`: `any` ; `es`: `any` ; `go`: `any` ; `golang`: `any` ; `graph`: `any` ; `h`: `any` ; `haml`: `any` ; `handlebars`: `any` ; `hbs`: `any` ; `hpp`: `any` ; `htm`: `any` ; `html`: `any` ; `ii`: `any` ; `imba`: `any` ; `ixx`: `any` ; `jade`: `any` ; `javascript`: `any` ; `jl`: `any` ; `js`: `any` ; `json`: `any` ; `jsx`: `any` ; `julia`: `any` ; `less`: `any` ; `liquid`: `any` ; `liquidjs`: `any` ; `lisp`: `any` ; `livescript`: `any` ; `ls`: `any` ; `lua`: `any` ; `malina`: `any` ; `malinajs`: `any` ; `markdown`: `any` ; `md`: `any` ; `mdown`: `any` ; `mdx`: `any` ; `mkdn`: `any` ; `ml`: `any` ; `mli`: `any` ; `mustache`: `any` ; `njk`: `any` ; `nunjucks`: `any` ; `ocaml`: `any` ; `perl`: `any` ; `php`: `any` ; `pintora`: `any` ; `pl`: `any` ; `plt`: `any` ; `pm`: `any` ; `postcss`: `any` ; `postcssImportUrl`: `any` ; `postcssPresetEnv`: `any` ; `prolog`: `any` ; `prolog.pl`: `any` ; `pug`: `any` ; `py`: `any` ; `py3`: `any` ; `pyodide`: `any` ; `python`: `any` ; `rb`: `any` ; `re`: `any` ; `react-native`: `any` ; `react-native-tsx`: `any` ; `react-native.jsx`: `any` ; `react-native.tsx`: `any` ; `reason`: `any` ; `rei`: `any` ; `res`: `any` ; `rescript`: `any` ; `resi`: `any` ; `rich`: `any` ; `richtext`: `any` ; `riot`: `any` ; `riotjs`: `any` ; `rte`: `any` ; `rte.html`: `any` ; `ruby`: `any` ; `sass`: `any` ; `scheme`: `any` ; `scm`: `any` ; `scss`: `any` ; `solid`: `any` ; `solid.jsx`: `any` ; `solid.tsx`: `any` ; `sql`: `any` ; `sqlite`: `any` ; `sqlite3`: `any` ; `stencil`: `any` ; `stencil.tsx`: `any` ; `styl`: `any` ; `stylus`: `any` ; `svelte`: `any` ; `tailwindcss`: `any` ; `tcl`: `any` ; `ts`: `any` ; `tsx`: `any` ; `twig`: `any` ; `typescript`: `any` ; `vue`: `any` ; `vue2`: `any` ; `vue3`: `any` ; `wasm`: `any` ; `wast`: `any` ; `wat`: `any` ; `webassembly`: `any` ; `windicss`: `any` ; `xht`: `any` ; `xml`: `any`  } & { `convertCommonjs`: `boolean` ; `head`: `string` ; `htmlClasses`: `string` ; `imports`: `Record`<`string`, `string`\> ; `mapImports`: `boolean` ; `scriptType`: `undefined` \| ``""`` \| ``"module"`` \| ``"application/javascript"`` \| ``"application/ecmascript"`` \| ``"text/javascript"`` \| ``"text/ecmascript"`` \| ``"text/liquid"`` \| ``"text/python"`` \| ``"text/x-uniter-php"`` \| ``"text/cpp"`` \| ``"text/perl"`` \| ``"text/julia"`` \| ``"text/biwascheme"`` \| ``"text/commonlisp"`` \| ``"text/tcl"`` \| ``"text/prolog"`` \| ``"application/json"`` \| ``"application/lua"`` \| ``"application/wasm-uint8"`` ; `template`: { `data?`: `any` ; `prerender?`: `boolean`  } ; `types`: `Types`  }\>

#### Inherited from

ContentConfig.customSettings

#### Defined in

[livecodes/models.ts:56](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L56)

___

### delay

• **delay**: `number`

#### Inherited from

UserConfig.delay

#### Defined in

[livecodes/models.ts:79](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L79)

___

### description

• **description**: `string`

#### Inherited from

ContentConfig.description

#### Defined in

[livecodes/models.ts:37](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L37)

___

### editor

• **editor**: ``""`` \| ``"monaco"`` \| ``"codemirror"`` \| ``"codejar"``

#### Inherited from

AppConfig.editor

#### Defined in

[livecodes/models.ts:67](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L67)

___

### emmet

• **emmet**: `boolean`

#### Inherited from

UserConfig.emmet

#### Defined in

[livecodes/models.ts:81](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L81)

___

### enableRestore

• **enableRestore**: `boolean`

#### Inherited from

UserConfig.enableRestore

#### Defined in

[livecodes/models.ts:83](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L83)

___

### formatOnsave

• **formatOnsave**: `boolean`

#### Inherited from

UserConfig.formatOnsave

#### Defined in

[livecodes/models.ts:80](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L80)

___

### imports

• **imports**: `Object`

#### Index signature

▪ [key: `string`]: `string`

#### Inherited from

ContentConfig.imports

#### Defined in

[livecodes/models.ts:57](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L57)

___

### languages

• **languages**: `undefined` \| `Language`[]

#### Inherited from

ContentConfig.languages

#### Defined in

[livecodes/models.ts:40](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L40)

___

### markup

• **markup**: `Editor`

#### Inherited from

ContentConfig.markup

#### Defined in

[livecodes/models.ts:41](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L41)

___

### mode

• **mode**: ``"editor"`` \| ``"result"`` \| ``"full"`` \| ``"codeblock"``

#### Inherited from

AppConfig.mode

#### Defined in

[livecodes/models.ts:66](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L66)

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

ContentConfig.processors

#### Defined in

[livecodes/models.ts:47](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L47)

___

### readonly

• **readonly**: `boolean`

#### Inherited from

AppConfig.readonly

#### Defined in

[livecodes/models.ts:64](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L64)

___

### script

• **script**: `Editor`

#### Inherited from

ContentConfig.script

#### Defined in

[livecodes/models.ts:43](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L43)

___

### scripts

• **scripts**: `string`[]

#### Inherited from

ContentConfig.scripts

#### Defined in

[livecodes/models.ts:45](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L45)

___

### showSpacing

• **showSpacing**: `boolean`

#### Inherited from

UserConfig.showSpacing

#### Defined in

[livecodes/models.ts:84](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L84)

___

### showVersion

• **showVersion**: `boolean`

#### Inherited from

AppConfig.showVersion

#### Defined in

[livecodes/models.ts:68](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L68)

___

### style

• **style**: `Editor`

#### Inherited from

ContentConfig.style

#### Defined in

[livecodes/models.ts:42](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L42)

___

### stylesheets

• **stylesheets**: `string`[]

#### Inherited from

ContentConfig.stylesheets

#### Defined in

[livecodes/models.ts:44](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L44)

___

### tags

• **tags**: `string`[]

#### Inherited from

ContentConfig.tags

#### Defined in

[livecodes/models.ts:38](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L38)

___

### tests

• **tests**: `undefined` \| `Partial`<`Editor`\>

#### Inherited from

ContentConfig.tests

#### Defined in

[livecodes/models.ts:59](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L59)

___

### theme

• **theme**: `Theme`

#### Inherited from

UserConfig.theme

#### Defined in

[livecodes/models.ts:82](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L82)

___

### title

• **title**: `string`

#### Inherited from

ContentConfig.title

#### Defined in

[livecodes/models.ts:36](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L36)

___

### tools

• **tools**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `active` | ``""`` \| ``"tests"`` \| ``"console"`` \| ``"compiled"`` |
| `enabled` | (``"tests"`` \| ``"console"`` \| ``"compiled"``)[] \| ``"all"`` |
| `status` | `ToolsPaneStatus` |

#### Inherited from

AppConfig.tools

#### Defined in

[livecodes/models.ts:69](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L69)

___

### types

• **types**: `Types`

#### Inherited from

ContentConfig.types

#### Defined in

[livecodes/models.ts:58](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L58)

___

### version

• `Readonly` **version**: `string`

#### Inherited from

ContentConfig.version

#### Defined in

[livecodes/models.ts:60](https://github.com/live-codes/livecodes/blob/0b19ad3/src/livecodes/models.ts#L60)
