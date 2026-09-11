import { codemirrorLegacy } from '../../editor/codemirror/utils';
import type { LanguageSpecs } from '../../models';
import { codeMirrorBaseUrl, vendorsBaseUrl } from '../../vendors';

export const stylus: LanguageSpecs = {
  name: 'stylus',
  title: 'Stylus',
  compiler: {
    url: vendorsBaseUrl + 'stylus/stylus.min.js',
    factory: () => async (code) => (window as any).stylus.render(code),
  },
  extensions: ['styl'],
  editor: 'style',
  editorSupport: {
    codemirror: {
      languageSupport: async () =>
        codemirrorLegacy((await import(codeMirrorBaseUrl + 'codemirror-lang-stylus.js')).stylus),
    },
  },
  multiFileSupport: true,
};
