import type { LanguageSpecs } from '../../models';
import { tauPrologBaseUrl } from '../../vendors';

export const prolog: LanguageSpecs = {
  name: 'prolog',
  title: 'Prolog',
  compiler: {
    factory: () => async (code) => code,
    scripts: ({ baseUrl }) => [
      tauPrologBaseUrl + 'core.js',
      tauPrologBaseUrl + 'charsio.js',
      tauPrologBaseUrl + 'dom.js',
      tauPrologBaseUrl + 'format.js',
      tauPrologBaseUrl + 'js.js',
      tauPrologBaseUrl + 'lists.js',
      tauPrologBaseUrl + 'os.js',
      tauPrologBaseUrl + 'promises.js',
      tauPrologBaseUrl + 'random.js',
      tauPrologBaseUrl + 'statistics.js',
      baseUrl + '{{hash:lang-prolog-script.js}}',
    ],
    scriptType: 'text/prolog',
    compiledCodeLanguage: 'prolog',
  },
  extensions: ['prolog.pl', 'prolog'],
  editor: 'script',
};
