import { fetchWithHandler } from '../utils';
import { allowedOrigin, whitelistTarget } from './allowed-origin';

const corsApiUrl = 'https://api.livecodes.io/cors?url=';
const proxyUrl = 'https://api.allorigins.win/get?url=';

export const corsService = {
  fetch: async (url: string, options?: RequestInit) => {
    if (allowedOrigin()) {
      const corsUrl = corsApiUrl + encodeURIComponent(url);
      if (whitelistTarget(url)) {
        return fetchWithHandler(corsUrl, options);
      }
      return fetchWithHandler(url, options).catch(() => fetchWithHandler(corsUrl, options));
    } else {
      const corsUrl = proxyUrl + encodeURIComponent(url);
      const getData = (res: Response) => res.json().then((data) => new Response(data.contents));
      if (whitelistTarget(url)) {
        return fetchWithHandler(corsUrl, options).then(getData);
      }
      return fetchWithHandler(url, options)
        .catch(() => fetchWithHandler(corsUrl, options))
        .then(getData);
    }
  },
};
