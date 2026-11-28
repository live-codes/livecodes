import type { Template } from '../../models';

export const typstStarter: Template = {
  name: 'typst',
  title: window.deps.translateString('templates.starter.typst', 'Typst Starter'),
  thumbnail: 'assets/templates/typst.svg',
  activeEditor: 'script',
  markup: {
    language: 'html',
    content: '',
  },
  style: {
    language: 'css',
    content: '',
  },
  script: {
    language: 'typst',
    content: `
#set page(margin: 2cm)
#set text(size: 11pt)

= Typst Starter

*Typst* is a typesetting system that compiles to PDF and SVG.

== Features

- Runs entirely in the browser using WebAssembly
- Supports headings, lists and tables
- Math: $ sum_(i=1)^n i = (n (n + 1)) / 2 $

#table(
  columns: 2,
  [*Language*], [*LiveCodes*],
  [Typst], [Runs in your browser],
)
`.trimStart(),
  },
  stylesheets: [],
  scripts: [],
  cssPreset: '',
  imports: {},
  types: {},
};
