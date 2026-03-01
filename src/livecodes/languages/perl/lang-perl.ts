import { codemirrorLegacy } from '../../editor/codemirror/utils';
import type { LanguageSpecs } from '../../models';
import { codeMirrorBaseUrl, vendorsBaseUrl } from '../../vendors';

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
  editorSupport: {
    codemirror: {
      languageSupport: async () =>
        codemirrorLegacy((await import(codeMirrorBaseUrl + 'codemirror-lang-perl.js')).perl),
    },
  },
};
