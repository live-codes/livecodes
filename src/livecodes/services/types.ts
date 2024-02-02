/* eslint-disable import/no-internal-modules */
import { isBare } from '../compiler/import-map';
import type { Types } from '../models';

export const typesService = {
  getTypeUrls: async (types: string[]) => {
    const fetchedTypes: Types = {};
    await Promise.all(
      types.map(async (type) => {
        const mod = removeSpecifier(removeCDNPrefix(type));
        if (!isBare(mod)) return;
        try {
          const res = await fetch('https://esm.sh/' + mod);
          if (!res.ok) return;
          const typesUrl = res.headers.get('X-Typescript-Types');
          if (!typesUrl) return;
          fetchedTypes[type] = typesUrl;
        } catch {
          // ignore
        }
      }),
    );
    return fetchedTypes;
  },
};

const removeCDNPrefix = (url: string) => {
  if (!url.startsWith('https://')) return url;

  const prefixes = [
    'https://esm.sh/',
    'https://cdn.skypack.dev/',
    'https://cdn.jsdelivr.net/npm/',
    'https://fastly.jsdelivr.net/npm/',
    'https://esm.run/',
    'https://esbuild.vercel.app/',
    'https://bundle.run/',
    'https://unpkg.com/',
    'https://deno.bundlejs.com/?file&q=',
    'https://jspm.dev/',
  ];

  for (const prefix of prefixes) {
    if (url.startsWith(prefix)) {
      return url.replace(prefix, '');
    }
  }
  return url;
};

const removeSpecifier = (type: string) =>
  type.includes(':') && !type.startsWith('data:') && !type.startsWith('http')
    ? type.split(':')[1]
    : type;
