import { Pen, User } from '../models';
import { safeName } from '../utils';
import { Files, getFilesFromConfig } from './utils';

export const exportGithubGist = async (config: Pen, { user }: { user: User }) => {
  if (!user) return;
  const files = getFiles(config, user);
  const response = await sendGist(config, user, files);
  const gistInfo = await response.json();

  if (gistInfo.id) {
    const description = getDescriptionFile(config, user, gistInfo.html_url);
    await sendGist(config, user, description, gistInfo.id); // update gist description with link to project
    window.open('https://gist.github.com/' + gistInfo.id);
  }
};

const getFiles = (config: Pen, user?: User) => {
  const descriptionFile = getDescriptionFile(config, user);
  const contentFiles = getFilesFromConfig(config);

  return {
    ...descriptionFile,
    ...contentFiles,
  };
};

const getDescriptionFile = (config: Pen, user?: User, gistUrl?: string) => {
  const username = user?.username;
  const userInfo = !user
    ? ''
    : !username
    ? 'by ' + user.displayName
    : 'by [' + user.displayName + '](https://gist.github.com/' + username + ')';
  const projectInfo = gistUrl ? `[This project](https://localpen.io/#${gistUrl})` : 'This project';

  return {
    [safeName(config.title) + '.md']: {
      content: `# ${config.title}\n${projectInfo} was created ${userInfo} on [LocalPen](https://localpen.io).`,
    },
  };
};

const sendGist = (config: Pen, user: User, files: Files, gistId?: string) => {
  const body = {
    accept: 'application/vnd.github.v3+json',
    description: config.title,
    files,
    public: true,
  };
  let url = 'https://api.github.com/gists';
  if (gistId) {
    url += '/' + gistId;
  }
  return fetch(url, {
    method: gistId ? 'PATCH' : 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'token ' + user.token,
    },
    body: JSON.stringify(body),
  });
};
