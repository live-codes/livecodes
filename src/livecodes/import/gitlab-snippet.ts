import { getLanguageByAlias, getLanguageEditorId } from '../languages';
import { Language } from '../models';
import { getValidUrl, hostPatterns, populateConfig } from './utils';

export const isGitlabSnippet = (url: string, pattern = new RegExp(hostPatterns.gitlab)) => {
  if (!pattern.test(url)) return;
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
        const language = getLanguageByAlias(filename.split('.')[filename.split('.').length - 1]);
        const editorId = getLanguageEditorId(language as Language);

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

    return { ...populateConfig(files, params), title: snippetTitle };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Cannot fetch snippet: ' + error);
    return {};
  }
};
