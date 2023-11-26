import type { CustomEditorOptions, Theme } from '../../models';
import { sandboxService } from '../../services';
import {
  quillBetterTableBaseUrl,
  quillBlotFormaterUrl,
  quillEditorCdnBaseUrl,
  quillHtmlEditUrl,
} from '../../vendors';
// @ts-ignore
// eslint-disable-next-line import/no-unresolved
import quillEditorHTML from './quill.html?raw';

let quillEditorLoaded = false;
let quillEditorContent = '';

const getIframe = () => document.querySelector<HTMLIFrameElement>('#quill-editor-frame');

export const showQuillEditor = async ({
  baseUrl,
  config,
  editors,
  eventsManager,
}: CustomEditorOptions) => {
  if (quillEditorLoaded) {
    if (quillEditorContent !== editors.markup.getValue()) {
      getIframe()?.contentWindow?.postMessage({ html: editors.markup.getValue() }, '*');
    }
    return;
  }

  const quillEditorScripts = `
  <script src="${quillEditorCdnBaseUrl}quill.js"></script>
  <script src="${quillHtmlEditUrl}"></script>
  <script src="${quillBlotFormaterUrl}"></script>
  <script src="${quillBetterTableBaseUrl}quill-better-table.min.js"></script>
  <script src="${baseUrl}{{hash:custom-editor-utils.js}}"></script>
    `;
  const quillEditorStyles = `
  <link rel="stylesheet" href="${baseUrl}{{hash:quill.css}}" />
  <link rel="stylesheet" href="${quillEditorCdnBaseUrl}quill.snow.css" />
  <link rel="stylesheet" href="${quillBetterTableBaseUrl}quill-better-table.css" />
  `;
  const getQuillEditorHTML = () =>
    quillEditorHTML
      .replace('<!-- styles placeholder -->', quillEditorStyles)
      .replace('<!-- scripts placeholder -->', quillEditorLoaded ? '' : quillEditorScripts)
      // .replace('{{theme}}', config.theme)
      .replace('// {{ custom config }}', config.readonly ? 'readOnly: true' : '')
      .replace('<!-- content placeholder -->', editors.markup.getValue());

  await new Promise((resolve) => {
    const quillEditorContainer = document.querySelector('#quillEditor') as HTMLElement;
    let iframe = getIframe();

    const onload = () => {
      eventsManager.addEventListener(window, 'message', (event: any) => {
        if (
          event.source !== getIframe()?.contentWindow ||
          !['quillEditorCode', 'quillEditorLoaded'].includes(event.data.type)
        ) {
          return;
        }

        if (event.data.type === 'quillEditorLoaded') {
          quillEditorLoaded = true;
          eventsManager.removeEventListener(iframe, 'load', onload);
          // setTheme(config.theme);
          updateQuillEditorCode();
          resolve('loaded');
          return;
        }

        const { html } = event.data.payload;
        quillEditorContent = html;
        editors.markup.setValue(html || '');
      });

      getIframe()?.contentWindow?.postMessage({ result: getQuillEditorHTML() }, '*');
    };

    if (iframe) {
      onload();
    } else {
      iframe = document.createElement('iframe');
      iframe.name = 'quillEditor';
      iframe.id = 'quill-editor-frame';
      iframe.setAttribute(
        'sandbox',
        'allow-same-origin allow-downloads allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-presentation allow-scripts',
      );
      eventsManager.addEventListener(iframe, 'load', onload);
      iframe.src = sandboxService.getResultUrl();
      quillEditorContainer.appendChild(iframe);
    }
  });
};

export const getQuillEditorContent = async ({
  baseUrl,
  editors,
  config,
  html,
  eventsManager,
}: CustomEditorOptions): Promise<{ html?: string }> => {
  if (config.script.language !== 'richtext') return {};
  if (!quillEditorLoaded) {
    await showQuillEditor({ baseUrl, config, editors, html, eventsManager });
  }
  return {
    html: quillEditorContent,
  };
};

export const setQuillEditorTheme = (theme: Theme) => {
  getIframe()?.contentWindow?.postMessage(
    { type: 'setTheme', payload: theme },
    sandboxService.getOrigin(),
  );
};

const updateQuillEditorCode = () => {
  getIframe()?.contentWindow?.postMessage({ type: 'updateCode' }, sandboxService.getOrigin());
};
