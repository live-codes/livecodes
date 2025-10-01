import { sandboxVersion } from '../html/sandbox/index';

const cfPagesBaseUrl = 'https://livecodes-sandbox.pages.dev';
const ghPagesBaseUrl = 'https://live-codes.github.io/livecodes-sandbox/dist';
const selfHostedBaseUrl = `https://${process.env.SANDBOX_HOST_NAME}:${process.env.SANDBOX_PORT}`;

const serviceBaseUrl =
  process.env.SELF_HOSTED === 'true'
    ? selfHostedBaseUrl
    : process.env.CI === 'true'
      ? ghPagesBaseUrl
      : cfPagesBaseUrl;
const version = sandboxVersion;

export const sandboxService = {
  getResultUrl: () => `${serviceBaseUrl}/${version}/`,
  getCompilerUrl: () => `${serviceBaseUrl}/${version}/compiler`,
  getOrigin: () => new URL(serviceBaseUrl).origin,
};
