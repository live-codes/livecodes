import { type I18nTranslationTemplate } from '../models';

// This is used as a template for other translations.
// Other translations should be typed like this:
// const translation: I18nTranslation = { /* translation here */ };
const translation = {
  welcome: 'Welcome',
} as const satisfies I18nTranslationTemplate;

export default translation;
