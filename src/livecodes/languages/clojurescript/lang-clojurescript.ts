import type { LanguageSpecs } from '../../models';
import { compileInCompiler } from '../../compiler';
import { cherryCljsBaseUrl, squintCljsBaseUrl } from '../../vendors';
import { parenFormatter } from '../commonlisp';

export const clojurescript: LanguageSpecs = {
  name: 'clojurescript',
  title: 'CLJS (cherry)',
  longTitle: 'ClojureScript (cherry)',
  formatter: {
    factory: parenFormatter,
  },
  compiler: {
    // url: cherryCljsBaseUrl + 'lib/cherry.umd.js',
    factory:
      () =>
      async (code, { config, options }) => {
        // use esm version till fixing the umd build
        // https://github.com/squint-cljs/cherry/issues/135
        (self as any).CherryCljs = await import(cherryCljsBaseUrl + 'lib/compiler.js');
        const compiled = (self as any).CherryCljs.compileString(code);
        return code.includes('#jsx')
          ? (await compileInCompiler(compiled, 'jsx', config, options)).code
          : compiled;
      },
    imports: {
      'cherry-cljs': cherryCljsBaseUrl + 'index.js',
      'cherry-cljs/cljs.core.js': cherryCljsBaseUrl + 'cljs.core.js',
      'cherry-cljs/lib/clojure.string.js': 'lib/clojure.string.js',
      'cherry-cljs/lib/clojure.set.js': 'lib/clojure.set.js',
      'cherry-cljs/lib/clojure.walk.js': 'lib/clojure.walk.js',
      'squint-cljs': squintCljsBaseUrl + 'index.js',
      'squint-cljs/core.js': squintCljsBaseUrl + 'core.js',
      'squint-cljs/string.js': squintCljsBaseUrl + 'string.js',
      'squint-cljs/src/squint/string.js': squintCljsBaseUrl + 'src/squint/string.js',
      'squint-cljs/src/squint/set.js': squintCljsBaseUrl + 'src/squint/set.js',
    },
  },
  extensions: ['cljs', 'clj', 'cljc', 'edn', 'clojure'],
  editor: 'script',
  editorLanguage: 'clojure',
};
