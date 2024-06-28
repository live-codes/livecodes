const fs = require('fs');
const path = require('path');

const TS_NOCHECK = '// @ts-nocheck';

// This script is for excluding other i18n locales from type checking, as they might stay outdated and cause errors

// For all .ts files in src/livecodes/i18n/locales/**/ but not in src/livecodes/i18n/locales/en/
// If process.env.BUILD_INCLUDE_LOCALES is set to true, do nothing
// Otherwise, add // @ts-nocheck to the first line of the file if phase is 'pre', or remove it if phase is 'post'

const phase = process.argv[2];
console.log(`Running i18n-exclude in ${phase} phase`);

const localesDir = path.resolve('src/livecodes/i18n/locales');

const dirs = fs.readdirSync(localesDir, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory() && dirent.name !== 'en')
  .map(dirent => path.join(localesDir, dirent.name));

dirs.forEach(dir => {
  const tsFiles = fs.readdirSync(dir)
    .filter(file => file.endsWith('.ts'))
    .map(file => path.join(dir, file));

  for (const file of tsFiles) {
    if (process.env.BUILD_INCLUDE_LOCALES !== 'true') {
      const content = fs.readFileSync(file, 'utf8');
      const lines = content.split('\n');

      if (phase === 'pre') {
        lines.splice(0, 0, TS_NOCHECK);
      } else if (phase === 'post') {
        if (lines[0].startsWith(TS_NOCHECK)) {
          lines.splice(0, 1);
        }
      }

      fs.writeFileSync(file, lines.join('\n'), 'utf8');
    }
  }
});