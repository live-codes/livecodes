// This script is for excluding other i18n locales from type checking, as they might stay outdated and cause errors

// For all .ts files in src/livecodes/i18n/locales/**/ but not in src/livecodes/i18n/locales/en/
// If process.env.BUILD_INCLUDE_LOCALES is set to true, do nothing
// Otherwise, add // @ts-nocheck to the first line of the file if phase is 'pre', or remove it if phase is 'post'

const fs = require('fs');
const path = require('path');

const TS_NOCHECK = `// @ts-nocheck
// This comment is added by i18n-exclude script and should be automatically removed after build.
// If you see this comment in the file, it means there is something wrong during the build process.

`;

const localesDir = path.resolve('src/livecodes/i18n/locales');

const excludeLocales = () => {
  const phase = process.argv[2];
  console.log(`Running i18n-exclude in ${phase} phase`);

  const dirs = fs
    .readdirSync(localesDir, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory() && dirent.name !== 'en')
    .map((dirent) => path.join(localesDir, dirent.name));

  dirs.forEach((dir) => {
    const tsFiles = fs
      .readdirSync(dir)
      .filter((file) => file.endsWith('.ts'))
      .map((file) => path.join(dir, file));

    for (const file of tsFiles) {
      if (process.env.BUILD_INCLUDE_LOCALES !== 'true') {
        let content = fs.readFileSync(file, 'utf8');

        if (phase === 'pre') {
          if (!content.startsWith(TS_NOCHECK)) {
            // Only add the comment if it doesn't exist
            content = TS_NOCHECK + content;
          }
        } else if (phase === 'post') {
          content = content.replace(TS_NOCHECK, '');
        }

        fs.writeFileSync(file, content, 'utf8');
      }
    }
  });
};

if (require.main === module) {
  excludeLocales();
}

module.exports = { TS_NOCHECK };
