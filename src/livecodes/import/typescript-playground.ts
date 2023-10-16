/* eslint-disable import/no-internal-modules */
import { decompressFromEncodedURIComponent } from 'lz-string';
import type { Config } from '../models';

export const importTypescriptPlayground = async (url: string): Promise<Partial<Config>> => {
  const code = url.split('#code/')[1];
  if (!code?.trim()) return {};
  const ts = decompressFromEncodedURIComponent(code);
  if (!ts?.trim()) return {};
  return {
    activeEditor: 'script',
    script: {
      language: 'typescript',
      content: ts || '',
    },
    tools: {
      enabled: 'all',
      active: 'compiled',
      status: 'open',
    },
  };
};
