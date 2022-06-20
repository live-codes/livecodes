import { User } from '../models';
// eslint-disable-next-line import/no-internal-modules
import { getGithubHeaders } from '../import/github-headers';

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
        headers: getGithubHeaders(user),
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
