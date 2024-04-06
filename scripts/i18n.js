const fs = require('fs');
const path = require('path');

const srcDir = 'src/livecodes/i18n/locales/';
const outDir = 'build/livecodes/locales/';

const buildI18n = async () => {
  const getFileNames = async (dir = srcDir) => {
    let i18nFiles = {};
    const locales = (await fs.promises.readdir(dir))
      .filter((name) => fs.statSync(dir + name).isDirectory());
    await Promise.all(
      locales.map(async (locale) => {
        i18nFiles[locale] = await fs.promises.readdir(dir + locale);
      })
    );
    return i18nFiles;
  };

  const files = await getFileNames(srcDir);
  console.log(files);

  await Promise.all(
    Object.keys(files).map(async (locale) => {
      const localeDir = path.join(outDir, locale);
      fs.mkdirSync(localeDir, { recursive: true });
      await Promise.all(
        files[locale].map(async (file) => {
          const content = await fs.promises.readFile(path.join(srcDir, locale, file), 'utf-8');
          await fs.promises.writeFile(path.join(localeDir, file), content);
        })
      );
    })
  );
};

module.exports = { buildI18n };

if (require.main === module) {
  buildI18n();
}
