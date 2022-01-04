import { LanguageSpecs } from '../models';
import { escapeCode } from './utils';

const cdnBaseUrl =
  'https://cdn.jsdelivr.net/npm/@live-codes/clio-browser-compiler@0.0.3/public/build/';

export const clio: LanguageSpecs = {
  name: 'clio',
  title: 'Clio',
  compiler: {
    url: cdnBaseUrl + 'compile.js',
    factory: () => async (code) => {
      if (!code) return '';
      try {
        const compiled = await (self as any).clioCompiler.compile(code);
        if (compiled.code) {
          return `(async() => {
const code = \`${escapeCode(compiled.code.replace('# sourceMappingURL=main.clio.js.map', ''))}\`;
clio.exec(code, '${cdnBaseUrl + 'worker.js'}');
})();`;
        } else {
          // eslint-disable-next-line no-console
          console.error(compiled.error || 'Compile error.');
        }
      } catch (err: any) {
        // eslint-disable-next-line no-console
        console.error(err.message || err);
      }
      return '';
    },
    scripts: [cdnBaseUrl + 'exec.js'],
  },
  extensions: ['clio'],
  editor: 'script',
};
