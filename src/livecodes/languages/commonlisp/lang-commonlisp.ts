import type { LanguageSpecs } from '../../models';
import { jsclUrl, parinferUrl } from '../../vendors';

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
    scripts: ({ baseUrl }) => [jsclUrl, baseUrl + '{{hash:lang-commonlisp-script.js}}'],
    scriptType: 'text/commonlisp',
    compiledCodeLanguage: 'commonlisp',
  },
  extensions: ['lisp', 'common-lisp'],
  editor: 'script',
  editorLanguage: 'scheme',
};
