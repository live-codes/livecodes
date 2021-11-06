import { Config, Processors } from '../models';
import { getAbsoluteUrl } from '../utils';
import { tailwindcssUrl, vendorsBaseUrl } from '../vendors';
import { escapeCode, getLanguageCustomSettings } from './utils';

export type PluginName = keyof Config['processors']['postcss'];
type Plugin = () => any;
type PluginFactory = ({ config, options }: { config: Config; options?: any }) => Plugin;
interface PluginSpecs {
  name: PluginName;
  title: string;
  url: string;
  isPostcssPlugin?: boolean;
  factory: PluginFactory;
}

export const pluginSpecs: PluginSpecs[] = [
  {
    name: 'tailwindcss',
    title: 'Tailwind CSS',
    url: tailwindcssUrl,
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
    name: 'windicss',
    title: 'Windi CSS',
    url: vendorsBaseUrl + 'windicss/windicss.js',
    isPostcssPlugin: false,
    factory: () => async (compileOptions?: {
      html: string;
      css: string;
      config: Config;
      options: any;
    }) => {
      const { html = '', css = '', config } = compileOptions || {};
      const customSettings = getLanguageCustomSettings('windicss' as any, config as Config);
      const { Processor, HTMLParser, CSSParser } = (self as any).windicss;
      const processor = new Processor();
      processor.loadConfig(customSettings);

      const htmlParser = new HTMLParser(html);
      let htmlSheet;
      if (customSettings.attributify) {
        const castArray = (val: unknown) => (Array.isArray(val) ? val : [val]);
        const attrs = htmlParser.parseAttrs().reduceRight((acc: any, curr: any) => {
          const attrKey = curr.key;
          if (attrKey === 'class' || attrKey === 'className') return acc;
          const attrValue = castArray(curr.value);
          if (attrKey in acc) {
            const attrKeyValue = castArray(acc[attrKey]);
            acc[attrKey] = [...attrKeyValue, ...attrValue];
          } else {
            acc[attrKey] = attrValue;
          }
          return acc;
        }, {});
        htmlSheet = processor.attributify(attrs).styleSheet;
      } else {
        const htmlClasses = htmlParser
          .parseClasses()
          .map((i: { result: string }) => i.result)
          .join(' ');
        htmlSheet = processor.interpret(htmlClasses).styleSheet;
      }

      const includeBase = customSettings.preflight !== false;
      const includeGlobal = customSettings.preflight !== false;
      const includePlugins = customSettings.preflight !== false;
      const preflightSheet = processor.preflight(html, includeBase, includeGlobal, includePlugins);

      const cssSheet = new CSSParser(css, processor).parse();

      const APPEND = true;
      const MINIFY = false;
      const styles = cssSheet
        .extend(preflightSheet, !APPEND)
        .extend(htmlSheet, APPEND)
        .build(MINIFY);
      return styles;
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

const getSpecs = (pluginName: PluginName) => pluginSpecs.find((specs) => specs.name === pluginName);

export const postcss: Processors = {
  name: 'postcss',
  title: 'PostCSS:',
  compiler: {
    url: vendorsBaseUrl + 'postcss/postcss.js',
    factory: () => {
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
          .filter((specs) => specs.isPostcssPlugin !== false)
          .map((specs) => loadedPlugins[specs.name]?.({ config, options }));
      };

      return async function process(code, { config, baseUrl, options }): Promise<string> {
        if (!config || !baseUrl) return code;
        const plugins = getPlugins(config, baseUrl, options);
        let css = code;
        if (getEnabledPluginNames(config).includes('windicss')) {
          const windiCss = loadedPlugins.windicss?.({ config, options }) as any;
          if (windiCss) {
            css = await windiCss({
              html: options.html,
              css,
              config,
            });
          }
        }
        return (
          await (self as any).postcss.postcss(plugins).process(escapeCode(css), postCssOptions)
        ).css;
      };
    },
  },
  editors: ['style'],
};
