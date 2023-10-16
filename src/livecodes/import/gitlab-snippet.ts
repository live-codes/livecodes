import { getValidUrl } from './check-src';
import { populateConfig } from './utils';

export const importFromGitlabSnippet = async (url: string, params: { [key: string]: string }) => {
  try {
    const urlObj = getValidUrl(url);
    if (!urlObj) return {};
    const pathSplit = urlObj.pathname.split('/');
    const snippetId = pathSplit[pathSplit.length - 1];
    let snippetTitle = '';

    const snippetFiles = await fetch(`${urlObj.origin}/api/v4/snippets/${snippetId}`)
      .then((res) => res.json())
      .then((data) => {
        snippetTitle = data.title;
        return data.files;
      });

    const files = await Promise.all(
      Object.values(snippetFiles).map(async (file: any) => {
        const filename = file.path;
        const fileUrlObj = getValidUrl(file.raw_url);
        const branch = fileUrlObj?.pathname.split('/')[5] || 'main';
        const content = await fetch(
          `${urlObj.origin}/api/v4/snippets/${snippetId}/files/${branch}/${encodeURIComponent(
            filename,
          )}/raw`,
        ).then((res) => res.text());

        return {
          filename,
          content,
        };
      }),
    );

    return { ...populateConfig(files, params), title: snippetTitle };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Cannot fetch snippet: ' + error);
    return {};
  }
};
