import { Config } from '../../models';
import { getLanguageCustomSettings } from '../../utils';

(self as any).createUnocssCompiler = () => {
  const unocss = (self as any).unocss;
  const { createGenerator, defineConfig } = unocss;

  return async (compileOptions?: { html: string; css: string; config: Config; options: any }) => {
    const { html = '', css = '', config } = compileOptions || {};
    const customSettings = getLanguageCustomSettings('unocss' as any, config as Config);

    const loadPresets = (presetsObj: Record<string, any> = {}) =>
      Object.keys(presetsObj)
        .filter((key) => presetsObj[key] && key in unocss)
        .map((key) => {
          const config = presetsObj[key];
          if (typeof config === 'object') {
            return unocss[key](config);
          } else {
            return unocss[key]();
          }
        });

    const defaultConfig = defineConfig({
      presets: loadPresets({
        presetUno: true,
        presetAttributify: true,
        presetIcons: {
          cdn: 'https://esm.sh/',
        },
      }),
    });

    const { presets, ...userConfig } = customSettings;
    if (presets) {
      userConfig.presets = loadPresets(presets);
    }

    const uno = createGenerator(userConfig, defaultConfig);
    const { css: generatedStyles } = await uno.generate(html);
    return generatedStyles.trim() ? generatedStyles + '\n\n' + css : css;
  };
};
