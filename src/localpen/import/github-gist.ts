import { getLanguageByAlias, getLanguageEditorId } from '../languages';
import { getValidUrl, hostPatterns, populateConfig } from './utils';

export const isGithubGist = (url: string, patterns = hostPatterns.githubGist) =>
  patterns.map((pattern) => url.startsWith(pattern)).some(Boolean);

export const importFromGithubGist = async (url: string, params: { [key: string]: string }) => {
  try {
    const urlObj = getValidUrl(url);
    if (!urlObj) return {};
    const pathSplit = urlObj.pathname.split('/');
    const gistId = pathSplit[pathSplit.length - 1];

    const gistFiles = await fetch(`https://api.github.com/gists/${gistId}`)
      .then((res) => res.json())
      .then((data) => data.files)
      .then((files) =>
        Object.values(files).map((file: any) => {
          const lang = file.language;
          const extension = file.filename.split('.')[file.filename.split('.').length - 1];
          const language = getLanguageByAlias(lang) || getLanguageByAlias(extension);

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
      editorId: getLanguageEditorId(file.language),
    }));

    // If gist is a codepen export, extract external styles and scripts
    const stylesheets: string[] = [];
    const stylesFile = files.find((file) => file.filename === 'styles');
    if (stylesFile) {
      try {
        const domparser = new DOMParser();
        const doc = domparser.parseFromString(stylesFile.content, 'text/html');
        doc.querySelectorAll('link').forEach((stylesheet) => {
          try {
            stylesheets.push(new URL(stylesheet.href).href);
          } catch (error) {
            // not url
          }
        });
      } catch (error) {
        // not DOM
      }
    }

    const scripts: string[] = [];
    const scriptsFile = files.find((file) => file.filename === 'scripts');
    if (scriptsFile) {
      try {
        const domparser = new DOMParser();
        const doc = domparser.parseFromString(scriptsFile.content, 'text/html');
        doc.querySelectorAll('script').forEach((script) => {
          try {
            scripts.push(new URL(script.src).href);
          } catch (error) {
            // not url
          }
        });
      } catch (error) {
        // not DOM
      }
    }

    return { ...populateConfig(files, params), stylesheets, scripts };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Cannot fetch gist: ' + url);
    // eslint-disable-next-line no-console
    console.error(error);
    return {};
  }
};
