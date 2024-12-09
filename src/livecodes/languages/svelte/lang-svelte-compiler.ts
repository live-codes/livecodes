/* eslint-disable import/no-internal-modules */
import type { CompilerFunction, Config } from '../../models';
import { compileAllBlocks } from '../../compiler/compile-blocks';
import { createImportMap, replaceSFCImports } from '../../compiler/import-map';
import { getLanguageCustomSettings, getLanguageByAlias } from '../utils';
import { getCompileResult } from '../../compiler';

(self as any).createSvelteCompiler = (): CompilerFunction => {
  const MAIN_FILE = '__LiveCodes_App__.svelte';
  let importedContent = '';
  let imports: Record<string, string> = {};

  const compileSvelteSFC = async (
    code: string,
    { config, filename }: { config: Config; filename: string },
  ) => {
    if (filename === MAIN_FILE) {
      importedContent = '';
      imports = {};
    }
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
        const compiled = (await compileSvelteSFC(code, { config, filename })).code;
        importedContent += `\n${filename}\n\n${compiled}\n`;
        return compiled;
      },
    });
    const processedCode = await compileAllBlocks(fullCode, config, {
      removeEnclosingTemplate: true,
    });
    const customSettings = getLanguageCustomSettings('svelte', config);

    const { js } = (window as any).svelte.compile(processedCode, {
      css: 'injected',
      filename: MAIN_FILE,
      ...customSettings,
    });

    if (filename === MAIN_FILE) {
      imports = createImportMap(importedContent, config);
    }

    return {
      code: filename === MAIN_FILE ? getMountCode(js.code) : js.code,
      info: { importedContent, imports },
    };
  };

  return (code, { config }) => compileSvelteSFC(code, { config, filename: MAIN_FILE });
};

const getMountCode = (code: string) =>
  `
import { mount } from "svelte";
${code}

mount(__LiveCodes_App__, { target: document.querySelector("#livecodes-app") || document.body.appendChild(document.createElement('div')) });
`.trimStart();
