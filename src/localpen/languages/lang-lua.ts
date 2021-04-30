import { LanguageSpecs } from '../models';

export const lua: LanguageSpecs = {
  name: 'lua',
  title: 'Lua',
  compiler: {
    url: 'assets/noop.js',
    factory: () => (code) => code,
    umd: true,
    scripts: ['vendor/fengari-web/fengari-web.js'],
    scriptType: 'application/lua',
  },
  extensions: ['lua'],
  editor: 'script',
};
