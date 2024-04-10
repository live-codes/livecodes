const esbuild = require('esbuild');
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
        const localeDir = path.join(dir, locale);
        i18nFiles[locale] =
          (await fs.promises.readdir(localeDir))
          .filter((name) => !fs.statSync(path.resolve(localeDir, name)).isDirectory())
          .filter((name) => name.endsWith('.ts'));
      })
    );
    return i18nFiles;
  };

  const files = await getFileNames(srcDir);

  await Promise.all(
    Object.keys(files).map(async (locale) => {
      const localeDir = path.join(outDir, locale);
      fs.mkdirSync(localeDir, { recursive: true });
      await Promise.all(
        files[locale].map(async (file) => {
          const result = await esbuild.build({
            entryPoints: [path.join(srcDir, locale, file)],
            bundle: true,
            format: 'cjs',
            platform: 'node',
            write: false,
          });
          const js = result.outputFiles[0].text;
          const json = JSON.stringify(eval(js).default, null, 2);
          fs.writeFile(path.join(localeDir, file.replace('.ts', '.json')), json, 'utf8', (err) => {
            if (err) {
              console.log(err);
            }
          });
        })
      );
    })
  );
};

module.exports = { buildI18n };

if (require.main === module) {
  buildI18n();
}
