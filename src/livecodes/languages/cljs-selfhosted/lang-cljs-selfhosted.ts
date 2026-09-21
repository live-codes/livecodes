import { codemirrorLegacy } from '../../editor/codemirror/utils';
import type { LanguageSpecs } from '../../models';
import { cljsSelfHostedBaseUrl, codeMirrorBaseUrl } from '../../vendors';

export const cljsSelfHosted: LanguageSpecs = {
  name: 'cljs-selfhosted',
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
  extensions: ['cljs-selfhosted'],
  editor: 'script',
  editorLanguage: 'clojure',
  editorSupport: {
    codemirror: {
      languageSupport: async () =>
        codemirrorLegacy((await import(codeMirrorBaseUrl + 'codemirror-lang-clojure.js')).clojure),
    },
  },
  largeDownload: true,
};
