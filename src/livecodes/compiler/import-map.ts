import { Config } from '../models';
import { modulesService } from '../services';

export const importsPattern = /(import\s+?(?:(?:(?:[\w*\s{},\$]*)\s+from\s+?)|))((?:".*?")|(?:'.*?'))([\s]*?(?:;|$|))/g;

export const getImports = (code: string) =>
  [...code.matchAll(new RegExp(importsPattern))].map((arr) =>
    arr[2].replace(/"/g, '').replace(/'/g, ''),
  );

const isBare = (mod: string) =>
  !mod.startsWith('https://') &&
  !mod.startsWith('http://') &&
  !mod.startsWith('.') &&
  !mod.startsWith('/') &&
  !mod.startsWith('data:') &&
  !mod.startsWith('blob:');

export const createImportMap = (code: string, config: Config) =>
  getImports(code)
    .map((libName) => {
      if (!isBare(libName)) {
        return {};
      } else {
        const key = Object.keys(config.imports).find(
          (mod) => mod === libName || libName.startsWith(mod + '/'),
        );
        if (key) {
          return { [key]: config.imports[key] };
        }
        return { [libName]: modulesService.getModuleUrl(libName) };
      }
    })
    .reduce((acc, curr) => ({ ...acc, ...curr }), {} as Record<string, string>);

export const hasImports = (code: string) =>
  new RegExp(importsPattern).test(code) || new RegExp(/export {}/).test(code);

export const replaceImports = (code: string, config: Config) => {
  const importMap = createImportMap(code, config);
  return code.replace(new RegExp(importsPattern), (statement) => {
    const libName = statement
      .replace(new RegExp(importsPattern), '$2')
      .replace(/"/g, '')
      .replace(/'/g, '');

    const key = Object.keys(importMap).find(
      (mod) => mod === libName || libName.startsWith(mod + '/'),
    );
    if (!key) {
      return statement;
    }
    return statement.replace(key, importMap[key]);
  });
};

export const styleimportsPattern = /(?:@import\s+?)((?:".*?")|(?:'.*?')|(?:url\('.*?'\))|(?:url\(".*?"\)))(.*)?;/g;

export const hasStyleImports = (code: string) => new RegExp(styleimportsPattern).test(code);

export const replaceStyleImports = (code: string) =>
  code.replace(new RegExp(styleimportsPattern), (statement, match, media) => {
    const url = match.replace(/"/g, '').replace(/'/g, '').replace(/url\(/g, '').replace(/\)/g, '');
    const modified = '@import "' + modulesService.getModuleUrl(url, false) + '";';
    const mediaQuery = media?.trim();
    return !isBare(url)
      ? statement
      : mediaQuery
      ? `@media ${mediaQuery} {\n${modified}\n}`
      : modified;
  });
