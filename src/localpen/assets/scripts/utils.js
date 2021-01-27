(function interceptConsole() {
  function isElement(o) {
    return typeof HTMLElement === 'object'
      ? o instanceof HTMLElement
      : o &&
          typeof o === 'object' &&
          o !== null &&
          o.nodeType === 1 &&
          typeof o.nodeName === 'string';
  }
  function isNode(o) {
    return typeof Node === 'object'
      ? o instanceof Node
      : o &&
          typeof o === 'object' &&
          typeof o.nodeType === 'number' &&
          typeof o.nodeName === 'string';
  }
  function isDocument(o) {
    return Object.prototype.toString.call(o) === '[object HTMLDocument]';
  }
  function isWindow(o) {
    return Object.prototype.toString.call(o) === '[object Window]';
  }
  function getTypes(args) {
    return args.map((arg) => {
      return isWindow(arg)
        ? { type: 'window', content: arg.toString() }
        : isDocument(arg)
        ? { type: 'document', content: arg.documentElement.outerHTML }
        : isElement(arg)
        ? { type: 'element', content: arg.outerHTML }
        : isNode(arg)
        ? { type: 'node', content: arg.textContent }
        : typeof arg === 'function'
        ? { type: 'function', content: arg.toString() }
        : Array.isArray(arg)
        ? { type: 'array', content: arg.map((x) => getTypes([x])[0].content) }
        : typeof arg === 'object'
        ? {
            type: 'object',
            content: Object.keys(arg).reduce(
              (acc, curr) => ({ ...acc, [curr]: getTypes([arg[curr]])[0].content }),
              {},
            ),
          }
        : { type: 'other', content: arg };
    });
  }
  window.console = new Proxy(console, {
    get(target, method, receiver) {
      return function (...args) {
        if (!(method in target)) {
          throw new TypeError('console.' + method + ' is not a function');
        }
        target[method](...args);
        parent.postMessage({ type: 'console', method, args: getTypes(args) }, '*');
      };
    },
  });
  window.addEventListener('error', (error) => {
    parent.postMessage({ type: 'console', method: 'error', args: getTypes([error.message]) }, '*');
  });
})();
