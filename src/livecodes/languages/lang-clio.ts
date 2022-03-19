import { LanguageSpecs } from '../models';
import { clioBaseUrl } from '../vendors';
import { escapeCode } from './utils';

export const clio: LanguageSpecs = {
  name: 'clio',
  title: 'Clio',
  compiler: {
    url: clioBaseUrl + 'compile.js',
    factory: () => async (code) => {
      if (!code) return '';
      try {
        const compiled = await (self as any).clioCompiler.compile(code);
        if (compiled.code) {
          return `(async() => {
const code = \`${escapeCode(compiled.code.replace('# sourceMappingURL=main.clio.js.map', ''))}\`;
clio.exec(code, '${clioBaseUrl + 'worker.js'}');
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
    scripts: [clioBaseUrl + 'exec.js'],
  },
  extensions: ['clio'],
  editor: 'script',
};
