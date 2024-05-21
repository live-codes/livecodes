import { type I18nTranslationTemplate } from '../models';

// This is used as a template for other translations.
// Other translations should be typed like this:
// const languageInfo: I18nLangInfoTranslation = { /* translation here */ };

// Since we allow nested objects, it is important to distinguish I18nTranslationTemplate from I18nAttributes.
// In view of this, properties declared in I18nAttributes (and those attributes might be used in future) shall not be used as a nested key.

const languageInfo = {
  artTemplate: {
    desc: 'High performance JavaScript templating engine.',
    link: '<1> <0>art-template official website</0> </1> <3> <2>art-template documentation</2> </3>',
    name: 'art-template',
  },
  asciidoc: {
    desc: 'AsciiDoc compiled to HTML using Asciidoctor.',
    link: '<1> <0>AsciiDoc official website</0> </1> <3> <2>Asciidoctor official website</2> </3> <5> <4>Asciidoctor documentation</4> </5> <7> <6>Learn X in Y minutes, where X=asciidoc</6> </7>',
    name: 'AsciiDoc',
  },
  assemblyscript: {
    desc: 'A TypeScript-like language for WebAssembly.',
    link: '<1> <0>AssemblyScript official website</0> </1> <3> <2>AssemblyScript documentation</2> </3> <5> <4>Load starter template</4> </5>',
    name: 'AssemblyScript',
  },
  astro: {
    desc: 'Build faster websites with less client-side Javascript. (Still in Beta)',
    link: '<1> <0>Astro official website</0> </1> <3> <2>Astro documentation</2> </3> <5> <4>Load starter template</4> </5>',
    name: 'Astro',
  },
  babel: {
    desc: 'The JavaScript compiler',
    link: '<1><0>Official website</0></1> <3> <2>Babel documentation</2> </3>',
    name: 'Babel',
  },
  bbcode: {
    desc: 'BBCode ("Bulletin Board Code") is a lightweight markup language used to format messages in many\n    Internet forum software.',
    link: '<1><0>bbcode.org</0></1> <3> <2>BBCode guide</2> </3> <5> <4>BBCode on Wikipedia</4> </5>',
    name: 'BBCode',
  },
  blockly: {
    desc: 'A JavaScript library for building visual programming editors.',
    link: '<1> <0>Official website</0> </1> <3> <2>Guides</2> </3> <5> <4>Reference</4> </5> <7> <6>Samples</6> </7> <9> <8>Load starter template</8> </9>',
    name: 'Blockly',
  },
  civet: {
    desc: 'Civet is a programming language that compiles to TypeScript or JavaScript, so you can use\n    existing tooling but enable concise and powerful syntax.',
    link: '<1> <0>Civet official website</0> </1> <3> <2>Civet cheatsheet</2> </3> <5> <4>Load starter template</4> </5>',
    name: 'Civet',
  },
  clio: {
    desc: 'Clio is a fast, distributed, functional programming language that compiles to JavaScript.',
    link: '<1> <0>Clio official website</0> </1> <3> <2>Clio documentation</2> </3> <5> <4>Load starter template</4> </5>',
    name: 'Clio',
  },
  clojurescript: {
    desc: 'ClojureScript is a compiler for <0>Clojure</0> that targets JavaScript. <1></1>In LiveCodes, it runs in the browser using <2>Cherry</2>.',
    link: '<1> <0>ClojureScript official website</0> </1> <3> <2>Clojure official website</2> </3> <5> <4>Cherry repo</4> </5> <7> <6>Learn X in Y minutes, where X=clojure</6> </7> <9> <8>LiveCodes Documentations</8> </9> <11> <10>Load starter template</10> </11>',
    name: 'ClojureScript (CLJS)',
  },
  coffeescript: {
    desc: 'Unfancy JavaScript.',
    link: '<1> <0>CoffeeScript official website</0> </1> <3> <2>Learn X in Y minutes, where X=coffeescript</2> </3> <5> <4>Load starter template</4> </5>',
    name: 'CoffeeScript',
  },
  commonlisp: {
    desc: 'A Common Lisp implementation on Javascript using JSCL (a Lisp-to-Javascript compiler\n    bootstrapped from Common Lisp).',
    link: '<1> <0>Common-Lisp.net</0> </1> <3> <2>JSCL Project</2> </3> <5> <4>Common Lisp Resources</4> </5> <7> <6>Learn X in Y minutes, where X=Common Lisp</6> </7> <9> <8>Load starter template</8> </9>',
    name: 'Common Lisp',
  },
  cpp: {
    desc1: 'C++ support using JSCPP (a simple C++ interpreter written in JavaScript).',
    desc2:
      'It is not a complete implementation of C++. Please refer to <0>JSCPP documentation</0> for details.',
    link: '<1> <0>Standard C++ Foundation</0> </1> <3> <2>JSCPP</2> </3> <5> <4>Learn X in Y minutes, where X=C++</4> </5> <7> <6>Load starter template</6> </7>',
    name: 'C++',
  },
  cppWasm: {
    desc: 'Clang C/C++ compiler running on WebAssembly, using <0>wasm-clang</0> adapted by <1>polylang.io</1>.',
    link: '<1> <0>Standard C++ Foundation</0> </1> <3> <2>Clang official website</2> </3> <5> <4>Learn X in Y minutes, where X=C++</4> </5> <7> <6>Load starter template</6> </7>',
    name: 'C/C++ (Wasm)',
  },
  diagrams: {
    desc1: '(Experimental)',
    desc2: 'Diagrams-as-code. Supports:',
    desc3:
      '<1> <0>Cytoscape</0> </1> <4> <2>ELK</2> (using <3>elkjs</3>) </4> <7> <5>Gnuplot</5> (using <6>gnuplot-JS</6>) </7> <10> <8>Graphviz</8> (using <9>@hpcc-js/wasm</9>) </10> <12> <11>Mermaid</11> </12> <14> <13>Nomnoml</13> </14> <16> <15>Pintora</15> </16> <18> <17>Plotly</17> </18> <20> <19>Svgbob</19> </20> <22> <21>Vega</21> </22> <24> <23>VegaLite</23> </24> <26> <25>WaveDrom</25> </26>',
    link: '<1> <0>Load starter template</0> </1> <3> <2>LiveCodes Documentation</2> </3>',
    name: 'Diagrams',
  },
  dot: {
    desc: 'The fastest + concise javascript template engine for Node.js and browsers.',
    link: '<1> <0>Official website</0> </1> <3> <2>LiveCodes Documentations</2> </3>',
    name: 'doT.js',
  },
  ejs: {
    desc: 'Embedded JavaScript templating.',
    link: '<1><0>Official website</0></1> <3> <2>LiveCodes Documentations</2> </3>',
    name: 'EJS',
  },
  eta: {
    desc: 'Embedded JS template engine for Node, Deno, and the browser. Lighweight, fast, and pluggable.\n    Written in TypeScript.',
    link: '<1><0>Official website</0></1> <3> <2>Documentation</2> </3> <5> <4>LiveCodes Documentations</4> </5>',
    name: 'Eta',
  },
  fennel: {
    desc: 'Fennel is a programming language that brings together the speed, simplicity, and reach of Lua\n    with the flexibility of a lisp syntax and macro system.',
    link: '<1> <0>Fennel official website</0> </1> <3> <2>Getting Started with Fennel</2> </3> <5> <4>LiveCodes Documentations</4> </5> <7> <6>Load starter template</6> </7>',
    name: 'Fennel',
  },
  flow: {
    desc: 'Flow is a static type checker for JavaScript.',
    link: '<1> <0>Flow official website</0> </1> <3> <2>Flow documentation</2> </3>',
    name: 'Flow',
  },
  gleam: {
    desc1: 'Gleam is a friendly language for building type-safe systems that scale!',
    desc2:
      'Gleam is a statically-typed functional programming language, which compiles to Erlang or\n    JavaScript.',
    link: '<1><0>Gleam website</0></1> <3> <2>Gleam documentation</2> </3> <5> <4>Gleam language tour</4> </5> <7> <6>Load starter template</6> </7>',
    name: 'Gleam',
  },
  go: {
    desc1:
      'Go (Golang) is an open source programming language that makes it easy to build simple, reliable,\n    and efficient software.',
    desc2: 'Here, it is compiled to JavaScript using GopherJS.',
    link: '<1><0>Go website</0></1> <3><2>Go documentation</2></3> <5> <4>GopherJS repo</4> </5> <7> <6>Learn X in Y minutes, where X=Go</6> </7> <9><8>Load starter template</8></9>',
    name: 'Go',
  },
  haml: {
    desc: 'Haml compiler for client side javascript view templates using clientside-haml-js.',
    link: '<1><0>Haml official website</0></1> <3> <2>Haml documentation</2> </3> <5> <4>clientside-haml-js GitHub repo</4> </5> <7> <6>Learn X in Y minutes, where X=haml</6> </7> <9> <8>LiveCodes Documentations</8> </9>',
    name: 'Haml',
  },
  handlebars: {
    desc: 'Minimal templating on steroids.',
    link: '<1><0>Official website</0></1> <3> <2>LiveCodes Documentations</2> </3>',
    name: 'Handlebars',
  },
  imba: {
    desc: 'The friendly full-stack language.',
    link: '<1><0>Official website</0></1>',
    name: 'Imba',
  },
  jsx: {
    desc: 'JSX is compiled to JavaScript in LiveCodes using the TypeScript Compiler. \n    By default it uses React as the JSX runtime.',
    link: '<1> <0>React official website</0> </1> <3> <2>JSX in React documentation</2> </3> <5> <4>LiveCodes Documentations</4> </5> <7> <6>Load starter template</6> </7>',
    name: 'JSX',
  },
  julia: {
    desc1: '(Julia language support in LiveCodes is still experimental)',
    desc2:
      'Julia compiler and Julia Base running on WASM, using <0>julia-wasm</0> adapted by <1>polylang.io</1>.',
    link: '<1> <0>Julia official website</0> </1> <3> <2>Julia documentation</2> </3> <5> <4>Learn X in Y minutes, where X=Julia</4> </5> <7> <6>Load starter template</6> </7>',
    name: 'Julia',
  },
  less: {
    desc: "It's CSS, with just a little more.",
    link: '<1><0>Less official website</0></1> <3> <2>Learn X in Y minutes, where X=less</2> </3>',
    name: 'Less',
  },
  liquid: {
    desc: 'A simple, expressive and safe template engine.',
    link: '<1> <0>LiquidJS official website</0> </1> <3> <2>LiquidJS documentation</2> </3> <5> <4>LiveCodes Documentations</4> </5>',
    name: 'LiquidJS',
  },
  livescript: {
    desc: 'A language which compiles to JavaScript.',
    link: '<1> <0>LiveScript official website</0> </1> <3> <2>Learn X in Y minutes, where X=LiveScript</2> </3> <5> <4>Load starter template</4> </5>',
    name: 'LiveScript',
  },
  lua: {
    desc: 'Lua running in the browser using fengari-web.',
    link: '<1><0>Lua official website</0></1> <3> <2>Lua documentation</2> </3> <5> <4>Fengari official website</4> </5> <7> <6>fengari-web GitHub repo</6> </7> <9> <8>Learn X in Y minutes, where X=Lua</8> </9> <11> <10>LiveCodes Documentations</10> </11> <13><12>Load starter template</12></13>',
    name: 'Lua',
  },
  luaWasm: {
    desc: 'Lua running in the browser using Wasmoon, a real lua 5.4 VM with JS bindings made with\n    WebAssembly.',
    link: '<1><0>Lua official website</0></1> <3> <2>Lua documentation</2> </3> <5> <4>Wasmoon GitHub repo</4> </5> <7> <6>Learn X in Y minutes, where X=Lua</6> </7> <9> <8>LiveCodes Documentations</8> </9> <11> <10>Load starter template</10> </11>',
    name: 'Lua (Wasm)',
  },
  malina: {
    desc: 'Frontend compiler, inspired by Svelte.',
    link: '<1> <0>Malina.js repo</0> </1> <3> <2>Malina.js documentation</2> </3> <5> <4>Load starter template</4> </5>',
    name: 'Malina.js',
  },
  markdown: {
    desc: 'Markdown compiled to HTML using Marked.',
    link: '<1> <0>Markdown official website</0> </1> <3> <2>Marked documentation</2> </3> <5> <4>Learn X in Y minutes, where X=markdown</4> </5> <7> <6>Load starter template</6> </7>',
    name: 'Markdown',
  },
  mdx: {
    desc: 'Markdown for the component era. <0></0>MDX lets you seamlessly write JSX in your Markdown documents.',
    link: '<1><0>MDX documentation</0></1> <3><2>Load starter template</2></3>',
    name: 'MDX',
  },
  mjml: {
    desc: 'MJML is a markup language designed to reduce the pain of coding a responsive email.',
    link: '<1><0>MJML official website</0></1> <3> <2>MJML documentation</2> </3> <5> <4>MJML official templates</4> </5> <7> <6>LiveCodes Documentations</6> </7>',
    name: 'MJML',
  },
  mustache: {
    desc: 'Logic-less templates.',
    link: '<1> <0>Official website</0> </1> <3> <2>mustache(5) manual</2> </3> <5> <4>JavaScript implementation</4> </5> <7> <6>LiveCodes Documentations</6> </7>',
    name: 'Mustache',
  },
  nunjucks: {
    desc: 'A rich and powerful templating language for JavaScript. Nunjucks is essentially a port of <0>jinja2</0>.',
    link: '<1> <0>Official website</0> </1> <3> <2>LiveCodes Documentations</2> </3>',
    name: 'Nunjucks',
  },
  ocaml: {
    desc1:
      'OCaml is an industrial-strength programming language supporting functional, imperative and\n    object-oriented styles.',
    desc2: 'ReScript compiler is used here to compile OCaml to JavaScript.',
    link: '<1><0>OCaml website</0></1> <3> <2>OCaml documentation</2> </3> <5> <4>ReScript website</4> </5> <7> <6>Learn X in Y minutes, where X=OCaml</6> </7> <9> <8>Load starter template</8> </9>',
    name: 'OCaml',
  },
  perl: {
    desc: 'Perl running in the browser using Perlito.',
    link: '<1> <0>Perl official website</0> </1> <3> <2>Perl documentation</2> </3> <5> <4>Perlito5 Readme</4> </5> <7> <6>Learn X in Y minutes, where X=perl</6> </7> <9> <8>Load starter template</8> </9>',
    name: 'Perl',
  },
  php: {
    desc: 'PHP running in the browser using Uniter.',
    link: '<1><0>PHP official website</0></1> <3> <2>PHP documentation</2> </3> <5> <4>Uniter GitHub repo</4> </5> <7> <6>Learn X in Y minutes, where X=PHP</6> </7> <9> <8>LiveCodes Documentations</8> </9> <11><10>Load starter template</10></11>',
    name: 'PHP',
  },
  phpWasm: {
    desc: 'PHP in Browser, powered by WebAssembly, using php-wasm.',
    link: '<1><0>PHP official website</0></1> <3> <2>PHP documentation</2> </3> <5> <4>php-wasm GitHub repo</4> </5> <7> <6>Learn X in Y minutes, where X=PHP</6> </7> <9> <8>LiveCodes Documentations</8> </9> <11> <10>Load starter template</10> </11>',
    name: 'PHP (Wasm)',
  },
  postgresql: {
    desc: 'PostgreSQL packaged as WASM using PGlite',
    link: '<1> <0>PostgreSQL official website</0> </1> <3> <2>PostgreSQL documentation</2> </3> <5> <4>PGlite GitHub repo</4> </5> <7> <6>Learn X in Y minutes, where X=SQL</6> </7> <9> <8>Load starter template</8> </9>',
    name: 'PostgreSQL',
  },
  prolog: {
    desc: 'An open source Prolog interpreter in JavaScript.',
    link: '<1> <0>Tau Prolog official website</0> </1> <3> <2>Tau Prolog documentation</2> </3> <5> <4>SWI-Prolog</4> </5> <7> <6>Learn X in Y minutes, where X=Prolog</6> </7> <9> <8>Load starter template</8> </9>',
    name: 'Tau Prolog',
  },
  pug: {
    desc: 'Robust, elegant, feature rich template engine.',
    link: '<1> <0>Pug documentation</0> </1> <3> <2>Learn X in Y minutes, where X=Pug</2> </3> <5> <4>LiveCodes Documentations</4> </5>',
    name: 'Pug',
  },
  python: {
    desc: 'Python running in the browser using Brython.',
    link: '<1> <0>Python official website</0> </1> <3> <2>Python documentation</2> </3> <5> <4>Brython documentation</4> </5> <7> <6>Learn X in Y minutes, where X=Python</6> </7> <9> <8>LiveCodes Documentations</8> </9> <11> <10>Load starter template</10> </11>',
    name: 'Python',
  },
  pythonWasm: {
    desc1: 'Python with the scientific stack, compiled to WebAssembly using Pyodide.',
    desc2:
      'Pyodide allows using Python scientific stack including NumPy, Pandas, Matplotlib, SciPy,\n    scikit-learn and many more. In addition it’s possible to install pure Python wheels from PyPi.',
    link: '<1> <0>Python official website</0> </1> <3> <2>Python documentation</2> </3> <5><4>Pyodide documentation</4></5> <7> <6>Learn X in Y minutes, where X=Python</6> </7> <9> <8>LiveCodes Documentations</8> </9> <11> <10>Load starter template</10> </11>',
    name: 'Python (Wasm)',
  },
  r: {
    desc: 'R running in the browser using WebR.',
    link: '<1> <0>R project official website</0> </1> <3> <2>The R Manuals</2> </3> <5> <4>R for Data Science (2e)</4> </5> <7> <6>WebR documentation</6> </7> <9> <8>Learn X in Y minutes, where X=R</8> </9> <11> <10>LiveCodes Documentations</10> </11> <13> <12>Load starter template</12> </13>',
    name: 'R',
  },
  reactNative: {
    desc: "React Native for Web is an accessible implementation of React Native's Components and APIs that\n    is interoperable with React DOM.",
    link: '<1> <0>React official website</0> </1> <3> <2>React Native website</2> </3> <5> <4>React Native for Web website</4> </5> <7> <6>React Native documentation</6> </7> <9> <8>LiveCodes Documentations</8> </9> <11> <10>Load starter template</10> </11>',
    name: 'React Native for Web',
  },
  reactNativeTsx: {
    desc: "React Native for Web is an accessible implementation of React Native's Components and APIs that\n    is interoperable with React DOM.",
    link: '<1> <0>React official website</0> </1> <3> <2>React Native website</2> </3> <5> <4>React Native for Web website</4> </5> <7> <6>React Native documentation</6> </7> <9> <8>TypeScript website</8> </9> <11> <10>TypeScript documentation</10> </11> <13> <12>LiveCodes Documentations</12> </13> <15> <14>Load starter template (JSX)</14> </15>',
    name: 'React Native for Web (with TypeScript)',
  },
  reason: {
    desc1:
      'Reason lets you write simple, fast and quality type safe code while leveraging both the\n    JavaScript & OCaml ecosystems.',
    desc2: 'ReScript compiler is used here to compile Reason to JavaScript.',
    link: '<1><0>Reason website</0></1> <3> <2>Reason documentation</2> </3> <5> <4>ReasonReact</4> </5> <7> <6>ReScript website</6> </7> <9> <8>Learn X in Y minutes, where X=reason</8> </9> <11> <10>Load starter template</10> </11>',
    name: 'Reason',
  },
  rescript: {
    desc: 'ReScript is a robustly typed language that compiles to efficient and human-readable JavaScript.',
    link: '<1> <0>ReScript website</0> </1> <3> <2>ReScript / React</2> </3> <5> <4>Load starter template</4> </5>',
    name: 'ReScript',
  },
  richtext: {
    desc1: 'Using Quill:',
    desc2: 'Your powerful rich text editor.',
    link: '<1> <0>Quill official website</0> </1>',
    name: 'Rich Text Editor',
  },
  riot: {
    desc: 'Simple and elegant component-based UI library.',
    link: '<1> <0>Riot.js official website</0> </1> <3> <2>Riot.js documentation</2> </3> <5> <4>Load starter template</4> </5>',
    name: 'Riot.js',
  },
  ruby: {
    desc: 'Ruby running in the browser using Opal.',
    link: '<1> <0>Ruby official website</0> </1> <3> <2>Ruby documentation</2> </3> <5><4>Opal official website</4></5> <7> <6>Opal standard library CDN</6> </7> <9> <8>Learn X in Y minutes, where X=ruby</8> </9> <11> <10>LiveCodes Documentations</10> </11> <13> <12>Load starter template</12> </13>',
    name: 'Ruby',
  },
  rubyWasm: {
    desc: 'Ruby running in the browser using ruby-wasm (a collection of WebAssembly ports of the CRuby).',
    link: '<1> <0>Ruby official website</0> </1> <3> <2>Ruby documentation</2> </3> <5> <4>ruby.wasm website</4> </5> <7><6>CRuby</6></7> <9> <8>Learn X in Y minutes, where X=ruby</8> </9> <11> <10>LiveCodes Documentations</10> </11> <13> <12>Load starter template</12> </13>',
    name: 'Ruby (WASM)',
  },
  sass: {
    desc: 'Syntactically Awesome Style Sheets.',
    link: '<1> <0>Sass official website</0> </1> <3> <2>Sass documentation</2> </3> <5> <4>Sass (the indented) syntax</4> </5> <7> <6>Learn X in Y minutes, where X=sass</6> </7>',
    name: 'Sass',
  },
  scheme: {
    desc: 'Scheme running in the browser using biwascheme.',
    link: '<1> <0>The Scheme Programming Language</0> </1> <3> <2>BiwaScheme official website</2> </3> <5> <4>BiwaScheme reference</4> </5> <7> <6>Load starter template</6> </7>',
    name: 'Scheme',
  },
  scss: {
    desc: 'Syntactically Awesome Style Sheets.',
    link: '<1> <0>Sass official website</0> </1> <3> <2>Sass documentation</2> </3> <5> <4>SCSS syntax</4> </5> <7> <6>Learn X in Y minutes, where X=sass</6> </7>',
    name: 'SCSS',
  },
  solid: {
    desc: 'A declarative, efficient and flexible JavaScript library for building user interfaces.',
    link: '<1><0>Official website</0></1> <3><2>Documentation</2></3> <5> <4>LiveCodes Documentations</4> </5> <7> <6>Load starter template (TSX)</6> </7>',
    name: 'Solid',
    tsx: {
      desc: 'A declarative, efficient and flexible JavaScript library for building user interfaces.',
      link: '<1><0>Official website</0></1> <3> <2>Solid documentation</2> </3> <5> <4>TypeScript website</4> </5> <7> <6>TypeScript documentation</6> </7> <9> <8>LiveCodes Documentations</8> </9> <11> <10>Load starter template</10> </11>',
      name: 'Solid (with TypeScript)',
    },
  },
  sql: {
    desc: 'SQLite compiled to JavaScript using SQL.js',
    link: '<1> <0>SQLite official website</0> </1> <3> <2>SQLite syntax documentation</2> </3> <5> <4>SQL.js official website</4> </5> <7> <6>Learn X in Y minutes, where X=SQL</6> </7> <9><8>Load starter template</8></9>',
    name: 'SQLite',
  },
  stencil: {
    desc: 'A Compiler for Web Components and High Performance Web Apps.',
    link: '<1> <0>Stencil official website</0> </1> <3> <2>Stencil documentation</2> </3> <5> <4>Load starter template</4> </5>',
    name: 'Stencil',
  },
  styleProcessors: {
    link: '<1> <0>Tailwind CSS</0> </1> <3> <2>Windi CSS</2> </3> <5> <4>UnoCSS</4> </5> <7> <6>Lightning CSS</6> </7> <18> <8>PostCSS</8> Plugins: <17> <10> <9>Autoprefixer</9> </10> <12> <11>postcss-preset-env</11> </12> <14> <13>postcss-import-url</13> </14> <16> <15>postcss-modules</15> </16> </17> </18>',
    name: 'CSS Frameworks and Processors',
  },
  stylis: {
    desc: 'Light-weight css preprocessor.',
    link: '<1> <0>Stylis official website</0> </1>',
    name: 'Stylis',
  },
  stylus: {
    desc: 'Expressive, Dynamic, Robust CSS.',
    link: '<1> <0>Stylus official website</0> </1> <3> <2>Learn X in Y minutes, where X=stylus</2> </3>',
    name: 'Stylus',
  },
  sucrase: {
    desc: 'Super-fast alternative to Babel for when you can target modern JS runtimes.',
    link: '<1> <0>Sucrase official website</0> </1> <3> <2>Sucrase GitHub Repo</2> </3> <5> <4>LiveCodes Documentations</4> </5>',
    name: 'Sucrase',
  },
  svelte: {
    desc: 'Cybernetically enhanced web apps.',
    link: '<1> <0>Svelte official website</0> </1> <3> <2>Svelte documentation</2> </3> <5> <4>Load starter template</4> </5>',
    name: 'Svelte',
  },
  tcl: {
    desc: 'Tcl running in the browser, using <0>wacl</0>.',
    link: '<1> <0>Tcl official website</0> </1> <3> <2>wacl repo</2> </3> <5> <4>Learn X in Y minutes, where X=Tcl</4> </5> <7> <6>Load starter template</6> </7>',
    name: 'Tcl (Tool Command Language)',
  },
  teal: {
    desc: 'A typed dialect of Lua.',
    link: '<1> <0>Teal GitHub repo</0> </1> <3> <2>Teal docs</2> </3> <5> <4>Teal tutorial</4> </5> <7> <6>LiveCodes Documentations</6> </7> <9> <8>Load starter template</8> </9>',
    name: 'Teal',
  },
  tsx: {
    desc: 'TypeScript in JSX. TSX is compiled to JavaScript in LiveCodes using the TypeScript Compiler.\n    By default it uses React as the JSX runtime.',
    link: '<1> <0>React official website</0> </1> <3> <2>JSX in React documentation</2> </3> <5> <4>Typescript documentation</4> </5> <7> <6>LiveCodes Documentations</6> </7>',
    name: 'TSX',
  },
  twig: {
    desc: 'A JavaScript implementation of the <0>Twig</0> PHP templating language by <1>Twig.js</1> .',
    link: '<1> <0>Twig official website</0> </1> <3> <2>Twig Documentation</2> </3> <5> <4>Twig.js Repo</4> </5> <7> <6>Twig.js Documentation</6> </7> <9> <8>LiveCodes Documentations</8> </9>',
    name: 'Twig',
  },
  typescript: {
    desc: 'A Typed Superset of JavaScript.',
    link: '<1> <0>Official website</0> </1> <3> <2>TypeScript documentation</2> </3> <5> <4>Learn X in Y minutes, where X=TypeScript</4> </5> <7> <6>Load starter template</6> </7>',
    name: 'TypeScript',
  },
  vue: {
    link: '<1> <0>Vue.js v3 official website</0> </1> <3> <2>Vue3 documentation</2> </3> <5> <4>Vue3 single file components</4> </5> <7> <6>LiveCodes Documentations</6> </7> <9><8>Load starter template</8></9>',
    name: 'Vue3 Single File Components',
  },
  vue2: {
    desc: 'Loaded using vue3-sfc-loader.',
    link: '<1><0>Vue.js official website</0></1> <3> <2>Vue2 documentation</2> </3> <5> <4>Vue2 single file components</4> </5> <7> <6>vue3-sfc-loader GitHub repo</6> </7> <9> <8>LiveCodes Documentations</8> </9>',
    name: 'Vue2 Single File Components',
  },
  wat: {
    desc1: 'Low-level textual representation of the WebAssembly (wasm) binary format.',
    desc2: 'It is converted to wasm using wabt.js.',
    link: '<1><0>WebAssembly.org</0></1> <3> <2>WebAssembly Text Specs</2> </3> <5> <4>WebAssembly on MDN</4> </5> <7> <6>Understanding WebAssembly text format</6> </7> <9> <8>wabt.js documentation</8> </9> <11> <10>Learn X in Y minutes, where X=WebAssembly</10> </11> <13><12>Load starter template</12></13>',
    name: 'WebAssembly Text Format',
  },
} as const satisfies I18nTranslationTemplate;

export default languageInfo;
