# Gleam

import LiveCodes from '../../src/components/LiveCodes.tsx';

[Gleam](https://gleam.run) is a friendly language for building type-safe systems that scale!

Gleam is a statically-typed functional programming language, which compiles to Erlang or JavaScript.

## Usage

LiveCodes compiles Gleam code to JavaScript using the WebAssembly (wasm) version of the [official Gleam compiler](https://github.com/gleam-lang/gleam). The compiled JavaScript code is then executed in the context of the [result page](../features/result.html.md).

The compiled JavaScript code can be inspected in the [Compiled Code Viewer](../features/compiled-code.html.md) in the [Tools Pane](../features/tools-pane.html.md) (below the result page). Console output is shown in the [integrated console](../features/console.html.md).

Please note that the compiler messages (e.g. errors and warnings) are shown in the browser console (not the integrated console).

### Standard Library

[Gleam's standard library](https://hexdocs.pm/gleam_stdlib/) in addition to the following packages are available for use and can be imported as usual with no additional configuration:

- [gleam/crypto](https://hexdocs.pm/gleam_crypto/)
- [gleam/erlang](https://hexdocs.pm/gleam_erlang/)
- [gleam/fetch](https://hexdocs.pm/gleam_fetch/)
- [gleam/http](https://hexdocs.pm/gleam_http/)
- [gleam/javascript](https://hexdocs.pm/gleam_javascript/)
- [gleam/json](https://hexdocs.pm/gleam_json/)
- [gleam/otp](https://hexdocs.pm/gleam_otp/)

Demo:

export const stdlibConfig = {
  activeEditor: 'script',
  script: {
    language: 'gleam',
    content: `import gleam/io\nimport gleam/string\n\npub fn main() {\n  "hello world!"\n  |> string.uppercase\n  |> io.println\n}`,
  },
  tools: { status: 'open' },
};

<LiveCodes config={stdlibConfig}></LiveCodes>

### Custom Modules

Custom modules can be used in Gleam code. These modules have to be precompiled (to JavaScript) by the Gleam compiler. URLs to the compiled JavaScript code and either the Gleam source code or URLs to the Gleam source code are needed to be able to import custom modules.

This is an example for a repo with precompiled Gleam modules:
https://github.com/live-codes/gleam-precompiled

Please refer to [Gleam CLI docs](https://gleam.run/writing-gleam/command-line-reference/) for details about adding and building packages.

Note that the built code was committed to the repo by clearing out `.gitignore` file.

The built code can then by accessed from a [CDN that mirrors GitHub](https://www.jsdelivr.com/?docs=gh), like this:
`https://cdn.jsdelivr.net/gh/live-codes/gleam-precompiled@main/...`

Built modules can then be declared in [custom settings](../advanced/custom-settings.html.md) (Project menu → Custom Settings), under the `gleam` property, by adding a `modules` property.

The `modules` property is an object that has the module name as the key. The value is an object with the following properties:

- `srcUrl`: the URL to the Gleam source code of the module.
- `src`: optionally use this instead of `srcUrl` to specify the Gleam source code of the module.
- `compiledUrl`: the URL to the compiled JavaScript code of the module.

Example:

```json title="Custom Settings"
{
  "gleam": {
    "modules": {
      "plinth/browser/document": {
        "srcUrl": "https://cdn.jsdelivr.net/gh/live-codes/gleam-precompiled@v0.3.0/build/packages/plinth/src/plinth/browser/document.gleam",
        "compiledUrl": "https://cdn.jsdelivr.net/gh/live-codes/gleam-precompiled@v0.3.0/build/dev/javascript/plinth/plinth/browser/document.mjs"
      }
    }
  }
}
```

See the [demo below](#example-usage) ([open in LiveCodes](https://livecodes.io/?template=gleam)).

If `compiledUrl` property is not specified, the JavaScript module is imported from this URL pattern: `{module_name}.mjs` (example: `plinth/browser/document.mjs`).
This can then be [mapped (using import maps)](../features/module-resolution.html.md)#custom-module-resolution) in [custom settings](../advanced/custom-settings.html.md) (Project menu → Custom Settings) to the full URL of the compiled JavaScript code.

Example:

```json title="Custom Settings"
{
  "gleam": {
    "modules": {
      "some_pkg/some_module": {
        "srcUrl": "https://example.com/packages/some_pkg/some_module.gleam"
      },
      "another_pkg/another_module": {
        "srcUrl": "https://example.com/packages/another_pkg/another_module.gleam"
      }
    }
  },
  "imports": {
    // map a specific module
    "some_pkg/some_module.mjs": "https://example.com/compiled/some_pkg/some_module.mjs",
    // or map a whole directory
    "another_pkg/": "https://example.com/compiled/another_pkg/"
  }
}
```

### Externals

[External functions](https://tour.gleam.run/advanced-features/externals/) written in JavaScript can also be used. An external function has the `@external` attribute on it. It needs to specify a "relative" URL specifying the location of the external code. This URL is [mapped (using import maps)](../features/module-resolution.html.md)#custom-module-resolution) in [custom settings](../advanced/custom-settings.html.md) (Project menu → Custom Settings) to the full URL of the script that contains the code.

**Example:**

The following script is hosted on this URL:
https://cdn.jsdelivr.net/gh/live-codes/gleam-precompiled@v0.3.0/demo/greet.js

```js title="greet.js"
export const hello = (str) => `Hello, ${str}!`;
```

Use this in custom settings:

```json title="Custom Settings"
{
  "imports": {
    "my_pkg/greet.js": "https://cdn.jsdelivr.net/gh/live-codes/gleam-precompiled@v0.3.0/demo/greet.js"
  }
}
```

`"my_pkg/greet.js"` can then be used in the `@external` attribute.

```js title="Gleam"
import gleam/io

// highlight-next-line
@external(javascript, "my_pkg/greet.js", "hello")
// highlight-next-line
pub fn hello(str: String) -> String

pub fn main() {
 io.println(hello("from JavaScript"))
}
```

Demo:

export const externalsConfig = {
  activeEditor: 'script',
  script: {
    language: 'gleam',
    content:
      'import gleam/io\n\n@external(javascript, "my_pkg/greet.js", "hello")\npub fn hello(str: String) -> String\n\npub fn main() {\n io.println(hello("from JavaScript"))\n}',
  },
  tools: { status: 'open' },
  customSettings: {
    imports: {
      'my_pkg/greet.js':
        'https://cdn.jsdelivr.net/gh/live-codes/gleam-precompiled@v0.3.0/demo/greet.js',
    },
  },
};

<LiveCodes config={externalsConfig}></LiveCodes>

:::tip

[Data URLs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URLs) can be used to avoid having to host the external code online. LiveCodes enables [creating data URLs](../features/data-urls.html.md) easily.

Example:
The import map in the previous example can be rewritten like this:

```json title="Custom Settings"
{
  "imports": {
    "my_pkg/greet.js": "data:text/javascript;charset=UTF-8;base64,ZXhwb3J0IGNvbnN0IGhlbGxvID0gKHN0cikgPT4gYEhlbGxvLCAke3N0cn0hYDs="
  }
}
```

:::

### NPM Modules

Modules published to [npm](https://www.npmjs.com/), [deno.land/x](https://deno.land/x) and [jsr.io](https://jsr.io/) can be imported as external functions. There is no need to specify import maps. The package/module name is prefixed with a modifier to specify the source (e.g. `npm:uuid` to import the [`uuid`](https://www.npmjs.com/package/uuid) npm module).

See list of supported CDNs and the respective modifiers in the section about [module resolution](../features/module-resolution.html.md)#cdn-providers).

Example:

```js
import gleam/io

// npm module (https://www.npmjs.com/package/uuid)
@external(javascript, "npm:uuid", "v4")
pub fn uuid() -> String

// jsr module (https://jsr.io/@kwhinnery/yassify)
@external(javascript, "jsr:@kwhinnery/yassify", "yassify")
pub fn yassify(str: String) -> String

pub fn main() {
 io.println(uuid())
 io.println(yassify("Hello, World!"))
}
```

Demo:

export const npmConfig = {
  activeEditor: 'script',
  script: {
    language: 'gleam',
    content:
      'import gleam/io\n\n// npm module (https://www.npmjs.com/package/uuid)\n@external(javascript, "npm:uuid", "v4")\npub fn uuid() -> String\n\n// jsr module (https://jsr.io/@kwhinnery/yassify)\n@external(javascript, "jsr:@kwhinnery/yassify", "yassify")\npub fn yassify(str: String) -> String\n\npub fn main() {\n io.println(uuid())\n io.println(yassify("Hello, World!"))\n}\n',
  },
  tools: { status: 'open' },
};

<LiveCodes config={npmConfig}></LiveCodes>

### Example Usage

This is the Gleam starter template demonstrating the use of standard library, custom modules, external functions and npm modules.

<LiveCodes template="gleam" height="80vh"></LiveCodes>

## Language Info

### Name

`gleam`

### Extension

`.gleam`

### Editor

`script`

## Compiler

The wasm version of the [official Gleam compiler](https://github.com/gleam-lang/gleam).

### Version

`v1.3.0-rc1`

## Starter Template

https://livecodes.io/?template=gleam

## Links

- [Gleam](https://gleam.run)
- [Gleam documentation](https://gleam.run/documentation/)
- [Gleam language tour](https://tour.gleam.run/)