import { LanguageSpecs } from '../models';
import { imbaBaseUrl } from '../vendors';

export const imba: LanguageSpecs = {
  name: 'imba',
  title: 'Imba',
  compiler: {
    url: imbaBaseUrl + 'compiler.js',
    factory: () => async (code) => {
      if (!code) return '';
      try {
        const compiled = (self as any).imbac.default.compile(code, {
          platform: 'web',
          format: 'esm',
          sourcePath: 'app.imba',
        });
        return compiled.js || '';
      } catch (err) {
        // eslint-disable-next-line no-console
        console.warn(err);
        return '';
      }
    },
    imports: {
      imba: imbaBaseUrl + 'imba.mjs',
    },
  },
  extensions: ['imba'],
  editor: 'script',
};
