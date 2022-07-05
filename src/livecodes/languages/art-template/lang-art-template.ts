import type { LanguageSpecs } from '../../models';
import { artTemplateUrl } from '../../vendors';
import { parserPlugins } from '../prettier';

export const artTemplate: LanguageSpecs = {
  name: 'art-template',
  title: 'art',
  longTitle: 'art-template',
  parser: {
    name: 'html',
    pluginUrls: [parserPlugins.html],
  },
  compiler: {
    url: artTemplateUrl,
    factory: (_config, baseUrl) => {
      (self as any).importScripts(baseUrl + '{{hash:lang-art-template-compiler.js}}');
      return (self as any).createArtTemplateCompiler();
    },
  },
  extensions: ['art', 'art-template'],
  editor: 'markup',
  editorLanguage: 'html',
};
