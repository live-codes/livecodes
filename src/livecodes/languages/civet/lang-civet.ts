import type { LanguageSpecs } from '../../models';
import { vendorsBaseUrl } from '../../vendors';

const civetUrl = vendorsBaseUrl + 'civet/civet.js';

export const civet: LanguageSpecs = {
  name: 'civet',
  title: 'Civet',
  compiler: {
    url: civetUrl,
    factory: () => async (code) => (window as any).civet.compile(code, { js: true }),
  },
  extensions: ['civet'],
  editor: 'script',
  editorLanguage: 'coffeescript',
};
