import type { LanguageSpecs } from '../../models';
import { luaUrl, vendorsBaseUrl } from '../../vendors';

const luaFmtUrl = vendorsBaseUrl + 'lua-fmt/lua-fmt.js';

export const lua: LanguageSpecs = {
  name: 'lua',
  title: 'Lua',
  formatter: {
    factory: () => {
      (self as any).importScripts(luaFmtUrl);
      return async (code, cursorOffset) => ({
        formatted: (self as any).luaFmt.formatText(code),
        cursorOffset,
      });
    },
  },
  compiler: {
    factory: () => async (code) => code,
    scripts: [luaUrl],
    scriptType: 'application/lua',
    compiledCodeLanguage: 'lua',
  },
  extensions: ['lua'],
  editor: 'script',
};
