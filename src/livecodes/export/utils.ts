import { getLanguageExtension } from '../languages';
import { ContentConfig, EditorId, Config, User } from '../models';
import { safeName } from '../utils';

export interface Files {
  [key: string]: { content: string };
}
export const getFilesFromConfig = (config: Config | ContentConfig): Files => {
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

  const tests = config.tests?.content
    ? {
        ['script.spec.' + getLanguageExtension(config.tests?.language) || 'js']: {
          content: config.tests?.content,
        },
      }
    : undefined;

  return {
    ...codeFiles,
    ...externalStyles,
    ...externalScripts,
    ...tests,
  };
};

export const getDescriptionFile = (
  config: ContentConfig,
  user?: User,
  url?: string,
  gist = true,
) => {
  const githubUrl = gist ? 'https://gist.github.com/' : 'https://github.com/';
  const userInfo = !user
    ? ''
    : !user.username
    ? 'by ' + user.displayName
    : 'by [' + user.displayName + '](' + githubUrl + user.username + ')';
  const projectInfo = url ? `[project](https://livecodes.io/#${url})` : 'project';

  return {
    [safeName(config.title) + '.md']: {
      content: `# ${config.title}\nA ${projectInfo} created ${userInfo} on [LiveCodes](https://livecodes.io).`,
    },
  };
};
