import { compileInCompiler } from '../../compiler';
import { compileAllBlocks } from '../../compiler/compile-blocks';
import { createImportMap, replaceSFCImports } from '../../compiler/import-map';
import { getCompileResult } from '../../compiler/utils';
import type { CompileOptions, CompilerFunction, Config, Language } from '../../models';
import { getErrorMessage } from '../../utils/utils';
import { getFileExtension, getLanguageByAlias, getLanguageCustomSettings } from '../utils';

(self as any).createSvelteCompiler = (): CompilerFunction => {
  const MAIN_FILE = '__LiveCodes_App__.svelte';
  const SECONDARY_FILE = '__LiveCodes_Component__.svelte';
  let importedContent = '';
  let imports: Record<string, string> = {};
  let errors: string[] = [];

  const compileSvelteSFC = async (
    code: string,
    { config, language, filename }: { config: Config; language: Language; filename: string },
  ) => {
    if (filename === MAIN_FILE) {
      importedContent = '';
      imports = {};
    }
    if (!code) return getCompileResult('');

    const isSfc = (mod: string) =>
      (mod.toLowerCase().endsWith('.svelte') && !mod.startsWith('~/')) ||
      mod.toLowerCase().startsWith('data:text/svelte');

    const fullCode = await replaceSFCImports(code, {
      config,
      filename,
      getLanguageByAlias,
      getFileExtension,
      isSfc,
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

    if (filename === MAIN_FILE || filename === SECONDARY_FILE) {
      imports = createImportMap(importedContent, config);
      errors = [];
    }

    let js: { code: string };
    try {
      const result = (window as any).svelte.compile(processedCode, {
        css: 'injected',
        filename,
        ...customSettings,
      });
      js = result.js;
    } catch (err) {
      errors.push(getErrorMessage(err));
      return {
        code: '',
        info: { errors },
      };
    }

    const compiledCode = filename === MAIN_FILE ? getMountCode(js.code) : js.code;
    return {
      code:
        language === 'svelte-app' ? `<script type="module">${compiledCode}</script>` : compiledCode,
      info: { importedContent, imports, errors },
    };
  };

  const compileSvelteModule = async (
    code: string,
    { config, options, filename }: { config: Config; options: CompileOptions; filename: string },
  ) => {
    try {
      if (filename.endsWith('.ts')) {
        code = (await compileInCompiler(code, 'typescript', config, options)).code;
      }
      const result = (window as any).svelte.compileModule(code, {
        filename,
        ...getLanguageCustomSettings('svelte', config),
      });
      return result.js;
    } catch (err) {
      errors.push(getErrorMessage(err));
      return {
        code: '',
        info: { errors },
      };
    }
  };

  const getMountCode = (code: string) =>
    `
import { mount } from "svelte";
${code}

mount(__LiveCodes_App__, { target: document.querySelector("#livecodes-app") || document.body.appendChild(document.createElement('div')) });
`.trimStart();

  return async (code, { config, language, options }) => {
    const isMultiFileProject = config.files.length > 0;
    const isMainFile = isMultiFileProject
      ? false
      : config.markup.language !== 'svelte-app' || language === 'svelte-app';
    const filename = isMultiFileProject
      ? options.filename
      : isMainFile
        ? MAIN_FILE
        : SECONDARY_FILE;

    if (filename.endsWith('.svelte.js') || filename.endsWith('.svelte.ts')) {
      return compileSvelteModule(code, { config, options, filename });
    }

    return compileSvelteSFC(code, { config, language: language as Language, filename });
  };
};
