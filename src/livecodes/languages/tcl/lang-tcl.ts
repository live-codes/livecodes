import { codemirrorLegacy } from '../../editor/codemirror/utils';
import type { LanguageSpecs } from '../../models';
import { codeMirrorBaseUrl, requireUrl } from '../../vendors';

export const tcl: LanguageSpecs = {
  name: 'tcl',
  title: 'Tcl',
  compiler: {
    factory: () => async (code) => code,
    scripts: ({ baseUrl }) => [requireUrl, baseUrl + '{{hash:lang-tcl-script.js}}'],
    scriptType: 'text/tcl',
    compiledCodeLanguage: 'tcl',
  },
  extensions: ['tcl'],
  editor: 'script',
  editorSupport: {
    codemirror: {
      languageSupport: async () =>
        codemirrorLegacy((await import(codeMirrorBaseUrl + 'codemirror-lang-tcl.js')).tcl),
    },
  },
};
