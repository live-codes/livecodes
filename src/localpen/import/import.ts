import { Pen } from '../models';
import { importFromGithub, isGithubUrl } from './github';
import { importFromGithubDir, isGithubDir } from './github-dir';
import { importFromGithubGist, isGithubGist } from './github-gist';
import { importFromGitlab, isGitlabUrl } from './gitlab';
import { importFromGitlabDir, isGitlabDir } from './gitlab-dir';
import { importFromGitlabSnippet, isGitlabSnippet } from './gitlab-snippet';
import { importFromUrl } from './url';

export const importCode = async (
  url: string,
  params: { [key: string]: any },
  config: Pen,
): Promise<Partial<Pen>> => {
  if (isGithubGist(url)) {
    return importFromGithubGist(url, params);
  }
  if (isGithubDir(url)) {
    return importFromGithubDir(url, params);
  }
  if (isGithubUrl(url)) {
    return importFromGithub(url);
  }
  if (isGitlabSnippet(url)) {
    return importFromGitlabSnippet(url, params);
  }
  if (isGitlabDir(url)) {
    return importFromGitlabDir(url, params);
  }
  if (isGitlabUrl(url)) {
    return importFromGitlab(url);
  }
  if (url) {
    return importFromUrl(url, params, config);
  }
  return Promise.resolve({});
};
