import type { LanguageSpecs } from '../../models';
import { requireUrl } from '../../vendors';

export const tcl: LanguageSpecs = {
  name: 'tcl',
  title: 'Tcl',
  compiler: {
    factory: () => async (code) => code,
    scripts: ({ baseUrl }) => [requireUrl, baseUrl + '{{hash:lang-tcl-script.js}}'],
    scriptType: 'text/tcl',
    compiledCodeLanguage: 'tcl',
  },
  extensions: ['tcl'],
  editor: 'script',
};
