export const allowedOrigin = (origin = location.origin) =>
  origin &&
  (origin.endsWith('localpen.io') ||
    origin.endsWith('localpen.pages.dev') ||
    origin.startsWith('http://127.0.0.1') ||
    origin.startsWith('http://localhost'));
