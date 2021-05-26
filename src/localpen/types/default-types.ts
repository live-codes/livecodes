import { Types } from '../models';
import { objectMap } from '../utils';

export const getDefaultTypes = (baseUrl: string): Types => {
  const types = {
    react: `types/react.d.ts`,
    lib: `types/lib.d.ts`,
    'react-dom': `types/react-dom.d.ts`,
    '@stencil/core': `types/stencil-core.d.ts`,
    assemblyscript: `types/assemblyscript.d.ts`,
  };

  return objectMap(types, (url) => baseUrl + url);
};
