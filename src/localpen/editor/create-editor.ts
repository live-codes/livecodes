import { EditorOptions } from '../models';
import { isMobile } from '../utils';
import { createMonacoEditor } from './monaco-editor';

export const createEditor = async (options: EditorOptions) => {
  if (!options) throw new Error();

  const { baseUrl, editor } = options;

  try {
    const createCodeEditor: typeof createMonacoEditor =
      isMobile() || editor === 'codemirror'
        ? (await import(`${baseUrl}/codemirror.js`)).createCodemirrorEditor
        : createMonacoEditor;

    const codeEditor = await createCodeEditor(options);
    return codeEditor;
  } catch {
    throw new Error('Failed loading code editor');
  }
};
