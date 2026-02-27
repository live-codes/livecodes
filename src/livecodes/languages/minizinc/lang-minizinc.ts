import type { LanguageSpecs } from '../../models';
import { codeMirrorBaseUrl, monacoLanguagesBaseUrl } from '../../vendors';
import { parserPlugins } from '../prettier';

export const minizinc: LanguageSpecs = {
  name: 'minizinc',
  title: 'MiniZinc',
  parser: {
    name: 'minizinc',
    pluginUrls: [parserPlugins.minizinc],
  },
  compiler: {
    factory: () => async (code) => code,
    scripts: ({ baseUrl }) => [baseUrl + '{{hash:lang-minizinc-script.js}}'],
    scriptType: 'text/minizinc',
    compiledCodeLanguage: 'minizinc',
  },
  extensions: ['mzn', 'dzn', 'minizinc'],
  editor: 'script',
  editorSupport: {
    monaco: { languageSupport: monacoLanguagesBaseUrl + 'minizinc.js' },
    codemirror: {
      languageSupport: async () =>
        (await import(codeMirrorBaseUrl + 'codemirror-lang-minizinc.js')).MiniZinc(),
    },
  },
};
