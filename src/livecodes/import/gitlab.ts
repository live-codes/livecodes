import type { Language, Config } from '../models';
import { getLanguageByAlias, getLanguageEditorId } from '../languages';
import { pipe } from '../utils';
import { getValidUrl } from './check-src';

export interface FileData {
  rawURL: string;
  filename: string;
  extension: Language;
  startLine: number;
  endLine: number;
}

// based on https://github.com/yusanshi/embed-like-gist
const getfileData = async (urlObj: URL): Promise<FileData> => {
  const pathSplit = urlObj.pathname.split('/');
  const user = pathSplit[1];
  const repository = pathSplit[2];
  const branch = pathSplit[5];
  const file = pathSplit.slice(6, pathSplit.length).join('/');
  const filename = file.split('/')[file.split('/').length - 1];
  const extension = (file.split('.')[file.split('.').length - 1] || 'md') as Language;
  const lineSplit = urlObj.hash.split('-');
  const startLine = urlObj.hash !== '' ? Number(lineSplit[0].replace('#L', '')) : -1;
  const endLine =
    urlObj.hash !== '' && lineSplit.length > 1 ? Number(lineSplit[1].replace('L', '')) : startLine;
  const projectId = await fetch(`${urlObj.origin}/api/v4/projects/${user}%2F${repository}`)
    .then((res) => {
      if (!res.ok) throw new Error('Cannot fetch: ' + urlObj.href);
      return res.json();
    })
    .then((data) => data.id);
  const rawURL = `${
    urlObj.origin
  }/api/v4/projects/${projectId}/repository/files/${encodeURIComponent(file)}/raw?ref=${branch}`;

  return {
    rawURL,
    filename,
    extension,
    startLine,
    endLine,
  };
};

const getContent = async (fileData: Promise<FileData>): Promise<Partial<Config>> => {
  const { rawURL, filename, extension, startLine, endLine } = await fileData;
  try {
    const fileContent = await fetch(rawURL).then((res) => {
      if (!res.ok) throw new Error('Cannot fetch: ' + rawURL);
      return res.text();
    });

    if (filename === 'livecodes.json' && fileContent?.trim()) {
      try {
        return JSON.parse(fileContent);
      } catch {
        // invalid JSON
      }
    }

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
    // eslint-disable-next-line no-console
    console.error(error);
    return {};
  }
};

export const importFromGitlab = pipe(getValidUrl, getfileData, getContent) as (
  url: string,
) => Promise<Partial<Config>>;
