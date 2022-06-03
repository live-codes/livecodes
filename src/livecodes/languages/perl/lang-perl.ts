import type { LanguageSpecs } from '../../models';
import { vendorsBaseUrl } from '../../vendors';

export const perl: LanguageSpecs = {
  name: 'perl',
  title: 'Perl',
  compiler: {
    factory: () => async (code) => code,
    scripts: ({ baseUrl }) => [
      vendorsBaseUrl + 'perlito/perlito5.min.js',
      baseUrl + '{{hash:lang-perl-script.js}}',
    ],
    scriptType: 'text/perl',
  },
  extensions: ['pl', 'pm'],
  editor: 'script',
};
