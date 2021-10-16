import { LanguageSpecs } from '../models';
import { parserPlugins } from './prettier';
import { getLanguageCustomSettings } from './utils';

const compilerCdnUrl = 'https://cdn.jsdelivr.net/npm/riot@6.0.4/riot+compiler.min.js';
const cdnUrl = 'https://cdn.jsdelivr.net/npm/riot@6.0.4/riot.min.js';

export const riot: LanguageSpecs = {
  name: 'riot',
  title: 'Riot.js',
  parser: {
    name: 'html',
    pluginUrls: [parserPlugins.html, parserPlugins.babel],
  },
  compiler: {
    url: compilerCdnUrl,
    factory: () => async (code, { config }) => {
      if (!code) return '';
      const { data, ...options } = getLanguageCustomSettings('riot', config);
      const result = await (window as any).riot.compileFromString(code, options);
      const compiled: string = result.code;
      return `var Component = ${compiled.replace('export default ', '')}
riot.register(Component.name, Component);
riot.mount(Component.name, {
  ...${JSON.stringify(data || {})},
  ...window.templateData
});
`;
    },
    scripts: [cdnUrl],
    scriptType: 'module',
  },
  extensions: ['riot', 'riotjs'],
  editor: 'script',
  editorLanguage: 'html',
};
