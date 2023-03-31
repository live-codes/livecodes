declare const livecodes: any;
declare const pl: any;

livecodes.prolog = {
  createSession: async (options: { limit?: number } = {}) => {
    await livecodes.prolog.loaded;
    const limit = options.limit ?? 1000;
    let code = '';
    const scripts = document.querySelectorAll('script[type="text/prolog"]');
    scripts.forEach((script) => (code += script.innerHTML + '\n'));
    const session = pl.create(limit);
    await session.promiseConsult(code);
    return session;
  },
  loaded: new Promise((resolve) => {
    window.addEventListener('load', resolve);
  }),
};
