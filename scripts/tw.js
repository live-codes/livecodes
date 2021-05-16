const esbuild = require('esbuild');
const NodeModulesPolyfills = require('@esbuild-plugins/node-modules-polyfill').default;
const GlobalsPolyfills = require('@esbuild-plugins/node-globals-polyfill').default;
const { replace } = require('esbuild-plugin-replace');

/** @type {Partial<esbuild.BuildOptions>} */
const baseOptions = {
  bundle: true,
  minify: true,
  format: 'esm',
};

// tailwindcss
esbuild.build({
  ...baseOptions,
  entryPoints: ['vendor_modules/imports/tailwindcss.ts'],
  outfile: 'src/localpen/vendor/tailwindcss/tailwindcss.js',
  format: 'iife',
  globalName: 'tailwindcss',
  define: {
    global: 'window',
  },
  // external: ['modern-normalize'],
  inject: ['./vendor_modules/imports/util.promisify.js'],
  plugins: [
    NodeModulesPolyfills(),
    GlobalsPolyfills({
      process: true,
      buffer: true,
      define: { 'process.env.NODE_ENV': '"production"' },
    }),
    // replace({
    //   'require("util.promisify")': 'global.promisify',
    // }),
  ],
});
