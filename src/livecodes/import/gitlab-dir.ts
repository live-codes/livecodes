import { getLanguageByAlias, getLanguageEditorId } from '../languages';
import { Language } from '../models';
import { getValidUrl, hostPatterns, populateConfig, sourceFile } from './utils';

export const isGitlabDir = (url: string, pattern = new RegExp(hostPatterns.gitlab)) => {
  if (!pattern.test(url)) return;
  try {
    const urlObj = getValidUrl(url);
    if (!urlObj) return;
    const pathSplit = urlObj.pathname.split('/');
    return pathSplit[4] === 'tree' || pathSplit.length === 3;
  } catch (error) {
    return;
  }
};

export const importFromGitlabDir = async (url: string, params: { [key: string]: string }) => {
  try {
    const urlObj = getValidUrl(url);
    if (!urlObj) return {};
    const pathSplit = urlObj.pathname.split('/');
    const user = pathSplit[1];
    const repository = pathSplit[2];
    const repoInfo = await fetch(`${urlObj.origin}/api/v4/projects/${user}%2F${repository}`).then(
      (res) => res.json(),
    );
    const branch = pathSplit[5] || repoInfo.default_branch;
    const projectId = repoInfo.id;
    const dir = pathSplit.slice(6, pathSplit.length).join('/');
    const apiURL = `${urlObj.origin}/api/v4/projects/${projectId}/repository/tree?per_page=100&ref=${branch}&path=${dir}`;
    const dirFiles = await fetch(apiURL)
      .then((res) => res.json())
      .then((data) => data.filter((node: any) => node.type === 'blob'));

    const files = await Promise.all(
      Object.values(dirFiles).map(async (file: any): Promise<Partial<sourceFile>> => {
        const filename = file.path.split('/')[file.path.split('/').length - 1];
        const extension = filename.split('.')[filename.split('.').length - 1];
        const language = getLanguageByAlias(extension);
        const editorId = getLanguageEditorId(language as Language);
        const rawURL = `${
          urlObj.origin
        }/api/v4/projects/${projectId}/repository/files/${encodeURIComponent(
          file.path,
        )}/raw?ref=${branch}`;

        const content = await fetch(rawURL).then((res) => res.text());

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
