import type { CodeEditor, EditorOptions } from '../models';
import { createFakeEditor } from './fake-editor';

export const createBinaryFileEditor = (options: EditorOptions): CodeEditor => {
  if (!options.container) return createFakeEditor(options);
  const container = document.createElement('div');
  container.classList.add('binary-file-editor');
  options.container.appendChild(container);

  const editor = createFakeEditor(options);

  type Listener = () => void;
  const listeners: Listener[] = [];
  const onContentChanged = (fn: Listener) => {
    listeners.push(fn);
  };

  const setValue = (value: string = '') => {
    editor.setValue(value);
    listeners.forEach((fn) => fn());
    if (!value) {
      showFileSelector();
    }
  };

  const fileSelector = document.createElement('input');
  fileSelector.type = 'file';
  fileSelector.onchange = (ev) => {
    const file = (ev.target as HTMLInputElement).files?.[0];
    if (!file) return;

    // Max 2 MB allowed
    const maxSizeAllowed = 2 * 1024 * 1024;
    if (file.size > maxSizeAllowed) {
      alert(
        window.deps.translateString(
          'generic.error.exceededSize',
          'Error: Exceeded size {{size}} MB',
          { size: 2 },
        ),
      );
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setValue(reader.result as string);
      showFile();
    };
    reader.readAsDataURL(file);
  };

  const showFileSelector = () => {
    const btn = document.createElement('button');
    btn.innerHTML = window.deps.translateString('app.binaryFileEditor.selectFile', 'Select file');
    btn.onclick = () => fileSelector.click();
    container.innerHTML = '';
    container.appendChild(btn);
  };

  const showFile = () => {
    const src = editor.getValue();

    if (!src) {
      showFileSelector();
      return;
    }

    let display;
    if (src.startsWith('data:video')) {
      display = document.createElement('video');
      display.src = src;
    } else {
      display = document.createElement('img');
      if (src.startsWith('data:image')) {
        display.src = src;
      } else if (src.startsWith('data:audio')) {
        display.src = options.baseUrl + 'assets/images/audio.svg';
        display.classList.add('icon');
      } else if (src.startsWith('data:font')) {
        display.src = options.baseUrl + 'assets/images/font.svg';
        display.classList.add('icon');
      } else {
        display.src = options.baseUrl + 'assets/images/file.svg';
        display.classList.add('icon');
      }
    }

    const link = document.createElement('a');
    link.title = window.deps.translateString('app.binaryFileEditor.selectFile', 'Select file');
    link.onclick = (ev) => {
      ev.preventDefault();
      fileSelector.click();
    };
    link.appendChild(display);

    container.innerHTML = '';
    container.appendChild(link);
  };

  if (!editor.getValue()) {
    showFileSelector();
  } else {
    showFile();
  }

  const destroy = () => {
    listeners.length = 0;
    container.remove();
  };

  return {
    ...editor,
    setValue,
    onContentChanged,
    destroy,
  };
};
