import { LanguageSpecs } from '../models';
import { jsclUrl, parinferUrl } from '../vendors';

export const parenFormatter = () => {
  const url = parinferUrl;
  (self as any).importScripts(url);
  return async (value: string) => ({
    formatted: (window as any).parinfer.parenMode(value).text,
    cursorOffset: 0,
  });
};

export const commonlisp: LanguageSpecs = {
  name: 'commonlisp',
  title: 'Lisp',
  longTitle: 'Common Lisp',
  formatter: {
    factory: parenFormatter,
  },
  compiler: {
    factory: () => async (code) => code,
    scripts: [jsclUrl],
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
  extensions: ['lisp', 'common-lisp'],
  editor: 'script',
  editorLanguage: 'scheme',
};
