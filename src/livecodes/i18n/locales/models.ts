import type { RequireAtLeastOne } from '../models';
import type LangInfoTranslation from './en/language-info';
import type Translation from './en/translation';

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
  [key: string]: I18nAttributes | string | I18nTranslationTemplate;
}

/**
 * Maps a nested object structure to a structure where all leaf nodes are strings.
 * 
 * Use to keep the same structure as the `en` i18n object for other languages.
 */
export type I18nStructure<T> = {
    readonly [K in keyof T]: T[K] extends Record<string, any> ? I18nStructure<T[K]> : string;
};

/**
 * Type for all i18n object of namespace `translation` other than `en`.
 */
export type I18nTranslation = I18nStructure<typeof Translation>;

/**
 * Type for all i18n object of namespace `language-info` other than `en`.
 */
export type I18nLangInfoTranslation = I18nStructure<typeof LangInfoTranslation>;
