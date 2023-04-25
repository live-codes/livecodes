// This is a work-around to provide app dependencies for storybook
// Directly importing them result in error babel unable to parse type imports
// see https://github.com/storybookjs/storybook/issues/20423

const esbuild = require('esbuild');

/** @type {Partial<esbuild.BuildOptions>} */
const buildOptions = {
  bundle: true,
  minify: false,
  outfile: 'temp/livecodes.ts',
  format: 'esm',
  target: 'es2020',
  sourcemap: false,
  logLevel: 'error',
  entryPoints: ['temp/imports.ts'],
};

esbuild.build(buildOptions);
