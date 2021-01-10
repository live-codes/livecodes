import { getLanguageByAlias, getLanguageEditorId } from '../languages';
import { Language } from '../models';
import { hostPatterns, populateConfig } from './utils';

export const isGithubDir = (url: string, patterns = hostPatterns.github) => {
  if (!patterns.map((pattern) => url.startsWith(pattern)).some(Boolean)) return;
  try {
    const urlObj = getValidUrl(url);
    const pathSplit = urlObj.pathname.split('/');
    return pathSplit[3] === 'tree';
  } catch (error) {
    return;
  }
};
const getValidUrl = (url: string) =>
  url.startsWith('https://') ? new URL(url) : new URL('https://' + url);

export const importFromGithubDir = async (url: string, params: { [key: string]: string }) => {
  try {
    const urlObj = url.startsWith('https://') ? new URL(url) : new URL('https://' + url);

    const pathSplit = urlObj.pathname.split('/');
    const user = pathSplit[1];
    const repository = pathSplit[2];
    const branch = pathSplit[4];
    const dir = pathSplit.slice(5, pathSplit.length).join('/');
    const apiURL = `https://api.github.com/repos/${user}/${repository}/git/trees/${branch}?recursive=true`;

    const tree = await fetch(apiURL)
      .then((res) => res.json())
      .then((data) => data.tree);

    const dirFiles = tree.filter(
      (node: any) =>
        node.type === 'blob' &&
        node.path.startsWith(dir) &&
        node.path.split('/').length === dir.split('/').length + 1,
    );

    const files = await Promise.all(
      Object.values(dirFiles).map(async (file: any) => {
        const filename = file.path.split('/')[file.path.split('/').length - 1];
        const extension = (filename.split('.')[filename.split('.').length - 1] || 'md') as Language;
        const language = getLanguageByAlias(extension) || 'md';
        const editorId = getLanguageEditorId(language);
        const content = atob(
          await fetch(file.url)
            .then((res) => res.json())
            .then((data) => data.content),
        );

        return {
          filename,
          language,
          content,
          editorId,
        };
      }),
    );

    return populateConfig(files, params);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Cannot fetch directory: ' + url);
    // eslint-disable-next-line no-console
    console.error(error);
    return {};
  }
};
