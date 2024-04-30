import { type I18nTranslationTemplate } from '../models';

const languageInfo = {
  language: {
    artTemplate: {
      desc: 'High performance JavaScript templating engine.',
    },
  },
} as const satisfies I18nTranslationTemplate;

export default languageInfo;
