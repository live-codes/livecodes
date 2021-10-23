import { getCache, setCache } from '../cache';
import { getConfig } from '../config';
import { createEventsManager } from '../events';
import { Editors, Theme } from '../models';
import { sandboxService } from '../services';

export interface blocklyOptions {
  baseUrl: string;
  editors: Editors;
  eventsManager: ReturnType<typeof createEventsManager>;
}

let blocklyLoaded = false;

export const showBlockly = async (
  show: boolean,
  { baseUrl, editors, eventsManager }: blocklyOptions,
) => {
  const blocklyEditor = document.querySelector('#blockly') as HTMLElement;
  if (!show) {
    blocklyEditor.style.display = 'none';
    return;
  }
  blocklyEditor.style.display = 'unset';

  if (!blocklyLoaded) {
    await new Promise(async (resolve) => {
      const iframe = document.createElement('iframe');
      iframe.name = 'blockly';
      iframe.id = 'blockly-frame';
      iframe.setAttribute(
        'sandbox',
        'allow-same-origin allow-downloads allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-presentation allow-scripts',
      );
      const blocklyHTML = (await import(baseUrl + 'blockly-editor.js')).blocklyHTML
        .replace('{{theme}}', getConfig().theme)
        .replace(
          '<!-- startBlocks placeholder -->',
          `<div id="startBlocksContainer" style="display:none;">${editors.script.getValue()}</div>`,
        );

      eventsManager.addEventListener(iframe, 'load', () => {
        iframe.contentWindow?.postMessage({ result: blocklyHTML }, sandboxService.getOrigin());
      });

      eventsManager.addEventListener(window, 'message', (event: any) => {
        if (
          event.source !== iframe.contentWindow ||
          !['blocklyCode', 'blocklyLoaded'].includes(event.data.type)
        ) {
          return;
        }

        if (event.data.type === 'blocklyLoaded') {
          blocklyLoaded = true;
          setBlocklyTheme(getConfig().theme);
          setTimeout(updateBlocklyCode);
          resolve('loaded');
          return;
        }

        const { xml, js } = event.data.payload;
        setCache({
          ...getCache(),
          script: {
            language: 'blockly',
            content: xml,
            compiled: js,
          },
        });
        editors.script.setValue(xml);
      });

      iframe.src = sandboxService.getResultUrl();
      blocklyEditor.appendChild(iframe);
    });
  }
};

export const getBlocklyContent = () =>
  getConfig().script.language === 'blockly'
    ? {
        xml: getCache().script.content,
        js: getCache().script.compiled,
      }
    : {};

export const setBlocklyTheme = (theme: Theme) => {
  document
    .querySelector<HTMLIFrameElement>('#blockly-frame')
    ?.contentWindow?.postMessage({ type: 'setTheme', payload: theme }, sandboxService.getOrigin());
};

export const updateBlocklyCode = () => {
  document
    .querySelector<HTMLIFrameElement>('#blockly-frame')
    ?.contentWindow?.postMessage({ type: 'updateCode' }, sandboxService.getOrigin());
};
