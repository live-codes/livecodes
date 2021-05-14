import { Pen, Processors } from '../models';

type PluginSpecs = {
  [key in keyof Pen['processors']['postcss']]: {
    url: string;
    name: string;
    options: { [key: string]: any };
  };
};

const pluginSpecs: PluginSpecs = {
  autoprefixer: {
    url: 'vendor/autoprefixer/autoprefixer.js',
    name: 'autoprefixer',
    options: { overrideBrowserslist: ['last 4 version'] },
  },
  postcssPresetEnv: {
    url: 'vendor/postcss-preset-env/postcss-preset-env.js',
    name: 'postcssPresetEnv',
    options: { autoprefixer: false, browsers: 'last 4 versions' },
  },
};

export const processors: Processors[] = [
  {
    name: 'postcss',
    compiler: {
      url: 'vendor/postcss/postcss.js',
      factory: () => {
        const postCssOptions = { from: undefined };

        const { postcss } = (self as any).postcss;

        type PluginName = keyof Pen['processors']['postcss'];
        const loadedPlugins: { [key in PluginName]?: any } = {};

        const loadPlugin = (pluginName: PluginName, config: Pen) => {
          const allPlugins = config.processors.postcss;
          if (!allPlugins[pluginName] || loadedPlugins[pluginName] != null) return;
          const specs = pluginSpecs[pluginName];
          try {
            (self as any).importScripts(config.baseUrl + specs.url);
            // self.autoprefixer.autoprefixer (iife globalName -> plugin name)
            const plugin = (self as any)[specs.name][specs.name];
            loadedPlugins[pluginName] = plugin;
          } catch {
            throw new Error('Failed to load PostCSS plugin: ' + pluginName);
          }
        };

        const filterByKeys = (obj: any, keys: string[]) =>
          Object.keys(obj).reduce((filtered: any, currentKey: string) => {
            if (keys.includes(currentKey)) {
              return {
                ...filtered,
                [currentKey]: obj[currentKey],
              };
            }
            return filtered;
          }, {});

        const getPlugins = (config: Pen) => {
          const allPlugins = config.processors.postcss;
          const isEnabled = (pluginName: PluginName) => allPlugins[pluginName] === true;
          const pluginNames = (Object.keys(allPlugins) as PluginName[]).filter(isEnabled);
          pluginNames.forEach((pluginName) => loadPlugin(pluginName, config));
          return filterByKeys(loadedPlugins, pluginNames);
        };

        return async (code: string, config?: Pen): Promise<string> => {
          if (!config) return code;
          const plugins = getPlugins(config);
          const pluginsWithOptions = (Object.keys(plugins) as PluginName[]).map((pluginName) =>
            plugins[pluginName](pluginSpecs[pluginName].options),
          );
          return (await postcss(pluginsWithOptions).process(code, postCssOptions)).css;
        };
      },
      umd: true,
    },
    editors: ['style'],
  },
];
