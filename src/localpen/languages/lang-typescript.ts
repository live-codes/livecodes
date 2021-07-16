import { LanguageSpecs } from '../models';
import { getCustomConfig } from './custom-configs';
import { parserPlugins } from './parser-plugins';

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
    <!-- <li><a href="#">TypeScript usage in LocalPen</a></li> -->
    <li><a href="?template=typescript" target="_parent" data-template="typescript">Load starter template</a></li>
  </ul>
  `,
  parser: {
    name: 'babel-ts',
    pluginUrls: [parserPlugins.babel, parserPlugins.html],
  },
  compiler: {
    url: 'vendor/typescript/typescript.min.js',
    factory: () => async (code, { options }) =>
      (window as any).typescript.transpile(code, {
        ...typescriptOptions,
        ...getCustomConfig('typescript-config', options.customConfigs),
      }),
    umd: true,
  },
  extensions: ['ts', 'typescript'],
  editor: 'script',
};
