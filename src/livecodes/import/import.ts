import { Config, User } from '../models';
import { importCompressedCode, isCompressedCode } from './code';
import { importFromCodepen, isCodepen } from './codepen';
import { importFromDom, isDom } from './dom';
import { importFromGithub, isGithubUrl } from './github';
import { importFromGithubDir, isGithubDir } from './github-dir';
import { importFromGithubGist, isGithubGist } from './github-gist';
import { importFromGitlab, isGitlabUrl } from './gitlab';
import { importFromGitlabDir, isGitlabDir } from './gitlab-dir';
import { importFromGitlabSnippet, isGitlabSnippet } from './gitlab-snippet';
import { importFromJsbin, isJsbin } from './jsbin';
import { importProject, isProjectId } from './project-id';
import { importFromUrl } from './url';

export const importCode = async (
  url: string,
  params: { [key: string]: any },
  config: Config,
  user: User | null | void,
): Promise<Partial<Config>> => {
  if (isCompressedCode(url)) {
    return importCompressedCode(url);
  }
  if (isProjectId(url)) {
    return importProject(url);
  }
  if (isDom(url)) {
    return importFromDom(url, params, config);
  }
  if (isGithubGist(url)) {
    return importFromGithubGist(url, params);
  }
  if (isGithubDir(url)) {
    return importFromGithubDir(url, params, user);
  }
  if (isGithubUrl(url)) {
    return importFromGithub(url, user);
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
  if (isCodepen(url)) {
    return importFromCodepen(url);
  }
  if (isJsbin(url)) {
    return importFromJsbin(url);
  }
  if (url) {
    return importFromUrl(url, params, config);
  }
  return Promise.resolve({});
};
