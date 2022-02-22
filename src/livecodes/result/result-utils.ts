import { handleEval, handleResize, proxyConsole } from './utils';

(window as any).livecodes = (window as any).livecodes || {};
proxyConsole();
handleEval();
handleResize();

window.addEventListener('message', function (event) {
  if (event.data.styles) {
    const styles = document.querySelector('#__livecodes_styles__');
    if (!styles) return;
    styles.innerHTML = event.data.styles;
  }
  if (event.data.flush) {
    document.body.innerHTML = '';
  } else {
    parent.postMessage({ type: 'loading', payload: false }, '*');
  }
});

window.addEventListener('load', () => {
  parent.postMessage({ type: 'loading', payload: false }, '*');
});
