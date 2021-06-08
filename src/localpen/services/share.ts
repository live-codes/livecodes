import { Pen } from '../models';
import { allowedOrigin } from './allowed-origin';

const apiUrl = 'https://api.localpen.io/share';

export const shareService = {
  getProject: async (id: string): Promise<Partial<Pen>> => {
    if (!allowedOrigin()) return {};
    try {
      const res = await fetch(apiUrl + '?id=' + id);
      if (!res.ok) return {};
      return res.json();
    } catch (error) {
      return {};
    }
  },
  shareProject: async (config: Partial<Pen>): Promise<string> => {
    if (!allowedOrigin()) return '';
    try {
      const res = await fetch(apiUrl, {
        method: 'POST',
        mode: 'cors',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ config }),
      });
      if (!res.ok) return '';
      return res.text();
    } catch (error) {
      return '';
    }
  },
};
