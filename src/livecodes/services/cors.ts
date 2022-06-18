import { fetchWithHandler } from '../utils';
import { allowedOrigin, whitelistTarget } from './allowed-origin';

const corsApiUrl = 'https://api.livecodes.io/cors?url=';
const proxyUrl = 'https://api.allorigins.win/raw?url=';

export const corsService = {
  fetch: async (url: string, options?: RequestInit) => {
    const corsUrl = (allowedOrigin() ? corsApiUrl : proxyUrl) + encodeURIComponent(url);
    if (whitelistTarget(url)) {
      return fetchWithHandler(corsUrl, options);
    }
    return fetchWithHandler(url, options).catch(() => fetchWithHandler(corsUrl, options));
  },
};
