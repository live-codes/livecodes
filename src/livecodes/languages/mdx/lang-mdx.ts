import type { CompilerFunction, LanguageSpecs } from '../../models';
import { parserPlugins } from '../prettier';
// eslint-disable-next-line import/no-internal-modules
import { compileInCompiler } from '../../compiler/compile-in-compiler';

export const runOutsideWorker: CompilerFunction = async (
  code: string,
  { config, worker, baseUrl },
) => {
  if (!code) return '';
  const { mdxCompiler } = await import(baseUrl + '{{hash:lang-mdx-compiler-esm.js}}');
  const result = await mdxCompiler(code, { config });
  const js = await compileInCompiler(result, 'jsx', config, {}, worker);
  return `<script type="module">${js}</script>`;
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
