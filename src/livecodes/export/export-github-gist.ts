import type { getLanguageExtension as getLanguageExtensionFn } from '../languages';
import type { Config, User } from '../models';
import { getDescriptionFile, getFilesFromConfig, type Files } from './utils';

export const exportGithubGist = async (
  config: Config,
  {
    user,
    deps,
  }: {
    user: User;
    deps: {
      getLanguageExtension: typeof getLanguageExtensionFn;
    };
  },
) => {
  if (!user) return;
  const files = getFiles(config, user, deps);
  const response = await saveGist(config, user, files);
  const gistInfo = await response.json();

  if (gistInfo.id) {
    const description = getDescriptionFile(config, user, gistInfo.html_url);
    await saveGist(config, user, description, gistInfo.id); // update gist description with link to project
    window.open('https://gist.github.com/' + gistInfo.id);
  }
};

const getFiles = (
  config: Config,
  user: User | undefined,
  deps: {
    getLanguageExtension: typeof getLanguageExtensionFn;
  },
) => {
  const descriptionFile = getDescriptionFile(config, user);
  const contentFiles = getFilesFromConfig(config, deps);

  return {
    ...descriptionFile,
    ...contentFiles,
  };
};

const saveGist = (config: Config, user: User, files: Files, gistId?: string) => {
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
