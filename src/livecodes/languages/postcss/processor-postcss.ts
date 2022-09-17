import type { Config, Processors } from '../../models';
import { postcssImportUrl, tailwindcssUrl, vendorsBaseUrl } from '../../vendors';
import { getLanguageCustomSettings } from '../../utils';

export type PluginName = keyof Config['processors']['postcss'];
export type Plugin = () => any;
export type PluginFactory = ({
  config,
  options,
  baseUrl,
}: {
  config: Config;
  options?: any;
  baseUrl: string;
}) => Plugin;
interface PluginSpecs {
  name: PluginName;
  title: string;
  url: string;
  isPostcssPlugin?: boolean;
  factory: PluginFactory;
  hidden?: boolean;
}

export const pluginSpecs: PluginSpecs[] = [
  {
    name: 'postcssImportUrl',
    title: 'Import Url',
    url: postcssImportUrl,
    factory: ({ config }) =>
      (self as any).postcssImportUrl({
        ...getLanguageCustomSettings('postcssImportUrl' as any, config),
      }),
    hidden: true,
  },
  {
    name: 'tailwindcss',
    title: 'Tailwind CSS',
    url: tailwindcssUrl,
    factory: ({ config, options }) =>
      (self as any).tailwindcss.tailwindcss({
        ...(self as any).tailwindcss.defaultConfig,
        ...getLanguageCustomSettings('tailwindcss' as any, config),
        content: [
          {
            raw: `<template>${options?.html}\n<script>${config.script.content}</script></template>`,
            extension: 'html',
          },
        ],
      }),
  },
  {
    name: 'windicss',
    title: 'Windi CSS',
    url: vendorsBaseUrl + 'windicss/windicss.js',
    isPostcssPlugin: false,
    factory: ({ baseUrl }) => {
      (self as any).importScripts(baseUrl + '{{hash:processor-windicss-compiler.js}}');
      return (self as any).createWindicssCompiler();
    },
  },
  {
    name: 'unocss',
    title: 'UnoCSS',
    url: vendorsBaseUrl + 'unocss/unocss.js',
    isPostcssPlugin: false,
    factory: ({ baseUrl }) => {
      (self as any).importScripts(baseUrl + '{{hash:processor-unocss-compiler.js}}');
      return (self as any).createUnocssCompiler();
    },
  },
  {
    name: 'lightningcss',
    title: 'Lightning CSS',
    url: vendorsBaseUrl + 'lightningcss/lightningcss.js',
    isPostcssPlugin: false,
    factory: ({ baseUrl }) => {
      (self as any).importScripts(baseUrl + '{{hash:processor-lightningcss-compiler.js}}');
      return (self as any).createLightningcssCompiler();
    },
  },
  {
    name: 'autoprefixer',
    title: 'Autoprefixer',
    url: vendorsBaseUrl + 'autoprefixer/autoprefixer.js',
    factory({ config }) {
      return (self as any).autoprefixer.autoprefixer({
        ...getLanguageCustomSettings('autoprefixer' as any, config),
      });
    },
  },
  {
    name: 'postcssPresetEnv',
    title: 'Preset Env',
    url: vendorsBaseUrl + 'postcss-preset-env/postcss-preset-env.js',
    factory({ config }): Plugin {
      return (self as any).postcssPresetEnv.postcssPresetEnv({
        autoprefixer: false,
        ...getLanguageCustomSettings('postcssPresetEnv' as any, config),
      });
    },
  },
];

export const postcss: Processors = {
  name: 'postcss',
  title: 'Processors:',
  compiler: {
    url: vendorsBaseUrl + 'postcss/postcss.js',
    factory: (_config, baseUrl) => {
      (self as any).importScripts(baseUrl + '{{hash:processor-postcss-compiler.js}}');
      return (self as any).createPostcssCompiler();
    },
  },
  editors: ['style'],
};
