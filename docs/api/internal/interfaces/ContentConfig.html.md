# Interface: ContentConfig

The properties that define the content of the current [project](https://livecodes.io/docs/features/projects).

## Extended by

- [`Config`](../../interfaces/Config.md)

## Properties

### activeEditor

> **activeEditor**: `undefined` \| [`EditorId`](../type-aliases/EditorId.md)

Selects the active editor to show.

Defaults to the last used editor for user, otherwise `"markup"`

#### Defined in

[models.ts:455](https://github.com/live-codes/livecodes/blob/61a0396afe9816818482c9e42c3ba23295ad3520/src/sdk/models.ts#L455)

***

### cssPreset

> **cssPreset**: [`CssPresetId`](../type-aliases/CssPresetId.md)

[CSS Preset](https://livecodes.io/docs/features/external-resources#css-presets) to use.

#### Defined in

[models.ts:502](https://github.com/live-codes/livecodes/blob/61a0396afe9816818482c9e42c3ba23295ad3520/src/sdk/models.ts#L502)

***

### customSettings

> **customSettings**: `object`

Defines [custom settings](https://livecodes.io/docs/advanced/custom-settings) for the current project.

#### adoc

> **adoc**: `any`

#### app.svelte

> **svelte**: `any`

#### app.vue

> **vue**: `any`

#### art

> **art**: `any`

#### art-template

> **art-template**: `any`

#### as

> **as**: `any`

#### asc

> **asc**: `any`

#### asciidoc

> **asciidoc**: `any`

#### assemblyscript

> **assemblyscript**: `any`

#### astro

> **astro**: `any`

#### autoprefixer

> **autoprefixer**: `any`

#### babel

> **babel**: `any`

#### bb

> **bb**: `any`

#### bbcode

> **bbcode**: `any`

#### Binary

> **Binary**: `any`

#### blockly

> **blockly**: `any`

#### blockly.xml

> **xml**: `any`

#### c

> **c**: `any`

#### C

> **C**: `any`

#### c++

> **c++**: `any`

#### civet

> **civet**: `any`

#### clang

> **clang**: `any`

#### clang.cpp

> **cpp**: `any`

#### clio

> **clio**: `any`

#### clj

> **clj**: `any`

#### cljc

> **cljc**: `any`

#### cljs

> **cljs**: `any`

#### clojure

> **clojure**: `any`

#### clojurescript

> **clojurescript**: `any`

#### coffee

> **coffee**: `any`

#### coffeescript

> **coffeescript**: `any`

#### common-lisp

> **common-lisp**: `any`

#### commonlisp

> **commonlisp**: `any`

#### convertCommonjs?

> `optional` **convertCommonjs**: `boolean`

#### cp

> **cp**: `any`

#### cpp

> **cpp**: `any`

#### cpp-wasm

> **cpp-wasm**: `any`

#### cppm

> **cppm**: `any`

#### cppwasm

> **cppwasm**: `any`

#### cs

> **cs**: `any`

#### cs-wasm

> **cs-wasm**: `any`

#### csharp

> **csharp**: `any`

#### csharp-wasm

> **csharp-wasm**: `any`

#### css

> **css**: `any`

#### cssmodules

> **cssmodules**: `any`

#### cssnano

> **cssnano**: `any`

#### cwasm

> **cwasm**: `any`

#### cxx

> **cxx**: `any`

#### defaultCDN?

> `optional` **defaultCDN**: [`CDN`](../type-aliases/CDN.md)

#### diagram

> **diagram**: `any`

#### diagrams

> **diagrams**: `any`

#### dot

> **dot**: `any`

#### dzn

> **dzn**: `any`

#### edn

> **edn**: `any`

#### ejs

> **ejs**: `any`

#### es

> **es**: `any`

#### eta

> **eta**: `any`

#### fennel

> **fennel**: `any`

#### flow

> **flow**: `any`

#### fnl

> **fnl**: `any`

#### gleam

> **gleam**: `any`

#### go

> **go**: `any`

#### go-wasm

> **go-wasm**: `any`

#### golang

> **golang**: `any`

#### gowasm

> **gowasm**: `any`

#### graph

> **graph**: `any`

#### h

> **h**: `any`

#### haml

> **haml**: `any`

#### handlebars

> **handlebars**: `any`

#### hbs

> **hbs**: `any`

#### hpp

> **hpp**: `any`

#### htm

> **htm**: `any`

#### html

> **html**: `any`

#### ii

> **ii**: `any`

#### imba

> **imba**: `any`

#### imports?

> `optional` **imports**: `Record`\<`string`, `string`\>

#### ixx

> **ixx**: `any`

#### jade

> **jade**: `any`

#### java

> **java**: `any`

#### javascript

> **javascript**: `any`

#### jinja

> **jinja**: `any`

#### jl

> **jl**: `any`

#### js

> **js**: `any`

#### json

> **json**: `any`

#### jsx

> **jsx**: `any`

#### julia

> **julia**: `any`

#### less

> **less**: `any`

#### lightningcss

> **lightningcss**: `any`

#### liquid

> **liquid**: `any`

#### liquidjs

> **liquidjs**: `any`

#### lisp

> **lisp**: `any`

#### livescript

> **livescript**: `any`

#### ls

> **ls**: `any`

#### lua

> **lua**: `any`

#### lua-wasm

> **lua-wasm**: `any`

#### luawasm

> **luawasm**: `any`

#### malina

> **malina**: `any`

#### malinajs

> **malinajs**: `any`

#### mapImports?

> `optional` **mapImports**: `boolean`

#### markdown

> **markdown**: `any`

#### md

> **md**: `any`

#### mdown

> **mdown**: `any`

#### mdx

> **mdx**: `any`

#### minizinc

> **minizinc**: `any`

#### mjml

> **mjml**: `any`

#### mjs

> **mjs**: `any`

#### mkdn

> **mkdn**: `any`

#### ml

> **ml**: `any`

#### mli

> **mli**: `any`

#### mts

> **mts**: `any`

#### mustache

> **mustache**: `any`

#### mzn

> **mzn**: `any`

#### njk

> **njk**: `any`

#### nunjucks

> **nunjucks**: `any`

#### ocaml

> **ocaml**: `any`

#### perl

> **perl**: `any`

#### pg

> **pg**: `any`

#### pg.sql

> **sql**: `any`

#### pglite

> **pglite**: `any`

#### pglite.sql

> **sql**: `any`

#### pgsql

> **pgsql**: `any`

#### pgsql.sql

> **sql**: `any`

#### php

> **php**: `any`

#### php-wasm

> **php-wasm**: `any`

#### phpwasm

> **phpwasm**: `any`

#### pintora

> **pintora**: `any`

#### pl

> **pl**: `any`

#### plt

> **plt**: `any`

#### pm

> **pm**: `any`

#### postcss

> **postcss**: `any`

#### postcssImportUrl

> **postcssImportUrl**: `any`

#### postcssPresetEnv

> **postcssPresetEnv**: `any`

#### postgre.sql

> **sql**: `any`

#### postgres

> **postgres**: `any`

#### postgresql

> **postgresql**: `any`

#### postgresql.sql

> **sql**: `any`

#### prolog

> **prolog**: `any`

#### prolog.pl

> **pl**: `any`

#### pug

> **pug**: `any`

#### purgecss

> **purgecss**: `any`

#### py

> **py**: `any`

#### py-wasm

> **py-wasm**: `any`

#### py3

> **py3**: `any`

#### pyodide

> **pyodide**: `any`

#### python

> **python**: `any`

#### python-wasm

> **python-wasm**: `any`

#### pythonwasm

> **pythonwasm**: `any`

#### pywasm

> **pywasm**: `any`

#### r

> **r**: `any`

#### r-wasm

> **r-wasm**: `any`

#### rb

> **rb**: `any`

#### re

> **re**: `any`

#### react

> **react**: `any`

#### react-jsx

> **react-jsx**: `any`

#### react-native

> **react-native**: `any`

#### react-native-tsx

> **react-native-tsx**: `any`

#### react-native.jsx

> **jsx**: `any`

#### react-native.tsx

> **tsx**: `any`

#### react-tsx

> **react-tsx**: `any`

#### react.jsx

> **jsx**: `any`

#### react.tsx

> **tsx**: `any`

#### reason

> **reason**: `any`

#### rei

> **rei**: `any`

#### res

> **res**: `any`

#### rescript

> **rescript**: `any`

#### resi

> **resi**: `any`

#### rich

> **rich**: `any`

#### richtext

> **richtext**: `any`

#### riot

> **riot**: `any`

#### riotjs

> **riotjs**: `any`

#### ripple

> **ripple**: `any`

#### ripplejs

> **ripplejs**: `any`

#### rlang

> **rlang**: `any`

#### rstats

> **rstats**: `any`

#### rte

> **rte**: `any`

#### rte.html

> **html**: `any`

#### ruby

> **ruby**: `any`

#### ruby-wasm

> **ruby-wasm**: `any`

#### rubywasm

> **rubywasm**: `any`

#### sass

> **sass**: `any`

#### scheme

> **scheme**: `any`

#### scm

> **scm**: `any`

#### scriptType?

> `optional` **scriptType**: `""` \| `"module"` \| `"application/javascript"` \| `"application/ecmascript"` \| `"text/javascript"` \| `"text/ecmascript"` \| `"text/liquid"` \| `"text/python"` \| `"text/r"` \| `"text/ruby-wasm"` \| `"text/x-uniter-php"` \| `"text/php-wasm"` \| `"text/cpp"` \| `"text/java"` \| `"text/csharp-wasm"` \| `"text/perl"` \| `"text/julia"` \| `"text/biwascheme"` \| `"text/commonlisp"` \| `"text/tcl"` \| `"text/prolog"` \| `"text/minizinc"` \| `"text/go-wasm"` \| `"application/json"` \| `"application/lua"` \| `"text/fennel"` \| `"application/wasm-uint8"`

#### scss

> **scss**: `any`

#### solid

> **solid**: `any`

#### solid.jsx

> **jsx**: `any`

#### solid.tsx

> **tsx**: `any`

#### sql

> **sql**: `any`

#### sqlite

> **sqlite**: `any`

#### sqlite3

> **sqlite3**: `any`

#### stencil

> **stencil**: `any`

#### stencil.tsx

> **tsx**: `any`

#### styl

> **styl**: `any`

#### stylis

> **stylis**: `any`

#### stylus

> **stylus**: `any`

#### sucrase

> **sucrase**: `any`

#### svelte

> **svelte**: `any`

#### svelte-app

> **svelte-app**: `any`

#### tailwindcss

> **tailwindcss**: `any`

#### tcl

> **tcl**: `any`

#### teal

> **teal**: `any`

#### template?

> `optional` **template**: `object`

#### template.data?

> `optional` **data**: `any`

#### template.prerender?

> `optional` **prerender**: `boolean`

#### tl

> **tl**: `any`

#### tokencss

> **tokencss**: `any`

#### ts

> **ts**: `any`

#### tsx

> **tsx**: `any`

#### twig

> **twig**: `any`

#### types?

> `optional` **types**: [`Types`](Types.md)

#### typescript

> **typescript**: `any`

#### unocss

> **unocss**: `any`

#### vento

> **vento**: `any`

#### vto

> **vto**: `any`

#### vue

> **vue**: `any`

#### vue-app

> **vue-app**: `any`

#### vue2

> **vue2**: `any`

#### vue3

> **vue3**: `any`

#### wasm

> **wasm**: `any`

#### wasm.cpp

> **cpp**: `any`

#### wasm.cs

> **cs**: `any`

#### wasm.go

> **go**: `any`

#### wasm.lua

> **lua**: `any`

#### wasm.php

> **php**: `any`

#### wasm.py

> **py**: `any`

#### wasm.rb

> **rb**: `any`

#### wast

> **wast**: `any`

#### wat

> **wat**: `any`

#### webassembly

> **webassembly**: `any`

#### windicss

> **windicss**: `any`

#### xht

> **xht**: `any`

#### xml

> **xml**: `any`

#### Defined in

[models.ts:514](https://github.com/live-codes/livecodes/blob/61a0396afe9816818482c9e42c3ba23295ad3520/src/sdk/models.ts#L514)

***

### description

> **description**: `string`

Project description. Used in [project](https://livecodes.io/docs/features/projects) search
and [result page](https://livecodes.io/docs/features/result) description meta tag.

#### Default

```ts
""
```

#### Defined in

[models.ts:425](https://github.com/live-codes/livecodes/blob/61a0396afe9816818482c9e42c3ba23295ad3520/src/sdk/models.ts#L425)

***

### head

> **head**: `string`

Content added to the [result page](https://livecodes.io/docs/features/result) `<head>` element.

#### Default

```ts
'<meta charset="UTF-8" />\n<meta name="viewport" content="width=device-width, initial-scale=1.0" />'
```

#### Defined in

[models.ts:431](https://github.com/live-codes/livecodes/blob/61a0396afe9816818482c9e42c3ba23295ad3520/src/sdk/models.ts#L431)

***

### htmlAttrs

> **htmlAttrs**: `string` \| `Record`\<`string`, `string`\>

Attributes added to the [result page](https://livecodes.io/docs/features/result) `<html>` element.
It can be an object or a string.

#### Example

```ts
{ lang: "en", class: "dark" }
'lang="en" class="dark"'
```

#### Defined in

[models.ts:440](https://github.com/live-codes/livecodes/blob/61a0396afe9816818482c9e42c3ba23295ad3520/src/sdk/models.ts#L440)

***

### imports

> **imports**: `object`

Allows specifying custom [import maps](https://github.com/WICG/import-maps) for [module imports](https://livecodes.io/docs/features/module-resolution#custom-module-resolution).

**Example**

Setting `imports` like this:
```js
"imports": {
  "moment": "https://cdn.jsdelivr.net/npm/moment@2.29.4/dist/moment.js"
}
```
results in the following import map:
```html
<script type="importmap">
  {
    "imports": {
      "moment": "https://cdn.jsdelivr.net/npm/moment@2.29.4/dist/moment.js"
    }
  }
</script>
```
See docs for [Imports](https://livecodes.io/docs/configuration/configuration-object#imports)
and [Custom Module Resolution](https://livecodes.io/docs/features/module-resolution/#custom-module-resolution)

#### Index Signature

 \[`key`: `string`\]: `string`

#### Defined in

[models.ts:540](https://github.com/live-codes/livecodes/blob/61a0396afe9816818482c9e42c3ba23295ad3520/src/sdk/models.ts#L540)

***

### languages

> **languages**: `undefined` \| (`"html"` \| `"htm"` \| `"markdown"` \| `"md"` \| `"mdown"` \| `"mkdn"` \| `"mdx"` \| `"astro"` \| `"pug"` \| `"jade"` \| `"haml"` \| `"asciidoc"` \| `"adoc"` \| `"asc"` \| `"mustache"` \| `"handlebars"` \| `"hbs"` \| `"ejs"` \| `"eta"` \| `"nunjucks"` \| `"njk"` \| `"liquid"` \| `"liquidjs"` \| `"dot"` \| `"twig"` \| `"vento"` \| `"vto"` \| `"art-template"` \| `"art"` \| `"jinja"` \| `"bbcode"` \| `"bb"` \| `"mjml"` \| `"diagrams"` \| `"diagram"` \| `"graph"` \| `"plt"` \| `"richtext"` \| `"rte"` \| `"rich"` \| `"rte.html"` \| `"css"` \| `"scss"` \| `"sass"` \| `"less"` \| `"stylus"` \| `"styl"` \| `"stylis"` \| `"postcss"` \| `"javascript"` \| `"js"` \| `"mjs"` \| `"json"` \| `"babel"` \| `"es"` \| `"sucrase"` \| `"typescript"` \| `"flow"` \| `"ts"` \| `"mts"` \| `"jsx"` \| `"tsx"` \| `"react"` \| `"react-jsx"` \| `"react.jsx"` \| `"react-tsx"` \| `"react.tsx"` \| `"react-native"` \| `"react-native.jsx"` \| `"react-native-tsx"` \| `"react-native.tsx"` \| `"vue"` \| `"vue3"` \| `"vue2"` \| `"vue-app"` \| `"app.vue"` \| `"svelte"` \| `"svelte-app"` \| `"app.svelte"` \| `"stencil"` \| `"stencil.tsx"` \| `"solid"` \| `"solid.jsx"` \| `"solid.tsx"` \| `"riot"` \| `"riotjs"` \| `"malina"` \| `"malinajs"` \| `"ripple"` \| `"ripplejs"` \| `"xht"` \| `"coffeescript"` \| `"coffee"` \| `"livescript"` \| `"ls"` \| `"civet"` \| `"clio"` \| `"imba"` \| `"assemblyscript"` \| `"as"` \| `"python"` \| `"py"` \| `"pyodide"` \| `"python-wasm"` \| `"py-wasm"` \| `"pythonwasm"` \| `"pywasm"` \| `"py3"` \| `"wasm.py"` \| `"r"` \| `"rlang"` \| `"rstats"` \| `"r-wasm"` \| `"ruby"` \| `"rb"` \| `"ruby-wasm"` \| `"wasm.rb"` \| `"rubywasm"` \| `"go"` \| `"golang"` \| `"go-wasm"` \| `"wasm.go"` \| `"gowasm"` \| `"php"` \| `"php-wasm"` \| `"phpwasm"` \| `"wasm.php"` \| `"cpp"` \| `"c"` \| `"C"` \| `"cp"` \| `"cxx"` \| `"c++"` \| `"cppm"` \| `"ixx"` \| `"ii"` \| `"hpp"` \| `"h"` \| `"cpp-wasm"` \| `"cppwasm"` \| `"cwasm"` \| `"wasm.cpp"` \| `"clang"` \| `"clang.cpp"` \| `"java"` \| `"csharp"` \| `"csharp-wasm"` \| `"cs"` \| `"cs-wasm"` \| `"wasm.cs"` \| `"perl"` \| `"pl"` \| `"pm"` \| `"lua"` \| `"lua-wasm"` \| `"luawasm"` \| `"wasm.lua"` \| `"teal"` \| `"tl"` \| `"fennel"` \| `"fnl"` \| `"julia"` \| `"jl"` \| `"scheme"` \| `"scm"` \| `"commonlisp"` \| `"common-lisp"` \| `"lisp"` \| `"clojurescript"` \| `"clojure"` \| `"cljs"` \| `"clj"` \| `"cljc"` \| `"edn"` \| `"gleam"` \| `"rescript"` \| `"res"` \| `"resi"` \| `"reason"` \| `"re"` \| `"rei"` \| `"ocaml"` \| `"ml"` \| `"mli"` \| `"tcl"` \| `"wat"` \| `"wast"` \| `"webassembly"` \| `"wasm"` \| `"Binary"` \| `"sql"` \| `"sqlite"` \| `"sqlite3"` \| `"pg.sql"` \| `"pgsql.sql"` \| `"pgsql"` \| `"pg"` \| `"pglite"` \| `"pglite.sql"` \| `"postgresql"` \| `"postgres"` \| `"postgre.sql"` \| `"postgresql.sql"` \| `"prolog.pl"` \| `"prolog"` \| `"minizinc"` \| `"mzn"` \| `"dzn"` \| `"blockly"` \| `"blockly.xml"` \| `"xml"` \| `"pintora"` \| `"postcssImportUrl"` \| `"tailwindcss"` \| `"windicss"` \| `"unocss"` \| `"tokencss"` \| `"lightningcss"` \| `"autoprefixer"` \| `"postcssPresetEnv"` \| `"cssmodules"` \| `"purgecss"` \| `"cssnano"`)[]

List of enabled languages.

Defaults to all supported languages in full app and only current editor languages in [embeds](https://livecodes.io/docs/features/embeds).

#### Defined in

[models.ts:462](https://github.com/live-codes/livecodes/blob/61a0396afe9816818482c9e42c3ba23295ad3520/src/sdk/models.ts#L462)

***

### markup

> **markup**: `object`

An object that configures the language and content of the markup editor.

See [docs](https://livecodes.io/docs/configuration/configuration-object/#markup) for details.

#### content?

> `optional` **content**: `string`

The initial content of the code editor.

##### Default

```ts
""
```

#### contentUrl?

> `optional` **contentUrl**: `string`

A URL to load `content` from. It has to be a valid URL that is CORS-enabled.

The URL is only fetched if `content` property had no value.

#### foldedLines?

> `optional` **foldedLines**: `object`[]

Lines that get folded when the editor loads.

This can be used for less relevant content.

##### Example

```ts
[{ from: 5, to: 8 }, { from: 15, to: 20 }]
```

#### hiddenContent?

> `optional` **hiddenContent**: `string`

Hidden content that gets evaluated without being visible in the code editor.

This can be useful in embedded playgrounds (e.g. for adding helper functions, utilities or tests)

#### hiddenContentUrl?

> `optional` **hiddenContentUrl**: `string`

A URL to load `hiddenContent` from. It has to be a valid URL that is CORS-enabled.

The URL is only fetched if `hiddenContent` property had no value.

#### hideTitle?

> `optional` **hideTitle**: `boolean`

If `true`, the title of the code editor is hidden, however its code is still evaluated.

This can be useful in embedded playgrounds (e.g. for hiding unnecessary code).

#### language

> **language**: [`Language`](../../type-aliases/Language.md)

A language name, extension or alias (as defined in [language documentations](https://livecodes.io/docs/languages/)).

For the list of supported values, see [Language](https://livecodes.io/docs/api/type-aliases/Language)

#### order?

> `optional` **order**: `number`

The order of the editor in the UI.

##### Default

```ts
0
```

#### position?

> `optional` **position**: [`EditorPosition`](EditorPosition.md)

The initial position of the cursor in the code editor.

##### Example

```ts
{lineNumber: 5, column: 10}
```

#### selector?

> `optional` **selector**: `string`

A CSS selector to load content from [DOM import](https://livecodes.io/docs/features/import#import-code-from-dom).

#### title?

> `optional` **title**: `string`

If set, this is used as the title of the editor in the UI,
overriding the default title set to the language name
(e.g. `"Python"` can be used instead of `"Py (Wasm)"`).

#### Default

```ts
{ language: "html", content: "" }
```

#### Defined in

[models.ts:470](https://github.com/live-codes/livecodes/blob/61a0396afe9816818482c9e42c3ba23295ad3520/src/sdk/models.ts#L470)

***

### processors

> **processors**: [`Processor`](../type-aliases/Processor.md)[]

List of enabled [CSS processors](https://livecodes.io/docs/features/css/#css-processors).

For the list of available processors, see [Processor](https://livecodes.io/docs/api/internal/type-aliases/Processor)

#### Defined in

[models.ts:509](https://github.com/live-codes/livecodes/blob/61a0396afe9816818482c9e42c3ba23295ad3520/src/sdk/models.ts#L509)

***

### script

> **script**: `object`

An object that configures the language and content of the script editor.

See [docs](https://livecodes.io/docs/configuration/configuration-object/#markup) for details.

#### content?

> `optional` **content**: `string`

The initial content of the code editor.

##### Default

```ts
""
```

#### contentUrl?

> `optional` **contentUrl**: `string`

A URL to load `content` from. It has to be a valid URL that is CORS-enabled.

The URL is only fetched if `content` property had no value.

#### foldedLines?

> `optional` **foldedLines**: `object`[]

Lines that get folded when the editor loads.

This can be used for less relevant content.

##### Example

```ts
[{ from: 5, to: 8 }, { from: 15, to: 20 }]
```

#### hiddenContent?

> `optional` **hiddenContent**: `string`

Hidden content that gets evaluated without being visible in the code editor.

This can be useful in embedded playgrounds (e.g. for adding helper functions, utilities or tests)

#### hiddenContentUrl?

> `optional` **hiddenContentUrl**: `string`

A URL to load `hiddenContent` from. It has to be a valid URL that is CORS-enabled.

The URL is only fetched if `hiddenContent` property had no value.

#### hideTitle?

> `optional` **hideTitle**: `boolean`

If `true`, the title of the code editor is hidden, however its code is still evaluated.

This can be useful in embedded playgrounds (e.g. for hiding unnecessary code).

#### language

> **language**: [`Language`](../../type-aliases/Language.md)

A language name, extension or alias (as defined in [language documentations](https://livecodes.io/docs/languages/)).

For the list of supported values, see [Language](https://livecodes.io/docs/api/type-aliases/Language)

#### order?

> `optional` **order**: `number`

The order of the editor in the UI.

##### Default

```ts
0
```

#### position?

> `optional` **position**: [`EditorPosition`](EditorPosition.md)

The initial position of the cursor in the code editor.

##### Example

```ts
{lineNumber: 5, column: 10}
```

#### selector?

> `optional` **selector**: `string`

A CSS selector to load content from [DOM import](https://livecodes.io/docs/features/import#import-code-from-dom).

#### title?

> `optional` **title**: `string`

If set, this is used as the title of the editor in the UI,
overriding the default title set to the language name
(e.g. `"Python"` can be used instead of `"Py (Wasm)"`).

#### Default

```ts
{ language: "javascript", content: "" }
```

#### Defined in

[models.ts:486](https://github.com/live-codes/livecodes/blob/61a0396afe9816818482c9e42c3ba23295ad3520/src/sdk/models.ts#L486)

***

### scripts

> **scripts**: `string`[]

List of URLs for [external scripts](https://livecodes.io/docs/features/external-resources) to add to the [result page](https://livecodes.io/docs/features/result).

#### Defined in

[models.ts:496](https://github.com/live-codes/livecodes/blob/61a0396afe9816818482c9e42c3ba23295ad3520/src/sdk/models.ts#L496)

***

### style

> **style**: `object`

An object that configures the language and content of the style editor.

See [docs](https://livecodes.io/docs/configuration/configuration-object/#markup) for details.

#### content?

> `optional` **content**: `string`

The initial content of the code editor.

##### Default

```ts
""
```

#### contentUrl?

> `optional` **contentUrl**: `string`

A URL to load `content` from. It has to be a valid URL that is CORS-enabled.

The URL is only fetched if `content` property had no value.

#### foldedLines?

> `optional` **foldedLines**: `object`[]

Lines that get folded when the editor loads.

This can be used for less relevant content.

##### Example

```ts
[{ from: 5, to: 8 }, { from: 15, to: 20 }]
```

#### hiddenContent?

> `optional` **hiddenContent**: `string`

Hidden content that gets evaluated without being visible in the code editor.

This can be useful in embedded playgrounds (e.g. for adding helper functions, utilities or tests)

#### hiddenContentUrl?

> `optional` **hiddenContentUrl**: `string`

A URL to load `hiddenContent` from. It has to be a valid URL that is CORS-enabled.

The URL is only fetched if `hiddenContent` property had no value.

#### hideTitle?

> `optional` **hideTitle**: `boolean`

If `true`, the title of the code editor is hidden, however its code is still evaluated.

This can be useful in embedded playgrounds (e.g. for hiding unnecessary code).

#### language

> **language**: [`Language`](../../type-aliases/Language.md)

A language name, extension or alias (as defined in [language documentations](https://livecodes.io/docs/languages/)).

For the list of supported values, see [Language](https://livecodes.io/docs/api/type-aliases/Language)

#### order?

> `optional` **order**: `number`

The order of the editor in the UI.

##### Default

```ts
0
```

#### position?

> `optional` **position**: [`EditorPosition`](EditorPosition.md)

The initial position of the cursor in the code editor.

##### Example

```ts
{lineNumber: 5, column: 10}
```

#### selector?

> `optional` **selector**: `string`

A CSS selector to load content from [DOM import](https://livecodes.io/docs/features/import#import-code-from-dom).

#### title?

> `optional` **title**: `string`

If set, this is used as the title of the editor in the UI,
overriding the default title set to the language name
(e.g. `"Python"` can be used instead of `"Py (Wasm)"`).

#### Default

```ts
{ language: "css", content: "" }
```

#### Defined in

[models.ts:478](https://github.com/live-codes/livecodes/blob/61a0396afe9816818482c9e42c3ba23295ad3520/src/sdk/models.ts#L478)

***

### stylesheets

> **stylesheets**: `string`[]

List of URLs for [external stylesheets](https://livecodes.io/docs/features/external-resources) to add to the [result page](https://livecodes.io/docs/features/result).

#### Defined in

[models.ts:491](https://github.com/live-codes/livecodes/blob/61a0396afe9816818482c9e42c3ba23295ad3520/src/sdk/models.ts#L491)

***

### tags

> **tags**: `string`[]

Project tags.
Used in [project](https://livecodes.io/docs/features/projects) filter and search.

#### Default

```ts
[]
```

#### Defined in

[models.ts:447](https://github.com/live-codes/livecodes/blob/61a0396afe9816818482c9e42c3ba23295ad3520/src/sdk/models.ts#L447)

***

### tests

> **tests**: `undefined` \| `object`

Configures the [language](https://livecodes.io/docs/features/tests#supported-languages)
and content of [tests](https://livecodes.io/docs/features/tests).

#### Defined in

[models.ts:576](https://github.com/live-codes/livecodes/blob/61a0396afe9816818482c9e42c3ba23295ad3520/src/sdk/models.ts#L576)

***

### title

> **title**: `string`

Project title.
This is used as [result page](https://livecodes.io/docs/features/result) title and title meta tag.
Also used in project search.

#### Default

```ts
"Untitled Project"
```

#### Defined in

[models.ts:418](https://github.com/live-codes/livecodes/blob/61a0396afe9816818482c9e42c3ba23295ad3520/src/sdk/models.ts#L418)

***

### types

> **types**: `object`

Allows providing custom TypeScript type declarations for better [editor intellisense](https://livecodes.io/docs/features/intellisense).

It is an object where each key represents module name and value represents the types.

See docs for [Types](https://livecodes.io/docs/configuration/configuration-object#types)
and [Custom Types](https://livecodes.io/docs/features/intellisense#custom-types)

#### Examples

```js
{
  "types": {
    "my-demo-lib": "https://my-custom-domain/my-type-declarations.d.ts"
  }
}
```

```
{
  "types": {
    "my-demo-lib": {
      "url": "https://my-custom-domain/types.d.ts",
      "autoload": true,
      "declareAsModule": true
    }
}
```

#### Defined in

[models.ts:570](https://github.com/live-codes/livecodes/blob/61a0396afe9816818482c9e42c3ba23295ad3520/src/sdk/models.ts#L570)

***

### version

> `readonly` **version**: `string`

This is a read-only property which specifies the current LiveCodes version.

Version specified in [exported](https://livecodes.io/docs/features/export) projects allows automatically upgrading the project configuration when imported by an app with a newer version.

#### Defined in

[models.ts:583](https://github.com/live-codes/livecodes/blob/61a0396afe9816818482c9e42c3ba23295ad3520/src/sdk/models.ts#L583)