/* eslint-disable no-bitwise */
import { compileInCompiler } from '../../compiler/compile-in-compiler';
import { isBare, replaceStyleImports } from '../../compiler/import-map';
import type { CompilerFunction, Config, Language } from '../../models';
import { modulesService } from '../../services';
import { getLanguageCustomSettings } from '../../utils/utils';
import { tailwindcss3Url, tailwindcssBaseUrl, vendorsBaseUrl } from '../../vendors';
import { lightningcssFeatures } from '../lightningcss/processor-lightningcss-compiler';
import { getLanguageEditorId } from '../utils';
import { addCodeInStyleBlocks, hasTailwindImport } from './utils';

declare const self: any;

self.createTailwindcssCompiler = (): CompilerFunction => {
  const pluginsUrl = vendorsBaseUrl + 'tailwindcss/tailwindcss-plugins.js';
  let cachedPlugins: Record<string, any>;

  const officialPlugins = [
    '@tailwindcss/forms',
    '@tailwindcss/typography',
    '@tailwindcss/aspect-ratio',
    '@tailwindcss/line-clamp',
  ];

  const loadPlugins = () => {
    self.importScripts(pluginsUrl);
    cachedPlugins = self.tailwindcssPlugins.plugins;
  };

  const scan = (code: string) => {
    const classes = new Set<string>();
    // https://regexr.com/8bfi6
    const stringsPattern = /((?:`(?:.|\n|\r)+?`)|(?:'.+?')|(?:".+?"))/g;
    const strings = code.match(new RegExp(stringsPattern)) ?? [];
    for (const str of strings) {
      str
        .slice(1, -1) // remove quotes
        .replace(/[\n\r]/g, ' ')
        .split(' ')
        .forEach((c) => {
          c = c.trim();
          if (c === '' || classes.has(c)) return;
          classes.add(c);
        });
    }
    return Array.from(classes);
  };

  const loadStylesheet = async (id: string, base: string) => {
    const fetchFromCDN = (file: string) => {
      const url = tailwindcssBaseUrl + file;
      return fetch(url).then((res) => res.text());
    };

    const load = async () => {
      if (id === 'tailwindcss') {
        return {
          base,
          content: await fetchFromCDN('index.css'),
        };
      } else if (
        id === 'tailwindcss/preflight' ||
        id === 'tailwindcss/preflight.css' ||
        id === './preflight.css'
      ) {
        return {
          base,
          content: await fetchFromCDN('preflight.css'),
        };
      } else if (
        id === 'tailwindcss/theme' ||
        id === 'tailwindcss/theme.css' ||
        id === './theme.css'
      ) {
        return {
          base,
          content: await fetchFromCDN('theme.css'),
        };
      } else if (
        id === 'tailwindcss/utilities' ||
        id === 'tailwindcss/utilities.css' ||
        id === './utilities.css'
      ) {
        return {
          base,
          content: await fetchFromCDN('utilities.css'),
        };
      }

      return {
        base,
        content: await fetch(id)
          .then((res) => res.text())
          .catch(() => ''),
      };
    };

    return load();
  };

  const loadModule = async (id: string) => {
    if (officialPlugins.includes(id) && !cachedPlugins) {
      loadPlugins();
    }
    if (cachedPlugins?.[id]) {
      return {
        base: '/',
        module: cachedPlugins[id],
      };
    }
    try {
      const moduleUrl = isBare(id) ? modulesService.getModuleUrl(id) : id;
      const module = await import(moduleUrl);
      return {
        base: '/',
        module: module.default ?? module,
      };
    } catch {
      throw new Error(`Tailwind CSS plugin "${id}" could not be loaded.`);
    }
  };

  const checkVersion = (code: string) => {
    // https://regexr.com/8bfbb
    const directivesPattern = /@tailwind\s+((base)|(components)|(utilities))\s*;?/g;
    if (new RegExp(directivesPattern).exec(code)) return 3;
    return 4;
  };

  const processInLightningCss: typeof compileInCompiler = async (
    code,
    language,
    config,
    options,
  ) => {
    const Features = lightningcssFeatures;
    // https://github.com/tailwindlabs/tailwindcss/blob/515a9bdc5ff77291d6f41cd1d4c22e9d24ea91bc/packages/%40tailwindcss-cli/src/commands/build/index.ts#L439
    const lightningConfig = {
      minify: false,
      sourceMap: false,
      drafts: { customMedia: true },
      nonStandard: { deepSelectorCombinator: true },
      include: Features.Nesting,
      exclude: Features.LogicalProperties | Features.DirSelector | Features.LightDark,
      targets: {
        safari: (16 << 16) | (4 << 8),
        ios_saf: (16 << 16) | (4 << 8),
        firefox: 128 << 16,
        chrome: 111 << 16,
      },
      errorRecovery: true,
    };
    const modifiedConfig: Config = {
      ...config,
      customSettings: {
        ...config.customSettings,
        lightningcss: {
          ...lightningConfig,
          ...config.customSettings.lightningcss,
        },
      },
    };
    // process twice
    // https://github.com/tailwindlabs/tailwindcss/blob/515a9bdc5ff77291d6f41cd1d4c22e9d24ea91bc/packages/%40tailwindcss-cli/src/commands/build/index.ts#L462-L464
    const compiled1 = await compileInCompiler(code, language, modifiedConfig, options);
    const compiled2 = await compileInCompiler(compiled1.code, language, modifiedConfig, options);
    return compiled2;
  };

  const tailwind3: CompilerFunction = (code, { config, options }) => {
    if (!self.createTailwindcss) {
      self.importScripts(tailwindcss3Url);
    }
    const customSettings = getLanguageCustomSettings('tailwindcss', config);
    const selectedPluginNames: string[] =
      customSettings.plugins?.filter((p: string) => officialPlugins.includes(p)) || [];

    if (!cachedPlugins && selectedPluginNames.length > 0) {
      loadPlugins();
    }

    const loadedPlugins = selectedPluginNames.map((p) => cachedPlugins[p]);

    const tailwind = self.createTailwindcss({
      tailwindConfig: {
        ...customSettings,
        ...(loadedPlugins.length > 0 ? { plugins: loadedPlugins } : {}),
      },
    });

    const html = `<template>${options.html}\n<script>${config.script.content}</script></template>`;
    return tailwind.generateStylesFromContent(addCodeInStyleBlocks(code, html), [html]);
  };

  const tailwind4: CompilerFunction = async (code, { config, options }) => {
    const isMultiFile = config.files.length > 0;

    if (isMultiFile && !hasTailwindImport(code)) return code;

    const prepareCode = (css: string, html: string, isMultiFile = false) => {
      let result = replaceStyleImports(css, { exceptions: [/tailwindcss/g] });
      if (!result.includes('@import') && !isMultiFile) {
        result = `@import "tailwindcss";${result}`;
      }
      return addCodeInStyleBlocks(result, html);
    };

    const html = isMultiFile
      ? '<template>' +
        config.files
          .map((f) => ({
            type: getLanguageEditorId(f.language),
            content: f.content,
          }))
          .filter((f) => f.type !== 'style')
          .map((f) => (f.type === 'markup' ? f.content : `<script>${f.content}</script>`))
          .join('\n') +
        '</template>'
      : `<template>${options.html}\n<script>${config.script.content}</script></template>`;
    const css = prepareCode(code, html, isMultiFile);

    try {
      const compiler = await self.tailwindcss.compile(css, {
        base: '/',
        loadStylesheet,
        loadModule,
      });
      const candidates = scan(html);
      const output: string = compiler.build(candidates);
      return processInLightningCss(output, 'lightningcss' as Language, config, options);
    } catch (e: any) {
      // eslint-disable-next-line no-console
      console.error('Error compiling Tailwind CSS.', e.message || e);
    }
    return css;
  };

  return (cssCode, compileOptions) =>
    checkVersion(cssCode) === 3
      ? tailwind3(cssCode, compileOptions)
      : tailwind4(cssCode, compileOptions);
};
