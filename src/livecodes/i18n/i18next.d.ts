import 'i18next';

// eslint-disable-next-line import/no-internal-modules
import type Translation from './locales/en/translation';

// eslint-disable-next-line import/no-internal-modules
import type LangInfoTranslation from './locales/en/language-info';

// This file is meant to ensure type-safety for `i18n.t`.
// When new namespaces are added, they should be added here in `resources` as well.

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'translation';
    resources: {
      translation: typeof Translation;
      'lang-info': typeof LangInfoTranslation;
    };
  }
}
