import { Pen } from '../models';
import { allowedOrigin } from './allowed-origin';

const apiGetUrl = 'https://dpaste.com/';
const apiPostUrl = 'https://dpaste.com/api/v2/';

export const shareService = {
  getProject: async (id: string): Promise<Partial<Pen>> => {
    if (!allowedOrigin()) return {};
    try {
      const res = await fetch(apiGetUrl + id + '.txt');
      if (!res.ok) return {};
      return JSON.parse(await res.text());
    } catch (error) {
      return {};
    }
  },
  shareProject: async (config: Partial<Pen>): Promise<string> => {
    if (!allowedOrigin()) return '';
    try {
      const res = await fetch(apiPostUrl, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'User-Agent': 'LocalPen / https://localpen.io/',
        },
        body: `content=${encodeURIComponent(JSON.stringify(config))}&title=${
          config.title
        }&syntax=json&expiry_days=365`,
      });
      if (!res.ok) return '';
      const url = await res.text();
      return url.replace(apiGetUrl, '');
    } catch (error) {
      return '';
    }
  },
};
