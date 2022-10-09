import { ContentConfig, Config, UserConfig, EditorConfig, FormatterConfig } from '../models';
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

export const getUserConfig = (config: Config | UserConfig): UserConfig => ({
  autoupdate: config.autoupdate,
  autosave: config.autosave,
  delay: config.delay,
  formatOnsave: config.formatOnsave,
  recoverUnsaved: config.recoverUnsaved,
  showSpacing: config.showSpacing,
  theme: config.theme,
  ...getEditorConfig(config),
  ...getFormatterConfig(config),
});

export const getEditorConfig = (config: Config | UserConfig): EditorConfig => ({
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

export const getFormatterConfig = (config: Config | UserConfig): FormatterConfig => ({
  useTabs: config.useTabs,
  tabSize: config.tabSize,
  semicolons: config.semicolons,
  singleQuote: config.singleQuote,
  trailingComma: config.trailingComma,
});

export const upgradeAndValidate = (config: Partial<Config>) =>
  validateConfig(upgradeConfig(config as any));
