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

  const form = embedContainer.querySelector<HTMLFormElement>('#embed-form');
  const codeArea = embedContainer.querySelector<HTMLFormElement>('#embed-code');
  const copyBtn = embedContainer.querySelector<HTMLFormElement>('#embed-copy-btn');
  if (!form || !codeArea || !copyBtn) return;

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
    options: Array<{ label: string; value: string; selected?: boolean }>;
    help?: string;
  }
  const formFields: FormField[] = [
    {
      title: 'Theme',
      name: 'theme',
      options: [
        { label: 'Dark', value: 'dark', selected: true },
        { label: 'Light', value: 'light' },
      ],
    },
    {
      title: 'Loading',
      name: 'loading',
      options: [
        { label: 'Lazy', value: 'lazy', selected: true },
        { label: 'On-click', value: 'click' },
        { label: 'Eager', value: 'eager' },
      ],
    },
    {
      title: 'Show Preview',
      name: 'preview',
      options: [
        { label: 'Yes', value: 'yes', selected: true },
        { label: 'No', value: 'no' },
      ],
    },
    {
      title: 'Lite Mode',
      name: 'lite',
      options: [
        { label: 'Yes', value: 'yes' },
        { label: 'No', value: 'no', selected: true },
      ],
    },
    {
      title: 'Read only',
      name: 'readonly',
      options: [
        { label: 'Yes', value: 'yes' },
        { label: 'No', value: 'no', selected: true },
      ],
    },
    {
      title: 'Playground Mode',
      name: 'mode',
      options: [
        { label: 'Full', value: 'full', selected: true },
        { label: 'Editor', value: 'editor' },
        { label: 'Code Block', value: 'codeblock' },
        { label: 'Result', value: 'result' },
      ],
    },
    {
      title: 'Default View',
      name: 'view',
      options: [
        { label: 'Editor + Result', value: 'editor,result', selected: true },
        { label: 'Editor', value: 'editor' },
        { label: 'Result', value: 'result' },
      ],
    },
    {
      title: 'Tools',
      name: 'tools',
      options: [
        { label: 'Closed', value: 'closed', selected: true },
        { label: 'Open', value: 'open' },
        { label: 'Full', value: 'full' },
        { label: 'None', value: 'none' },
      ],
    },
    {
      title: 'Embed Type',
      name: 'type',
      options: [
        { label: 'Script (CDN)', value: 'cdn', selected: true },
        { label: 'Script (npm)', value: 'npm' },
        { label: 'Iframe', value: 'iframe' },
      ],
    },
  ];

  formFields.forEach((field) => {
    const title = document.createElement('label');
    title.innerHTML = field.title;
    form.appendChild(title);

    const fieldContainer = document.createElement('div');
    fieldContainer.classList.add('input-container');
    form.appendChild(fieldContainer);

    field.options.forEach((option) => {
      const name = `embed-${field.name}`;
      const id = `${name}-${option.value}`;

      const optionContainer = document.createElement('span');
      fieldContainer.appendChild(optionContainer);

      const input = document.createElement('input');
      input.type = 'radio';
      input.name = name;
      input.id = id;
      input.value = option.value;
      input.checked = option.selected || false;
      optionContainer.appendChild(input);

      const label = document.createElement('label') as HTMLLabelElement;
      label.classList.add('radio-label');
      label.htmlFor = id;
      label.innerHTML = option.label;
      optionContainer.appendChild(label);
    });
  });

  type FormData = {
    [key in FormField['name']]: string | boolean;
  };

  const editor = await createEditorFn(codeArea);
  const url = await getUrlFn();
  const urlObj = new URL(url);
  const appUrl = urlObj.origin + urlObj.pathname;
  const codeTemlates = {
    cdn: (data: FormData, lib = appUrl + 'lib/livecodes.esm.js') => {
      const options = {
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
        ...(data.view !== 'editor,result' ? { view: data.view } : {}),
      };
      return `
<div id="container" style="height:300px; box-sizing: border-box; border:1px solid black; border-radius:3px; display:flex; align-items:center; justify-content:center; margin: 1em 0;">
  <span>See the project <a href="${url}" target="_blank">${title}</a> on <a href="${appUrl}" target="_blank">LiveCodes</a></span>
</div>
<script type="module">
import { createPlayground } from "${lib}";
const options = ${JSON.stringify(options, null, 2)};
createPlayground("#container", options);
</script>
`.trimStart();
    },
    npm(data: FormData) {
      return this.cdn(data, '@live-codes/livecodes');
    },
    iframe: ``,
  };

  const generateCode = async () => {
    const formData = Array.from(new FormData(form)).reduce(
      (acc, [name, value]) => ({
        ...acc,
        [name.replace('embed-', '')]: value === 'yes' ? true : value === 'no' ? false : value,
      }),
      {} as FormData,
    );

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
