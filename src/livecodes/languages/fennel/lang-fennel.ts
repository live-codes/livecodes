import type { LanguageSpecs } from '../../models';
import { parenFormatter } from '../commonlisp';
import { luaUrl } from '../../vendors';

export const fennel: LanguageSpecs = {
  name: 'fennel',
  title: 'Fennel',
  formatter: {
    factory: parenFormatter,
  },
  compiler: {
    factory: () => async (code) => code,
    scripts: ({ baseUrl }) => [luaUrl, baseUrl + '{{hash:lang-fennel-script.js}}'],
    liveReload: true,
    scriptType: 'text/fennel',
    compiledCodeLanguage: 'lua',
  },
  extensions: ['fnl'],
  editor: 'script',
  editorLanguage: 'scheme',
};
