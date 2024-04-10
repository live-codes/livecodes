/* eslint-disable import/no-named-as-default-member */
import i18n from 'i18next';
import backend from 'i18next-http-backend';

export const init = (lng: string | undefined) => {
  i18n
    .use(backend)
    .init({
      lng,
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
};

export default i18n;
