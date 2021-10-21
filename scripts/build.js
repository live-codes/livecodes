var esbuild = require('esbuild');
var fs = require('fs');
var path = require('path');

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
  return '(function(){' + code.trim() + '})();\n';
}

var srcDir = path.resolve(__dirname + '/../src/livecodes');
var outDir = path.resolve(__dirname + '/../build');
mkdirp(outDir);
fs.copyFileSync(
  path.resolve(__dirname + '/../src/favicon.ico'),
  path.resolve(outDir + '/favicon.ico'),
);

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
};

esbuild.buildSync({
  ...baseOptions,
  entryPoints: ['src/livecodes/index.ts', 'src/livecodes/app.ts', 'src/livecodes/embed.ts'],
  loader: { '.html': 'text', '.ttf': 'file' },
  logLevel: 'error',
  define: {
    'process.env.VERSION': `"${version || ''}"`,
    'process.env.GIT_COMMIT': `"${gitCommit || ''}"`,
    'process.env.REPO_URL': `"${repoUrl || ''}"`,
  },
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
  fs.writeFileSync(path.resolve('build/livecodes', filename), iife(content));
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

esbuild.buildSync({
  ...baseOptions,
  entryPoints: [
    'src/livecodes/editor/prism/prism-basic.ts',
    'src/livecodes/editor/prism/prism-full.ts',
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
  entryPoints: ['src/livecodes/editor/blockly/blockly-editor.ts'],
  loader: { '.html': 'text' },
});

console.log('built to: ' + baseOptions.outdir);
