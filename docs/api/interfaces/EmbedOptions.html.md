# Interface: EmbedOptions

An object that represents the playground embed options.

See [docs](https://livecodes.io/docs/sdk/js-ts/#embed-options) for details.

## Properties

### appUrl?

> `optional` **appUrl**: `string`

Allows loading the playground from a custom URL
(e.g. a [self-hosted app](https://livecodes.io/docs/features/self-hosting) or a [permanent URL](https://livecodes.io/docs/features/permanent-url)).

If supplied with an invalid URL, an error is thrown.

#### Default

```ts
'https://livecodes.io'
```

#### Defined in

[models.ts:314](https://github.com/live-codes/livecodes/blob/61a0396afe9816818482c9e42c3ba23295ad3520/src/sdk/models.ts#L314)

***

### config?

> `optional` **config**: `string` \| `Partial`\<[`Config`](Config.md)\>

A [configuration object](https://livecodes.io/docs/configuration/configuration-object) or a URL to a JSON file representing a configuration object to load.

If supplied and is not an object or a valid URL, an error is thrown.

#### Default

```ts
{}
```

#### Defined in

[models.ts:346](https://github.com/live-codes/livecodes/blob/61a0396afe9816818482c9e42c3ba23295ad3520/src/sdk/models.ts#L346)

***

### headless?

> `optional` **headless**: `boolean`

If `true`, the playground is loaded in [headless mode](https://livecodes.io/docs/sdk/headless).

#### Default

```ts
false
```

#### Defined in

[models.ts:352](https://github.com/live-codes/livecodes/blob/61a0396afe9816818482c9e42c3ba23295ad3520/src/sdk/models.ts#L352)

***

### import?

> `optional` **import**: `string`

A resource to [import](https://livecodes.io/docs/features/import) (from any of the supported [sources](https://livecodes.io/docs/features/import#sources)).

#### Defined in

[models.ts:357](https://github.com/live-codes/livecodes/blob/61a0396afe9816818482c9e42c3ba23295ad3520/src/sdk/models.ts#L357)

***

### ~~lite?~~

> `optional` **lite**: `boolean`

#### Deprecated

Use `{ config: { mode: "lite" } }` instead

If `true`, the playground is loaded in [lite mode](https://livecodes.io/docs/features/lite).

#### Default

```ts
false
```

#### Defined in

[models.ts:367](https://github.com/live-codes/livecodes/blob/61a0396afe9816818482c9e42c3ba23295ad3520/src/sdk/models.ts#L367)

***

### loading?

> `optional` **loading**: `"lazy"` \| `"click"` \| `"eager"`

Sets how the playground loads:

- `"eager"`: The playground loads immediately.
- `"lazy"`: A playground embedded low down in the page will not load until the user scrolls so that it approaches the viewport.
- `"click"`: The playground does not load automatically. Instead, a "Click-to-load" screen is shown.

#### Default

```ts
"lazy"
```

#### Defined in

[models.ts:377](https://github.com/live-codes/livecodes/blob/61a0396afe9816818482c9e42c3ba23295ad3520/src/sdk/models.ts#L377)

***

### params?

> `optional` **params**: `object`

An object that represents the [URL Query parameters](https://livecodes.io/docs/configuration/query-params), that can be used to configure the playground.

These 2 snippets produce similar output:

```js
import { createPlayground } from 'livecodes';

// use config
createPlayground('#container', {
  config: {
    markup: {
      language: 'markdown',
      content: '# Hello World!',
    },
  },
});

// use params
createPlayground('#container', { params: { md: '# Hello World!' } });
```

#### active?

> `optional` **active**: `0` \| [`EditorId`](../internal/type-aliases/EditorId.md) \| `1` \| `2`

#### activeEditor?

> `optional` **activeEditor**: `0` \| [`EditorId`](../internal/type-aliases/EditorId.md) \| `1` \| `2`

#### adoc

> **adoc**: `undefined` \| `string`

#### adoc-selector

> **adoc-selector**: `undefined` \| `string`

#### allowLangChange?

> `optional` **allowLangChange**: `boolean`

If `false`, the UI will not show the menu that allows changing editor language.

##### Default

```ts
true
```

#### app.svelte

> **svelte**: `undefined` \| `string`

#### app.svelte-selector

> **svelte-selector**: `undefined` \| `string`

#### app.vue

> **vue**: `undefined` \| `string`

#### app.vue-selector

> **vue-selector**: `undefined` \| `string`

#### appLanguage?

> `optional` **appLanguage**: [`AppLanguage`](../internal/type-aliases/AppLanguage.md)

Sets the app UI language used.

#### appUrl?

> `optional` **appUrl**: `string`

Allows loading the playground from a custom URL
(e.g. a [self-hosted app](https://livecodes.io/docs/features/self-hosting) or a [permanent URL](https://livecodes.io/docs/features/permanent-url)).

If supplied with an invalid URL, an error is thrown.

##### Default

```ts
'https://livecodes.io'
```

#### art

> **art**: `undefined` \| `string`

#### art-selector

> **art-selector**: `undefined` \| `string`

#### art-template

> **art-template**: `undefined` \| `string`

#### art-template-selector

> **art-template-selector**: `undefined` \| `string`

#### as

> **as**: `undefined` \| `string`

#### as-selector

> **as-selector**: `undefined` \| `string`

#### asc

> **asc**: `undefined` \| `string`

#### asc-selector

> **asc-selector**: `undefined` \| `string`

#### asciidoc

> **asciidoc**: `undefined` \| `string`

#### asciidoc-selector

> **asciidoc-selector**: `undefined` \| `string`

#### assemblyscript

> **assemblyscript**: `undefined` \| `string`

#### assemblyscript-selector

> **assemblyscript-selector**: `undefined` \| `string`

#### astro

> **astro**: `undefined` \| `string`

#### astro-selector

> **astro-selector**: `undefined` \| `string`

#### autosave?

> `optional` **autosave**: `boolean`

If `true`, the project is automatically saved on code change,
after time [delay](https://livecodes.io/docs/configuration/configuration-object#delay).

##### Default

```ts
false
```

#### autotest?

> `optional` **autotest**: `boolean`

If `true`, the project is watched for code changes which trigger tests to auto-run.

##### Default

```ts
false
```

#### autoupdate?

> `optional` **autoupdate**: `boolean`

If `true`, the result page is automatically updated on code change,
after time [delay](https://livecodes.io/docs/configuration/configuration-object#delay).

##### Default

```ts
true
```

#### babel

> **babel**: `undefined` \| `string`

#### babel-selector

> **babel-selector**: `undefined` \| `string`

#### bb

> **bb**: `undefined` \| `string`

#### bb-selector

> **bb-selector**: `undefined` \| `string`

#### bbcode

> **bbcode**: `undefined` \| `string`

#### bbcode-selector

> **bbcode-selector**: `undefined` \| `string`

#### Binary

> **Binary**: `undefined` \| `string`

#### Binary-selector

> **Binary-selector**: `undefined` \| `string`

#### blockly

> **blockly**: `undefined` \| `string`

#### blockly-selector

> **blockly-selector**: `undefined` \| `string`

#### blockly.xml

> **xml**: `undefined` \| `string`

#### blockly.xml-selector

> **xml-selector**: `undefined` \| `string`

#### c

> **c**: `undefined` \| `string`

#### C

> **C**: `undefined` \| `string`

#### c-selector

> **c-selector**: `undefined` \| `string`

#### C-selector

> **C-selector**: `undefined` \| `string`

#### c++

> **c++**: `undefined` \| `string`

#### c++-selector

> **c++-selector**: `undefined` \| `string`

#### civet

> **civet**: `undefined` \| `string`

#### civet-selector

> **civet-selector**: `undefined` \| `string`

#### clang

> **clang**: `undefined` \| `string`

#### clang-selector

> **clang-selector**: `undefined` \| `string`

#### clang.cpp

> **cpp**: `undefined` \| `string`

#### clang.cpp-selector

> **cpp-selector**: `undefined` \| `string`

#### clio

> **clio**: `undefined` \| `string`

#### clio-selector

> **clio-selector**: `undefined` \| `string`

#### clj

> **clj**: `undefined` \| `string`

#### clj-selector

> **clj-selector**: `undefined` \| `string`

#### cljc

> **cljc**: `undefined` \| `string`

#### cljc-selector

> **cljc-selector**: `undefined` \| `string`

#### cljs

> **cljs**: `undefined` \| `string`

#### cljs-selector

> **cljs-selector**: `undefined` \| `string`

#### clojure

> **clojure**: `undefined` \| `string`

#### clojure-selector

> **clojure-selector**: `undefined` \| `string`

#### clojurescript

> **clojurescript**: `undefined` \| `string`

#### clojurescript-selector

> **clojurescript-selector**: `undefined` \| `string`

#### closeBrackets?

> `optional` **closeBrackets**: `boolean`

Use auto-complete to close brackets and quotes.

##### Default

```ts
true
```

#### coffee

> **coffee**: `undefined` \| `string`

#### coffee-selector

> **coffee-selector**: `undefined` \| `string`

#### coffeescript

> **coffeescript**: `undefined` \| `string`

#### coffeescript-selector

> **coffeescript-selector**: `undefined` \| `string`

#### common-lisp

> **common-lisp**: `undefined` \| `string`

#### common-lisp-selector

> **common-lisp-selector**: `undefined` \| `string`

#### commonlisp

> **commonlisp**: `undefined` \| `string`

#### commonlisp-selector

> **commonlisp-selector**: `undefined` \| `string`

#### compiled

> **compiled**: `undefined` \| `""` \| `"full"` \| `"closed"` \| `"open"` \| `"none"` \| `"true"`

#### config?

> `optional` **config**: `string` \| `Partial`\<[`Config`](Config.md)\> & `string`

A [configuration object](https://livecodes.io/docs/configuration/configuration-object) or a URL to a JSON file representing a configuration object to load.

If supplied and is not an object or a valid URL, an error is thrown.

##### Default

```ts
{}
```

#### console

> **console**: `undefined` \| `""` \| `"full"` \| `"closed"` \| `"open"` \| `"none"` \| `"true"`

#### cp

> **cp**: `undefined` \| `string`

#### cp-selector

> **cp-selector**: `undefined` \| `string`

#### cpp

> **cpp**: `undefined` \| `string`

#### cpp-selector

> **cpp-selector**: `undefined` \| `string`

#### cpp-wasm

> **cpp-wasm**: `undefined` \| `string`

#### cpp-wasm-selector

> **cpp-wasm-selector**: `undefined` \| `string`

#### cppm

> **cppm**: `undefined` \| `string`

#### cppm-selector

> **cppm-selector**: `undefined` \| `string`

#### cppwasm

> **cppwasm**: `undefined` \| `string`

#### cppwasm-selector

> **cppwasm-selector**: `undefined` \| `string`

#### cs

> **cs**: `undefined` \| `string`

#### cs-selector

> **cs-selector**: `undefined` \| `string`

#### cs-wasm

> **cs-wasm**: `undefined` \| `string`

#### cs-wasm-selector

> **cs-wasm-selector**: `undefined` \| `string`

#### csharp

> **csharp**: `undefined` \| `string`

#### csharp-selector

> **csharp-selector**: `undefined` \| `string`

#### csharp-wasm

> **csharp-wasm**: `undefined` \| `string`

#### csharp-wasm-selector

> **csharp-wasm-selector**: `undefined` \| `string`

#### css

> **css**: `undefined` \| `string`

#### css-selector

> **css-selector**: `undefined` \| `string`

#### cssPreset?

> `optional` **cssPreset**: [`CssPresetId`](../internal/type-aliases/CssPresetId.md)

[CSS Preset](https://livecodes.io/docs/features/external-resources#css-presets) to use.

#### customSettings?

> `optional` **customSettings**: `object`

Defines [custom settings](https://livecodes.io/docs/advanced/custom-settings) for the current project.

#### customSettings.adoc

> **adoc**: `any`

#### customSettings.app.svelte

> **svelte**: `any`

#### customSettings.app.vue

> **vue**: `any`

#### customSettings.art

> **art**: `any`

#### customSettings.art-template

> **art-template**: `any`

#### customSettings.as

> **as**: `any`

#### customSettings.asc

> **asc**: `any`

#### customSettings.asciidoc

> **asciidoc**: `any`

#### customSettings.assemblyscript

> **assemblyscript**: `any`

#### customSettings.astro

> **astro**: `any`

#### customSettings.autoprefixer

> **autoprefixer**: `any`

#### customSettings.babel

> **babel**: `any`

#### customSettings.bb

> **bb**: `any`

#### customSettings.bbcode

> **bbcode**: `any`

#### customSettings.Binary

> **Binary**: `any`

#### customSettings.blockly

> **blockly**: `any`

#### customSettings.blockly.xml

> **xml**: `any`

#### customSettings.c

> **c**: `any`

#### customSettings.C

> **C**: `any`

#### customSettings.c++

> **c++**: `any`

#### customSettings.civet

> **civet**: `any`

#### customSettings.clang

> **clang**: `any`

#### customSettings.clang.cpp

> **cpp**: `any`

#### customSettings.clio

> **clio**: `any`

#### customSettings.clj

> **clj**: `any`

#### customSettings.cljc

> **cljc**: `any`

#### customSettings.cljs

> **cljs**: `any`

#### customSettings.clojure

> **clojure**: `any`

#### customSettings.clojurescript

> **clojurescript**: `any`

#### customSettings.coffee

> **coffee**: `any`

#### customSettings.coffeescript

> **coffeescript**: `any`

#### customSettings.common-lisp

> **common-lisp**: `any`

#### customSettings.commonlisp

> **commonlisp**: `any`

#### customSettings.convertCommonjs?

> `optional` **convertCommonjs**: `boolean`

#### customSettings.cp

> **cp**: `any`

#### customSettings.cpp

> **cpp**: `any`

#### customSettings.cpp-wasm

> **cpp-wasm**: `any`

#### customSettings.cppm

> **cppm**: `any`

#### customSettings.cppwasm

> **cppwasm**: `any`

#### customSettings.cs

> **cs**: `any`

#### customSettings.cs-wasm

> **cs-wasm**: `any`

#### customSettings.csharp

> **csharp**: `any`

#### customSettings.csharp-wasm

> **csharp-wasm**: `any`

#### customSettings.css

> **css**: `any`

#### customSettings.cssmodules

> **cssmodules**: `any`

#### customSettings.cssnano

> **cssnano**: `any`

#### customSettings.cwasm

> **cwasm**: `any`

#### customSettings.cxx

> **cxx**: `any`

#### customSettings.defaultCDN?

> `optional` **defaultCDN**: [`CDN`](../internal/type-aliases/CDN.md)

#### customSettings.diagram

> **diagram**: `any`

#### customSettings.diagrams

> **diagrams**: `any`

#### customSettings.dot

> **dot**: `any`

#### customSettings.dzn

> **dzn**: `any`

#### customSettings.edn

> **edn**: `any`

#### customSettings.ejs

> **ejs**: `any`

#### customSettings.es

> **es**: `any`

#### customSettings.eta

> **eta**: `any`

#### customSettings.fennel

> **fennel**: `any`

#### customSettings.flow

> **flow**: `any`

#### customSettings.fnl

> **fnl**: `any`

#### customSettings.gleam

> **gleam**: `any`

#### customSettings.go

> **go**: `any`

#### customSettings.go-wasm

> **go-wasm**: `any`

#### customSettings.golang

> **golang**: `any`

#### customSettings.gowasm

> **gowasm**: `any`

#### customSettings.graph

> **graph**: `any`

#### customSettings.h

> **h**: `any`

#### customSettings.haml

> **haml**: `any`

#### customSettings.handlebars

> **handlebars**: `any`

#### customSettings.hbs

> **hbs**: `any`

#### customSettings.hpp

> **hpp**: `any`

#### customSettings.htm

> **htm**: `any`

#### customSettings.html

> **html**: `any`

#### customSettings.ii

> **ii**: `any`

#### customSettings.imba

> **imba**: `any`

#### customSettings.imports?

> `optional` **imports**: `Record`\<`string`, `string`\>

#### customSettings.ixx

> **ixx**: `any`

#### customSettings.jade

> **jade**: `any`

#### customSettings.java

> **java**: `any`

#### customSettings.javascript

> **javascript**: `any`

#### customSettings.jinja

> **jinja**: `any`

#### customSettings.jl

> **jl**: `any`

#### customSettings.js

> **js**: `any`

#### customSettings.json

> **json**: `any`

#### customSettings.jsx

> **jsx**: `any`

#### customSettings.julia

> **julia**: `any`

#### customSettings.less

> **less**: `any`

#### customSettings.lightningcss

> **lightningcss**: `any`

#### customSettings.liquid

> **liquid**: `any`

#### customSettings.liquidjs

> **liquidjs**: `any`

#### customSettings.lisp

> **lisp**: `any`

#### customSettings.livescript

> **livescript**: `any`

#### customSettings.ls

> **ls**: `any`

#### customSettings.lua

> **lua**: `any`

#### customSettings.lua-wasm

> **lua-wasm**: `any`

#### customSettings.luawasm

> **luawasm**: `any`

#### customSettings.malina

> **malina**: `any`

#### customSettings.malinajs

> **malinajs**: `any`

#### customSettings.mapImports?

> `optional` **mapImports**: `boolean`

#### customSettings.markdown

> **markdown**: `any`

#### customSettings.md

> **md**: `any`

#### customSettings.mdown

> **mdown**: `any`

#### customSettings.html.md)

> **mdx**: `any`

#### customSettings.minizinc

> **minizinc**: `any`

#### customSettings.mjml

> **mjml**: `any`

#### customSettings.mjs

> **mjs**: `any`

#### customSettings.mkdn

> **mkdn**: `any`

#### customSettings.ml

> **ml**: `any`

#### customSettings.mli

> **mli**: `any`

#### customSettings.mts

> **mts**: `any`

#### customSettings.mustache

> **mustache**: `any`

#### customSettings.mzn

> **mzn**: `any`

#### customSettings.njk

> **njk**: `any`

#### customSettings.nunjucks

> **nunjucks**: `any`

#### customSettings.ocaml

> **ocaml**: `any`

#### customSettings.perl

> **perl**: `any`

#### customSettings.pg

> **pg**: `any`

#### customSettings.pg.sql

> **sql**: `any`

#### customSettings.pglite

> **pglite**: `any`

#### customSettings.pglite.sql

> **sql**: `any`

#### customSettings.pgsql

> **pgsql**: `any`

#### customSettings.pgsql.sql

> **sql**: `any`

#### customSettings.php

> **php**: `any`

#### customSettings.php-wasm

> **php-wasm**: `any`

#### customSettings.phpwasm

> **phpwasm**: `any`

#### customSettings.pintora

> **pintora**: `any`

#### customSettings.pl

> **pl**: `any`

#### customSettings.plt

> **plt**: `any`

#### customSettings.pm

> **pm**: `any`

#### customSettings.postcss

> **postcss**: `any`

#### customSettings.postcssImportUrl

> **postcssImportUrl**: `any`

#### customSettings.postcssPresetEnv

> **postcssPresetEnv**: `any`

#### customSettings.postgre.sql

> **sql**: `any`

#### customSettings.postgres

> **postgres**: `any`

#### customSettings.postgresql

> **postgresql**: `any`

#### customSettings.postgresql.sql

> **sql**: `any`

#### customSettings.prolog

> **prolog**: `any`

#### customSettings.prolog.pl

> **pl**: `any`

#### customSettings.pug

> **pug**: `any`

#### customSettings.purgecss

> **purgecss**: `any`

#### customSettings.py

> **py**: `any`

#### customSettings.py-wasm

> **py-wasm**: `any`

#### customSettings.py3

> **py3**: `any`

#### customSettings.pyodide

> **pyodide**: `any`

#### customSettings.python

> **python**: `any`

#### customSettings.python-wasm

> **python-wasm**: `any`

#### customSettings.pythonwasm

> **pythonwasm**: `any`

#### customSettings.pywasm

> **pywasm**: `any`

#### customSettings.r

> **r**: `any`

#### customSettings.r-wasm

> **r-wasm**: `any`

#### customSettings.rb

> **rb**: `any`

#### customSettings.re

> **re**: `any`

#### customSettings.react

> **react**: `any`

#### customSettings.react-jsx

> **react-jsx**: `any`

#### customSettings.react-native

> **react-native**: `any`

#### customSettings.react-native-tsx

> **react-native-tsx**: `any`

#### customSettings.react-native.jsx

> **jsx**: `any`

#### customSettings.react-native.tsx

> **tsx**: `any`

#### customSettings.react-tsx

> **react-tsx**: `any`

#### customSettings.react.jsx

> **jsx**: `any`

#### customSettings.react.tsx

> **tsx**: `any`

#### customSettings.reason

> **reason**: `any`

#### customSettings.rei

> **rei**: `any`

#### customSettings.res

> **res**: `any`

#### customSettings.rescript

> **rescript**: `any`

#### customSettings.resi

> **resi**: `any`

#### customSettings.rich

> **rich**: `any`

#### customSettings.richtext

> **richtext**: `any`

#### customSettings.riot

> **riot**: `any`

#### customSettings.riotjs

> **riotjs**: `any`

#### customSettings.ripple

> **ripple**: `any`

#### customSettings.ripplejs

> **ripplejs**: `any`

#### customSettings.rlang

> **rlang**: `any`

#### customSettings.rstats

> **rstats**: `any`

#### customSettings.rte

> **rte**: `any`

#### customSettings.rte.html

> **html**: `any`

#### customSettings.ruby

> **ruby**: `any`

#### customSettings.ruby-wasm

> **ruby-wasm**: `any`

#### customSettings.rubywasm

> **rubywasm**: `any`

#### customSettings.sass

> **sass**: `any`

#### customSettings.scheme

> **scheme**: `any`

#### customSettings.scm

> **scm**: `any`

#### customSettings.scriptType?

> `optional` **scriptType**: `""` \| `"module"` \| `"application/javascript"` \| `"application/ecmascript"` \| `"text/javascript"` \| `"text/ecmascript"` \| `"text/liquid"` \| `"text/python"` \| `"text/r"` \| `"text/ruby-wasm"` \| `"text/x-uniter-php"` \| `"text/php-wasm"` \| `"text/cpp"` \| `"text/java"` \| `"text/csharp-wasm"` \| `"text/perl"` \| `"text/julia"` \| `"text/biwascheme"` \| `"text/commonlisp"` \| `"text/tcl"` \| `"text/prolog"` \| `"text/minizinc"` \| `"text/go-wasm"` \| `"application/json"` \| `"application/lua"` \| `"text/fennel"` \| `"application/wasm-uint8"`

#### customSettings.scss

> **scss**: `any`

#### customSettings.solid

> **solid**: `any`

#### customSettings.solid.jsx

> **jsx**: `any`

#### customSettings.solid.tsx

> **tsx**: `any`

#### customSettings.sql

> **sql**: `any`

#### customSettings.sqlite

> **sqlite**: `any`

#### customSettings.sqlite3

> **sqlite3**: `any`

#### customSettings.stencil

> **stencil**: `any`

#### customSettings.stencil.tsx

> **tsx**: `any`

#### customSettings.styl

> **styl**: `any`

#### customSettings.stylis

> **stylis**: `any`

#### customSettings.stylus

> **stylus**: `any`

#### customSettings.sucrase

> **sucrase**: `any`

#### customSettings.svelte

> **svelte**: `any`

#### customSettings.svelte-app

> **svelte-app**: `any`

#### customSettings.tailwindcss

> **tailwindcss**: `any`

#### customSettings.tcl

> **tcl**: `any`

#### customSettings.teal

> **teal**: `any`

#### customSettings.template?

> `optional` **template**: `object`

#### customSettings.template.data?

> `optional` **data**: `any`

#### customSettings.template.prerender?

> `optional` **prerender**: `boolean`

#### customSettings.tl

> **tl**: `any`

#### customSettings.tokencss

> **tokencss**: `any`

#### customSettings.ts

> **ts**: `any`

#### customSettings.tsx

> **tsx**: `any`

#### customSettings.twig

> **twig**: `any`

#### customSettings.types?

> `optional` **types**: [`Types`](../internal/interfaces/Types.md)

#### customSettings.typescript

> **typescript**: `any`

#### customSettings.unocss

> **unocss**: `any`

#### customSettings.vento

> **vento**: `any`

#### customSettings.vto

> **vto**: `any`

#### customSettings.vue

> **vue**: `any`

#### customSettings.vue-app

> **vue-app**: `any`

#### customSettings.vue2

> **vue2**: `any`

#### customSettings.vue3

> **vue3**: `any`

#### customSettings.wasm

> **wasm**: `any`

#### customSettings.wasm.cpp

> **cpp**: `any`

#### customSettings.wasm.cs

> **cs**: `any`

#### customSettings.wasm.go

> **go**: `any`

#### customSettings.wasm.lua

> **lua**: `any`

#### customSettings.wasm.php

> **php**: `any`

#### customSettings.wasm.py

> **py**: `any`

#### customSettings.wasm.rb

> **rb**: `any`

#### customSettings.wast

> **wast**: `any`

#### customSettings.wat

> **wat**: `any`

#### customSettings.webassembly

> **webassembly**: `any`

#### customSettings.windicss

> **windicss**: `any`

#### customSettings.xht

> **xht**: `any`

#### customSettings.xml

> **xml**: `any`

#### cwasm

> **cwasm**: `undefined` \| `string`

#### cwasm-selector

> **cwasm-selector**: `undefined` \| `string`

#### cxx

> **cxx**: `undefined` \| `string`

#### cxx-selector

> **cxx-selector**: `undefined` \| `string`

#### delay?

> `optional` **delay**: `number`

Time delay (in milliseconds) following code change,
after which the result page is updated (if [`autoupdate`](https://livecodes.io/docs/configuration/configuration-object#autoupdate) is `true`)
and/or the project is saved (if [`autosave`](https://livecodes.io/docs/configuration/configuration-object#autosave) is `true`).

##### Default

```ts
1500
```

#### description?

> `optional` **description**: `string`

Project description. Used in [project](https://livecodes.io/docs/features/projects) search
and [result page](https://livecodes.io/docs/features/result) description meta tag.

##### Default

```ts
""
```

#### diagram

> **diagram**: `undefined` \| `string`

#### diagram-selector

> **diagram-selector**: `undefined` \| `string`

#### diagrams

> **diagrams**: `undefined` \| `string`

#### diagrams-selector

> **diagrams-selector**: `undefined` \| `string`

#### disableAI?

> `optional` **disableAI**: `boolean`

#### dot

> **dot**: `undefined` \| `string`

#### dot-selector

> **dot-selector**: `undefined` \| `string`

#### dzn

> **dzn**: `undefined` \| `string`

#### dzn-selector

> **dzn-selector**: `undefined` \| `string`

#### editor?

> `optional` **editor**: `"auto"` \| `"monaco"` \| `"codemirror"` \| `"codejar"`

Selects the [code editor](https://livecodes.io/docs/features/editor-settings#code-editor) to use.

If `undefined` (the default), Monaco editor is used on desktop,
CodeMirror is used on mobile and in `simple` mode,
while CodeJar is used in `codeblock` mode, in `lite` mode and in `readonly` playgrounds.

If set to `auto`, Monaco editor is used on desktop and CodeMirror is used on mobile regardless of other settings.

##### Default

```ts
undefined
```

#### editorMode?

> `optional` **editorMode**: `"vim"` \| `"emacs"`

Sets [editor mode](https://livecodes.io/docs/features/editor-settings#editor-modes).

#### editorTheme?

> `optional` **editorTheme**: `string` \| [`EditorTheme`](../internal/type-aliases/EditorTheme.md)[]

Sets the [code editor](https://livecodes.io/docs/features/editor-settings) themes.

See docs for [editor themes](https://livecodes.io/docs/configuration/configuration-object#editortheme) for details.

##### Examples

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

#### edn

> **edn**: `undefined` \| `string`

#### edn-selector

> **edn-selector**: `undefined` \| `string`

#### ejs

> **ejs**: `undefined` \| `string`

#### ejs-selector

> **ejs-selector**: `undefined` \| `string`

#### embed?

> `optional` **embed**: `boolean`

#### emmet?

> `optional` **emmet**: `boolean`

Enables [Emmet](https://livecodes.io/docs/features/editor-settings#emmet).

##### Default

```ts
true
```

#### es

> **es**: `undefined` \| `string`

#### es-selector

> **es-selector**: `undefined` \| `string`

#### eta

> **eta**: `undefined` \| `string`

#### eta-selector

> **eta-selector**: `undefined` \| `string`

#### fennel

> **fennel**: `undefined` \| `string`

#### fennel-selector

> **fennel-selector**: `undefined` \| `string`

#### files?

> `optional` **files**: `string`

#### flow

> **flow**: `undefined` \| `string`

#### flow-selector

> **flow-selector**: `undefined` \| `string`

#### fnl

> **fnl**: `undefined` \| `string`

#### fnl-selector

> **fnl-selector**: `undefined` \| `string`

#### foldRegions?

> `optional` **foldRegions**: `boolean`

When set to `true`, regions marked by `#region` and `#endregion` comments are folded when the project is loaded.

##### Default

```ts
false
```

#### fontFamily?

> `optional` **fontFamily**: `string`

Sets the [code editor](https://livecodes.io/docs/features/editor-settings) font family.

#### fontSize?

> `optional` **fontSize**: `number`

Sets the font size.

If `undefined` (the default), the font size is set to 14 for the full app and 12 for [embeds](https://livecodes.io/docs/features/embeds).

##### Default

```ts
undefined
```

#### formatOnsave?

> `optional` **formatOnsave**: `boolean`

If `true`, the code is automatically [formatted](https://livecodes.io/docs/features/code-format) on saving the project.

##### Default

```ts
false
```

#### gleam

> **gleam**: `undefined` \| `string`

#### gleam-selector

> **gleam-selector**: `undefined` \| `string`

#### go

> **go**: `undefined` \| `string`

#### go-selector

> **go-selector**: `undefined` \| `string`

#### go-wasm

> **go-wasm**: `undefined` \| `string`

#### go-wasm-selector

> **go-wasm-selector**: `undefined` \| `string`

#### golang

> **golang**: `undefined` \| `string`

#### golang-selector

> **golang-selector**: `undefined` \| `string`

#### gowasm

> **gowasm**: `undefined` \| `string`

#### gowasm-selector

> **gowasm-selector**: `undefined` \| `string`

#### graph

> **graph**: `undefined` \| `string`

#### graph-selector

> **graph-selector**: `undefined` \| `string`

#### h

> **h**: `undefined` \| `string`

#### h-selector

> **h-selector**: `undefined` \| `string`

#### haml

> **haml**: `undefined` \| `string`

#### haml-selector

> **haml-selector**: `undefined` \| `string`

#### handlebars

> **handlebars**: `undefined` \| `string`

#### handlebars-selector

> **handlebars-selector**: `undefined` \| `string`

#### hbs

> **hbs**: `undefined` \| `string`

#### hbs-selector

> **hbs-selector**: `undefined` \| `string`

#### head?

> `optional` **head**: `string`

Content added to the [result page](https://livecodes.io/docs/features/result) `<head>` element.

##### Default

```ts
'<meta charset="UTF-8" />\n<meta name="viewport" content="width=device-width, initial-scale=1.0" />'
```

#### headless?

> `optional` **headless**: `boolean`

If `true`, the playground is loaded in [headless mode](https://livecodes.io/docs/sdk/headless).

##### Default

```ts
false
```

#### hpp

> **hpp**: `undefined` \| `string`

#### hpp-selector

> **hpp-selector**: `undefined` \| `string`

#### htm

> **htm**: `undefined` \| `string`

#### htm-selector

> **htm-selector**: `undefined` \| `string`

#### html

> **html**: `undefined` \| `string`

#### html-selector

> **html-selector**: `undefined` \| `string`

#### htmlAttrs?

> `optional` **htmlAttrs**: `string` \| `Record`\<`string`, `string`\>

Attributes added to the [result page](https://livecodes.io/docs/features/result) `<html>` element.
It can be an object or a string.

##### Example

```ts
{ lang: "en", class: "dark" }
'lang="en" class="dark"'
```

#### ii

> **ii**: `undefined` \| `string`

#### ii-selector

> **ii-selector**: `undefined` \| `string`

#### imba

> **imba**: `undefined` \| `string`

#### imba-selector

> **imba-selector**: `undefined` \| `string`

#### import?

> `optional` **import**: `string`

A resource to [import](https://livecodes.io/docs/features/import) (from any of the supported [sources](https://livecodes.io/docs/features/import#sources)).

#### imports?

> `optional` **imports**: `object`

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

##### Index Signature

 \[`key`: `string`\]: `string`

#### ixx

> **ixx**: `undefined` \| `string`

#### ixx-selector

> **ixx-selector**: `undefined` \| `string`

#### jade

> **jade**: `undefined` \| `string`

#### jade-selector

> **jade-selector**: `undefined` \| `string`

#### java

> **java**: `undefined` \| `string`

#### java-selector

> **java-selector**: `undefined` \| `string`

#### javascript

> **javascript**: `undefined` \| `string`

#### javascript-selector

> **javascript-selector**: `undefined` \| `string`

#### jinja

> **jinja**: `undefined` \| `string`

#### jinja-selector

> **jinja-selector**: `undefined` \| `string`

#### jl

> **jl**: `undefined` \| `string`

#### jl-selector

> **jl-selector**: `undefined` \| `string`

#### js

> **js**: `undefined` \| `string`

#### js-selector

> **js-selector**: `undefined` \| `string`

#### json

> **json**: `undefined` \| `string`

#### json-selector

> **json-selector**: `undefined` \| `string`

#### jsx

> **jsx**: `undefined` \| `string`

#### jsx-selector

> **jsx-selector**: `undefined` \| `string`

#### julia

> **julia**: `undefined` \| `string`

#### julia-selector

> **julia-selector**: `undefined` \| `string`

#### lang?

> `optional` **lang**: [`Language`](../type-aliases/Language.md)

#### language?

> `optional` **language**: [`Language`](../type-aliases/Language.md)

#### languages?

> `optional` **languages**: `string`

#### layout?

> `optional` **layout**: `"responsive"` \| `"horizontal"` \| `"vertical"`

Sets the app layout to horizontal or vertical.
If set to `"responsive"` (the default) or `undefined`,
the layout is vertical in small screens when the playground height is larger than its width,
otherwise horizontal.

##### Default

```ts
"responsive"
```

#### less

> **less**: `undefined` \| `string`

#### less-selector

> **less-selector**: `undefined` \| `string`

#### lineNumbers?

> `optional` **lineNumbers**: `boolean` \| `"relative"`

Show line numbers in [code editor](https://livecodes.io/docs/features/editor-settings).

##### Default

```ts
true
```

#### liquid

> **liquid**: `undefined` \| `string`

#### liquid-selector

> **liquid-selector**: `undefined` \| `string`

#### liquidjs

> **liquidjs**: `undefined` \| `string`

#### liquidjs-selector

> **liquidjs-selector**: `undefined` \| `string`

#### lisp

> **lisp**: `undefined` \| `string`

#### lisp-selector

> **lisp-selector**: `undefined` \| `string`

#### ~~lite?~~

> `optional` **lite**: `boolean`

##### Deprecated

Use `{ config: { mode: "lite" } }` instead

If `true`, the playground is loaded in [lite mode](https://livecodes.io/docs/features/lite).

##### Default

```ts
false
```

#### livescript

> **livescript**: `undefined` \| `string`

#### livescript-selector

> **livescript-selector**: `undefined` \| `string`

#### loading?

> `optional` **loading**: `"lazy"` \| `"click"` \| `"eager"`

Sets how the playground loads:

- `"eager"`: The playground loads immediately.
- `"lazy"`: A playground embedded low down in the page will not load until the user scrolls so that it approaches the viewport.
- `"click"`: The playground does not load automatically. Instead, a "Click-to-load" screen is shown.

##### Default

```ts
"lazy"
```

#### ls

> **ls**: `undefined` \| `string`

#### ls-selector

> **ls-selector**: `undefined` \| `string`

#### lua

> **lua**: `undefined` \| `string`

#### lua-selector

> **lua-selector**: `undefined` \| `string`

#### lua-wasm

> **lua-wasm**: `undefined` \| `string`

#### lua-wasm-selector

> **lua-wasm-selector**: `undefined` \| `string`

#### luawasm

> **luawasm**: `undefined` \| `string`

#### luawasm-selector

> **luawasm-selector**: `undefined` \| `string`

#### malina

> **malina**: `undefined` \| `string`

#### malina-selector

> **malina-selector**: `undefined` \| `string`

#### malinajs

> **malinajs**: `undefined` \| `string`

#### malinajs-selector

> **malinajs-selector**: `undefined` \| `string`

#### markdown

> **markdown**: `undefined` \| `string`

#### markdown-selector

> **markdown-selector**: `undefined` \| `string`

#### markup?

> `optional` **markup**: `object`

An object that configures the language and content of the markup editor.

See [docs](https://livecodes.io/docs/configuration/configuration-object/#markup) for details.

##### Default

```ts
{ language: "html", content: "" }
```

#### markup.content?

> `optional` **content**: `string`

The initial content of the code editor.

##### Default

```ts
""
```

#### markup.contentUrl?

> `optional` **contentUrl**: `string`

A URL to load `content` from. It has to be a valid URL that is CORS-enabled.

The URL is only fetched if `content` property had no value.

#### markup.foldedLines?

> `optional` **foldedLines**: `object`[]

Lines that get folded when the editor loads.

This can be used for less relevant content.

##### Example

```ts
[{ from: 5, to: 8 }, { from: 15, to: 20 }]
```

#### markup.hiddenContent?

> `optional` **hiddenContent**: `string`

Hidden content that gets evaluated without being visible in the code editor.

This can be useful in embedded playgrounds (e.g. for adding helper functions, utilities or tests)

#### markup.hiddenContentUrl?

> `optional` **hiddenContentUrl**: `string`

A URL to load `hiddenContent` from. It has to be a valid URL that is CORS-enabled.

The URL is only fetched if `hiddenContent` property had no value.

#### markup.hideTitle?

> `optional` **hideTitle**: `boolean`

If `true`, the title of the code editor is hidden, however its code is still evaluated.

This can be useful in embedded playgrounds (e.g. for hiding unnecessary code).

#### markup.language

> **language**: [`Language`](../type-aliases/Language.md)

A language name, extension or alias (as defined in [language documentations](https://livecodes.io/docs/languages/)).

For the list of supported values, see [Language](https://livecodes.io/docs/api/type-aliases/Language)

#### markup.order?

> `optional` **order**: `number`

The order of the editor in the UI.

##### Default

```ts
0
```

#### markup.position?

> `optional` **position**: [`EditorPosition`](../internal/interfaces/EditorPosition.md)

The initial position of the cursor in the code editor.

##### Example

```ts
{lineNumber: 5, column: 10}
```

#### markup.selector?

> `optional` **selector**: `string`

A CSS selector to load content from [DOM import](https://livecodes.io/docs/features/import#import-code-from-dom).

#### markup.title?

> `optional` **title**: `string`

If set, this is used as the title of the editor in the UI,
overriding the default title set to the language name
(e.g. `"Python"` can be used instead of `"Py (Wasm)"`).

#### md

> **md**: `undefined` \| `string`

#### md-selector

> **md-selector**: `undefined` \| `string`

#### mdown

> **mdown**: `undefined` \| `string`

#### mdown-selector

> **mdown-selector**: `undefined` \| `string`

#### mdx

> **mdx**: `undefined` \| `string`

#### mdx-selector

> **mdx-selector**: `undefined` \| `string`

#### minizinc

> **minizinc**: `undefined` \| `string`

#### minizinc-selector

> **minizinc-selector**: `undefined` \| `string`

#### mjml

> **mjml**: `undefined` \| `string`

#### mjml-selector

> **mjml-selector**: `undefined` \| `string`

#### mjs

> **mjs**: `undefined` \| `string`

#### mjs-selector

> **mjs-selector**: `undefined` \| `string`

#### mkdn

> **mkdn**: `undefined` \| `string`

#### mkdn-selector

> **mkdn-selector**: `undefined` \| `string`

#### ml

> **ml**: `undefined` \| `string`

#### ml-selector

> **ml-selector**: `undefined` \| `string`

#### mli

> **mli**: `undefined` \| `string`

#### mli-selector

> **mli-selector**: `undefined` \| `string`

#### mode?

> `optional` **mode**: `"editor"` \| `"result"` \| `"full"` \| `"focus"` \| `"lite"` \| `"simple"` \| `"codeblock"`

Sets the [display mode](https://livecodes.io/docs/features/display-modes).

##### Default

```ts
"full"
```

#### mts

> **mts**: `undefined` \| `string`

#### mts-selector

> **mts-selector**: `undefined` \| `string`

#### mustache

> **mustache**: `undefined` \| `string`

#### mustache-selector

> **mustache-selector**: `undefined` \| `string`

#### mzn

> **mzn**: `undefined` \| `string`

#### mzn-selector

> **mzn-selector**: `undefined` \| `string`

#### new?

> `optional` **new**: `""`

#### njk

> **njk**: `undefined` \| `string`

#### njk-selector

> **njk-selector**: `undefined` \| `string`

#### no-defaults?

> `optional` **no-defaults**: `boolean`

#### nunjucks

> **nunjucks**: `undefined` \| `string`

#### nunjucks-selector

> **nunjucks-selector**: `undefined` \| `string`

#### ocaml

> **ocaml**: `undefined` \| `string`

#### ocaml-selector

> **ocaml-selector**: `undefined` \| `string`

#### params?

> `optional` **params**: \{ appUrl?: string \| undefined; params?: ... \| undefined; config?: string \| (Partial\<Config\> & string) \| undefined; headless?: boolean \| undefined; import?: string \| undefined; ... 494 more ...; compiled?: "" \| ... 5 more ... \| undefined; \} \| undefined

An object that represents the [URL Query parameters](https://livecodes.io/docs/configuration/query-params), that can be used to configure the playground.

These 2 snippets produce similar output:

```js
import { createPlayground } from 'livecodes';

// use config
createPlayground('#container', {
  config: {
    markup: {
      language: 'markdown',
      content: '# Hello World!',
    },
  },
});

// use params
createPlayground('#container', { params: { md: '# Hello World!' } });
```

#### perl

> **perl**: `undefined` \| `string`

#### perl-selector

> **perl-selector**: `undefined` \| `string`

#### pg

> **pg**: `undefined` \| `string`

#### pg-selector

> **pg-selector**: `undefined` \| `string`

#### pg.sql

> **sql**: `undefined` \| `string`

#### pg.sql-selector

> **sql-selector**: `undefined` \| `string`

#### pglite

> **pglite**: `undefined` \| `string`

#### pglite-selector

> **pglite-selector**: `undefined` \| `string`

#### pglite.sql

> **sql**: `undefined` \| `string`

#### pglite.sql-selector

> **sql-selector**: `undefined` \| `string`

#### pgsql

> **pgsql**: `undefined` \| `string`

#### pgsql-selector

> **pgsql-selector**: `undefined` \| `string`

#### pgsql.sql

> **sql**: `undefined` \| `string`

#### pgsql.sql-selector

> **sql-selector**: `undefined` \| `string`

#### php

> **php**: `undefined` \| `string`

#### php-selector

> **php-selector**: `undefined` \| `string`

#### php-wasm

> **php-wasm**: `undefined` \| `string`

#### php-wasm-selector

> **php-wasm-selector**: `undefined` \| `string`

#### phpwasm

> **phpwasm**: `undefined` \| `string`

#### phpwasm-selector

> **phpwasm-selector**: `undefined` \| `string`

#### pintora

> **pintora**: `undefined` \| `string`

#### pintora-selector

> **pintora-selector**: `undefined` \| `string`

#### pl

> **pl**: `undefined` \| `string`

#### pl-selector

> **pl-selector**: `undefined` \| `string`

#### plt

> **plt**: `undefined` \| `string`

#### plt-selector

> **plt-selector**: `undefined` \| `string`

#### pm

> **pm**: `undefined` \| `string`

#### pm-selector

> **pm-selector**: `undefined` \| `string`

#### postcss

> **postcss**: `undefined` \| `string`

#### postcss-selector

> **postcss-selector**: `undefined` \| `string`

#### postgre.sql

> **sql**: `undefined` \| `string`

#### postgre.sql-selector

> **sql-selector**: `undefined` \| `string`

#### postgres

> **postgres**: `undefined` \| `string`

#### postgres-selector

> **postgres-selector**: `undefined` \| `string`

#### postgresql

> **postgresql**: `undefined` \| `string`

#### postgresql-selector

> **postgresql-selector**: `undefined` \| `string`

#### postgresql.sql

> **sql**: `undefined` \| `string`

#### postgresql.sql-selector

> **sql-selector**: `undefined` \| `string`

#### preview?

> `optional` **preview**: `boolean`

#### processors?

> `optional` **processors**: `string`

#### prolog

> **prolog**: `undefined` \| `string`

#### prolog-selector

> **prolog-selector**: `undefined` \| `string`

#### prolog.pl

> **pl**: `undefined` \| `string`

#### prolog.pl-selector

> **pl-selector**: `undefined` \| `string`

#### pug

> **pug**: `undefined` \| `string`

#### pug-selector

> **pug-selector**: `undefined` \| `string`

#### py

> **py**: `undefined` \| `string`

#### py-selector

> **py-selector**: `undefined` \| `string`

#### py-wasm

> **py-wasm**: `undefined` \| `string`

#### py-wasm-selector

> **py-wasm-selector**: `undefined` \| `string`

#### py3

> **py3**: `undefined` \| `string`

#### py3-selector

> **py3-selector**: `undefined` \| `string`

#### pyodide

> **pyodide**: `undefined` \| `string`

#### pyodide-selector

> **pyodide-selector**: `undefined` \| `string`

#### python

> **python**: `undefined` \| `string`

#### python-selector

> **python-selector**: `undefined` \| `string`

#### python-wasm

> **python-wasm**: `undefined` \| `string`

#### python-wasm-selector

> **python-wasm-selector**: `undefined` \| `string`

#### pythonwasm

> **pythonwasm**: `undefined` \| `string`

#### pythonwasm-selector

> **pythonwasm-selector**: `undefined` \| `string`

#### pywasm

> **pywasm**: `undefined` \| `string`

#### pywasm-selector

> **pywasm-selector**: `undefined` \| `string`

#### r

> **r**: `undefined` \| `string`

#### r-selector

> **r-selector**: `undefined` \| `string`

#### r-wasm

> **r-wasm**: `undefined` \| `string`

#### r-wasm-selector

> **r-wasm-selector**: `undefined` \| `string`

#### raw?

> `optional` **raw**: [`Language`](../type-aliases/Language.md)

#### rb

> **rb**: `undefined` \| `string`

#### rb-selector

> **rb-selector**: `undefined` \| `string`

#### re

> **re**: `undefined` \| `string`

#### re-selector

> **re-selector**: `undefined` \| `string`

#### react

> **react**: `undefined` \| `string`

#### react-jsx

> **react-jsx**: `undefined` \| `string`

#### react-jsx-selector

> **react-jsx-selector**: `undefined` \| `string`

#### react-native

> **react-native**: `undefined` \| `string`

#### react-native-selector

> **react-native-selector**: `undefined` \| `string`

#### react-native-tsx

> **react-native-tsx**: `undefined` \| `string`

#### react-native-tsx-selector

> **react-native-tsx-selector**: `undefined` \| `string`

#### react-native.jsx

> **jsx**: `undefined` \| `string`

#### react-native.jsx-selector

> **jsx-selector**: `undefined` \| `string`

#### react-native.tsx

> **tsx**: `undefined` \| `string`

#### react-native.tsx-selector

> **tsx-selector**: `undefined` \| `string`

#### react-selector

> **react-selector**: `undefined` \| `string`

#### react-tsx

> **react-tsx**: `undefined` \| `string`

#### react-tsx-selector

> **react-tsx-selector**: `undefined` \| `string`

#### react.jsx

> **jsx**: `undefined` \| `string`

#### react.jsx-selector

> **jsx-selector**: `undefined` \| `string`

#### react.tsx

> **tsx**: `undefined` \| `string`

#### react.tsx-selector

> **tsx-selector**: `undefined` \| `string`

#### readonly?

> `optional` **readonly**: `boolean`

If `true`, editors are loaded in read-only mode, where the user is not allowed to change the code.

By default, when readonly is set to true, the light-weight code editor [CodeJar](https://livecodes.io/docs/features/editor-settings#code-editor) is used.
If you wish to use another editor, set the [editor](https://livecodes.io/docs/configuration/configuration-object#editor) property.

##### Default

```ts
false
```

#### reason

> **reason**: `undefined` \| `string`

#### reason-selector

> **reason-selector**: `undefined` \| `string`

#### recoverUnsaved?

> `optional` **recoverUnsaved**: `boolean`

Enables [recovering last unsaved project](https://livecodes.io/docs/features/recover) when the app is reopened.

##### Default

```ts
true
```

#### rei

> **rei**: `undefined` \| `string`

#### rei-selector

> **rei-selector**: `undefined` \| `string`

#### res

> **res**: `undefined` \| `string`

#### res-selector

> **res-selector**: `undefined` \| `string`

#### rescript

> **rescript**: `undefined` \| `string`

#### rescript-selector

> **rescript-selector**: `undefined` \| `string`

#### resi

> **resi**: `undefined` \| `string`

#### resi-selector

> **resi-selector**: `undefined` \| `string`

#### rich

> **rich**: `undefined` \| `string`

#### rich-selector

> **rich-selector**: `undefined` \| `string`

#### richtext

> **richtext**: `undefined` \| `string`

#### richtext-selector

> **richtext-selector**: `undefined` \| `string`

#### riot

> **riot**: `undefined` \| `string`

#### riot-selector

> **riot-selector**: `undefined` \| `string`

#### riotjs

> **riotjs**: `undefined` \| `string`

#### riotjs-selector

> **riotjs-selector**: `undefined` \| `string`

#### ripple

> **ripple**: `undefined` \| `string`

#### ripple-selector

> **ripple-selector**: `undefined` \| `string`

#### ripplejs

> **ripplejs**: `undefined` \| `string`

#### ripplejs-selector

> **ripplejs-selector**: `undefined` \| `string`

#### rlang

> **rlang**: `undefined` \| `string`

#### rlang-selector

> **rlang-selector**: `undefined` \| `string`

#### rstats

> **rstats**: `undefined` \| `string`

#### rstats-selector

> **rstats-selector**: `undefined` \| `string`

#### rte

> **rte**: `undefined` \| `string`

#### rte-selector

> **rte-selector**: `undefined` \| `string`

#### rte.html

> **html**: `undefined` \| `string`

#### rte.html-selector

> **html-selector**: `undefined` \| `string`

#### ruby

> **ruby**: `undefined` \| `string`

#### ruby-selector

> **ruby-selector**: `undefined` \| `string`

#### ruby-wasm

> **ruby-wasm**: `undefined` \| `string`

#### ruby-wasm-selector

> **ruby-wasm-selector**: `undefined` \| `string`

#### rubywasm

> **rubywasm**: `undefined` \| `string`

#### rubywasm-selector

> **rubywasm-selector**: `undefined` \| `string`

#### sass

> **sass**: `undefined` \| `string`

#### sass-selector

> **sass-selector**: `undefined` \| `string`

#### scheme

> **scheme**: `undefined` \| `string`

#### scheme-selector

> **scheme-selector**: `undefined` \| `string`

#### scm

> **scm**: `undefined` \| `string`

#### scm-selector

> **scm-selector**: `undefined` \| `string`

#### screen?

> `optional` **screen**: `"open"` \| `"welcome"` \| `"import"` \| `"new"` \| `"embed"` \| `"login"` \| `"info"` \| `"assets"` \| `"add-asset"` \| `"snippets"` \| `"add-snippet"` \| `"resources"` \| `"share"` \| `"deploy"` \| `"sync"` \| `"backup"` \| `"broadcast"` \| `"about"` \| `"custom-settings"` \| `"editor-settings"` \| `"code-to-image"` \| `"test-editor"` \| `"keyboard-shortcuts"`

#### script?

> `optional` **script**: `object`

An object that configures the language and content of the script editor.

See [docs](https://livecodes.io/docs/configuration/configuration-object/#markup) for details.

##### Default

```ts
{ language: "javascript", content: "" }
```

#### script.content?

> `optional` **content**: `string`

The initial content of the code editor.

##### Default

```ts
""
```

#### script.contentUrl?

> `optional` **contentUrl**: `string`

A URL to load `content` from. It has to be a valid URL that is CORS-enabled.

The URL is only fetched if `content` property had no value.

#### script.foldedLines?

> `optional` **foldedLines**: `object`[]

Lines that get folded when the editor loads.

This can be used for less relevant content.

##### Example

```ts
[{ from: 5, to: 8 }, { from: 15, to: 20 }]
```

#### script.hiddenContent?

> `optional` **hiddenContent**: `string`

Hidden content that gets evaluated without being visible in the code editor.

This can be useful in embedded playgrounds (e.g. for adding helper functions, utilities or tests)

#### script.hiddenContentUrl?

> `optional` **hiddenContentUrl**: `string`

A URL to load `hiddenContent` from. It has to be a valid URL that is CORS-enabled.

The URL is only fetched if `hiddenContent` property had no value.

#### script.hideTitle?

> `optional` **hideTitle**: `boolean`

If `true`, the title of the code editor is hidden, however its code is still evaluated.

This can be useful in embedded playgrounds (e.g. for hiding unnecessary code).

#### script.language

> **language**: [`Language`](../type-aliases/Language.md)

A language name, extension or alias (as defined in [language documentations](https://livecodes.io/docs/languages/)).

For the list of supported values, see [Language](https://livecodes.io/docs/api/type-aliases/Language)

#### script.order?

> `optional` **order**: `number`

The order of the editor in the UI.

##### Default

```ts
0
```

#### script.position?

> `optional` **position**: [`EditorPosition`](../internal/interfaces/EditorPosition.md)

The initial position of the cursor in the code editor.

##### Example

```ts
{lineNumber: 5, column: 10}
```

#### script.selector?

> `optional` **selector**: `string`

A CSS selector to load content from [DOM import](https://livecodes.io/docs/features/import#import-code-from-dom).

#### script.title?

> `optional` **title**: `string`

If set, this is used as the title of the editor in the UI,
overriding the default title set to the language name
(e.g. `"Python"` can be used instead of `"Py (Wasm)"`).

#### scripts?

> `optional` **scripts**: `string`

#### scrollPosition?

> `optional` **scrollPosition**: `boolean`

#### scss

> **scss**: `undefined` \| `string`

#### scss-selector

> **scss-selector**: `undefined` \| `string`

#### sdkVersion?

> `optional` **sdkVersion**: `string`

#### semicolons?

> `optional` **semicolons**: `boolean`

Configures Prettier [code formatter](https://livecodes.io/docs/features/code-format) to use semi-colons.

##### Default

```ts
true
```

#### showSpacing?

> `optional` **showSpacing**: `boolean`

Enables [showing element spacing](https://livecodes.io/docs/features/result#show-spacings) in the result page.

##### Default

```ts
false
```

#### singleQuote?

> `optional` **singleQuote**: `boolean`

Configures Prettier [code formatter](https://livecodes.io/docs/features/code-format) to use single quotes instead of double quotes.

##### Default

```ts
false
```

#### solid

> **solid**: `undefined` \| `string`

#### solid-selector

> **solid-selector**: `undefined` \| `string`

#### solid.jsx

> **jsx**: `undefined` \| `string`

#### solid.jsx-selector

> **jsx-selector**: `undefined` \| `string`

#### solid.tsx

> **tsx**: `undefined` \| `string`

#### solid.tsx-selector

> **tsx-selector**: `undefined` \| `string`

#### sql

> **sql**: `undefined` \| `string`

#### sql-selector

> **sql-selector**: `undefined` \| `string`

#### sqlite

> **sqlite**: `undefined` \| `string`

#### sqlite-selector

> **sqlite-selector**: `undefined` \| `string`

#### sqlite3

> **sqlite3**: `undefined` \| `string`

#### sqlite3-selector

> **sqlite3-selector**: `undefined` \| `string`

#### stencil

> **stencil**: `undefined` \| `string`

#### stencil-selector

> **stencil-selector**: `undefined` \| `string`

#### stencil.tsx

> **tsx**: `undefined` \| `string`

#### stencil.tsx-selector

> **tsx-selector**: `undefined` \| `string`

#### styl

> **styl**: `undefined` \| `string`

#### styl-selector

> **styl-selector**: `undefined` \| `string`

#### style?

> `optional` **style**: `object`

An object that configures the language and content of the style editor.

See [docs](https://livecodes.io/docs/configuration/configuration-object/#markup) for details.

##### Default

```ts
{ language: "css", content: "" }
```

#### style.content?

> `optional` **content**: `string`

The initial content of the code editor.

##### Default

```ts
""
```

#### style.contentUrl?

> `optional` **contentUrl**: `string`

A URL to load `content` from. It has to be a valid URL that is CORS-enabled.

The URL is only fetched if `content` property had no value.

#### style.foldedLines?

> `optional` **foldedLines**: `object`[]

Lines that get folded when the editor loads.

This can be used for less relevant content.

##### Example

```ts
[{ from: 5, to: 8 }, { from: 15, to: 20 }]
```

#### style.hiddenContent?

> `optional` **hiddenContent**: `string`

Hidden content that gets evaluated without being visible in the code editor.

This can be useful in embedded playgrounds (e.g. for adding helper functions, utilities or tests)

#### style.hiddenContentUrl?

> `optional` **hiddenContentUrl**: `string`

A URL to load `hiddenContent` from. It has to be a valid URL that is CORS-enabled.

The URL is only fetched if `hiddenContent` property had no value.

#### style.hideTitle?

> `optional` **hideTitle**: `boolean`

If `true`, the title of the code editor is hidden, however its code is still evaluated.

This can be useful in embedded playgrounds (e.g. for hiding unnecessary code).

#### style.language

> **language**: [`Language`](../type-aliases/Language.md)

A language name, extension or alias (as defined in [language documentations](https://livecodes.io/docs/languages/)).

For the list of supported values, see [Language](https://livecodes.io/docs/api/type-aliases/Language)

#### style.order?

> `optional` **order**: `number`

The order of the editor in the UI.

##### Default

```ts
0
```

#### style.position?

> `optional` **position**: [`EditorPosition`](../internal/interfaces/EditorPosition.md)

The initial position of the cursor in the code editor.

##### Example

```ts
{lineNumber: 5, column: 10}
```

#### style.selector?

> `optional` **selector**: `string`

A CSS selector to load content from [DOM import](https://livecodes.io/docs/features/import#import-code-from-dom).

#### style.title?

> `optional` **title**: `string`

If set, this is used as the title of the editor in the UI,
overriding the default title set to the language name
(e.g. `"Python"` can be used instead of `"Py (Wasm)"`).

#### stylesheets?

> `optional` **stylesheets**: `string`

#### stylis

> **stylis**: `undefined` \| `string`

#### stylis-selector

> **stylis-selector**: `undefined` \| `string`

#### stylus

> **stylus**: `undefined` \| `string`

#### stylus-selector

> **stylus-selector**: `undefined` \| `string`

#### sucrase

> **sucrase**: `undefined` \| `string`

#### sucrase-selector

> **sucrase-selector**: `undefined` \| `string`

#### svelte

> **svelte**: `undefined` \| `string`

#### svelte-app

> **svelte-app**: `undefined` \| `string`

#### svelte-app-selector

> **svelte-app-selector**: `undefined` \| `string`

#### svelte-selector

> **svelte-selector**: `undefined` \| `string`

#### tabSize?

> `optional` **tabSize**: `number`

The number of spaces per indentation-level.

Also used in [code formatting](https://livecodes.io/docs/features/code-format).

##### Default

```ts
2
```

#### tags?

> `optional` **tags**: `string` \| `string`[]

#### tcl

> **tcl**: `undefined` \| `string`

#### tcl-selector

> **tcl-selector**: `undefined` \| `string`

#### teal

> **teal**: `undefined` \| `string`

#### teal-selector

> **teal-selector**: `undefined` \| `string`

#### template?

> `optional` **template**: [`TemplateName`](../internal/type-aliases/TemplateName.md)

A [starter template](https://livecodes.io/docs/features/templates) to load.
Allowed valued can be found [here](https://livecodes.io/docs/api/internal/type-aliases/TemplateName).

#### tests?

> `optional` **tests**: (\{ language?: Language \| undefined; content?: string \| undefined; contentUrl?: string \| undefined; hiddenContent?: string \| undefined; hiddenContentUrl?: string \| undefined; ... 5 more ...; position?: EditorPosition \| undefined; \} \| undefined) & ("" \| ... 4 more ... \| "true")

Configures the [language](https://livecodes.io/docs/features/tests#supported-languages)
and content of [tests](https://livecodes.io/docs/features/tests).

#### theme?

> `optional` **theme**: [`Theme`](../internal/type-aliases/Theme.md)

Sets the app [theme](https://livecodes.io/docs/features/themes) to light/dark mode.

##### Default

```ts
"dark"
```

#### themeColor?

> `optional` **themeColor**: `string`

Sets the app theme color.
If `undefined`, it is set to `"hsl(214, 40%, 50%)"`.

##### Default

```ts
undefined
```

#### title?

> `optional` **title**: `string`

Project title.
This is used as [result page](https://livecodes.io/docs/features/result) title and title meta tag.
Also used in project search.

##### Default

```ts
"Untitled Project"
```

#### tl

> **tl**: `undefined` \| `string`

#### tl-selector

> **tl-selector**: `undefined` \| `string`

#### tools?

> `optional` **tools**: `"full"` \| `"console"` \| `"compiled"` \| `"tests"` \| `"closed"` \| `"open"` \| `"none"` \| "console\|undefined" \| "console\|" \| "console\|full" \| "console\|closed" \| "console\|open" \| "console\|none" \| "compiled\|undefined" \| "compiled\|" \| "compiled\|full" \| "compiled\|closed" \| "compiled\|open" \| "compiled\|none" \| "tests\|undefined" \| "tests\|" \| "tests\|full" \| "tests\|closed" \| "tests\|open" \| "tests\|none" \| "console,console\|undefined" \| "console,console\|" \| "console,console\|full" \| "console,console\|closed" \| "console,console\|open" \| "console,console\|none" \| "console,compiled\|undefined" \| "console,compiled\|" \| "console,compiled\|full" \| "console,compiled\|closed" \| "console,compiled\|open" \| "console,compiled\|none" \| "console,tests\|undefined" \| "console,tests\|" \| "console,tests\|full" \| "console,tests\|closed" \| "console,tests\|open" \| "console,tests\|none" \| "compiled,console\|undefined" \| "compiled,console\|" \| "compiled,console\|full" \| "compiled,console\|closed" \| "compiled,console\|open" \| "compiled,console\|none" \| "compiled,compiled\|undefined" \| "compiled,compiled\|" \| "compiled,compiled\|full" \| "compiled,compiled\|closed" \| "compiled,compiled\|open" \| "compiled,compiled\|none" \| "compiled,tests\|undefined" \| "compiled,tests\|" \| "compiled,tests\|full" \| "compiled,tests\|closed" \| "compiled,tests\|open" \| "compiled,tests\|none" \| "tests,console\|undefined" \| "tests,console\|" \| "tests,console\|full" \| "tests,console\|closed" \| "tests,console\|open" \| "tests,console\|none" \| "tests,compiled\|undefined" \| "tests,compiled\|" \| "tests,compiled\|full" \| "tests,compiled\|closed" \| "tests,compiled\|open" \| "tests,compiled\|none" \| "tests,tests\|undefined" \| "tests,tests\|" \| "tests,tests\|full" \| "tests,tests\|closed" \| "tests,tests\|open" \| "tests,tests\|none" \| "console,console,console\|undefined" \| "console,console,console\|" \| "console,console,console\|full" \| "console,console,console\|closed" \| "console,console,console\|open" \| "console,console,console\|none" \| "console,console,compiled\|undefined" \| "console,console,compiled\|" \| "console,console,compiled\|full" \| "console,console,compiled\|closed" \| "console,console,compiled\|open" \| "console,console,compiled\|none" \| "console,console,tests\|undefined" \| "console,console,tests\|" \| "console,console,tests\|full" \| "console,console,tests\|closed" \| "console,console,tests\|open" \| "console,console,tests\|none" \| "console,compiled,console\|undefined" \| "console,compiled,console\|" \| "console,compiled,console\|full" \| "console,compiled,console\|closed" \| "console,compiled,console\|open" \| "console,compiled,console\|none" \| "console,compiled,compiled\|undefined" \| "console,compiled,compiled\|" \| "console,compiled,compiled\|full" \| "console,compiled,compiled\|closed" \| "console,compiled,compiled\|open" \| "console,compiled,compiled\|none" \| "console,compiled,tests\|undefined" \| "console,compiled,tests\|" \| "console,compiled,tests\|full" \| "console,compiled,tests\|closed" \| "console,compiled,tests\|open" \| "console,compiled,tests\|none" \| "console,tests,console\|undefined" \| "console,tests,console\|" \| "console,tests,console\|full" \| "console,tests,console\|closed" \| "console,tests,console\|open" \| "console,tests,console\|none" \| "console,tests,compiled\|undefined" \| "console,tests,compiled\|" \| "console,tests,compiled\|full" \| "console,tests,compiled\|closed" \| "console,tests,compiled\|open" \| "console,tests,compiled\|none" \| "console,tests,tests\|undefined" \| "console,tests,tests\|" \| "console,tests,tests\|full" \| "console,tests,tests\|closed" \| "console,tests,tests\|open" \| "console,tests,tests\|none" \| "compiled,console,console\|undefined" \| "compiled,console,console\|" \| "compiled,console,console\|full" \| "compiled,console,console\|closed" \| "compiled,console,console\|open" \| "compiled,console,console\|none" \| "compiled,console,compiled\|undefined" \| "compiled,console,compiled\|" \| "compiled,console,compiled\|full" \| "compiled,console,compiled\|closed" \| "compiled,console,compiled\|open" \| "compiled,console,compiled\|none" \| "compiled,console,tests\|undefined" \| "compiled,console,tests\|" \| "compiled,console,tests\|full" \| "compiled,console,tests\|closed" \| "compiled,console,tests\|open" \| "compiled,console,tests\|none" \| "compiled,compiled,console\|undefined" \| "compiled,compiled,console\|" \| "compiled,compiled,console\|full" \| "compiled,compiled,console\|closed" \| "compiled,compiled,console\|open" \| "compiled,compiled,console\|none" \| "compiled,compiled,compiled\|undefined" \| "compiled,compiled,compiled\|" \| "compiled,compiled,compiled\|full" \| "compiled,compiled,compiled\|closed" \| "compiled,compiled,compiled\|open" \| "compiled,compiled,compiled\|none" \| "compiled,compiled,tests\|undefined" \| "compiled,compiled,tests\|" \| "compiled,compiled,tests\|full" \| "compiled,compiled,tests\|closed" \| "compiled,compiled,tests\|open" \| "compiled,compiled,tests\|none" \| "compiled,tests,console\|undefined" \| "compiled,tests,console\|" \| "compiled,tests,console\|full" \| "compiled,tests,console\|closed" \| "compiled,tests,console\|open" \| "compiled,tests,console\|none" \| "compiled,tests,compiled\|undefined" \| "compiled,tests,compiled\|" \| "compiled,tests,compiled\|full" \| "compiled,tests,compiled\|closed" \| "compiled,tests,compiled\|open" \| "compiled,tests,compiled\|none" \| "compiled,tests,tests\|undefined" \| "compiled,tests,tests\|" \| "compiled,tests,tests\|full" \| "compiled,tests,tests\|closed" \| "compiled,tests,tests\|open" \| "compiled,tests,tests\|none" \| "tests,console,console\|undefined" \| "tests,console,console\|" \| "tests,console,console\|full" \| "tests,console,console\|closed" \| "tests,console,console\|open" \| "tests,console,console\|none" \| "tests,console,compiled\|undefined" \| "tests,console,compiled\|" \| "tests,console,compiled\|full" \| "tests,console,compiled\|closed" \| "tests,console,compiled\|open" \| "tests,console,compiled\|none" \| "tests,console,tests\|undefined" \| "tests,console,tests\|" \| "tests,console,tests\|full" \| "tests,console,tests\|closed" \| "tests,console,tests\|open" \| "tests,console,tests\|none" \| "tests,compiled,console\|undefined" \| "tests,compiled,console\|" \| "tests,compiled,console\|full" \| "tests,compiled,console\|closed" \| "tests,compiled,console\|open" \| "tests,compiled,console\|none" \| "tests,compiled,compiled\|undefined" \| "tests,compiled,compiled\|" \| "tests,compiled,compiled\|full" \| "tests,compiled,compiled\|closed" \| "tests,compiled,compiled\|open" \| "tests,compiled,compiled\|none" \| "tests,compiled,tests\|undefined" \| "tests,compiled,tests\|" \| "tests,compiled,tests\|full" \| "tests,compiled,tests\|closed" \| "tests,compiled,tests\|open" \| "tests,compiled,tests\|none" \| "tests,tests,console\|undefined" \| "tests,tests,console\|" \| "tests,tests,console\|full" \| "tests,tests,console\|closed" \| "tests,tests,console\|open" \| "tests,tests,console\|none" \| "tests,tests,compiled\|undefined" \| "tests,tests,compiled\|" \| "tests,tests,compiled\|full" \| "tests,tests,compiled\|closed" \| "tests,tests,compiled\|open" \| "tests,tests,compiled\|none" \| "tests,tests,tests\|undefined" \| "tests,tests,tests\|" \| "tests,tests,tests\|full" \| "tests,tests,tests\|closed" \| "tests,tests,tests\|open" \| "tests,tests,tests\|none"

#### trailingComma?

> `optional` **trailingComma**: `boolean`

Configures Prettier [code formatter](https://livecodes.io/docs/features/code-format) to use [trailing commas](https://prettier.io/docs/en/options.html#trailing-commas).

##### Default

```ts
true
```

#### ts

> **ts**: `undefined` \| `string`

#### ts-selector

> **ts-selector**: `undefined` \| `string`

#### tsx

> **tsx**: `undefined` \| `string`

#### tsx-selector

> **tsx-selector**: `undefined` \| `string`

#### twig

> **twig**: `undefined` \| `string`

#### twig-selector

> **twig-selector**: `undefined` \| `string`

#### types?

> `optional` **types**: `object`

Allows providing custom TypeScript type declarations for better [editor intellisense](https://livecodes.io/docs/features/intellisense).

It is an object where each key represents module name and value represents the types.

See docs for [Types](https://livecodes.io/docs/configuration/configuration-object#types)
and [Custom Types](https://livecodes.io/docs/features/intellisense#custom-types)

##### Examples

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

#### typescript

> **typescript**: `undefined` \| `string`

#### typescript-selector

> **typescript-selector**: `undefined` \| `string`

#### useTabs?

> `optional` **useTabs**: `boolean`

If `true`, lines are indented with tabs instead of spaces.

Also used in [code formatting](https://livecodes.io/docs/features/code-format).

##### Default

```ts
false
```

#### vento

> **vento**: `undefined` \| `string`

#### vento-selector

> **vento-selector**: `undefined` \| `string`

#### version?

> `readonly` `optional` **version**: `string`

This is a read-only property which specifies the current LiveCodes version.

Version specified in [exported](https://livecodes.io/docs/features/export) projects allows automatically upgrading the project configuration when imported by an app with a newer version.

#### ~~view?~~

> `optional` **view**: `"split"` \| `"editor"` \| `"result"`

##### Deprecated

The `view` option has been moved to `config.view`.
For headless mode use `headless: true`.

The [default view](https://livecodes.io/docs/features/default-view) for the playground.

When set to `"headless"`, the playground is loaded in [headless mode](https://livecodes.io/docs/sdk/headless).

##### Default

```ts
"split"
```

#### vto

> **vto**: `undefined` \| `string`

#### vto-selector

> **vto-selector**: `undefined` \| `string`

#### vue

> **vue**: `undefined` \| `string`

#### vue-app

> **vue-app**: `undefined` \| `string`

#### vue-app-selector

> **vue-app-selector**: `undefined` \| `string`

#### vue-selector

> **vue-selector**: `undefined` \| `string`

#### vue2

> **vue2**: `undefined` \| `string`

#### vue2-selector

> **vue2-selector**: `undefined` \| `string`

#### vue3

> **vue3**: `undefined` \| `string`

#### vue3-selector

> **vue3-selector**: `undefined` \| `string`

#### wasm

> **wasm**: `undefined` \| `string`

#### wasm-selector

> **wasm-selector**: `undefined` \| `string`

#### wasm.cpp

> **cpp**: `undefined` \| `string`

#### wasm.cpp-selector

> **cpp-selector**: `undefined` \| `string`

#### wasm.cs

> **cs**: `undefined` \| `string`

#### wasm.cs-selector

> **cs-selector**: `undefined` \| `string`

#### wasm.go

> **go**: `undefined` \| `string`

#### wasm.go-selector

> **go-selector**: `undefined` \| `string`

#### wasm.lua

> **lua**: `undefined` \| `string`

#### wasm.lua-selector

> **lua-selector**: `undefined` \| `string`

#### wasm.php

> **php**: `undefined` \| `string`

#### wasm.php-selector

> **php-selector**: `undefined` \| `string`

#### wasm.py

> **py**: `undefined` \| `string`

#### wasm.py-selector

> **py-selector**: `undefined` \| `string`

#### wasm.rb

> **rb**: `undefined` \| `string`

#### wasm.rb-selector

> **rb-selector**: `undefined` \| `string`

#### wast

> **wast**: `undefined` \| `string`

#### wast-selector

> **wast-selector**: `undefined` \| `string`

#### wat

> **wat**: `undefined` \| `string`

#### wat-selector

> **wat-selector**: `undefined` \| `string`

#### webassembly

> **webassembly**: `undefined` \| `string`

#### webassembly-selector

> **webassembly-selector**: `undefined` \| `string`

#### welcome?

> `optional` **welcome**: `boolean`

If `true`, the [welcome screen](https://livecodes.io/docs/features/welcome) is displayed when the app loads.

#### wordWrap?

> `optional` **wordWrap**: `boolean`

Enables word-wrap for long lines.

##### Default

```ts
false
```

#### x?

> `optional` **x**: `string`

#### xht

> **xht**: `undefined` \| `string`

#### xht-selector

> **xht-selector**: `undefined` \| `string`

#### xml

> **xml**: `undefined` \| `string`

#### xml-selector

> **xml-selector**: `undefined` \| `string`

#### zoom?

> `optional` **zoom**: `1` \| `0.5` \| `0.25`

Sets result page [zoom level](https://livecodes.io/docs/features/result#result-page-zoom).

#### Defined in

[models.ts:338](https://github.com/live-codes/livecodes/blob/61a0396afe9816818482c9e42c3ba23295ad3520/src/sdk/models.ts#L338)

***

### template?

> `optional` **template**: [`TemplateName`](../internal/type-aliases/TemplateName.md)

A [starter template](https://livecodes.io/docs/features/templates) to load.
Allowed valued can be found [here](https://livecodes.io/docs/api/internal/type-aliases/TemplateName).

#### Defined in

[models.ts:383](https://github.com/live-codes/livecodes/blob/61a0396afe9816818482c9e42c3ba23295ad3520/src/sdk/models.ts#L383)

***

### ~~view?~~

> `optional` **view**: `"split"` \| `"editor"` \| `"result"` \| `"headless"`

#### Deprecated

The `view` option has been moved to `config.view`.
For headless mode use `headless: true`.

The [default view](https://livecodes.io/docs/features/default-view) for the playground.

When set to `"headless"`, the playground is loaded in [headless mode](https://livecodes.io/docs/sdk/headless).

#### Default

```ts
"split"
```

#### Defined in

[models.ts:396](https://github.com/live-codes/livecodes/blob/61a0396afe9816818482c9e42c3ba23295ad3520/src/sdk/models.ts#L396)