import { isGithubUrl } from '../github';

describe('github', () => {
  test('isGithubUrl', () => {
    expect(
      isGithubUrl('https://github.com/microsoft/monaco-editor/blob/master/README.md'),
    ).toBeTruthy();
    expect(isGithubUrl('github.com/microsoft/monaco-editor/blob/master/README.md')).toBeTruthy();
    expect(isGithubUrl('https://github.com')).toBeFalsy();
  });
});
