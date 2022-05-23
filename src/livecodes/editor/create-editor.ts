import { CodeEditor, Config, EditorOptions, Language } from '../models';
import { isMobile } from '../utils';

export const basicLanguages: Language[] = [
  'html',
  'css',
  'scss',
  'javascript',
  'typescript',
  'jsx',
  'tsx',
  'json',
];

let editorBuildCache: EditorOptions['editorBuild'] = 'basic';

const getEditorFileName = (
  editorName: Exclude<Config['editor'], ''>,
  editorBuild: EditorOptions['editorBuild'],
) => {
  if (editorName === 'codemirror') {
    if (editorBuild === 'full') return '{{hash:codemirror-full.js}}';
    return '{{hash:codemirror-basic.js}}';
  }

  if (editorName === 'codejar') {
    if (editorBuild === 'full') return '{{hash:codejar-full.js}}';
    return '{{hash:codejar-basic.js}}';
  }

  return '{{hash:monaco.js}}';
};

const loadEditor = async (editorName: Exclude<Config['editor'], ''>, options: EditorOptions) => {
  const { baseUrl, editorBuild = editorBuildCache } = options;
  editorBuildCache = editorBuild;
  const fileName = getEditorFileName(editorName, editorBuild);
  const editorUrl = baseUrl + fileName;

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

export const selectedEditor = (options: EditorOptions | Partial<Config>) => {
  const { editor, mode } = options;
  return ['codemirror', 'monaco', 'codejar'].includes(editor || '')
    ? editor
    : mode === 'codeblock'
    ? 'codejar'
    : isMobile()
    ? 'codemirror'
    : 'monaco';
};
export const createEditor = async (options: EditorOptions) => {
  if (!options) throw new Error();

  const editorName = selectedEditor(options);
  const codeEditor = await loadEditor(editorName || 'codemirror', options);

  if (!codeEditor) throw new Error('Failed loading code editor');

  return codeEditor;
};
