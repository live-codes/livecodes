import { LanguageSpecs } from '../models';

const cdnUrl = 'https://cdn.jsdelivr.net/npm/jscl@0.8.2/jscl.min.js';

export const commonlisp: LanguageSpecs = {
  name: 'commonlisp',
  title: 'Lisp',
  longTitle: 'Common Lisp',
  compiler: {
    factory: () => async (code) => code,
    scripts: [cdnUrl],
    scriptType: 'text/commonlisp',
    compiledCodeLanguage: 'commonlisp',
    inlineScript: `
    window.addEventListener('load', function() {
      var script = document.querySelector('script[type="text/commonlisp"]');
      var source = script?.innerHTML;
      if (source?.trim()) {
        jscl.evaluateString('(progn ' + source + ')');
      }
    });
    `,
  },
  extensions: ['lisp'],
  editor: 'script',
  editorLanguage: 'scheme',
};
