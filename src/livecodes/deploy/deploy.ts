/* eslint-disable import/no-internal-modules */
import type { ContentConfig, User } from '../models';
import type { getLanguageExtension as getLanguageExtensionFn } from '../languages';
import { getDescriptionFile, getFilesFromConfig } from '../export/utils';
import { generateId } from '../storage';
import { safeName } from '../utils';
import {
  createBranch,
  createCommit,
  createFile,
  createRepo,
  createTree,
  getLastCommit,
  GitHubFile,
  initializeRepo,
  repoExists,
  updateBranch,
} from '../services/github';
import { defaultConfig } from '../config/default-config';

const prepareFiles = ({
  config,
  content,
  commitSource,
  singleFile,
  deps,
}: {
  config: ContentConfig;
  content: {
    resultPage: string;
    style?: string;
    script?: string;
  };
  commitSource: boolean;
  singleFile: boolean;
  deps: {
    getLanguageExtension: typeof getLanguageExtensionFn;
  };
}): GitHubFile[] => {
  const files = [{ path: 'index.html', content: content.resultPage }];
  if (!singleFile) {
    files.push(
      { path: 'style.css', content: content.style || '' },
      { path: 'script.js', content: content.script || '' },
    );
  }
  if (commitSource) {
    const sourceFiles = getFilesFromConfig(config, deps);
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
  deps,
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
  deps: {
    getLanguageExtension: typeof getLanguageExtensionFn;
  };
}): Promise<DeployResult | null> => {
  let lastCommit: string | null;
  let tree: string | null;
  let commit: string | null;
  let succeeded = false;

  if (newRepo) {
    repo = safeName(repo, '-').toLowerCase();
  }

  const files = prepareFiles({ config, content, commitSource, singleFile, deps });
  const branch = 'gh-pages';
  const urlToSrc = commitSource
    ? `https://github.com/${user.username}/${repo}/tree/gh-pages/src`
    : undefined;
  const description = config.title !== defaultConfig.title ? config.title : '';
  const readmeContent = Object.values(getDescriptionFile(config, user, urlToSrc, false))[0].content;

  try {
    if (newRepo) {
      await createRepo(user, repo, description);
      await initializeRepo(user, repo, 'main', readmeContent);
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
