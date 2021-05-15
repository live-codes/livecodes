import { Compiler, EditorId, Language, Pen, Processors } from '../models';
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

export const getLanguageEditorId = (alias: Language): EditorId | undefined =>
  languages.find((lang) => lang.name === getLanguageByAlias(alias))?.editor;

export const getLanguageExtension = (alias: string): Language | undefined =>
  languages.find((lang) => lang.name === getLanguageByAlias(alias))?.extensions[0];

export const getLanguageSpecs = (alias: string) =>
  languages.find((lang) => lang.name === getLanguageByAlias(alias));

export const getLanguageCompiler = (alias: string): Compiler | undefined => {
  const LanguageSpecs = getLanguageSpecs(alias);
  let compiler = LanguageSpecs?.compiler;
  if (typeof compiler === 'string') {
    compiler = getLanguageCompiler(compiler);
  }
  return compiler;
};

export const mapLanguage = (language: Language): Language =>
  ['babel', 'jsx'].includes(language)
    ? 'javascript'
    : ['tsx', 'stencil', 'assemblyscript'].includes(language)
    ? 'typescript'
    : ['vue', 'vue2', 'svelte'].includes(language)
    ? 'html'
    : language === 'mdx'
    ? 'markdown'
    : language;

export const languageIsEnabled = (language: Language, config: Pen) => {
  const lang = getLanguageByAlias(language);
  if (!lang) return false;
  if (!config.languages) return true;
  return config.languages?.map(getLanguageByAlias).filter(Boolean).includes(lang);
};

export const processorIsEnabled = (processor: Processors, config: Pen) =>
  (config.processors as any)[processor.name] === true ||
  (processor.name === 'postcss' && Object.values(config.processors.postcss).includes(true));

/**
 * returns a string with names of enabled processors/postcss plugins
 * for the supplied language (separated by hyphens)
 */
export const getEnabledProcessors = (language: Language, config: Pen) => {
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
