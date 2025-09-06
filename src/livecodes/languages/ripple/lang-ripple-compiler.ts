import { compileBlocks } from '../../compiler/compile-blocks';
import type { CompilerFunction, Config } from '../../models';
import { modulesService } from '../../services/modules';

// TODO: recursively compile imported Ripple components

(self as any).createRippleCompiler = async (initialConfig: Config): Promise<CompilerFunction> => {
  let version = initialConfig.customSettings.ripple?.version || 'latest';
  let compile: (code: string, filename: string) => Promise<{ js: { code: string }; css: string }>;

  const updateCompiler = async (currentVersion: string) => {
    if (typeof compile === 'function' && currentVersion === version) return;
    const mod = await import(
      /* @__PURE__ */ modulesService.getModuleUrl(`ripple@${currentVersion}/compiler`)
    );
    compile = mod.compile;
    version = currentVersion;
  };

  return async (code, { config }) => {
    if (!code.trim()) return '';

    const newVersion = config.customSettings.ripple?.version || version;
    await updateCompiler(newVersion);

    code = await compileBlocks(code, 'style', config);

    const { js, css } = await compile(code, './App.ripple');

    const cssCode =
      css === ''
        ? ''
        : `\n
const styles = document.createElement('style');
styles.innerHTML = ${JSON.stringify(css)};
document.head.appendChild(styles);
`;

    const moduleUrl = /* @__PURE__ */ modulesService.getModuleUrl(`ripple@${version}`);
    return {
      code: `${js.code}${cssCode}`,
      info: {
        imports: {
          ripple: moduleUrl,
          'ripple/internal': `${moduleUrl}/internal`,
          'ripple/internal/client': `${moduleUrl}/internal/client`,
        },
      },
    };
  };
};
