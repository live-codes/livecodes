import { handleEval, handleResize, handleScrollPosition, proxyConsole } from './utils';

(() => {
  (window as any).livecodes = (window as any).livecodes || {};
  // avoid duplicate handlers in live reload
  if ((window as any).livecodes.env === 'development') return;
  (window as any).livecodes.env = 'development';

  proxyConsole();
  handleEval();
  handleResize();
  handleScrollPosition();

  window.addEventListener('message', function (event) {
    if (event.data.styles) {
      const styles = document.querySelector('#__livecodes_styles__');
      if (!styles) return;
      styles.innerHTML = event.data.styles;
    }
    if (event.data.flush) {
      document.body.innerHTML = '';
      document.head.innerHTML = '';
    } else {
      parent.postMessage({ type: 'loading', payload: false }, '*');
    }
  });

  window.addEventListener('load', () => {
    parent.postMessage({ type: 'loading', payload: false }, '*');
  });
})();
