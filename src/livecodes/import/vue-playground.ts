import type { Config } from '../models';
import { fflateUrl } from '../vendors';

export const importVuePlayground = async (url: string): Promise<Partial<Config>> => {
  const code = url.split('#')[1];
  if (!code?.trim()) return {};

  const { unzlibSync, strToU8, strFromU8 } = await import(fflateUrl);

  // from https://github.com/vuejs/repl/blob/main/src/utils.ts
  function atou(base64: string) {
    const binary = atob(base64);
    if (binary.startsWith('\x78\xDA')) {
      const buffer = strToU8(binary, true);
      const unzipped = unzlibSync(buffer);
      return strFromU8(unzipped);
    }
    return decodeURIComponent(escape(binary));
  }

  const str = atou(code);
  if (!str) return {};
  try {
    const json = JSON.parse(str);
    const file =
      json['App.vue'] ?? json[Object.keys(json).find((key) => key.endsWith('.vue')) || 'App.vue'];
    if (!file) return {};
    return {
      activeEditor: 'script',
      script: {
        language: 'vue',
        content: file,
      },
    };
  } catch {
    return {};
  }
};
