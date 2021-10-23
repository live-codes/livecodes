import { getConfig } from '../config';
import { createEventsManager } from '../events';
import { CodeEditor, Editors, Theme } from '../models';
import { sandboxService } from '../services';
import { blocklyCdnBaseUrl } from '../vendors';

export interface blocklyOptions {
  baseUrl: string;
  editors: Editors;
  eventsManager: ReturnType<typeof createEventsManager>;
}

let blocklyLoaded = false;
let cache: {
  src?: string;
  customScripts?: string[];
  customXml?: string[];
  cleanHtml?: string | null;
  js?: string;
  xml?: string;
} = {};

const getIframe = () => document.querySelector<HTMLIFrameElement>('#blockly-frame');

const extractCustomContent = async (markupEditor: CodeEditor) => {
  const html = markupEditor.getValue();
  const domParser = new DOMParser();
  const dom = domParser.parseFromString(html, 'text/html');
  const scripts = Array.from(
    dom.querySelectorAll<HTMLScriptElement>('script[type="blockly/script"]'),
  );
  const xml = Array.from(dom.querySelectorAll<HTMLScriptElement>('xml[data-type="blockly/xml"]'));

  const scriptsSrc = scripts.map((el) => el.src || el.dataset.src || el.innerHTML);
  const xmlSrc = xml.map((el) => el.src || el.dataset.src || el.innerHTML);
  const src = JSON.stringify([scriptsSrc, xmlSrc]);
  if (cache.src === src) {
    return [cache.customScripts, cache.customXml, cache.cleanHtml];
  }
  blocklyLoaded = false;

  const getContent = async (elements: HTMLScriptElement[]) =>
    Promise.all(
      elements.map(async (el) => {
        el.remove();
        const src = el.src || el.dataset.src;
        if (src) {
          return fetch(src).then((res) => res.text());
        } else {
          return el.innerHTML;
        }
      }),
    );

  const [customScripts, customXml] = await Promise.all([getContent(scripts), getContent(xml)]);
  const cleanHtml =
    customScripts.length > 0 || customXml.length > 0 ? dom.documentElement.outerHTML : null;

  cache = {
    src,
    customScripts,
    customXml,
    cleanHtml,
  };

  return [customScripts, customXml, cleanHtml];
};

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

  const [customScripts, customXml, _cleanHtml] = await extractCustomContent(editors.markup);

  if (blocklyLoaded) return;

  const getBlocklyHTML = async () =>
    (await import(baseUrl + 'blockly-editor.js')).blocklyHTML
      .replace(/https:\/\/cdn.jsdelivr.net\/npm\/blockly\//g, blocklyCdnBaseUrl)
      .replace('{{theme}}', getConfig().theme)
      .replace(
        '<!-- startBlocks placeholder -->',
        `<div id="startBlocksContainer" style="display:none;">${editors.script.getValue()}</div>
    ${(customScripts as string[])?.map((script) => '<script>' + script + '</script>').join('/n')}
      <script>
        if (typeof window.editToolbox !== 'function') {
          window.editToolbox = (toolboxElement, customXml) => {
            const domParser = new DOMParser();
            customXml.forEach(xml => {
              const dom = domParser.parseFromString(xml, 'text/xml');
              toolboxElement.innerHTML += dom.documentElement.innerHTML;
            })
          }
        }
        window.editToolbox(document.getElementById('toolbox'), [${(customXml as string[])
          ?.map((xml) => '`' + xml.replace(/\`/g, '\\`') + '`')
          .join(', ')}]);
      </script>
    `,
      );

  await new Promise(async (resolve) => {
    const onload = async () => {
      getIframe()?.contentWindow?.postMessage(
        { result: await getBlocklyHTML() },
        sandboxService.getOrigin(),
      );
    };
    let iframe = getIframe();
    if (iframe) {
      await onload();
    } else {
      iframe = document.createElement('iframe');
      iframe.name = 'blockly';
      iframe.id = 'blockly-frame';
      iframe.setAttribute(
        'sandbox',
        'allow-same-origin allow-downloads allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-presentation allow-scripts',
      );

      eventsManager.addEventListener(iframe, 'load', onload);

      eventsManager.addEventListener(window, 'message', (event: any) => {
        if (
          event.source !== getIframe()?.contentWindow ||
          !['blocklyCode', 'blocklyLoaded'].includes(event.data.type)
        ) {
          return;
        }

        if (event.data.type === 'blocklyLoaded') {
          blocklyLoaded = true;
          eventsManager.removeEventListener(iframe, 'load', onload);
          setBlocklyTheme(getConfig().theme);
          setTimeout(updateBlocklyCode);
          resolve('loaded');
          return;
        }

        const { xml, js } = event.data.payload;
        cache.xml = xml;
        cache.js = js;
        editors.script.setValue(xml);
      });

      iframe.src = sandboxService.getResultUrl();
      blocklyEditor.appendChild(iframe);
    }
  });
};

export const getBlocklyContent = async ({ baseUrl, editors, eventsManager }: blocklyOptions) => {
  if (getConfig().script.language !== 'blockly') return {};
  const [_customScripts, _customXml, cleanHtml] = await extractCustomContent(editors.markup);
  if (!blocklyLoaded || cache.js == null) {
    await showBlockly(true, { baseUrl, editors, eventsManager });
  }
  return {
    xml: cache.xml,
    js: cache.js,
    html: cleanHtml,
  };
};

export const setBlocklyTheme = (theme: Theme) => {
  getIframe()?.contentWindow?.postMessage(
    { type: 'setTheme', payload: theme },
    sandboxService.getOrigin(),
  );
};

export const updateBlocklyCode = () => {
  getIframe()?.contentWindow?.postMessage({ type: 'updateCode' }, sandboxService.getOrigin());
};
