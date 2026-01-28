import { decode } from 'js-base64';
import type { User } from '../models';
import { getGithubHeaders } from '../services/github';
import { filterFiles } from './files';
import { populateConfig } from './utils';

interface GitHubFile {
  path: string;
  type: 'blob' | 'tree';
  size: number;
  sha: string;
  url: string;
}

export const importFromGithubDir = async (
  url: string,
  params: { [key: string]: string },
  loggedInUser: User | null | void,
) => {
  if (url.endsWith('/')) {
    url = url.slice(0, -1);
  }

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
        .then((res) => {
          if (!res.ok) throw new Error('Cannot fetch: ' + url);
          return res.json();
        })
        .then((data) => data.default_branch);
    } else {
      branch = pathSplit[4];
      dir = pathSplit.slice(5, pathSplit.length).join('/');
    }
    const apiURL = `https://api.github.com/repos/${user}/${repository}/git/trees/${branch}?recursive=true`;

    const tree: GitHubFile[] = await fetch(apiURL, {
      ...(loggedInUser ? { headers: getGithubHeaders(loggedInUser) } : {}),
    })
      .then((res) => {
        if (!res.ok) throw new Error('Cannot fetch: ' + apiURL);
        return res.json();
      })
      .then((data) => data.tree);

    const maxFiles = 20;
    const dirFiles = filterFiles(
      tree
        .filter((node) =>
          rootDir
            ? node.type === 'blob'
            : node.type === 'blob' && node.path.startsWith(decodeURIComponent(dir) + '/'),
        )
        // comply to file shape expected by filterFiles
        .map((file) => ({
          ...file,
          filename: file.path.split('/')[file.path.split('/').length - 1],
          content: '',
        })),
    ).filter((_file, index: number) => index < maxFiles);

    const files = await Promise.all(
      dirFiles.map(async (file) => {
        const filename = decodeURIComponent(file.path.split('/')[file.path.split('/').length - 1]);
        const content = decode(
          await fetch(file.url, {
            ...(loggedInUser ? { headers: getGithubHeaders(loggedInUser) } : {}),
          })
            .then((res) => {
              if (!res.ok) throw new Error('Cannot fetch: ' + file.url);
              return res.json();
            })
            .then((data) => data.content),
        );
        const relativePath = dir ? file.path.replace(`${dir}/`, '') : file.path;
        return {
          filename,
          content,
          path: relativePath,
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
