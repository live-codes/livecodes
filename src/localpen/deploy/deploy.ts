import { defaultConfig } from '../config';
import { Pen, User } from '../models';
import { safeName } from '../utils';

const getHeaders = (user: User) => ({
  Accept: 'application/vnd.github.v3+json',
  'Content-Type': 'application/json',
  Authorization: 'token ' + user.token,
});

const createRepo = async ({ user, repo, config }: { user: User; repo: string; config: Pen }) => {
  const name = safeName(repo, '-').toLowerCase();
  const res = await fetch('https://api.github.com/user/repos', {
    method: 'POST',
    headers: getHeaders(user),
    body: JSON.stringify({
      name,
      private: false,
      homepage: `https://${user.username}.github.io/${name}/`,
      ...(config.title !== defaultConfig.title ? { description: config.title } : {}),
    }),
  });
  if (!res.ok) return null;
  return res.json().then((data) => data.name);
};

const createPage = async ({
  user,
  repo,
  resultPage,
  message,
}: {
  user: User;
  repo: string;
  resultPage: string;
  message: string;
}) => {
  const url = `https://api.github.com/repos/${user.username}/${repo}/contents/`;

  let sha: string | undefined;
  const res = await fetch(url, {
    method: 'GET',
    headers: getHeaders(user),
  });
  if (res.ok) {
    const files = await res.json();
    sha = files.find((file: any) => file.path === 'index.html')?.sha;
  }

  return fetch(url + 'index.html', {
    method: 'PUT',
    headers: getHeaders(user),
    body: JSON.stringify({
      message: message || 'deploy',
      content: btoa(resultPage),
      branch: 'gh-pages',
      ...(sha ? { sha } : {}),
    }),
  });
};

export const deploy = async ({
  user,
  repo,
  config,
  resultPage,
  message,
  newRepo = true,
}: {
  user: User;
  repo: string;
  config: Pen;
  resultPage: string;
  message: string;
  newRepo?: boolean;
}) => {
  try {
    if (newRepo) {
      repo = await createRepo({ user, repo, config });
    }
    if (!repo) return null;
    const response = await createPage({ user, repo, resultPage, message });
    return response.ok ? `https://${user.username}.github.io/${repo}/` : null;
  } catch {
    return null;
  }
};

export const getUserPublicRepos = async (user: User) => {
  let page = 1;
  const pageSize = 100;
  const maxPages = 5;
  const results = [];

  while (page <= maxPages) {
    const response = await fetch(
      `https://api.github.com/user/repos?type=public&per_page=${pageSize}&page=${page}`,
      {
        method: 'GET',
        headers: getHeaders(user),
      },
    );
    page += 1;
    if (!response.ok) {
      continue;
    }
    const newResults = await response.json();
    results.push(...newResults.map((repo: any) => repo.name));
    if (newResults.length < pageSize) {
      page = maxPages + 1;
    }
  }
  return results;
};
