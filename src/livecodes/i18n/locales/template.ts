// Report error when no property is provided
type RequireAtLeastOne<T> = {
  [K in keyof T]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<keyof T, K>>>
}[keyof T]

interface _I18nAttributes {
  textContent?: string;
  title?: string
}

export type I18nAttributes = RequireAtLeastOne<_I18nAttributes>;

export interface I18nTranslation {
  [key: string]: I18nAttributes;
}
