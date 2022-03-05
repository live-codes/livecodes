/* eslint-disable import/no-internal-modules */
import { shareService } from './livecodes/services';
import { livecodes } from './livecodes/main';

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

const baseUrl =
  (location.origin + location.pathname).split('/').slice(0, -1).join('/') + '/livecodes/';
livecodes('#livecodes', baseUrl, {});
