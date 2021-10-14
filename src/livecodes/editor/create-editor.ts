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

const loadEditor = async (
  editorName: 'monaco' | 'codemirror' | 'prism',
  options: EditorOptions,
) => {
  const { baseUrl, editorBuild = editorBuildCache } = options;
  editorBuildCache = editorBuild;
  const fileName =
    editorName === 'monaco' ? editorName + '.js' : editorName + '-' + editorBuild + '.js';
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
  return ['codemirror', 'monaco', 'prism'].includes(editor || '')
    ? editor
    : mode === 'codeblock'
    ? 'prism'
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
