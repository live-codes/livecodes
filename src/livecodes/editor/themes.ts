import type { CodejarTheme, CodemirrorTheme, Config, MonacoTheme } from '../models';

const getEditorThemeData = (themeItem: string) => {
  let editorTheme = themeItem.trim();
  let editor: string | undefined;
  let theme: string | undefined;
  if (themeItem.includes(':')) {
    [editor, editorTheme] = editorTheme.split(':');
    if (editor !== 'monaco' && editor !== 'codemirror' && editor !== 'codejar') {
      editor = undefined;
    }
  }
  if (themeItem.includes('@')) {
    [editorTheme, theme] = editorTheme.split('@');
    if (theme !== 'light' && theme !== 'dark') {
      theme = undefined;
    }
  }
  return { editor, editorTheme, theme };
};

export const getEditorTheme = ({
  editor,
  editorTheme,
  theme,
  editorThemes,
}: Pick<Config, 'editorTheme' | 'editor' | 'theme'> & {
  editorThemes: Array<MonacoTheme | CodemirrorTheme | CodejarTheme>;
}) => {
  if (!editorTheme) return null;

  const themes =
    typeof editorTheme === 'string' ? editorTheme.split(',').map((t) => t.trim()) : editorTheme;

  const editorThemeData = themes.map(getEditorThemeData);

  for (const editorThemeItem of editorThemeData) {
    if (
      (editorThemeItem.editor === editor || editorThemeItem.editor === undefined) &&
      (editorThemeItem.theme === theme || editorThemeItem.theme === undefined) &&
      editorThemes.includes(
        editorThemeItem.editorTheme as MonacoTheme | CodemirrorTheme | CodejarTheme,
      )
    ) {
      return editorThemeItem.editorTheme as MonacoTheme | CodemirrorTheme | CodejarTheme;
    }
  }
  return null;
};
