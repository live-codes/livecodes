const cfPagesBaseUrl = 'https://livecodes-sandbox.pages.dev';
const ghPagesBaseUrl = 'https://live-codes.github.io/livecodes-sandbox/dist';

const serviceBaseUrl = process.env.CI ? ghPagesBaseUrl : cfPagesBaseUrl;
const version = 'v4';

export const sandboxService = {
  getResultUrl: () => `${serviceBaseUrl}/${version}/result`,
  getCompilerUrl: () => `${serviceBaseUrl}/${version}/compiler`,
  getOrigin: () => new URL(serviceBaseUrl).origin,
};
