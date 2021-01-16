import { CssPreset, EditorId, Language, LanguageSpecs, Pen, Processors } from './models';

export const languages: LanguageSpecs[] = [
  {
    name: 'html',
    title: 'HTML',
    parser: 'html',
    plugin: 'vendor/prettier/parser-html.mjs',
    extensions: ['html', 'htm'],
    editor: 'markup',
  },
  {
    name: 'pug',
    title: 'Pug',
    parser: 'babel',
    plugin: 'vendor/prettier/parser-babel.mjs',
    compiler: {
      url: 'vendor/pug/pug.min.js',
      factory: () => (window as any).pug.render,
      umd: true,
    },
    extensions: ['pug', 'jade'],
    editor: 'markup',
  },
  {
    name: 'markdown',
    title: 'Markdown',
    parser: 'markdown',
    plugin: 'vendor/prettier/parser-markdown.mjs',
    compiler: {
      url: 'vendor/marked/marked.esm.min.js',
      factory: (module: any) => module.default,
      stylesAdded: false,
    },
    extensions: ['md', 'markdown', 'mdown', 'mkdn', 'mdx'],
    editor: 'markup',
    preset: 'github-markdown-css',
  },
  {
    name: 'asciidoc',
    title: 'AsciiDoc',
    parser: 'babel',
    plugin: 'vendor/prettier/parser-babel.mjs',
    compiler: {
      url: 'vendor/asciidoctor/asciidoctor.min.js',
      factory: () => {
        const asciidoctor = (window as any).Asciidoctor();
        return asciidoctor.convert.bind(asciidoctor);
      },
      umd: true,
    },
    extensions: ['adoc', 'asciidoc', 'asc'],
    editor: 'markup',
    preset: 'asciidoctor.css',
  },
  {
    name: 'css',
    title: 'CSS',
    parser: 'css',
    plugin: 'vendor/prettier/parser-postcss.mjs',
    extensions: ['css'],
    editor: 'style',
  },
  {
    name: 'scss',
    title: 'SCSS',
    parser: 'scss',
    plugin: 'vendor/prettier/parser-postcss.mjs',
    compiler: {
      url: 'vendor/sass.js/sass.js',
      factory: (module: any, config: Pen) => module.createCompile(config),
    },
    extensions: ['scss'],
    editor: 'style',
  },
  {
    name: 'sass',
    title: 'Sass',
    parser: 'scss',
    plugin: 'vendor/prettier/parser-postcss.mjs',
    compiler: 'scss',
    extensions: ['sass'],
    editor: 'style',
  },
  {
    name: 'less',
    title: 'Less',
    parser: 'less',
    plugin: 'vendor/prettier/parser-postcss.mjs',
    compiler: {
      url: 'vendor/less/less.js',
      factory: (render: any) => render,
    },
    extensions: ['less'],
    editor: 'style',
  },
  {
    name: 'stylus',
    title: 'Stylus',
    parser: 'less',
    plugin: 'vendor/prettier/parser-postcss.mjs',
    compiler: {
      url: 'vendor/stylus/stylus.min.js',
      factory: () => (window as any).stylus.render,
      umd: true,
    },
    extensions: ['styl'],
    editor: 'style',
  },
  {
    name: 'javascript',
    title: 'JS',
    longTitle: 'JavaScript',
    parser: 'babel',
    plugin: 'vendor/prettier/parser-babel.mjs',
    extensions: ['js'],
    editor: 'script',
  },
  {
    name: 'typescript',
    title: 'TS',
    longTitle: 'TypeScript',
    parser: 'babel',
    plugin: 'vendor/prettier/parser-babel.mjs',
    compiler: {
      url: 'vendor/typescript/typescript.min.js',
      factory: (module: any) => module.transpile,
    },
    extensions: ['ts'],
    editor: 'script',
  },
  {
    name: 'jsx',
    title: 'JSX',
    parser: 'babel',
    plugin: 'vendor/prettier/parser-babel.mjs',
    compiler: 'typescript',
    extensions: ['jsx'],
    editor: 'script',
  },
  {
    name: 'tsx',
    title: 'TSX',
    parser: 'babel',
    plugin: 'vendor/prettier/parser-babel.mjs',
    compiler: 'typescript',
    extensions: ['tsx'],
    editor: 'script',
  },
  {
    name: 'coffeescript',
    title: 'Coffee',
    longTitle: 'CoffeeScript',
    parser: 'babel',
    plugin: 'vendor/prettier/parser-babel.mjs',
    compiler: {
      url: 'vendor/coffeescript/coffeescript.js',
      factory: () => (window as any).CoffeeScript.compile,
      umd: true,
    },
    extensions: ['coffee'],
    editor: 'script',
  },
];

export const postProcessors: Processors[] = [
  {
    name: 'autoprefixer',
    compiler: {
      url: 'vendor/autoprefixer/autoprefixer.js',
      factory: (module: any) => {
        const { postcss, autoprefixer } = module;
        const postcss1 = postcss([autoprefixer({ overrideBrowserslist: ['last 4 version'] })]);
        return postcss1.process.bind(postcss1);
      },
    },
    editors: ['style'],
  },
];

export const cssPresets: CssPreset[] = [
  {
    id: 'normalize.css',
    name: 'Normalize.css',
    url: 'vendor/normalize.css/normalize.css',
  },
  {
    id: 'reset-css',
    name: 'CSS reset',
    url: 'vendor/reset-css/reset.css',
  },
  {
    id: 'github-markdown-css',
    name: 'github-markdown-css',
    url: 'vendor/github-markdown-css/github-markdown.css',
  },
  {
    id: 'asciidoctor.css',
    name: 'Asciidoctor CSS',
    url: 'vendor/asciidoctor.css/asciidoctor.css',
  },
];

export const getLanguageByAlias = (alias: string): Language | undefined => {
  const aliasLowerCase = alias?.toLowerCase();
  return languages.find(
    (language) =>
      language.name === aliasLowerCase ||
      language.title.toLowerCase() === aliasLowerCase ||
      language.extensions.map((ext) => ext.toLowerCase()).includes(aliasLowerCase),
  )?.name;
};

export const getLanguageEditorId = (alias: Language): EditorId | undefined =>
  languages.find((lang) => lang.name === getLanguageByAlias(alias))?.editor;

export const getLanguageExtension = (alias: string): Language | undefined =>
  languages.find((lang) => lang.name === getLanguageByAlias(alias))?.extensions[0];
