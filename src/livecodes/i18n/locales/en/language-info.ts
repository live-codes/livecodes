import { type I18nTranslationTemplate } from '../models';

// This is used as a template for other translations.
// Other translations should be typed like this:
// const languageInfo: I18nLangInfoTranslation = { /* translation here */ };
const languageInfo = {
  artTemplateDesc: {
    textContent: 'High performance JavaScript templating engine.',
  },
} as const satisfies I18nTranslationTemplate;

export default languageInfo;
