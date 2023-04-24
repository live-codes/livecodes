import type { CompilerFunction } from '../../models';
import { getLanguageCustomSettings } from '../../utils';

(self as any).createSolidCompiler = (): CompilerFunction => {
  const Babel = (self as any).Babel;
  Babel.registerPreset('solid', (self as any).babelPresetSolid.solid);
  return async (code, { config, language }) => {
    const isTsx = language === 'solid.tsx';
    const customSettings = getLanguageCustomSettings('solid', config);
    return (window as any).Babel.transform(code, {
      ...customSettings,
      filename: 'script.' + (isTsx ? 'tsx' : 'jsx'),
      presets: [
        ['env', { modules: false }],
        ...(Array.isArray(customSettings.presets) ? customSettings.presets : []),
        ...(isTsx ? ['typescript'] : []),
        ['solid', { generate: 'dom', hydratable: true }],
      ],
    }).code;
  };
};
