import type { LanguageSpecs } from '../../models';
import { wasmFmtClangBaseUrl } from '../../vendors';

export const cppWasm: LanguageSpecs = {
  name: 'cpp-wasm',
  title: 'C++ (Wasm)',
  longTitle: 'C/C++ (Wasm)',
  formatter: {
    factory: async () => {
      const formatter = await import(wasmFmtClangBaseUrl + 'clang-format-web.js');
      await formatter.default();
      return async (code) => ({ formatted: await formatter.format(code, 'main.cpp', 'Google') });
    },
  },
  compiler: {
    factory: () => async (code) => code,
    scripts: ({ baseUrl }) => [baseUrl + '{{hash:lang-cpp-wasm-script.js}}'],
    scriptType: 'text/cpp',
    compiledCodeLanguage: 'cpp',
    liveReload: true,
  },
  extensions: [
    'wasm.cpp',
    'cppwasm',
    'cwasm',
    'clang.cpp',
    'clang',
    'cpp',
    'cc',
    'c',
    'C',
    'cp',
    'cxx',
    'c++',
    'cppm',
    'ixx',
    'ii',
    'hpp',
    'h',
  ],
  editor: 'script',
  editorLanguage: 'cpp',
  largeDownload: true,
};
