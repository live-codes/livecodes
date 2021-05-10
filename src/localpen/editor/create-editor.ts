import { CodeEditor, EditorOptions } from '../models';
import { isMobile } from '../utils';

const loadEditor = async (
  editorName: 'monaco' | 'codemirror' | 'prism' | '' | undefined,
  options: EditorOptions,
) => {
  const { baseUrl } = options;
  const editorUrl = baseUrl + editorName + '.js';

  let editorModule = (window as any)[editorUrl];
  try {
    if (!editorModule) {
      editorModule = await import(editorUrl);
      (window as any)[editorUrl] = editorModule;
    }
    const createCodeEditor: (options: EditorOptions) => Promise<CodeEditor> =
      editorModule.createEditor;
    const codeEditor = await createCodeEditor(options);
    return codeEditor;
  } catch (err) {
    return false;
  }
};

export const createEditor = async (options: EditorOptions) => {
  if (!options) throw new Error();

  const { editor, mode } = options;

  const editorName = ['codemirror', 'monaco', 'prism'].includes(editor || '')
    ? editor
    : mode === 'codeblock'
    ? 'prism'
    : isMobile()
    ? 'codemirror'
    : 'monaco';

  const codeEditor =
    (await loadEditor(editorName, options)) || (await loadEditor('codemirror', options));

  if (codeEditor) {
    return codeEditor;
  } else {
    throw new Error('Failed loading code editor');
  }
};
