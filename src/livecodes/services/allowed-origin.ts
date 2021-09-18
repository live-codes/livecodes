export const allowedOrigin = (origin = location.origin) =>
  origin &&
  (origin.endsWith('livecodes.io') ||
    origin.endsWith('livecodes.pages.dev') ||
    origin.startsWith('http://127.0.0.1') ||
    origin.startsWith('http://localhost'));
