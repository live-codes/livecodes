import { CustomEditorOptions, Theme } from '../../models';
import { sandboxService } from '../../services';
import { ckeditorCdnBaseUrl } from '../../vendors';
// @ts-ignore
import ckeditorHTML from './ckeditor.html';

let ckeditorLoaded = false;
let ckeditorContent = '';

const getIframe = () => document.querySelector<HTMLIFrameElement>('#ckeditor-frame');

export const showCkeditor = async ({ editors, eventsManager }: CustomEditorOptions) => {
  if (ckeditorLoaded) {
    getIframe()?.contentWindow?.postMessage({ html: editors.markup.getValue() }, '*');
    return;
  }

  const ckeditorScript = `<script src="http://127.0.0.1:8081/build/ckeditor.js"></script>`;
  const getCkeditorHTML = () =>
    ckeditorHTML
      .replace('<!-- script placeholder -->', ckeditorLoaded ? '' : ckeditorScript)
      // .replace('{{theme}}', config.theme)
      .replace('<!-- content placeholder -->', editors.markup.getValue());

  await new Promise((resolve) => {
    const ckeditorContainer = document.querySelector('#ckeditor') as HTMLElement;
    let iframe = getIframe();

    const onload = () => {
      eventsManager.addEventListener(window, 'message', (event: any) => {
        if (
          event.source !== getIframe()?.contentWindow ||
          !['ckeditorCode', 'ckeditorLoaded'].includes(event.data.type)
        ) {
          return;
        }

        if (event.data.type === 'ckeditorLoaded') {
          ckeditorLoaded = true;
          eventsManager.removeEventListener(iframe, 'load', onload);
          // setBlocklyTheme(config.theme);
          updateCkeditorCode();
          resolve('loaded');
          return;
        }

        const { html } = event.data.payload;
        ckeditorContent = html;
        editors.markup.setValue(html || '');
      });

      getIframe()?.contentWindow?.postMessage({ result: getCkeditorHTML() }, '*');
    };

    if (iframe) {
      onload();
    } else {
      iframe = document.createElement('iframe');
      iframe.name = 'ckeditor';
      iframe.id = 'ckeditor-frame';
      iframe.setAttribute(
        'sandbox',
        'allow-same-origin allow-downloads allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-presentation allow-scripts',
      );
      eventsManager.addEventListener(iframe, 'load', onload);
      iframe.src = sandboxService.getResultUrl();
      ckeditorContainer.appendChild(iframe);
    }
  });
};

export const getCkeditorContent = async ({
  baseUrl,
  editors,
  config,
  html,
  eventsManager,
}: CustomEditorOptions): Promise<{ html?: string }> => {
  if (config.script.language !== 'richtext') return {};
  if (!ckeditorLoaded) {
    await showCkeditor({ baseUrl, config, editors, html, eventsManager });
  }
  return {
    html: ckeditorContent,
  };
};

export const setCkeditorTheme = (theme: Theme) => {
  getIframe()?.contentWindow?.postMessage(
    { type: 'setTheme', payload: theme },
    sandboxService.getOrigin(),
  );
};

const updateCkeditorCode = () => {
  getIframe()?.contentWindow?.postMessage({ type: 'updateCode' }, sandboxService.getOrigin());
};
