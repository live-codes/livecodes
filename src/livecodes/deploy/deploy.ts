import { defaultConfig } from '../config';
import { getDescriptionFile, getFilesFromConfig } from '../export';
// eslint-disable-next-line import/no-internal-modules
import { getGithubHeaders } from '../import/github-headers';
import { ContentConfig, User } from '../models';
import { generateId } from '../storage';
import { safeName } from '../utils';

export const repoExists = async (user: User, repo: string) => {
  try {
    const res = await fetch(`https://api.github.com/repos/${user.username}/${repo}`, {
      method: 'GET',
      headers: getGithubHeaders(user),
    });
    return res.ok;
  } catch {
    return false;
  }
};

const createRepo = async (user: User, repo: string, config: ContentConfig) => {
  const res = await fetch('https://api.github.com/user/repos', {
    method: 'POST',
    headers: getGithubHeaders(user),
    body: JSON.stringify({
      name: repo,
      private: false,
      homepage: `https://${user.username}.github.io/${repo}/`,
      ...(config.title !== defaultConfig.title ? { description: config.title } : {}),
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
  file: { path: string; content: string };
  message: string;
  initialize: boolean;
  encoded: boolean;
}) => {
  const url = `https://api.github.com/repos/${user.username}/${repo}/contents/`;

  let sha: string | undefined;

  if (!initialize) {
    const response = await fetch(url, {
      method: 'GET',
      headers: getGithubHeaders(user),
    });
    if (response.ok) {
      const files = await response.json();
      sha = files.find((f: any) => f.path === file.path)?.sha;
    }
  }

  const res = await fetch(url + file.path, {
    method: 'PUT',
    headers: getGithubHeaders(user),
    body: JSON.stringify({
      message: message || 'deploy',
      content: encoded ? file.content : btoa(file.content),
      branch,
      ...(sha ? { sha } : {}),
    }),
  });

  if (!res.ok) {
    throw new Error('Error creating file');
  }
  return res.json();
};

const initializeRepo = async (user: User, repo: string, branch = 'main', readmeContent?: string) =>
  (
    await createFile({
      user,
      repo,
      branch,
      file: { path: 'readme.md', content: `${readmeContent || '# ' + repo + '\n'}` },
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

const createTree = async (
  user: User,
  repo: string,
  files: Array<{ path: string; content: string }>,
): Promise<string> => {
  const tree = files.map((file) => ({
    path: file.path,
    mode: '100644',
    type: 'blob',
    content: file.content,
  }));

  const res = await fetch(`https://api.github.com/repos/${user.username}/${repo}/git/trees`, {
    method: 'POST',
    headers: getGithubHeaders(user),
    body: JSON.stringify({ tree }),
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

export interface GitHubFile {
  path: string;
  content: string;
}

const prepareFiles = ({
  config,
  content,
  commitSource,
  singleFile,
}: {
  config: ContentConfig;
  content: {
    resultPage: string;
    style?: string;
    script?: string;
  };
  commitSource: boolean;
  singleFile: boolean;
}): GitHubFile[] => {
  const files = [{ path: 'index.html', content: content.resultPage }];
  if (!singleFile) {
    files.push(
      { path: 'style.css', content: content.style || '' },
      { path: 'script.js', content: content.script || '' },
    );
  }
  if (commitSource) {
    const sourceFiles = getFilesFromConfig(config);
    files.push(
      ...Object.keys(sourceFiles).map((filename) => ({
        path: 'src/' + filename,
        content: sourceFiles[filename].content,
      })),
      { path: 'src/livecodes.json', content: JSON.stringify(config, null, 2) },
    );
  }
  return files;
};

export interface DeployResult {
  url: string;
  username: string;
  repo: string;
  tree: string;
  commit: string;
}

export const deploy = async ({
  user,
  repo,
  config,
  content,
  message,
  commitSource = true,
  singleFile,
  newRepo = true,
}: {
  user: User;
  repo: string;
  config: ContentConfig;
  content: {
    resultPage: string;
    style: string;
    script: string;
  };
  message: string;
  commitSource: boolean;
  singleFile: boolean;
  newRepo: boolean;
}): Promise<DeployResult | null> => {
  let lastCommit: string | null;
  let tree: string | null;
  let commit: string | null;
  let succeeded = false;

  if (newRepo) {
    repo = safeName(repo, '-').toLowerCase();
  }

  const files = prepareFiles({ config, content, commitSource, singleFile });
  const branch = 'gh-pages';
  const urlToSrc = commitSource
    ? `https://github.com/${user.username}/${repo}/tree/gh-pages/src`
    : undefined;
  const description = Object.values(getDescriptionFile(config, user, urlToSrc, false))[0].content;

  try {
    if (newRepo) {
      await createRepo(user, repo, config);
      await initializeRepo(user, repo, 'main', description);
      lastCommit = null;
    } else {
      lastCommit = await getLastCommit(user, repo, branch);
    }
    tree = await createTree(user, repo, files);
    commit = await createCommit(user, repo, message, tree, lastCommit);

    if (lastCommit) {
      succeeded = await updateBranch(user, repo, branch, commit);
    } else {
      succeeded = await createBranch(user, repo, branch, commit);
    }

    if (!succeeded) return null;

    return {
      url: `https://${user.username}.github.io/${repo}/`,
      username: user.username as string,
      repo,
      tree,
      commit,
    };
  } catch (error: any) {
    if (error.message === 'Repo name already exists') {
      throw error;
    }
    return null;
  }
};

export const deployFile = async ({
  user,
  repo = 'livecodes-assets',
  branch = 'gh-pages',
  message,
  file,
}: {
  user: User;
  repo?: string;
  branch?: string;
  message?: string;
  file: GitHubFile;
}): Promise<DeployResult | null> => {
  message = message || 'add ' + file.path;

  try {
    if (!(await repoExists(user, repo))) {
      repo = safeName(repo, '-').toLowerCase();
      if (repo === 'livecodes-assets') {
        const description = 'LiveCodes assets';
        await createRepo(user, repo, { title: description } as any);
        await initializeRepo(user, repo, branch, '# ' + description);
      } else {
        await createRepo(user, repo, {} as any);
        await initializeRepo(user, repo, branch);
      }
    }

    const result = await createFile({
      user,
      repo,
      branch,
      file: { path: `assets/${generateId()}/${file.path}`, content: file.content },
      message,
      initialize: true,
      encoded: true,
    });

    return {
      url: `https://${user.username}.github.io/${repo}/${result.content.path}`,
      username: user.username as string,
      repo,
      tree: result?.commit?.tree?.sha,
      commit: result?.commit?.sha,
    };
  } catch (error: any) {
    return null;
  }
};

export const deployedConfirmation = (deployResult: DeployResult, sourcePublished: boolean) => {
  const { url, username, repo, commit } = deployResult;
  const linkToSource = !sourcePublished
    ? ''
    : `
    <div class="description">
      <p>
        The source code is
        <a
          href="https://github.com/${username}/${repo}/tree/${commit}/src"
          target="_blank"
        >
          publicly available
        </a>
      </p>
      <p>
        Permanent link:
        <a
          href="https://livecodes.io/?config=https://raw.githubusercontent.com/${username}/${repo}/${commit}/src/livecodes.json"
          target="_blank"
        >
          Edit in LiveCodes
        </a>
      </p>
    </div>
`;
  const msg = `
    <div id="deploy-container" class="modal-container">
      <div class="modal-title">Deployed Successfully!</div>
      <p>
        Your project has been deployed successfully to GitHub Pages, and will shortly be available on: <br />
        <a href="${url}" target="_blank">${url}</a>
      </p>
      ${linkToSource}
    </div>
  `;

  const confirmationContianer = document.createElement('div');
  confirmationContianer.innerHTML = msg;
  return confirmationContianer;
};
