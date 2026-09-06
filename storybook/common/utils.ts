export const appUrl =
  location.hostname.startsWith('localhost') || location.hostname.startsWith('127.0.0.1')
    ? 'http://127.0.0.1:8080'
    : location.origin;
