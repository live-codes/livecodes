import { Config } from '../models';
import { modulesService } from '../services';

export const importsPattern = /(import\s+?(?:(?:(?:[\w*\s{},\$]*)\s+from\s+?)|))((?:".*?")|(?:'.*?'))([\s]*?(?:;|$|))/g;

export const getImports = (code: string) =>
  [...code.matchAll(new RegExp(importsPattern))].map((arr) =>
    arr[2].replace(/"/g, '').replace(/'/g, ''),
  );

export const createImportMap = (code: string, config: Config) =>
  getImports(code)
    .map((libName) => {
      if (libName.startsWith('http') || libName.startsWith('.') || libName.startsWith('/')) {
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
