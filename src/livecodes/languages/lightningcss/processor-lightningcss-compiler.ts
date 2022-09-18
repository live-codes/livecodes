import { CompilerFunction, Config } from '../../models';
import { getLanguageCustomSettings } from '../../utils';
import { vendorsBaseUrl } from '../../vendors';

(self as any).createLightningcssCompiler = (): CompilerFunction => {
  const { init, transform } = (self as any).lightningcss;
  const initialized = init(new URL(vendorsBaseUrl + 'lightningcss/lightningcss_node_bg.wasm'));

  return async (css, { config }) => {
    const customSettings = getLanguageCustomSettings('lightningcss' as any, config as Config);
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
