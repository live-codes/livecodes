import type { LanguageSpecs } from '../../models';
import { monacoLanguagesBaseUrl } from '../../vendors';

export const ripple: LanguageSpecs = {
  name: 'ripple',
  title: 'Ripple',
  formatter: {
    factory: async (baseUrl, _language, config) => {
      (self as any).importScripts(baseUrl + '{{hash:lang-ripple-formatter.js}}');
      return (self as any).createRippleFormatter(config);
    },
  },
  compiler: {
    factory: (config, baseUrl) => {
      (self as any).importScripts(baseUrl + '{{hash:lang-ripple-compiler.js}}');
      return (self as any).createRippleCompiler(config);
    },
  },
  extensions: ['ripple'],
  editor: 'script',
  editorSupport: {
    monaco: { languageSupport: monacoLanguagesBaseUrl + 'ripple.js' },
    codemirror: { language: 'jsx' },
    codejar: { language: 'jsx' },
  },
  multiFileSupport: true,
};
