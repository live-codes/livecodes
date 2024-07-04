/* eslint-disable import/no-internal-modules */
import type { RequireAtLeastOne, UnAsConst } from '../utils';
import type Translation from './en/translation';
import type LangInfoTranslation from './en/language-info';

/**
 * Add new translatable attributes here.
 *
 * To add new custom data attributes for HTML intellisense, see `script/vscode-intellisense.js`.
 */
type I18nAttributes = RequireAtLeastOne<{
  textContent?: string;
  innerHTML?: string;
  title?: string;
  'data-hint'?: string;
  placeholder?: string;
}>;

/**
 * Basic template type for i18n object.
 *
 * Only use in `en` language with `as const satisfies`.
 */
export interface I18nTranslationTemplate {
  [key: string]: ValidI18nTypes | string;
}

type ValidI18nTypes = I18nAttributes | I18nTranslationTemplate;

/**
 * Type for all i18n object of namespace `translation` other than `en`.
 */
export type I18nTranslation = UnAsConst<typeof Translation, ValidI18nTypes, string>;

/**
 * Type for all i18n object of namespace `lang-info` other than `en`.
 */
export type I18nLangInfoTranslation = UnAsConst<typeof LangInfoTranslation, ValidI18nTypes, string>;
