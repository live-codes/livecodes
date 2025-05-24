# HTML

import LiveCodes from '../../src/components/LiveCodes.tsx';


HTML (HyperText Markup Language) is the standard markup language for creating web pages and web applications. It defines the structure and content of web pages.

## Usage

HTML code in the [markup editor](../features/projects.html.md)#markup-editor) is added as is without compilation or processing to the body of the [result page](../features/result.html.md).

There is no need to add a full page structure (e.g. `<html>`, `<head>`, `<body>` tags). This is already handled by LiveCodes.
(See [Result Page Structure](../features/result.html.md)#result-page-structure) for more details.)

If you need to add content to the `<head>` section or `<html>` attributes of the result page, you can add it in the [project info screen](https://livecodes.io/?screen=info).

### Demo


export const htmlOnlyConfig = {
  markup: {
    language: 'html',
    content: `<h1>Hello, LiveCodes!</h1>
<p>This is a paragraph in HTML.</p>
<ul>
  <li>Simple</li>
  <li>Structured</li>
  <li>Semantic</li>
</ul>
`,
  },
}

<LiveCodes config={htmlOnlyConfig} />

### Styles and JavaScript

Most of the time, you will want to add styles and scripts in the [respective editors](../features/projects.html.md).
However, you can of course still add them in `<link>`, `<style>` and `<script>` tags in HTML.
This can be useful in different scenarios, such as adding global variables that are then used in the script editor,
or adding JavaScript together with a different script editor language (e.g. see [SQL starter template](https://livecodes.io/?template=sql&activeEditor=markup))

## Language Info

### Name

`html`

### Extensions

`.html`, `.htm`

### Editor

`markup`

## Compiler

None.

## Code Formatting

Using [Prettier](https://prettier.io/).

## Links

- [HTML: HyperText Markup Language (MDN)](https://developer.mozilla.org/en-US/docs/Web/HTML)
- [HTML Tutorial (W3Schools)](https://www.w3schools.com/html/)