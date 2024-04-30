// eslint-disable-next-line import/no-internal-modules
import { predefinedValues } from '../utils/utils';

// eslint-disable-next-line import/no-internal-modules
import { customEvents } from '../events/custom-events';

interface TagElement {
  name: string;
  attributes?: Record<string, string>;
}

// Only used in ./i18n.ts, could remove `export` once it's no longer used
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
        el.dataset[prop] = i18n.t(lookupKey, el.dataset[prop]!, interpolation) as string;
      } else {
        const translation = i18n.t(lookupKey, (el as any)[prop], interpolation) as string;
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

type StringProps<T> = {
  [K in keyof T]: T[K] extends string | null ? K : never;
}[keyof T];

type AdditionalDataAttributes = 'data-hint';

export const markElementForTranslation = <T extends HTMLElement>(
  elem: T,
  key: string,
  props?: Array<StringProps<T> | AdditionalDataAttributes>,
) => {
  elem.dataset.i18n = key;
  if (props) {
    elem.dataset.i18nProp = props.join(' ');
  }
};

export const dispatchTranslationEvent = (elem: HTMLElement) => {
  elem.dispatchEvent(new CustomEvent(customEvents.i18n, { bubbles: true }));
};
