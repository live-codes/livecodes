var fs = require('fs');
var path = require('path');

var node_modules = path.resolve(__dirname + '/../node_modules');
var vendor_modules = path.resolve(__dirname + '/../vendor_modules/src');
var targetDir = path.resolve(__dirname + '/../src/localpen/vendor');

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

// sass.js
mkdirp(targetDir + '/sass.js');
fs.copyFileSync(
  path.resolve(node_modules + '/sass.js/dist/sass.worker.js'),
  path.resolve(targetDir + '/sass.js/sass.worker.js'),
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
mkdirp(targetDir + '/autoprefixer');
fs.copyFileSync(
  path.resolve(vendor_modules + '/autoprefixer/autoprefixer.js'),
  path.resolve(targetDir + '/autoprefixer/autoprefixer.js'),
);

// jszip
mkdirp(targetDir + '/jszip');
fs.copyFileSync(
  path.resolve(vendor_modules + '/jszip/jszip.js'),
  path.resolve(targetDir + '/jszip/jszip.js'),
);

// prettier
mkdirp(targetDir + '/prettier');
fs.copyFileSync(
  path.resolve(node_modules + '/prettier/esm/standalone.mjs'),
  path.resolve(targetDir + '/prettier/standalone.mjs'),
);
fs.copyFileSync(
  path.resolve(node_modules + '/prettier/esm/parser-babel.mjs'),
  path.resolve(targetDir + '/prettier/parser-babel.mjs'),
);
fs.copyFileSync(
  path.resolve(node_modules + '/prettier/esm/parser-html.mjs'),
  path.resolve(targetDir + '/prettier/parser-html.mjs'),
);
fs.copyFileSync(
  path.resolve(node_modules + '/prettier/esm/parser-postcss.mjs'),
  path.resolve(targetDir + '/prettier/parser-postcss.mjs'),
);
fs.copyFileSync(
  path.resolve(node_modules + '/prettier/esm/parser-markdown.mjs'),
  path.resolve(targetDir + '/prettier/parser-markdown.mjs'),
);

function mkdirp(dir) {
  if (!fs.existsSync(path.resolve(dir))) {
    fs.mkdirSync(path.resolve(dir));
  }
}
