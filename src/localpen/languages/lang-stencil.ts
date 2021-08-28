import { LanguageSpecs } from '../models';
import { parserPlugins } from './prettier';
import { getLanguageCustomSettings } from './utils';

export const stencil: LanguageSpecs = {
  name: 'stencil',
  title: 'Stencil',
  info: `
  <h3>Stencil</h3>
  <div>A Compiler for Web Components and High Performance Web Apps.</div>
  <ul>
    <li><a href="https://stenciljs.com/" target="_blank" rel="noopener">Stencil official website</a></li>
    <li><a href="https://stenciljs.com/docs/introduction" target="_blank" rel="noopener">Stencil documentation</a></li>
    <!-- <li><a href="#">Stencil usage in LocalPen</a></li> -->
    <li><a href="?template=stencil" target="_parent" data-template="stencil">Load starter template</a></li>
  </ul>
  `,
  parser: {
    name: 'babel-ts',
    pluginUrls: [parserPlugins.babel, parserPlugins.html],
  },
  compiler: {
    url: 'vendor/stencil/stencil.2.5.2.min.js',
    factory: () => async (code, { config }) => {
      const result = await (window as any).stencil.transpile(code, {
        sourceMap: false,
        ...getLanguageCustomSettings('stencil', config),
      });
      return result.code;
    },
    umd: true,
  },
  extensions: ['stencil.tsx'],
  editor: 'script',
  editorLanguage: 'typescript',
};
