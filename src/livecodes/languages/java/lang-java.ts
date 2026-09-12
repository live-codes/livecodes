import type { LanguageSpecs } from '../../models';
import { codeMirrorBaseUrl, monacoLanguagesBaseUrl, wasmFmtClangBaseUrl } from '../../vendors';

export const java: LanguageSpecs = {
  name: 'java',
  title: 'Java',
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
    scripts: ({ baseUrl }) => [baseUrl + '{{hash:lang-java-script.js}}'],
    scriptType: 'text/java',
    compiledCodeLanguage: 'java',
    liveReload: true,
  },
  extensions: ['java'],
  editor: 'script',
  editorSupport: {
    monaco: { languageSupport: monacoLanguagesBaseUrl + 'java.js' },
    codemirror: {
      languageSupport: async () =>
        (await import(codeMirrorBaseUrl + 'codemirror-lang-java.js')).java(),
    },
  },
  largeDownload: true,
};
