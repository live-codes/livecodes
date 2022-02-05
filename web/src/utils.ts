export const appUrl =
  globalThis.location?.hostname.startsWith('127.0.0.1') ||
  globalThis.location?.hostname.startsWith('localhost')
    ? 'http://127.0.0.1:8080/'
    : globalThis.location?.origin || 'https://livecodes.io/';
