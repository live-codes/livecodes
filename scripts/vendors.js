const esbuild = require('esbuild');
const pkg = require('../package.json');

const buildVendors = () => {
  const srcDir = 'src/livecodes/editor/monaco/';
  const outputDir = 'build/livecodes/';
  const monacoOutDir = outputDir + `vendor/monaco-editor/v${pkg.dependencies['monaco-editor']}/`;
  const codemirrorOutDir = outputDir + `vendor/codemirror/v${pkg.dependencies['codemirror']}/`;

  /**
   * @param {Record<string,string>} acc
   * @param {string} cur
   */
  function arrToObj(acc, cur) {
    const path = cur.split('/');
    const out = path[path.length - 1].replace('.ts', '');
    return {
      ...acc,
      [out]: cur,
    };
  }

  /** @type {Partial<esbuild.BuildOptions>} */
  const baseOptions = {
    bundle: true,
    minify: true,
    target: 'es2020',
    sourcemap: true,
    sourcesContent: true,
    outdir: outputDir,
    format: 'esm',
    define: { global: 'window', 'process.env.NODE_ENV': '"production"' },
  };

  // Monaco languages
  esbuild.buildSync({
    ...baseOptions,
    entryPoints: [
      'monaco-lang-astro.ts',
      'monaco-lang-clio.ts',
      'monaco-lang-imba.ts',
      // 'monaco-lang-sql.ts',
      'monaco-lang-wat.ts',
    ].map((entry) => srcDir + 'languages/' + entry),
    outdir: outputDir,
  });

  // Codemirror
  esbuild.buildSync({
    ...baseOptions,
    outdir: codemirrorOutDir,
    entryPoints: ['src/livecodes/editor/codemirror/codemirror-core.ts'],
  });

  esbuild.buildSync({
    ...baseOptions,
    outdir: codemirrorOutDir,
    ignoreAnnotations: true, // required for codemirror-emacs
    entryPoints: [
      'codemirror-vim.ts',
      'codemirror-emacs.ts',
      'codemirror-emmet.ts',
      'codemirror-codeium.ts',
      'languages/codemirror-lang-json.ts',
      'languages/codemirror-lang-markdown.ts',
      'languages/codemirror-lang-python.ts',
      'languages/codemirror-lang-scss.ts',
      'languages/codemirror-lang-coffeescript.ts',
      'languages/codemirror-lang-livescript.ts',
      'languages/codemirror-lang-php.ts',
      'languages/codemirror-lang-cpp.ts',
      'languages/codemirror-lang-sql.ts',
      'languages/codemirror-lang-wast.ts',
      'languages/codemirror-lang-ruby.ts',
      'languages/codemirror-lang-go.ts',
      'languages/codemirror-lang-perl.ts',
      'languages/codemirror-lang-lua.ts',
      'languages/codemirror-lang-r.ts',
      'languages/codemirror-lang-julia.ts',
      'languages/codemirror-lang-scheme.ts',
      'languages/codemirror-lang-clojure.ts',
      'languages/codemirror-lang-tcl.ts',
      'languages/codemirror-lang-less.ts',
      'languages/codemirror-lang-stylus.ts',
      'languages/codemirror-lang-vue.ts',
      'languages/codemirror-lang-rust.ts',
      'languages/codemirror-lang-swift.ts',
    ]
      .map((x) => 'src/livecodes/editor/codemirror/' + x)
      .reduce(arrToObj, {}),
    external: [
      '@codemirror/state',
      '@codemirror/theme-one-dark',
      '@codemirror/view',
      '@codemirror/commands',
      '@codemirror/language',
      '@codemirror/search',
      '@codemirror/autocomplete',
      '@codemirror/lint',
      '@codemirror/lang-html',
      '@codemirror/lang-css',
      '@codemirror/lang-javascript',
      '@lezer/highlight',
      '@lezer/common',
      '@lezer/lr',
    ],
  });
};

module.exports = { buildVendors };

if (require.main === module) {
  buildVendors();
}
