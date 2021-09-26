import { LanguageSpecs } from '../models';
import { parserPlugins } from './prettier';
import { getLanguageCustomSettings } from './utils';

export const typescriptOptions = {
  target: 'es2015',
  jsx: 'react',
  allowUmdGlobalAccess: true,
  esModuleInterop: true,
};

export const typescript: LanguageSpecs = {
  name: 'typescript',
  title: 'TS',
  longTitle: 'TypeScript',
  info: `
  <h3>TypeScript</h3>
  <div>A Typed Superset of JavaScript.</div>
  <ul>
    <li><a href="https://www.typescriptlang.org/" target="_blank" rel="noopener">Official website</a></li>
    <li><a href="https://www.typescriptlang.org/docs/" target="_blank" rel="noopener">TypeScript documentation</a></li>
    <li><a href="?template=typescript" target="_parent" data-template="typescript">Load starter template</a></li>
  </ul>
  `,
  parser: {
    name: 'babel-ts',
    pluginUrls: [parserPlugins.babel, parserPlugins.html],
  },
  compiler: {
    url: 'https://cdn.jsdelivr.net/npm/typescript@4.4.3/lib/typescript.min.js',
    factory: () => async (code, { config, language }) =>
      (window as any).ts.transpile(code, {
        ...typescriptOptions,
        ...getLanguageCustomSettings('typescript', config),
        ...getLanguageCustomSettings(language, config),
      }),
  },
  extensions: ['ts', 'typescript'],
  editor: 'script',
};
