const esbuild = require('esbuild');

const srcDir = 'scripts/modules/';
const outputDir = 'build/livecodes/vendor/monaco-editor/';

/** @type {Partial<esbuild.BuildOptions>} */
const baseOptions = {
  bundle: true,
  minify: true,
  format: 'iife',
  define: { global: 'window', 'process.env.NODE_ENV': '"production"' },
};

// Monaco editor
esbuild.buildSync({
  ...baseOptions,
  entryPoints: [srcDir + 'monaco-editor.ts'],
  outfile: outputDir + 'monaco-editor.js',
  loader: { '.ttf': 'file' },
  format: 'esm',
});

// Monaco editor workers
const entryFiles = [
  'node_modules/monaco-editor/esm/vs/language/json/json.worker.js',
  'node_modules/monaco-editor/esm/vs/language/css/css.worker.js',
  'node_modules/monaco-editor/esm/vs/language/html/html.worker.js',
  'node_modules/monaco-editor/esm/vs/language/typescript/ts.worker.js',
  'node_modules/monaco-editor/esm/vs/editor/editor.worker.js',
];

entryFiles.forEach((entry) => {
  esbuild.build({
    ...baseOptions,
    entryPoints: [entry],
    outdir: outputDir,
  });
});

// Monaco languages
esbuild.build({
  ...baseOptions,
  entryPoints: ['astro.ts', 'clio.ts', 'imba.ts', 'wat.ts'].map((entry) => srcDir + entry),
  format: 'esm',
  outdir: outputDir + 'languages',
});
