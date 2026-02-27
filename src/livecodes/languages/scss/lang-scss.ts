import type { LanguageSpecs } from '../../models';
import { codeMirrorBaseUrl, vendorsBaseUrl } from '../../vendors';
import { parserPlugins } from '../prettier';

export const scss: LanguageSpecs = {
  name: 'scss',
  title: 'SCSS',
  parser: {
    name: 'scss',
    pluginUrls: [parserPlugins.postcss],
  },
  compiler: {
    url: vendorsBaseUrl + 'sass/sass.js',
    factory: (_config, baseUrl) => {
      (self as any).importScripts(baseUrl + '{{hash:lang-scss-compiler.js}}');
      return (self as any).createScssCompiler();
    },
  },
  extensions: ['scss'],
  editor: 'style',
  editorSupport: {
    codemirror: {
      languageSupport: async () =>
        (await import(codeMirrorBaseUrl + 'codemirror-lang-scss.js')).sass(),
    },
  },
};
