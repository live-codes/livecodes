import type { LanguageSpecs } from '../../models';

export const clang: LanguageSpecs = {
  name: 'clang',
  title: 'Clang',
  longTitle: 'C/C++ (Clang)',
  compiler: {
    factory: () => async (code) => code,
    scripts: ({ baseUrl }) => [baseUrl + '{{hash:lang-cpp-clang-script.js}}'],
    scriptType: 'text/cpp',
    compiledCodeLanguage: 'cpp',
    liveReload: true,
  },
  extensions: [
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
