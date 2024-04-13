/* eslint-disable import/no-internal-modules */
import type translation from './en/translation';
import type LangInfoTranslation from './en/language-info';

// Report error when no property is provided
type RequireAtLeastOne<T> = {
  [K in keyof T]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<keyof T, K>>>;
}[keyof T];

type I18nAttributes = RequireAtLeastOne<{
  textContent?: string;
  innerHTML?: string;
  title?: string;
  'data-hint'?: string;
}>;

export interface I18nTranslationTemplate {
  [key: string]: I18nAttributes | string;
}

export type I18nTranslation = RequireAtLeastOne<
  {
    [key in keyof typeof translation]: (typeof translation)[key] extends I18nAttributes
    ? I18nAttributes
    : string;
  }
>;

export type I18nLangInfoTranslation = RequireAtLeastOne<
  {
    [key in keyof typeof LangInfoTranslation]: (typeof LangInfoTranslation)[key] extends I18nAttributes
    ? I18nAttributes
    : string;
  }
>;
