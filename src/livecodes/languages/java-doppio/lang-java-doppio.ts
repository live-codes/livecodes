import type { LanguageSpecs } from '../../models';
import { codeMirrorBaseUrl, monacoLanguagesBaseUrl, wasmFmtClangBaseUrl } from '../../vendors';

export const javaDoppio: LanguageSpecs = {
  name: 'java-doppio',
  title: 'Java (Doppio)',
  longTitle: 'Java (DoppioJVM, JDK 8)',
  formatter: {
    factory: async () => {
      const formatter = await import(wasmFmtClangBaseUrl + 'clang-format-web.js');
      await formatter.default();
      return async (code) => ({
        formatted: await formatter.format(code, 'main.java', 'Google'),
      });
    },
  },
  compiler: {
    factory: () => async (code) => code,
    scripts: ({ baseUrl }) => [baseUrl + '{{hash:lang-java-doppio-script.js}}'],
    scriptType: 'text/java',
    compiledCodeLanguage: 'java',
    liveReload: true,
  },
  extensions: ['java-doppio', 'java8', 'doppio'],
  editor: 'script',
  editorSupport: {
    monaco: { languageSupport: monacoLanguagesBaseUrl + 'java.js', language: 'java' },
    codemirror: {
      languageSupport: async () =>
        (await import(codeMirrorBaseUrl + 'codemirror-lang-java.js')).java(),
    },
    codejar: { language: 'java' },
  },
  largeDownload: true,
};
