/* eslint-disable import/no-internal-modules */
import type { ContentConfig, User } from '../models';
import type { getLanguageExtension as getLanguageExtensionFn } from '../languages';
import { getDescriptionFile, getFilesFromConfig } from '../export/utils';
import { generateId } from '../storage/storage';
import { safeName } from '../utils/utils';
import { commitFile, commitFiles, type GitHubFile } from '../services/github';
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

  const result = await commitFiles({
    files,
    user,
    repo,
    branch,
    message,
    newRepo,
    privateRepo: false,
    description,
    readmeContent,
    clearPrevious: true,
  });
  if (!result) return null;
  return {
    url: `https://${user.username}.github.io/${repo}/`,
    username: user.username as string,
    repo,
    tree: result.tree,
    commit: result.commit,
  };
};

export const deployFile = async ({
  file,
  user,
  repo,
  branch,
  message,
  description,
  readmeContent,
}: {
  file: GitHubFile;
  user: User;
  repo: string;
  branch: string;
  message: string;
  description?: string;
  readmeContent?: string;
}): Promise<DeployResult | null> => {
  const githubFile: GitHubFile = {
    path: `assets/${generateId()}/${file.path}`,
    content: file.content,
  };
  const result = await commitFile({
    file: githubFile,
    user,
    repo,
    branch,
    message,
    privateRepo: false,
    description,
    readmeContent,
  });
  if (!result) return null;
  return {
    url: `https://${user.username}.github.io/${repo}/${githubFile.path}`,
    username: user.username as string,
    repo,
    tree: result?.tree,
    commit: result?.commit,
  };
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
      <p>
        Check
        <a
          href="https://github.com/${username}/${repo}/actions"
          target="_blank"
        >
          deployment status
        </a>
      </p>
    </div>
`;
  const msg = `
    <div id="deploy-container" class="modal-container">
      <div class="modal-title">Deployed Successfully!</div>
      <p>
        Your project has been deployed successfully to GitHub Pages, and will shortly be available (~1&nbsp;min) on: <br />
        <a href="${url}" target="_blank">${url}</a>
      </p>
      <div id="deploy-qrcode" class="qrcode-container">Generating...</div>
      ${linkToSource}
    </div>
  `;

  const confirmationContianer = document.createElement('div');
  confirmationContianer.innerHTML = msg;
  return confirmationContianer;
};
