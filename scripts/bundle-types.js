const fs = require('fs');
const path = require('path');
const dts = require('dts-bundle');

const bundleTypes = () => {
  const srcDir = 'build/sdk/types/';
  const outFile = 'livecodes.d.ts';
  const tempFile = 'temp.d.ts';
  const tempPath = srcDir + tempFile;
  const outPath = srcDir + outFile;

  // delete if exists
  try {
    fs.unlinkSync(path.resolve(tempPath));
  } catch {}
  try {
    fs.unlinkSync(path.resolve(outPath));
  } catch {}

  const options = {
    name: 'livecodes',
    main: srcDir + '**/*.d.ts',
    out: tempFile,
  };

  dts.bundle(options);

  // patch
  const content = fs.readFileSync(path.resolve(tempPath), 'utf8');
  const patched = content
    .replace(/export \* from 'livecodes\/.*;/g, '')
    .replace(/livecodes\/index/g, 'livecodes')
    .replace(/\/\/\s.*/g, '')
    .replace(/[\r\n]{2,}/g, '\n')
    .trimStart();

  fs.writeFileSync(path.resolve(outPath), patched, 'utf8');
  fs.unlinkSync(path.resolve(tempPath));
};

module.exports = { bundleTypes };

if (require.main === module) {
  bundleTypes();
}
