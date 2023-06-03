import { compileInCompiler } from '../../compiler';
import type { LanguageSpecs } from '../../models';
import { cherryCljsBaseUrl, cherryCljsCompilerUrl } from '../../vendors';
import { parenFormatter } from '../commonlisp';

export const clojurescript: LanguageSpecs = {
  name: 'clojurescript',
  title: 'CLJS (cherry)',
  longTitle: 'ClojureScript (cherry)',
  formatter: {
    factory: parenFormatter,
  },
  compiler: {
    url: cherryCljsCompilerUrl,
    factory:
      () =>
      async (code, { config, options }) => {
        const compiled = (self as any).CherryCljs.compileString(code);
        return code.includes('#jsx')
          ? compileInCompiler(compiled, 'jsx', config, options)
          : compiled;
      },
    imports: {
      'cherry-cljs': cherryCljsBaseUrl + 'index.js',
      'cherry-cljs/cljs.core.js': cherryCljsBaseUrl + 'cljs.core.js',
    },
  },
  extensions: ['cljs', 'clj', 'cljc', 'edn', 'clojure'],
  editor: 'script',
  editorLanguage: 'clojure',
};
