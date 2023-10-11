import {
  isGithubUrl,
  isGithubDir,
  isGithubGist,
  isGitlabUrl,
  isGitlabDir,
  isGitlabSnippet,
  isJsbin,
} from '../check-src';

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

  test('isJsbin', () => {
    const examples = [
      'https://jsbin.com/fajac',
      'https://jsbin.com/fajac/',
      'https://jsbin.com/fajac/3',
      'https://jsbin.com/fajac/3/',
      'https://jsbin.com/fajac/edit',
      'https://jsbin.com/fajac/edit?html,output',
      'https://jsbin.com/fajac/3/edit',
      'https://jsbin.com/fajac/3/edit?html,output',
      'http://jsbin.com/fajac',
      'jsbin.com/fajac',
      'output.jsbin.com/fajac',
      'https://output.jsbin.com/fajac',
      'https://output.jsbin.com/fajac/3',
      'https://dave.jsbin.com/fajac/3/',
      'https://dave.jsbin.com/fajac/3/edit',
    ];
    examples.forEach((example) => {
      expect(isJsbin(example)).toBeTruthy();
    });
    expect(isJsbin('https://jsbin.com')).toBeFalsy();
  });
});
