import type {
  AppConfig,
  Config,
  ContentConfig,
  EditorConfig,
  FormatterConfig,
  UserConfig,
} from '../models';
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
    head: config.head,
    htmlAttrs: config.htmlAttrs,
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

export const getAppConfig = (config: Config | AppConfig): AppConfig =>
  cloneObject({
    readonly: config.readonly,
    allowLangChange: config.allowLangChange,
    view: config.view,
    mode: config.mode,
    tools: config.tools,
    zoom: config.zoom,
  });

export const getUserConfig = (config: Config | UserConfig): UserConfig =>
  cloneObject({
    autoupdate: config.autoupdate,
    autosave: config.autosave,
    autotest: config.autotest,
    appLanguage: config.appLanguage,
    delay: config.delay,
    formatOnsave: config.formatOnsave,
    layout: config.layout,
    recoverUnsaved: config.recoverUnsaved,
    welcome: config.welcome,
    showSpacing: config.showSpacing,
    ...getEditorConfig(config),
    ...getFormatterConfig(config),
  });

export const getEditorConfig = (config: Config | UserConfig): EditorConfig =>
  cloneObject({
    editor: config.editor ?? ((config as Config).readonly === true ? 'codejar' : undefined),
    theme: config.theme,
    themeColor: config.themeColor,
    editorTheme: config.editorTheme,
    fontFamily: config.fontFamily,
    fontSize: config.fontSize,
    useTabs: config.useTabs,
    tabSize: config.tabSize,
    lineNumbers: config.lineNumbers,
    wordWrap: config.wordWrap,
    closeBrackets: config.closeBrackets,
    foldRegions: config.foldRegions,
    emmet: config.emmet,
    // enableAI: config.enableAI,
    editorMode: config.editorMode,
  });

export const getFormatterConfig = (config: Config | UserConfig): FormatterConfig =>
  cloneObject({
    useTabs: config.useTabs,
    tabSize: config.tabSize,
    semicolons: config.semicolons,
    singleQuote: config.singleQuote,
    trailingComma: config.trailingComma,
  });

export const upgradeAndValidate = (config: Partial<Config>) =>
  validateConfig(upgradeConfig(config as any));
