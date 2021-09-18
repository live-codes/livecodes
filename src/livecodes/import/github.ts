import { getLanguageByAlias, getLanguageEditorId } from '../languages';
import { Language, Config } from '../models';
import { pipe } from '../utils';
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
  const rawURL = `https://raw.githubusercontent.com/${user}/${repository}/${branch}/${file}`;
  return {
    rawURL,
    extension,
    startLine,
    endLine,
  };
};

interface FileData {
  rawURL: string;
  extension: Language;
  startLine: number;
  endLine: number;
}

const getContent = async (fileData: FileData): Promise<Partial<Config>> => {
  const { rawURL, extension, startLine, endLine } = fileData;
  try {
    const fileContent = await fetch(rawURL).then((res) => res.text());
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
    console.error('Cannot fetch: ' + rawURL);
    return {};
  }
};

export const importFromGithub = pipe(getValidUrl, getfileData, getContent) as (
  url: string,
) => Promise<Partial<Config>>;
