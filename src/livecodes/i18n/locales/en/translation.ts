import { type I18nTranslationTemplate } from '../models';

// This is used as a template for other translations.
// Other translations should be typed like this:
// const translation: I18nTranslation = { /* translation here */ };
const translation = {
  appVersion: 'App version: {{APP_VERSION}}',
  livecodesAboutPara1: '<1><0>LiveCodes</0></1> is an <2>open-source</2>, <3>feature-rich</3>, <4>client-side</4> code playground. Currently, <6>80+ languages/<5></5>frameworks</6> are supported. It can be used as a standalone app or can be <7>embedded</7> in any web page. There are many ways to <8>prefill playgrounds</8> with code.',
  welcome: 'Welcome',
} as const satisfies I18nTranslationTemplate;

export default translation;
