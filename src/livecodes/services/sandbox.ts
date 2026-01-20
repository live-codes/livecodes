import { sandboxVersion } from '../html/sandbox/index';

const cfPagesBaseUrl = 'https://livecodes-sandbox.pages.dev';
const ghPagesBaseUrl = 'https://live-codes.github.io/livecodes-sandbox/dist';
const selfHostedBaseUrl = `https://${process.env.SANDBOX_HOST_NAME}:${process.env.SANDBOX_PORT}`;
const localBaseUrl = 'http://127.0.0.1:8085';

const serviceBaseUrl =
  location.hostname === 'localhost' || location.hostname === '127.0.0.1'
    ? localBaseUrl
    : process.env.SELF_HOSTED === 'true'
      ? selfHostedBaseUrl
      : process.env.CI === 'true'
        ? ghPagesBaseUrl
        : cfPagesBaseUrl;
const version = sandboxVersion;
const ext = serviceBaseUrl === localBaseUrl ? '.html' : '';

export const sandboxService = {
  getResultUrl: () => `${serviceBaseUrl}/${version}/`,
  getCompilerUrl: () => `${serviceBaseUrl}/${version}/compiler${ext}`,
  getOrigin: () => new URL(serviceBaseUrl).origin,
};
