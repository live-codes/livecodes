/* eslint-disable import/no-internal-modules */
import type { CompilerFunction, Config } from '../../models';
import { compileAllBlocks } from '../../compiler/compile-blocks';
import { createImportMap, replaceSFCImports } from '../../compiler/import-map';
import { getLanguageCustomSettings, getLanguageByAlias } from '../utils';
import { getCompileResult } from '../../compiler';

(self as any).createSvelteCompiler = (): CompilerFunction => {
  let importedContent = '';

  const compileSvelteSFC = async (
    code: string,
    { config, filename }: { config: Config; filename: string },
  ) => {
    if (!code) return getCompileResult('');

    const fullCode = await replaceSFCImports(code, {
      config,
      filename,
      getLanguageByAlias,
      sfcExtension: '.svelte',
      compileSFC: async (
        code: string,
        { config, filename }: { config: Config; filename: string },
      ) => {
        importedContent += `\n${filename}\n\n${code}\n`;
        return (await compileSvelteSFC(code, { config, filename })).code;
      },
    });
    const processedCode = await compileAllBlocks(fullCode, config, {
      removeEnclosingTemplate: true,
    });
    const customSettings = getLanguageCustomSettings('svelte', config);
    const init =
      filename === 'App.svelte'
        ? ''
        : `\nnew Component({ target: document.querySelector("#livecodes-app") || document.body.appendChild(document.createElement('div')) });`;
    const { js } = (window as any).svelte.compile(processedCode, {
      css: 'injected',
      ...customSettings,
    });
    return {
      code: js.code + init,
      info: { importedContent, imports: createImportMap(importedContent, config) },
    };
  };

  return (code, { config }) => compileSvelteSFC(code, { config, filename: 'App.svelte' });
};
