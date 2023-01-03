const fs = require('fs');
const path = require('path');
const dts = require('dts-bundle');

const outDir = 'build/sdk/';
const outFile = 'livecodes.d.ts';

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
