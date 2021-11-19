import { LanguageSpecs } from '../models';

const cdnUrl = 'https://cdn.jsdelivr.net/npm/fengari-web@0.1.4/dist/fengari-web.min.js';

export const lua: LanguageSpecs = {
  name: 'lua',
  title: 'Lua',
  compiler: {
    factory: () => async (code) => code,
    scripts: [cdnUrl],
    scriptType: 'application/lua',
    compiledCodeLanguage: 'lua',
  },
  extensions: ['lua'],
  editor: 'script',
};
