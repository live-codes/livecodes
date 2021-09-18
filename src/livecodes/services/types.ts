import { Types } from '../models';
import { allowedOrigin } from './allowed-origin';

export const typesService = {
  getTypeUrls: async (types: string[]) => {
    let fetchedTypes: Types = {};
    if (types.length > 0 && allowedOrigin()) {
      try {
        const api = 'https://api.livecodes.io/types';
        const res = await fetch(api, {
          method: 'POST',
          mode: 'cors',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ types }),
        });
        fetchedTypes = await res.json();
      } catch {
        //
      }
    }
    return fetchedTypes;
  },
};
