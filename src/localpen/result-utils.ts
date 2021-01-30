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
function getString(args: any[]): Array<{ type: string; content: any }> {
  return args.map((arg) =>
    isWindow(arg)
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
      ? { type: 'array', content: arg.map((x) => getString([x])[0].content) }
      : typeof arg === 'object'
      ? {
          type: 'object',
          content: Object.keys(arg).reduce(
            (acc, curr) => ({ ...acc, [curr]: getString([arg[curr]])[0].content }),
            {},
          ),
        }
      : { type: 'other', content: arg },
  );
}

window.console = new Proxy(console, {
  get(target, method) {
    return function (...args: any[]) {
      if (!(method in target)) {
        const msg = `Uncaught TypeError: console.${String(method)} is not a function`;
        target.error(msg);
        parent.postMessage({ type: 'console', method: 'error', args: getString([msg]) }, '*');
        return;
      }
      target[method as keyof typeof console](...args);
      parent.postMessage({ type: 'console', method, args: getString(args) }, '*');
    };
  },
});

window.addEventListener('error', (error) => {
  parent.postMessage({ type: 'console', method: 'error', args: getString([error.message]) }, '*');
});

window.addEventListener('message', (event) => {
  if (event.origin.startsWith(location.origin) && event.data.console) {
    parent.postMessage(
      // eslint-disable-next-line
      { type: 'console', method: 'output', args: getString([eval(event.data.console)]) },
      '*',
    );
  }
});
