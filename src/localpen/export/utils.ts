import { getLanguageExtension } from '../languages';
import { ContentPen, EditorId, Pen, User } from '../models';
import { safeName } from '../utils';

export const downloadFile = (filename: string, extension: string, content: string) => {
  const a = document.createElement('a');
  a.style.display = 'none';
  a.href = content;
  a.download = safeName(filename) + '.' + extension;
  a.click();
  a.remove();
};

export interface Files {
  [key: string]: { content: string };
}
export const getFilesFromConfig = (config: Pen | ContentPen): Files => {
  const filenames = {
    markup: 'index',
    style: 'style',
    script: 'script',
  };
  const codeFiles = (Object.keys(filenames) as EditorId[]).reduce((files, editorId) => {
    const filename = filenames[editorId];
    const language = config[editorId].language;
    const extension = getLanguageExtension(language) || 'md';
    const content = config[editorId].content || '';
    return {
      ...files,
      ...(content ? { [filename + '.' + extension]: { content } } : {}),
    };
  }, {});

  const externalStyles =
    config.stylesheets.length > 0
      ? {
          styles: {
            content: config.stylesheets
              .map((url) => `<link rel="stylesheet" href="${url}" />`)
              .join('\n'),
          },
        }
      : undefined;

  const externalScripts =
    config.scripts.length > 0
      ? {
          scripts: {
            content: config.scripts.map((url) => `<script src="${url}"></script>`).join('\n'),
          },
        }
      : undefined;

  return {
    ...codeFiles,
    ...externalStyles,
    ...externalScripts,
  };
};

export const getDescriptionFile = (config: ContentPen, user?: User, url?: string, gist = true) => {
  const githubUrl = gist ? 'https://gist.github.com/' : 'https://github.com/';
  const userInfo = !user
    ? ''
    : !user.username
    ? 'by ' + user.displayName
    : 'by [' + user.displayName + '](' + githubUrl + user.username + ')';
  const projectInfo = url ? `[project](https://localpen.io/#${url})` : 'project';

  return {
    [safeName(config.title) + '.md']: {
      content: `# ${config.title}\nA ${projectInfo} created ${userInfo} on [LocalPen](https://localpen.io).`,
    },
  };
};
