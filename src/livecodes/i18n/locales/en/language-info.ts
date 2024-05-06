import { type I18nTranslationTemplate } from '../models';

// This is used as a template for other translations.
// Other translations should be typed like this:
// const languageInfo: I18nLangInfoTranslation = { /* translation here */ };

// Since we allow nested objects, it is important to distinguish I18nTranslationTemplate from I18nAttributes.
// In view of this, properties declared in I18nAttributes (and those attributes might be used in future) shall not be used as a nested key.

const languageInfo = {
  language: {
    artTemplate: {
      desc: 'High performance JavaScript templating engine.',
    },
  },
} as const satisfies I18nTranslationTemplate;

export default languageInfo;
