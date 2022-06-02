import type { LanguageSpecs } from '../../models';
import { biwaschemeUrl } from '../../vendors';
import { parenFormatter } from '../commonlisp';

export const scheme: LanguageSpecs = {
  name: 'scheme',
  title: 'Scheme',
  formatter: {
    factory: parenFormatter,
  },
  compiler: {
    factory: () => async (code) => code,
    scripts: [biwaschemeUrl],
    scriptType: 'text/biwascheme',
    compiledCodeLanguage: 'scheme',
  },
  extensions: ['scm'],
  editor: 'script',
};
