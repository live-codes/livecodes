const esbuild = require('esbuild');
const NodeModulesPolyfills = require('@esbuild-plugins/node-modules-polyfill').default;
const GlobalsPolyfills = require('@esbuild-plugins/node-globals-polyfill').default;

/** @type {Partial<esbuild.BuildOptions>} */
const baseOptions = {
  bundle: true,
  minify: true,
  format: 'iife',
};

// sugarss
// esbuild.build({
//   ...baseOptions,
//   entryPoints: ['vendor_modules/imports/sugarss.ts'],
//   outfile: 'out.js',
//   define: {
//     global: 'window',
//   },
//   plugins: [
//     NodeModulesPolyfills(),
//     GlobalsPolyfills({
//       process: true,
//       buffer: true,
//       define: { 'process.env.NODE_ENV': '"production"' },
//     }),
//   ],
// });

// postcss
esbuild.build({
  ...baseOptions,
  entryPoints: ['vendor_modules/imports/postcss.ts'],
  outfile: 'src/localpen/vendor/postcss/postcss.js',
  format: 'iife',
  globalName: 'postcss',
  define: {
    global: 'window',
  },
  plugins: [
    NodeModulesPolyfills(),
    GlobalsPolyfills({
      process: true,
      buffer: true,
      define: { 'process.env.NODE_ENV': '"production"' },
    }),
  ],
});

// autoprefixer
esbuild.build({
  ...baseOptions,
  entryPoints: ['vendor_modules/imports/autoprefixer.ts'],
  outfile: 'src/localpen/vendor/autoprefixer/autoprefixer.js',
  format: 'iife',
  globalName: 'autoprefixer',
  define: {
    global: 'window',
  },
  plugins: [
    NodeModulesPolyfills(),
    GlobalsPolyfills({
      process: true,
      buffer: true,
      define: { 'process.env.NODE_ENV': '"production"' },
    }),
  ],
});

// postcss-preset-env
esbuild.build({
  ...baseOptions,
  entryPoints: ['vendor_modules/imports/postcss-preset-env.ts'],
  outfile: 'src/localpen/vendor/postcss-preset-env/postcss-preset-env.js',
  format: 'iife',
  globalName: 'postcssPresetEnv',
  define: {
    global: 'window',
  },
  plugins: [
    NodeModulesPolyfills(),
    GlobalsPolyfills({
      process: true,
      buffer: true,
      define: { 'process.env.NODE_ENV': '"production"' },
    }),
  ],
});
