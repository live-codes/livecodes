import type { ProcessorSpecs } from '../../models';
import { postcssImportUrlUrl, vendorsBaseUrl } from '../../vendors';
import { getLanguageCustomSettings } from '../../utils';

export const autoprefixer: ProcessorSpecs = {
  name: 'autoprefixer',
  title: 'Autoprefixer',
  isPostcssPlugin: true,
  compiler: {
    url: vendorsBaseUrl + 'autoprefixer/autoprefixer.js',
    factory: (config) =>
      (self as any).autoprefixer.autoprefixer({
        ...getLanguageCustomSettings('autoprefixer', config),
      }),
  },
  editor: 'style',
};

export const cssnano: ProcessorSpecs = {
  name: 'cssnano',
  title: 'cssnano',
  isPostcssPlugin: true,
  compiler: {
    url: vendorsBaseUrl + 'cssnano/cssnano.js',
    factory: () => {
      const nanoPlugins = (self as any).cssnano.cssnanoPresetDefault().plugins;
      const postcssPlugins = [];
      for (const plugin of nanoPlugins) {
        const [processor, opts] = plugin;
        if (
          typeof opts === 'undefined' ||
          (typeof opts === 'object' && !opts.exclude) ||
          (typeof opts === 'boolean' && opts === true)
        ) {
          postcssPlugins.push(processor(opts));
        }
      }
      return postcssPlugins;
    },
  },
  editor: 'style',
};

export const postcssImportUrl: ProcessorSpecs = {
  name: 'postcssImportUrl',
  title: 'Import Url',
  isPostcssPlugin: true,
  compiler: {
    url: postcssImportUrlUrl,
    factory: (config) =>
      (self as any).postcssImportUrl({
        ...getLanguageCustomSettings('postcssImportUrl', config),
      }),
  },
  editor: 'style',
};

export const postcssPresetEnv: ProcessorSpecs = {
  name: 'postcssPresetEnv',
  title: 'Preset Env',
  isPostcssPlugin: true,
  compiler: {
    url: vendorsBaseUrl + 'postcss-preset-env/postcss-preset-env.js',
    factory: (config) =>
      (self as any).postcssPresetEnv.postcssPresetEnv({
        autoprefixer: false,
        ...getLanguageCustomSettings('postcssPresetEnv', config),
      }),
  },
  editor: 'style',
};

export const purgecss: ProcessorSpecs = {
  name: 'purgecss',
  title: 'PurgeCSS',
  isPostcssPlugin: true,
  needsHTML: true,
  compiler: {
    url: vendorsBaseUrl + 'purgecss/purgecss.js',
    factory: (config, _baseUrl, options) =>
      (self as any).purgecss.purgecss({
        ...getLanguageCustomSettings('purgecss', config),
        content: [
          {
            raw: `<template>${options.html}\n<script>${config.script.content}</script></template>`,
            extension: 'html',
          },
        ],
      }),
  },
  editor: 'style',
};

export const tokencss: ProcessorSpecs = {
  name: 'tokencss',
  title: 'Token CSS',
  isPostcssPlugin: true,
  compiler: {
    url: vendorsBaseUrl + 'tokencss/tokencss.js',
    factory: (config) => {
      const customSettings = getLanguageCustomSettings('tokencss', config);
      if (Object.keys(customSettings).length === 0) {
        customSettings.$schema = 'https://tokencss.com/schema@0.0.1';
        customSettings.extends = '@tokencss/core/preset';
      }
      const extendTokens = (base: any, tokens: any) => {
        const result = JSON.parse(JSON.stringify(base));
        Object.keys(tokens).forEach((key) => {
          result[key] =
            typeof tokens[key] !== 'object' || Array.isArray(tokens[key])
              ? tokens[key]
              : {
                  ...result[key],
                  ...tokens[key],
                };
        });
        return result;
      };
      const tokensConfig = customSettings.extends?.includes('@tokencss/core/preset')
        ? extendTokens((self as any).tokencss.preset, customSettings)
        : customSettings;

      return (self as any).tokencss.tokencss({ config: tokensConfig });
    },
  },
  editor: 'style',
};

export const cssModules: ProcessorSpecs = {
  name: 'cssmodules',
  title: 'CSS Modules',
  isPostcssPlugin: true,
  needsHTML: true,
  compiler: {
    url: vendorsBaseUrl + 'postcss-modules/postcss-modules.js',
    factory: (config, _baseUrl, options) => {
      const customSettings = getLanguageCustomSettings('cssmodules', config);
      return (self as any).postcssModules.postcssModules({
        localsConvention: 'camelCase',
        ...customSettings,
        getJSON(_cssFileName: string, json: Record<string, string>, _outputFileName: string) {
          const addClasses = customSettings.addClassesToHTML !== false;
          const removeClasses = customSettings.removeOriginalClasses === true;
          if (addClasses) {
            options.html = (self as any).postcssModules.addClassesToHtml(
              options.html,
              json,
              removeClasses,
            );
          }
          options.compileInfo = {
            ...options.compileInfo,
            cssModules: json,
            ...(addClasses ? { modifiedHTML: options.html } : {}),
          };
        },
      });
    },
  },
  editor: 'style',
};
