export const debounce = (fn: (...x: any[]) => any, delay: number) => {
  let timeout: any;

  return (...args: unknown[]) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => fn.apply(null, args), delay);
  };
};

export const decodeHTML = (html: string) => {
  const txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value;
};

export const encodeHTML = (html: string) =>
  html
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/'/g, '&#39;')
    .replace(/"/g, '&#34;');

// eslint-disable-next-line @typescript-eslint/ban-types
export const pipe = (...fns: Function[]) => fns.reduce((f, g) => (...args: any) => g(f(...args)));

// replace non-alphanumeric with underscore
export const safeName = (name: string) => name.replace(/[\W]+/g, '_');

// modified from https://github.com/alexindigo/precise-typeof/blob/master/index.js
export const typeOf = (obj: any) => {
  function isElement(o: any) {
    return typeof HTMLElement === 'object'
      ? o instanceof HTMLElement
      : o &&
          typeof o === 'object' &&
          o !== null &&
          o.nodeType === 1 &&
          typeof o.nodeName === 'string';
  }
  function isNode(o: any) {
    return typeof Node === 'object'
      ? o instanceof Node
      : o &&
          typeof o === 'object' &&
          typeof o.nodeType === 'number' &&
          typeof o.nodeName === 'string';
  }
  function isDocument(o: any) {
    return Object.prototype.toString.call(o) === '[object HTMLDocument]';
  }
  function isWindow(o: any) {
    return Object.prototype.toString.call(o) === '[object Window]';
  }

  const stamp: string = Object.prototype.toString.call(obj);

  if (obj === undefined) return 'undefined';
  if (obj === null) return 'null';

  if (isWindow(obj)) return 'window';
  if (isDocument(obj)) return 'document';
  if (isElement(obj)) return 'element';
  if (isNode(obj)) return 'node';

  if (
    obj.constructor &&
    typeof obj.constructor.isBuffer === 'function' &&
    obj.constructor.isBuffer(obj)
  ) {
    return 'buffer';
  }

  if (typeof window === 'object' && obj === window) return 'window';
  if (typeof global === 'object' && obj === global) return 'global';

  if (typeof obj === 'number' && isNaN(obj)) return 'nan';
  if (typeof obj === 'object' && stamp === '[object Number]' && isNaN(obj)) return 'nan';

  if (typeof obj === 'object' && stamp.substr(-6) === 'Event]') return 'event';
  if (stamp.substr(0, 12) === '[object HTML') return 'element';
  if (stamp.substr(0, 12) === '[object Node') return 'node';

  // last resort
  const type = stamp.match(/\[object\s*([^\]]+)\]/);
  if (type) return type[1].toLowerCase();

  return 'object';
};
