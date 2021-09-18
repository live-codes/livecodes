import { Compiler, Language, customSettings, Config, Processors } from '../models';
import { languages } from './languages';
import { processors } from './processors';

export const getLanguageByAlias = (alias?: string): Language | undefined => {
  if (!alias) return;
  const aliasLowerCase = alias?.toLowerCase();
  return languages.find(
    (language) =>
      language.name === aliasLowerCase ||
      language.title.toLowerCase() === aliasLowerCase ||
      language.extensions.map((ext) => ext.toLowerCase()).includes(aliasLowerCase),
  )?.name;
};

export const getLanguageEditorId = (alias: string) =>
  languages.find((lang) => lang.name === getLanguageByAlias(alias))?.editor;

export const getLanguageExtension = (alias: string) =>
  languages.find((lang) => lang.name === getLanguageByAlias(alias))?.extensions[0];

export const getLanguageSpecs = (alias: string) =>
  languages.find((lang) => lang.name === getLanguageByAlias(alias));

export const getLanguageCompiler = (alias: string): Compiler | undefined => {
  const languageSpecs = getLanguageSpecs(alias);
  let compiler = languageSpecs?.compiler;
  if (typeof compiler === 'string') {
    compiler = getLanguageCompiler(compiler);
  }
  return compiler;
};

export const mapLanguage = (language: Language): Language =>
  getLanguageSpecs(language)?.editorLanguage || language;

export const languageIsEnabled = (language: Language, config: Config) => {
  const lang = getLanguageByAlias(language);
  if (!lang) return false;
  if (!config.languages) return true;
  return config.languages?.map(getLanguageByAlias).filter(Boolean).includes(lang);
};

export const processorIsEnabled = (processorName: Processors['name'], config: Config) => {
  if (!processors.map((p) => p.name).includes(processorName)) return false;
  if (processorName !== 'postcss') return true;
  if (!config.languages) return true;
  return config.languages.includes(processorName);
};

export const processorIsActivated = (processorName: Processors['name'], config: Config) =>
  (config.processors as any)[processorName] === true ||
  (processorName === 'postcss' && Object.values(config.processors.postcss).includes(true));

/**
 * returns a string with names of enabled processors/postcss plugins
 * for the supplied language (separated by hyphens)
 */
export const getEnabledProcessors = (language: Language, config: Config) => {
  let processorsString = '';
  const editorId = getLanguageEditorId(language);
  if (!editorId) return processorsString;

  Object.keys(config.processors).forEach((processor) => {
    if (processors.filter((p) => p.editors?.includes(editorId)).length === 0) return;
    if ((config.processors as any)[processor] === true) {
      processorsString += processor + '-';
    }
  });
  Object.keys(config.processors.postcss).forEach((plugin) => {
    if ((config.processors.postcss as any)[plugin] === true) {
      processorsString += plugin + '-';
    }
  });
  return processorsString;
};

export const escapeCode = (code: string) => code.replace(/\\/g, '\\\\').replace(/`/g, '\\`');

export const getLanguageCustomSettings = (language: Language, config: Config) => ({
  ...(config.customSettings as any)[language],
});

export const getCustomSettings = (language: Language, config: Config): customSettings => {
  const settings: customSettings = {
    ...getLanguageCustomSettings(language, config),
  };

  if (getLanguageEditorId(language) === 'markup') {
    settings.template = config.customSettings.template;
  }

  const processor = 'postcss';
  if (
    processorIsEnabled(processor, config) &&
    processorIsActivated(processor, config) &&
    getLanguageEditorId(language) === 'style'
  ) {
    for (const plugin of Object.keys(config.processors.postcss)) {
      if (
        (config.processors?.postcss as any)?.[plugin] === true &&
        (config.customSettings as any)[plugin]
      ) {
        (settings as any)[plugin] = (config.customSettings as any)[plugin];
      }
    }
  }

  return settings;
};
