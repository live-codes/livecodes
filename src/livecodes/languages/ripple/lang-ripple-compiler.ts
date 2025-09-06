import { compileBlocks } from '../../compiler/compile-blocks';
import { createImportMap, replaceSFCImports } from '../../compiler/import-map';
import { getCompileResult } from '../../compiler/utils';
import type { CompilerFunction, Config } from '../../models';
import { modulesService } from '../../services/modules';
import { getLanguageByAlias } from '../utils';

const getLatestVersion = async () => {
  const pkg = await fetch('https://data.jsdelivr.com/v1/packages/npm/ripple')
    .then((res) => res.json())
    .catch(() => ({}));
  return pkg.tags?.latest || 'latest';
};

(self as any).createRippleCompiler = async (initialConfig: Config): Promise<CompilerFunction> => {
  const MAIN_FILE = '__LiveCodes_App__.ripple';
  let importedContent = '';
  let imports: Record<string, string> = {};

  let version: string = initialConfig.customSettings.ripple?.version || (await getLatestVersion());
  let compile: (code: string, filename: string) => Promise<{ js: { code: string }; css: string }>;

  const updateCompiler = async (currentVersion: string) => {
    if (typeof compile === 'function' && currentVersion === version) return;
    const mod = await import(
      /* @__PURE__ */ modulesService.getModuleUrl(`ripple@${currentVersion}/compiler`)
    );
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
      const moduleUrl = /* @__PURE__ */ modulesService.getModuleUrl(`ripple@${version}`);
      imports = {
        ...createImportMap(importedContent, config),
        ripple: moduleUrl,
        'ripple/internal': `${moduleUrl}/internal`,
        'ripple/internal/client': `${moduleUrl}/internal/client`,
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
