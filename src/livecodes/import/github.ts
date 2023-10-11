/* eslint-disable import/no-internal-modules */
import { decode } from 'js-base64';
import type { Language, Config, User } from '../models';
import { getLanguageByAlias, getLanguageEditorId } from '../languages/utils';
import { getGithubHeaders } from '../services/github';

const getValidUrl = (url: string) =>
  url.startsWith('https://') ? new URL(url) : new URL('https://' + url);

// based on https://github.com/yusanshi/embed-like-gist
const getFileData = (urlObj: URL): FileData => {
  const pathSplit = urlObj.pathname.split('/');
  const user = pathSplit[1];
  const repo = pathSplit[2];
  const ref = pathSplit[4];
  const filePath = pathSplit.slice(5, pathSplit.length).join('/');
  const filename = filePath.split('/')[filePath.split('/').length - 1];
  const extension = (filename.split('.')[filename.split('.').length - 1] || 'md') as Language;
  const lineSplit = urlObj.hash.split('-');
  const startLine = urlObj.hash !== '' ? Number(lineSplit[0].replace('#L', '')) : -1;
  const endLine =
    urlObj.hash !== '' && lineSplit.length > 1 ? Number(lineSplit[1].replace('L', '')) : startLine;
  const apiUrl = `https://api.github.com/repos/${user}/${repo}/contents/${filePath}?ref=${ref}`;
  return {
    user,
    repo,
    ref,
    path: filePath,
    filename,
    extension,
    startLine,
    endLine,
    apiUrl,
  };
};

interface FileData {
  user: string;
  repo: string;
  ref: string;
  path: string;
  filename: string;
  extension: Language;
  startLine: number;
  endLine: number;
  apiUrl: string;
}

const getContent = async (
  fileData: FileData,
  loggedInUser: User | null | void,
): Promise<Partial<Config>> => {
  const { apiUrl, extension, startLine, endLine } = fileData;
  try {
    const fileContent = await fetch(apiUrl, {
      ...(loggedInUser ? { headers: getGithubHeaders(loggedInUser) } : {}),
    })
      .then((res) => res.json())
      .then((data) => decode(data.content));
    const content =
      startLine > 0
        ? fileContent
            .split('\n')
            .slice(startLine - 1, endLine)
            .join('\n')
        : fileContent;
    const language = getLanguageByAlias(extension) || 'html';
    const editorId = getLanguageEditorId(language) || 'markup';
    return {
      [editorId]: {
        language,
        content,
      },
      activeEditor: editorId,
    };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Cannot fetch: ' + apiUrl);
    return {};
  }
};

export const importFromGithub = (
  url: string,
  loggedInUser: User | null | void,
): Promise<Partial<Config>> => {
  const validUrl = getValidUrl(url);
  const fileData = getFileData(validUrl);
  return getContent(fileData, loggedInUser);
};
