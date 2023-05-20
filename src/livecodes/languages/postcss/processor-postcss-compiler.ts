import { replaceStyleImports } from '../../compiler';
import type {
  CompileOptions,
  CompilerFunction,
  Config,
  Processor,
  ProcessorSpecs,
} from '../../models';
import { escapeCode, getAbsoluteUrl } from '../../utils';
import { processors } from '../processors';
import { processorIsEnabled } from '../utils';

const getSpecs = (pluginName: Processor) => processors.find((specs) => specs.name === pluginName);

(self as any).createPostcssCompiler = (): CompilerFunction => {
  const postCssOptions = { from: undefined };

  const loadedPlugins: { [key in Processor]?: ProcessorSpecs['compiler']['factory'] } = {};

  const loadPlugin = (pluginName: Processor, baseUrl: string) => {
    const specs = getSpecs(pluginName);
    if (!specs || loadedPlugins[pluginName] != null) return;
    try {
      if (specs.compiler.url) {
        (self as any).importScripts(getAbsoluteUrl(specs.compiler.url, baseUrl));
      }
      loadedPlugins[pluginName] = specs.compiler.factory;
    } catch (err) {
      throw new Error('Failed to load PostCSS plugin: ' + pluginName);
    }
  };

  const getEnabledPluginNames = (config: Config) => {
    const configPlugins = config.processors.filter((p) => getSpecs(p)?.isPostcssPlugin);
    const isEnabled = (pluginName: Processor) =>
      processorIsEnabled(pluginName, config) && configPlugins.includes(pluginName);
    return processors.map((plugin) => plugin.name).filter(isEnabled);
  };

  const getPlugins = (config: Config, baseUrl: string, options: CompileOptions) => {
    const pluginNames = getEnabledPluginNames(config);
    pluginNames.forEach((pluginName) => loadPlugin(pluginName, baseUrl));
    return processors
      .filter((specs) => pluginNames.includes(specs.name))
      .map((specs) => loadedPlugins[specs.name]?.(config, baseUrl, options))
      .flat(); // allow plugins to have arrays of plugins
  };

  const prepareCode = (code: string) => escapeCode(replaceStyleImports(code));

  return async function process(code, { config, baseUrl, options }) {
    if (!config || !baseUrl) return { code, info: {} };
    const plugins = getPlugins(config, baseUrl, options);
    const pluginNames = getEnabledPluginNames(config);
    if (pluginNames.includes('tokencss')) {
      code = '@inject "tokencss:base";\n' + code;
    }

    const result = (
      await (self as any).postcss.postcss(plugins).process(prepareCode(code), postCssOptions)
    ).css;

    return { code: result, info: options.compileInfo || {} };
  };
};
