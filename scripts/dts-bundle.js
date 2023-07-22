const fs = require('fs');
const path = require('path');
const dts = require('dts-bundle');

const outDir = 'build/sdk/';
const outFile = 'livecodes.d.ts';
const outPath = outDir + outFile;

// delete if exists
try {
  fs.unlinkSync(path.resolve(outDir + outFile));
} catch {}

const options = {
  name: 'livecodes',
  main: outDir + '**/*.d.ts',
  out: outFile,
};

dts.bundle(options);

// patch
const content = fs.readFileSync(path.resolve(outPath), 'utf8');
const patched = content
  .replace(/export \* from 'livecodes\//g, "// export * from 'livecodes/")
  .replace(/livecodes\/index/g, 'livecodes')
  .replace(/@vue\/runtime-core/g, 'vue')
  .replace(/\.\.\/\.\.\/vue/g, 'vue');

fs.writeFileSync(path.resolve(outPath), patched, 'utf8');
