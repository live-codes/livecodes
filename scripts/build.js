var fs = require('fs');
var path = require('path');
var esbuild = require('esbuild');

var srcDir = path.resolve(__dirname + '/../src/localpen');
var outDir = path.resolve(__dirname + '/../build');
mkdirp(outDir);
fs.copyFileSync(path.resolve(srcDir + '/localpen.json'), path.resolve(outDir + '/localpen.json'));
function mkdirp(dir) {
  if (!fs.existsSync(path.resolve(dir))) {
    fs.mkdirSync(path.resolve(dir));
  }
}

var buildOptions = {
  entryPoints: ['src/localpen/index.ts', 'src/localpen/app.ts'],
  bundle: true,
  minify: true,
  loader: { '.html': 'text', '.ttf': 'file' },
  outdir: 'build/localpen',
  format: 'esm',
  logLevel: 'error',
};

esbuild
  .build(buildOptions)
  .then(() => {
    console.log('built to: ' + buildOptions.outdir);
  })
  .catch(() => process.exit(1));

var buildOptionsUmd = {
  entryPoints: ['src/localpen/embed.ts'],
  bundle: true,
  minify: true,
  loader: { '.html': 'text', '.ttf': 'file' },
  outfile: 'build/localpen/embed.js',
  format: 'iife',
  globalName: 'localpen',
  logLevel: 'error',
};

esbuild
  .build(buildOptionsUmd)
  .then(() => {
    console.log('built to: ' + buildOptionsUmd.outfile);
  })
  .catch(() => process.exit(1));

require('child_process').exec('git rev-parse --short=8 HEAD', function (err, stdout) {
  if (err) return;
  fs.writeFileSync('.env', 'CODE_COMMIT=' + stdout, 'utf-8');
});
