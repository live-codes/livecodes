import type { Types } from '../models';

export const typesService = {
  getTypeUrls: async (types: string[]) => {
    const fetchedTypes: Types = {};
    await Promise.all(
      types.map(async (type) => {
        try {
          const res = await fetch('https://esm.sh/' + type);
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
