import { languages, getLanguageByAlias, getLanguageEditorId } from '../languages';
import { EditorId, Language, Pen } from '../models';

export interface sourceFile {
  filename: string;
  language: Language;
  content: string;
  editorId: EditorId;
}

export interface FileData {
  rawURL: string;
  extension: Language;
  startLine: number;
  endLine: number;
}

export const getValidUrl = (url: string) => {
  try {
    return url.startsWith('https://') ? new URL(url) : new URL('https://' + url);
  } catch (error) {
    return;
  }
};
export const populateConfig = (
  files: Array<Partial<sourceFile>>,
  params: { [key: string]: string },
) => {
  // select files from gist based on language in query params (e.g. ?html=index.html&js=script.js)
  const languagesInParams = Object.keys(params).some(getLanguageByAlias);
  if (languagesInParams) {
    return Object.keys(params).reduce((output: Partial<Pen>, param: string) => {
      const language = getLanguageByAlias(param);
      if (!language) return output;
      const file = files.find((file) => file?.filename === params[param]);
      if (!file) return output;

      const editorId = getLanguageEditorId(language);
      if (!editorId || output[editorId]) return output;

      return {
        ...output,
        [editorId]: {
          language,
          content: file.content,
        },
      };
    }, {} as Partial<Pen>);
  }

  // select languages from files
  return files
    .sort(
      (a, b) =>
        languages.findIndex((language) => language.name === a.language) -
        languages.findIndex((language) => language.name === b.language),
    )
    .reduce((output: Partial<Pen>, file) => {
      if (!file?.editorId || output[file.editorId]) return output;
      return {
        ...output,
        [file.editorId]: {
          language: file.language,
          content: file.content,
        },
      };
    }, {} as Partial<Pen>);
};

export const hostPatterns = {
  github: ['https://github.com/', 'github.com/'],
  githubGist: ['https://gist.github.com/', 'gist.github.com/'],
  gitlab: ['https://gitlab.com/', 'gitlab.com/'],
};
