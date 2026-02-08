import { getEditorConfig, getFormatterConfig } from '../config/config';
import { defaultConfig } from '../config/default-config';
import { prismThemes } from '../editor/codejar/prism-themes';
import { codemirrorThemes } from '../editor/codemirror/codemirror-themes';
import type { createEditor } from '../editor/create-editor';
import { fonts, getFontFamily } from '../editor/fonts';
import { monacoThemes } from '../editor/monaco/monaco-themes';
import { getEditorTheme } from '../editor/themes';
import { editorSettingsScreen } from '../html';
import type {
  Config,
  EditorLibrary,
  EditorOptions,
  EventsManager,
  FormatFn,
  Modal,
  UserConfig,
} from '../models';
import { preventFocus } from '../utils/utils';
import { getEditorSettingsFormatLink } from './selectors';

export const createEditorSettingsUI = async ({
  baseUrl,
  modal,
  eventsManager,
  scrollToSelector,
  deps,
}: {
  baseUrl: string;
  modal: Modal;
  eventsManager: EventsManager;
  scrollToSelector: string;
  deps: {
    getUserConfig: () => UserConfig;
    createEditor: typeof createEditor;
    loadTypes: (code: string) => Promise<EditorLibrary[]>;
    getFormatFn: () => Promise<FormatFn>;
    changeSettings: (newConfig: Partial<UserConfig>) => void;
  };
}) => {
  const userConfig = deps.getUserConfig();

  const div = document.createElement('div');
  div.innerHTML = editorSettingsScreen;
  const editorSettingsContainer = div.firstChild as HTMLElement;
  modal.show(editorSettingsContainer, {
    isAsync: true,
    scrollToSelector,
    onClose: () => {
      editor?.destroy();
    },
  });

  const previewContainer = editorSettingsContainer.querySelector<HTMLElement>(
    '#editor-settings-preview-container',
  );
  const form = editorSettingsContainer.querySelector<HTMLFormElement>('#editor-settings-form');
  if (!previewContainer || !form) return;

  const defaultText = window.deps.translateString('editorSettings.default', 'Default');

  interface FormField {
    title?: string;
    name:
      | keyof UserConfig
      | 'lineNumbersRelative'
      | `editorTheme-${Config['editor']}-${Config['theme']}`;
    options: Array<{ label?: string; value: string; checked?: boolean }>;
    help?: string;
    note?: string;
  }
  const formFields: FormField[] = [
    // {
    //   title: window.deps.translateString(
    //     'editorSettings.enableAI.heading',
    //     'Enable AI Code Assistant',
    //   ),
    //   name: 'enableAI',
    //   options: [{ value: 'true' }],
    //   help: `${process.env.DOCS_BASE_URL}features/ai`,
    //   note: window.deps.translateString(
    //     'editorSettings.enableAI.note',
    //     'Powered by <a href="https://windsurf.com/" rel="noopener noreferrer" target="_blank"><img id="windsurf-logo" src="{{baseUrl}}assets/images/windsurf.svg" style="height: 3em; translate: 0 40%; margin-top: -2em;" alt="Windsurf" /></a>',
    //     {
    //       isHTML: true,
    //       baseUrl,
    //     },
    //   ),
    // },
    {
      title: window.deps.translateString('editorSettings.editor.heading', 'Editor'),
      name: 'editor',
      options: [
        {
          label: defaultText,
          value: '',
        },
        {
          label: window.deps.translateString('editorSettings.editor.monaco', 'Monaco'),
          value: 'monaco',
        },
        {
          label: window.deps.translateString('editorSettings.editor.codemirror', 'CodeMirror'),
          value: 'codemirror',
        },
        {
          label: window.deps.translateString('editorSettings.editor.codejar', 'CodeJar'),
          value: 'codejar',
        },
      ],
      help: `${process.env.DOCS_BASE_URL}features/editor-settings#code-editor`,
    },
    {
      title: window.deps.translateString('editorSettings.theme', 'Dark Mode'),
      name: 'theme',
      options: [{ value: 'true' }],
    },
    {
      title: window.deps.translateString('editorSettings.editorTheme', 'Editor Theme'),
      name: 'editorTheme-monaco-dark',
      options: [
        { label: defaultText, value: '' },
        ...monacoThemes.map((t) => ({ label: t.title, value: `monaco:${t.name}@dark` })),
      ],
    },
    {
      name: 'editorTheme-monaco-light',
      options: [
        { label: defaultText, value: '' },
        ...monacoThemes.map((t) => ({ label: t.title, value: `monaco:${t.name}@light` })),
      ],
    },
    {
      name: 'editorTheme-codemirror-dark',
      options: [
        { label: defaultText, value: '' },
        ...codemirrorThemes.map((t) => ({ label: t.title, value: `codemirror:${t.name}@dark` })),
      ],
    },
    {
      name: 'editorTheme-codemirror-light',
      options: [
        { label: defaultText, value: '' },
        ...codemirrorThemes.map((t) => ({ label: t.title, value: `codemirror:${t.name}@light` })),
      ],
    },
    {
      name: 'editorTheme-codejar-dark',
      options: [
        { label: defaultText, value: '' },
        ...prismThemes.map((t) => ({ label: t.title, value: `codejar:${t.name}@dark` })),
      ],
    },
    {
      name: 'editorTheme-codejar-light',
      options: [
        { label: defaultText, value: '' },
        ...prismThemes.map((t) => ({ label: t.title, value: `codejar:${t.name}@light` })),
      ],
    },
    {
      title: window.deps.translateString('editorSettings.fontFamily', 'Font Family'),
      name: 'fontFamily',
      options: [
        { label: defaultText, value: '' },
        ...fonts.map((font) => ({ label: font.label || font.name, value: font.name })),
      ],
    },
    {
      title: window.deps.translateString('editorSettings.fontSize', 'Font Size'),
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
      title: window.deps.translateString('editorSettings.useTabs.heading', 'Indentation'),
      name: 'useTabs',
      options: [
        {
          label: window.deps.translateString('editorSettings.useTabs.spaces', 'Spaces'),
          value: 'false',
        },
        {
          label: window.deps.translateString('editorSettings.useTabs.tabs', 'Tabs'),
          value: 'true',
        },
      ],
    },
    {
      title: window.deps.translateString('editorSettings.tabSize', 'Tab Size'),
      name: 'tabSize',
      options: [
        { label: '1', value: '1' },
        { label: '2', value: '2', checked: true },
        { label: '3', value: '3' },
        { label: '4', value: '4' },
        { label: '5', value: '5' },
        { label: '6', value: '6' },
      ],
    },
    {
      title: window.deps.translateString('editorSettings.lineNumbers', 'Show line numbers'),
      name: 'lineNumbers',
      options: [{ value: 'true' }],
    },
    {
      title: window.deps.translateString(
        'editorSettings.lineNumbersRelative',
        'Relative line numbers *',
      ),
      name: 'lineNumbersRelative',
      options: [{ value: 'true' }],
    },
    {
      title: window.deps.translateString('editorSettings.wordWrap', 'Word-wrap'),
      name: 'wordWrap',
      options: [{ value: 'true' }],
    },
    {
      title: window.deps.translateString(
        'editorSettings.closeBrackets',
        'Auto-close brackets and quotes',
      ),
      name: 'closeBrackets',
      options: [{ value: 'true' }],
    },
    {
      title: window.deps.translateString('editorSettings.foldRegions', 'Fold (collapse) regions *'),
      name: 'foldRegions',
      options: [{ value: 'true' }],
      help: `${process.env.DOCS_BASE_URL}configuration/configuration-object#foldregions`,
    },
    {
      title: window.deps.translateString('editorSettings.emmet', 'Enable Emmet *'),
      name: 'emmet',
      options: [{ value: 'true' }],
    },
    {
      title: window.deps.translateString('editorSettings.editorMode.heading', 'Editor Mode *'),
      name: 'editorMode',
      options: [
        { label: defaultText, value: '' },
        {
          label: window.deps.translateString('editorSettings.editorMode.vim', 'Vim'),
          value: 'vim',
        },
        {
          label: window.deps.translateString('editorSettings.editorMode.emacs', 'Emacs'),
          value: 'emacs',
        },
      ],
      help: `${process.env.DOCS_BASE_URL}features/editor-settings#editor-modes`,
    },
    {
      title: window.deps.translateString('editorSettings.semicolons', 'Format: Use Semicolons'),
      name: 'semicolons',
      options: [{ value: 'true' }],
    },
    {
      title: window.deps.translateString('editorSettings.singleQuote', 'Format: Use Single Quotes'),
      name: 'singleQuote',
      options: [{ value: 'true' }],
    },
    {
      title: window.deps.translateString(
        'editorSettings.trailingComma',
        'Format: Use Trailing Commas',
      ),
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
    isLite: false,
    isHeadless: false,
    language: 'jsx',
    mapLanguage: () => 'javascript',
    readonly: false,
    value: editorContent,
    ...getEditorConfig(userConfig),
    ...getFormatterConfig(userConfig),
    getFormatterConfig: () => getFormatterConfig(deps.getUserConfig()),
    getFontFamily,
  };
  let codeEditor = editorOptions.editor;

  const initializeEditor = async (options: EditorOptions) => {
    const ed = await deps.createEditor(options);
    if (typeof ed.addTypes === 'function') {
      deps.loadTypes(editorContent).then((types) => {
        types.forEach((type) => {
          ed?.addTypes?.(type);
        });
      });
    }
    deps.getFormatFn().then((fn) => {
      setTimeout(() => {
        ed.registerFormatter(fn);
        ed.format();
      }, 500);
    });

    getEditorSettingsFormatLink(editorSettingsContainer).onclick = (ev) => {
      ev.preventDefault();
      ed.format();
    };
    return ed;
  };

  const allThemes: Array<`editorTheme-${Config['editor']}-${Config['theme']}`> = [
    'editorTheme-monaco-dark',
    'editorTheme-monaco-light',
    'editorTheme-codemirror-dark',
    'editorTheme-codemirror-light',
    'editorTheme-codejar-dark',
    'editorTheme-codejar-light',
  ];

  formFields.forEach((field) => {
    let title: HTMLElement | undefined;
    if (field.title) {
      title = document.createElement('label');
      title.innerHTML = field.title.replace(
        '*',
        `<a href="#codejar-info" title="${window.deps.translateString('editorSettings.notAvailableInCodeJar', 'Not available in CodeJar')}" style="text-decoration: none;">*</a>`,
      );
      title.dataset.name = field.name;
      form.appendChild(title);
    }

    if (field.help) {
      const helpLink: HTMLAnchorElement = document.createElement('a');
      helpLink.href = field.help;
      helpLink.target = '_blank';
      helpLink.classList.add('help-link');
      helpLink.title = window.deps.translateString('generic.clickForInfo', 'Click for info...');
      title?.appendChild(helpLink);

      const helpIcon: HTMLSpanElement = document.createElement('span');
      helpIcon.classList.add('icon-info');
      helpLink.appendChild(helpIcon);
    }

    const fieldContainer = document.createElement('div');
    fieldContainer.classList.add('input-container');
    form.appendChild(fieldContainer);

    const name = `editor-settings-${field.name}`;
    const getOptionValue = (name: string) =>
      String(
        (editorOptions as any)[name] ??
          (userConfig as any)[name] ??
          (defaultConfig as any)[name] ??
          '',
      );
    const optionValue = getOptionValue(field.name);

    if (field.options.length > 4) {
      const select = document.createElement('select');
      select.name = name;
      fieldContainer.appendChild(select);

      let selectedThemeValue: string = '';
      if (field.name.startsWith('editorTheme-')) {
        const [_, thisEditor, thisTheme] = field.name.split('-');

        const selectedTheme = getEditorTheme({
          editor: thisEditor as Config['editor'],
          theme: thisTheme as Config['theme'],
          editorTheme: editorOptions.editorTheme,
          editorThemes:
            thisEditor === 'monaco'
              ? monacoThemes.map((t) => t.name)
              : thisEditor === 'codemirror'
                ? codemirrorThemes.map((t) => t.name)
                : prismThemes.map((t) => t.name),
        });
        if (selectedTheme) {
          selectedThemeValue = `${thisEditor}:${selectedTheme}@${thisTheme}`;
        }
      }
      field.options.forEach((option) => {
        const optionEl = document.createElement('option');
        optionEl.text = option.label || '';
        optionEl.value = option.value;
        if (field.name.startsWith('editorTheme-')) {
          optionEl.selected = selectedThemeValue === option.value;
        } else {
          optionEl.selected = optionValue === option.value || option.checked === true;
        }
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
      input.checked =
        field.name === 'theme'
          ? optionValue === 'dark'
          : field.name === 'lineNumbers'
            ? optionValue === 'true' || optionValue === 'relative'
            : optionValue === option.value;

      if (field.name === 'lineNumbersRelative') {
        input.checked = getOptionValue('lineNumbers') === 'relative';
        input.disabled = getOptionValue('lineNumbers') === 'false';
      }

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

    if (field.note) {
      const note = document.createElement('div');
      note.classList.add('input-container', 'field-note');
      note.innerHTML = field.note;
      form.appendChild(note);
    }
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
              : value === ''
                ? undefined
                : !isNaN(Number(value))
                  ? Number(value)
                  : value,
      }),
      {} as EditorOptions & { lineNumbersRelative?: boolean },
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
      if (key === 'theme') {
        formData.theme = (formData.theme as any) === true ? 'dark' : 'light';
      }
      if (
        key === 'lineNumbersRelative' &&
        formData.lineNumbersRelative === true &&
        formData.lineNumbers === true
      ) {
        formData.lineNumbers = 'relative';
      }
    });

    const relativeLineNumbersField = form.querySelector<HTMLInputElement>(
      '[name="editor-settings-lineNumbersRelative"]',
    );
    if (relativeLineNumbersField) {
      relativeLineNumbersField.checked = formData.lineNumbers === 'relative';
      relativeLineNumbersField.disabled = formData.lineNumbers === false;
    }
    delete formData.lineNumbersRelative;

    formData.editorTheme = allThemes
      .map((name) => (formData as any)[name])
      .filter(Boolean)
      .join(', ');
    allThemes.forEach((name) => {
      delete (formData as any)[name];
    });

    if (formData.editor === codeEditor) {
      editor.changeSettings(formData);
    } else {
      const value = editor.getValue();
      editor.destroy();
      editor = await initializeEditor({
        ...editorOptions,
        ...getEditorConfig(formData as any),
        value,
      });
    }

    // const windsurfLogo = document.getElementById('windsurf-logo')!;
    // if (formData.theme === 'light') {
    //   windsurfLogo.style.filter = 'invert(1)';
    // } else {
    //   windsurfLogo.style.filter = 'unset';
    // }

    if (!init) {
      deps.changeSettings(formData);
      codeEditor = formData.editor;
    }

    const prefix = 'editor-settings-editorTheme-';
    const editorThemes: Record<
      `${Exclude<Config['editor'], 'auto' | undefined>}-${Config['theme']}`,
      HTMLElement | null
    > = {
      'monaco-dark': form.querySelector(`[name="${prefix}monaco-dark"]`),
      'monaco-light': form.querySelector(`[name="${prefix}monaco-light"]`),
      'codemirror-dark': form.querySelector(`[name="${prefix}codemirror-dark"]`),
      'codemirror-light': form.querySelector(`[name="${prefix}codemirror-light"]`),
      'codejar-dark': form.querySelector(`[name="${prefix}codejar-dark"]`),
      'codejar-light': form.querySelector(`[name="${prefix}codejar-light"]`),
    };
    const currentEditor = editor.monaco ? 'monaco' : editor.codemirror ? 'codemirror' : 'codejar';
    const currentTheme = formData.theme;
    const keys = Object.keys(editorThemes);
    keys.forEach((key) => {
      if (!key) return;
      const editorTheme = (editorThemes as any)[key];
      if (!editorTheme) return;
      if (key === `${currentEditor}-${currentTheme}`) {
        editorTheme.parentElement!.hidden = false;
      } else {
        editorTheme.parentElement!.hidden = true;
      }
    });
  };

  preventFocus(previewContainer);
  eventsManager.addEventListener(form, 'change', () => updateOptions());
  updateOptions(true);
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

const root = createRoot(document.querySelector("#root"));
root.render(<App name="React" />);
`.trimStart();
