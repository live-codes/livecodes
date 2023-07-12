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

function consoleArgs(args: any[]): Array<{ type: string; content: any }> {
  return args.map((arg) => {
    switch (typeOf(arg)) {
      case 'window':
      case 'function':
      case 'date':
      case 'symbol':
        return { type: typeOf(arg), content: arg.toString() };
      case 'document':
        return { type: typeOf(arg), content: arg.documentElement.outerHTML };
      case 'element':
        return { type: typeOf(arg), content: arg.outerHTML };
      case 'node':
        return { type: typeOf(arg), content: arg.textContent };
      case 'array':
        return { type: typeOf(arg), content: arg.map((x: unknown) => consoleArgs([x])[0].content) };
      case 'object':
        return {
          type: typeOf(arg),
          content: Object.keys(arg).reduce(
            (acc, key) => ({ ...acc, [key]: consoleArgs([arg[key]])[0].content }),
            {},
          ),
        };
      case 'error':
        return {
          type: typeOf(arg),
          content: arg.constructor.name + ': ' + arg.message,
        };
    }
    try {
      return { type: 'other', content: structuredClone(arg) };
    } catch {
      return { type: 'other', content: String(arg) };
    }
  });
}

export const proxyConsole = () => {
  window.console = new Proxy(console, {
    get(target, method) {
      return function (...args: any[]) {
        if (!(method in target)) {
          const msg = `Uncaught TypeError: console.${String(method)} is not a function`;
          target.error(msg);
          parent.postMessage({ type: 'console', method: 'error', args: consoleArgs([msg]) }, '*');
          return;
        }
        (target[method as keyof typeof console] as any)(...args);
        parent.postMessage({ type: 'console', method, args: consoleArgs(args) }, '*');
      };
    },
  });

  window.addEventListener('error', (error) => {
    parent.postMessage(
      {
        type: 'console',
        method: 'error',
        args: consoleArgs([error.message]),
      },
      '*',
    );
  });
};

export const handleEval = () => {
  window.addEventListener('message', (event) => {
    if (event.data.console) {
      const evalCode = () => {
        try {
          return {
            type: 'console',
            method: 'output',
            // eslint-disable-next-line no-eval
            args: consoleArgs([window.eval(event.data.console)]),
          };
        } catch (error) {
          return { type: 'console', method: 'error', args: consoleArgs([error]) };
        }
      };
      parent.postMessage(evalCode(), '*');
    }
  });
};

export const handleResize = () => {
  window.addEventListener('resize', () => {
    parent.postMessage(
      {
        type: 'resize',
        sizes: {
          width: window.innerWidth,
          height: window.innerHeight,
        },
      },
      '*',
    );
  });
};

export const handleScrollPosition = () => {
  window.addEventListener('scroll', () => {
    parent.postMessage(
      {
        type: 'scroll',
        position: {
          x: window.scrollX,
          y: window.scrollY,
        },
      },
      '*',
    );
  });
  const prefix = '#livecodes-scroll-position:';
  if (location.hash.startsWith(prefix)) {
    const [x, y] = location.hash.replace(prefix, '').split(',').map(Number);
    window.addEventListener('DOMContentLoaded', () => {
      window.scrollTo({ top: y, left: x });
    });
  }
};
