import type { LanguageSpecs } from '../../models';
import { luaUrl } from '../../vendors';
import { parenFormatter } from '../commonlisp';

export const fennel: LanguageSpecs = {
  name: 'fennel',
  title: 'Fennel',
  formatter: {
    factory: parenFormatter,
  },
  compiler: {
    url: luaUrl,
    factory: (_config, baseUrl) => {
      (self as any).importScripts(baseUrl + '{{hash:lang-fennel-compiler.js}}');
      return (self as any).createFennelCompiler();
    },
    scripts: [luaUrl],
    scriptType: 'application/lua',
    compiledCodeLanguage: 'lua',
  },
  extensions: ['fnl'],
  editor: 'script',
  editorLanguage: 'scheme',
};
