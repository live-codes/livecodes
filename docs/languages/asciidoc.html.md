# AsciiDoc

import LiveCodes from '../../src/components/LiveCodes.tsx';

[AsciiDoc](https://asciidoc.org) is a plain text markup language for writing technical content. It’s packed with semantic elements and equipped with features to modularize and reuse content. AsciiDoc content can be composed using a text editor, managed in a version control system, and published to multiple output formats.

In LiveCodes, AsciiDoc is compiled to HTML using [Asciidoctor](https://asciidoctor.org/).

## Usage

### Demo

export const asciidocConfig = {
  markup: {
    language: 'asciidoc',
    content: `= AsciiDoc Demo

== Features

* Simple
* Clean
* Dev-friendly
`,
  },
}

<LiveCodes config={asciidocConfig} height='70vh' />

## Language Info

### Name

`asciidoc`

### Extensions

`adoc`, `asc`

## Editor

`markup`

## Compiler

[Asciidoctor.js](https://docs.asciidoctor.org/asciidoctor.js/latest/)

### Version

Asciidoctor.js: `v2.2.8`

## Code Formatting

Not supported.

## Custom Settings

[Custom settings](../advanced/custom-settings.html.md) added to the property `asciidoc` are passed as a JSON object to the [`convert()`](https://docs.asciidoctor.org/asciidoctor.js/latest/setup/quick-tour/#your-first-conversion) function during compile.
Please check the [documentation](https://docs.asciidoctor.org/asciidoctor.js/latest/processor/convert-options/) and [document attributes](https://docs.asciidoctor.org/asciidoc/latest/attributes/document-attributes-ref/) for full reference.

Please note that custom settings should be valid JSON (i.e. functions are not allowed).

```json
{
  "asciidoc": {
    "attributes": {
      "source-highlighter": "highlight.js",
      "icons": "font"
    }
  }
}
```

## Limitations

- Some advanced extensions may not work (e.g. diagrams)

## Links

- [AsciiDoc](https://asciidoc.org)
- [Asciidoctor](https://asciidoctor.org/)
- [AsciiDoctor.js](https://docs.asciidoctor.org/asciidoctor.js/latest/)