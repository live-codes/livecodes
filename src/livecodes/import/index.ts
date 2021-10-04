import { isGithubUrl } from './github';
import { isGithubDir } from './github-dir';

export * from './url';
export * from './import';
export * from './github-headers';

export const isGithub = (url: string) => isGithubDir(url) || isGithubUrl(url);
