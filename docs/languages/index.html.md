# Languages

## Overview

The term "language" used in these documentations refer to any technology (in addition to web languages: HTML, CSS and JavaScript), that needs some form of transformation/compilation to run in the browser.

LiveCodes provides support for a wide range of languages, which include (but not limited to):

- Syntax used by web libraries/frameworks (e.g. JSX, TSX, Vue SFC, Svelte SFC, MDX, Astro).
- Languages that transpile to JavaScript (e.g. TypeScript, CoffeeScript, LiveScript, ReScript).
- Languages/frameworks that generate CSS (e.g. SCSS, Less, Stylus, Tailwind CSS, UnoCSS).
- CSS processors (e.g. PostCSS, Autoprefixer, Lightning CSS, CSS Modules, cssnano)
- Traditional programming languages (e.g. Python, Ruby, Go, PHP, C++, R, Lua, Scheme, Perl).
- Data manipulation/logic languages (e.g. SQL, Prolog).
- Authoring/templating languages (e.g Markdown, AsciiDoc, Pug, Handlebars, Haml).
- Low-code/visual editors (e.g. blockly, rich text editor).
- Modeling languages/diagram-as-code (e.g. Gnuplot, Graphviz, Mermaid, Vega, Plotly).
- Languages that target WebAssembly (e.g. AssemblyScript, WebAssembly Text Format)
- ... and others.

Below is the full list of supported languages with documentations for usage in LiveCodes.

## Language List

```mdx-code-block
import DocCardList from '@theme/DocCardList';
import {useCurrentSidebarCategory} from '@docusaurus/theme-common';

<DocCardList items={useCurrentSidebarCategory().items.filter(item => item.docId !== 'languages/index')}/>
```