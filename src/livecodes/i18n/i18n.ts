/* eslint-disable import/no-named-as-default-member */
import i18n from 'i18next';
import backend from 'i18next-http-backend';
import { abstractifyHTML } from './utils';

export const init = (lng: string | undefined, baseUrl: string) => {
  i18n.use(backend).init({
    lng,
    debug: true,  // Remove this line in production
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    backend: {
      loadPath: baseUrl + 'translation-{{lng}}-{{ns}}.json',
    },

    // To log innerHTML translations in console
    // Remove following lines in production
    saveMissing: true,
    missingKeyHandler: (lngs, namespace, key, fallbackValue, updateMissing, options) => {
      if (options.PROP === 'innerHTML') {
        const { html, elements } = abstractifyHTML(fallbackValue);

        // eslint-disable-next-line no-console
        console.info(`Translation template for key: ${key}\n\nHTML:\n${html}\n\nElements:\n`, elements);
      }
    },
    missingKeyNoValueFallbackToKey: true,
  });
};

export default i18n;
