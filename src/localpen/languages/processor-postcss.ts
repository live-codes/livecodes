import { Pen, Processors } from '../models';

type PluginName = keyof Pen['processors']['postcss'];
type Plugin = () => any;
interface PluginSpecs {
  name: PluginName;
  url: string;
  factory: () => Plugin;
}

const pluginSpecs: PluginSpecs[] = [
  {
    name: 'autoprefixer',
    url: 'vendor/autoprefixer/autoprefixer.js',
    factory() {
      return (self as any).autoprefixer.autoprefixer({
        overrideBrowserslist: ['last 4 version'],
      });
    },
  },
  {
    name: 'postcssPresetEnv',
    url: 'vendor/postcss-preset-env/postcss-preset-env.js',
    factory(): Plugin {
      return (self as any).postcssPresetEnv.postcssPresetEnv({
        autoprefixer: false,
        browsers: 'last 4 versions',
      });
    },
  },
];

const getSpecs = (pluginName: PluginName) => pluginSpecs.find((specs) => specs.name === pluginName);

export const postcss: Processors = {
  name: 'postcss',
  compiler: {
    url: 'vendor/postcss/postcss.js',
    factory: () => {
      const postCssOptions = { from: undefined };
      const { postcss } = (self as any).postcss;

      const loadedPlugins: { [key in PluginName]?: Plugin } = {};

      const loadPlugin = (pluginName: PluginName, baseUrl: string) => {
        const specs = getSpecs(pluginName);
        if (!specs || loadedPlugins[pluginName] != null) return;

        try {
          (self as any).importScripts(baseUrl + specs.url);
          const plugin = specs.factory();
          loadedPlugins[pluginName] = plugin;
        } catch {
          throw new Error('Failed to load PostCSS plugin: ' + pluginName);
        }
      };

      const getPlugins = (config: Pen) => {
        const configPlugins = config.processors.postcss;
        const isEnabled = (pluginName: PluginName) => configPlugins[pluginName] === true;
        const pluginNames = (Object.keys(configPlugins) as PluginName[]).filter(isEnabled);
        pluginNames.forEach((pluginName) => loadPlugin(pluginName, config.baseUrl));
        const plugins = pluginSpecs
          .filter((specs) => pluginNames.includes(specs.name))
          .map((specs) => loadedPlugins[specs.name]);
        return plugins;
      };

      return async function process(code: string, config?: Pen): Promise<string> {
        if (!config) return code;
        const plugins = getPlugins(config);
        return (await postcss(plugins).process(code, postCssOptions)).css;
      };
    },
    umd: true,
  },
  editors: ['style'],
};
