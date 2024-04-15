import 'i18next';

// eslint-disable-next-line import/no-internal-modules
import type Translation from './locales/en/translation';

// eslint-disable-next-line import/no-internal-modules
import type LangInfoTranslation from './locales/en/language-info';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'translation';
    resources: {
      translation: typeof Translation;
      'lang-info': typeof LangInfoTranslation;
    };
  }
}
