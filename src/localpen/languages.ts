import { Compiler, CssPreset, EditorId, Language, LanguageSpecs, Pen, Processors } from './models';

const parserPlugins = {
  babel: 'vendor/prettier/parser-babel.js',
  html: 'vendor/prettier/parser-html.js',
  markdown: 'vendor/prettier/parser-markdown.js',
  postcss: 'vendor/prettier/parser-postcss.js',
  pug: 'vendor/prettier/parser-pug.js',
};
export const languages: LanguageSpecs[] = [
  {
    name: 'html',
    title: 'HTML',
    parser: {
      name: 'html',
      pluginUrls: [parserPlugins.html],
    },
    extensions: ['html', 'htm'],
    editor: 'markup',
  },
  {
    name: 'pug',
    title: 'Pug',
    parser: {
      name: 'pug',
      pluginUrls: [parserPlugins.pug],
    },
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
    parser: {
      name: 'markdown',
      pluginUrls: [parserPlugins.markdown, parserPlugins.html],
    },
    compiler: {
      url: 'vendor/marked/marked.min.js',
      factory: () => (window as any).marked,
      umd: true,
    },
    extensions: ['md', 'markdown', 'mdown', 'mkdn', 'mdx'],
    editor: 'markup',
    preset: 'github-markdown-css',
  },
  {
    name: 'asciidoc',
    title: 'AsciiDoc',
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
    parser: {
      name: 'css',
      pluginUrls: [parserPlugins.postcss],
    },
    extensions: ['css'],
    editor: 'style',
  },
  {
    name: 'scss',
    title: 'SCSS',
    parser: {
      name: 'scss',
      pluginUrls: [parserPlugins.postcss],
    },
    compiler: {
      url: 'vendor/sass.js/sass.js',
      factory: (_: any, config: Pen) => {
        const Sass = (window as any).Sass;
        const baseUrl = config.baseUrl || '/localpen/';
        Sass.setWorkerUrl(baseUrl + 'vendor/sass.js/sass.worker.js');
        const sass = new Sass();
        return (code, options = {}): Promise<string> =>
          new Promise((resolve) => {
            sass.compile(code, options, (result: string) => {
              resolve(result);
            });
          });
      },
      umd: true,
    },
    extensions: ['scss'],
    editor: 'style',
  },
  {
    name: 'sass',
    title: 'Sass',
    compiler: 'scss',
    extensions: ['sass'],
    editor: 'style',
  },
  {
    name: 'less',
    title: 'Less',
    parser: {
      name: 'less',
      pluginUrls: [parserPlugins.postcss],
    },
    compiler: {
      url: 'vendor/less/less.js',
      factory: () => (window as any).less.render,
      umd: true,
    },
    extensions: ['less'],
    editor: 'style',
  },
  {
    name: 'stylus',
    title: 'Stylus',
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
    parser: {
      name: 'babel',
      pluginUrls: [parserPlugins.babel, parserPlugins.html],
    },
    compiler: {
      url: 'assets/noop.js',
      factory: () => (code) => code,
    },
    extensions: ['js'],
    editor: 'script',
  },
  {
    name: 'babel',
    title: 'Babel',
    longTitle: 'ES Next (Babel)',
    parser: {
      name: 'babel',
      pluginUrls: [parserPlugins.babel, parserPlugins.html],
    },
    compiler: {
      url: 'vendor/babel/babel.min.js',
      factory: () => (window as any).Babel.transform,
      umd: true,
    },
    extensions: ['es', 'babel'],
    editor: 'script',
  },
  {
    name: 'typescript',
    title: 'TS',
    longTitle: 'TypeScript',
    parser: {
      name: 'babel-ts',
      pluginUrls: [parserPlugins.babel, parserPlugins.html],
    },
    compiler: {
      url: 'vendor/typescript/typescript.min.js',
      factory: () => (window as any).typescript.transpile,
      umd: true,
    },
    extensions: ['ts', 'typescript'],
    editor: 'script',
  },
  {
    name: 'jsx',
    title: 'JSX',
    longTitle: 'React JSX',
    parser: {
      name: 'babel',
      pluginUrls: [parserPlugins.babel, parserPlugins.html],
    },
    compiler: 'typescript',
    extensions: ['jsx'],
    editor: 'script',
  },
  {
    name: 'tsx',
    title: 'TSX',
    longTitle: 'React TSX',
    parser: {
      name: 'babel',
      pluginUrls: [parserPlugins.babel, parserPlugins.html],
    },
    compiler: 'typescript',
    extensions: ['tsx'],
    editor: 'script',
  },
  {
    name: 'vue',
    title: 'Vue 3',
    longTitle: 'Vue 3 SFC',
    parser: {
      name: 'html',
      pluginUrls: [parserPlugins.html],
    },
    compiler: {
      url: 'vendor/vue3-sfc-loader/vue3-sfc-loader.js',
      factory: () => (code) =>
        `let app = document.querySelector("#app");
if (!app) {
  app = document.createElement("div");
  app.id = 'app';
  document.body.appendChild(app);
}
/* <!-- */
let content = \`${code.replace(/`/g, '\\`')}\`;
/* --> */
const options = {
  moduleCache: { vue: Vue },
  async getFile(url) {
    if (url === '/component.vue') return content;
    const res = await fetch(url);
    if ( !res.ok )
      throw Object.assign(new Error(res.statusText + ' ' + url), { res });
    return await res.text();
  },
  addStyle: (textContent) => {
    const style = Object.assign(document.createElement('style'), { textContent });
    const ref = document.head.getElementsByTagName('style')[0] || null;
    document.head.insertBefore(style, ref);
  },
};
const { loadModule } = window['vue3-sfc-loader'];
const App = Vue.createApp(Vue.defineAsyncComponent(() => loadModule('/component.vue', options)));
App.mount(app)
App.config.devtools = true;
`,
      scripts: ['https://unpkg.com/vue@3', 'vendor/vue3-sfc-loader/vue3-sfc-loader.js'],
      umd: true,
    },
    extensions: ['vue', 'vue3'],
    editor: 'script',
  },
  {
    name: 'vue2',
    title: 'Vue 2',
    longTitle: 'Vue 2 SFC',
    parser: {
      name: 'html',
      pluginUrls: [parserPlugins.html],
    },
    compiler: {
      url: 'vendor/vue3-sfc-loader/vue2-sfc-loader.js',
      factory: () => (code) =>
        `let app = document.querySelector("#app");
if (!app) {
  app = document.createElement("div");
  app.id = 'app';
  document.body.appendChild(app);
}
/* <!-- */
let content = \`${code.replace(/`/g, '\\`')}\`;
/* --> */
const options = {
  moduleCache: { vue: Vue },
  async getFile(url) {
    if (url === '/component.vue') return content;
    const res = await fetch(url);
    if ( !res.ok )
      throw Object.assign(new Error(res.statusText + ' ' + url), { res });
    return await res.text();
  },
  addStyle: (textContent) => {
    const style = Object.assign(document.createElement('style'), { textContent });
    const ref = document.head.getElementsByTagName('style')[0] || null;
    document.head.insertBefore(style, ref);
  },
};
const { loadModule, vueVersion } = window['vue2-sfc-loader'];
loadModule('/component.vue', options)
  .then(component => new Vue(component).$mount(app));
Vue.config.devtools = true;
`,
      scripts: ['https://unpkg.com/vue@2', 'vendor/vue3-sfc-loader/vue2-sfc-loader.js'],
      umd: true,
    },
    extensions: ['vue2'],
    editor: 'script',
  },
  {
    name: 'coffeescript',
    title: 'Coffee',
    longTitle: 'CoffeeScript',
    compiler: {
      url: 'vendor/coffeescript/coffeescript.js',
      factory: () => (window as any).CoffeeScript.compile,
      umd: true,
    },
    extensions: ['coffee'],
    editor: 'script',
  },
  {
    name: 'python',
    title: 'Python',
    compiler: {
      url: 'assets/noop.js',
      factory: () => (code) => code,
      scripts: ['vendor/brython/brython.min.js', 'vendor/brython/brython_stdlib.js'],
      inlineScript: `window.addEventListener("load", () => {brython({ indexedDB: false })})`,
      scriptType: 'text/python',
    },
    extensions: ['py'],
    editor: 'script',
  },
  {
    name: 'ruby',
    title: 'Ruby',
    compiler: {
      url: 'assets/noop.js',
      factory: () => (code) => code,
      umd: true,
      scripts: [
        'vendor/opal/opal.min.js',
        'vendor/opal/native.min.js',
        'vendor/opal/opal-parser.min.js',
      ],
      inlineScript: `
        Opal.config.unsupported_features_severity = 'ignore';
        Opal.load('opal-parser');
        Opal.load('native');
      `,
      scriptType: 'text/ruby',
    },
    extensions: ['rb'],
    editor: 'script',
  },
  {
    name: 'php',
    title: 'PHP',
    compiler: {
      url: 'assets/noop.js',
      factory: () => (code) => {
        code = code.trim();
        if (code.startsWith('<?php')) {
          code = code.replace('<?php', '/* <?php */');
          if (code.endsWith('?>')) {
            code = code.replace('?>', '/* ?> */');
          }
        }
        return code;
      },
      umd: true,
      scripts: ['vendor/uniter/uniter.js'],
      deferScripts: true,
      scriptType: 'text/x-uniter-php',
    },
    extensions: ['php'],
    editor: 'script',
  },
  {
    name: 'scheme',
    title: 'Scheme',
    compiler: {
      url: 'assets/noop.js',
      factory: () => (code) => code,
      umd: true,
      scripts: ['vendor/biwascheme/biwascheme-min.js'],
      scriptType: 'text/biwascheme',
    },
    extensions: ['scm'],
    editor: 'script',
  },
];

export const postProcessors: Processors[] = [
  {
    name: 'autoprefixer',
    compiler: {
      url: 'vendor/autoprefixer/autoprefixer.js',
      factory: () => {
        const { postcss, autoprefixer } = (window as any).autoprefixer;
        const postcss1 = postcss([autoprefixer({ overrideBrowserslist: ['last 4 version'] })]);
        return postcss1.process.bind(postcss1);
      },
      umd: true,
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

export const getLanguageByAlias = (alias?: string): Language | undefined => {
  if (!alias) return;
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

export const getLanguageSpecs = (alias: string) =>
  languages.find((lang) => lang.name === getLanguageByAlias(alias));

export const getLanguageCompiler = (alias: string): Compiler | undefined => {
  const LanguageSpecs = getLanguageSpecs(alias);
  let compiler = LanguageSpecs?.compiler;
  if (typeof compiler === 'string') {
    compiler = getLanguageCompiler(compiler);
  }
  return compiler;
};

export const mapLanguage = (language: Language): Language =>
  ['babel', 'jsx'].includes(language)
    ? 'javascript'
    : language === 'tsx'
    ? 'typescript'
    : ['vue', 'vue2'].includes(language)
    ? 'html'
    : language;
