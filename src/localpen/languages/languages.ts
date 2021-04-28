import { CssPreset, LanguageSpecs, Pen, Processors } from '../models';

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
    extensions: ['md', 'markdown', 'mdown', 'mkdn'],
    editor: 'markup',
    preset: 'github-markdown-css',
  },
  {
    name: 'mdx',
    title: 'MDX',
    parser: {
      name: 'markdown',
      pluginUrls: [parserPlugins.markdown, parserPlugins.html],
    },
    compiler: {
      url: 'vendor/mdx/mdx.js',
      factory: () => async (code: string) => {
        const compiled = await (window as any).MDX.mdx(code, { skipExport: true });
        const removeShortcode = (str: string) => str.replace(/^.+= makeShortcode\(".+$/gm, '');
        const jsx = removeShortcode(compiled);
        return `import React from "react";
                import ReactDOM from "react-dom";
                ${jsx}
                ReactDOM.render(<MDXContent />, document.body);
                `;
      },
      umd: true,
    },
    extensions: ['mdx'],
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
    name: 'haml',
    title: 'Haml',
    compiler: {
      url: 'vendor/clientside-haml-js/haml.js',
      factory: () => (code: string) =>
        (window as any).haml.compileHaml({ source: code, tolerateFaults: true })(),
      umd: true,
    },
    extensions: ['haml'],
    editor: 'markup',
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
    // info: `
    // <div>Typed JavaScript at Any Scale</div>
    // <ul>
    //   <li><a href="#">Typescript Documentation</a></li>
    //   <li><a href="#">Typescript usage in LocalPen</a></li>
    //   <li><a href="#">Load starter template</a></li>
    // </ul>
    // `,
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
      name: 'babel-ts',
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
        `let app = document.querySelector("#app") || document.body;

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
        `let app = document.querySelector("#app") || document.body;

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
    name: 'svelte',
    title: 'Svelte',
    parser: {
      name: 'html',
      pluginUrls: [parserPlugins.html],
    },
    compiler: {
      url: 'vendor/svelte/svelte-compiler.3.37.0.min.js',
      factory: () => (code: string) => {
        const options = { css: true };
        const { js } = (window as any).svelte.compile(code, options);
        return `${js.code}

let app = document.querySelector("#app") || document.body;
new Component({ target: app });
`;
      },
      umd: true,
    },
    extensions: ['svelte'],
    editor: 'script',
  },
  {
    name: 'stencil',
    title: 'Stencil',
    parser: {
      name: 'babel-ts',
      pluginUrls: [parserPlugins.babel, parserPlugins.html],
    },
    compiler: {
      url: 'vendor/stencil/stencil.2.5.2.min.js',
      factory: () => async (code: string) => {
        const result = await (window as any).stencil.transpile(code, {
          sourceMap: false,
        });
        return result.code;
      },
      umd: true,
    },
    extensions: ['stencil.tsx'],
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
    name: 'livescript',
    title: 'LiveScript',
    compiler: {
      url: 'vendor/livescript/livescript-min.js',
      factory: () => (window as any).require('livescript').compile,
      scripts: ['vendor/livescript/prelude-browser-min.js'],
      umd: true,
    },
    extensions: ['ls'],
    editor: 'script',
  },
  {
    name: 'assemblyscript',
    title: 'AS',
    longTitle: 'AssemblyScript',
    compiler: {
      url: 'assets/noop.js',
      factory: () => (code: string) =>
        `/* ... compiling ... */

window.wasm = new Promise((resolve) => {
  require(["https://cdn.jsdelivr.net/npm/assemblyscript@latest/dist/sdk.js"],
  (sdk) => {
    const asc = sdk.asc;
    asc.ready.then(async () => {
      async function compile(code) {
        const { text, binary } = asc.compileString(code, {
          optimizeLevel: 3,
        });
        const wasmModule = await loader.instantiate(binary);
        return { wasmModule, text, binary };
      }

      const { wasmModule, text, binary } = await compile(
\`${code.replace(/\`/g, '\\`')}\`
      );
      resolve({ wasmModule, text, binary });
    });
  });
})
`.trimStart(),
      inlineScript: `window.addEventListener("load", async() => {
        const { text } = await wasm;
        const content = '//\\n// WebAssembly Text Format (module.wat)\\n//\\n' + text;
        parent.postMessage({type: 'compiled', payload: {language: 'assemblyscript', content}}, '*');
      });`,
      scripts: [
        'https://cdn.jsdelivr.net/npm/@assemblyscript/loader/umd/index.js',
        'https://cdnjs.cloudflare.com/ajax/libs/require.js/2.3.6/require.min.js',
      ],
      umd: true,
    },
    extensions: ['as', 'ts'],
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
    name: 'perl',
    title: 'Perl',
    compiler: {
      url: 'assets/noop.js',
      factory: () => (code) => code,
      umd: true,
      scripts: ['vendor/perlito/perlito5.min.js'],
      inlineScript: `
      window.addEventListener('load', () => {
        let js = '';
        document.querySelectorAll('script[type="text/perl"]').forEach(script => {
          const source = script.innerHTML;
          const compiled = p5pkg.Perlito5.compile_p5_to_js([source]).replace(
            'Do not edit this file - Generated by Perlito5',
            'Generated by Perlito5',
          )
          js = js === '' ? compiled : js + '\\n' + compiled;
        });
        eval(js);
        parent.postMessage({type: 'compiled', payload: {language: 'perl', content: js}}, '*');
      });
      `,
      scriptType: 'text/perl',
    },
    extensions: ['pl', 'pm'],
    editor: 'script',
  },
  {
    name: 'pascal',
    title: 'Pascal',
    compiler: {
      url: 'vendor/pascal.js/pascal.js',
      factory: (_: any, config: Pen) => {
        (self as any).Pascal.init(config.baseUrl);
        return (self as any).Pascal.compile;
      },
      umd: true,
    },
    extensions: ['pas'],
    editor: 'script',
  },
  {
    name: 'lua',
    title: 'Lua',
    compiler: {
      url: 'assets/noop.js',
      factory: () => (code) => code,
      umd: true,
      scripts: ['vendor/fengari-web/fengari-web.js'],
      scriptType: 'application/lua',
    },
    extensions: ['lua'],
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
