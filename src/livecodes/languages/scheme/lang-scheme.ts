import { codemirrorLegacy } from '../../editor/codemirror/utils';
import type { LanguageSpecs } from '../../models';
import { biwaschemeUrl, codeMirrorBaseUrl, monacoLanguagesBaseUrl } from '../../vendors';
import { parenFormatter } from '../commonlisp';

export const scheme: LanguageSpecs = {
  name: 'scheme',
  title: 'Scheme',
  formatter: {
    factory: parenFormatter,
  },
  compiler: {
    factory: () => async (code) => code,
    scripts: [biwaschemeUrl],
    scriptType: 'text/biwascheme',
    compiledCodeLanguage: 'scheme',
  },
  extensions: ['scm'],
  editor: 'script',
  editorSupport: {
    monaco: { languageSupport: monacoLanguagesBaseUrl + 'scheme.js' },
    codemirror: {
      languageSupport: async () =>
        codemirrorLegacy((await import(codeMirrorBaseUrl + 'codemirror-lang-scheme.js')).scheme),
    },
  },
};
