import type { LanguageSpecs } from '../../models';
import {
  codeMirrorBaseUrl,
  monacoLanguagesBaseUrl,
  vendorsBaseUrl,
  wasmFmtClangBaseUrl,
} from '../../vendors';

export const cdnUrl = vendorsBaseUrl + 'jscpp/JSCPP.es5.min.js';

export const cpp: LanguageSpecs = {
  name: 'cpp',
  title: 'C++',
  formatter: {
    factory: async () => {
      const formatter = await import(wasmFmtClangBaseUrl + 'clang-format-web.js');
      await formatter.default();
      return async (code) => ({ formatted: await formatter.format(code, 'main.cpp', 'Google') });
    },
  },
  compiler: {
    factory: () => async (code) => code,
    scripts: ({ baseUrl }) => [cdnUrl, baseUrl + '{{hash:lang-cpp-script.js}}'],
    scriptType: 'text/cpp',
    compiledCodeLanguage: 'cpp',
  },
  extensions: ['cpp', 'cc', 'c', 'C', 'cp', 'cxx', 'c++', 'cppm', 'ixx', 'ii', 'hpp', 'h'],
  editor: 'script',
  editorSupport: {
    monaco: { languageSupport: monacoLanguagesBaseUrl + 'cpp.js' },
    codemirror: {
      languageSupport: async () =>
        (await import(codeMirrorBaseUrl + 'codemirror-lang-cpp.js')).cpp(),
    },
  },
};
