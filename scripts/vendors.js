var fs = require('fs');
var path = require('path');

const esbuild = require('esbuild');
const Bundler = require('parcel-bundler');

function mkdirp(dir) {
  if (!fs.existsSync(path.resolve(dir))) {
    fs.mkdirSync(path.resolve(dir));
  }
}

function deleteContent(file, content) {
  var data = fs.readFileSync(file, 'utf-8');
  var newValue = data.replace(content, '');
  fs.writeFileSync(file, newValue, 'utf-8');
}

var node_modules = path.resolve(__dirname + '/../node_modules');
var vendor_modules = path.resolve(__dirname + '/../vendor_modules/src');
var targetDir = path.resolve(__dirname + '/../src/localpen/vendor');

/** @type {Partial<esbuild.BuildOptions>} */
const baseOptions = {
  bundle: true,
  minify: true,
  format: 'esm',
};

// Monaco editor
esbuild.buildSync({
  ...baseOptions,
  entryPoints: ['vendor_modules/imports/monaco-editor.ts'],
  outfile: 'src/localpen/vendor/monaco-editor/monaco-editor.js',
  loader: { '.ttf': 'file' },
});

// Monaco editor workers
const entryFiles = [
  'node_modules/monaco-editor/esm/vs/language/json/json.worker.js',
  'node_modules/monaco-editor/esm/vs/language/css/css.worker.js',
  'node_modules/monaco-editor/esm/vs/language/html/html.worker.js',
  'node_modules/monaco-editor/esm/vs/language/typescript/ts.worker.js',
  'node_modules/monaco-editor/esm/vs/editor/editor.worker.js',
];

/** @type {Bundler.ParcelOptions} */
const options = {
  outDir: './src/localpen/vendor/monaco-editor',
  minify: true,
  target: 'browser',
  sourceMaps: false,
  watch: false,
};

entryFiles.forEach(async (file) => {
  const parcelBundler = new Bundler([file], options);
  await parcelBundler.bundle();
});

// Patch and build Typescript
var tsOutDir = path.resolve(__dirname + '/../vendor_modules/src/typescript');
if (!fs.existsSync(tsOutDir)) {
  fs.mkdirSync(tsOutDir);
}
fs.copyFileSync(
  path.resolve(
    __dirname +
      '/../node_modules/monaco-editor/esm/vs/language/typescript/lib/typescriptServices.js',
  ),
  path.resolve(tsOutDir + '/typescriptServices.js'),
);
fs.appendFileSync(
  path.resolve(tsOutDir + '/typescriptServices.js'),
  'export var transpile = ts.transpile;\n',
);
esbuild.buildSync({
  ...baseOptions,
  entryPoints: ['vendor_modules/imports/typescript.js'],
  outfile: 'src/localpen/vendor/typescript/typescript.min.js',
  format: 'iife',
  globalName: 'typescript',
});

// Marked
mkdirp(targetDir + '/marked');
fs.copyFileSync(
  path.resolve(node_modules + '/marked/marked.min.js'),
  path.resolve(targetDir + '/marked/marked.min.js'),
);

// Sass
mkdirp(targetDir + '/sass.js');
fs.copyFileSync(
  path.resolve(node_modules + '/sass.js/dist/sass.js'),
  path.resolve(targetDir + '/sass.js/sass.js'),
);
fs.copyFileSync(
  path.resolve(node_modules + '/sass.js/dist/sass.worker.js'),
  path.resolve(targetDir + '/sass.js/sass.worker.js'),
);

// Less
esbuild.buildSync({
  ...baseOptions,
  entryPoints: ['vendor_modules/imports/less.js'],
  outfile: 'src/localpen/vendor/less/less.js',
  format: 'iife',
  globalName: 'less',
});

// github-markdown-css
mkdirp(targetDir + '/github-markdown-css');
fs.copyFileSync(
  path.resolve(node_modules + '/github-markdown-css/github-markdown.css'),
  path.resolve(targetDir + '/github-markdown-css/github-markdown.css'),
);

// asciidoctor.css
mkdirp(targetDir + '/asciidoctor.css');
fs.copyFileSync(
  path.resolve(vendor_modules + '/asciidoctor.css/asciidoctor.css'),
  path.resolve(targetDir + '/asciidoctor.css/asciidoctor.css'),
);

// normalize.css
mkdirp(targetDir + '/normalize.css');
fs.copyFileSync(
  path.resolve(node_modules + '/normalize.css/normalize.css'),
  path.resolve(targetDir + '/normalize.css/normalize.css'),
);

// reset-css
mkdirp(targetDir + '/reset-css');
fs.copyFileSync(
  path.resolve(node_modules + '/reset-css/reset.css'),
  path.resolve(targetDir + '/reset-css/reset.css'),
);

// luna-object-viewer
mkdirp(targetDir + '/luna-object-viewer');
fs.copyFileSync(
  path.resolve(node_modules + '/luna-object-viewer/luna-object-viewer.css'),
  path.resolve(targetDir + '/luna-object-viewer/luna-object-viewer.css'),
);
deleteContent(
  path.resolve(targetDir + '/luna-object-viewer/luna-object-viewer.css'),
  '\n/*# sourceMappingURL=luna-object-viewer.css.map*/',
);

// luna-console
mkdirp(targetDir + '/luna-console');
fs.copyFileSync(
  path.resolve(node_modules + '/luna-console/luna-console.css'),
  path.resolve(targetDir + '/luna-console/luna-console.css'),
);
deleteContent(
  path.resolve(targetDir + '/luna-console/luna-console.css'),
  '\n/*# sourceMappingURL=luna-console.css.map*/',
);

// stylus
mkdirp(targetDir + '/stylus');
fs.copyFileSync(
  path.resolve(vendor_modules + '/stylus/stylus.min.js'),
  path.resolve(targetDir + '/stylus/stylus.min.js'),
);

// pug
mkdirp(targetDir + '/pug');
fs.copyFileSync(
  path.resolve(vendor_modules + '/pug/pug.min.js'),
  path.resolve(targetDir + '/pug/pug.min.js'),
);

// asciidoctor
mkdirp(targetDir + '/asciidoctor');
fs.copyFileSync(
  path.resolve(node_modules + '/@asciidoctor/core/dist/browser/asciidoctor.min.js'),
  path.resolve(targetDir + '/asciidoctor/asciidoctor.min.js'),
);

// coffeescript
mkdirp(targetDir + '/coffeescript');
fs.copyFileSync(
  path.resolve(vendor_modules + '/coffeescript/coffeescript.js'),
  path.resolve(targetDir + '/coffeescript/coffeescript.js'),
);

// autoprefixer
esbuild.buildSync({
  ...baseOptions,
  entryPoints: ['vendor_modules/src/autoprefixer/autoprefixer.js'],
  outfile: 'src/localpen/vendor/autoprefixer/autoprefixer.js',
  format: 'iife',
  globalName: 'autoprefixer',
});

// jszip
mkdirp(targetDir + '/jszip');
fs.copyFileSync(
  path.resolve(vendor_modules + '/jszip/jszip.js'),
  path.resolve(targetDir + '/jszip/jszip.js'),
);

// prettier
mkdirp(targetDir + '/prettier');
fs.copyFileSync(
  path.resolve(node_modules + '/prettier/standalone.js'),
  path.resolve(targetDir + '/prettier/standalone.js'),
);
fs.copyFileSync(
  path.resolve(node_modules + '/prettier/parser-babel.js'),
  path.resolve(targetDir + '/prettier/parser-babel.js'),
);
fs.copyFileSync(
  path.resolve(node_modules + '/prettier/parser-html.js'),
  path.resolve(targetDir + '/prettier/parser-html.js'),
);
fs.copyFileSync(
  path.resolve(node_modules + '/prettier/parser-postcss.js'),
  path.resolve(targetDir + '/prettier/parser-postcss.js'),
);
fs.copyFileSync(
  path.resolve(node_modules + '/prettier/parser-markdown.js'),
  path.resolve(targetDir + '/prettier/parser-markdown.js'),
);
esbuild.buildSync({
  ...baseOptions,
  entryPoints: ['node_modules/@prettier/plugin-pug/dist/index.js'],
  outfile: 'src/localpen/vendor/prettier/parser-pug.js',
  define: { global: 'window', 'process.env.NODE_ENV': '"production"' },
  format: 'iife',
  globalName: 'pluginPug',
});

// snackbar
mkdirp(targetDir + '/snackbar');
fs.copyFileSync(
  path.resolve(node_modules + '/@snackbar/core/dist/snackbar.min.css'),
  path.resolve(targetDir + '/snackbar/snackbar.min.css'),
);

// brython
mkdirp(targetDir + '/brython');
fs.copyFileSync(
  path.resolve(vendor_modules + '/brython/brython.min.js'),
  path.resolve(targetDir + '/brython/brython.min.js'),
);
fs.copyFileSync(
  path.resolve(vendor_modules + '/brython/brython_stdlib.js'),
  path.resolve(targetDir + '/brython/brython_stdlib.js'),
);
