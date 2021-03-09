import { CodeEditor, EditorOptions } from '../models';
import { isMobile } from '../utils';

export const createEditor = async (options: EditorOptions) => {
  if (!options) throw new Error();

  const { baseUrl, editor, mode } = options;

  const editorName = ['codemirror', 'monaco', 'prism'].includes(editor || '')
    ? editor
    : mode === 'codeblock' || options.readonly
    ? 'prism'
    : isMobile()
    ? 'codemirror'
    : 'monaco';
  const editorUrl = baseUrl + editorName + '.js';

  try {
    const createCodeEditor: (options: EditorOptions) => Promise<CodeEditor> = (
      await import(editorUrl)
    ).createEditor;

    const codeEditor = await createCodeEditor(options);
    return codeEditor;
  } catch {
    throw new Error('Failed loading code editor');
  }
};
