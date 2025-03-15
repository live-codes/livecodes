import type { CompilerFunction } from '../../models';
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

// https://github.com/parcel-bundler/lightningcss/blob/fc7f350e5b26188941778514a1f0c0ae48282e72/node/flags.js
export const lightningcssFeatures = {
  Nesting: 1,
  NotSelectorList: 2,
  DirSelector: 4,
  LangSelectorList: 8,
  IsSelector: 16,
  TextDecorationThicknessPercent: 32,
  MediaIntervalSyntax: 64,
  MediaRangeSyntax: 128,
  CustomMediaQueries: 256,
  ClampFunction: 512,
  ColorFunction: 1024,
  OklabColors: 2048,
  LabColors: 4096,
  P3Colors: 8192,
  HexAlphaColors: 16384,
  SpaceSeparatedColorNotation: 32768,
  FontFamilySystemUi: 65536,
  DoublePositionGradients: 131072,
  VendorPrefixes: 262144,
  LogicalProperties: 524288,
  LightDark: 1048576,
  Selectors: 31,
  MediaQueries: 448,
  Colors: 1113088,
};
