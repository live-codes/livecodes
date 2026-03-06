import type { LanguageSpecs } from '../../models';
import { codeMirrorBaseUrl } from '../../vendors';

export const sass: LanguageSpecs = {
  name: 'sass',
  title: 'Sass',
  compiler: 'scss',
  extensions: ['sass'],
  editor: 'style',
  editorSupport: {
    codemirror: {
      languageSupport: async () =>
        (await import(codeMirrorBaseUrl + 'codemirror-lang-scss.js')).sass({ indented: true }),
    },
  },
  multiFileSupport: true,
};
