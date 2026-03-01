import type { LanguageSpecs } from '../../models';
import { json5Url, monacoLanguagesBaseUrl } from '../../vendors';
import { parserPlugins } from '../prettier';

export const json5: LanguageSpecs = {
  name: 'json5',
  title: 'JSON5',
  info: false,
  formatter: {
    prettier: {
      name: 'json5',
      pluginUrls: [parserPlugins.babel, parserPlugins.estree],
    },
  },
  compiler: {
    factory: () => {
      let JSON5: { parse: (code: string) => any; stringify: (code: any) => string } | undefined;
      return async (code) => {
        if (!JSON5) {
          (self as any).importScripts(json5Url);
          JSON5 = (self as any).JSON5;
        }
        try {
          return JSON.stringify(JSON5?.parse(code) || JSON.parse(code), null, 2);
        } catch {
          return code;
        }
      };
    },
    compiledCodeLanguage: 'json',
  },
  extensions: ['json5'],
  editor: '',
  editorSupport: {
    monaco: { languageSupport: monacoLanguagesBaseUrl + 'json5.js' },
    codemirror: { language: 'json' },
    codejar: { language: 'json' },
  },
  multiFileSupport: true,
};
