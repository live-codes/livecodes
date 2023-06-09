import type { CompilerFunction } from '../../models';
// eslint-disable-next-line import/no-internal-modules
import { getLanguageCustomSettings } from '../../utils/utils';
import { vendorsBaseUrl } from '../../vendors';

const pluginsUrl = vendorsBaseUrl + 'tailwindcss-plugins/tailwindcss-plugins.js';

(self as any).createTailwindcssCompiler = (): CompilerFunction => {
  let cachedPlugins: Record<string, any>;
  return async (code, { config, options }) => {
    const customSettings = getLanguageCustomSettings('tailwindcss', config);
    const officialPlugins = [
      '@tailwindcss/forms',
      '@tailwindcss/typography',
      '@tailwindcss/aspect-ratio',
      '@tailwindcss/line-clamp',
    ];

    const selectedPluginNames: string[] =
      customSettings.plugins?.filter((p: string) => officialPlugins.includes(p)) || [];

    if (!cachedPlugins && selectedPluginNames.length > 0) {
      (self as any).importScripts(pluginsUrl);
      cachedPlugins = (self as any).tailwindcssPlugins.plugins;
    }

    const loadedPlugins = selectedPluginNames.map((p) => cachedPlugins[p]);

    const tailwind = (self as any).createTailwindcss({
      tailwindConfig: {
        ...customSettings,
        ...(loadedPlugins.length > 0 ? { plugins: loadedPlugins } : {}),
      },
    });

    return tailwind.generateStylesFromContent(code, [
      `<template>${options.html}\n<script>${config.script.content}</script></template>`,
    ]);
  };
};
