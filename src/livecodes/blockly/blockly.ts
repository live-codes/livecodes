import { getConfig } from '../config';
import { createEventsManager } from '../events';
import { getCustomSettings } from '../languages';
import { Editors, Theme } from '../models';
import { sandboxService } from '../services';
import { blocklyCdnBaseUrl } from '../vendors';

export interface BlocklyOptions {
  baseUrl: string;
  editors: Editors;
  html: string;
  eventsManager: ReturnType<typeof createEventsManager>;
}
export interface BlocklyContent {
  xml?: string;
  js?: string;
}

let blocklyLoaded = false;
let cache: {
  src: string;
  customScripts: string[];
  customXml: string[];
  js?: string;
  xml?: string;
} = {
  src: '',
  customScripts: [],
  customXml: [],
};

const getIframe = () => document.querySelector<HTMLIFrameElement>('#blockly-frame');
const getCustomSettingsString = () =>
  '...' +
  JSON.stringify({
    ...getCustomSettings('blockly', getConfig()),
    ...(getConfig().readonly ? { readOnly: true } : {}),
  }) +
  ',';

const extractCustomContent = async (html: string): Promise<[string[], string[]]> => {
  const domParser = new DOMParser();
  const dom = domParser.parseFromString(html, 'text/html');
  const scripts = Array.from(
    dom.querySelectorAll<HTMLScriptElement>(
      'script[type="blockly/script"], script[data-type="blockly/script"]',
    ),
  );
  const xml = Array.from(
    dom.querySelectorAll<HTMLScriptElement>(
      'xml[type="blockly/xml"], xml[data-type="blockly/xml"]',
    ),
  );

  const scriptsSrc = scripts.map((el) => el.src || el.dataset.src || el.innerHTML);
  const xmlSrc = xml.map((el) => el.src || el.dataset.src || el.innerHTML);
  const customSettings = getCustomSettingsString();
  const src = JSON.stringify([scriptsSrc, xmlSrc, customSettings]);
  if (cache.src === src) {
    return [cache.customScripts, cache.customXml];
  }
  blocklyLoaded = false;

  const getContent = async (elements: HTMLScriptElement[]) =>
    Promise.all(
      elements.map(async (el) => {
        const url = el.src || el.dataset.src;
        if (url) {
          return fetch(url).then((res) => res.text());
        } else {
          return el.innerHTML;
        }
      }),
    );

  const [customScripts, customXml] = await Promise.all([getContent(scripts), getContent(xml)]);

  cache = {
    src,
    customScripts,
    customXml,
  };

  return [customScripts, customXml];
};

export const showBlockly = async (
  show: boolean,
  { baseUrl, editors, html, eventsManager }: BlocklyOptions,
) => {
  const blocklyEditor = document.querySelector('#blockly') as HTMLElement;
  if (!show || editors.script.getLanguage() !== 'blockly') {
    blocklyEditor.style.display = 'none';
    return;
  }
  blocklyEditor.style.display = 'unset';

  const [customScripts, customXml] = await extractCustomContent(html);

  if (blocklyLoaded) return;

  const getBlocklyHTML = async () =>
    (await import(baseUrl + 'blockly-editor.js')).blocklyHTML
      .replace(/https:\/\/cdn.jsdelivr.net\/npm\/blockly\//g, blocklyCdnBaseUrl)
      .replace('{{theme}}', getConfig().theme)
      .replace('// {{ custom config }}', getCustomSettingsString())
      .replace(
        '<!-- startBlocks placeholder -->',
        `<div id="startBlocksContainer" style="display:none;">${editors.script.getValue()}</div>
    ${customScripts?.map((script) => '<script>' + script + '</script>').join('/n')}
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
        window.editToolbox(document.getElementById('toolbox'), [${customXml
          ?.map((xml) => '`' + xml.replace(/\`/g, '\\`') + '`')
          .join(', ')}]);
      </script>
    `,
      );

  await new Promise(async (resolve) => {
    const onload = async () => {
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
          updateBlocklyCode();
          resolve('loaded');
          return;
        }

        const { xml, js } = event.data.payload;
        cache.xml = xml;
        cache.js = js;
        editors.script.setValue(xml);
      });

      getIframe()?.contentWindow?.postMessage({ result: await getBlocklyHTML() }, '*');
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
      iframe.src = sandboxService.getResultUrl();
      blocklyEditor.appendChild(iframe);
    }
  });
};

export const getBlocklyContent = async ({
  baseUrl,
  editors,
  html,
  eventsManager,
}: BlocklyOptions): Promise<BlocklyContent> => {
  if (getConfig().script.language !== 'blockly') return {};
  await extractCustomContent(html);
  if (!blocklyLoaded || cache.js == null) {
    await showBlockly(true, { baseUrl, editors, html, eventsManager });
  }
  return {
    xml: cache.xml,
    js: cache.js,
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
