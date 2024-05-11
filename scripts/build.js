const esbuild = require('esbuild');
const minifyHTML = require('esbuild-plugin-minify-html').default;
const fs = require('fs');
const path = require('path');
const childProcess = require('child_process');

const pkg = require('../package.json');
const { applyHash } = require('./hash');
const { injectCss } = require('./inject-css');
const { buildVendors } = require('./vendors');
const { buildStyles } = require('./styles');

const args = process.argv.slice(2);
const devMode = args.includes('--dev');
const outDir = path.resolve(__dirname + '/../build');
const codemirrorVersion = `v${pkg.dependencies['codemirror']}`;
let appVersion, sdkVersion, gitCommit, repoUrl;

/** @param {string} dir */
function mkdir(dir) {
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

/**
 * @param {Record<string,string>} acc
 * @param {string} cur
 */
function arrToObj(acc, cur) {
  const custom = {
    'src/lib/livecodes.ts': 'livecodes.esm',
    'src/livecodes/templates/starter/index.ts': 'templates',
  };
  const path = cur.split('/');
  const out = cur in custom ? custom[cur] : path[path.length - 1].replace('.ts', '');
  return {
    ...acc,
    [out]: cur,
  };
}

const getFileNames = async (dir) =>
  (await fs.promises.readdir(dir)).filter((name) => !fs.statSync(dir + name).isDirectory());

const prepareDir = async () => {
  mkdir(outDir);
  mkdir(outDir + '/livecodes/');
  mkdir(outDir + '/sdk/');
  if (devMode) {
    mkdir(outDir + '/tmp/');
  }
  const fileNames = await getFileNames(outDir + '/livecodes/');
  await Promise.all(fileNames.map(async (f) => fs.promises.unlink(outDir + '/livecodes/' + f)));

  if (process.env.CF_PAGES) {
    // add headers in Cloudflare
    await fs.promises.copyFile(
      path.resolve(__dirname + '/../src/_headers'),
      path.resolve(outDir + '/_headers'),
    );
  }
  await fs.promises.copyFile(
    path.resolve(__dirname + '/../src/favicon.ico'),
    path.resolve(outDir + '/favicon.ico'),
  );
  await fs.promises.copyFile(
    path.resolve(__dirname + '/../src/404.html'),
    path.resolve(outDir + '/404.html'),
  );
  await fs.promises.copyFile(
    path.resolve(__dirname + '/../src/index.html'),
    path.resolve(outDir + '/index.html'),
  );
  await fs.promises.copyFile(
    path.resolve(__dirname + '/../src/livecodes/html/app-base.html'),
    path.resolve(outDir + '/app.html'),
  );
};

try {
  appVersion = require('../package.json').appVersion;
  sdkVersion = require('../src/sdk/package.sdk.json').version;
  gitCommit = childProcess.execSync('git rev-parse --short=7 HEAD').toString().replace(/\n/g, '');
  repoUrl = require('../package.json').repository.url;
  if (repoUrl.endsWith('/')) {
    repoUrl = repoUrl.slice(0, -1);
  }
} catch (error) {
  console.log(error);
}

const docsBaseUrl =
  process.env.DOCS_BASE_URL === 'null'
    ? 'https://livecodes.io/docs/'
    : process.env.DOCS_BASE_URL || (devMode ? 'http://localhost:3000/docs/' : '/docs/');

/** @type {Partial<esbuild.BuildOptions>} */
const baseOptions = {
  bundle: true,
  minify: devMode ? false : true,
  outdir: 'build/livecodes',
  format: 'esm',
  target: 'es2020',
  sourcemap: false,
  sourcesContent: true,
  define: {
    'process.env.VERSION': `"${appVersion || ''}"`,
    'process.env.SDK_VERSION': `"${sdkVersion || ''}"`,
    'process.env.GIT_COMMIT': `"${gitCommit || ''}"`,
    'process.env.REPO_URL': `"${repoUrl || ''}"`,
    'process.env.DOCS_BASE_URL': `"${docsBaseUrl}"`,
    'process.env.CI': `${process.env.CI || false}`,
    'process.env.codemirrorVersion': `"${codemirrorVersion}"`,
    define: 'undefined', // prevent using AMD (e.g. in lz-string)
  },
  loader: { '.html': 'text', '.ttf': 'file' },
  logLevel: 'error',
  external: ['@codemirror/*', '@lezer/*'],
  plugins: [
    ...(devMode
      ? []
      : [
          minifyHTML({
            collapseWhitespace: true,
            collapseBooleanAttributes: true,
            minifyJS: true,
            minifyCSS: true,
            processScripts: ['importmap'],
          }),
        ]),
  ],
};

const sdkBuild = () => {
  const sdkSrcDir = 'src/sdk/';
  const sdkSrcMod = sdkSrcDir + 'index.ts';
  const sdkOutDir = 'build/sdk/';

  fs.copyFileSync(path.resolve('LICENSE'), path.resolve(sdkOutDir + 'LICENSE'));
  fs.copyFileSync(path.resolve('README.md'), path.resolve(sdkOutDir + 'README.md'));
  fs.copyFileSync(
    path.resolve(sdkSrcDir + 'package.sdk.json'),
    path.resolve(sdkOutDir + 'package.json'),
  );

  const sdkOptions = {
    ...baseOptions,
    target: 'es2018',
    outdir: undefined,
  };

  return Promise.all([
    esbuild.build({
      ...sdkOptions,
      entryPoints: [sdkSrcMod],
      outdir: undefined,
      outfile: sdkOutDir + 'livecodes.js',
    }),
    esbuild.build({
      ...sdkOptions,
      entryPoints: [sdkSrcMod],
      outdir: undefined,
      outfile: sdkOutDir + 'livecodes.cjs',
      format: 'cjs',
    }),
    esbuild.build({
      ...sdkOptions,
      entryPoints: [sdkSrcMod],
      outdir: undefined,
      outfile: sdkOutDir + 'livecodes.umd.js',
      format: 'iife',
      globalName: 'livecodes',
    }),
    esbuild.build({
      ...sdkOptions,
      entryPoints: [sdkSrcDir + 'react.tsx'],
      outdir: undefined,
      outfile: sdkOutDir + 'react.js',
      external: ['react'],
    }),
    esbuild.build({
      ...sdkOptions,
      entryPoints: [sdkSrcDir + 'vue.ts'],
      outdir: undefined,
      outfile: sdkOutDir + 'vue.js',
      external: ['vue'],
      alias: {
        '@vue/runtime-core': 'vue',
      },
    }),
  ]);
};

const esmBuild = () =>
  esbuild.build({
    ...baseOptions,
    entryPoints: [
      'app.ts',
      'embed.ts',
      'lite.ts',
      'headless.ts',
      'templates/starter/index.ts',
      'editor/monaco/monaco.ts',
      'editor/codemirror/codemirror.ts',
      'editor/codejar/codejar.ts',
      'editor/blockly/blockly.ts',
      'editor/quill/quill.ts',
      'import/import-src.ts',
      'services/firebase.ts',
      'services/google-fonts.ts',
      'languages/language-info.ts',
      'export/export.ts',
      'sync/sync.ts',
      'types/bundle-types.ts',
      'UI/open.ts',
      'UI/resources.ts',
      'UI/assets.ts',
      'UI/snippets.ts',
      'UI/backup.ts',
      'UI/broadcast.ts',
      'UI/import.ts',
      'UI/share.ts',
      'UI/deploy.ts',
      'UI/sync-ui.ts',
      'UI/embed-ui.ts',
      'UI/editor-settings.ts',
      'languages/diagrams/lang-diagrams-compiler-esm.ts',
      'languages/postgresql/lang-postgresql-compiler-esm.ts',
      'languages/r/lang-r-script-esm.ts',
      'languages/rescript/lang-rescript-compiler-esm.ts',
    ]
      .map((x) => 'src/livecodes/' + x)
      .reduce(arrToObj, {}),
  });

const iifeBuild = () =>
  esbuild.build({
    ...baseOptions,
    format: 'iife',
    entryPoints: [
      'index.ts',
      'compiler/compile.page.ts',
      'compiler/compiler-utils.ts',
      'editor/custom-editor-utils.ts',
      'result/result-utils.ts',
      'languages/art-template/lang-art-template-compiler.ts',
      'languages/assemblyscript/lang-assemblyscript-script.ts',
      'languages/assemblyscript/lang-assemblyscript-compiler.ts',
      'languages/astro/lang-astro-compiler.ts',
      'languages/clio/lang-clio-compiler.ts',
      'languages/commonlisp/lang-commonlisp-script.ts',
      'languages/cpp/lang-cpp-script.ts',
      'languages/cpp-wasm/lang-cpp-wasm-script.ts',
      'languages/dot/lang-dot-compiler.ts',
      'languages/ejs/lang-ejs-compiler.ts',
      'languages/eta/lang-eta-compiler.ts',
      'languages/haml/lang-haml-compiler.ts',
      'languages/handlebars/lang-handlebars-compiler.ts',
      'languages/imba/lang-imba-compiler.ts',
      'languages/julia/lang-julia-script.ts',
      'languages/liquid/lang-liquid-compiler.ts',
      'languages/lua-wasm/lang-lua-wasm-script.ts',
      'languages/malina/lang-malina-compiler.ts',
      'languages/mustache/lang-mustache-compiler.ts',
      'languages/nunjucks/lang-nunjucks-compiler.ts',
      'languages/perl/lang-perl-script.ts',
      'languages/php-wasm/lang-php-wasm-script.ts',
      'languages/prolog/lang-prolog-script.ts',
      'languages/pug/lang-pug-compiler.ts',
      'languages/python-wasm/lang-python-wasm-script.ts',
      'languages/rescript/lang-rescript-formatter.ts',
      'languages/riot/lang-riot-compiler.ts',
      'languages/ruby-wasm/lang-ruby-wasm-script.ts',
      'languages/scss/lang-scss-compiler.ts',
      'languages/solid/lang-solid-compiler.ts',
      'languages/sql/lang-sql-compiler.ts',
      'languages/sql/lang-sql-script.ts',
      'languages/svelte/lang-svelte-compiler.ts',
      'languages/tcl/lang-tcl-script.ts',
      'languages/twig/lang-twig-compiler.ts',
      'languages/vue/lang-vue-compiler.ts',
      'languages/vue2/lang-vue2-compiler.ts',
      'languages/wat/lang-wat-compiler.ts',
      'languages/wat/lang-wat-script.ts',
      'languages/teal/lang-teal-compiler.ts',
      'languages/fennel/lang-fennel-compiler.ts',
      'languages/gleam/lang-gleam-compiler.ts',
      'languages/tailwindcss/processor-tailwindcss-compiler.ts',
      'languages/windicss/processor-windicss-compiler.ts',
      'languages/unocss/processor-unocss-compiler.ts',
      'languages/lightningcss/processor-lightningcss-compiler.ts',
      'languages/postcss/processor-postcss-compiler.ts',
    ]
      .map((x) => 'src/livecodes/' + x)
      .reduce(arrToObj, {}),
  });

/** @type {Partial<esbuild.BuildOptions>} */
const workerOptions = {
  ...baseOptions,
  entryPoints: [
    'src/livecodes/compiler/compile.worker.ts',
    'src/livecodes/formatter/format.worker.ts',
    'src/livecodes/sync/sync.worker.ts',
  ],
  write: false,
};

const workersBuild = () =>
  esbuild.build(workerOptions).then((worker) => {
    for (let out of worker.outputFiles || []) {
      const content = uint8arrayToString(out.contents);
      const filename = path.basename(out.path);
      fs.writeFile(
        path.resolve('build/livecodes', filename),
        filename.endsWith('.map') ? content : iife(content),
        () => {},
      );
    }
  });

const functionsBuild = () =>
  esbuild.build({
    ...baseOptions,
    outdir: 'functions/build',
    entryPoints: ['src/livecodes/utils/compression.ts'],
  });

const stylesBuild = () => buildStyles(devMode);

prepareDir().then(() => {
  Promise.all([esmBuild(), iifeBuild(), workersBuild(), stylesBuild(), sdkBuild()]).then(
    async () => {
      if (!devMode) {
        buildVendors();
        functionsBuild();
      }
      await applyHash({ devMode });
      await injectCss();
      if (devMode) {
        fs.writeFileSync(
          path.resolve('build/tmp/trigger-reload.txt'),
          new Date().toISOString(),
          'utf8',
        );
      }
      console.log('built to: ' + baseOptions.outdir + '/');
    },
  );
});
