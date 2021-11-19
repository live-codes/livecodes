import { fetchWithHandler } from '../utils';
import { allowedOrigin, whitelistTarget } from './allowed-origin';

const corsApiUrl = 'https://api.livecodes.io/cors';

export const corsService = {
  fetch: async (url: string, options?: RequestInit) => {
    if (!allowedOrigin()) {
      return fetchWithHandler(url, options);
    }

    const corsUrl = corsApiUrl + '?url=' + encodeURIComponent(url);
    if (whitelistTarget(url)) {
      return fetchWithHandler(corsUrl, options);
    }

    return fetchWithHandler(url, options).catch(() => fetchWithHandler(corsUrl, options));
  },
};
