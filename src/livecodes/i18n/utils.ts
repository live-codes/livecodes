// eslint-disable-next-line import/no-internal-modules
import { predefinedValues } from '../utils/utils';

export const translate = (
  container: HTMLElement,
  i18n: typeof import('./i18n').default | undefined,
) => {
  if (!container || !i18n) return;

  container.querySelectorAll<HTMLElement>('[data-i18n]').forEach((el) => {
    const key = el.dataset.i18n;
    if (!key) return;

    const translateProp = (prop: string, lookupKey: string) => {
      const interpolation = {
        PROP: prop,
        ...predefinedValues
      };
      if (prop.startsWith('data-')) {
        prop = prop.slice(5);
        el.dataset[prop] = i18n.t(lookupKey, el.dataset[prop]!, interpolation);
      } else {
        const translation = i18n.t(lookupKey, (el as any)[prop], interpolation);
        (el as any)[prop] = translation;
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
