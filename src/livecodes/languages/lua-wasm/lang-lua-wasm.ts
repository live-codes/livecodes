/* eslint-disable import/no-internal-modules */
import type { LanguageSpecs } from '../../models';
import { wasmoonUrl } from '../../vendors';
import { luaFormatter } from '../lua/lang-lua';

export const luaWasm: LanguageSpecs = {
  name: 'lua-wasm',
  title: 'Lua (Wasm)',
  formatter: luaFormatter,
  compiler: {
    factory: () => async (code) => code,
    scripts: ({ baseUrl }) => [wasmoonUrl, baseUrl + '{{hash:lang-lua-wasm-script.js}}'],
    scriptType: 'application/lua',
    compiledCodeLanguage: 'lua',
  },
  extensions: ['wasm.lua', 'luawasm'],
  editor: 'script',
  editorLanguage: 'lua',
};
