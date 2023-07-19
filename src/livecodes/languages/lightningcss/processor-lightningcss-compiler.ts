import type { CompilerFunction } from '../../models';
// eslint-disable-next-line import/no-internal-modules
import { getLanguageCustomSettings } from '../../utils/utils';
import { vendorsBaseUrl } from '../../vendors';

(self as any).createLightningcssCompiler = (): CompilerFunction => {
  const { init, transform } = (self as any).lightningcss;
  const initialized = init(new URL(vendorsBaseUrl + 'lightningcss/lightningcss_node.wasm'));

  return async (css, { config }) => {
    const customSettings = getLanguageCustomSettings('lightningcss', config);
    await initialized;
    const { code, map, warnings } = transform({
      filename: 'style.css',
      code: new TextEncoder().encode(css),
      minify: true,
      drafts: {
        nesting: true,
        customMedia: true,
      },
      errorRecovery: true,
      ...customSettings,
    });
    warnings.forEach((warning: any) => {
      // eslint-disable-next-line no-console
      console.warn(warning.message, '\nline:', warning.loc.line, 'column:', warning.loc.column);
    });
    const sourceMap = customSettings.sourceMap
      ? `\n/*# sourceMappingURL=${new TextDecoder().decode(map)}`
      : '';
    return new TextDecoder().decode(code) + sourceMap;
  };
};
