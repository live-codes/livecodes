import { compileBlocks } from '../../compiler/compile-blocks';
import { createImportMap, replaceSFCImports } from '../../compiler/import-map';
import { getCompileResult } from '../../compiler/utils';
import type { CompilerFunction, Config } from '../../models';
import { modulesService } from '../../services/modules';
import { pkgInfoService } from '../../services/pkgInfo';
import { getLanguageByAlias } from '../utils';

(self as any).createRippleCompiler = async (initialConfig: Config): Promise<CompilerFunction> => {
  const MAIN_FILE = 'Component.ripple';
  let importedContent = '';
  let imports: Record<string, string> = {};

  const getModuleName = (v: string) =>
    v.startsWith('pr:ripple@') || v.startsWith('pkg.pr.new:ripple@')
      ? v // 'pr:ripple@f8bdb34'
      : `ripple@${v}`; // '0.2.25'

  let version: string =
    initialConfig.customSettings.ripple?.version ||
    (await pkgInfoService.getPkgLatestVersion('ripple'));
  let compile: (code: string, filename: string) => Promise<{ js: { code: string }; css: string }>;
  const updateCompiler = async (currentVersion: string) => {
    if (typeof compile === 'function' && currentVersion === version) return;
    const modName = getModuleName(currentVersion + '/compiler');
    const mod = await import(modulesService.getModuleUrl(modName));
    compile = mod.compile;
    version = currentVersion;
  };

  const compileRipple = async (
    code: string,
    { config, filename }: { config: Config; filename: string },
  ) => {
    if (filename === MAIN_FILE) {
      importedContent = '';
      imports = {};
    }
    if (!code.trim()) return getCompileResult('');

    const newVersion = config.customSettings.ripple?.version || version;
    await updateCompiler(newVersion);

    const isRipple = (mod: string) =>
      mod.toLowerCase().endsWith('.ripple') || mod.toLowerCase().startsWith('data:text/ripple');

    const fullCode = await replaceSFCImports(code, {
      config,
      filename,
      getLanguageByAlias,
      isSfc: isRipple,
      compileSFC: async (
        code: string,
        { config, filename }: { config: Config; filename: string },
      ) => {
        const compiled = (await compileRipple(code, { config, filename })).code;
        importedContent += `\n${filename}\n\n${code}\n`;
        return compiled;
      },
    });
    const processedCode = await compileBlocks(fullCode, 'style', config);
    const { js, css } = await compile(processedCode, filename);

    const cssCode =
      css === ''
        ? ''
        : `
const styles = document.createElement('style');
styles.innerHTML = ${JSON.stringify(css)};
document.head.appendChild(styles);
`;

    if (filename === MAIN_FILE) {
      const moduleUrl = modulesService.getUrl(getModuleName(version));
      imports = {
        ...createImportMap(importedContent, config),
        ripple: `${moduleUrl}/src/runtime/index-client.js`,
        'ripple/internal/client': `${moduleUrl}/src/runtime/internal/client/index.js`,
        'ripple/jsx-runtime': `${moduleUrl}/src/jsx-runtime.js`,
        [`${moduleUrl}/src/runtime/internal/client/constants`]: `${moduleUrl}/src/runtime/internal/client/constants.js`,
        [`${moduleUrl}/src/runtime/internal/client/runtime`]: `${moduleUrl}/src/runtime/internal/client/runtime.js`,
        clsx: modulesService.getModuleUrl('clsx'),
        devalue: modulesService.getModuleUrl('devalue'),
        'esm-env': modulesService.getModuleUrl('esm-env'),
      };
    }

    return {
      code: `${js.code}\n${cssCode}`,
      info: { importedContent, imports },
    };
  };

  return (code, { config }) =>
    compileRipple(code, {
      config,
      filename: MAIN_FILE,
    });
};
