import type { LanguageSpecs } from '../../models';
import { twigUrl } from '../../vendors';
import { parserPlugins } from '../prettier';

export const twig: LanguageSpecs = {
  name: 'twig',
  title: 'Twig',
  parser: {
    name: 'html',
    pluginUrls: [parserPlugins.html],
  },
  compiler: {
    url: twigUrl,
    factory: (_config, baseUrl) => {
      (self as any).importScripts(baseUrl + '{{hash:lang-twig-compiler.js}}');
      return (self as any).createTwigCompiler();
    },
  },
  extensions: ['twig'],
  editor: 'markup',
  editorLanguage: 'html',
};
