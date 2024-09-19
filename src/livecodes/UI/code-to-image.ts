/* eslint-disable import/no-internal-modules */
import type { createEventsManager } from '../events';
import type { createModal } from '../modal';
import type { CodeEditor, Config, EditorOptions, FormatFn, UserConfig } from '../models';
import { codeToImageScreen } from '../html';
import { defaultConfig } from '../config/default-config';
import { fonts, getFontFamily } from '../editor/fonts';
import { prismThemes } from '../editor/codejar/prism-themes';
import { getEditorSettingsFormatLink } from './selectors';

type PreviewEditorOptions = Pick<
  EditorOptions,
  'container' | 'editorTheme' | 'fontFamily' | 'fontSize' | 'lineNumbers'
>;

export const createCodeToImageUI = async ({
  modal,
  eventsManager,
  deps,
}: {
  modal: ReturnType<typeof createModal>;
  eventsManager: ReturnType<typeof createEventsManager>;
  deps: {
    getUserConfig: () => UserConfig;
    createEditor: (options: PreviewEditorOptions) => Promise<CodeEditor>;
    getFormatFn: () => Promise<FormatFn>;
    changeSettings: (newConfig: Partial<UserConfig>) => void;
  };
}) => {
  const userConfig = deps.getUserConfig();

  const div = document.createElement('div');
  div.innerHTML = codeToImageScreen;
  const codeToImageContainer = div.firstChild as HTMLElement;
  modal.show(codeToImageContainer, { isAsync: true });

  const previewContainer = codeToImageContainer.querySelector<HTMLElement>(
    '#code-to-img-preview-container',
  );
  const form = codeToImageContainer.querySelector<HTMLFormElement>('#code-to-img-form');
  if (!previewContainer || !form) return;

  interface FormField {
    title?: string;
    name: keyof UserConfig | `editorTheme-${Config['editor']}-${Config['theme']}`;
    options: Array<{ label?: string; value: string; checked?: boolean }>;
    help?: string;
  }
  const formFields: FormField[] = [
    {
      title: 'Editor Theme',
      name: 'editorTheme',
      options: prismThemes.map((t) => ({ label: t.title, value: t.name })),
    },
    {
      title: 'Font Family',
      name: 'fontFamily',
      options: [
        { label: 'Default', value: '' },
        ...fonts.map((font) => ({ label: font.label || font.name, value: font.name })),
      ],
    },
    {
      title: 'Font Size',
      name: 'fontSize',
      options: [
        { label: '10', value: '10' },
        { label: '11', value: '11' },
        { label: '12', value: '12' },
        { label: '13', value: '13' },
        { label: '14', value: '14', checked: true },
        { label: '15', value: '15' },
        { label: '16', value: '16' },
        { label: '17', value: '17' },
        { label: '18', value: '18' },
        { label: '19', value: '19' },
        { label: '20', value: '20' },
        { label: '22', value: '22' },
        { label: '24', value: '24' },
        { label: '26', value: '26' },
      ],
    },
    {
      title: 'Show line numbers',
      name: 'lineNumbers',
      options: [{ value: 'true' }],
    },
  ];

  const editorOptions: PreviewEditorOptions = {
    container: previewContainer,
    editorTheme: 'dracula',
    fontFamily: undefined,
    fontSize: undefined,
    lineNumbers: false,
  };

  const initializeEditor = async (options: PreviewEditorOptions) => {
    const ed = await deps.createEditor(options);
    deps.getFormatFn().then((fn) => {
      setTimeout(() => {
        ed.registerFormatter(fn);
      }, 500);
    });

    eventsManager.addEventListener(
      codeToImageContainer.querySelector<HTMLElement>('#code-to-img-format-link'),
      'click',
      (ev) => {
        ev.preventDefault();
        ed.format();
      },
    );
    return ed;
  };

  formFields.forEach((field) => {
    let title: HTMLElement | undefined;
    if (field.title) {
      title = document.createElement('label');
      title.innerHTML = field.title.replace(
        '*',
        `<a href="#codejar-info" class="hint--top" data-hint="Not available in CodeJar" style="text-decoration: none;">*</a>`,
      );
      title.dataset.name = field.name;
      form.appendChild(title);
    }

    const fieldContainer = document.createElement('div');
    fieldContainer.classList.add('input-container');
    form.appendChild(fieldContainer);

    const name = `code-to-img-${field.name}`;
    const optionValue = String(
      (editorOptions as any)[field.name] ?? (defaultConfig as any)[field.name] ?? '',
    );

    if (field.options.length > 4) {
      const select = document.createElement('select');
      select.name = name;
      fieldContainer.appendChild(select);
      field.options.forEach((option) => {
        const optionEl = document.createElement('option');
        optionEl.text = option.label || '';
        optionEl.value = option.value;
        optionEl.selected = optionValue === option.value || option.checked === true;
        select.appendChild(optionEl);
      });
      return;
    }

    field.options.forEach((option) => {
      const id = `${name}-${option.value}`;
      const isCheckBox = !option.label && option.value === 'true';

      const optionContainer = document.createElement('span');
      fieldContainer.appendChild(optionContainer);

      const input = document.createElement('input');
      input.type = isCheckBox ? 'checkbox' : 'radio';
      input.name = name;
      input.id = id;
      input.value = option.value;
      input.checked = optionValue === option.value;
      optionContainer.appendChild(input);

      if (isCheckBox) {
        input.classList.add('switch');
      } else {
        const label = document.createElement('label');
        label.classList.add('radio-label');
        label.htmlFor = id;
        label.innerHTML = option.label || '';
        optionContainer.appendChild(label);
      }
    });
  });

  const editor = await initializeEditor(editorOptions);

  const updateOptions = async () => {
    const formData = Array.from(new FormData(form)).reduce(
      (acc, [name, value]) => ({
        ...acc,
        [name.replace('code-to-img-', '')]:
          value === 'true'
            ? true
            : value === 'false'
            ? false
            : value === ''
            ? undefined
            : !isNaN(Number(value))
            ? Number(value)
            : value,
      }),
      {} as EditorOptions,
    );

    const booleanFields = formFields
      .filter(
        (field) =>
          field.options.length === 1 &&
          !field.options[0].label &&
          field.options[0].value === 'true',
      )
      .map((field) => field.name);

    booleanFields.forEach((key) => {
      if (!(key in formData)) {
        (formData as any)[key] = false;
      }
    });

    editor.changeSettings(formData);
  };

  eventsManager.addEventListener(form, 'change', () => updateOptions());
  updateOptions();
};

const editorContent = `
import React, { useState } from 'react';
import { createRoot } from "react-dom/client";

function App(props) {
  const [count, setCount] = useState(0);
  // increment on click!
  const onClick = () => setCount(count + 1);
  return (
    <div className="container">
      <h1>Hello, {props.name}!</h1>
      <img
        alt="a long alt attribute value that describes this image in details so that we can demonstrate word-wrap"
        className="logo"
        src="https://livecodes.io/livecodes/assets/templates/react.svg"
      />
      <p>You clicked {count === 0 ? 'zero' : count} times.</p>
      <button onClick={onClick}>Click me</button>
    </div>
  );
}

const root = createRoot(document.querySelector("#app"));
root.render(<App name="React" />);
`.trimStart();
