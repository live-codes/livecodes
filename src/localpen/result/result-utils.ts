import { handleEval, handleResize, proxyConsole } from './utils';

proxyConsole();
handleEval();
handleResize();

window.addEventListener('load', () => {
  parent.postMessage({ type: 'loading', payload: false }, '*');
});
