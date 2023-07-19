import { encode } from 'js-base64';
import type { User } from '../models';
// eslint-disable-next-line import/no-internal-modules
import { safeName } from '../utils/utils';

export interface GitHubFile {
  path: string;
  content: string;
}
export const getGithubHeaders = (user: User, mediaType?: 'object' | 'raw') => ({
  Accept: `application/vnd.github.v3${mediaType ? '.' + mediaType : ''}+json`,
  'Content-Type': 'application/json',
  Authorization: 'token ' + user.token,
});

export const repoExists = async (user: User, repo: string) => {
  try {
    const res = await fetch(`https://api.github.com/repos/${user.username}/${repo}`, {
      method: 'GET',
      cache: 'no-store',
      headers: getGithubHeaders(user),
    });
    return res.ok;
  } catch {
    return false;
  }
};

const createRepo = async (user: User, repo: string, privateRepo = false, description?: string) => {
  const res = await fetch('https://api.github.com/user/repos', {
    method: 'POST',
    cache: 'no-store',
    headers: getGithubHeaders(user),
    body: JSON.stringify({
      name: repo,
      private: privateRepo,
      ...(privateRepo ? {} : { homepage: `https://${user.username}.github.io/${repo}/` }),
      ...(description ? { description } : {}),
    }),
  });
  if (!res.ok) {
    const error = await res.json().then((data) => data.errors[0]?.message);
    if (error === 'name already exists on this account') {
      throw new Error('Repo name already exists');
    }
    throw new Error('Error creating repo');
  }
  return res.json().then((data) => data.name);
};

const createFile = async ({
  user,
  repo,
  branch,
  file,
  message,
  initialize = false,
  encoded = false,
}: {
  user: User;
  repo: string;
  branch: string;
  file: GitHubFile;
  message: string;
  initialize: boolean;
  encoded: boolean;
}) => {
  const url = `https://api.github.com/repos/${user.username}/${repo}/contents/`;
  const path = file.path.split('/').slice(0, -1).join('/');

  let sha: string | undefined;

  if (!initialize) {
    const response = await fetch(url + path, {
      method: 'GET',
      cache: 'no-store',
      headers: getGithubHeaders(user),
    });
    if (response.ok) {
      const files = await response.json();
      sha = files.find((f: any) => f.path === file.path)?.sha;
    }
  }
  const res = await fetch(url + file.path, {
    method: 'PUT',
    cache: 'no-store',
    headers: getGithubHeaders(user),
    body: JSON.stringify({
      message: message || 'deploy',
      content: encoded ? file.content : encode(file.content),
      branch,
      ...(sha ? { sha } : {}),
    }),
  });

  if (!res.ok) {
    throw new Error('Error creating file');
  }
  return res.json();
};

export const getContent = async ({
  user,
  repo,
  branch,
  path,
}: {
  user: User;
  repo: string;
  branch?: string;
  path: string;
}) => {
  const url =
    `https://api.github.com/repos/${user.username}/${repo}/contents/${path}` +
    (branch ? `?ref=${branch}` : '');

  const res = await fetch(url, {
    method: 'GET',
    cache: 'no-store',
    headers: getGithubHeaders(user, 'object'),
  });

  if (!res.ok) {
    throw new Error('Error getting file');
  }

  const result = await res.json();

  // https://docs.github.com/en/rest/repos/contents#size-limits
  if (result.content === '' && result.encoding === 'none') {
    const rawRes = await fetch(url, {
      method: 'GET',
      cache: 'no-store',
      headers: getGithubHeaders(user, 'raw'),
    });
    if (!rawRes.ok) {
      throw new Error('Error getting file');
    }

    if (path.endsWith('.b64.zip')) {
      // sync data
      result.content = await rawRes.arrayBuffer();
      result.encoding = 'arrayBuffer';
    } else {
      result.content = encode(await rawRes.text());
      result.encoding = 'base64';
    }
  }

  return result;
};

const initializeRepo = async (user: User, repo: string, branch = 'main', readmeContent?: string) =>
  (
    await createFile({
      user,
      repo,
      branch,
      file: { path: 'README.md', content: `${readmeContent || '# ' + repo + '\n'}` },
      message: 'initial commit',
      initialize: true,
      encoded: false,
    })
  )?.commit.sha;

const getLastCommit = async (user: User, repo: string, branch: string) => {
  const res = await fetch(
    `https://api.github.com/repos/${user.username}/${repo}/git/matching-refs/heads/${branch}?per_page=100`,
    {
      method: 'GET',
      cache: 'no-store',
      headers: getGithubHeaders(user),
    },
  );
  const refs = await res.json();

  if (refs.message === 'Git Repository is empty.') {
    const commit = await initializeRepo(user, repo, 'main');
    return branch === 'main' ? commit : null;
  }

  if (!res.ok) {
    throw new Error('Error getting last commit');
  }

  const branchRef = refs.find((ref: any) => ref.ref === `refs/heads/${branch}`);

  if (!branchRef) return null;
  return branchRef.object.sha;
};

const getTree = async (user: User, repo: string, commit: string) => {
  const res = await fetch(
    `https://api.github.com/repos/${user.username}/${repo}/commits/${commit}`,
    {
      method: 'GET',
      cache: 'no-store',
      headers: getGithubHeaders(user),
    },
  );

  if (!res.ok) {
    throw new Error('Error getting commit tree');
  }

  const data = await res.json();
  const tree = data?.commit?.tree?.sha;

  if (!tree) return null;
  return tree;
};

const createTree = async (
  user: User,
  repo: string,
  files: GitHubFile[],
  baseTree: string | null,
): Promise<string> => {
  const tree = files.map((file) => ({
    path: file.path,
    mode: '100644',
    type: 'blob',
    content: file.content,
  }));

  const res = await fetch(`https://api.github.com/repos/${user.username}/${repo}/git/trees`, {
    method: 'POST',
    cache: 'no-store',
    headers: getGithubHeaders(user),
    body: JSON.stringify({
      // eslint-disable-next-line camelcase
      ...(baseTree ? { base_tree: baseTree } : {}),
      tree,
    }),
  });
  if (!res.ok) {
    throw new Error('Error creating tree');
  }
  return res.json().then((data) => data.sha);
};

const createCommit = async (
  user: User,
  repo: string,
  message: string,
  tree: string,
  lastCommit: string | null,
): Promise<string> => {
  const res = await fetch(`https://api.github.com/repos/${user.username}/${repo}/git/commits`, {
    method: 'POST',
    cache: 'no-store',
    headers: getGithubHeaders(user),
    body: JSON.stringify({
      tree,
      message: message || 'deploy',
      ...(lastCommit ? { parents: [lastCommit] } : {}),
    }),
  });
  if (!res.ok) {
    throw new Error('Error creating commit');
  }
  return res.json().then((data) => data.sha);
};

const createBranch = async (user: User, repo: string, branch: string, commit: string) => {
  const res = await fetch(`https://api.github.com/repos/${user.username}/${repo}/git/refs`, {
    method: 'POST',
    cache: 'no-store',
    headers: getGithubHeaders(user),
    body: JSON.stringify({
      ref: `refs/heads/${branch}`,
      sha: commit,
    }),
  });
  if (!res.ok) {
    throw new Error('Error creating branch');
  }
  return true;
};

const updateBranch = async (user: User, repo: string, branch: string, commit: string) => {
  const res = await fetch(
    `https://api.github.com/repos/${user.username}/${repo}/git/refs/heads/${branch}`,
    {
      method: 'PATCH',
      cache: 'no-store',
      headers: getGithubHeaders(user),
      body: JSON.stringify({
        sha: commit,
      }),
    },
  );
  if (!res.ok) {
    throw new Error('Error updating branch');
  }
  return true;
};

export const commitFiles = async ({
  files,
  user,
  repo,
  branch,
  message,
  newRepo,
  privateRepo,
  description,
  readmeContent,
  clearPrevious = true,
}: {
  files: GitHubFile[];
  user: User;
  repo: string;
  branch: string;
  message: string;
  newRepo?: boolean;
  privateRepo?: boolean;
  description?: string;
  readmeContent?: string;
  clearPrevious?: boolean;
}) => {
  let lastCommit: string | null;
  let tree: string | null;
  let commit: string | null;
  let succeeded = false;

  if (newRepo) {
    repo = safeName(repo, '-').toLowerCase();
  }

  try {
    if (newRepo || !(await repoExists(user, repo))) {
      newRepo = true;
      await createRepo(user, repo, privateRepo, description);
      const initialCommit = await initializeRepo(user, repo, 'main', readmeContent);
      lastCommit = branch === 'main' ? initialCommit : null;
    } else {
      lastCommit = await getLastCommit(user, repo, branch);
    }
    const baseTree = lastCommit && !clearPrevious ? await getTree(user, repo, lastCommit) : null;
    tree = await createTree(user, repo, files, baseTree);
    commit = await createCommit(user, repo, message, tree, lastCommit);

    if (lastCommit) {
      succeeded = await updateBranch(user, repo, branch, commit);
    } else {
      succeeded = await createBranch(user, repo, branch, commit);
    }

    if (!succeeded) return null;

    return {
      tree,
      commit,
    };
  } catch (error: any) {
    return null;
  }
};

export const commitFile = async ({
  file,
  user,
  repo,
  branch,
  message,
  newRepo,
  privateRepo,
  description,
  readmeContent,
}: {
  file: GitHubFile;
  user: User;
  repo: string;
  branch: string;
  message: string;
  newRepo?: boolean;
  privateRepo?: boolean;
  description?: string;
  readmeContent?: string;
}) => {
  try {
    if (newRepo || !(await repoExists(user, repo))) {
      newRepo = true;
      repo = safeName(repo, '-').toLowerCase();
      await createRepo(user, repo, privateRepo, description);
      await initializeRepo(user, repo, branch, readmeContent);
    }

    const result = await createFile({
      user,
      repo,
      branch,
      file,
      message,
      initialize: newRepo || false,
      encoded: true,
    });

    return {
      tree: result?.commit?.tree?.sha,
      commit: result?.commit?.sha,
    };
  } catch (error: any) {
    return null;
  }
};

export const getUserRepos = async (
  user: User,
  reposType: 'all' | 'owner' | 'public' | 'private' | 'member' = 'public',
) => {
  let page = 1;
  const pageSize = 100;
  const maxPages = 5;
  const results = [];

  while (page <= maxPages) {
    const response = await fetch(
      `https://api.github.com/user/repos?type=${reposType}&per_page=${pageSize}&page=${page}`,
      {
        method: 'GET',
        cache: 'no-store',
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
