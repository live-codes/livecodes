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
    let css = code;
    for (const pluginName of getEnabledPluginNames(code, config)) {
      const plugin = loadedPlugins[pluginName]?.({ config, options, baseUrl }) as any;
      const specs = getSpecs(pluginName);
      if (plugin && specs?.isPostcssPlugin === false) {
        css = await plugin({
          html: options.html,
          css,
          config,
        });
      }
    }
    const plugins = getPlugins(css, config, baseUrl, options);
    return (await (self as any).postcss.postcss(plugins).process(prepareCode(css), postCssOptions))
      .css;
  };
};
