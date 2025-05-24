import { customEvents } from './events/custom-events';
import type { I18nKeyType } from './i18n';
import { clickToLoad, isEmbed, livecodes, loading, params } from './main';
import type { Config, CustomEvents } from './models';

const sdkVersion = params.get('sdkVersion');
const rootSelector = '#livecodes';
const loadingEl = document.querySelector<HTMLElement>('#loading')!;
const loadingText = document.querySelector<HTMLElement>('#loading-text')!;
const loadingHTML = loadingEl.innerHTML;

if (isEmbed) {
  parent.postMessage(
    { type: customEvents.init, payload: { appVersion: process.env.VERSION } },
    '*',
  );

  document.body.classList.add('embed');
  if (clickToLoad) {
    loadingEl.classList.add('click-to-load');
    loadingEl.title = 'Click to Load';
    loadingText.innerText = 'Click to load LiveCodes';

    // load on click
    loadingEl.addEventListener('click', load);

    // load from API
    addEventListener('message', (e) => {
      if (e.source === parent && e.data?.type === customEvents.load) {
        load();
      }
    });

    // load on visible
    if (loading === 'lazy' && 'IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              load();
              observer.unobserve(document.body);
            }
          });
        },
        { rootMargin: '150px' },
      );
      observer.observe(document.body);
    }
  }
} else {
  // Splash i18n
  const i18nItem = (item: I18nKeyType) => `i18n_${item}`;
  const i18nLoadingText = localStorage.getItem(i18nItem('splash.loading'));
  if (i18nLoadingText) {
    loadingText.innerText = i18nLoadingText;
  }
}

function load() {
  window.dispatchEvent(new Event(customEvents.load));

  if (!clickToLoad) return;
  loadingEl.style.opacity = '0';
  setTimeout(() => {
    loadingEl.classList.remove('click-to-load');
    loadingEl.innerHTML = loadingHTML;
    loadingEl.title = '';
    loadingEl.style.opacity = '1';
  }, 500);
}

function loaded() {
  loadingEl.style.opacity = '0';
  setTimeout(() => {
    loadingEl.remove();
  }, 500);

  document.querySelector<HTMLElement>(rootSelector)!.style.opacity = '1';
}

function resize() {
  document.body.style.height = window.innerHeight + 'px';
}

resize();
window.addEventListener('resize', resize, false);
setTimeout(resize, 500);

window.addEventListener(customEvents.appLoaded, (e: CustomEventInit) => {
  loaded();
  (window as any).livecodes = e.detail;
});

// window.addEventListener(customEvents.ready, () => {
//   // project loaded
// });

// window.addEventListener(customEvents.change, () => {
//   // content changed
// });

// window.addEventListener(customEvents.testResults, (e: CustomEventInit) => {
//   const testResults = e.detail;
// });

// window.addEventListener(customEvents.console, (e: CustomEventInit) => {
//   const { method, args } = e.detail;
// });

window.addEventListener(customEvents.destroy, () => {
  window.removeEventListener('resize', resize);
  document.body.innerHTML = '';
  document.head.innerHTML = '';
});

// for backward-compatibility
if (isEmbed && params.get('config') === 'sdk' && !sdkVersion) {
  addEventListener(
    'message',
    function configHandler(
      e: MessageEventInit<{ type: CustomEvents['config']; payload: Partial<Config> }>,
    ) {
      if (e.source !== parent || e.data?.type !== customEvents.config) return;
      removeEventListener('message', configHandler);
      livecodes('#livecodes', e.data.payload).then(loaded);
    },
  );
  parent.postMessage({ type: customEvents.getConfig }, '*');
} else {
  livecodes('#livecodes').then(loaded);
}
