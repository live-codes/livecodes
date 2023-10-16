import { getLanguageByAlias } from '../languages';
import { getValidUrl } from './check-src';
import { populateConfig } from './utils';

export const importFromGithubGist = async (url: string, params: { [key: string]: string }) => {
  try {
    const urlObj = getValidUrl(url);
    if (!urlObj) return {};
    const pathSplit = urlObj.pathname.split('/');
    const gistId = pathSplit[pathSplit.length - 1];
    let gistTitle = '';
    const gistFiles = await fetch(`https://api.github.com/gists/${gistId}`)
      .then((res) => res.json())
      .then((data) => {
        gistTitle = data.description;
        return data.files;
      })
      .then((files) =>
        Object.values(files).map((file: any) => {
          const lang = file.language;
          const extension = file.filename.split('.')[file.filename.split('.').length - 1];
          const language = getLanguageByAlias(extension) || getLanguageByAlias(lang);
          return {
            ...file,
            language,
          };
        }),
      );

    const files = Object.values(gistFiles).map((file: any) => ({
      filename: file.filename,
      language: file.language,
      content: file.content,
    }));

    return { ...populateConfig(files, params), title: gistTitle };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Cannot fetch gist: ' + url);
    // eslint-disable-next-line no-console
    console.error(error);
    return {};
  }
};
