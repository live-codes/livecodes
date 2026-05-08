# Interface: Config

The playground configuration interface combining content, app, and user settings.

## Extends

- [`ContentConfig`](../internal/interfaces/ContentConfig.md).[`AppConfig`](../internal/interfaces/AppConfig.md).[`UserConfig`](../internal/interfaces/UserConfig.md)

## Properties

### activeEditor

> **activeEditor**: `undefined` \| [`EditorId`](../internal/type-aliases/EditorId.md)

Selects the active editor to show.

Defaults to the last used editor for user, otherwise `"markup"`

#### Inherited from

[`ContentConfig`](../internal/interfaces/ContentConfig.md).[`activeEditor`](../internal/interfaces/ContentConfig.md#activeeditor)

#### Defined in

[src/sdk/models.ts:1124](https://github.com/live-codes/livecodes/blob/d62960022f85a48a6957f2d51a7d1293dfcb55e8/src/sdk/models.ts#L1124)

***

### allowLangChange

> **allowLangChange**: `boolean`

If `false`, the UI will not show the menu that allows changing editor language.

#### Default

```ts
true
```

#### Inherited from

[`AppConfig`](../internal/interfaces/AppConfig.md).[`allowLangChange`](../internal/interfaces/AppConfig.md#allowlangchange)

#### Defined in

[src/sdk/models.ts:1037](https://github.com/live-codes/livecodes/blob/d62960022f85a48a6957f2d51a7d1293dfcb55e8/src/sdk/models.ts#L1037)

***

### appLanguage

> **appLanguage**: `undefined` \| [`AppLanguage`](../internal/type-aliases/AppLanguage.md)

Sets the app UI language used.

#### Inherited from

[`UserConfig`](../internal/interfaces/UserConfig.md).[`appLanguage`](../internal/interfaces/UserConfig.md#applanguage)

#### Defined in

[src/sdk/models.ts:1017](https://github.com/live-codes/livecodes/blob/d62960022f85a48a6957f2d51a7d1293dfcb55e8/src/sdk/models.ts#L1017)

***

### autosave

> **autosave**: `boolean`

If `true`, the project is automatically saved on code change,
after time [delay](https://livecodes.io/docs/configuration/configuration-object#delay).

#### Default

```ts
false
```

#### Inherited from

[`UserConfig`](../internal/interfaces/UserConfig.md).[`autosave`](../internal/interfaces/UserConfig.md#autosave)

#### Defined in

[src/sdk/models.ts:966](https://github.com/live-codes/livecodes/blob/d62960022f85a48a6957f2d51a7d1293dfcb55e8/src/sdk/models.ts#L966)

***

### autotest

> **autotest**: `boolean`

If `true`, the project is watched for code changes which trigger tests to auto-run.

#### Default

```ts
false
```

#### Inherited from

[`UserConfig`](../internal/interfaces/UserConfig.md).[`autotest`](../internal/interfaces/UserConfig.md#autotest)

#### Defined in

[src/sdk/models.ts:972](https://github.com/live-codes/livecodes/blob/d62960022f85a48a6957f2d51a7d1293dfcb55e8/src/sdk/models.ts#L972)

***

### autoupdate

> **autoupdate**: `boolean`

If `true`, the result page is automatically updated on code change,
after time [delay](https://livecodes.io/docs/configuration/configuration-object#delay).

#### Default

```ts
true
```

#### Inherited from

[`UserConfig`](../internal/interfaces/UserConfig.md).[`autoupdate`](../internal/interfaces/UserConfig.md#autoupdate)

#### Defined in

[src/sdk/models.ts:959](https://github.com/live-codes/livecodes/blob/d62960022f85a48a6957f2d51a7d1293dfcb55e8/src/sdk/models.ts#L959)

***

### closeBrackets

> **closeBrackets**: `boolean`

Use auto-complete to close brackets and quotes.

#### Default

```ts
true
```

#### Inherited from

[`UserConfig`](../internal/interfaces/UserConfig.md).[`closeBrackets`](../internal/interfaces/UserConfig.md#closebrackets)

#### Defined in

[src/sdk/models.ts:930](https://github.com/live-codes/livecodes/blob/d62960022f85a48a6957f2d51a7d1293dfcb55e8/src/sdk/models.ts#L930)

***

### cssPreset

> **cssPreset**: [`CssPresetId`](../internal/type-aliases/CssPresetId.md)

[CSS Preset](https://livecodes.io/docs/features/external-resources#css-presets) to use.

#### Inherited from

[`ContentConfig`](../internal/interfaces/ContentConfig.md).[`cssPreset`](../internal/interfaces/ContentConfig.md#csspreset)

#### Defined in

[src/sdk/models.ts:1171](https://github.com/live-codes/livecodes/blob/d62960022f85a48a6957f2d51a7d1293dfcb55e8/src/sdk/models.ts#L1171)

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

> `optional` **defaultCDN**: [`CDN`](../internal/type-aliases/CDN.md)

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

#### swift

> **swift**: `any`

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

> `optional` **types**: [`Types`](../internal/interfaces/Types.md)

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

#### Inherited from

[`ContentConfig`](../internal/interfaces/ContentConfig.md).[`customSettings`](../internal/interfaces/ContentConfig.md#customsettings)

#### Defined in

[src/sdk/models.ts:1183](https://github.com/live-codes/livecodes/blob/d62960022f85a48a6957f2d51a7d1293dfcb55e8/src/sdk/models.ts#L1183)

***

### delay

> **delay**: `number`

Time delay (in milliseconds) following code change,
after which the result page is updated (if [`autoupdate`](https://livecodes.io/docs/configuration/configuration-object#autoupdate) is `true`)
and/or the project is saved (if [`autosave`](https://livecodes.io/docs/configuration/configuration-object#autosave) is `true`).

#### Default

```ts
1500
```

#### Inherited from

[`UserConfig`](../internal/interfaces/UserConfig.md).[`delay`](../internal/interfaces/UserConfig.md#delay)

#### Defined in

[src/sdk/models.ts:980](https://github.com/live-codes/livecodes/blob/d62960022f85a48a6957f2d51a7d1293dfcb55e8/src/sdk/models.ts#L980)

***

### description

> **description**: `string`

Project description. Used in [project](https://livecodes.io/docs/features/projects) search
and [result page](https://livecodes.io/docs/features/result) description meta tag.

#### Default

```ts
""
```

#### Inherited from

[`ContentConfig`](../internal/interfaces/ContentConfig.md).[`description`](../internal/interfaces/ContentConfig.md#description)

#### Defined in

[src/sdk/models.ts:1094](https://github.com/live-codes/livecodes/blob/d62960022f85a48a6957f2d51a7d1293dfcb55e8/src/sdk/models.ts#L1094)

***

### editor

> **editor**: `undefined` \| `"auto"` \| `"monaco"` \| `"codemirror"` \| `"codejar"`

Selects the [code editor](https://livecodes.io/docs/features/editor-settings#code-editor) to use.

If `undefined` (the default), Monaco editor is used on desktop,
CodeMirror is used on mobile and in `simple` mode,
while CodeJar is used in `codeblock` mode, in `lite` mode and in `readonly` playgrounds.

If set to `auto`, Monaco editor is used on desktop and CodeMirror is used on mobile regardless of other settings.

#### Default

```ts
undefined
```

#### Inherited from

[`UserConfig`](../internal/interfaces/UserConfig.md).[`editor`](../internal/interfaces/UserConfig.md#editor)

#### Defined in

[src/sdk/models.ts:851](https://github.com/live-codes/livecodes/blob/d62960022f85a48a6957f2d51a7d1293dfcb55e8/src/sdk/models.ts#L851)

***

### editorMode

> **editorMode**: `undefined` \| `"vim"` \| `"emacs"`

Sets [editor mode](https://livecodes.io/docs/features/editor-settings#editor-modes).

#### Inherited from

[`UserConfig`](../internal/interfaces/UserConfig.md).[`editorMode`](../internal/interfaces/UserConfig.md#editormode)

#### Defined in

[src/sdk/models.ts:947](https://github.com/live-codes/livecodes/blob/d62960022f85a48a6957f2d51a7d1293dfcb55e8/src/sdk/models.ts#L947)

***

### editorTheme

> **editorTheme**: `undefined` \| `string` \| [`EditorTheme`](../internal/type-aliases/EditorTheme.md)[]

Sets the [code editor](https://livecodes.io/docs/features/editor-settings) themes.

See docs for [editor themes](https://livecodes.io/docs/configuration/configuration-object#editortheme) for details.

#### Examples

```ts
"vs"
```

```ts
"monaco:twilight, codemirror:one-dark"
```

```ts
["vs@light"]
```

```ts
["vs@light", "vs-dark@dark"]
```

```ts
["monaco:vs@light", "codemirror:github-light@light", "dracula@dark"]
```

#### Inherited from

[`UserConfig`](../internal/interfaces/UserConfig.md).[`editorTheme`](../internal/interfaces/UserConfig.md#editortheme)

#### Defined in

[src/sdk/models.ts:877](https://github.com/live-codes/livecodes/blob/d62960022f85a48a6957f2d51a7d1293dfcb55e8/src/sdk/models.ts#L877)

***

### emmet

> **emmet**: `boolean`

Enables [Emmet](https://livecodes.io/docs/features/editor-settings#emmet).

#### Default

```ts
true
```

#### Inherited from

[`UserConfig`](../internal/interfaces/UserConfig.md).[`emmet`](../internal/interfaces/UserConfig.md#emmet)

#### Defined in

[src/sdk/models.ts:942](https://github.com/live-codes/livecodes/blob/d62960022f85a48a6957f2d51a7d1293dfcb55e8/src/sdk/models.ts#L942)

***

### foldRegions

> **foldRegions**: `boolean`

When set to `true`, regions marked by `#region` and `#endregion` comments are folded when the project is loaded.

#### Default

```ts
false
```

#### Inherited from

[`UserConfig`](../internal/interfaces/UserConfig.md).[`foldRegions`](../internal/interfaces/UserConfig.md#foldregions)

#### Defined in

[src/sdk/models.ts:924](https://github.com/live-codes/livecodes/blob/d62960022f85a48a6957f2d51a7d1293dfcb55e8/src/sdk/models.ts#L924)

***

### fontFamily

> **fontFamily**: `undefined` \| `string`

Sets the [code editor](https://livecodes.io/docs/features/editor-settings) font family.

#### Inherited from

[`UserConfig`](../internal/interfaces/UserConfig.md).[`fontFamily`](../internal/interfaces/UserConfig.md#fontfamily)

#### Defined in

[src/sdk/models.ts:882](https://github.com/live-codes/livecodes/blob/d62960022f85a48a6957f2d51a7d1293dfcb55e8/src/sdk/models.ts#L882)

***

### fontSize

> **fontSize**: `undefined` \| `number`

Sets the font size.

If `undefined` (the default), the font size is set to 14 for the full app and 12 for [embeds](https://livecodes.io/docs/features/embeds).

#### Default

```ts
undefined
```

#### Inherited from

[`UserConfig`](../internal/interfaces/UserConfig.md).[`fontSize`](../internal/interfaces/UserConfig.md#fontsize)

#### Defined in

[src/sdk/models.ts:890](https://github.com/live-codes/livecodes/blob/d62960022f85a48a6957f2d51a7d1293dfcb55e8/src/sdk/models.ts#L890)

***

### formatOnsave

> **formatOnsave**: `boolean`

If `true`, the code is automatically [formatted](https://livecodes.io/docs/features/code-format) on saving the project.

#### Default

```ts
false
```

#### Inherited from

[`UserConfig`](../internal/interfaces/UserConfig.md).[`formatOnsave`](../internal/interfaces/UserConfig.md#formatonsave)

#### Defined in

[src/sdk/models.ts:986](https://github.com/live-codes/livecodes/blob/d62960022f85a48a6957f2d51a7d1293dfcb55e8/src/sdk/models.ts#L986)

***

### head

> **head**: `string`

Content added to the [result page](https://livecodes.io/docs/features/result) `<head>` element.

#### Default

```ts
'<meta charset="UTF-8" />\n<meta name="viewport" content="width=device-width, initial-scale=1.0" />'
```

#### Inherited from

[`ContentConfig`](../internal/interfaces/ContentConfig.md).[`head`](../internal/interfaces/ContentConfig.md#head)

#### Defined in

[src/sdk/models.ts:1100](https://github.com/live-codes/livecodes/blob/d62960022f85a48a6957f2d51a7d1293dfcb55e8/src/sdk/models.ts#L1100)

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

#### Inherited from

[`ContentConfig`](../internal/interfaces/ContentConfig.md).[`htmlAttrs`](../internal/interfaces/ContentConfig.md#htmlattrs)

#### Defined in

[src/sdk/models.ts:1109](https://github.com/live-codes/livecodes/blob/d62960022f85a48a6957f2d51a7d1293dfcb55e8/src/sdk/models.ts#L1109)

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

#### Inherited from

[`ContentConfig`](../internal/interfaces/ContentConfig.md).[`imports`](../internal/interfaces/ContentConfig.md#imports-1)

#### Defined in

[src/sdk/models.ts:1209](https://github.com/live-codes/livecodes/blob/d62960022f85a48a6957f2d51a7d1293dfcb55e8/src/sdk/models.ts#L1209)

***

### languages

> **languages**: `undefined` \| (`"html"` \| `"htm"` \| `"markdown"` \| `"md"` \| `"mdown"` \| `"mkdn"` \| `"mdx"` \| `"astro"` \| `"pug"` \| `"jade"` \| `"haml"` \| `"asciidoc"` \| `"adoc"` \| `"asc"` \| `"mustache"` \| `"handlebars"` \| `"hbs"` \| `"ejs"` \| `"eta"` \| `"nunjucks"` \| `"njk"` \| `"liquid"` \| `"liquidjs"` \| `"dot"` \| `"twig"` \| `"vento"` \| `"vto"` \| `"art-template"` \| `"art"` \| `"jinja"` \| `"bbcode"` \| `"bb"` \| `"mjml"` \| `"diagrams"` \| `"diagram"` \| `"graph"` \| `"plt"` \| `"richtext"` \| `"rte"` \| `"rich"` \| `"rte.html"` \| `"css"` \| `"scss"` \| `"sass"` \| `"less"` \| `"stylus"` \| `"styl"` \| `"stylis"` \| `"postcss"` \| `"javascript"` \| `"js"` \| `"mjs"` \| `"json"` \| `"babel"` \| `"es"` \| `"sucrase"` \| `"typescript"` \| `"flow"` \| `"ts"` \| `"mts"` \| `"jsx"` \| `"tsx"` \| `"react"` \| `"react-jsx"` \| `"react.jsx"` \| `"react-tsx"` \| `"react.tsx"` \| `"react-native"` \| `"react-native.jsx"` \| `"react-native-tsx"` \| `"react-native.tsx"` \| `"vue"` \| `"vue3"` \| `"vue2"` \| `"vue-app"` \| `"app.vue"` \| `"svelte"` \| `"svelte-app"` \| `"app.svelte"` \| `"stencil"` \| `"stencil.tsx"` \| `"solid"` \| `"solid.jsx"` \| `"solid.tsx"` \| `"riot"` \| `"riotjs"` \| `"malina"` \| `"malinajs"` \| `"ripple"` \| `"ripplejs"` \| `"xht"` \| `"coffeescript"` \| `"coffee"` \| `"livescript"` \| `"ls"` \| `"civet"` \| `"clio"` \| `"imba"` \| `"assemblyscript"` \| `"as"` \| `"python"` \| `"py"` \| `"pyodide"` \| `"python-wasm"` \| `"py-wasm"` \| `"pythonwasm"` \| `"pywasm"` \| `"py3"` \| `"wasm.py"` \| `"r"` \| `"rlang"` \| `"rstats"` \| `"r-wasm"` \| `"ruby"` \| `"rb"` \| `"ruby-wasm"` \| `"wasm.rb"` \| `"rubywasm"` \| `"go"` \| `"golang"` \| `"go-wasm"` \| `"wasm.go"` \| `"gowasm"` \| `"php"` \| `"php-wasm"` \| `"phpwasm"` \| `"wasm.php"` \| `"cpp"` \| `"c"` \| `"C"` \| `"cp"` \| `"cxx"` \| `"c++"` \| `"cppm"` \| `"ixx"` \| `"ii"` \| `"hpp"` \| `"h"` \| `"cpp-wasm"` \| `"cppwasm"` \| `"cwasm"` \| `"wasm.cpp"` \| `"clang"` \| `"clang.cpp"` \| `"java"` \| `"csharp"` \| `"csharp-wasm"` \| `"cs"` \| `"cs-wasm"` \| `"wasm.cs"` \| `"perl"` \| `"pl"` \| `"pm"` \| `"lua"` \| `"lua-wasm"` \| `"luawasm"` \| `"wasm.lua"` \| `"teal"` \| `"tl"` \| `"fennel"` \| `"fnl"` \| `"julia"` \| `"jl"` \| `"scheme"` \| `"scm"` \| `"commonlisp"` \| `"common-lisp"` \| `"lisp"` \| `"clojurescript"` \| `"clojure"` \| `"cljs"` \| `"clj"` \| `"cljc"` \| `"edn"` \| `"gleam"` \| `"swift"` \| `"rescript"` \| `"res"` \| `"resi"` \| `"reason"` \| `"re"` \| `"rei"` \| `"ocaml"` \| `"ml"` \| `"mli"` \| `"tcl"` \| `"wat"` \| `"wast"` \| `"webassembly"` \| `"wasm"` \| `"Binary"` \| `"sql"` \| `"sqlite"` \| `"sqlite3"` \| `"pg.sql"` \| `"pgsql.sql"` \| `"pgsql"` \| `"pg"` \| `"pglite"` \| `"pglite.sql"` \| `"postgresql"` \| `"postgres"` \| `"postgre.sql"` \| `"postgresql.sql"` \| `"prolog.pl"` \| `"prolog"` \| `"minizinc"` \| `"mzn"` \| `"dzn"` \| `"blockly"` \| `"blockly.xml"` \| `"xml"` \| `"pintora"` \| `"postcssImportUrl"` \| `"tailwindcss"` \| `"windicss"` \| `"unocss"` \| `"tokencss"` \| `"lightningcss"` \| `"autoprefixer"` \| `"postcssPresetEnv"` \| `"cssmodules"` \| `"purgecss"` \| `"cssnano"`)[]

List of enabled languages.

Defaults to all supported languages in full app and only current editor languages in [embeds](https://livecodes.io/docs/features/embeds).

#### Inherited from

[`ContentConfig`](../internal/interfaces/ContentConfig.md).[`languages`](../internal/interfaces/ContentConfig.md#languages)

#### Defined in

[src/sdk/models.ts:1131](https://github.com/live-codes/livecodes/blob/d62960022f85a48a6957f2d51a7d1293dfcb55e8/src/sdk/models.ts#L1131)

***

### layout

> **layout**: `undefined` \| `"responsive"` \| `"horizontal"` \| `"vertical"`

Sets the app layout to horizontal or vertical.
If set to `"responsive"` (the default) or `undefined`,
the layout is vertical in small screens when the playground height is larger than its width,
otherwise horizontal.

#### Default

```ts
"responsive"
```

#### Inherited from

[`UserConfig`](../internal/interfaces/UserConfig.md).[`layout`](../internal/interfaces/UserConfig.md#layout)

#### Defined in

[src/sdk/models.ts:995](https://github.com/live-codes/livecodes/blob/d62960022f85a48a6957f2d51a7d1293dfcb55e8/src/sdk/models.ts#L995)

***

### lineNumbers

> **lineNumbers**: `boolean` \| `"relative"`

Show line numbers in [code editor](https://livecodes.io/docs/features/editor-settings).

#### Default

```ts
true
```

#### Inherited from

[`UserConfig`](../internal/interfaces/UserConfig.md).[`lineNumbers`](../internal/interfaces/UserConfig.md#linenumbers)

#### Defined in

[src/sdk/models.ts:912](https://github.com/live-codes/livecodes/blob/d62960022f85a48a6957f2d51a7d1293dfcb55e8/src/sdk/models.ts#L912)

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

> **language**: [`Language`](../type-aliases/Language.md)

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

> `optional` **position**: [`EditorPosition`](../internal/interfaces/EditorPosition.md)

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

#### Inherited from

[`ContentConfig`](../internal/interfaces/ContentConfig.md).[`markup`](../internal/interfaces/ContentConfig.md#markup)

#### Defined in

[src/sdk/models.ts:1139](https://github.com/live-codes/livecodes/blob/d62960022f85a48a6957f2d51a7d1293dfcb55e8/src/sdk/models.ts#L1139)

***

### minimap

> **minimap**: `boolean`

Enables minimap in code editor.

#### Default

```ts
false
```

#### Inherited from

[`UserConfig`](../internal/interfaces/UserConfig.md).[`minimap`](../internal/interfaces/UserConfig.md#minimap)

#### Defined in

[src/sdk/models.ts:936](https://github.com/live-codes/livecodes/blob/d62960022f85a48a6957f2d51a7d1293dfcb55e8/src/sdk/models.ts#L936)

***

### mode

> **mode**: `"editor"` \| `"result"` \| `"full"` \| `"focus"` \| `"lite"` \| `"simple"` \| `"codeblock"`

Sets the [display mode](https://livecodes.io/docs/features/display-modes).

#### Default

```ts
"full"
```

#### Inherited from

[`AppConfig`](../internal/interfaces/AppConfig.md).[`mode`](../internal/interfaces/AppConfig.md#mode)

#### Defined in

[src/sdk/models.ts:1049](https://github.com/live-codes/livecodes/blob/d62960022f85a48a6957f2d51a7d1293dfcb55e8/src/sdk/models.ts#L1049)

***

### processors

> **processors**: [`Processor`](../internal/type-aliases/Processor.md)[]

List of enabled [CSS processors](https://livecodes.io/docs/features/css/#css-processors).

For the list of available processors, see [Processor](https://livecodes.io/docs/api/internal/type-aliases/Processor)

#### Inherited from

[`ContentConfig`](../internal/interfaces/ContentConfig.md).[`processors`](../internal/interfaces/ContentConfig.md#processors)

#### Defined in

[src/sdk/models.ts:1178](https://github.com/live-codes/livecodes/blob/d62960022f85a48a6957f2d51a7d1293dfcb55e8/src/sdk/models.ts#L1178)

***

### readonly

> **readonly**: `boolean`

If `true`, editors are loaded in read-only mode, where the user is not allowed to change the code.

By default, when readonly is set to true, the light-weight code editor [CodeJar](https://livecodes.io/docs/features/editor-settings#code-editor) is used.
If you wish to use another editor, set the [editor](https://livecodes.io/docs/configuration/configuration-object#editor) property.

#### Default

```ts
false
```

#### Inherited from

[`AppConfig`](../internal/interfaces/AppConfig.md).[`readonly`](../internal/interfaces/AppConfig.md#readonly)

#### Defined in

[src/sdk/models.ts:1031](https://github.com/live-codes/livecodes/blob/d62960022f85a48a6957f2d51a7d1293dfcb55e8/src/sdk/models.ts#L1031)

***

### recoverUnsaved

> **recoverUnsaved**: `boolean`

Enables [recovering last unsaved project](https://livecodes.io/docs/features/recover) when the app is reopened.

#### Default

```ts
true
```

#### Inherited from

[`UserConfig`](../internal/interfaces/UserConfig.md).[`recoverUnsaved`](../internal/interfaces/UserConfig.md#recoverunsaved)

#### Defined in

[src/sdk/models.ts:1001](https://github.com/live-codes/livecodes/blob/d62960022f85a48a6957f2d51a7d1293dfcb55e8/src/sdk/models.ts#L1001)

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

> **language**: [`Language`](../type-aliases/Language.md)

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

> `optional` **position**: [`EditorPosition`](../internal/interfaces/EditorPosition.md)

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

#### Inherited from

[`ContentConfig`](../internal/interfaces/ContentConfig.md).[`script`](../internal/interfaces/ContentConfig.md#script)

#### Defined in

[src/sdk/models.ts:1155](https://github.com/live-codes/livecodes/blob/d62960022f85a48a6957f2d51a7d1293dfcb55e8/src/sdk/models.ts#L1155)

***

### scripts

> **scripts**: `string`[]

List of URLs for [external scripts](https://livecodes.io/docs/features/external-resources) to add to the [result page](https://livecodes.io/docs/features/result).

#### Inherited from

[`ContentConfig`](../internal/interfaces/ContentConfig.md).[`scripts`](../internal/interfaces/ContentConfig.md#scripts)

#### Defined in

[src/sdk/models.ts:1165](https://github.com/live-codes/livecodes/blob/d62960022f85a48a6957f2d51a7d1293dfcb55e8/src/sdk/models.ts#L1165)

***

### semicolons

> **semicolons**: `boolean`

Configures Prettier [code formatter](https://livecodes.io/docs/features/code-format) to use semi-colons.

#### Default

```ts
true
```

#### Inherited from

[`UserConfig`](../internal/interfaces/UserConfig.md).[`semicolons`](../internal/interfaces/UserConfig.md#semicolons)

#### Defined in

[src/sdk/models.ts:822](https://github.com/live-codes/livecodes/blob/d62960022f85a48a6957f2d51a7d1293dfcb55e8/src/sdk/models.ts#L822)

***

### showSpacing

> **showSpacing**: `boolean`

Enables [showing element spacing](https://livecodes.io/docs/features/result#show-spacings) in the result page.

#### Default

```ts
false
```

#### Inherited from

[`UserConfig`](../internal/interfaces/UserConfig.md).[`showSpacing`](../internal/interfaces/UserConfig.md#showspacing)

#### Defined in

[src/sdk/models.ts:1007](https://github.com/live-codes/livecodes/blob/d62960022f85a48a6957f2d51a7d1293dfcb55e8/src/sdk/models.ts#L1007)

***

### singleQuote

> **singleQuote**: `boolean`

Configures Prettier [code formatter](https://livecodes.io/docs/features/code-format) to use single quotes instead of double quotes.

#### Default

```ts
false
```

#### Inherited from

[`UserConfig`](../internal/interfaces/UserConfig.md).[`singleQuote`](../internal/interfaces/UserConfig.md#singlequote)

#### Defined in

[src/sdk/models.ts:827](https://github.com/live-codes/livecodes/blob/d62960022f85a48a6957f2d51a7d1293dfcb55e8/src/sdk/models.ts#L827)

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

> **language**: [`Language`](../type-aliases/Language.md)

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

> `optional` **position**: [`EditorPosition`](../internal/interfaces/EditorPosition.md)

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

#### Inherited from

[`ContentConfig`](../internal/interfaces/ContentConfig.md).[`style`](../internal/interfaces/ContentConfig.md#style)

#### Defined in

[src/sdk/models.ts:1147](https://github.com/live-codes/livecodes/blob/d62960022f85a48a6957f2d51a7d1293dfcb55e8/src/sdk/models.ts#L1147)

***

### stylesheets

> **stylesheets**: `string`[]

List of URLs for [external stylesheets](https://livecodes.io/docs/features/external-resources) to add to the [result page](https://livecodes.io/docs/features/result).

#### Inherited from

[`ContentConfig`](../internal/interfaces/ContentConfig.md).[`stylesheets`](../internal/interfaces/ContentConfig.md#stylesheets)

#### Defined in

[src/sdk/models.ts:1160](https://github.com/live-codes/livecodes/blob/d62960022f85a48a6957f2d51a7d1293dfcb55e8/src/sdk/models.ts#L1160)

***

### tabSize

> **tabSize**: `number`

The number of spaces per indentation-level.

Also used in [code formatting](https://livecodes.io/docs/features/code-format).

#### Default

```ts
2
```

#### Inherited from

[`UserConfig`](../internal/interfaces/UserConfig.md).[`tabSize`](../internal/interfaces/UserConfig.md#tabsize)

#### Defined in

[src/sdk/models.ts:906](https://github.com/live-codes/livecodes/blob/d62960022f85a48a6957f2d51a7d1293dfcb55e8/src/sdk/models.ts#L906)

***

### tags

> **tags**: `string`[]

Project tags.
Used in [project](https://livecodes.io/docs/features/projects) filter and search.

#### Default

```ts
[]
```

#### Inherited from

[`ContentConfig`](../internal/interfaces/ContentConfig.md).[`tags`](../internal/interfaces/ContentConfig.md#tags)

#### Defined in

[src/sdk/models.ts:1116](https://github.com/live-codes/livecodes/blob/d62960022f85a48a6957f2d51a7d1293dfcb55e8/src/sdk/models.ts#L1116)

***

### tests

> **tests**: `undefined` \| `object`

Configures the [language](https://livecodes.io/docs/features/tests#supported-languages)
and content of [tests](https://livecodes.io/docs/features/tests).

#### Inherited from

[`ContentConfig`](../internal/interfaces/ContentConfig.md).[`tests`](../internal/interfaces/ContentConfig.md#tests)

#### Defined in

[src/sdk/models.ts:1245](https://github.com/live-codes/livecodes/blob/d62960022f85a48a6957f2d51a7d1293dfcb55e8/src/sdk/models.ts#L1245)

***

### theme

> **theme**: [`Theme`](../internal/type-aliases/Theme.md)

Sets the app [theme](https://livecodes.io/docs/features/themes) to light/dark mode.

#### Default

```ts
"dark"
```

#### Inherited from

[`UserConfig`](../internal/interfaces/UserConfig.md).[`theme`](../internal/interfaces/UserConfig.md#theme)

#### Defined in

[src/sdk/models.ts:857](https://github.com/live-codes/livecodes/blob/d62960022f85a48a6957f2d51a7d1293dfcb55e8/src/sdk/models.ts#L857)

***

### themeColor

> **themeColor**: `undefined` \| `string`

Sets the app theme color.
If `undefined`, it is set to `"hsl(214, 40%, 50%)"`.

#### Default

```ts
undefined
```

#### Inherited from

[`UserConfig`](../internal/interfaces/UserConfig.md).[`themeColor`](../internal/interfaces/UserConfig.md#themecolor)

#### Defined in

[src/sdk/models.ts:864](https://github.com/live-codes/livecodes/blob/d62960022f85a48a6957f2d51a7d1293dfcb55e8/src/sdk/models.ts#L864)

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

#### Inherited from

[`ContentConfig`](../internal/interfaces/ContentConfig.md).[`title`](../internal/interfaces/ContentConfig.md#title-3)

#### Defined in

[src/sdk/models.ts:1087](https://github.com/live-codes/livecodes/blob/d62960022f85a48a6957f2d51a7d1293dfcb55e8/src/sdk/models.ts#L1087)

***

### tools

> **tools**: `Partial`\<`object`\>

Sets enabled and active tools and status of [tools pane](https://livecodes.io/docs/features/tools-pane).

#### Type declaration

##### active

> **active**: `""` \| [`ToolName`](../internal/type-aliases/ToolName.md)

##### enabled

> **enabled**: [`ToolName`](../internal/type-aliases/ToolName.md)[] \| `"all"`

##### status

> **status**: [`ToolsPaneStatus`](../internal/type-aliases/ToolsPaneStatus.md)

#### Default

```ts
{ enabled: "all", active: "", status: "" }
```

#### Example

```js
{
  "tools": {
    "enabled": ["console", "compiled"],
    "active": "console",
    "status": "open"
  }
}
```

#### Inherited from

[`AppConfig`](../internal/interfaces/AppConfig.md).[`tools`](../internal/interfaces/AppConfig.md#tools)

#### Defined in

[src/sdk/models.ts:1065](https://github.com/live-codes/livecodes/blob/d62960022f85a48a6957f2d51a7d1293dfcb55e8/src/sdk/models.ts#L1065)

***

### trailingComma

> **trailingComma**: `boolean`

Configures Prettier [code formatter](https://livecodes.io/docs/features/code-format) to use [trailing commas](https://prettier.io/docs/en/options.html#trailing-commas).

#### Default

```ts
true
```

#### Inherited from

[`UserConfig`](../internal/interfaces/UserConfig.md).[`trailingComma`](../internal/interfaces/UserConfig.md#trailingcomma)

#### Defined in

[src/sdk/models.ts:833](https://github.com/live-codes/livecodes/blob/d62960022f85a48a6957f2d51a7d1293dfcb55e8/src/sdk/models.ts#L833)

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

#### Inherited from

[`ContentConfig`](../internal/interfaces/ContentConfig.md).[`types`](../internal/interfaces/ContentConfig.md#types-1)

#### Defined in

[src/sdk/models.ts:1239](https://github.com/live-codes/livecodes/blob/d62960022f85a48a6957f2d51a7d1293dfcb55e8/src/sdk/models.ts#L1239)

***

### useTabs

> **useTabs**: `boolean`

If `true`, lines are indented with tabs instead of spaces.

Also used in [code formatting](https://livecodes.io/docs/features/code-format).

#### Default

```ts
false
```

#### Inherited from

[`UserConfig`](../internal/interfaces/UserConfig.md).[`useTabs`](../internal/interfaces/UserConfig.md#usetabs)

#### Defined in

[src/sdk/models.ts:898](https://github.com/live-codes/livecodes/blob/d62960022f85a48a6957f2d51a7d1293dfcb55e8/src/sdk/models.ts#L898)

***

### version

> `readonly` **version**: `string`

This is a read-only property which specifies the current LiveCodes version.

Version specified in [exported](https://livecodes.io/docs/features/export) projects allows automatically upgrading the project configuration when imported by an app with a newer version.

#### Inherited from

[`ContentConfig`](../internal/interfaces/ContentConfig.md).[`version`](../internal/interfaces/ContentConfig.md#version)

#### Defined in

[src/sdk/models.ts:1252](https://github.com/live-codes/livecodes/blob/d62960022f85a48a6957f2d51a7d1293dfcb55e8/src/sdk/models.ts#L1252)

***

### view?

> `optional` **view**: `"split"` \| `"editor"` \| `"result"`

Sets the [default view](https://livecodes.io/docs/features/default-view) for the playground.

#### Default

```ts
"split"
```

#### Inherited from

[`AppConfig`](../internal/interfaces/AppConfig.md).[`view`](../internal/interfaces/AppConfig.md#view)

#### Defined in

[src/sdk/models.ts:1043](https://github.com/live-codes/livecodes/blob/d62960022f85a48a6957f2d51a7d1293dfcb55e8/src/sdk/models.ts#L1043)

***

### welcome

> **welcome**: `boolean`

If `true`, the [welcome screen](https://livecodes.io/docs/features/welcome) is displayed when the app loads.

#### Inherited from

[`UserConfig`](../internal/interfaces/UserConfig.md).[`welcome`](../internal/interfaces/UserConfig.md#welcome)

#### Defined in

[src/sdk/models.ts:1012](https://github.com/live-codes/livecodes/blob/d62960022f85a48a6957f2d51a7d1293dfcb55e8/src/sdk/models.ts#L1012)

***

### wordWrap

> **wordWrap**: `boolean`

Enables word-wrap for long lines.

#### Default

```ts
false
```

#### Inherited from

[`UserConfig`](../internal/interfaces/UserConfig.md).[`wordWrap`](../internal/interfaces/UserConfig.md#wordwrap)

#### Defined in

[src/sdk/models.ts:918](https://github.com/live-codes/livecodes/blob/d62960022f85a48a6957f2d51a7d1293dfcb55e8/src/sdk/models.ts#L918)

***

### zoom

> **zoom**: `0.25` \| `0.5` \| `1`

Sets result page [zoom level](https://livecodes.io/docs/features/result#result-page-zoom).

#### Inherited from

[`AppConfig`](../internal/interfaces/AppConfig.md).[`zoom`](../internal/interfaces/AppConfig.md#zoom)

#### Defined in

[src/sdk/models.ts:1074](https://github.com/live-codes/livecodes/blob/d62960022f85a48a6957f2d51a7d1293dfcb55e8/src/sdk/models.ts#L1074)