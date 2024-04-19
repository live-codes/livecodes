/* eslint-disable import/no-internal-modules */
import type Translation from './en/translation';
import type LangInfoTranslation from './en/language-info';

// Report error when no property is provided
type RequireAtLeastOne<T> = {
  [K in keyof T]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<keyof T, K>>>;
}[keyof T];

// Ensure two objects are isomorphic while making all non-object properties string
type UnAsConst<T> = RequireAtLeastOne<{
  readonly [K in keyof T]: T[K] extends I18nAttributes | I18nTranslationTemplate
    ? RequireAtLeastOne<UnAsConst<T[K]>>
    : string;
}>;

type I18nAttributes = RequireAtLeastOne<{
  textContent?: string;
  innerHTML?: string;
  title?: string;
  'data-hint'?: string;
}>;

export interface I18nTranslationTemplate {
  [key: string]: I18nAttributes | I18nTranslationTemplate | string;
}

export type I18nTranslation = UnAsConst<typeof Translation>;
export type I18nLangInfoTranslation = UnAsConst<typeof LangInfoTranslation>;
