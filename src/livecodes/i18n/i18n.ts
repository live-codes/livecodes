/* eslint-disable import/no-named-as-default-member */
import i18n from 'i18next';
import backend from 'i18next-http-backend';

export const init = (lng: string | undefined, baseUrl: string) => {
  i18n.use(backend).init({
    lng,
    debug: true,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    backend: {
      loadPath: baseUrl + 'translation-{{lng}}-{{ns}}.json',
    },
  });
};

export default i18n;
