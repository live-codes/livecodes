const esbuild = require('esbuild');
const minifyHTML = require('esbuild-plugin-minify-html').default;
const fs = require('fs');
const path = require('path');

const { applyHash } = require('./hash');
const { injectCss } = require('./inject-css');
const { buildVendors } = require('./vendors');
const { buildStyles } = require('./styles');
const { arrToObj, mkdir, uint8arrayToString, iife, getFileNames, getEnvVars } = require('./utils');

const args = process.argv.slice(2);
const devMode = args.includes('--dev');
const outDir = path.resolve(__dirname + '/../build');

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
    ...getEnvVars(devMode),
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
      jsx: 'automatic',
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
      'languages/vento/lang-vento-compiler.ts',
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
  Promise.all([
    esbuild.build({
      ...baseOptions,
      outdir: 'functions/vendors',
      entryPoints: ['src/livecodes/utils/compression.ts'],
    }),
    esbuild
      .build({
        ...baseOptions,
        outdir: undefined,
        outfile: 'functions/vendors/templates.js',
        entryPoints: ['src/livecodes/templates/starter/index.ts'],
        define: {
          ...baseOptions.define,
          'window.deps.translateString': 'getTemplateName',
        },
      })
      .then(() => {
        fs.writeFileSync(
          'functions/vendors/templates.js',
          `var getTemplateName = (_, templateName) => templateName;\n${fs.readFileSync('functions/vendors/templates.js', 'utf8')}`,
          'utf8',
        );
      }),
  ]);

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
