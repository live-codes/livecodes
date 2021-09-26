import { Config, Processors } from '../models';
import { getAbsoluteUrl } from '../utils';
import { vendorsBaseUrl } from '../vendors';
import { escapeCode, getLanguageCustomSettings } from './utils';

export type PluginName = keyof Config['processors']['postcss'];
type Plugin = () => any;
type PluginFactory = ({ config, options }: { config: Config; options?: any }) => Plugin;
interface PluginSpecs {
  name: PluginName;
  title: string;
  url: string;
  factory: PluginFactory;
}

export const pluginSpecs: PluginSpecs[] = [
  {
    name: 'tailwindcss',
    title: 'Tailwind CSS',
    url:
      'https://cdn.jsdelivr.net/npm/tailwindcss-browser-plugin@0.2.0/dist/tailwindcss.umd.min.js',
    factory: ({ config, options }) =>
      (self as any).tailwindcss.tailwindcss({
        ...(self as any).tailwindcss.defaultConfig,
        ...getLanguageCustomSettings('tailwindcss' as any, config),
        mode: 'jit',
        purge: [
          {
            raw: options?.html || '',
            extension: 'html',
          },
        ],
      }),
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

const getSpecs = (pluginName: PluginName) => pluginSpecs.find((specs) => specs.name === pluginName);

export const postcss: Processors = {
  name: 'postcss',
  title: 'PostCSS:',
  info: `
  <h3>PostCSS</h3>
  <div>
    <p>A tool for transforming CSS with JavaScript.</p>
    <p><a href="https://postcss.org/" target="_blank" rel="noopener">PostCSS official website</a></p>
    <h4>Plugins:</h4>
  </div>
  <ul>
    <li><a href="https://github.com/postcss/autoprefixer" target="_blank" rel="noopener">Autoprefixer</a></li>
    <li><a href="https://preset-env.cssdb.org/" target="_blank" rel="noopener">PostCSS Preset Env</a></li>
  </ul>
  `,
  compiler: {
    url: vendorsBaseUrl + 'postcss/postcss.js',
    factory: () => {
      const postCssOptions = { from: undefined };

      const loadedPlugins: { [key in PluginName]?: PluginFactory } = {};

      const loadPlugin = (pluginName: PluginName, baseUrl: string) => {
        const specs = getSpecs(pluginName);
        if (!specs || loadedPlugins[pluginName] != null) return;
        try {
          (self as any).importScripts(getAbsoluteUrl(specs.url, baseUrl));
          const plugin = specs.factory;
          loadedPlugins[pluginName] = plugin;
        } catch (err) {
          throw new Error('Failed to load PostCSS plugin: ' + pluginName);
        }
      };

      const getEnabledPluginNames = (config: Config) => {
        const configPlugins = config.processors.postcss;
        const isEnabled = (pluginName: PluginName) => configPlugins[pluginName] === true;
        return (Object.keys(configPlugins) as PluginName[]).filter(isEnabled);
      };

      const getPlugins = (config: Config, baseUrl: string, options: { html: string }) => {
        const pluginNames = getEnabledPluginNames(config);
        pluginNames.forEach((pluginName) => loadPlugin(pluginName, baseUrl));
        return pluginSpecs
          .filter((specs) => pluginNames.includes(specs.name))
          .map((specs) => loadedPlugins[specs.name]?.({ config, options }));
      };

      // TODO: revisit this
      const twCode = (code: string, config: Config) => {
        if (getEnabledPluginNames(config).includes('tailwindcss')) {
          return `@tailwind base;
@tailwind components;
${escapeCode(code)}
@tailwind utilities;
`;
        }
        return code;
      };

      return async function process(code, { config, baseUrl, options }): Promise<string> {
        if (!config || !baseUrl) return code;
        const plugins = getPlugins(config, baseUrl, options);
        return (
          await (self as any).postcss.postcss(plugins).process(twCode(code, config), postCssOptions)
        ).css;
      };
    },
  },
  editors: ['style'],
};
