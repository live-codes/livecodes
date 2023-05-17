/* eslint-disable import/no-internal-modules */
import { shareService } from './livecodes/services/share';
import { livecodes, params, isEmbed, loadingParam, clickToLoad, loading } from './livecodes/main';
import { customEvents } from './livecodes/events/custom-events';

const loadPreview = async (id: string) => {
  if (!id) return;
  const content = await shareService.getProject(id);
  if (!content.result) return;

  const previewFrame = document.createElement('iframe');
  previewFrame.setAttribute(
    'sandbox',
    'allow-same-origin allow-downloads allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-presentation allow-scripts',
  );
  previewFrame.setAttribute('scrolling', 'no');
  previewFrame.classList.add('preview');
  previewFrame.srcdoc = content.result;
  document.body.appendChild(previewFrame);
};

if (loadingParam === 'click' && params.get('preview') !== 'false') {
  const id = params.get('x');
  if (id?.startsWith('id/')) {
    loadPreview(id.replace('id/', ''));
  }
}

const animatingLogo = document.querySelector<HTMLElement>('#animating-logo')!;
const cube = document.querySelector<HTMLElement>('#cube')!;
const clickToLoadEl = document.querySelector<HTMLElement>('#click-to-load')!;

if (isEmbed) {
  document.body.classList.add('embed');
  if (clickToLoad) {
    document.body.classList.add('click-to-load');
    cube.classList.remove('cube');
    animatingLogo.classList.add('hidden');
    animatingLogo.style.display = 'none';
    clickToLoadEl.style.display = 'flex';
    clickToLoadEl.classList.add('visible');

    // load on click
    clickToLoadEl.addEventListener('click', load);

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
          entries.forEach(async (entry) => {
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
}

let loadTriggered = false;
function load() {
  if (loadTriggered) return;
  clickToLoadEl.classList.remove('visible');
  document.querySelector('.preview')?.classList.add('hidden');
  setTimeout(() => {
    document.body.classList.remove('click-to-load');
    animatingLogo.style.display = 'flex';
    animatingLogo.classList.remove('hidden');
    cube.classList.add('cube');
    setTimeout(() => {
      clickToLoadEl.remove();
      document.querySelector('.preview')?.remove();
    }, 300);
  }, 500);
  window.dispatchEvent(new Event(customEvents.load));
  loadTriggered = true;
}

function resize() {
  document.body.style.height = window.innerHeight + 'px';
}

resize();
window.addEventListener('resize', resize, false);
setTimeout(resize, 500);

window.addEventListener(customEvents.appLoaded, (e: CustomEventInit) => {
  animatingLogo.remove();
  (window as any).livecodes = e.detail;
});

window.addEventListener(customEvents.ready, () => {
  // project loaded
});

window.addEventListener(customEvents.change, () => {
  // content change
});

window.addEventListener(customEvents.testResults, (_e: CustomEventInit) => {
  // const testResults = e.detail;
});

window.addEventListener(customEvents.destroy, () => {
  window.removeEventListener('resize', resize);
  document.body.innerHTML = '';
  document.head.innerHTML = '';
});

const decodeConfig = (configParam: string | null) => {
  const dataUrlPrefix = 'data:application/json;base64,';
  if (configParam && configParam.startsWith(dataUrlPrefix)) {
    try {
      const value = configParam.replace(dataUrlPrefix, '');
      return JSON.parse(atob(value));
    } catch (err) {
      //
    }
  }
  return {};
};

livecodes('#livecodes', decodeConfig(params.get('config')));
