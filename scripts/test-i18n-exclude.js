// Check all folders under src/livecodes/i18n/locales, ensure no `.ts` files contains a specific comment defined in `i18n-exclude.js`.

const { TS_NOCHECK } = require('./i18n-exclude');
const fs = require('fs');
const path = require('path');

const localesDir = path.resolve('src/livecodes/i18n/locales');

const checkExcluded = () => {
  const dirs = fs
    .readdirSync(localesDir, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => path.join(localesDir, dirent.name));

  for (const dir of dirs) {
    const tsFiles = fs
      .readdirSync(dir)
      .filter((file) => file.endsWith('.ts'))
      .map((file) => path.join(dir, file));

    for (const file of tsFiles) {
      const content = fs.readFileSync(file, 'utf8');
      if (content.includes(TS_NOCHECK)) {
        throw new Error(`File ${file} contains the exclusion comment`);
      }
    }
  }

  console.log('No files contain the exclusion comment. Test passed.');
};

checkExcluded();
