import type { CompilerFunction, LanguageSpecs } from '../../models';
// eslint-disable-next-line import/no-internal-modules
import { compileInCompiler } from '../../compiler/compile-in-compiler';
import { escapeCode, getLanguageCustomSettings } from '../../utils';
import { vendorsBaseUrl } from '../../vendors';
import { parserPlugins } from '../prettier';

export const runOutsideWorker: CompilerFunction = async (code: string, { config, worker }) =>
  new Promise(async (resolve) => {
    if (!code) return resolve('');
    const [mdx, { default: remarkGfm }] = await Promise.all([
      import(vendorsBaseUrl + 'mdx/mdx.js'),
      import(vendorsBaseUrl + 'remark-gfm/remark-gfm.js'),
    ]);

    const compiled = (
      await mdx.compile(code, {
        remarkPlugins: [remarkGfm],
        ...getLanguageCustomSettings('mdx', config),
      })
    ).value;

    // TODO: improve this
    const removeComponentDeclaration = (str: string) =>
      str
        .replace(/, {[^}]*} = _components/g, '')
        .replace(/const {[^:]*} = props.components[^;]*;/g, '');

    const jsx = removeComponentDeclaration(compiled);
    const result = `import React from "react";
import { createRoot } from "react-dom/client";
${escapeCode(jsx, false)}
createRoot(document.querySelector('#__livecodes_mdx_root__')).render(<MDXContent />,);
`;
    const js = (await compileInCompiler(result, 'jsx', config, {}, worker)).code;
    resolve(`<div id="__livecodes_mdx_root__"></div><script type="module">${js}</script>`);
  });

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
  },
  extensions: ['mdx'],
  editor: 'markup',
  editorLanguage: 'markdown',
};
