/* eslint-disable import/no-internal-modules */
import { shareService } from './livecodes/services';
import { livecodes } from './livecodes/main';
import { customEvents } from './livecodes/custom-events';

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

if (
  location.search.includes('embed') &&
  !location.search.includes('embed=false') &&
  !location.search.includes('click-to-load=false') &&
  !location.search.includes('preview=false')
) {
  const id = new URL(location.href).searchParams.get('x');
  if (id?.startsWith('id/')) {
    loadPreview(id.replace('id/', ''));
  }
}

const animatingLogo = document.querySelector<HTMLElement>('#animating-logo')!;
const cube = document.querySelector<HTMLElement>('#cube')!;
const clickToLoad = document.querySelector<HTMLElement>('#click-to-load')!;

if (location.search.includes('embed') && !location.search.includes('embed=false')) {
  document.body.classList.add('embed');
  if (!location.search.includes('click-to-load=false')) {
    document.body.classList.add('click-to-load');
    cube.classList.remove('cube');
    animatingLogo.classList.add('hidden');
    animatingLogo.style.display = 'none';
    clickToLoad.style.display = 'flex';
    clickToLoad.classList.add('visible');
    clickToLoad.addEventListener('click', load);
    addEventListener('message', (e) => {
      // load from API
      if (e.source === parent && e.data?.type === customEvents.load) {
        load();
      }
    });
  }
}

function load() {
  clickToLoad.classList.remove('visible');
  document.querySelector('.preview')?.classList.add('hidden');
  setTimeout(() => {
    document.body.classList.remove('click-to-load');
    animatingLogo.style.display = 'flex';
    animatingLogo.classList.remove('hidden');
    cube.classList.add('cube');
    setTimeout(() => {
      clickToLoad.remove();
      document.querySelector('.preview')?.remove();
    }, 300);
  }, 500);
  window.dispatchEvent(new Event(customEvents.load));
}

function resize() {
  document.body.style.height = window.innerHeight + 'px';
}

resize();
window.addEventListener('resize', resize, false);
setTimeout(resize, 500);

window.addEventListener(customEvents.appLoaded, (e: CustomEventInit) => {
  animatingLogo.remove();
  (window as any).api = e.detail;
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

livecodes('#livecodes', {});
