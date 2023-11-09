import { getLanguageEditorId } from '../languages';
import type { Config, Processor } from '../models';
import { defaultConfig } from './default-config';

interface genericConfig extends Config {
  [x: string]: any;
}

const upgradeSteps = [
  {
    to: '18',
    upgrade: (oldConfig: genericConfig, version: string): genericConfig => {
      const config: genericConfig = clone(oldConfig);
      const head = (config.customSettings as any)?.head;
      if (typeof head === 'string') {
        config.head = head;
        delete (config.customSettings as any)?.head;
      }
      const htmlClasses = (config.customSettings as any)?.htmlClasses;
      if (typeof htmlClasses === 'string') {
        if (typeof config.htmlAttrs === 'string') {
          config.htmlAttrs = `class="${htmlClasses}" ${config.htmlAttrs}`;
        } else {
          config.htmlAttrs = {
            ...config.htmlAttrs,
            class: htmlClasses,
          };
        }
        delete (config.customSettings as any)?.htmlClasses;
      }
      return {
        ...config,
        version,
      };
    },
  },
  {
    to: '0.6.0',
    upgrade: (oldConfig: genericConfig, version: string): genericConfig => {
      const config: genericConfig = clone(oldConfig);
      if (config.processors && 'postcss' in config.processors) {
        config.processors = Object.keys((config.processors as any).postcss).filter(
          (p) => (config.processors as any).postcss[p],
        ) as Processor[];
      }
      return {
        ...config,
        version,
      };
    },
  },
  {
    to: '0.5.0',
    upgrade: (oldConfig: genericConfig, version: string): genericConfig => {
      const config: genericConfig = clone(oldConfig);
      if ('editor' in config && config.editor === ('prism' as any)) {
        config.editor = 'codejar';
      }
      if ('compiled' in config) {
        config.tools = config.tools || clone(defaultConfig.tools);
        config.tools.active = 'compiled';
        config.tools.status = config.compiled;
        delete config.compiled;
      }
      if ('console' in config) {
        config.tools = config.tools || clone(defaultConfig.tools);
        config.tools.active = 'console';
        config.tools.status = config.console;
        delete config.console;
      }
      if (config.script?.language === 'graph') {
        config.script.language = 'diagrams';
      }
      if (config.languages?.includes('graph')) {
        config.languages = config.languages.map((l) => (l === 'graph' ? 'diagrams' : l));
      }
      if ('enableRestore' in config) {
        config.recoverUnsaved = config.enableRestore;
        delete config.enableRestore;
      }
      return {
        ...config,
        version,
      };
    },
  },
  {
    to: '0.4.0',
    upgrade: (oldConfig: genericConfig, version: string): genericConfig => {
      let config: genericConfig = clone(oldConfig);
      config = renameProperty(config, 'update_delay', 'delay');
      config = renameProperty(config, 'allow_lang_change', 'allowLangChange');
      if ('autoprefixer' in config) {
        config.processors = clone(defaultConfig.processors);
        (config.processors as any).postcss = (config.processors as any).postcss || {};
        (config.processors as any).postcss.autoprefixer = config.autoprefixer;
        delete config.autoprefixer;
      }
      if ('baseUrl' in config) {
        delete config.baseUrl;
      }
      if ('cssPreset' in config && config.cssPreset === null) {
        config.cssPreset = '';
      }
      if ('editor' in config && typeof config.editor !== 'string') {
        config.editor = undefined;
      }
      if ('language' in config) {
        config.activeEditor = getLanguageEditorId(config.language);
        delete config.language;
      }

      interface Module {
        name: string;
        url?: string;
        typesUrl?: string;
      }
      if ('modules' in config) {
        const imports = {
          ...config.modules.reduce(
            (acc: Record<string, string>, mod: Module) => ({
              ...acc,
              ...(mod.url ? { [mod.name]: mod.url } : {}),
            }),
            {} as Record<string, string>,
          ),
        };
        if (Object.keys(imports).length > 0) {
          config.imports = imports;
        }

        const types = {
          ...config.modules.reduce(
            (acc: Record<string, string>, mod: Module) => ({
              ...acc,
              ...(mod.typesUrl ? { [mod.name]: mod.typesUrl } : {}),
            }),
            {} as Record<string, string>,
          ),
        };
        if (Object.keys(types).length > 0) {
          config.types = types;
        }
        delete config.modules;
      }
      return {
        ...config,
        version,
      };
    },
  },
];

export const upgradeConfig = (oldConfig: genericConfig) => {
  const oldVersion = isValidVersion(oldConfig.version) ? oldConfig.version : '0.0.0';
  const currentVersion = defaultConfig.version;

  if (isEarlier({ version: currentVersion, comparedTo: oldVersion })) {
    // eslint-disable-next-line no-console
    console.warn(
      `Unsupported config version '${oldVersion}'. Current LiveCodes version is '${currentVersion}'`,
    );
    return oldConfig;
  }
  if (oldVersion === currentVersion) return oldConfig;

  return {
    ...upgradeSteps
      .sort((a, b) => (isEarlier({ version: a.to, comparedTo: b.to }) ? -1 : 1))
      .reduce(
        (config, step) =>
          isEarlier({ version: config.version, comparedTo: step.to })
            ? step.upgrade(config, step.to)
            : config,
        oldConfig,
      ),
    version: currentVersion,
  };
};

const isValidVersion = (version: any) => {
  if (typeof version !== 'string') return false;
  const numbers = version.split('.');
  if (numbers.length !== 3) return false;
  if (numbers.map((n) => Number(n)).filter(isNaN).length !== 0) return false;
  return true;
};

export const isEarlier = ({ version, comparedTo }: { version: string; comparedTo: string }) => {
  if (!version) return true;
  const versionNumbers = version.split('.').map((n) => Number(n));
  const comparedToNumbers = comparedTo.split('.').map((n) => Number(n));
  for (const i in versionNumbers) {
    if (versionNumbers[i] < comparedToNumbers[i]) return true;
  }
  return false;
};

const clone = (obj: any) => JSON.parse(JSON.stringify(obj));

const renameProperty = (obj: any, oldProp: string, newProp: string) => {
  const { [oldProp]: _, ...newObj } = {
    ...obj,
    ...(oldProp in obj ? { [newProp]: obj[oldProp] } : {}),
  };
  return newObj;
};
