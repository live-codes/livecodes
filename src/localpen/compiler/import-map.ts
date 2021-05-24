import { Pen } from '../models';

export const importsPattern = /(import\s+?(?:(?:(?:[\w*\s{},\$]*)\s+from\s+?)|))((?:".*?")|(?:'.*?'))([\s]*?(?:;|$|))/g;

export const createImportMap = (code: string, config: Pen) =>
  [...code.matchAll(new RegExp(importsPattern))]
    .map((arr) => {
      const libName = arr[2].replace(/"/g, '').replace(/'/g, '');
      if (libName.startsWith('http') || libName.startsWith('.') || libName.startsWith('/')) {
        return {};
      } else {
        const key = Object.keys(config.imports).find(
          (key) => key === libName || libName.startsWith(key + '/'),
        );
        if (key) {
          return { [key]: config.imports[key] };
        }
        return { [libName]: getCdnUrlForModule(libName) };
      }
    })
    .reduce((acc, curr) => ({ ...acc, ...curr }), {} as Record<string, string>);

export const hasImports = (code: string) => new RegExp(importsPattern).test(code);

export const replaceImports = (code: string, config: Pen) => {
  const importMap = createImportMap(code, config);
  return code.replace(new RegExp(importsPattern), (statement) => {
    const libName = statement
      .replace(new RegExp(importsPattern), '$2')
      .replace(/"/g, '')
      .replace(/'/g, '');

    const key = Object.keys(importMap).find(
      (key) => key === libName || libName.startsWith(key + '/'),
    );
    if (!key) {
      return statement;
    }
    return statement.replace(key, importMap[key]);
  });
};

const getCdnUrlForModule = (
  moduleName: string,
  CDN: 'skypack' | 'jsdelivr' | 'unpkg' = 'skypack',
) => {
  if (CDN === 'jsdelivr') {
    return 'https://esm.run/' + moduleName;
  }
  if (CDN === 'unpkg') {
    return 'https://unpkg.com/' + moduleName + '?module';
  }
  return 'https://cdn.skypack.dev/' + moduleName;
};
