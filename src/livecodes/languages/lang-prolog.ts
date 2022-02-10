import { LanguageSpecs } from '../models';
import { tauPrologBaseUrl } from '../vendors';

export const prolog: LanguageSpecs = {
  name: 'prolog',
  title: 'Prolog',
  compiler: {
    factory: () => async (code) => code,
    scripts: [
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
    ],
    scriptType: 'text/prolog',
    compiledCodeLanguage: 'prolog',
    inlineScript: `
livecodes.prolog = {
  createSession: async (options = {}) => {
    await livecodes.prolog.loaded;
    const limit = options.limit ?? 1000;
    let code = '';
    const scripts = document.querySelectorAll('script[type="text/prolog"]');
    scripts.forEach(script => code += script.innerHTML + '\\n');
    const session = pl.create(limit);
    await session.promiseConsult(code);
    return session;
  },
  loaded: new Promise(resolve => {
    window.addEventListener('load', resolve);
  }),
};
`,
  },
  extensions: ['prolog.pl', 'prolog'],
  editor: 'script',
};
