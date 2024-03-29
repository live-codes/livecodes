import type { LanguageSpecs } from '../../models';

export const cppWasm: LanguageSpecs = {
  name: 'cpp-wasm',
  title: 'C++ (Wasm)',
  longTitle: 'C/C++ (Wasm)',
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
