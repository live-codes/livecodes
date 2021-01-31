import { getLanguageByAlias, getLanguageEditorId } from '../languages';
import { getValidUrl, hostPatterns, populateConfig } from './utils';

export const isGitlabSnippet = (url: string, patterns = hostPatterns.gitlab) => {
  if (!patterns.map((pattern) => url.startsWith(pattern)).some(Boolean)) return;
  const urlObj = getValidUrl(url);
  if (!urlObj) return;
  const pathSplit = urlObj.pathname.split('/');
  return pathSplit[pathSplit.length - 2] === 'snippets';
};

export const importFromGitlabSnippet = async (url: string, params: { [key: string]: string }) => {
  try {
    const urlObj = getValidUrl(url);
    if (!urlObj) return {};
    const pathSplit = urlObj.pathname.split('/');
    const snippetId = pathSplit[pathSplit.length - 1];

    const snippetFiles = await fetch(`${urlObj.origin}/api/v4/snippets/${snippetId}`)
      .then((res) => res.json())
      .then((data) => data.files);

    const files = await Promise.all(
      Object.values(snippetFiles).map(async (file: any) => {
        const filename = file.path;
        const language = getLanguageByAlias(filename.split('.')[filename.split('.').length - 1]);
        if (!language) return {};
        const editorId = getLanguageEditorId(language);

        const content = await fetch(
          `${urlObj.origin}/api/v4/snippets/${snippetId}/files/master/${encodeURIComponent(
            filename,
          )}/raw`,
        ).then((res) => res.text());

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
    console.error('Cannot fetch snippet: ' + error);
    return {};
  }
};
