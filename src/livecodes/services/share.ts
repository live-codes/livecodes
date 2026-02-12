import type { SDKConfig } from '../models';
import { allowedOrigin } from './allowed-origin';

const dpasteGetUrl = 'https://dpaste.com/';
const dpastePostUrl = 'https://dpaste.com/api/v2/';
const apiUrl = 'https://api2.livecodes.io/share';
const selfHostedUrl = './api/share';

// note: dpaste id length: 9, api id length: 11, self-hosted id length: 14

type ConfigWithResult = Partial<SDKConfig & { result: string }>;
interface ShareService {
  getProject: (id: string) => Promise<ConfigWithResult>;
  shareProject: (config: ConfigWithResult) => Promise<string>;
}

const dpasteService = {
  getProject: async (id: string): Promise<ConfigWithResult> => {
    try {
      const res = await fetch(dpasteGetUrl + id + '.txt');
      if (!res.ok) return {};
      return JSON.parse(await res.text());
    } catch {
      return {};
    }
  },
  shareProject: async (config: ConfigWithResult): Promise<string> => {
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
    } catch {
      return '';
    }
  },
};

const apiService = {
  getProject: async (id: string): Promise<ConfigWithResult> => {
    // for backward compatibility
    if (id.length < 11) return dpasteService.getProject(id);
    try {
      const res = await fetch(apiUrl + '?id=' + id);
      if (!res.ok) return {};
      return JSON.parse(await res.text());
    } catch {
      return {};
    }
  },
  shareProject: async (config: ConfigWithResult): Promise<string> => {
    if (!allowedOrigin()) return '';
    try {
      const res = await fetch(apiUrl, {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(config),
      });
      if (!res.ok) return '';
      return res.text();
    } catch {
      return '';
    }
  },
};

const selfHostedService = {
  getProject: async (id: string): Promise<ConfigWithResult> => {
    // allow getting projects shared from api service on hosted app
    if (id.length < 14) return apiService.getProject(id);
    try {
      const res = await fetch(selfHostedUrl + '?id=' + id);
      if (!res.ok) return {};
      return res.json();
    } catch {
      return {};
    }
  },
  shareProject: async (config: ConfigWithResult): Promise<string> => {
    try {
      const res = await fetch(selfHostedUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config),
      });
      if (!res.ok) return '';
      return res.text();
    } catch {
      return '';
    }
  },
};

export const shareService: ShareService =
  process.env.SELF_HOSTED === 'true'
    ? process.env.SELF_HOSTED_SHARE === 'true'
      ? selfHostedService
      : dpasteService
    : allowedOrigin()
      ? apiService
      : dpasteService;
