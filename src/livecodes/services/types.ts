/* eslint-disable import/no-internal-modules */
import { isBare } from '../compiler/import-map';
import type { Types } from '../models';

export const typesService = {
  getTypeUrls: async (types: string[]) => {
    const fetchedTypes: Types = {};
    await Promise.all(
      types.map(async (type) => {
        if (!isBare(type)) return;
        try {
          const mod = type.includes(':') ? type.split(':')[1] : type;
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
