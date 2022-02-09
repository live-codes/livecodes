import { compileAllBlocks } from '../compiler';
import { LanguageSpecs } from '../models';
import { riotBaseUrl } from '../vendors';
import { parserPlugins } from './prettier';
import { getLanguageCustomSettings } from './utils';

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
    factory: () => async (code, { config }) => {
      if (!code) return '';
      const { data, template, ...options } = getLanguageCustomSettings('riot', config);
      const source = template ? `<template type="${template}">${code}</template>` : code;
      const processedCode = await compileAllBlocks(source, config, {
        removeEnclosingTemplate: true,
        languageAttribute: 'type',
      });
      const result = await (window as any).riot.compileFromString(processedCode, options);
      const compiled: string = result.code;
      return `(() => {
const Component = ${compiled.replace('export default ', '')}
riot.register(Component.name, Component);
riot.mount(Component.name, {
  ...${JSON.stringify(data || {})},
  ...window.livecodes?.templateData
});
})();
`;
    },
    scripts: [cdnUrl],
    scriptType: 'module',
  },
  extensions: ['riot', 'riotjs'],
  editor: 'script',
  editorLanguage: 'html',
};
