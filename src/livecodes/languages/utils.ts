import type { Compiler, Config, CustomSettings, Language, Processor } from '../models';
import { getLanguageCustomSettings } from '../utils/utils';
import { highlightjsUrl } from '../vendors';

export const getLanguageByAlias = (alias: string = ''): Language | undefined => {
  if (!alias) return;
  const aliasLowerCase = alias?.toLowerCase();
  return window.deps.languages.find(
    (language) =>
      language.name === aliasLowerCase ||
      language.title.toLowerCase() === aliasLowerCase ||
      language.extensions.map((ext) => ext.toLowerCase()).includes(aliasLowerCase),
  )?.name;
};

export const getLanguageTitle = (language: Language) => {
  const languageSpecs = window.deps.languages.find((lang) => lang.name === language);
  return languageSpecs?.longTitle || languageSpecs?.title || language.toUpperCase();
};

export const getLanguageEditorId = (alias: string = '') =>
  window.deps.languages.find((lang) => lang.name === getLanguageByAlias(alias))?.editor;

export const getLanguageExtension = (alias: string = '') =>
  window.deps.languages.find((lang) => lang.name === getLanguageByAlias(alias))?.extensions[0];

export const getLanguageSpecs = (alias: string = '') =>
  window.deps.languages.find((lang) => lang.name === getLanguageByAlias(alias));

export const getLanguageCompiler = (alias: string = ''): Compiler | undefined => {
  const languageSpecs = getLanguageSpecs(alias);
  let compiler = languageSpecs?.compiler;
  if (typeof compiler === 'string') {
    compiler = getLanguageCompiler(compiler);
  }
  return compiler;
};

export const hasJsx = (alias: string = '') => {
  const languageSpecs = getLanguageSpecs(alias);
  const compilerOptions = languageSpecs?.editorSupport?.compilerOptions;
  if (!compilerOptions) return false;
  return Boolean(
    compilerOptions.jsx || compilerOptions.jsxImportSource || compilerOptions.jsxFactory,
  );
};

export const mapLanguage = (
  language: Language,
  editor?: Exclude<Config['editor'], 'auto' | undefined>,
): Language =>
  (editor ? getLanguageSpecs(language)?.editorSupport?.[editor]?.language : undefined) ||
  getLanguageSpecs(language)?.editorLanguage ||
  getLanguageByAlias(language) ||
  'html';

export const languageIsEnabled = (language: Language, config: Config) => {
  const lang = getLanguageByAlias(language);
  if (!lang) return false;
  if (!config.languages) return true;
  if (
    ['javascript', 'typescript'].includes(lang) &&
    ['javascript', 'typescript'].includes(mapLanguage(lang))
  ) {
    return true;
  }
  return config.languages?.map(getLanguageByAlias).filter(Boolean).includes(lang);
};

export const processorIsEnabled = (processor: Processor, config: Config) => {
  if (!window.deps.processors.map((p) => p.name).includes(processor)) return false;
  if (!config.languages) return true;
  return config.languages.includes(processor);
};

export const processorIsActivated = (processor: Processor, config: Config) =>
  config.processors.includes(processor);

/**
 * returns a string with names of enabled processors/postcss plugins
 * for the supplied language (separated by hyphens)
 */
export const getActivatedProcessors = (language: Language, config: Config) => {
  const editorId = getLanguageEditorId(language);
  if (!editorId) return '';
  return window.deps.processors
    .filter((p) => p.editor === editorId)
    .map((p) => p.name)
    .filter((p) => processorIsEnabled(p, config))
    .filter((p) => processorIsActivated(p, config))
    .join('-');
};

export const escapeCode = (code: string, slash = true) =>
  code
    .replace(/\\/g, slash ? '\\\\' : '\\')
    .replace(/`/g, '\\`')
    .replace(/<\/script>/g, '<\\/script>');

export const getCustomSettings = (
  language: Language | Processor,
  config: Config,
): CustomSettings => {
  const settings: CustomSettings = {
    ...getLanguageCustomSettings(language, config),
  };
  if (getLanguageEditorId(language) === 'markup') {
    settings.template = config.customSettings.template;
  }
  return settings;
};

export const detectLanguage = async (code: string, languages: Language[]) => {
  (window as any).HighlightJS =
    (window as any).HighlightJS || (await import(highlightjsUrl)).default;
  const result = (window as any).HighlightJS.highlightAuto(code, languages);
  return {
    language: result.language as Language,
    secondBest: result.secondBest.language as Language,
  };
};

export { getLanguageCustomSettings };
