import { getLanguageExtension } from '../languages';
import { EditorId, Pen } from '../models';
import { safeName } from '../utils';

export const downloadFile = (filename: string, extension: string, content: string) => {
  const a = document.createElement('a');
  a.style.display = 'none';
  a.href = content;
  a.download = safeName(filename) + '.' + extension;
  a.click();
  a.remove();
};

export interface Files {
  [key: string]: { content: string };
}
export const getFilesFromConfig = (config: Pen): Files => {
  const filenames = {
    markup: 'index',
    style: 'style',
    script: 'script',
  };
  return (Object.keys(filenames) as EditorId[]).reduce((files, editorId) => {
    const filename = filenames[editorId];
    const language = config[editorId].language;
    const extension = getLanguageExtension(language) || 'md';
    const content = config[editorId].content || '';
    return {
      ...files,
      ...(content ? { [filename + '.' + extension]: { content } } : {}),
    };
  }, {});
};
