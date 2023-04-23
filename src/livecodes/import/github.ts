import { getLanguageByAlias, getLanguageEditorId } from '../languages';
import type { Language, Config, User } from '../models';
// eslint-disable-next-line import/no-internal-modules
import { getGithubHeaders } from '../services/github';
import { isGithubDir } from './github-dir';
import { hostPatterns } from './utils';

export const isGithubUrl = (url: string, pattern = new RegExp(hostPatterns.github)) => {
  if (!pattern.test(url)) return;
  try {
    const urlObj = getValidUrl(url);
    const pathSplit = urlObj.pathname.split('/');
    return pathSplit[3] === 'blob';
  } catch (error) {
    return;
  }
};

export const isGithub = (url: string) => isGithubDir(url) || isGithubUrl(url);

const getValidUrl = (url: string) =>
  url.startsWith('https://') ? new URL(url) : new URL('https://' + url);

// based on https://github.com/yusanshi/embed-like-gist
const getfileData = (urlObj: URL): FileData => {
  const pathSplit = urlObj.pathname.split('/');
  const user = pathSplit[1];
  const repository = pathSplit[2];
  const branch = pathSplit[4];
  const file = pathSplit.slice(5, pathSplit.length).join('/');
  const extension = (file.split('.')[file.split('.').length - 1] || 'md') as Language;
  const lineSplit = urlObj.hash.split('-');
  const startLine = urlObj.hash !== '' ? Number(lineSplit[0].replace('#L', '')) : -1;
  const endLine =
    urlObj.hash !== '' && lineSplit.length > 1 ? Number(lineSplit[1].replace('L', '')) : startLine;
  const apiUrl = `https://api.github.com/repos/${user}/${repository}/contents/${file}?ref=${branch}`;
  return {
    apiUrl,
    extension,
    startLine,
    endLine,
  };
};

interface FileData {
  apiUrl: string;
  extension: Language;
  startLine: number;
  endLine: number;
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
      .then((data) => atob(data.content));
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
  const fileData = getfileData(validUrl);
  return getContent(fileData, loggedInUser);
};
