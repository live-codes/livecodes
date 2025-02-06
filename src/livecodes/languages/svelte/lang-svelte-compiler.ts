/* eslint-disable import/no-internal-modules */
import type { CompilerFunction, Config, Language } from '../../models';
import { compileAllBlocks } from '../../compiler/compile-blocks';
import { createImportMap, replaceSFCImports } from '../../compiler/import-map';
import { getLanguageCustomSettings, getLanguageByAlias } from '../utils';
import { getCompileResult } from '../../compiler';

(self as any).createSvelteCompiler = (): CompilerFunction => {
  const MAIN_FILE = '__LiveCodes_App__.svelte';
  const SECONDARY_FILE = '__LiveCodes_Component__.svelte';
  let importedContent = '';
  let imports: Record<string, string> = {};

  const compileSvelteSFC = async (
    code: string,
    { config, language, filename }: { config: Config; language: Language; filename: string },
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
        const compiled = (await compileSvelteSFC(code, { config, language, filename })).code;
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
      filename,
      ...customSettings,
    });

    if (filename === MAIN_FILE || filename === SECONDARY_FILE) {
      imports = createImportMap(importedContent, config);
    }

    const compiledCode = filename === MAIN_FILE ? getMountCode(js.code) : js.code;
    return {
      code:
        language === 'svelte-app' ? `<script type="module">${compiledCode}</script>` : compiledCode,
      info: { importedContent, imports },
    };
  };

  return (code, { config, language }) => {
    const isMainFile = config.markup.language !== 'svelte-app' || language === 'svelte-app';
    return compileSvelteSFC(code, {
      config,
      language: language as Language,
      filename: isMainFile ? MAIN_FILE : SECONDARY_FILE,
    });
  };
};

const getMountCode = (code: string) =>
  `
import { mount } from "svelte";
${code}

mount(__LiveCodes_App__, { target: document.querySelector("#livecodes-app") || document.body.appendChild(document.createElement('div')) });
`.trimStart();
