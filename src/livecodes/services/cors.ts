import { allowedOrigin, allowedTarget } from './allowed-origin';

const corsApiUrl = 'https://api.livecodes.io/cors';

export const corsService = {
  fetch: async (url: string, options?: RequestInit) => {
    const fetchUrl =
      allowedOrigin() && allowedTarget(url) ? corsApiUrl + '?url=' + encodeURIComponent(url) : url;

    return fetch(fetchUrl, options);
  },
};
