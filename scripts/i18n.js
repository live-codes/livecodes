const esbuild = require('esbuild');
const fs = require('fs');
const path = require('path');

const pkg = require('../package.json');

const srcDir = path.resolve('src/livecodes/i18n/locales/');
const buildDir = path.resolve('build/livecodes/');
const outDir = path.join(buildDir, `i18n-v${pkg.appVersion}`);

const buildI18n = async () => {
  const getFilePaths = async (dir = srcDir) => {
    let i18nFiles = [];
    const locales = (await fs.promises.readdir(dir)).filter((name) =>
      fs.statSync(path.join(dir, name)).isDirectory(),
    );
    await Promise.all(
      locales.map(async (locale) => {
        const localeDir = path.join(dir, locale);
        i18nFiles.push(
          ...(await fs.promises.readdir(localeDir))
            .filter((name) => !fs.statSync(path.resolve(localeDir, name)).isDirectory())
            .filter((name) => name.endsWith('.ts'))
            .map((name) => path.join(srcDir, locale, name)),
        );
      }),
    );
    return i18nFiles;
  };

  const getFileInfo = (filePath) => {
    const parts = filePath.split(path.sep);
    const filename = parts[parts.length - 1];
    const locale = parts[parts.length - 2];
    return {
      locale,
      filename,
    };
  };

  const files = await getFilePaths(srcDir);
  if (!fs.existsSync(outDir)) {
    await fs.promises.mkdir(outDir, { recursive: true });
  }

  await esbuild
    .build({
      entryPoints: files,
      bundle: true,
      format: 'cjs',
      platform: 'node',
      write: false,
      outdir: outDir,
    })
    .then(async (result) => {
      await Promise.all(
        result.outputFiles.map(async (file) => {
          const js = file.text;
          const json = JSON.stringify(eval(js).default, null, 2);
          const { locale, filename } = getFileInfo(file.path);
          await fs.promises.writeFile(
            path.join(outDir, `translation-${locale}-${filename.replace('.js', '.json')}`),
            json,
            'utf8',
          );
        }),
      );
    });
};

module.exports = { buildI18n };

if (require.main === module) {
  buildI18n();
}
