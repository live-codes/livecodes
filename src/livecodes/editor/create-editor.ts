import { CodeEditor, Config, EditorOptions, Language } from '../models';
import { isMobile, loadStylesheet } from '../utils';
import { createFakeEditor } from './fake-editor';
import { fonts } from './fonts';

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

export const selectedEditor = (
  options: Partial<Pick<EditorOptions, 'editor' | 'mode' | 'editorId'>>,
) => {
  const { editor, mode, editorId } = options;
  return mode === 'result' && editorId !== 'console' && editorId !== 'compiled'
    ? 'fake'
    : ['codemirror', 'monaco', 'codejar'].includes(editor || '')
    ? editor
    : mode === 'codeblock'
    ? 'codejar'
    : isMobile()
    ? 'codemirror'
    : 'monaco';
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

export const createEditor = async (options: EditorOptions) => {
  if (!options) throw new Error();

  const editorOptions = getEditorOptions(options);

  const editorName = selectedEditor(editorOptions);
  if (editorName === 'fake') return createFakeEditor(editorOptions);

  if (editorOptions.fontFamily) {
    loadFont(editorOptions.fontFamily);
  }
  const codeEditor = await loadEditor(editorName || 'codemirror', editorOptions);

  if (!codeEditor) throw new Error('Failed loading code editor');

  const changeSettings = codeEditor.changeSettings;
  codeEditor.changeSettings = (settings) => {
    if (settings.fontFamily) {
      loadFont(settings.fontFamily);
    }
    return changeSettings(settings);
  };

  return codeEditor;
};
