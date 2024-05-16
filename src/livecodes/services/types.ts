/* eslint-disable import/no-internal-modules */
import { isBare } from '../compiler/import-map';
import type { Types } from '../models';
import { removeCDNPrefix, removeSpecifier } from './utils';

export const typesService = {
  getTypeUrls: async (types: string[]) => {
    const fetchedTypes: Types = {};
    await Promise.all(
      types.map(async (type) => {
        const mod = removeSpecifier(removeCDNPrefix(type));
        if (!isBare(mod)) return;
        try {
          const res = await fetch('https://esm.sh/' + mod, { method: 'HEAD' });
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
  getTypesAsImports: (types: string[]) =>
    types
      .map((type, i) => {
        const mod = removeSpecifier(removeCDNPrefix(type));
        if (!isBare(mod)) return '';
        return `import * as x${i} from '${type}';`;
      })
      .join('\n'),
};
