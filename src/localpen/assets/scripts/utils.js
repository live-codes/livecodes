(function interceptConsole() {
  window.console = new Proxy(console, {
    get(target, method, receiver) {
      return function (...args) {
        target[method].apply(this, args);
        parent.postMessage({ type: 'console', method, args }, '*');
      };
    },
  });
})();
