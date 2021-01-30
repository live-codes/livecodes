import { typeOf } from './utils';

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
    return { type: 'other', content: arg };
  });
}

window.console = new Proxy(console, {
  get(target, method) {
    return function (...args: any[]) {
      if (!(method in target)) {
        const msg = `Uncaught TypeError: console.${String(method)} is not a function`;
        target.error(msg);
        parent.postMessage({ type: 'console', method: 'error', args: consoleArgs([msg]) }, '*');
        return;
      }
      target[method as keyof typeof console](...args);
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

window.addEventListener('message', (event) => {
  if (event.origin.startsWith(location.origin) && event.data.console) {
    const evalCode = () => {
      try {
        // eslint-disable-next-line no-eval
        return { type: 'console', method: 'output', args: consoleArgs([eval(event.data.console)]) };
      } catch (error) {
        return { type: 'console', method: 'error', args: consoleArgs([error]) };
      }
    };
    parent.postMessage(evalCode(), '*');
  }
});
