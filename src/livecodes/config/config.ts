import { ContentConfig, Config, UserConfig, EditorConfig } from '../models';
import { cloneObject } from '../utils';
import { defaultConfig } from './default-config';
import { upgradeConfig } from './upgrade-config';
import { validateConfig } from './validate-config';

let appConfig = defaultConfig;
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
    tests: config.tests,
    version: config.version,
  });

export const getUserConfig = (config: Config | UserConfig): UserConfig =>
  cloneObject({
    autoupdate: config.autoupdate,
    autosave: config.autosave,
    delay: config.delay,
    formatOnsave: config.formatOnsave,
    recoverUnsaved: config.recoverUnsaved,
    showSpacing: config.showSpacing,
    theme: config.theme,
    ...getEditorSettings(config),
  });

export const getEditorSettings = (config: Config | UserConfig): EditorConfig =>
  cloneObject({
    editor: config.editor,
    fontFamily: config.fontFamily,
    fontSize: config.fontSize,
    useTabs: config.useTabs,
    tabSize: config.tabSize,
    lineNumbers: config.lineNumbers,
    wordWrap: config.wordWrap,
    closeBrackets: config.closeBrackets,
    emmet: config.emmet,
  });

export const upgradeAndValidate = (config: Partial<Config>) =>
  validateConfig(upgradeConfig(config as any));
