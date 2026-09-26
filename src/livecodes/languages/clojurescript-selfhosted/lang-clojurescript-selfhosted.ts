import { codemirrorLegacy } from '../../editor/codemirror/utils';
import type { LanguageSpecs } from '../../models';
import { cljsSelfHostedBaseUrl, codeMirrorBaseUrl, monacoLanguagesBaseUrl } from '../../vendors';

export const clojurescriptSelfHosted: LanguageSpecs = {
  name: 'clojurescript-selfhosted',
  title: 'CLJS (self-hosted)',
  longTitle: 'ClojureScript (self-hosted compiler)',
  compiler: {
    url: cljsSelfHostedBaseUrl + 'index.iife.js',
    factory: async () => {
      const compiler = await (self as any).CljsSelfHosted.createCljsCompiler({
        baseUrl: cljsSelfHostedBaseUrl,
      });
      return compiler.compile;
    },
    scripts: [cljsSelfHostedBaseUrl + 'cljs-runtime.js'],
    inlineScript: `(()=>{const cljs=(window.cljs=window.cljs||{});cljs.user=cljs.user||{};})();`,
  },
  extensions: ['clojurescript', 'cljs-selfhosted', 'cljs', 'clj', 'cljc', 'edn', 'clojure'],
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
    codejar: { language: 'clojurescript' },
  },
  largeDownload: true,
};
