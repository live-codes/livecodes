import type { LanguageSpecs } from '../../models';
import { codeMirrorBaseUrl, monacoLanguagesBaseUrl, wasmFmtClangBaseUrl } from '../../vendors';

export const java8: LanguageSpecs = {
  name: 'java-8',
  title: 'Java 8',
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
    scripts: ({ baseUrl }) => [baseUrl + '{{hash:lang-java-8-script.js}}'],
    scriptType: 'text/java',
    compiledCodeLanguage: 'java',
    liveReload: true,
  },
  extensions: ['java-8', 'java8'],
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
