import type { Template } from '../../models';

export const typstStarter: Template = {
  name: 'typst',
  title: window.deps.translateString('templates.starter.typst', 'Typst Starter'),
  thumbnail: 'assets/templates/typst.svg',
  activeEditor: 'markup',
  markup: {
    language: 'typst',
    content: `
#set page(margin: (x: 2cm, y: 1.8cm), numbering: "1 / 1")
#set text(size: 11pt)
#set par(justify: true)
#set heading(numbering: "1.")

#let accent = rgb("#4f46e5")
#let soft = luma(245)

#let pill(body) = box(
  fill: accent.lighten(90%),
  inset: (x: 6pt, y: 2pt),
  radius: 999pt,
  text(fill: accent, size: 8.5pt, weight: "bold", body),
)

#show heading: set text(fill: accent)
#show link: set text(fill: blue, weight: 700)
#show link: underline

#align(center)[
  #text(size: 26pt, weight: "bold", fill: accent)[Typst Starter]
  #v(4pt)
  #text(size: 10pt, fill: gray)[A markup-based typesetting system that runs in your browser]
]

#v(6pt)
#line(length: 100%, stroke: 0.6pt + accent)
#v(4pt)

*Typst* is a markup-based typesetting system that is designed to be as powerful as LaTeX while being much easier to learn and use.

= Markup

Headings, _emphasis_, *strong*, #underline[underline], #strike[strikethrough],
#highlight[highlight] and #smallcaps[small caps] are all built in.

- Lists use a leading dash
- Links like #link("https://typst.app/")[typst.app] work in the text flow

#v(4pt)

+ Numbered lists work too
+ With automatic numbering
  + And nested content

= Scripting

Variables, functions and methods are part of the language (see #link("https://typst.app/docs/reference/scripting/")[scripting docs]):

#let fib(n) = if n < 2 { n } else { fib(n - 1) + fib(n - 2) }

The first ten Fibonacci numbers are #range(10).map(n => str(fib(n))).join(", ").

= Mathematics

Inline math such as $e^(i pi) + 1 = 0$ flows with the text, while displayed equations can be
numbered:

#set math.equation(numbering: "(1)")

$ integral_0^oo e^(-x^2) dif x = sqrt(pi) / 2 $

= Tables and figures

#figure(
  table(
    columns: (auto, 1fr, auto),
    align: (left, left, right),
    inset: (x: 8pt, y: 6pt),
    fill: (_, y) => if calc.odd(y) { soft },
    stroke: (_, y) => (bottom: if y == 0 { 0.8pt + accent } else { 0.3pt + luma(210) }),
    table.header([*Feature*], [*Description*], [*Status*]),
    [Markup], [Headings, lists and inline styles], pill[Ready],
    [Styling], [Fonts, colors and decorations], pill[Ready],
    [Scripting], [Variables, functions and loops], pill[Ready],
    [Typesetting], [Tables, figures and equations], pill[Ready],
  ),
  caption: [Striped rows, custom strokes and an automatic caption.],
)

#block(
  width: 100%,
  fill: soft,
  inset: (x: 10pt, y: 8pt),
  radius: 4pt,
)[
\`\`\`typst
#let greet(name) = [Hello, #name!]
#greet("Typst")
\`\`\`
]

= Packages

Packages from the #link("https://typst.app/universe/")[Typst Universe] can be imported directly and are fetched on demand:

#import "@preview/mmdr:0.2.2": mermaid

#figure(
  mermaid("graph LR; A[Typst markup] --> B[Compiler]; B --> C[SVG result];"),
  caption: [The *mmdr* package renders Mermaid diagrams from text.],
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
