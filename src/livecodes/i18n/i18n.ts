/* eslint-disable import/no-internal-modules */
/* eslint-disable import/no-named-as-default-member */
import i18next from 'i18next';
import backend from 'i18next-http-backend';
import { predefinedValues } from '../utils/utils';
import { pathLoader } from './locale-paths';
import type { I18nInterpolationType, I18nKeyType, I18nValueType } from './models';
import { abstractifyHTML, unabstractifyHTML } from './utils';

export const init = async (lng: string | undefined, baseUrl: string) => {
  await i18next.use(backend).init({
    lng,
    returnEmptyString: false,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    backend: {
      loadPath: pathLoader(baseUrl),
    },
  });

  return {
    translate,
    translateString,
    translateKey: i18next.t.bind(i18next),
    getLanguage: () => i18next.language,
    getLanguageDirection: i18next.dir.bind(i18next),
    changeLanguage: i18next.changeLanguage.bind(i18next),
    loadNamespaces: i18next.loadNamespaces.bind(i18next),
  };
};

/**
 * HTMLElement-level i18n helper function.
 *
 * @param container The container element to search for i18n elements.
 */
const translate = (container: HTMLElement) => {
  if (!container) return;

  container.querySelectorAll<HTMLElement>('[data-i18n]').forEach((el) => {
    const key = el.dataset.i18n;
    if (!key) return;

    const interpolation = JSON.parse(el.dataset.i18nInterpolation || '{}');
    const fullInterpolation = {
      PROP: '',
      ...predefinedValues,
      ...interpolation,
    };

    const translateProp = (prop: string, lookupKey: string) => {
      fullInterpolation.PROP = prop;
      if (prop.startsWith('data-')) {
        prop = prop.slice(5);
        el.dataset[prop] = i18next.t(lookupKey, {
          defaultValue: el.dataset[prop]!,
          ...fullInterpolation,
        }) as string;
      } else {
        const translation = i18next.t(lookupKey, {
          defaultValue: (el as any)[prop],
          ...fullInterpolation,
        }) as string;
        if (prop === 'innerHTML' && el.innerHTML !== translation) {
          const { elements } = abstractifyHTML(el.innerHTML);
          el.innerHTML = unabstractifyHTML(translation, elements, interpolation);
        } else {
          (el as any)[prop] = translation;
        }
      }
    };

    const props = (el.dataset.i18nProp || 'textContent').split(' ');

    if (props.length === 1) {
      translateProp(props[0], key);
    } else {
      props.forEach((prop) => {
        translateProp(prop, `${key}.${prop}`);
      });
    }
  });
};

/**
 * String-level i18n helper function.
 * @param key The key of the translation.
 * @param value The default value to translate.
 * @param args The interpolation object.
 * @returns The translated string.
 */
const translateString = <Key extends I18nKeyType, Value extends string>(
  key: Key,
  value: I18nValueType<Key, Value>,
  ...args: I18nInterpolationType<Value>
) => {
  if (!i18next) return value as string;

  const rawInterpolation = args[0];
  const { isHTML, ...interpolation } = rawInterpolation ?? {};

  const translation = i18next.t(key, {
    ...interpolation,
    ...predefinedValues,
    defaultValue: value as string,
  }) as string;

  if (!interpolation || !isHTML) {
    return translation;
  } else {
    const { elements } = abstractifyHTML(value as string);
    return unabstractifyHTML(translation, elements, interpolation);
  }
};
