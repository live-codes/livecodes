/* eslint-disable import/no-named-as-default-member */
import i18n from 'i18next';
import detector from 'i18next-browser-languagedetector';
import backend from 'i18next-http-backend';

i18n
  .use(detector)
  .use(backend)
  .init({
    debug: true,
    fallbackLng: 'en',
    keySeparator: false,
    interpolation: {
      escapeValue: true,
    },
    backend: {
      loadPath: '/livecodes/locales/{{lng}}/{{ns}}.json',
    },
  });

export default i18n;
