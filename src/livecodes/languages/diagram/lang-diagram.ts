import { CompilerFunction, LanguageSpecs } from '../../models';
import { parserPlugins } from '../prettier';

export const runOutsideWorker: CompilerFunction = async (code: string, { baseUrl, config }) => {
  const { diagramCompiler } = await import(baseUrl + '{{hash:lang-diagram-compiler-esm.js}}');
  return diagramCompiler(code, { config });
};

export const diagram: LanguageSpecs = {
  name: 'diagram',
  title: 'Diagram',
  parser: {
    name: 'html',
    pluginUrls: [parserPlugins.html],
  },
  compiler: {
    factory: () => async (code) => code || '',
    runOutsideWorker,
  },
  extensions: ['diagram', 'graph', 'plt'],
  editor: 'markup',
  editorLanguage: 'html',
};
