import { allowedOrigin, whitelistTarget } from './allowed-origin';

const corsApiUrl = 'https://api.livecodes.io/cors';

export const corsService = {
  fetch: async (url: string, options?: RequestInit) => {
    if (!allowedOrigin()) {
      return fetch(url, options);
    }

    const corsUrl = corsApiUrl + '?url=' + encodeURIComponent(url);
    if (whitelistTarget(url)) {
      return fetch(corsUrl, options);
    }

    return fetch(url, options).catch(() => fetch(corsUrl, options));
  },
};
