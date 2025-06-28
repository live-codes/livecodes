const cfPagesBaseUrl = 'https://livecodes-sandbox.pages.dev';
const ghPagesBaseUrl = 'https://live-codes.github.io/livecodes-sandbox/dist';
const selfHostedBaseUrl = `https://${process.env.SANDBOX_HOST_NAME}:${process.env.SANDBOX_PORT}`;

const serviceBaseUrl = process.env.SELF_HOSTED
  ? selfHostedBaseUrl
  : process.env.CI
    ? ghPagesBaseUrl
    : cfPagesBaseUrl;
const version = 'v8';

export const sandboxService = {
  getResultUrl: () => `${serviceBaseUrl}/${version}/`,
  getCompilerUrl: () => `${serviceBaseUrl}/${version}/compiler`,
  getOrigin: () => new URL(serviceBaseUrl).origin,
};
