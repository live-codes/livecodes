// eslint-disable-next-line import/no-internal-modules
import { shareService } from './livecodes/services';

const animatingLogo = document.querySelector('#animating-logo') as HTMLElement;
const cube = document.querySelector('#cube') as HTMLElement;
const clickToLoad = document.querySelector('#click-to-load') as HTMLElement;
if (location.search.includes('embed') && !location.search.includes('embed=false')) {
  document.body.classList.add('embed');
  if (!location.search.includes('click-to-load=false')) {
    document.body.classList.add('click-to-load');
    cube.classList.remove('cube');
    animatingLogo.classList.add('hidden');
    clickToLoad.style.display = 'flex';
    clickToLoad.classList.add('visible');
    clickToLoad.addEventListener('click', () => {
      clickToLoad.classList.remove('visible');
      setTimeout(() => {
        document.body.classList.remove('click-to-load');
        animatingLogo.classList.remove('hidden');
        cube.classList.add('cube');
        setTimeout(() => {
          clickToLoad.remove();
          document.querySelector('.preview')?.remove();
        }, 300);
      }, 500);
      window.dispatchEvent(new Event('run'));
    });
    if (!location.search.includes('preview=false')) {
      const id = new URL(location.href).searchParams.get('x');
      if (id?.startsWith('id/')) {
        loadPreview(id.replace('id/', ''));
      }
    }
  }
}
function loadPreview(id: string) {
  shareService.getProject(id).then((content) => {
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
  });
}
function resize() {
  document.body.style.height = window.innerHeight + 'px';
}
resize();
window.addEventListener('resize', resize, false);
setTimeout(resize, 500);
window.addEventListener('livecodes-app-loaded', function (e: any) {
  animatingLogo.remove();
  (window as any).api = e.detail;
});
window.addEventListener('livecodes-ready', function () {
  // project loaded
});

import('/livecodes/' + 'index.js').then((module) => {
  module.livecodes('#livecodes', {});
});
