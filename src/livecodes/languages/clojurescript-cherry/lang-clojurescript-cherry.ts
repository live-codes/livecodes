import { compileInCompiler } from '../../compiler';
import { codemirrorLegacy } from '../../editor/codemirror/utils';
import type { Language, LanguageSpecs } from '../../models';
import {
  cherryCljsBaseUrl,
  codeMirrorBaseUrl,
  monacoLanguagesBaseUrl,
  squintCljsBaseUrl,
} from '../../vendors';
import { parenFormatter } from '../commonlisp';

export const clojurescriptCherry: LanguageSpecs = {
  name: 'clojurescript-cherry',
  title: 'CLJS (cherry)',
  longTitle: 'ClojureScript (cherry)',
  formatter: {
    factory: parenFormatter,
  },
  compiler: {
    url: cherryCljsBaseUrl + 'lib/cherry.umd.js',
    factory:
      () =>
      async (code, { config, options }) => {
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
  extensions: [
    'clojurescript-cherry',
    'cljs-cherry',
    'clojurescript',
    'cljs',
    'clj',
    'cljc',
    'edn',
    'clojure',
  ],
  deprecation: (lang: Language) =>
    ['clojurescript', 'cljs', 'clj', 'cljc', 'edn', 'clojure'].includes(lang)
      ? { old: 'clojurescript-cherry', new: 'clojurescript-selfhosted' }
      : undefined,
  editor: 'script',
  editorSupport: {
    monaco: {
      languageSupport: monacoLanguagesBaseUrl + 'clojurescript.js',
      language: 'clojurescript',
    },
    codemirror: {
      languageSupport: async () =>
        codemirrorLegacy((await import(codeMirrorBaseUrl + 'codemirror-lang-clojure.js')).clojure),
    },
    codejar: { language: 'clojure' },
  },
};
