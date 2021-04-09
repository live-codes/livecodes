import { Pen } from '../models';

export const importsPattern = /(import\s+?(?:(?:(?:[\w*\s{},\$]*)\s+from\s+?)|))((?:".*?")|(?:'.*?'))([\s]*?(?:;|$|))/g;

export const replaceImports = (code: string, config: Pen) =>
  code.replace(new RegExp(importsPattern), (statement) => {
    const libName = statement
      .replace(new RegExp(importsPattern), '$2')
      .replace(/"/g, '')
      .replace(/'/g, '');
    if (libName.startsWith('http') || libName.startsWith('.') || libName.startsWith('/')) {
      return statement;
    }
    const localModule = config.modules.find((module) => module.name === libName);
    const libPath = localModule?.url || 'https://cdn.skypack.dev/' + libName;
    return statement.replace(new RegExp(importsPattern), `$1'${libPath}'$3`);
  });

export const hasImports = (code: string) => new RegExp(importsPattern).test(code);
