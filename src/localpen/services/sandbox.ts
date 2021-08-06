const local = (url: string) => {
  if (
    window.location.origin.startsWith('http://127.0.0.1') ||
    window.location.origin.startsWith('http://localhost')
  ) {
    if (url === 'result') {
      return '/result.html';
    }
    if (url === 'compiler') {
      return '/compiler.html';
    }
    if (url === 'origin') {
      return window.location.origin;
    }
  }
  return false;
};
export const sandboxService = {
  getResultUrl: () => local('result') || 'https://localpen-sandbox.pages.dev/v1/result',
  getCompilerUrl: () => local('compiler') || 'https://localpen-sandbox.pages.dev/v1/compiler',
  getOrigin: () => local('origin') || 'https://localpen-sandbox.pages.dev',
};
