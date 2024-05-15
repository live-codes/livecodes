import type { CustomTypeOptions } from 'i18next';

// eslint-disable-next-line import/no-internal-modules
import { predefinedValues } from '../utils/utils';

// eslint-disable-next-line import/no-internal-modules
import { customEvents } from '../events/custom-events';

import type {
  Increment,
  Stack,
  Push,
  Pop,
  Top,
  EmptyObject,
  SelfNestedObject,
  // eslint-disable-next-line import/no-internal-modules
} from './types/utils';

interface TagElement {
  name: string;
  attributes?: Record<string, string>;
}

// Only used in ./i18n.ts, could remove `export` once it's no longer used
/**
 * Abstractify HTML string. Convert all tags to a format like `<0>`, `<1>`, etc.
 * @param html The HTML string to abstractify.
 * @returns The abstractified HTML string, with a list of objects of their tag names and attributes.
 */
export const abstractifyHTML = (html: string) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  const elements: TagElement[] = [];
  let counter = 0;

  const replaceElement = (node: HTMLElement) => {
    if (node.nodeType !== Node.ELEMENT_NODE) return;

    node.childNodes.forEach((child) => {
      replaceElement(child as HTMLElement);
    });

    const name = node.tagName.toLowerCase();
    if (name === 'body') return;

    const attributes =
      node.attributes.length === 0
        ? undefined
        : Array.from(node.attributes).reduce(
            (acc, attr) => {
              acc[attr.name] = attr.value;
              return acc;
            },
            {} as Record<string, string>,
          );

    elements.push({ name, attributes });

    const newElement = doc.createElement(`tag-${counter}`);
    while (node.firstChild) {
      newElement.appendChild(node.firstChild);
    }

    // node.parentNode is always defined because we're traversing from the body
    node.parentNode!.replaceChild(newElement, node);

    counter++;
  };

  replaceElement(doc.body);
  return {
    html: doc.body.innerHTML.replace(/tag-/g, '').replace(/\s+/g, ' ').trim(),
    elements,
  };
};

/**
 * Reverse the abstractified HTML string back to the original HTML string.
 *
 * @param html The abstractified HTML string.
 * @param elements The list of objects of their tag names and attributes.
 * @returns The original HTML string.
 */
const unabstractifyHTML = (html: string, elements: TagElement[]) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(
    html.replace(/<(\/?)([0-9]+)([^>]*)>/g, '<$1tag-$2 $3>'),
    'text/html',
  );

  elements.forEach((element, index) => {
    const oldElement = doc.body.querySelector(`tag-${index}`)!;
    const newElement = doc.createElement(element.name);

    // Copy previously saved attributes to newElement
    if (element.attributes) {
      Object.entries(element.attributes).forEach(([key, value]) => {
        newElement.setAttribute(key, value);
      });
    }

    // Override attributes base on those from abstract tags (oldElement)
    if (oldElement.attributes) {
      Array.from(oldElement.attributes).forEach((attr) => {
        newElement.setAttribute(attr.name, attr.value);
      });
    }

    // Copy the children from oldElement to newElement
    while (oldElement.firstChild) {
      newElement.appendChild(oldElement.firstChild);
    }

    oldElement.replaceWith(newElement);
  });

  return doc.body.innerHTML;
};

/**
 * HTMLElement-level i18n helper function.
 *
 * @param container The container element to search for i18n elements.
 * @param i18n I18n instance.
 */
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
        ...predefinedValues,
      };
      if (prop.startsWith('data-')) {
        prop = prop.slice(5);
        el.dataset[prop] = i18n.t(lookupKey, {
          defaultValue: el.dataset[prop]!,
          ...interpolation,
        }) as string;
      } else {
        const translation = i18n.t(lookupKey, {
          defaultValue: (el as any)[prop],
          ...interpolation,
        }) as string;
        if (prop === 'innerHTML' && el.innerHTML !== translation) {
          const { elements } = abstractifyHTML(el.innerHTML);
          el.innerHTML = unabstractifyHTML(translation, elements);
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
 * Get the base object of the given namespace.
 *
 * @param Base The overall i18next resources object.
 * @param Key The key to get the base object.
 */
type GetNamespaceBase<
  Base extends CustomTypeOptions['resources'],
  Key extends string,
> = Key extends `${infer Namespace}:${infer _Rest}`
  ? Namespace extends keyof Base
    ? Base[Namespace]
    : never
  : Base[CustomTypeOptions['defaultNS']];

/**
 * Recursively get the translation of the given key.
 *
 * @param Base The base object of the namespace. Use `GetNamespaceBase` to get it.
 * @param Key The key to get the translation.
 */
type GetTranslation<
  Base extends SelfNestedObject<string>,
  Key extends string,
> = Key extends `${infer Start}.${infer Rest}`
  ? Start extends keyof Base
    ? Rest extends string
      ? Base[Start] extends SelfNestedObject<string>
        ? GetTranslation<Base[Start], Rest>
        : never
      : never
    : never
  : Key extends keyof Base
    ? Base[Key] extends string
      ? Base[Key]
      : never
    : never;

/**
 * Infer all flattened keys of the given object.
 *
 * The first level keys are considered as namespaces and will be separated by colon, while the rest
 * will be separated by dot.
 *
 * @param Base The object to infer keys from.
 * @param isNs Whether it is a namespace.
 */
type InferKeys<Base, isNs extends boolean = false, KeyStr extends string = ''> = {
  [K in keyof Base]: Base[K] extends object
    ? KeyStr extends '' // Whether it is of first level (namespace)
      ? InferKeys<Base[K], true, `${K & string}`>
      : KeyStr extends CustomTypeOptions['defaultNS'] // Default namespace and colon can be omited
        ?
            | InferKeys<Base[K], false, `${KeyStr}${isNs extends true ? ':' : '.'}${K & string}`>
            | InferKeys<Base[K], false, `${K & string}`>
        : InferKeys<Base[K], false, `${KeyStr}${isNs extends true ? ':' : '.'}${K & string}`>
    : `${KeyStr}${KeyStr extends '' ? '' : '.'}${K & string}`;
}[keyof Base];

/**
 * Extract all interpolations from the given string.
 *
 * @param Value The string to extract interpolations from.
 */
type ExtractInterpolations<Value extends string> =
  Value extends `${infer _First}{{${infer Interpolation}}}${infer Rest}`
    ? Interpolation | ExtractInterpolations<Rest>
    : never;

/**
 * Other options that could be passed to `translateString` in addition to interpolations.
 */
interface I18nOptions {
  isHTML?: boolean;
}

/**
 * Type system's version of `abstractifyHTML`.
 *
 * @param T The HTML string to abstractify.
 */
type AbstractifyHTML<
  T extends string,
  Index extends number = 0,
  I extends Stack<number> = [],
  S extends Stack<string> = [],
> = T extends `${infer Pre}<${infer Tag}>${infer Post}`
  ? Tag extends `/${Top<S>}` // End tag
    ? `${Pre}</${Top<I>}>${AbstractifyHTML<Post, Index, Pop<I>, Pop<S>>}` // Back to previous tag
    : Tag extends `${infer _} /` // Self-closing tag
      ? `${Pre}<${Index}></${Index}>${AbstractifyHTML<Post, Increment<Index>, I, S>}`
      : `${Pre}<${Index}>${AbstractifyHTML<
          Post,
          Increment<Index>,
          Push<I, Index>,
          Push<S, Tag extends `${infer RealTag} ${infer _Rest}` ? RealTag : Tag> // Get the real tag name
        >}`
  : T; // No more tags

type I18nRawInterpolationType<Value extends string> = {
  [K in ExtractInterpolations<Value>]?: string | number;
};

/**
 * Type for the interpolation object passed to `translateString`.
 *
 * @param T The value that contains interpolations.
 */
export type I18nInterpolationType<T extends string> =
  I18nRawInterpolationType<T> extends EmptyObject
    ? [I18nOptions?]
    : [I18nRawInterpolationType<T> & I18nOptions];

/**
 * Type for the key passed to `translateString`.
 */
export type I18nKeyType = InferKeys<CustomTypeOptions['resources'], true>;

type I18nRawValueType<Key extends I18nKeyType> = GetTranslation<
  GetNamespaceBase<CustomTypeOptions['resources'], Key>,
  Key
>;

/**
 * Type for the default value passed to `translateString`.
 *
 * @param Key The key of the translation.
 * @param Value The default value to translate. Should be inferred.
 */
export type I18nValueType<Key extends I18nKeyType, Value extends string> =
  Value extends I18nRawValueType<Key>
    ? Value
    : AbstractifyHTML<Value> extends I18nRawValueType<Key>
      ? Value
      : never;

/**
 * String-level i18n helper function.
 * @param i18n I18n instance.
 * @param key The key of the translation.
 * @param value The default value to translate.
 * @param args The interpolation object.
 * @returns The translated string.
 */
export const translateString = <Key extends I18nKeyType, Value extends string>(
  i18n: typeof import('./i18n').default | undefined,
  key: Key,
  value: I18nValueType<Key, Value>,
  ...args: I18nInterpolationType<Value>
) => {
  if (!i18n) return value as string;

  const interpolation = args[0];
  const translation = i18n.t(key, {
    ...interpolation,
    ...predefinedValues,
    defaultValue: value as string,
  }) as string;

  if (!interpolation || !interpolation.isHTML) {
    return translation;
  } else {
    const { elements } = abstractifyHTML(value as string);
    return unabstractifyHTML(translation, elements);
  }
};

/**
 * Dispatch a translation event to the given element.
 * @param elem The element to dispatch the event to.
 */
export const dispatchTranslationEvent = (elem: HTMLElement) => {
  elem.dispatchEvent(new CustomEvent(customEvents.i18n, { bubbles: true }));
};
