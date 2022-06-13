import { defaultConfig } from '../config';
import { createEventsManager } from '../events';
import { embedScreen } from '../html';
import { createModal } from '../modal';
import { CodeEditor } from '../models';
import { createNotifications } from '../notifications';
import { copyToClipboard } from '../utils';

export const createEmbedUI = async ({
  title,
  modal,
  notifications,
  eventsManager,
  createEditorFn,
  getUrlFn,
}: {
  title: string;
  modal: ReturnType<typeof createModal>;
  notifications: ReturnType<typeof createNotifications>;
  eventsManager: ReturnType<typeof createEventsManager>;
  createEditorFn: (container: HTMLElement) => Promise<CodeEditor>;
  getUrlFn: () => Promise<string>;
}) => {
  const div = document.createElement('div');
  div.innerHTML = embedScreen;
  const embedContainer = div.firstChild as HTMLElement;
  modal.show(embedContainer);

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
      | 'preview'
      | 'lite'
      | 'readonly'
      | 'mode'
      | 'view'
      | 'tools';
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
      title: 'Show Result Preview',
      name: 'preview',
      options: [{ value: 'true', checked: true }],
    },
    {
      title: 'Lite Mode',
      name: 'lite',
      options: [{ value: 'true', checked: false }],
      help: '/web/docs/features/lite',
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
      help: '/web/docs/features/display-modes',
    },
    {
      title: 'Default View',
      name: 'view',
      options: [
        { label: 'Editor + Result', value: 'editor,result', checked: true },
        { label: 'Editor', value: 'editor' },
        { label: 'Result', value: 'result' },
      ],
      help: '/web/docs/features/default-view',
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
      help: '/web/docs/features/tools-pane',
    },
    {
      title: 'Embed Type',
      name: 'type',
      options: [
        { label: 'Script (CDN)', value: 'cdn', checked: true },
        { label: 'Script (npm)', value: 'npm' },
        { label: 'Iframe', value: 'iframe' },
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
      helpLink.classList.add('embed-help-link');
      helpLink.title = 'Click for info...';
      title.appendChild(helpLink);

      const helpIcon: HTMLImageElement = document.createElement('img');
      helpIcon.src = '/livecodes/assets/icons/info.svg';
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
  const url = await getUrlFn();
  const urlObj = new URL(url);
  const appUrl = urlObj.origin + urlObj.pathname;

  const previewIframe: HTMLIFrameElement = document.createElement('iframe');
  previewIframe.id = 'embed-preview-iframe';
  previewContainer.innerHTML = '';
  previewContainer.appendChild(previewIframe);

  const getContainerId = () => 'livecodes-' + (Math.random() + 1).toString(36).substring(2);

  const getContainerHtml = (id: string) =>
    `<div id="${id}" style="height:300px; box-sizing: border-box; border:1px solid black; border-radius:3px; display:flex; align-items:center; justify-content:center; margin: 1em 0;">
  <span>See the project <a href="${url}" target="_blank">${title}</a> on <a href="${appUrl}" target="_blank">LiveCodes</a></span>
</div>`;

  const getOptions = (data: FormData) => ({
    appUrl: url,
    config: {
      ...(data.mode !== defaultConfig.mode ? { mode: data.mode } : {}),
      ...(data.theme !== defaultConfig.theme ? { theme: data.theme } : {}),
      ...(data.tools !== 'closed' ? { tools: { status: data.tools } } : {}),
      ...(data.readonly ? { readonly: data.readonly } : {}),
    },
    ...(data.lite ? { lite: data.lite } : {}),
    ...(data.loading !== 'lazy' ? { loading: data.loading } : {}),
    ...(data.preview !== true ? { preview: data.preview } : {}),
    ...(data.view && data.view !== 'editor,result' ? { view: data.view } : {}),
  });

  const getIframeUrl = (data: FormData) => {
    const iframeUrl = new URL(url);
    iframeUrl.searchParams.set(data.lite ? 'lite' : 'embed', 'true');

    if (data.loading && data.loading !== 'lazy') {
      iframeUrl.searchParams.set('loading', String(data.loading));
    }
    if (data.preview !== undefined) {
      iframeUrl.searchParams.set('preview', String(data.preview));
    }
    if (data.view && data.view !== 'editor,result') {
      iframeUrl.searchParams.set('view', String(data.view));
    }
    if (data.mode && data.mode !== defaultConfig.mode) {
      iframeUrl.searchParams.set('mode', String(data.mode));
    }
    if (data.theme && data.theme !== defaultConfig.theme) {
      iframeUrl.searchParams.set('theme', String(data.theme));
    }
    if (data.tools && data.tools !== 'closed') {
      iframeUrl.searchParams.set('tools', String(data.tools));
    }
    if (data.readonly !== undefined) {
      iframeUrl.searchParams.set('readonly', String(data.readonly));
    }
    return decodeURIComponent(iframeUrl.href);
  };

  const codeTemlates = {
    cdn: (data: FormData) => {
      const containerId = getContainerId();
      const containerHtml = getContainerHtml(containerId);
      const options = getOptions(data);
      return `${containerHtml}
<script src="${appUrl + 'lib/livecodes.js'}"></script>
<script>
const options = ${JSON.stringify(options, null, 2)};
livecodes.createPlayground("#${containerId}", options);
</script>
`;
    },
    npm(data: FormData) {
      const containerId = getContainerId();
      const containerHtml = getContainerHtml(containerId);
      const options = getOptions(data);
      return `${containerHtml}
<script type="module">
import { createPlayground } from "@live-codes/livecodes";
const options = ${JSON.stringify(options, null, 2)};
createPlayground("#${containerId}", options);
</script>
`;
    },
    iframe: (data: FormData) => {
      const iframeUrl = getIframeUrl(data);
      const nonEmbeddedUrl = new URL(iframeUrl);
      nonEmbeddedUrl.searchParams.delete('embed');
      nonEmbeddedUrl.searchParams.delete('lite');
      const projectUrl = decodeURIComponent(nonEmbeddedUrl.href);
      return `
<iframe title="${title}" scrolling="no" loading="lazy" style="height:300px; width: 100%; border:1px solid black; border-radius:3px; margin: 1em 0;" src="${iframeUrl}">
  See the project <a href="${projectUrl}" target="_blank">${title}</a> on <a href="${appUrl}" target="_blank">LiveCodes</a>
</iframe>
`.trimStart();
    },
  };

  const previousSelections: FormData = {
    view: 'editor,result',
    tools: 'closed',
    preview: true,
  };

  const generateCode = async () => {
    const formData = Array.from(new FormData(form)).reduce(
      (acc, [name, value]) => ({
        ...acc,
        [name.replace('embed-', '')]: value === 'yes' ? true : value === 'no' ? false : value,
      }),
      {} as FormData,
    );

    const previewInput = document.querySelector<HTMLInputElement>('input[name="embed-preview"]')!;
    if (formData.loading !== 'click') {
      previousSelections.preview = formData.preview ?? previousSelections.preview;
      delete formData.preview;
      previewInput.checked = false;
      previewInput.disabled = true;
    } else {
      if (
        previousSelections.preview !== undefined &&
        typeof previousSelections.preview === 'boolean'
      ) {
        previewInput.checked = previousSelections.preview;
      }
      previewInput.disabled = false;
      previousSelections.preview = undefined;
      formData.preview = previewInput.checked;
    }

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

    previewIframe.src = getIframeUrl(formData);
    const html = (codeTemlates as any)[(formData as any).type]?.(formData);
    editor.setValue(html);
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
