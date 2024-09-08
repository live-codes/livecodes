/* eslint-disable import/no-named-as-default-member */
import i18n from 'i18next';
import backend from 'i18next-http-backend';
import { pathLoader } from './locale-paths';

export const init = (lng: string | undefined, baseUrl: string) => {
  i18n.use(backend).init({
    lng,
    debug: true, // Remove this line in production
    returnEmptyString: false,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    backend: {
      loadPath: pathLoader(baseUrl),
    },
  });
};

export default i18n;
