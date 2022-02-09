import { LanguageSpecs } from '../models';
import { luaUrl } from '../vendors';

export const lua: LanguageSpecs = {
  name: 'lua',
  title: 'Lua',
  compiler: {
    factory: () => async (code) => code,
    scripts: [luaUrl],
    scriptType: 'application/lua',
    compiledCodeLanguage: 'lua',
  },
  extensions: ['lua'],
  editor: 'script',
};
