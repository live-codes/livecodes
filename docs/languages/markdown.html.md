# Markdown

[Markdown](https://daringfireball.net/projects/markdown/) is a text-to-HTML conversion tool for web writers.
Markdown allows you to write using an easy-to-read, easy-to-write plain text format, then convert it to structurally valid HTML.

Markdown is now one of the world's most popular markup languages.

:::info Note

Please note that MDX is also supported in LiveCodes and is [documented here](./mdx.html.md).

:::

## Demo

import LiveCodes from '../../src/components/LiveCodes.tsx';

export const markdownConfig = {
  markup: {
    language: 'markdown',
    content: `## Markdown

_Hello_ **World**

Ordered List:

1. item
2. item
3. item

Unordered list:

- item
- item
- item

Link:

[link](https://livecodes.io)

Image:

![image](https://placehold.co/300x200)

Table:

| header 1 | header 2 |
| -------- | -------- |
| cell 1   | cell 2   |
| cell 3   | cell 4   |

Quote:

> blockquote

Code:

\`\`\`python
print("Hello, World!")
\`\`\`
`
  },
}

<LiveCodes config={markdownConfig}></LiveCodes>

## Styles

By default, no styes are added. Only HTML output is generated from the Markdown code.

If you want to style the result page similar to GitHub Markdown, you can use [`github-markdown-css`](https://github.com/sindresorhus/github-markdown-css).
Note that the body needs to have a `class="markdown-body"` for the styles to be applied.

```js title="Script Editor (JS)"
document.body.classList.add('markdown-body');
```

Example:

export const styledMarkdownParams = {
  template: 'markdown',
  activeEditor: 'style',
  css: `@import 'github-markdown-css';

.markdown-body {
  box-sizing: border-box;
  min-width: 200px;
  max-width: 980px;
  margin: 0 auto;
  padding: 45px;
}

@media (max-width: 767px) {
  .markdown-body {
    padding: 15px;
  }
}
`,
}

<LiveCodes params={styledMarkdownParams} height='80vh'></LiveCodes>

## Language Info

### Name

`markdown`

### Aliases

`md`, `mdown`, `mkdn`

### Extension

`.md`

### Editor

`script`

## Compiler

[Marked](https://marked.js.org/)

### Version

`marked`: v13.0.2

## Code Formatting

Using [Prettier](https://prettier.io/).

## Custom Settings

[Custom settings](../advanced/custom-settings.html.md) added to the property `markdown` are passed as a JSON object to [`marked.parse`](https://marked.js.org/using_advanced). Please check the [documentation](https://marked.js.org/using_advanced#options) for full reference.

Please note that custom settings should be valid JSON (i.e. functions are not allowed).

**Example:**

```json title="Custom Settings"
{
  "markdown": {
    "gfm": true,
    "breaks": true
  }
}
```

## Starter Template

https://livecodes.io/?template=markdown

## Links

- [Markdown](https://daringfireball.net/projects/markdown/)
- [Marked](https://marked.js.org/)
- [The Markdown Guide](https://www.markdownguide.org/)
- [MDX support in LiveCodes](./mdx.html.md)