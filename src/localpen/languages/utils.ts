import { Compiler, EditorId, Language, Pen } from '../models';
import { languages } from './languages';

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
    : language === 'tsx'
    ? 'typescript'
    : ['vue', 'vue2', 'svelte'].includes(language)
    ? 'html'
    : language;

export const languageIsEnabled = (language: Language, config: Pen) => {
  const lang = getLanguageByAlias(language);
  if (!lang) return false;
  if (!config.languages) return true;
  return config.languages?.map(getLanguageByAlias).filter(Boolean).includes(lang);
};
