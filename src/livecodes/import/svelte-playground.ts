/* eslint-disable import/no-internal-modules */
import type { Config } from '../models';
import { corsService } from '../services/cors';

export const importSveltePlayground = async (url: string): Promise<Partial<Config>> => {
  try {
    const res = await corsService.fetch(url);
    if (!res.ok) return {};
    const content = await res.text();
    const pattern = /components:\[{name:".+",type:"svelte",source:"(.*?)"}]},version:"/g;
    const code = ([...content.matchAll(pattern)][0]?.[1] || '')
      .replace(/\\u003C/g, '<')
      .replace(/\\n/g, '\n')
      .replace(/\\t/g, '\t');
    if (!code) return {};
    return {
      activeEditor: 'script',
      script: {
        language: 'svelte',
        content: code,
      },
    };
  } catch {
    return {};
  }
};
