/* eslint-disable import/no-internal-modules */
import type { createEventsManager } from '../events';
import type { createModal } from '../modal';
import type { CodeEditor, ContentConfig, EditorId, Language } from '../models';
import type { createNotifications } from '../notifications';
import { defaultConfig } from '../config/default-config';
import { embedScreen } from '../html';
import { cloneObject, copyToClipboard, encodeHTML, escapeCode, indentCode } from '../utils/utils';
import { permanentUrlService } from '../services/permanent-url';

export const createEmbedUI = async ({
  baseUrl,
  config,
  editorLanguages,
  modal,
  notifications,
  eventsManager,
  createEditorFn,
  getUrlFn,
}: {
  baseUrl: string;
  config: ContentConfig;
  editorLanguages: { [key in EditorId]: string };
  modal: ReturnType<typeof createModal>;
  notifications: ReturnType<typeof createNotifications>;
  eventsManager: ReturnType<typeof createEventsManager>;
  createEditorFn: (container: HTMLElement) => Promise<CodeEditor>;
  getUrlFn: (permanentUrl?: boolean) => Promise<string>;
}) => {
  const title = config.title;
  const activeEditor = config.activeEditor || 'markup';

  const div = document.createElement('div');
  div.innerHTML = embedScreen;
  const embedContainer = div.firstChild as HTMLElement;
  modal.show(embedContainer, { isAsync: true });

  const previewContainer = embedContainer.querySelector<HTMLElement>('#embed-preview-container');
  const form = embedContainer.querySelector<HTMLFormElement>('#embed-form');
  const codeArea = embedContainer.querySelector<HTMLFormElement>('#embed-code');
  const copyBtn = embedContainer.querySelector<HTMLFormElement>('#embed-copy-btn');
  if (!previewContainer || !form || !codeArea || !copyBtn) return;

  interface FormField {
    title: string;
    name:
      | 'type'
      | 'theme'
      | 'loading'
      | 'lite'
      | 'readonly'
      | 'mode'
      | 'view'
      | 'activeEditor'
      | 'permanentUrl'
      | 'tools'
      | 'activeTool';
    options: Array<{ label?: string; value: string; checked?: boolean }>;
    help?: string;
  }
  const formFields: FormField[] = [
    {
      title: 'Theme',
      name: 'theme',
      options: [
        { label: 'Dark', value: 'dark', checked: true },
        { label: 'Light', value: 'light' },
      ],
    },
    {
      title: 'Loading',
      name: 'loading',
      options: [
        { label: 'Lazy', value: 'lazy', checked: true },
        { label: 'On-click', value: 'click' },
        { label: 'Eager', value: 'eager' },
      ],
    },
    {
      title: 'Lite Mode',
      name: 'lite',
      options: [{ value: 'true', checked: false }],
      help: `${process.env.DOCS_BASE_URL}features/lite`,
    },
    {
      title: 'Read only',
      name: 'readonly',
      options: [{ value: 'true', checked: false }],
    },
    {
      title: 'Display Mode',
      name: 'mode',
      options: [
        { label: 'Full', value: 'full', checked: true },
        { label: 'Editor', value: 'editor' },
        { label: 'Code Block', value: 'codeblock' },
        { label: 'Result', value: 'result' },
      ],
      help: `${process.env.DOCS_BASE_URL}features/display-modes`,
    },
    {
      title: 'Default View',
      name: 'view',
      options: [
        { label: 'Split', value: 'split', checked: true },
        { label: 'Editor', value: 'editor' },
        { label: 'Result', value: 'result' },
      ],
      help: `${process.env.DOCS_BASE_URL}features/default-view`,
    },
    {
      title: 'Active Editor',
      name: 'activeEditor',
      options: [
        { label: editorLanguages.markup, value: 'markup', checked: activeEditor === 'markup' },
        { label: editorLanguages.style, value: 'style', checked: activeEditor === 'style' },
        { label: editorLanguages.script, value: 'script', checked: activeEditor === 'script' },
      ],
    },
    {
      title: 'Tools',
      name: 'tools',
      options: [
        { label: 'Closed', value: 'closed', checked: true },
        { label: 'Open', value: 'open' },
        { label: 'Full', value: 'full' },
        { label: 'None', value: 'none' },
      ],
      help: `${process.env.DOCS_BASE_URL}features/tools-pane`,
    },
    {
      title: 'Active Tool',
      name: 'activeTool',
      options: [
        { label: 'Console', value: 'console', checked: true },
        { label: 'Compiled', value: 'compiled' },
        { label: 'Tests', value: 'tests' },
      ].filter((option) => (option.value === 'tests' && !config.tests?.content ? false : true)),
      help: `${process.env.DOCS_BASE_URL}features/tools-pane`,
    },
    {
      title: 'Permanent URL',
      name: 'permanentUrl',
      options: [{ value: 'true', checked: true }],
      help: `${process.env.DOCS_BASE_URL}features/permanent-url`,
    },
    {
      title: 'Embed Type',
      name: 'type',
      options: [
        { label: 'Script (CDN)', value: 'cdn', checked: true },
        { label: 'JS (npm)', value: 'npm' },
        { label: 'React', value: 'react' },
        { label: 'Vue', value: 'vue' },
        { label: 'Svelte', value: 'svelte' },
        { label: 'Iframe', value: 'iframe' },
        { label: 'HTML', value: 'html' },
      ],
    },
  ];

  formFields.forEach((field) => {
    const title = document.createElement('label');
    title.innerHTML = field.title;
    form.appendChild(title);

    if (field.help) {
      const helpLink: HTMLAnchorElement = document.createElement('a');
      helpLink.href = field.help;
      helpLink.target = '_blank';
      helpLink.classList.add('help-link');
      helpLink.title = 'Click for info...';
      title.appendChild(helpLink);

      const helpIcon: HTMLImageElement = document.createElement('img');
      helpIcon.src = baseUrl + 'assets/icons/info.svg';
      helpLink.appendChild(helpIcon);
    }

    const fieldContainer = document.createElement('div');
    fieldContainer.classList.add('input-container');
    form.appendChild(fieldContainer);

    field.options.forEach((option) => {
      const name = `embed-${field.name}`;
      const id = `${name}-${option.value}`;
      const isCheckBox = !option.label && option.value === 'true';

      const optionContainer = document.createElement('span');
      fieldContainer.appendChild(optionContainer);

      const input = document.createElement('input');
      input.type = isCheckBox ? 'checkbox' : 'radio';
      input.name = name;
      input.id = id;
      input.value = option.value;
      input.checked = option.checked || false;
      optionContainer.appendChild(input);

      if (isCheckBox) {
        input.classList.add('switch');
      } else {
        const label = document.createElement('label') as HTMLLabelElement;
        label.classList.add('radio-label');
        label.htmlFor = id;
        label.innerHTML = option.label || '';
        optionContainer.appendChild(label);
      }
    });
  });

  type FormData = {
    [key in FormField['name']]?: string | boolean;
  };

  const editor = await createEditorFn(codeArea);
  const livecodesUrl = 'https://livecodes.io';
  const sdkUrl = permanentUrlService.getSDKUrl('umd');
  let shareUrl = await getUrlFn(true);
  let urlObj = new URL(shareUrl);
  let appUrl = urlObj.origin + urlObj.pathname;

  const previewIframe: HTMLIFrameElement = document.createElement('iframe');
  previewIframe.id = 'embed-preview-iframe';
  previewContainer.innerHTML = '';
  previewContainer.appendChild(previewIframe);

  const getContainerId = () => 'livecodes-' + (Math.random() + 1).toString(36).substring(2);

  const getOptions = (data: FormData) => {
    const config = {
      ...(data.mode !== defaultConfig.mode ? { mode: data.mode } : {}),
      ...(data.theme !== defaultConfig.theme ? { theme: data.theme } : {}),
      ...(data.tools !== 'closed' || data.activeTool !== 'console'
        ? {
            tools: {
              enabled: data.tools === 'none' ? [] : 'all',
              status: data.tools,
              active: data.activeTool,
            },
          }
        : {}),
      ...(data.readonly ? { readonly: data.readonly } : {}),
      ...(data.mode !== 'result' && data.activeEditor !== activeEditor
        ? { activeEditor: data.activeEditor }
        : {}),
    };
    const importId = urlObj.searchParams.get('x');
    return {
      ...(appUrl !== 'https://livecodes.io/' ? { appUrl } : {}),
      ...(Object.keys(config).length > 0 ? { config } : {}),
      ...(importId ? { import: importId } : {}),
      ...(data.lite ? { lite: data.lite } : {}),
      ...(data.loading !== 'lazy' ? { loading: data.loading } : {}),
      ...(data.view && data.view !== 'split' ? { view: data.view } : {}),
    };
  };

  const getIframeUrl = (data: FormData) => {
    const iframeUrl = new URL(shareUrl);
    iframeUrl.searchParams.set(data.lite ? 'lite' : 'embed', 'true');

    if (data.loading && data.loading !== 'lazy') {
      iframeUrl.searchParams.set('loading', String(data.loading));
    }
    if (data.view && data.view !== 'split') {
      iframeUrl.searchParams.set('view', String(data.view));
    }
    if (data.mode !== 'result' && data.activeEditor && data.activeEditor !== activeEditor) {
      iframeUrl.searchParams.set('activeEditor', String(data.activeEditor));
    }
    if (data.mode && data.mode !== defaultConfig.mode) {
      iframeUrl.searchParams.set('mode', String(data.mode));
    }
    if (data.theme && data.theme !== defaultConfig.theme) {
      iframeUrl.searchParams.set('theme', String(data.theme));
    }
    if (data.tools && (data.tools !== 'closed' || data.activeTool !== 'console')) {
      iframeUrl.searchParams.set(
        data.tools === 'none' ? 'tools' : String(data.activeTool),
        String(data.tools),
      );
    }
    if (data.readonly !== undefined) {
      iframeUrl.searchParams.set('readonly', String(data.readonly));
    }
    return decodeURIComponent(iframeUrl.href);
  };

  const codeTemlates = {
    cdn: (data: FormData) => {
      const containerId = getContainerId();
      const containerHtml = `<div id="${containerId}"></div>`;
      const options = getOptions(data);
      const formatted = JSON.stringify(options, null, 2);
      const indented = indentCode(formatted, 2);
      return `
${containerHtml}
<script src="${sdkUrl}"></script>
<script>
  const options = ${indented};
  livecodes.createPlayground("#${containerId}", options);
</script>
`.trimStart();
    },
    npm(data: FormData) {
      const options = getOptions(data);
      const formatted = JSON.stringify(options, null, 2);
      return `
import { createPlayground } from "livecodes";
const options = ${formatted};
createPlayground("#container", options);
`.trimStart();
    },
    react(data: FormData) {
      const options = getOptions(data);
      const formatted = JSON.stringify(options, null, 2);
      const indented = indentCode(formatted, 2);
      return `
import LiveCodes from "livecodes/react";
export default function App() {
  const options = ${indented};
  return <LiveCodes {...options}></LiveCodes>;
}
`.trimStart();
    },
    vue(data: FormData) {
      const options = getOptions(data);
      const formatted = JSON.stringify(options, null, 2);
      const indented = indentCode(formatted, 2);
      return `
<script setup>
  import LiveCodes from 'livecodes/vue';
  const options = ${indented};
</script>

<template>
  <LiveCodes v-bind="options" />
</template>
`.trimStart();
    },
    svelte(data: FormData) {
      const options = getOptions(data);
      const formatted = JSON.stringify(options, null, 2);
      const indented = indentCode(formatted, 2);
      return `
<script>
  import { onMount } from 'svelte';
  import { createPlayground } from 'livecodes';
  const options = ${indented};
  let container;
  let playground;
  onMount(() => {
    createPlayground(container, options).then((p) => (playground = p));
    return () => playground?.destroy();
  });
</script>

<div bind:this="{container}"></div>
`.trimStart();
    },
    iframe: (data: FormData) => {
      const iframeUrl = getIframeUrl(data);
      const nonEmbeddedUrl = new URL(iframeUrl);
      nonEmbeddedUrl.searchParams.delete('embed');
      nonEmbeddedUrl.searchParams.delete('lite');
      const projectUrl = decodeURIComponent(nonEmbeddedUrl.href);
      return `
<iframe title="${title}" scrolling="no" loading="lazy" style="height:300px; width: 100%; border:1px solid black; border-radius:5px;" src="${iframeUrl}">
  See the project <a href="${projectUrl}" target="_blank">${title}</a> on <a href="${livecodesUrl}" target="_blank">LiveCodes</a>.
</iframe>
`.trimStart();
    },
    html: (data: FormData) => {
      const { import: _, ...options } = getOptions(data);
      const projectConfig = {
        ...cloneObject<ContentConfig>(config),
        ...options.config,
      };
      (Object.keys(projectConfig) as Array<keyof ContentConfig>).forEach((key) => {
        if (
          JSON.stringify(projectConfig[key]) === JSON.stringify(defaultConfig[key]) ||
          (key === 'activeEditor' && projectConfig.activeEditor === 'markup') ||
          ['markup', 'style', 'script'].includes(key)
        ) {
          delete projectConfig[key];
        }
      });
      if (Object.keys(projectConfig).length > 0) {
        options.config = projectConfig;
      }
      const optionsAttr = escapeCode(JSON.stringify(options).replace(/'/g, '&#39;'));
      return `
<div class="livecodes" style="height: 300px;" data-options='${optionsAttr}'>
<pre data-lang="${config.markup.language}">${escapeCode(
        encodeHTML(config.markup.content || ''),
      )}</pre>
<pre data-lang="${config.style.language}">${escapeCode(
        encodeHTML(config.style.content || ''),
      )}</pre>
<pre data-lang="${config.script.language}">${escapeCode(
        encodeHTML(config.script.content || ''),
      )}</pre>
</div>
<script defer src="${sdkUrl}" data-prefill></script>
`.trimStart();
    },
  };

  const previousSelections: FormData = {
    view: 'split',
    tools: 'closed',
    activeTool: 'console',
  };

  const generateCode = async () => {
    const formData = Array.from(new FormData(form)).reduce(
      (acc, [name, value]) => ({
        ...acc,
        [name.replace('embed-', '')]: value === 'true' ? true : value,
      }),
      {} as FormData,
    );

    shareUrl = await getUrlFn(Boolean(formData.permanentUrl));
    urlObj = new URL(shareUrl);
    appUrl = urlObj.origin + urlObj.pathname;

    const viewInputs = document.querySelectorAll<HTMLInputElement>('input[name="embed-view"]');
    if (formData.mode !== 'full') {
      previousSelections.view = formData.view || previousSelections.view;
      delete formData.view;
      viewInputs.forEach((input) => {
        input.checked = false;
        input.disabled = true;
      });
    } else {
      viewInputs.forEach((input) => {
        if (input.value === (formData.view || previousSelections.view)) {
          input.checked = true;
        }
        input.disabled = false;
        if (input.checked) {
          formData.view = input.value;
        }
      });
    }

    const toolsInputs = document.querySelectorAll<HTMLInputElement>('input[name="embed-tools"]');
    const activeToolInputs = document.querySelectorAll<HTMLInputElement>(
      'input[name="embed-activeTool"]',
    );
    if (formData.lite) {
      previousSelections.tools = formData.tools || previousSelections.tools;
      delete formData.tools;
      toolsInputs.forEach((input) => {
        input.checked = false;
        input.disabled = true;
      });
    } else {
      toolsInputs.forEach((input) => {
        if (input.value === (formData.tools || previousSelections.tools)) {
          input.checked = true;
        }
        input.disabled = false;
        if (input.checked) {
          formData.tools = input.value;
        }
      });
    }

    if (formData.lite || formData.tools === 'none') {
      previousSelections.activeTool = formData.activeTool || previousSelections.activeTool;
      delete formData.activeTool;
      activeToolInputs.forEach((input) => {
        input.checked = false;
        input.disabled = true;
      });
    } else {
      activeToolInputs.forEach((input) => {
        if (input.value === (formData.activeTool || previousSelections.activeTool)) {
          input.checked = true;
        }
        input.disabled = false;
        if (input.checked) {
          formData.activeTool = input.value;
        }
      });
    }

    const activeEditorInputs = document.querySelectorAll<HTMLInputElement>(
      'input[name="embed-activeEditor"]',
    );
    activeEditorInputs.forEach((input) => {
      if (formData.mode === 'result') {
        input.checked = input.value === activeEditor;
        input.disabled = true;
        delete formData.activeEditor;
      } else {
        input.disabled = false;
      }
    });

    previewIframe.src = getIframeUrl(formData);
    const embedType = (formData as any).type;
    const code = (codeTemlates as any)[embedType]?.(formData);
    const embedTypeLanguages: Record<string, Language> = {
      npm: 'javascript',
      react: 'jsx',
    };
    const embedTypeLanguage = embedTypeLanguages[embedType] || 'html';
    if (editor.getLanguage() !== embedTypeLanguage) {
      editor.setLanguage(embedTypeLanguage, code);
    } else {
      editor.setValue(code);
    }
  };

  eventsManager.addEventListener(form, 'change', generateCode);

  eventsManager.addEventListener(copyBtn, 'click', async () => {
    if (copyToClipboard(editor.getValue())) {
      notifications.success('Code copied to clipboard');
    } else {
      notifications.error('Failed to copy to clipboard');
    }
  });

  generateCode();
};
