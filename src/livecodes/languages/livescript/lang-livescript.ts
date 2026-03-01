import { codemirrorLegacy } from '../../editor/codemirror/utils';
import type { LanguageSpecs } from '../../models';
import { getLanguageCustomSettings } from '../../utils';
import { codeMirrorBaseUrl, vendorsBaseUrl } from '../../vendors';

export const livescript: LanguageSpecs = {
  name: 'livescript',
  title: 'LiveScript',
  compiler: {
    url: vendorsBaseUrl + 'livescript/livescript-min.js',
    factory:
      () =>
      async (code, { config }) =>
        (window as any).require('livescript').compile(code, {
          bare: true,
          ...getLanguageCustomSettings('livescript', config),
        }),
    scripts: [vendorsBaseUrl + 'livescript/prelude-browser-min.js'],
  },
  extensions: ['ls'],
  editor: 'script',
  editorSupport: {
    monaco: { language: 'coffeescript' },
    codemirror: {
      languageSupport: async () =>
        codemirrorLegacy(
          (await import(codeMirrorBaseUrl + 'codemirror-lang-livescript.js')).livescript,
        ),
    },
  },
  multiFileSupport: true,
};
