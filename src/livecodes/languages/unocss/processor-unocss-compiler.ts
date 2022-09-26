import type { CompilerFunction } from '../../models';
import { getLanguageCustomSettings } from '../../utils';

(self as any).createUnocssCompiler = (): CompilerFunction => {
  const unocss = (self as any).unocss;
  const { createGenerator, defineConfig } = unocss;

  return async (css, { config, options }) => {
    const html = `<template>${options.html}\n<script>${config.script.content}</script></template>`;
    const customSettings = getLanguageCustomSettings('unocss', config);

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
