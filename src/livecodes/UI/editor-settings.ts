/* eslint-disable import/no-internal-modules */
import type { createEventsManager } from '../events';
import type { createModal } from '../modal';
import type { EditorOptions, FormatFn, UserConfig } from '../models';
import type { createEditor } from '../editor/create-editor';
import { editorSettingsScreen } from '../html';
import { getEditorConfig, getFormatterConfig } from '../config/config';
import { defaultConfig } from '../config/default-config';
import { getEditorSettingsFormatLink } from './selectors';

export const createEditorSettingsUI = async ({
  baseUrl,
  modal,
  eventsManager,
  deps,
}: {
  baseUrl: string;
  modal: ReturnType<typeof createModal>;
  eventsManager: ReturnType<typeof createEventsManager>;
  deps: {
    getUserConfig: () => UserConfig;
    createEditor: typeof createEditor;
    getFormatFn: () => Promise<FormatFn>;
    changeSettings: (newConfig: Partial<UserConfig>) => void;
  };
}) => {
  const userConfig = deps.getUserConfig();

  const div = document.createElement('div');
  div.innerHTML = editorSettingsScreen;
  const editorSettingsContainer = div.firstChild as HTMLElement;
  modal.show(editorSettingsContainer, { isAsync: true });

  const previewContainer = editorSettingsContainer.querySelector<HTMLElement>(
    '#editor-settings-preview-container',
  );
  const form = editorSettingsContainer.querySelector<HTMLFormElement>('#editor-settings-form');
  if (!previewContainer || !form) return;

  interface FormField {
    title: string;
    name: keyof UserConfig;
    options: Array<{ label?: string; value: string; checked?: boolean }>;
    help?: string;
  }
  const formFields: FormField[] = [
    {
      title: 'Editor',
      name: 'editor',
      options: [
        { label: 'Default', value: '' },
        { label: 'Monaco', value: 'monaco' },
        { label: 'CodeMirror', value: 'codemirror' },
        { label: 'CodeJar', value: 'codejar' },
      ],
      help: '/docs/features/editors',
    },
    {
      title: 'Font Family',
      name: 'fontFamily',
      options: [
        { label: 'Fira Code', value: 'Fira Code' },
        { label: 'On-click', value: 'click' },
        { label: 'Eager', value: 'eager' },
      ],
    },
    {
      title: 'Font Size',
      name: 'fontSize',
      options: [
        { label: '10', value: '10' },
        { label: '12', value: '12' },
        { label: '14', value: '14' },
        { label: '16', value: '16' },
        { label: '18', value: '18' },
        { label: '20', value: '20' },
        { label: '22', value: '22' },
        { label: '24', value: '24' },
        { label: '26', value: '26' },
      ],
    },
    {
      title: 'Indentation',
      name: 'useTabs',
      options: [
        { label: 'Spaces', value: 'false' },
        { label: 'Tabs', value: 'true' },
      ],
    },
    {
      title: 'Tab Size',
      name: 'tabSize',
      options: [
        { label: '1', value: '1' },
        { label: '2', value: '2' },
        { label: '3', value: '8' },
        { label: '4', value: '4' },
        { label: '5', value: '4' },
        { label: '6', value: '6' },
      ],
    },
    {
      title: 'Show line numbers',
      name: 'lineNumbers',
      options: [{ value: 'true' }],
    },
    {
      title: 'Word-wrap',
      name: 'wordWrap',
      options: [{ value: 'true' }],
    },
    {
      title: 'Auto-close brackets and quotes',
      name: 'closeBrackets',
      options: [{ value: 'true' }],
    },
    {
      title: 'Enable Emmet',
      name: 'emmet',
      options: [{ value: 'true' }],
    },
    {
      title: 'Format: Use Semicolons',
      name: 'semicolons',
      options: [{ value: 'true' }],
    },
    {
      title: 'Format: Use Single Quote',
      name: 'singleQuote',
      options: [{ value: 'true' }],
    },
    {
      title: 'Format: Use Trailing Comma',
      name: 'trailingComma',
      options: [{ value: 'true' }],
    },
  ];

  const editorOptions: EditorOptions = {
    baseUrl,
    container: previewContainer,
    editorId: 'editorSettings',
    getLanguageExtension: () => 'jsx',
    isEmbed: false,
    language: 'jsx',
    mapLanguage: () => 'typescript',
    readonly: false,
    theme: userConfig.theme,
    value: editorContent,
    ...getEditorConfig(userConfig),
    ...getFormatterConfig(userConfig),
    getFormatterConfig: () => getFormatterConfig(deps.getUserConfig()),
  };
  let codeEditor = editorOptions.editor;

  const initializeEditor = async (options: EditorOptions) => {
    const ed = await deps.createEditor(options);
    deps.getFormatFn().then((fn) => {
      setTimeout(() => {
        editor.registerFormatter(fn);
      }, 1000);
    });

    getEditorSettingsFormatLink(editorSettingsContainer).onclick = (ev) => {
      ev.preventDefault();
      ed.format();
    };
    return ed;
  };

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

    const name = `editor-settings-${field.name}`;
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
        optionEl.selected = optionValue === option.value;
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
        const label = document.createElement('label') as HTMLLabelElement;
        label.classList.add('radio-label');
        label.htmlFor = id;
        label.innerHTML = option.label || '';
        optionContainer.appendChild(label);
      }
    });
  });

  let editor = await initializeEditor(editorOptions);

  const updateOptions = async (init?: boolean) => {
    const formData = Array.from(new FormData(form)).reduce(
      (acc, [name, value]) => ({
        ...acc,
        [name.replace('editor-settings-', '')]:
          value === 'true'
            ? true
            : value === 'false'
            ? false
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

    if (formData.editor === codeEditor) {
      editor.changeSettings(formData);
    } else {
      editor.destroy();
      editor = await initializeEditor({
        ...editorOptions,
        ...getEditorConfig(formData as any),
      });
    }
    // console.log(formData);
    if (!init) {
      deps.changeSettings(formData);
      codeEditor = formData.editor;
    }
  };

  eventsManager.addEventListener(form, 'change', () => updateOptions());

  updateOptions(true);
};

const editorContent = `
import React, { useState } from "react";
import ReactDOM from "react-dom";

function App(props) {
  const [count, setCount] = useState(0);

  return (
    <div className="container">
      <h1>Hello, {props.name}!</h1>
      <img className="logo" title="a long title to demonstrate word-wrap" src="https://livecodes.io/livecodes/assets/templates/react.svg" />
      <p>You clicked {count} times.</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}
ReactDOM.render(<App name="React" />, document.querySelector("#app"));
`.trimStart();
