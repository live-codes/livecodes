import { Config } from '../models';
import { allowedOrigin } from './allowed-origin';

const dpasteGetUrl = 'https://dpaste.com/';
const dpastePostUrl = 'https://dpaste.com/api/v2/';
const apiUrl = 'https://api2.livecodes.io/share';

interface ShareService {
  getProject: (id: string) => Promise<Partial<Config>>;
  shareProject: (config: Partial<Config>) => Promise<string>;
}

const dpasteService = {
  getProject: async (id: string): Promise<Partial<Config>> => {
    try {
      const res = await fetch(dpasteGetUrl + id + '.txt');
      if (!res.ok) return {};
      return JSON.parse(await res.text());
    } catch (error) {
      return {};
    }
  },
  shareProject: async (config: Partial<Config>): Promise<string> => {
    try {
      const res = await fetch(dpastePostUrl, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'User-Agent': 'LiveCodes / https://livecodes.io/',
        },
        body: `content=${encodeURIComponent(JSON.stringify(config))}&title=${encodeURIComponent(
          config.title || '',
        )}&syntax=json&expiry_days=365`,
      });
      if (!res.ok) return '';
      const url = await res.text();
      return url.replace(dpasteGetUrl, '');
    } catch (error) {
      return '';
    }
  },
};

const apiService = {
  getProject: async (id: string): Promise<Partial<Config>> => {
    // for backward compatibility
    if (id.length < 11) return dpasteService.getProject(id);

    if (!allowedOrigin()) return {};
    try {
      const res = await fetch(apiUrl + '?id=' + id);
      if (!res.ok) return {};
      return JSON.parse(await res.text());
    } catch (error) {
      return {};
    }
  },
  shareProject: async (config: Partial<Config>): Promise<string> => {
    if (!allowedOrigin()) return '';
    try {
      const res = await fetch(apiUrl, {
        method: 'POST',
        mode: 'cors',
        body: `content=${encodeURIComponent(JSON.stringify(config))}&title=${encodeURIComponent(
          config.title || '',
        )}`,
      });
      if (!res.ok) return '';
      return res.text();
    } catch (error) {
      return '';
    }
  },
};

export const shareService: ShareService = allowedOrigin() ? apiService : dpasteService;
