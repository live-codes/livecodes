import type { Config, SDKConfig, User } from '../models';
import { getValidUrl } from '../utils/utils';
import {
  isCodepen,
  isCompressedCode,
  isDom,
  isGithubDir,
  isGithubGist,
  isGithubUrl,
  isGitlabDir,
  isGitlabSnippet,
  isGitlabUrl,
  isJsbin,
  isProjectId,
  isTypescriptPlayground,
  isVuePlayground,
} from './check-src';
import { importCompressedCode } from './code';
import { importProject } from './project-id';

export const importCode = async (
  url: string,
  params: { [key: string]: any },
  config: Config,
  user: User | null | void,
  baseUrl: string,
): Promise<Partial<Config | SDKConfig>> => {
  if (isCompressedCode(url)) {
    return importCompressedCode(url);
  }
  if (isProjectId(url)) {
    return importProject(url);
  }

  const importSrc: typeof import('./import-src') = await import(baseUrl + '{{hash:import-src.js}}');
  const {
    importFromCodepen,
    importFromDom,
    importFromGithub,
    importFromGithubDir,
    importFromGithubGist,
    importFromGitlab,
    importFromGitlabDir,
    importFromGitlabSnippet,
    importFromJsbin,
    importTypescriptPlayground,
    importVuePlayground,
    importFromUrl,
  } = importSrc;

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
  if (isTypescriptPlayground(url)) {
    return importTypescriptPlayground(url);
  }
  if (isVuePlayground(url)) {
    return importVuePlayground(url);
  }
  if (getValidUrl(url)) {
    return importFromUrl(url, params, config);
  }
  return Promise.resolve({});
};
