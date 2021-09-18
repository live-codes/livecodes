import { isGithubUrl } from '../github';
import { isGithubDir } from '../github-dir';
import { isGithubGist } from '../github-gist';
import { isGitlabUrl } from '../gitlab';
import { isGitlabDir } from '../gitlab-dir';
import { isGitlabSnippet } from '../gitlab-snippet';

describe('match hosts', () => {
  test('isGithubUrl', () => {
    expect(
      isGithubUrl('https://github.com/microsoft/monaco-editor/blob/master/README.md'),
    ).toBeTruthy();
    expect(isGithubUrl('github.com/microsoft/monaco-editor/blob/master/README.md')).toBeTruthy();
    expect(isGithubUrl('https://github.com')).toBeFalsy();
  });

  test('isGithubDir', () => {
    expect(isGithubDir('https://github.com/live-codes/livecodes/tree/develop/src')).toBeTruthy();
    expect(isGithubDir('github.com/live-codes/livecodes/tree/develop/src')).toBeTruthy();
    expect(isGithubDir('github.com/live-codes/livecodes')).toBeTruthy();
    expect(isGithubDir('https://github.com/live-codes')).toBeFalsy();
    expect(isGithubDir('https://github.com')).toBeFalsy();
  });

  test('isGithubGist', () => {
    expect(
      isGithubGist('https://gist.github.com/hatemhosny/2e4da061fe1f0d18e977681a69063780'),
    ).toBeTruthy();
    expect(
      isGithubGist('gist.github.com/hatemhosny/2e4da061fe1f0d18e977681a69063780'),
    ).toBeTruthy();
    expect(isGithubGist('https://gist.github.com/2e4da061fe1f0d18e977681a69063780')).toBeTruthy();
    expect(isGithubGist('gist.github.com/2e4da061fe1f0d18e977681a69063780')).toBeTruthy();
    expect(isGithubGist('https://gist.github.com')).toBeFalsy();
  });

  test('isGitlabUrl', () => {
    expect(
      isGitlabUrl('https://gitlab.com/inkscape/inkscape/-/blob/master/doc/architecture.txt'),
    ).toBeTruthy();
    expect(
      isGitlabUrl('gitlab.com/inkscape/inkscape/-/blob/master/doc/architecture.txt'),
    ).toBeTruthy();
    expect(isGitlabUrl('https://gitlab.com')).toBeFalsy();
  });

  test('isGitlabDir', () => {
    expect(isGitlabDir('https://gitlab.com/inkscape/inkscape/-/tree/master/doc')).toBeTruthy();
    expect(isGitlabDir('gitlab.com/inkscape/inkscape/-/tree/master/doc')).toBeTruthy();
    expect(isGitlabDir('https://gitlab.com/inkscape/inkscape')).toBeTruthy();
    expect(isGitlabDir('https://gitlab.com/inkscape')).toBeFalsy();
    expect(isGitlabDir('https://gitlab.com')).toBeFalsy();
  });

  test('isGitlabSnippet', () => {
    expect(isGitlabSnippet('https://gitlab.com/-/snippets/2056374')).toBeTruthy();
    expect(isGitlabSnippet('gitlab.com/-/snippets/2056374')).toBeTruthy();
    expect(isGitlabSnippet('https://gitlab.com')).toBeFalsy();
  });
});
