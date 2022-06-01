import type { CompilerFunction, LanguageSpecs } from '../../models';
import { parserPlugins } from '../prettier';

export const runOutsideWorker: CompilerFunction = async (
  code: string,
  { baseUrl, config, worker },
) => {
  const { mdxCompiler } = await import(baseUrl + '{{hash:lang-mdx-compiler-esm.js}}');
  return mdxCompiler(code, { config, worker });
};

export const mdx: LanguageSpecs = {
  name: 'mdx',
  title: 'MDX',
  parser: {
    name: 'markdown',
    pluginUrls: [parserPlugins.markdown, parserPlugins.html],
  },
  compiler: {
    factory: () => async (code) => code,
    runOutsideWorker,
    compiledCodeLanguage: 'javascript',
    imports: {
      'react/jsx-runtime': 'https://esm.sh/react/jsx-runtime',
    },
  },
  extensions: ['mdx'],
  editor: 'markup',
  editorLanguage: 'markdown',
};
