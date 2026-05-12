# Language Reference

Complete reference for all supported languages, aliases, and extensions in LiveCodes.

## Language Assignment

Languages are assigned to editors:

| Editor   | Languages                                        |
| -------- | ------------------------------------------------ |
| `markup` | HTML, Markdown, template languages, diagrams     |
| `style`  | CSS, preprocessors (SCSS, Less, Stylus)          |
| `script` | JavaScript, TypeScript, compiled languages, WASM |

## Markup Languages

| Name         | Aliases & Extensions                  | Notes                   |
| ------------ | ------------------------------------- | ----------------------- |
| HTML         | `html`, `htm`                         | Default markup language |
| Markdown     | `markdown`, `md`, `mdown`, `mkdn`     | Compiles to HTML        |
| MDX          | `mdx`                                 | Markdown + JSX          |
| Astro        | `astro`                               | Astro SFC               |
| Pug          | `pug`, `jade`                         | Template engine         |
| Haml         | `haml`                                | Template engine         |
| AsciiDoc     | `asciidoc`, `adoc`, `asc`             | Documentation format    |
| Handlebars   | `handlebars`, `hbs`, `mustache`       | Template engine         |
| EJS          | `ejs`                                 | Embedded JavaScript     |
| Eta          | `eta`                                 | Template engine         |
| Nunjucks     | `nunjucks`, `njk`                     | Template engine         |
| Liquid       | `liquid`, `liquidjs`                  | Template engine         |
| Dot          | `dot`                                 | Template engine         |
| Twig         | `twig`                                | Template engine         |
| Vento        | `vento`, `vto`                        | Template engine         |
| Art-template | `art-template`, `art`                 | Template engine         |
| Jinja        | `jinja`                               | Template engine         |
| BBCode       | `bbcode`, `bb`                        | Forum markup            |
| MJML         | `mjml`                                | Email templates         |
| Diagrams     | `diagrams`, `diagram`, `graph`, `plt` | Graphviz, Mermaid, etc. |
| Rich Text    | `richtext`, `rte`, `rich`, `rte.html` | WYSIWYG editor          |
| Blockly      | `blockly`, `blockly.xml`              | Visual programming      |

## Style Languages

| Name    | Aliases & Extensions | Notes                                      |
| ------- | -------------------- | ------------------------------------------ |
| CSS     | `css`                | Default style language                     |
| SCSS    | `scss`               | Sass (SCSS syntax)                         |
| Sass    | `sass`               | Sass (indented syntax)                     |
| Less    | `less`               | CSS preprocessor                           |
| Stylus  | `stylus`, `styl`     | CSS preprocessor                           |
| Stylis  | `stylis`             | CSS preprocessor                           |
| PostCSS | `postcss`            | CSS processor (no default transformations) |

### CSS Processors

Enabled via `processors` config:

| Processor          | Description            |
| ------------------ | ---------------------- |
| `tailwindcss`      | Tailwind CSS framework |
| `windicss`         | Windi CSS framework    |
| `unocss`           | UnoCSS atomic CSS      |
| `tokencss`         | Design tokens          |
| `lightningcss`     | Fast CSS processing    |
| `autoprefixer`     | Vendor prefixes        |
| `postcssPresetEnv` | Future CSS features    |
| `cssmodules`       | Scoped CSS             |
| `purgecss`         | Remove unused CSS      |
| `cssnano`          | CSS minification       |

## Script Languages

### JavaScript & TypeScript

| Name             | Aliases                                                | Notes                  |
| ---------------- | ------------------------------------------------------ | ---------------------- |
| JavaScript       | `javascript`, `js`, `mjs`                              | ES modules by default  |
| TypeScript       | `typescript`, `ts`, `mts`                              | Compiles to JavaScript |
| JSX              | `jsx`, `react`                                         | React JSX              |
| TSX              | `tsx`, `react-tsx`, `react.tsx`                        | React TSX              |
| React Native JSX | `react-native`, `react-native.jsx`, `react-native-tsx` | React Native           |
| Babel            | `babel`, `es`                                          | Babel transpilation    |
| Sucrase          | `sucrase`                                              | Fast TypeScript/JSX    |
| Flow             | `flow`                                                 | Flow type checker      |
| CoffeeScript     | `coffeescript`, `coffee`                               | Compiles to JS         |
| LiveScript       | `livescript`, `ls`                                     | Compiles to JS         |
| Civet            | `civet`                                                | TypeScript alternative |
| Clio             | `clio`                                                 | Functional language    |
| Imba             | `imba`                                                 | Compiles to JS         |
| AssemblyScript   | `assemblyscript`, `as`                                 | Compiles to WASM       |
| Rescript         | `rescript`, `res`, `resi`                              | Compiles to JS         |
| Reason           | `reason`, `re`, `rei`                                  | Compiles to JS         |
| OCaml            | `ocaml`, `ml`, `mli`                                   | Compiles to JS         |

### Framework Compilation

| Name    | Aliases                              | Notes              |
| ------- | ------------------------------------ | ------------------ |
| Vue     | `vue`, `vue3`, `vue-app`, `app.vue`  | Vue SFC            |
| Vue 2   | `vue2`                               | Vue 2 SFC          |
| Svelte  | `svelte`, `svelte-app`, `app.svelte` | Svelte SFC         |
| Solid   | `solid`, `solid.jsx`, `solid.tsx`    | Solid components   |
| Stencil | `stencil`, `stencil.tsx`             | Stencil components |
| Riot    | `riot`, `riotjs`                     | Riot components    |
| Malina  | `malina`, `malinajs`                 | Malina components  |
| Ripple  | `ripple`, `ripplejs`                 | Ripple components  |
| Angular | `angular`                            | Angular components |

### Backend Languages

| Name          | Aliases                                   | Notes                   |
| ------------- | ----------------------------------------- | ----------------------- |
| Python        | `python`, `py`                            | Brython (Python -> JS)  |
| Python (Wasm) | `pyodide`, `python-wasm`, `py-wasm`       | Pyodide runtime (~15MB) |
| Ruby          | `ruby`, `rb`                              | Opal (Ruby -> JS)       |
| Ruby (Wasm)   | `ruby-wasm`, `wasm.rb`                    | Ruby WASM               |
| Go            | `go`, `golang`                            | Gopherjs (Go -> JS)     |
| Go (Wasm)     | `go-wasm`, `wasm.go`                      | Go WASM                 |
| PHP           | `php`                                     | Uniter (PHP -> JS)      |
| PHP           | `php`, `php-wasm`, `wasm.php`             | PHP WASM                |
| C++           | `cpp`, `c`, `cpp-wasm`, `wasm.cpp`        | Clang WASM              |
| Java          | `java`                                    | Java runtime            |
| C#            | `csharp-wasm`, `cs`, `cs-wasm`, `wasm.cs` | C# WASM                 |
| R             | `r`, `rlang`, `rstats`, `r-wasm`          | R WASM                  |
| Lua           | `lua`, `lua-wasm`, `luawasm`, `wasm.lua`  | Lua WASM                |
| Teal          | `teal`, `tl`                              | Typed Lua               |
| Fennel        | `fennel`, `fnl`                           | Lua lisp                |
| Julia         | `julia`, `jl`                             | Julia runtime           |
| Scheme        | `scheme`, `scm`                           | BiwaScheme              |
| Common Lisp   | `commonlisp`, `common-lisp`, `lisp`       | Common Lisp             |
| ClojureScript | `clojurescript`, `clojure`, `cljs`, `clj` | Clojure                 |
| Perl          | `perl`, `pl`, `pm`                        | Perl runtime            |
| Gleam         | `gleam`                                   | Gleam language          |
| Tcl           | `tcl`                                     | Tcl interpreter         |
| WebAssembly   | `wat`, `wast`, `wasm`, `webassembly`      | WAT format              |

### Data & Logic Languages

| Name       | Aliases                                                      | Notes               |
| ---------- | ------------------------------------------------------------ | ------------------- |
| SQL        | `sql`, `sqlite`, `sqlite3`                                   | SQLite in browser   |
| PostgreSQL | `pg.sql`, `pgsql.sql`, `pgsql`, `pg`, `pglite`, `postgresql` | PGLite              |
| Prolog     | `prolog.pl`, `prolog`                                        | Prolog logic        |
| MiniZinc   | `minizinc`, `mzn`, `dzn`                                     | Constraint modeling |
| JSON       | `json`                                                       | JSON data           |
| XML        | `xml`                                                        | XML data            |

### Template Languages (Script context)

Can also be used in markup editor:

| Name       | Aliases              |
| ---------- | -------------------- |
| EJS        | `ejs`                |
| Eta        | `eta`                |
| Handlebars | `handlebars`, `hbs`  |
| Mustache   | `mustache`           |
| Nunjucks   | `nunjucks`, `njk`    |
| Liquid     | `liquid`, `liquidjs` |
| Dot        | `dot`                |
| Twig       | `twig`               |
| Vento      | `vento`, `vto`       |
| Jinja      | `jinja`              |

## CSS Presets

Pre-built CSS stylesheets:

| Preset          | Description      |
| --------------- | ---------------- |
| `normalize.css` | CSS reset        |
| `reset-css`     | Eric Meyer reset |

Set via config:

```javascript
const config = {
  cssPreset: 'normalize.css', // or 'reset-css', or ''
};
```

## CDN Providers

For module resolution via CDN:

| Prefix     | CDN                   |
| ---------- | --------------------- |
| (none)     | esm.sh (default)      |
| `esm.sh`   | esm.sh                |
| `skypack`  | Skypack               |
| `jsdelivr` | jsDelivr              |
| `unpkg`    | unpkg                 |
| `esm.run`  | esm.run               |
| `bundlejs` | bundlejs.com          |
| `bundle`   | bundlejs.com          |
| `deno`     | bundlejs.com (Deno)   |
| `npm`      | esm.sh                |
| `node`     | esm.sh                |
| `jsr`      | jsr.io via esm.sh     |
| `pr:`      | pkg.pr.new via esm.sh |

## Editor Defaults

| Editor | Default Language |
| ------ | ---------------- |
| Markup | `html`           |
| Style  | `css`            |
| Script | `javascript`     |

## Common Extensions

When loading files, extensions map to languages:

| Extension          | Language   |
| ------------------ | ---------- |
| `.html`, `.htm`    | HTML       |
| `.md`, `.markdown` | Markdown   |
| `.jsx`             | JSX        |
| `.tsx`             | TSX        |
| `.ts`              | TypeScript |
| `.vue`             | Vue        |
| `.svelte`          | Svelte     |
| `.scss`, `.sass`   | SCSS/Sass  |
| `.less`            | Less       |
| `.styl`            | Stylus     |
| `.py`              | Python     |
| `.rb`              | Ruby       |
| `.go`              | Go         |
| `.php`             | PHP        |
| `.java`            | Java       |
