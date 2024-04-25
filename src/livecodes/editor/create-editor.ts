import type { CodeEditor, Config, EditorOptions } from '../models';
import { isMobile, loadStylesheet } from '../utils';
import { createFakeEditor } from './fake-editor';
import { fonts } from './fonts';

const getEditorFileName = (editorName: Exclude<Config['editor'], ''>) =>
  editorName === 'codemirror'
    ? `{{hash:codemirror.js}}`
    : editorName === 'codejar'
      ? '{{hash:codejar.js}}'
      : '{{hash:monaco.js}}';

const loadEditor = async (editorName: Exclude<Config['editor'], ''>, options: EditorOptions) => {
  const { baseUrl } = options;
  const fileName = getEditorFileName(editorName);
  const editorUrl = baseUrl + fileName;

  let editorModule = (window as any)[editorUrl];
  if (!editorModule) {
    editorModule = await import(editorUrl);
    (window as any)[editorUrl] = editorModule;
  }
  const createCodeEditor: (options: EditorOptions) => Promise<CodeEditor> =
    editorModule.createEditor;
  const codeEditor = await createCodeEditor(options);
  return codeEditor;
};

const selectEditor = (options: EditorOptions & { activeEditor?: Config['activeEditor'] }) => {
  const { editor, mode, editorId, activeEditor, isHeadless } = options;
  return (
    (isHeadless
      ? 'fake'
      : mode === 'result' && editorId !== 'console' && editorId !== 'compiled'
        ? 'fake'
        : mode === 'simple' && editorId !== activeEditor
          ? 'fake'
          : ['codemirror', 'monaco', 'codejar'].includes(editor || '')
            ? editor
            : mode === 'simple' && editorId === activeEditor
              ? 'codemirror'
              : mode === 'codeblock'
                ? 'codejar'
                : isMobile()
                  ? 'codemirror'
                  : 'monaco') || 'monaco'
  );
};

const getEditorOptions = (options: EditorOptions): EditorOptions => {
  const codeblockOptions = {
    ...options,
    readOnly: true,
  };
  const compiledCodeOptions = {
    ...options,
    readOnly: true,
  };
  const consoleOptions = {
    ...options,
    lineNumbers: false,
  };
  const embedOptions = {
    ...options,
    lineNumbers: false,
    readOnly: true,
  };
  const editorId = options.editorId;
  return editorId === 'console'
    ? consoleOptions
    : editorId === 'compiled'
      ? compiledCodeOptions
      : editorId === 'embed'
        ? embedOptions
        : options.mode === 'codeblock'
          ? codeblockOptions
          : options;
};

const loadFont = (fontName: string) => {
  if (!fontName) return;
  const font = fonts.find((f) => [f.id, f.name, f.label].includes(fontName));
  if (!font) return;
  loadStylesheet(font.url, 'font-' + font.id);
};

export const createEditor = async (
  options: EditorOptions & { activeEditor?: Config['activeEditor'] },
) => {
  if (!options) throw new Error();

  const editorOptions = getEditorOptions(options);

  const editorName = selectEditor(editorOptions);
  if (editorName === 'fake') return createFakeEditor(editorOptions);

  if (editorOptions.fontFamily) {
    loadFont(editorOptions.fontFamily);
  }
  const codeEditor = await loadEditor(editorName, editorOptions);

  const changeSettings = codeEditor.changeSettings;
  codeEditor.changeSettings = (settings) => {
    if (settings.fontFamily) {
      loadFont(settings.fontFamily);
    }
    return changeSettings(settings);
  };

  return codeEditor;
};
