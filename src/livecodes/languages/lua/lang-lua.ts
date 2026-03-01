import { codemirrorLegacy } from '../../editor/codemirror/utils';
import type { LanguageFormatter, LanguageSpecs } from '../../models';
import { codeMirrorBaseUrl, luaUrl, monacoLanguagesBaseUrl, vendorsBaseUrl } from '../../vendors';

const luaFmtUrl = vendorsBaseUrl + 'lua-fmt/lua-fmt.js';

export const luaFormatter: LanguageFormatter = {
  factory: () => {
    (self as any).importScripts(luaFmtUrl);
    return async (code, cursorOffset) => ({
      formatted: (self as any).luaFmt.formatText(code),
      cursorOffset,
    });
  },
};

export const lua: LanguageSpecs = {
  name: 'lua',
  title: 'Lua',
  formatter: luaFormatter,
  compiler: {
    factory: () => async (code) => code,
    scripts: [luaUrl],
    scriptType: 'application/lua',
    compiledCodeLanguage: 'lua',
  },
  extensions: ['lua'],
  editor: 'script',
  editorSupport: {
    monaco: {
      languageSupport: monacoLanguagesBaseUrl + 'lua.js',
    },
    codemirror: {
      languageSupport: async () =>
        codemirrorLegacy((await import(codeMirrorBaseUrl + 'codemirror-lang-lua.js')).lua),
    },
  },
};
