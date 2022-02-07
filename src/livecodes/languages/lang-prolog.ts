import { LanguageSpecs } from '../models';

const cdnBaselUrl = 'https://cdn.jsdelivr.net/npm/tau-prolog@0.3.2/modules/';

export const prolog: LanguageSpecs = {
  name: 'prolog',
  title: 'Prolog',
  compiler: {
    factory: () => async (code) => code,
    scripts: [
      cdnBaselUrl + 'core.js',
      cdnBaselUrl + 'charsio.js',
      cdnBaselUrl + 'dom.js',
      cdnBaselUrl + 'format.js',
      cdnBaselUrl + 'js.js',
      cdnBaselUrl + 'lists.js',
      cdnBaselUrl + 'os.js',
      cdnBaselUrl + 'promises.js',
      cdnBaselUrl + 'random.js',
      cdnBaselUrl + 'statistics.js',
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
