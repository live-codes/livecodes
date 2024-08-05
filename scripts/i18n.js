const esbuild = require('esbuild');
const fs = require('fs');
const path = require('path');
const prettier = require('prettier');
const prettierConfig = require('./i18n-export').prettierConfig;

const outDir = path.resolve('build/livecodes/');
const i18nDir = path.resolve('src/livecodes/i18n/');
const srcDir = path.join(i18nDir, 'locales');

const buildI18n = async () => {
  const getFilePaths = async (dir = srcDir) => {
    let i18nFiles = [];
    const locales = (await fs.promises.readdir(dir))
      .filter((name) =>
        fs.statSync(path.join(dir, name)).isDirectory(),
      )
      .filter((name) => name !== 'tmp');  // Skip tmp directory
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

const buildLocalePathLoader = async () => {
  const locales = (await fs.promises.readdir(srcDir)).filter((name) =>
    fs.statSync(path.join(srcDir, name)).isDirectory() && name !== 'tmp'
  );
  const namespaces = (await fs.promises.readdir(path.join(srcDir, 'en')))
    .filter((name) => name.endsWith('.ts'))
    .map((name) => name.replace('.ts', ''));

  let ifStatements = '';
  for (const locale of locales) {
    for (const ns of namespaces) {
      ifStatements += `if (lng === '${locale}' && ns === '${ns}') {
        return baseUrl + '{{hash:translation-${locale}-${ns}.json}}';
      }\n`;
    }
  }

  const loader = await prettier.format(`// ATTENTION: This file is auto-generated. Do not edit manually!

    export const pathLoader = (baseUrl: string) => (lngs: string[], nss: string[]) => {
      const lng = lngs[0];
      const ns = nss[0];
      ${ifStatements}return false;
    };
  `, {
    parser: 'typescript',
    ...prettierConfig,
  });
  await fs.promises.writeFile(path.join(i18nDir, 'locale-paths.ts'), loader, 'utf8');
};

module.exports = { buildI18n, buildLocalePathLoader };

if (require.main === module) {
  buildLocalePathLoader();
  buildI18n();
}
