// also in functions\allowed-origin.ts

const getHostname = (origin: string) => {
  try {
    return new URL(origin).hostname;
  } catch {
    return '';
  }
};

const matchesDomain = (hostname: string, domain: string) =>
  hostname === domain || hostname.endsWith('.' + domain);

export const allowedOrigin = (origin = location.origin) => {
  const hostname = getHostname(origin);
  return Boolean(
    hostname &&
      (matchesDomain(hostname, 'livecodes.io') ||
        matchesDomain(hostname, 'livecodes.pages.dev') ||
        matchesDomain(hostname, 'localpen.pages.dev') ||
        (process.env.HOST_NAME && matchesDomain(hostname, process.env.HOST_NAME)) ||
        matchesDomain(hostname, 'localhost') ||
        hostname === '127.0.0.1' ||
        hostname.endsWith('.test')),
  );
};

export const whitelistTarget = (url: string) => {
  try {
    const { protocol, hostname } = new URL(url);
    return (
      (protocol === 'http:' || protocol === 'https:') &&
      ['githubusercontent.com', 'jsbin.com'].some((domain) => matchesDomain(hostname, domain))
    );
  } catch {
    return false;
  }
};
