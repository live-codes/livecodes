import type { LanguageSpecs } from '../../models';
import { riotBaseUrl } from '../../vendors';
import { parserPlugins } from '../prettier';

const compilerCdnUrl = riotBaseUrl + 'riot+compiler.min.js';
const cdnUrl = riotBaseUrl + 'riot.min.js';

export const riot: LanguageSpecs = {
  name: 'riot',
  title: 'Riot.js',
  parser: {
    name: 'html',
    pluginUrls: [parserPlugins.html, parserPlugins.babel],
  },
  compiler: {
    url: compilerCdnUrl,
    factory: (_config, baseUrl) => {
      (self as any).importScripts(baseUrl + '{{hash:lang-riot-compiler.js}}');
      return (self as any).createRiotCompiler();
    },
    scripts: [cdnUrl],
    scriptType: 'module',
  },
  extensions: ['riot', 'riotjs'],
  editor: 'script',
  editorLanguage: 'html',
};
