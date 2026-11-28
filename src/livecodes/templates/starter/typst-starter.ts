import type { Template } from '../../models';

export const typstStarter: Template = {
  name: 'typst',
  title: window.deps.translateString('templates.starter.typst', 'Typst Starter'),
  thumbnail: 'assets/templates/typst.svg',
  activeEditor: 'markup',
  markup: {
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
  style: {
    language: 'css',
    content: `
body {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  margin: 0;
  padding: 1rem;
  background: #ececec;
  box-sizing: border-box;
}

svg {
  display: block;
  max-width: 100%;
  height: auto;
  background: #fff;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.15);
}
`.trimStart(),
  },
  script: {
    language: 'javascript',
    content: '',
  },
  stylesheets: [],
  scripts: [],
  cssPreset: '',
  imports: {},
  types: {},
};
