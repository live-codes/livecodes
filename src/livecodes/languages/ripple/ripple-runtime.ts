export const rippleRuntime = `
import { mount } from 'ripple';
import App from "./script";
(() => {
  mount(App, {
    target: document.querySelector("#livecodes-app") || document.body.appendChild(document.createElement('div')),
  });
})();
`;
