import type { LanguageSpecs } from '../../models';
import { codeMirrorBaseUrl, monacoLanguagesBaseUrl, vendorsBaseUrl } from '../../vendors';

export const cdnUrl = vendorsBaseUrl + 'jscpp/JSCPP.es5.min.js';

export const cpp: LanguageSpecs = {
  name: 'cpp',
  title: 'C++',
  compiler: {
    factory: () => async (code) => code,
    scripts: ({ baseUrl }) => [cdnUrl, baseUrl + '{{hash:lang-cpp-script.js}}'],
    scriptType: 'text/cpp',
    compiledCodeLanguage: 'cpp',
  },
  extensions: ['cpp', 'c', 'C', 'cp', 'cxx', 'c++', 'cppm', 'ixx', 'ii', 'hpp', 'h'],
  editor: 'script',
  editorSupport: {
    monaco: { languageSupport: monacoLanguagesBaseUrl + 'cpp.js' },
    codemirror: {
      languageSupport: async () =>
        (await import(codeMirrorBaseUrl + 'codemirror-lang-cpp.js')).cpp(),
    },
  },
};
