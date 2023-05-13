import type { CompilerFunction, LanguageSpecs } from '../../models';
import { parserPlugins } from '../prettier';

export const runOutsideWorker: CompilerFunction = async (code: string, { baseUrl, config }) => {
  const { diagramsCompiler } = await import(baseUrl + '{{hash:lang-diagrams-compiler-esm.js}}');
  return diagramsCompiler(code, { config });
};

export const diagrams: LanguageSpecs = {
  name: 'diagrams',
  title: 'Diagrams',
  parser: {
    name: 'html',
    pluginUrls: [parserPlugins.html],
  },
  compiler: {
    factory: () => async (code) => code || '',
    runOutsideWorker,
  },
  extensions: ['diagrams', 'diagram', 'graph', 'plt'],
  editor: 'markup',
  editorLanguage: 'html',
};
