import { customEvents } from '../events';
import type { I18nInterpolationType, I18nKeyType, I18nValueType } from '../i18n';
import { predefinedValues } from './utils';

/**
 * Dispatch a translation event to the given element.
 * @param elem The element to dispatch the event to.
 */
const translateElement = (elem: HTMLElement) => {
  elem.dispatchEvent(new CustomEvent(customEvents.i18n, { bubbles: true }));
};

const translateStringMock = <Key extends I18nKeyType, Value extends string>(
  _key: Key,
  value: I18nValueType<Key, Value>,
  ...args: I18nInterpolationType<I18nValueType<Key, Value>>
) => {
  const rawInterpolation = args[0];
  const { isHTML, ...interpolation } = rawInterpolation ?? {};
  if (!interpolation) return value as string;
  let result: string = value as string;
  for (const [k, v] of Object.entries({ ...interpolation, ...predefinedValues })) {
    result = result.replaceAll(`{{${k}}}`, v as string);
  }
  return result;
};

export { translateElement, translateStringMock };
