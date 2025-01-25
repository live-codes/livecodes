const esbuild = require('esbuild');

const buildVendors = () => {
  const srcDir = 'src/livecodes/editor/monaco/';
  const outputDir = 'build/livecodes/';

  /** @type {Partial<esbuild.BuildOptions>} */
  const baseOptions = {
    bundle: true,
    minify: true,
    target: 'es2020',
    sourcemap: true,
    sourcesContent: true,
    outdir: outputDir,
    format: 'esm',
    define: {
      global: 'window',
      'process.env.NODE_ENV': '"production"',
    },
  };

  // Monaco languages
  esbuild.buildSync({
    ...baseOptions,
    entryPoints: [
      'monaco-lang-astro.ts',
      'monaco-lang-clio.ts',
      'monaco-lang-imba.ts',
      // 'monaco-lang-sql.ts',
      'monaco-lang-wat.ts',
    ].map((entry) => srcDir + 'languages/' + entry),
    outdir: outputDir,
  });
};

module.exports = { buildVendors };

if (require.main === module) {
  buildVendors();
}
