var esbuild = require('esbuild');
var fs = require('fs');
var path = require('path');
var pkg = require('../package.json');

/** @param {string} dir */
function mkdirp(dir) {
  if (!fs.existsSync(path.resolve(dir))) {
    fs.mkdirSync(path.resolve(dir));
  }
}
/** @param {ArrayBuffer | Uint8Array} uint8array */
function uint8arrayToString(uint8array) {
  return Buffer.from(uint8array).toString('utf-8');
}
/** @param {string} code */
function iife(code) {
  return '(function(){' + code.trim() + '\n})();\n';
}

var srcDir = path.resolve(__dirname + '/../src/livecodes');
var outDir = path.resolve(__dirname + '/../build');
mkdirp(outDir);
fs.copyFileSync(
  path.resolve(__dirname + '/../src/favicon.ico'),
  path.resolve(outDir + '/favicon.ico'),
);
fs.copyFileSync(path.resolve(__dirname + '/../src/404.html'), path.resolve(outDir + '/404.html'));

var childProcess = require('child_process');
var version, gitCommit, repoUrl;
try {
  version = require('../package.json').version;
  gitCommit = childProcess.execSync('git rev-parse --short=8 HEAD').toString().replace(/\n/g, '');
  repoUrl = require('../package.json').repository.url;
  if (repoUrl.endsWith('/')) {
    repoUrl = repoUrl.slice(0, -1);
  }
} catch (error) {
  console.log(error);
}

/** @type {Partial<esbuild.BuildOptions>} */
var baseOptions = {
  bundle: true,
  minify: true,
  outdir: 'build/livecodes',
  format: 'esm',
  target: 'es2020',
  sourcemap: true,
  sourcesContent: true,
  define: {
    'process.env.VERSION': `"${version || ''}"`,
    'process.env.GIT_COMMIT': `"${gitCommit || ''}"`,
    'process.env.REPO_URL': `"${repoUrl || ''}"`,
    'process.env.CI': `${process.env.CI || false}`,
    'process.env.monacoVersion': `"v${pkg.dependencies['monaco-editor']}"`,
  },
};

esbuild.buildSync({
  ...baseOptions,
  entryPoints: ['src/livecodes/app.ts', 'src/livecodes/embed.ts', 'src/livecodes/lite.ts'],
  loader: { '.html': 'text', '.ttf': 'file' },
  logLevel: 'error',
});

fs.copyFileSync(path.resolve('src/livecodes/models.ts'), path.resolve('src/lib/models.ts'));

esbuild.buildSync({
  ...baseOptions,
  entryPoints: ['src/lib/livecodes.ts'],
  outdir: undefined,
  outfile: 'build/lib/livecodes.esm.js',
});

esbuild.buildSync({
  ...baseOptions,
  entryPoints: ['src/lib/livecodes.ts'],
  outdir: undefined,
  outfile: 'build/lib/livecodes.js',
  format: 'iife',
  globalName: 'livecodes',
});

/** @type {Partial<esbuild.BuildOptions>} */
var workerOptions = {
  ...baseOptions,
  entryPoints: [
    'src/livecodes/compiler/compile.worker.ts',
    'src/livecodes/formatter/format.worker.ts',
  ],
  write: false,
};

var worker = esbuild.buildSync(workerOptions);
for (let out of worker.outputFiles) {
  var content = uint8arrayToString(out.contents);
  var filename = path.basename(out.path);
  fs.writeFileSync(
    path.resolve('build/livecodes', filename),
    filename.endsWith('.map') ? content : iife(content),
  );
}

esbuild.buildSync({
  ...baseOptions,
  entryPoints: ['src/livecodes/compiler/compile.page.ts'],
  format: 'iife',
});

esbuild.buildSync({
  ...baseOptions,
  entryPoints: [
    'src/livecodes/editor/codemirror/codemirror-basic.ts',
    'src/livecodes/editor/codemirror/codemirror-full.ts',
  ],
});

esbuild.buildSync({
  ...baseOptions,
  entryPoints: ['src/livecodes/editor/monaco/monaco.ts'],
});

esbuild.build({
  ...baseOptions,
  entryPoints: [
    'monaco-astro.ts',
    'monaco-clio.ts',
    'monaco-imba.ts',
    'monaco-sql.ts',
    'monaco-wat.ts',
  ].map((entry) => 'src/livecodes/editor/monaco/languages/' + entry),
});

esbuild.buildSync({
  ...baseOptions,
  entryPoints: [
    'src/livecodes/editor/codejar/codejar-basic.ts',
    'src/livecodes/editor/codejar/codejar-full.ts',
  ],
});

esbuild.buildSync({
  ...baseOptions,
  entryPoints: ['src/livecodes/result/result-utils.ts'],
  format: 'iife',
});

esbuild.buildSync({
  ...baseOptions,
  entryPoints: ['src/livecodes/compiler/compiler-utils.ts'],
  format: 'iife',
});

esbuild.buildSync({
  ...baseOptions,
  entryPoints: ['src/livecodes/editor/custom-editor-utils.ts'],
  format: 'iife',
});

esbuild.buildSync({
  entryPoints: ['src/livecodes/templates/starter/index.ts'],
  bundle: true,
  minify: true,
  outfile: 'build/livecodes/templates.js',
  format: 'esm',
});

esbuild.buildSync({
  ...baseOptions,
  entryPoints: ['src/livecodes/services/firebase.ts'],
});

esbuild.buildSync({
  ...baseOptions,
  entryPoints: ['src/livecodes/languages/language-info.ts'],
  loader: { '.html': 'text' },
});

esbuild.buildSync({
  ...baseOptions,
  entryPoints: ['src/livecodes/UI/open.ts'],
  loader: { '.html': 'text' },
});

esbuild.buildSync({
  ...baseOptions,
  entryPoints: ['src/livecodes/UI/assets.ts'],
  loader: { '.html': 'text' },
});

esbuild.buildSync({
  ...baseOptions,
  entryPoints: ['src/livecodes/UI/import.ts'],
  loader: { '.html': 'text' },
});

esbuild.buildSync({
  ...baseOptions,
  entryPoints: ['src/livecodes/UI/share.ts'],
  loader: { '.html': 'text' },
});

esbuild.buildSync({
  ...baseOptions,
  entryPoints: ['src/livecodes/UI/embed-ui.ts'],
  loader: { '.html': 'text' },
});

esbuild.buildSync({
  ...baseOptions,
  entryPoints: ['src/livecodes/editor/blockly/blockly.ts'],
  loader: { '.html': 'text' },
});

esbuild.buildSync({
  ...baseOptions,
  entryPoints: ['src/livecodes/editor/quill/quill.ts'],
  loader: { '.html': 'text' },
});

[
  'assemblyscript/lang-assemblyscript-script.ts',
  'assemblyscript/lang-assemblyscript-compiler.ts',
  'astro/lang-astro-compiler.ts',
  'clio/lang-clio-compiler.ts',
  'commonlisp/lang-commonlisp-script.ts',
  'cpp/lang-cpp-script.ts',
  'cpp-clang/lang-cpp-clang-script.ts',
  'diagram/lang-diagram-compiler-esm.ts',
  'dot/lang-dot-compiler.ts',
  'ejs/lang-ejs-compiler.ts',
  'haml/lang-haml-compiler.ts',
  'handlebars/lang-handlebars-compiler.ts',
  'imba/lang-imba-compiler.ts',
  'julia/lang-julia-script.ts',
  'liquid/lang-liquid-compiler.ts',
  'malina/lang-malina-compiler.ts',
  'rescript/lang-rescript-compiler-esm.ts',
  'rescript/lang-rescript-formatter.ts',
  'mustache/lang-mustache-compiler.ts',
  'nunjucks/lang-nunjucks-compiler.ts',
  'perl/lang-perl-script.ts',
  'prolog/lang-prolog-script.ts',
  'pug/lang-pug-compiler.ts',
  'python-pyodide/lang-python-pyodide-script.ts',
  'riot/lang-riot-compiler.ts',
  'scss/lang-scss-compiler.ts',
  'solid/lang-solid-compiler.ts',
  'sql/lang-sql-compiler.ts',
  'sql/lang-sql-script.ts',
  'svelte/lang-svelte-compiler.ts',
  'tcl/lang-tcl-script.ts',
  'twig/lang-twig-compiler.ts',
  'vue/lang-vue-compiler.ts',
  'wat/lang-wat-compiler.ts',
  'wat/lang-wat-script.ts',
  'windicss/processor-windicss-compiler.ts',
  'postcss/processor-postcss-compiler.ts',
].forEach((entry) => {
  esbuild.buildSync({
    ...baseOptions,
    entryPoints: ['src/livecodes/languages/' + entry],
    format: entry.endsWith('-esm.ts') ? 'esm' : 'iife',
  });
});

console.log('built to: ' + baseOptions.outdir + '/');
