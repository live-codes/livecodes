import { getValidUrl } from './check-src';
import { populateConfig } from './utils';

export const importFromGitlabDir = async (url: string, params: { [key: string]: string }) => {
  if (url.endsWith('/')) {
    url = url.slice(0, -1);
  }

  try {
    const urlObj = getValidUrl(url);
    if (!urlObj) return {};
    const pathSplit = urlObj.pathname.split('/');
    const user = pathSplit[1];
    const repository = pathSplit[2];
    const repoInfo = await fetch(`${urlObj.origin}/api/v4/projects/${user}%2F${repository}`).then(
      (res) => {
        if (!res.ok) throw new Error('Cannot fetch: ' + url);
        return res.json();
      },
    );

    const branch = pathSplit[5] || repoInfo.default_branch;
    const projectId = repoInfo.id;
    const dir = pathSplit.slice(6, pathSplit.length).join('/');
    const apiURL = `${urlObj.origin}/api/v4/projects/${projectId}/repository/tree?per_page=100&ref=${branch}&path=${dir}`;
    const dirFiles = await fetch(apiURL)
      .then((res) => {
        if (!res.ok) throw new Error('Cannot fetch: ' + apiURL);
        return res.json();
      })
      .then((data) => data.filter((node: any) => node.type === 'blob'));

    const files = await Promise.all(
      Object.values(dirFiles).map(async (file: any) => {
        const filename = file.path.split('/')[file.path.split('/').length - 1];
        const rawURL = `${
          urlObj.origin
        }/api/v4/projects/${projectId}/repository/files/${encodeURIComponent(
          file.path,
        )}/raw?ref=${branch}`;
        const content = await fetch(rawURL).then((res) => {
          if (!res.ok) throw new Error('Cannot fetch: ' + file.url);
          return res.text();
        });

        return {
          filename,
          content,
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
