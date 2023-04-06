import type { LanguageSpecs } from '../../models';
import { luaUrl } from '../../vendors';
import { luaFormatter } from '../lua';

export const teal: LanguageSpecs = {
  name: 'teal',
  title: 'Teal',
  formatter: luaFormatter,
  compiler: {
    url: luaUrl,
    factory: (_config, baseUrl) => {
      (self as any).importScripts(baseUrl + '{{hash:lang-teal-compiler.js}}');
      return (self as any).createTealCompiler();
    },
    scripts: [luaUrl],
    scriptType: 'application/lua',
    compiledCodeLanguage: 'lua',
  },
  extensions: ['tl'],
  editor: 'script',
  editorLanguage: 'lua',
};
