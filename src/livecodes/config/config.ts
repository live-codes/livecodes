import { ContentConfig, Config, UserConfig } from '../models';
import { cloneObject } from '../utils';
import { upgradeConfig } from './upgrade-config';
import { validateConfig } from './validate-config';

let appConfig: Config;
export const getConfig = (): Config => cloneObject(appConfig);

export const setConfig = (newConfig: Config) => {
  appConfig = cloneObject(newConfig);
};

export const getContentConfig = (config: Config | ContentConfig): ContentConfig =>
  cloneObject({
    title: config.title,
    description: config.description,
    tags: config.tags,
    activeEditor: config.activeEditor,
    languages: config.languages,
    markup: config.markup,
    style: config.style,
    script: config.script,
    stylesheets: config.stylesheets,
    scripts: config.scripts,
    cssPreset: config.cssPreset,
    processors: config.processors,
    customSettings: config.customSettings,
    imports: config.imports,
    types: config.types,
    version: config.version,
  });

export const getUserConfig = (config: Config | UserConfig): UserConfig =>
  cloneObject({
    autoupdate: config.autoupdate,
    autosave: config.autosave,
    delay: config.delay,
    formatOnsave: config.formatOnsave,
    emmet: config.emmet,
    theme: config.theme,
    enableRestore: config.enableRestore,
  });

export const upgradeAndValidate = (config: Partial<Config>) =>
  validateConfig(upgradeConfig(config as any));
