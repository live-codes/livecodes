import { decode } from 'js-base64';
import type { User } from '../models';
// eslint-disable-next-line import/no-internal-modules
import { getGithubHeaders } from '../services/github';
import { populateConfig } from './utils';

export const importFromGithubDir = async (
  url: string,
  params: { [key: string]: string },
  loggedInUser: User | null | void,
) => {
  try {
    const urlObj = url.startsWith('https://') ? new URL(url) : new URL('https://' + url);

    const pathSplit = urlObj.pathname.split('/');
    const rootDir = pathSplit.length === 3;
    const user = pathSplit[1];
    const repository = pathSplit[2];

    let branch: string;
    let dir = '';
    if (rootDir) {
      branch = await fetch(`https://api.github.com/repos/${user}/${repository}`, {
        ...(loggedInUser ? { headers: getGithubHeaders(loggedInUser) } : {}),
      })
        .then((res) => res.json())
        .then((data) => data.default_branch);
    } else {
      branch = pathSplit[4];
      dir = pathSplit.slice(5, pathSplit.length).join('/');
    }
    const apiURL = `https://api.github.com/repos/${user}/${repository}/git/trees/${branch}?recursive=true`;

    const tree = await fetch(apiURL, {
      ...(loggedInUser ? { headers: getGithubHeaders(loggedInUser) } : {}),
    })
      .then((res) => res.json())
      .then((data) => data.tree);

    const dirFiles = tree.filter((node: any) =>
      rootDir
        ? node.type === 'blob'
        : node.type === 'blob' &&
          node.path.startsWith(dir) &&
          node.path.split('/').length === dir.split('/').length + 1,
    );

    const files = await Promise.all(
      Object.values(dirFiles).map(async (file: any) => {
        const filename = file.path.split('/')[file.path.split('/').length - 1];
        const content = decode(
          await fetch(file.url, {
            ...(loggedInUser ? { headers: getGithubHeaders(loggedInUser) } : {}),
          })
            .then((res) => res.json())
            .then((data) => data.content),
        );

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
