import { hasStyleImports, replaceStyleImports } from '../../compiler';
import { CompileOptions, CompilerFunction, Config } from '../../models';
import { escapeCode, getAbsoluteUrl } from '../../utils';
import { PluginFactory, PluginName, pluginSpecs } from './processor-postcss';

const getSpecs = (pluginName: PluginName) => pluginSpecs.find((specs) => specs.name === pluginName);

(self as any).createPostcssCompiler = (): CompilerFunction => {
  const postCssOptions = { from: undefined };

  const loadedPlugins: { [key in PluginName]?: PluginFactory } = {};

  const loadPlugin = (pluginName: PluginName, baseUrl: string) => {
    const specs = getSpecs(pluginName);
    if (!specs || loadedPlugins[pluginName] != null) return;
    try {
      if (specs.url) {
        (self as any).importScripts(getAbsoluteUrl(specs.url, baseUrl));
      }
      const plugin = specs.factory;
      loadedPlugins[pluginName] = plugin;
    } catch (err) {
      throw new Error('Failed to load PostCSS plugin: ' + pluginName);
    }
  };

  const getEnabledPluginNames = (code: string, config: Config) => {
    const configPlugins = config.processors.postcss;
    const isEnabled = (pluginName: PluginName) =>
      configPlugins[pluginName] === true ||
      (pluginName === 'postcssImportUrl' &&
        hasStyleImports(code) &&
        config.customSettings.postcssImportUrl !== false);
    return pluginSpecs.map((plugin) => plugin.name).filter(isEnabled);
  };

  const getPlugins = (code: string, config: Config, baseUrl: string, options: CompileOptions) => {
    const pluginNames = getEnabledPluginNames(code, config);
    pluginNames.forEach((pluginName) => loadPlugin(pluginName, baseUrl));
    return pluginSpecs
      .filter((specs) => pluginNames.includes(specs.name))
      .filter((specs) => specs.isPostcssPlugin !== false)
      .map((specs) => loadedPlugins[specs.name]?.({ config, options, baseUrl }));
  };

  const prepareCode = (code: string) => escapeCode(replaceStyleImports(code));

  return async function process(code, { config, baseUrl, options }): Promise<string> {
    if (!config || !baseUrl) return code;
    const plugins = getPlugins(code, config, baseUrl, options);
    let css = code;
    if (getEnabledPluginNames(code, config).includes('windicss')) {
      const windiCss = loadedPlugins.windicss?.({ config, options, baseUrl }) as any;
      if (windiCss) {
        css = await windiCss({
          html: `<template>${options.html}\n<script>${config.script.content}</script></template>`,
          css,
          config,
        });
      }
    }
    if (getEnabledPluginNames(code, config).includes('lightningcss')) {
      const lightningCss = loadedPlugins.lightningcss?.({ config, options, baseUrl }) as any;
      if (lightningCss) {
        css = await lightningCss({ css, config });
      }
    }
    return (await (self as any).postcss.postcss(plugins).process(prepareCode(css), postCssOptions))
      .css;
  };
};
